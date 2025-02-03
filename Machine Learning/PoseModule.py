import cv2
import mediapipe as mp
import time
import math
import numpy as np
import json
from datetime import datetime
import pygame
from enum import Enum
import csv

class ExerciseType(Enum):
    BICEP_CURL = "Bicep Curl"
    SQUAT = "Squat"
    PUSHUP = "Push-up"
    SHOULDER_PRESS = "Shoulder Press"
    LUNGES = "Lunges"

class FormError(Enum):
    ELBOW_TOO_FAR = "Keep your elbow closer to your body"
    BACK_NOT_STRAIGHT = "Keep your back straight"
    TOO_FAST = "Slow down the movement"
    INCOMPLETE_REP = "Complete the full range of motion"
    KNEE_POSITION = "Keep knees aligned with toes"

class User:
    def __init__(self, name, age, weight, height):
        self.name = name
        self.age = age
        self.weight = weight  #kg
        self.height = height  #cm
        self.exercise_history = []
        self.calories_burned = 0
        
    def calculate_bmr(self):                # Harris-Benedict equation for BMR
        if self.gender == 'M':
            return 88.362 + (13.397 * self.weight) + (4.799 * self.height) - (5.677 * self.age)
        else:
            return 447.593 + (9.247 * self.weight) + (3.098 * self.height) - (4.330 * self.age)
        

def get_user_info():
    name = input("Enter your name: ")
    while True:
        try:
            age = int(input("Enter your age: "))
            weight = float(input("Enter your weight in kg: "))
            height = float(input("Enter your height in cm: "))
            gender = input("Enter your gender (M/F): ").upper()
            if gender not in ['M', 'F']:
                raise ValueError("Gender must be M or F")
            break
        except ValueError as e:
            print(f"Invalid input: {e}. Please try again.")
    
    return User(name, age, weight, height, gender)

def load_user_profile(filename="user_profile.json"):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            return User(**data)
    except FileNotFoundError:
        return None

def save_user_profile(user, filename="user_profile.json"):
    data = {
        'name': user.name,
        'age': user.age,
        'weight': user.weight,
        'height': user.height,
        'gender': user.gender
    }
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

class ExerciseTracker:
    def __init__(self):
        self.counter = 0
        self.stage = None
        self.is_recording = False
        self.exercise_history = []
        self.start_time = None
        self.form_errors = []
        self.calories_burned = 0
        self.rep_times = []
        self.last_rep_time = time.time()

    def calculate_calories(self, exercise_type, duration_mins, weight_kg):              # MET values for exercises (metabolic equivalent of task)
        met_values = {
            ExerciseType.BICEP_CURL: 3.0,
            ExerciseType.SQUAT: 5.0,
            ExerciseType.PUSHUP: 4.0,
            ExerciseType.SHOULDER_PRESS: 3.5,
            ExerciseType.LUNGES: 4.0
        }
        
        met = met_values.get(exercise_type, 3.0)
        calories = (met * weight_kg * duration_mins) / 60
        return calories

class AdvancedPoseDetector:
    def __init__(self, mode=False, upBody=False, smooth=True,
                 detectionCon=0.5, trackCon=0.5):
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.detectionCon = detectionCon
        self.trackCon = trackCon
        
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(
            static_image_mode=self.mode,
            smooth_landmarks=self.smooth,
            min_detection_confidence=self.detectionCon,
            min_tracking_confidence=self.trackCon
        )
        
        self.exercise_trackers = {
            exercise_type: ExerciseTracker() for exercise_type in ExerciseType
        }
        
        #initialize audio feedback
        pygame.mixer.init()
        self.sounds = {
            'rep_complete': pygame.mixer.Sound('rep_complete.wav'),
            'form_error': pygame.mixer.Sound('form_error.wav')
        }
        
        #Performance threshold
        self.rep_speed_threshold = 1.0  #min sec per rep
        self.angle_thresholds = {
            ExerciseType.BICEP_CURL: {"start": 160, "end": 30, "elbow_max": 30},
            ExerciseType.SQUAT: {"start": 170, "end": 90, "knee_min": 60},
            ExerciseType.PUSHUP: {"start": 160, "end": 80, "back_angle": 180}
        }

    def check_form(self, exercise_type, angles):
        """Check exercise form and return any errors"""
        errors = []
        
        if exercise_type == ExerciseType.BICEP_CURL:
            # Check elbow position
            if angles.get('elbow_out', 0) > self.angle_thresholds[exercise_type]['elbow_max']:
                errors.append(FormError.ELBOW_TOO_FAR)

            if self.check_rep_speed():                                      #Check speed
                errors.append(FormError.TOO_FAST)
                
        elif exercise_type == ExerciseType.SQUAT:                           #Check knee alignment
            if angles.get('knee_alignment', 0) > 20:
                errors.append(FormError.KNEE_POSITION)
            
            if abs(angles.get('back_angle', 180) - 180) > 15:               #Check back angle
                errors.append(FormError.BACK_NOT_STRAIGHT)
            
            return errors

    def check_rep_speed(self):
        """Check if reps are being performed too quickly"""
        current_time = time.time()
        if self.last_rep_time and (current_time - self.last_rep_time) < self.rep_speed_threshold:
            return True
        return False

    def calculate_advanced_angles(self, landmarks):
        """Calculate additional angles for form checking"""
        angles = {}
        
        #brack angle calculation
        if len(landmarks) >= 24:
            shoulder = landmarks[12]
            hip = landmarks[24]
            knee = landmarks[26]
            angles['back_angle'] = self.calculate_angle(shoulder, hip, knee)
            
        #knee alignment calculation
        if len(landmarks) >= 28:
            hip = landmarks[24]
            knee = landmarks[26]
            ankle = landmarks[28]
            angles['knee_alignment'] = self.calculate_angle(hip, knee, ankle)
            
        return angles

    def save_exercise_data(self, user, exercise_type):      #save data into csv
        tracker = self.exercise_trackers[exercise_type]
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        data = {
            'timestamp': timestamp,
            'user': user.name,
            'exercise': exercise_type.value,
            'reps': tracker.counter,
            'calories': tracker.calories_burned,
            'duration': time.time() - tracker.start_time if tracker.start_time else 0,
            'form_errors': len(tracker.form_errors)
        }
        
        with open('exercise_history.csv', 'a', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=data.keys())
            writer.writerow(data)

    def generate_report(self, user):
        report = {
            'user': user.name,
            'total_calories': user.calories_burned,
            'exercises': {}
        }
        
        for exercise_type, tracker in self.exercise_trackers.items():
            report['exercises'][exercise_type.value] = {
                'total_reps': tracker.counter,
                'form_errors': len(tracker.form_errors),
                'calories': tracker.calories_burned
            }
            
        return report

    def draw_feedback(self, img, exercise_type, form_errors):
        y_pos = 200
        for error in form_errors:
            cv2.putText(img, error.value, (50, y_pos),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            y_pos += 30
            
        #Draingw calories
        tracker = self.exercise_trackers[exercise_type]
        cv2.putText(img, f'Calories: {tracker.calories_burned:.1f}',
                    (50, y_pos + 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

def main():
    user = load_user_profile()
    
    if user is None:
        user = get_user_info()
        save_user_profile(user)
    
    cap = cv2.VideoCapture(0)
    detector = AdvancedPoseDetector()
    current_exercise = ExerciseType.BICEP_CURL
    
    while True:
        success, img = cap.read()
        if not success:
            break
            
        img = detector.findPose(img)
        landmarks = detector.findPosition(img, draw=False)
        
        if len(landmarks) != 0:
            angles = detector.calculate_advanced_angles(landmarks)
            
            form_errors = detector.check_form(current_exercise, angles)
            detector.track_exercise(img, current_exercise, user, form_errors)
            
            detector.draw_feedback(img, current_exercise, form_errors)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            detector.save_exercise_data(user, current_exercise)
            break
        elif key == ord('r'):
            report = detector.generate_report(user)
            with open('exercise_report.json', 'w') as f:
                json.dump(report, f, indent=4)
                
        cv2.imshow("Advanced Exercise Tracking", img)
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
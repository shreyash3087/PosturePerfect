import cv2
import mediapipe as mp
import time
import math
import numpy as np
from enum import Enum

class ExerciseType(Enum):
    BICEP_CURL = "Bicep Curl"
    SQUAT = "Squat"
    PUSHUP = "Push-up"


class ExerciseTracker:
    def _init_(self):
        self.counter = 0
        self.stage = None
        self.is_recording = False
        self.exercise_history = []
        self.start_time = None

class PoseDetector:
    def __init__(self, mode=False, upBody=False, smooth=True,
                 detectionCon=0.5, trackCon=0.5):  # Corrected the method name
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.detectionCon = detectionCon
        self.trackCon = trackCon
        
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        
        # Initialize the Pose object
        self.pose = self.mpPose.Pose(
            static_image_mode=self.mode,
            smooth_landmarks=self.smooth,
            min_detection_confidence=self.detectionCon,
            min_tracking_confidence=self.trackCon
        )
        # Initialise exercise tracker
        self.exercise_trackers = {
            ExerciseType.BICEP_CURL: ExerciseTracker(),
            ExerciseType.SQUAT: ExerciseTracker(),
            ExerciseType.PUSHUP: ExerciseTracker()
        }
        
        # Define exercise angle
        self.exercise_angles = {
            ExerciseType.BICEP_CURL: {"start": 160, "end": 30},
            ExerciseType.SQUAT: {"start": 170, "end": 90},
            ExerciseType.PUSHUP: {"start": 160, "end": 80}
        }

    def findPose(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks,
                                         self.mpPose.POSE_CONNECTIONS)
        return img

    def findPosition(self, img, draw=True):
        self.lmList = []
        if self.results.pose_landmarks:
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                self.lmList.append([id, cx, cy])
                if draw:
                    cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
        return self.lmList

    def findAngle(self, img, p1, p2, p3, draw=True):
        x1, y1 = self.lmList[p1][1:]
        x2, y2 = self.lmList[p2][1:]
        x3, y3 = self.lmList[p3][1:]

        angle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                           math.atan2(y1 - y2, x1 - x2))
        if angle < 0:
            angle += 360

        if draw:
            cv2.line(img, (x1, y1), (x2, y2), (255, 255, 255), 3)
            cv2.line(img, (x3, y3), (x2, y2), (255, 255, 255), 3)
            cv2.circle(img, (x1, y1), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
            cv2.circle(img, (x2, y2), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
            cv2.circle(img, (x3, y3), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)
            cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50),
                       cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
        return angle

    def track_exercise(self, img, exercise_type):
        if len(self.lmList) == 0:
            return img

        tracker = self.exercise_trackers[exercise_type]
        
        if exercise_type == ExerciseType.BICEP_CURL:
            angle = self.findAngle(img, 12, 14, 16)                         # will track right arm
        elif exercise_type == ExerciseType.SQUAT:
            angle = self.findAngle(img, 24, 26, 28)                         # will track right leg
        elif exercise_type == ExerciseType.PUSHUP:
            angle = self.findAngle(img, 12, 14, 16)                         # will track right arm for push ups

        # Count reps
        if angle > self.exercise_angles[exercise_type]["start"]:
            tracker.stage = "down"
        if angle < self.exercise_angles[exercise_type]["end"] and tracker.stage == "down":
            tracker.stage = "up"
            tracker.counter += 1

        # Display exercise info
        cv2.putText(img, f'{exercise_type.value}', (50, 50),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.putText(img, f'Count: {tracker.counter}', (50, 100),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.putText(img, f'Stage: {tracker.stage}', (50, 150),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        return img

    def start_recording(self, exercise_type):
        tracker = self.exercise_trackers[exercise_type]
        tracker.is_recording = True
        tracker.start_time = time.time()

    def stop_recording(self, exercise_type):
        tracker = self.exercise_trackers[exercise_type]
        if tracker.is_recording:
            duration = time.time() - tracker.start_time
            tracker.exercise_history.append({
                'reps': tracker.counter,
                'duration': duration,
                'timestamp': time.strftime("%Y-%m-%d %H:%M:%S")
            })
            tracker.is_recording = False
            tracker.counter = 0
            tracker.stage = None

def main():
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    current_exercise = ExerciseType.BICEP_CURL  # Default exercise

    while True:
        success, img = cap.read()
        if not success:
            break

        img = detector.findPose(img)
        detector.findPosition(img, draw=False)
        img = detector.track_exercise(img, current_exercise)

        # Key controls
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('1'):
            current_exercise = ExerciseType.BICEP_CURL
        elif key == ord('2'):
            current_exercise = ExerciseType.SQUAT
        elif key == ord('3'):
            current_exercise = ExerciseType.PUSHUP
        elif key == ord('s'):
            detector.start_recording(current_exercise)
        elif key == ord('e'):
            detector.stop_recording(current_exercise)

        cv2.imshow("Exercise Tracking", img)

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "_main_":
    main()
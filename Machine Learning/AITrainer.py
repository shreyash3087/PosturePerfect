import cv2
import numpy as np
import time
import PoseModule as pm
import requests

cap = cv2.VideoCapture(0)
detector = pm.PoseDetector()
count = 0
dir = 0
pTime = 0

url = "http://localhost:3000/api/countinc"

while True:
    success, img = cap.read()
    if not success:
        print("Failed to capture frame. Exiting...")
        break

    img = cv2.resize(img, (640, 480))  # Reduce resolution for better performance
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)

    if len(lmList) != 0:
        angle = detector.findAngle(img, 12, 14, 16)
        per = np.interp(angle, (210, 310), (0, 100))
        bar = np.interp(angle, (220, 310), (450, 100))

        color = (255, 0, 255)
        if per == 100:
            color = (0, 255, 0)
            if dir == 0:
                count += 0.5
                dir = 1
                try:
                    data = {"count": int(count)}
                    response = requests.post(url, json=data)
                    print(response.status_code, response.text)
                except requests.exceptions.RequestException as e:
                    print(f"Error sending request: {e}")
        if per == 0:
            color = (0, 255, 0)
            if dir == 1:
                count += 0.5
                dir = 0
                try:
                    data = {"count": int(count)}
                    response = requests.post(url, json=data)
                    print(response.status_code, response.text)
                except requests.exceptions.RequestException as e:
                    print(f"Error sending request: {e}")
        print(count)

        cv2.rectangle(img, (550, 100), (600, 450), color, 3)
        cv2.rectangle(img, (550, int(bar)), (600, 450), color, cv2.FILLED)
        cv2.putText(img, f'{int(per)} %', (550, 75), cv2.FONT_HERSHEY_PLAIN, 2,
                    color, 2)

        cv2.rectangle(img, (0, 350), (150, 480), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (20, 430), cv2.FONT_HERSHEY_PLAIN, 4,
                    (255, 0, 0), 4)

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, f'FPS: {int(fps)}', (50, 50), cv2.FONT_HERSHEY_PLAIN, 2,
                (255, 0, 0), 2)

    cv2.imshow("Image", img)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

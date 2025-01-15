<img src="https://github.com/user-attachments/assets/0ad45c35-11b1-434a-96c6-ab6266d5257d" width="100px" >

# Posture Perfect

Achieve perfect exercise form with advanced computer vision. Get real-time feedback and guidance to ensure your workouts are both effective and safe.

---

## Features

- **3D Avatar Fitness Coach**: A fully interactive and customizable 3D avatar to guide your workouts.
- **Interactive Interface**: Real-time feedback with seamless interaction to enhance your fitness experience.

---

## Tech Stack

### Frontend
- **Three.js**
- **React.js**
- **TailwindCSS**
- **ReadyPlayerMe**

### Backend
- **Express.js**
- **MongoDB**

### Machine Learning
- **Python**

---

## Repository Structure

- **frontend/**: Contains the frontend of the project.
- **backend/**: Contains the backend server.
- **machine_learning/**: Contains the ML model (in development).

---

## How It Works

1. **Frontend**:
   - A 3D avatar is created using **ReadyPlayerMe** and rendered with **Three.js**.
   - User inputs are captured and sent to the backend server using a custom `useChat` hook.

2. **Backend**:
   - The input is sent to the `/chat` endpoint.
   - This endpoint interacts with Gemini API via **GeminiAPI**.
   - The response is converted to audio and lip-synced to the avatar using the **Rhubarb Lipsync** library.
   - An animation type is determined and sent back to the frontend.

3. **Machine Learning** (In Development):
   - Currently, the ML module can count bicep curl repetitions.
   - Integration with the avatar is in progress to provide live rep counting during workouts.

---

## How to Contribute

1. Clone the repository:
   ```bash
   git clone https://github.com/androidvitb/PosturePerfect
   cd ./PosturePerfect
   ```

2. **Set up the Backend Server:**
   - Install all required packages

   - Download **FFmpeg**:
     - Visit [FFmpeg Builds](https://www.gyan.dev/ffmpeg/builds/).
     - Download `ffmpeg-git-full.7z`, extract it, and add the `bin` folder to your environment `PATH`.
   - Add your Gemini API key and MongoDB URI to the `.env` file:
     ```env
     GEMINI_API_KEY=<your-api-key>
     MONGO_URI=<your-mongo-uri>
     ```
   - Start the backend server:
     ```bash
     node index.js
     ```

3. **Set up the Frontend:**
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Open the application in your browser, login or signup, and start using the avatar chat in the **Gym** section.

---

## ML Module Testing

The ML module currently supports counting bicep curls. To test it:

1. Uncomment the relevant code in `index.js`.
2. Run the `AITrainer.py` module in the `machine_learning` directory:
   ```bash
   python AITrainer.py
   ```
3. Return to the frontend and perform bicep curls in front of the camera. The avatar should count the number of reps (in progress).

---

## Notes

- The **Machine Learning** module is under development. Contributions to enhance its functionality or improve the integration with the avatar are highly encouraged.
- Feel free to improve any aspect of the website to achieve the ultimate goal of live fitness coaching and feedback.

---

Happy coding and stay fit! 💪

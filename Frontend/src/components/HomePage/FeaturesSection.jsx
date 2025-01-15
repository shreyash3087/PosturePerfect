import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FeaturesSection() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [imageKey, setImageKey] = useState(0); 

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
      setImageKey((prev) => prev + 1);
    } else {
      setOpenDropdown(index);
      setImageKey((prev) => prev + 1);
    }
  };

  const images = [
    "https://github.com/user-attachments/assets/7518d58a-8aa5-456f-a168-87053e1535d9",
    "https://github.com/user-attachments/assets/d5979c4a-d448-40a4-b802-5709d16baab9",
    "https://via.placeholder.com/400x300.png?text=Audio+Visual+Cues+Image",
  ];

  return (
    <section>
      <div className="bg-[#033c8f] bg-opacity-30 w-full flex gap-4 max-w-7xl rounded-xl p-20">
        <div className="w-1/2">
          <div className="text-[#81c8f1] text-3xl mb-4">Features</div>
          <div className="text-[#81c8f1] w-full max-w-xl text-lg mb-8">
            PosturePerfect offers real-time feedback on exercise form, using cutting-edge technologies to analyze and correct your posture during workouts. Here are some of its standout features:
          </div>
          <div>

            <div className="my-4 max-w-[650px] w-full">
              <div className="flex justify-between items-center">
                <div className="text-2xl text-white mb-2 flex gap-2 items-center">
                  <img
                    src="https://github.com/user-attachments/assets/d4e8997c-9c32-4701-a7aa-27ec5d40f7b3"
                    className="w-8"
                    alt="Feature Icon"
                  />
                  <div>Real-Time Posture Analysis</div>
                </div>
                <div onClick={() => toggleDropdown(1)} className="cursor-pointer">
                  <img
                    src="https://github.com/user-attachments/assets/efa82896-cbd5-4857-90cc-47b2ee34ba0f"
                    className={`w-6 transition-transform ${openDropdown === 1 ? "rotate-180" : "rotate-0"}`}
                    alt="Dropdown Arrow"
                  />
                </div>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openDropdown === 1 ? "auto" : 0 }}
                className="overflow-hidden text-[#81c8f1] opacity-75 text-lg"
              >
                With advanced computer vision, PosturePerfect continuously monitors your movements, ensuring that your form is correct throughout your workout.
              </motion.div>

              <div className="my-6 flex opacity-20 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://github.com/user-attachments/assets/1ca3112f-9303-4139-9e8e-74e0b0a19b12"
                    className="h-4"
                    alt="Progress Bar"
                  />
                ))}
              </div>
            </div>

            <div className="my-4 max-w-[650px] w-full">
              <div className="flex justify-between items-center">
                <div className="text-2xl text-white mb-2 flex gap-2 items-center">
                  <img
                    src="https://github.com/user-attachments/assets/c9e430bb-b77d-4b67-ba55-0bf708e31178"
                    className="w-8"
                    alt="Feature Icon"
                  />
                  <div>3D Avatar Coach</div>
                </div>
                <div onClick={() => toggleDropdown(2)} className="cursor-pointer">
                  <img
                    src="https://github.com/user-attachments/assets/efa82896-cbd5-4857-90cc-47b2ee34ba0f"
                    className={`w-6 transition-transform ${openDropdown === 2 ? "rotate-180" : "rotate-0"}`}
                    alt="Dropdown Arrow"
                  />
                </div>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openDropdown === 2 ? "auto" : 0 }}
                className="overflow-hidden text-[#81c8f1] opacity-75 text-lg"
              >
                Our 3D avatar coach provides real-time feedback, demonstrating the correct posture and offering visual cues during your workouts.
              </motion.div>

              <div className="my-6 flex opacity-20 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://github.com/user-attachments/assets/1ca3112f-9303-4139-9e8e-74e0b0a19b12"
                    className="h-4"
                    alt="Progress Bar"
                  />
                ))}
              </div>
            </div>

            <div className="my-4 max-w-[650px] w-full">
              <div className="flex justify-between items-center">
                <div className="text-2xl text-white mb-2 flex gap-2 items-center">
                  <img
                    src="https://github.com/user-attachments/assets/4ce78e79-43de-4734-973c-da9d3e27bd37"
                    className="w-8"
                    alt="Feature Icon"
                  />
                  <div>Instant Feedback with Audio/Visual Cues</div>
                </div>
                <div onClick={() => toggleDropdown(3)} className="cursor-pointer">
                  <img
                    src="https://github.com/user-attachments/assets/efa82896-cbd5-4857-90cc-47b2ee34ba0f"
                    className={`w-6 transition-transform ${openDropdown === 3 ? "rotate-180" : "rotate-0"}`}
                    alt="Dropdown Arrow"
                  />
                </div>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openDropdown === 3 ? "auto" : 0 }}
                className="overflow-hidden text-[#81c8f1] opacity-75 text-lg"
              >
                Get instant audio and visual feedback to correct your form in real time, helping you stay on track with your fitness goals.
              </motion.div>

              <div className="my-6 flex opacity-20 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://github.com/user-attachments/assets/1ca3112f-9303-4139-9e8e-74e0b0a19b12"
                    className="h-4"
                    alt="Progress Bar"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="w-full flex justify-end">
            <img
              src="https://github.com/user-attachments/assets/2829e82e-8283-4269-84a2-fdf980c16aa7"
              className="w-52 h-20"
              alt="PosturePerfect Logo"
            />
          </div>
          <div className="p-10 relative h-full flex justify-end overflow-hidden items-end">
            <img
              src="https://github.com/user-attachments/assets/c5e75dc1-8694-4bf7-b519-80fa7bd776a8"
              className="w-full opacity-10"
              alt="Background Decoration"
            />
             <motion.img
              key={imageKey} 
              src={openDropdown ? images[openDropdown - 1] : "https://github.com/user-attachments/assets/909120f3-0e5d-4c62-bfb6-879cf3d9e79d"}
              className="absolute w-96 -bottom-4 rounded-xl"
              alt="Posture Image"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

import React from "react";
import { motion } from "framer-motion";

function AboutsSection() {
  return (
    <section className="pt-32 px-10 min-h-screen">
      <div className="flex justify-between px-32">
        <motion.div 
          className="w-[550px] relative"
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-[#38b6ff] text-4xl mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1.2, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            About PosturePerfect
          </motion.div>
          <div className="text-white text-xl text-justify">
            PosturePerfect is an innovative fitness solution that leverages
            advanced computer vision and machine learning technologies to
            provide real-time analysis of users’ exercise postures. It tracks
            key body points, comparing them against optimal postures to help
            users correct their form during workouts.
            <br /><br />
            With immediate visual cues, audio alerts, and text-based feedback,
            PosturePerfect ensures users maintain perfect form, enhancing the
            effectiveness of their exercises. The integrated 3D avatar coach
            acts as a virtual fitness trainer, demonstrating correct postures,
            providing motivation, and offering personalized guidance throughout
            the workout.
          </div>
          <motion.div 
            className="w-44 h-44 border-8 border-blue-500 absolute bottom-8 -right-40"
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.div 
            className="w-44 h-44 border-8 border-blue-500 absolute -bottom-4 -right-24"
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://github.com/user-attachments/assets/18adfeac-677d-44ad-8dd3-af08dd25e6b9"
            alt="Posture Analysis"
            className="w-48 mr-20"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default AboutsSection;

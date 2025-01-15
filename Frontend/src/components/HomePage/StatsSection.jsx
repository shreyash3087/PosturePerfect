import React from "react";
import Counter from "./Counter.jsx";

function StatsSection() {
  return (
    <section className="px-32">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">
          <div className="text-white">Posture Perfect</div>
          <div className="text-[#38b6ff]">All-in-one solution</div>
        </div>
        <div className="text-white w-full max-w-lg">
          Posture Perfect helps you achieve your fitness goals with real-time
          feedback, tracking, and personalized guidance. Discover the stats
          behind our success!
        </div>
      </div>
      <div className="flex justify-between w-full max-w-7xl text-white bg-black my-24 py-6">
        <div className="border-l-[6px] px-3 border-blue-500">
          <div className="text-4xl font-bold">
            <Counter start_value={0} end_value={562} />M
          </div>
          <div className="text-xl">Exercises Analyzed</div>
        </div>
        <div className="border-l-[6px] px-3 border-blue-500">
          <div className="text-4xl font-bold">
            <Counter start_value={0} end_value={1215} />
          </div>
          <div className="text-xl">Daily Active Users</div>
        </div>
        <div className="border-l-[6px] px-3 border-blue-500">
          <div className="text-4xl font-bold">
            <Counter start_value={0} end_value={124} />K
          </div>
          <div className="text-xl">Workouts Completed</div>
        </div>
        <div className="border-l-[6px] px-3 border-blue-500">
          <div className="text-4xl font-bold">
            <Counter start_value={0} end_value={2} />M
          </div>
          <div className="text-xl">Feedbacks Given</div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;

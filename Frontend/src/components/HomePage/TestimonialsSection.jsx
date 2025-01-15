function TestimonialsSection() {
  return (
    <div className="text-gray-600 dark:text-gray-300 pt-8 dark:bg-gray-900" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="text-[#38b6ff] text-center font-semibold text-4xl mt-10">Testimonials</div>
        <div className="text-white text-center font-bold text-4xl mb-20">What Our Users Say</div>

        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="user avatar"
                width="400"
                height="400"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Daniella M.</h6>
                <p className="text-sm text-gray-300">Fitness Enthusiast</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "PosturePerfect has completely changed the way I work out! I used to worry about my form during strength training, but now I get real-time feedback that helps me correct my posture instantly. It's like having a personal trainer with me at all times!"
            </p>
          </div>

          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/14.jpg"
                alt="user avatar"
                width="200"
                height="200"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Sarah J.</h6>
                <p className="text-sm text-gray-300">Yoga Practitioner</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "As someone who practices yoga regularly, maintaining the right posture is essential. The 3D avatar coach has been an incredible guide during my sessions, helping me achieve perfect form while keeping me motivated. I feel more confident in my poses now!"
            </p>
          </div>

          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/18.jpg"
                alt="user avatar"
                width="200"
                height="200"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Yanick L.</h6>
                <p className="text-sm text-gray-300">Runner</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "I love how PosturePerfect analyzes my running form. The audio cues keep me focused, and I’ve noticed a significant improvement in my endurance and technique. It's a must-have for anyone serious about improving their workouts!"
            </p>
          </div>

          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="user avatar"
                width="200"
                height="200"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Andrea P.</h6>
                <p className="text-sm text-gray-300">Home Workout Fan</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "Working out from home can be tricky without a trainer, but PosturePerfect makes it so easy to stay on track. The real-time feedback helps me correct mistakes right away, and I can really feel the difference in my workout results!"
            </p>
          </div>

          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/62.jpg"
                alt="user avatar"
                width="200"
                height="200"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">James K.</h6>
                <p className="text-sm text-gray-300">Beginner Fitness Enthusiast</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "I’m new to fitness, and PosturePerfect has been amazing at helping me learn the right postures. The visual cues and detailed suggestions make every workout effective and safe. I’m gaining confidence and seeing progress fast!"
            </p>
          </div>

          <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-[#0e0e0e42] shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/19.jpg"
                alt="user avatar"
                width="400"
                height="400"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Emily R.</h6>
                <p className="text-sm text-gray-300">Personal Trainer</p>
              </div>
            </div>
            <p className="mt-8 text-white">
              "As a personal trainer, I love using PosturePerfect to supplement my sessions with clients. The system’s ability to track key body points and provide instant feedback is a game changer. My clients love the personalized attention, even when we aren’t training together in person."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;

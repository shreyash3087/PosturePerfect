function HeroSection() {

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white">
      <div className="w-52 h-52 rounded-full blur-3xl bg-blue-600 absolute -top-32 -left-24 animate-pulse"></div>
      <div className="w-52 h-52 rounded-full blur-3xl bg-blue-600 absolute -bottom-24 -right-24 animate-pulse"></div>
      <div className="text-[#38b6ff] text-8xl font-bold w-full flex justify-center items-center gap-3">
        <span className="text-white flex items-center">
          <img src="Logo.png" className="w-24" />
          osture
        </span>
        Perfect
      </div>
      <div className="text-xl w-full max-w-xl text-center">
        Achieve perfect exercise form with advanced computer vision. Get
        real-time feedback and guidance to ensure your workouts are both
        effective and safe.
      </div>

      <div className="px-6 my-4 rounded-full font-bold text-xl bg-[#0248af] py-3 transition-transform transform hover:scale-105 hover:bg-[#2a6df6] cursor-pointer">
        Get Started
      </div>
    </section>
  );
}

export default HeroSection;

import React from "react";

function PricingSection() {
  return (
    <section>
      <div className="m-auto text-center">
        <div className="text-[#38b6ff] text-3xl mb-3">Pricing Plans</div>
        <div className="text-white w-full m-auto max-w-xl text-xl">
          Choose the plan that’s right for you. Our pricing is designed to be flexible and transparent, with no hidden fees.
        </div>
      </div>
      <div className="flex w-full max-w-2xl gap-4 m-auto justify-center h-[700px]">
      <img
          src="/Price1.png"
          alt="cards"
          className="h-[450px] hover:scale-110 transition-all duration-500 cursor-pointer rounded-2xl my-20 m-auto"
        />
        <img
          src="/Price2.png"
          alt="cards"
          className="h-[450px] hover:scale-110 transition-all duration-500 cursor-pointer rounded-2xl my-20 m-auto"
        />
        <img
          src="/Price3.png"
          alt="cards"
          className="h-[500px] hover:scale-110 transition-all duration-500 cursor-pointer relative -top-12 rounded-2xl my-20 m-auto"
        />
      </div>
    </section>
  );
}

export default PricingSection;

"use client";

import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#f3f3f3] min-h-screen flex items-center px-8 lg:px-24 py-16 font-kumbh">
      {/* Soft Left Gradient */}
      <div className="absolute left-0 top-0 h-full w-[38%] bg-gradient-to-r from-[#dce7f8] to-transparent pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center w-full">
        {/* LEFT CONTENT */}
        <div className="max-w-[620px]">
          <p className="text-black text-[22px] lg:text-[26px] mb-8 font-medium">
            Why Choose Us?
          </p>

          <h2 className="text-[42px] lg:text-[58px] leading-tight font-bold text-black mb-8">
            We’re Bindzo IT Solutions Pvt Ltd
          </h2>

          <p className="text-[18px] lg:text-[21px] leading-[1.8] text-black/70 max-w-[560px] mb-14">
            Bindzo IT Solutions Pvt. Ltd. takes your business beyond
            boundaries with smart, scalable, and secure technology solutions.
            A trusted end-to-end IT service partner, we deliver innovation
            that drives growth and efficiency. Our dedicated team ensures
            seamless IT support and strategic digital transformation tailored
            to your business goals.
          </p>

          <button className="border border-[#ff3b6a] text-[#ff3b6a] px-12 py-4 rounded-full text-[20px] hover:bg-[#ff3b6a] hover:text-white transition-all duration-300">
            Explore
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/why-choose-us.png"
            alt="Why Choose Us"
            className="w-full max-w-[560px] object-contain animate-float"
          />
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
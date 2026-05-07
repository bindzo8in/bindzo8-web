"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const words = [
  "Growth",
  "Visibility",
  "Engagement",
  "Leads",
  "Branding",
  "Strategy",
  "Performance",
  "Conversions",
  "Reach",
  "Impact",
];

export default function CareerSection() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Refs for GSAP
  const containerRef = useRef<HTMLElement>(null);
  const animatingLogoRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  /* GSAP Animation Logic */
  useGSAP(
    () => {
      if (!animatingLogoRef.current) return;

      const tl = gsap.timeline({ 
        repeat: -1, // Loops the entire sequence
        defaults: { ease: "power2.inOut", duration: 1.5 } 
      });

      // Initial state: Centered vertically on the left
      gsap.set(animatingLogoRef.current, { yPercent: -50 });

      tl.to(animatingLogoRef.current, { scale: 1.5, xPercent: 30 })
        .to(animatingLogoRef.current, { scale: 2, xPercent: 100, yPercent: -150 })
        .to(animatingLogoRef.current, { rotate: 45, duration: 0.8 })
        .to(animatingLogoRef.current, { rotate: 135, duration: 0.8 })
        .to(animatingLogoRef.current, { rotate: 360, duration: 1 })
        // Reset Phase: Snap rotation to 0 instantly so it doesn't spin back
        .set(animatingLogoRef.current, { rotate: 0 }) 
        .to(animatingLogoRef.current, {
          yPercent: -50,
          xPercent: 0,
          scale: 1,
        });
    },
    { scope: containerRef }
  );

  /* Typewriter Effect */
  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1000);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);

return (
  <section
    ref={containerRef}
    className="relative min-h-fit lg:min-h-screen py-16 lg:py-0 overflow-hidden bg-black text-white font-kumbh"
  >
    {/* BACKGROUND LAYER */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* grid dots */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* GSAP Animated Logo */}
      <div
        ref={animatingLogoRef}
        className="absolute left-4 top-1/2 opacity-40 sm:left-8 md:left-10 md:opacity-100"
      >
        <Image
          src="/logo_career.png"
          alt="animated bg logo"
          width={181}
          height={214}
          priority
          className="w-[90px] sm:w-[130px] md:w-[181px] h-auto"
        />
      </div>
    </div>

    {/* CONTENT LAYER */}
    <div className="relative z-10 mx-auto w-full max-w-[1600px]">
      {/* TOP TYPE EFFECT */}
     <div className="px-5 pt-16 sm:px-6 sm:pt-20 lg:px-20">
  <div className="mx-auto flex h-[64px] w-full max-w-[620px] items-center justify-center overflow-hidden border border-[#ef832d] bg-black/50 px-4 backdrop-blur-sm sm:h-[82px] md:h-[105px] lg:mx-0 lg:h-[120px]">
    <h2 className="text-center text-[30px] font-light uppercase leading-none tracking-wide text-[#ef832d] sm:text-[42px] md:text-[58px] lg:text-[74px]">
      {text}
      <span className="animate-pulse">|</span>
    </h2>
  </div>
</div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 sm:px-6 sm:pt-12 md:gap-14 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:pb-20">
        {/* LEFT */}
        <div className="relative order-2 lg:order-1">
          <div className="mx-auto max-w-[760px] text-center lg:mx-0 lg:text-left">
            <h3 className="mb-5 text-[22px] font-bold leading-[1.25] text-white sm:text-[26px] md:mb-7 md:text-[30px] lg:text-[32px]">
              Join Bindzo 8 – Where Innovation Meets Opportunity
            </h3>

            <p className="mb-5 text-justify text-[15px] leading-[1.75] text-white/80 sm:text-[16px] md:text-[18px] md:leading-[1.85]">
              At Bindzo 8 Private Limited, we believe teamwork and innovation
              can create miracles. Step into the evolving tech world where ideas
              turn into impact realities.
            </p>

            <p className="mb-8 text-justify text-[15px] leading-[1.75] text-white/80 sm:text-[16px] md:mb-10 md:text-[18px] md:leading-[1.85]">
              We offer a space that encourages learning, creativity, growth,
              support, and fun team outings. Join us to explore, innovate, and
              grow with a team that values passion and purpose.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="flex items-center gap-3 rounded-full bg-[#ef832d] px-6 py-3 text-[15px] font-semibold text-black transition hover:bg-[#ff973f] sm:px-8 sm:text-[16px]">
                Start Your Career
                <motion.div
                  animate={{ x: ["0%", "50%", "0%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={22} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <Image
            src="/grid.gif"
            alt="grid graphic"
            width={620}
            height={620}
            unoptimized
            className="h-auto w-full max-w-[280px] object-contain animate-float sm:max-w-[380px] md:max-w-[500px] lg:max-w-[620px]"
          />
        </div>
      </div>
    </div>

    <style jsx>{`
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-12px);
        }
      }
    `}</style>
  </section>
);
}
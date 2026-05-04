"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const words = ["create", "update"];

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
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden text-white font-kumbh">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* grid dots */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:26px_26px]" />
        
        {/* GSAP Animated Logo */}
        <div
          ref={animatingLogoRef}
          className="absolute left-10 top-1/2"
        >
          <Image
            src="/logo_career.png" 
            alt="animated bg logo"
            width={181}
            height={214}
            priority
            className="z-5"
          />
        </div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        {/* TOP TYPE EFFECT */}
        <div className="pt-20 px-6 lg:px-20">
          <div className="max-w-[760px] border border-[#ef832d] h-[100px] md:h-[150px] flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
            <h2 className="text-[#ef832d] text-5xl md:text-[80px] lg:text-[110px] font-light tracking-wide leading-none">
              {text}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="px-6 lg:px-20 pt-12 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="relative">
            <div className="max-w-[760px]">
              <h3 className="text-base md:text-[24px] font-bold leading-tight mb-8">
                Join Bindzo 8 – Where Innovation Meets Opportunity
              </h3>

              <p className="text-white/80 text-[16px] md:text-[20px] leading-[1.8] mb-8">
                At Bindzo 8 Techno Solutions, we believe teamwork and innovation
                can create miracles. Step into the evolving tech world where ideas
                turn into impact realities.
              </p>

              <p className="text-white/80 text-[16px] md:text-[20px] leading-[1.8] mb-12">
                We offer a space that encourages learning, creativity, growth,
                support, and fun team outings. Join us to explore, innovate, and
                grow with a team that values passion and purpose.
              </p>

              <button className="bg-[#ef832d] hover:bg-[#ff973f] transition px-8 py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-4">
                Start Your Career
                <motion.div
                  animate={{ x: ["0%", "50%", "0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/image(29).png"
              alt="grid graphic"
              className="w-full max-w-[620px] object-contain animate-float"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
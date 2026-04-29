"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import gsap from "gsap";
/* ------------------------------------------------------------------ */
/*  Slide data — replace src values with real screenshots when ready    */
/* ------------------------------------------------------------------ */
const slides = [
  {
    id: 1,
    bg: "from-[#0d1b2a] to-[#1b3a5c]",
    accent: "#64b5f6",
    label: "Travel & Explore",
    desc: "Responsive multi-platform web experience",
    device: "laptop",
  },
  {
    id: 2,
    bg: "from-[#72c6ef] to-[#004e8c]",
    accent: "#ffffff",
    label: "Landscape Discovery",
    desc: "Nature photography portfolio",
    device: "tablet",
  },
  {
    id: 3,
    bg: "from-[#fff3e0] to-[#ffe0b2]",
    accent: "#e65100",
    label: "Food & Lifestyle",
    desc: "E-commerce & delivery platform",
    device: "mobile",
  },
  {
    id: 4,
    bg: "from-[#e8f5e9] to-[#c8e6c9]",
    accent: "#2e7d32",
    label: "Green Living",
    desc: "Sustainability & eco-tech app",
    device: "laptop",
  },
  {
    id: 5,
    bg: "from-[#fce4ec] to-[#f8bbd0]",
    accent: "#ad1457",
    label: "Beauty & Wellness",
    desc: "Booking & CRM solution",
    device: "mobile",
  },
];

/* ------------------------------------------------------------------ */
/*  Device mock SVGs (inline, no external asset needed)                 */
/* ------------------------------------------------------------------ */
function LaptopMock({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-[280px]" fill="none">
      {/* Screen body */}
      <rect x="20" y="10" width="280" height="160" rx="8" fill="#1a1a2e" />
      <rect x="28" y="18" width="264" height="144" rx="4" fill={accent} opacity="0.15" />
      {/* Screen content lines */}
      <rect x="40" y="35" width="120" height="8" rx="3" fill={accent} opacity="0.6" />
      <rect x="40" y="52" width="80" height="5" rx="2" fill={accent} opacity="0.4" />
      <rect x="40" y="65" width="100" height="5" rx="2" fill={accent} opacity="0.3" />
      <rect x="40" y="78" width="90" height="5" rx="2" fill={accent} opacity="0.3" />
      {/* Image block */}
      <rect x="180" y="30" width="100" height="110" rx="6" fill={accent} opacity="0.25" />
      <rect x="190" y="40" width="80" height="55" rx="3" fill={accent} opacity="0.35" />
      {/* Base */}
      <path d="M0 172 L20 172 L25 182 L295 182 L300 172 L320 172 L320 185 L0 185 Z" fill="#111" />
      <rect x="120" y="182" width="80" height="4" rx="2" fill="#333" />
    </svg>
  );
}

function TabletMock({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 260" className="w-full max-w-[160px]" fill="none">
      <rect x="10" y="10" width="180" height="240" rx="12" fill="#1a1a2e" />
      <rect x="18" y="22" width="164" height="208" rx="6" fill={accent} opacity="0.15" />
      <rect x="30" y="35" width="140" height="80" rx="4" fill={accent} opacity="0.3" />
      <rect x="30" y="125" width="80" height="6" rx="2" fill={accent} opacity="0.6" />
      <rect x="30" y="140" width="100" height="5" rx="2" fill={accent} opacity="0.4" />
      <rect x="30" y="153" width="70" height="5" rx="2" fill={accent} opacity="0.3" />
      <circle cx="100" cy="245" r="6" fill="#333" />
    </svg>
  );
}

function MobileMock({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 220" className="w-full max-w-[90px]" fill="none">
      <rect x="5" y="5" width="110" height="210" rx="18" fill="#1a1a2e" />
      <rect x="12" y="20" width="96" height="170" rx="6" fill={accent} opacity="0.15" />
      <rect x="45" y="8" width="30" height="5" rx="2" fill="#333" />
      <rect x="20" y="32" width="80" height="60" rx="4" fill={accent} opacity="0.3" />
      <rect x="20" y="102" width="50" height="6" rx="2" fill={accent} opacity="0.6" />
      <rect x="20" y="116" width="70" height="4" rx="2" fill={accent} opacity="0.4" />
      <rect x="20" y="128" width="60" height="4" rx="2" fill={accent} opacity="0.3" />
      <circle cx="60" cy="205" r="6" fill="#333" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Root wrapper                                                         */
/* ------------------------------------------------------------------ */
export default function ShowcaseSections() {
  return (
    <section className="relative overflow-hidden font-kumbh bg-[#f3f1f1]">
      {/* Shared ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[38%] h-[45%] bg-gradient-to-r from-[#dbe8ff] to-transparent blur-2xl opacity-80" />
        <div className="absolute top-[35%] left-[35%] w-[420px] h-[420px] rounded-full bg-[#ffd9e4] blur-[140px] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[35%] h-[40%] bg-gradient-to-l from-[#dce7f8] to-transparent blur-2xl opacity-70" />
      </div>

      <ProductSection />
      <WhyChooseUs />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT SECTION                                                      */
/* ------------------------------------------------------------------ */


function ProductSection() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, {
        left: "8%",
        top: "58%",
        rotation: -20,
        opacity: 0.06,
        scale: 1,
      });

      gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "sine.inOut",
        },
      })

      // move to center top
      .to(logoRef.current, {
        duration: 6,
        left: "28%",
        top: "22%",
        rotation: 65,
        scale: 1.08,
        opacity: 0.08,
      })

      // move right center
      .to(logoRef.current, {
        duration: 6,
        left: "62%",
        top: "38%",
        rotation: 160,
        scale: 1,
        opacity: 0.05,
      })

      // move out right
      .to(logoRef.current, {
        duration: 5,
        left: "85%",
        top: "58%",
        rotation: 240,
        opacity: 0,
        scale: 0.95,
      })

      // reset invisible left
      .set(logoRef.current, {
        left: "-10%",
        top: "65%",
        rotation: -60,
        opacity: 0,
      })

      // fade in again
      .to(logoRef.current, {
        duration: 4,
        left: "8%",
        top: "58%",
        rotation: -20,
        opacity: 0.06,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      // ref={sectionRef}
      className="relative min-h-[640px] flex items-center overflow-visible border border-black"
    >
      {/* Animated watermark */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 border border-green-500 max-h-[350px] my-auto"
        ref={sectionRef}
      >
        <img
          ref={logoRef}
          src="/home/ourProducts/Bindzo_logo.png"
          alt=""
          className="absolute w-[clamp(120px,16vw,220px)] h-auto object-contain "
        />
      </div>

      {/* LEFT — copy */}
      <article className="relative z-10 flex-1 flex justify-center items-center px-8 lg:px-16">
        <div className="flex flex-col gap-7 max-w-xs">
          <span className="text-[#E7325C] text-lg font-semibold tracking-wide">
            Our Products
          </span>

          <h2 className="font-bold text-black text-[2.25rem] leading-tight">
            Latest Projects
            <br />
            From Our Team
          </h2>

          <button className="flex items-center gap-2 self-start border border-[#E7325C] text-[#E7325C] px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#E7325C] hover:text-white transition-all duration-300 group">
            View all Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </article>

      {/* RIGHT — carousel */}
      <article className="relative z-10 flex-1 flex justify-center items-center py-16 pr-4 overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "center", loop: true }}
          className="w-full max-w-[560px]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="pl-4 basis-[75%] sm:basis-[70%]"
              >
                <div
                  className={`relative rounded-2xl bg-gradient-to-br ${slide.bg} p-6 h-[320px] flex flex-col justify-between shadow-xl overflow-hidden`}
                >
                  {/* your slide content */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10" />

          <CarouselNext className="-right-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10" />
        </Carousel>
      </article>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY CHOOSE US                                                        */
/* ------------------------------------------------------------------ */
function WhyChooseUs() {
  return (
    <section className="relative min-h-[640px] flex items-center px-8 lg:px-24 py-20">
      {/* soft left blue wash */}
      <div className="absolute left-0 top-0 h-full w-[38%] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center w-full">
        {/* LEFT */}
        <div className="max-w-[520px]">
          <p className="text-black text-[18px] mb-5 font-medium tracking-wide">
            Why Choose Us?
          </p>

          <h2 className="text-[2.6rem] lg:text-[3rem] font-bold leading-tight text-black mb-7">
            We're Bindzo IT Solutions Pvt Ltd
          </h2>

          <p className="text-[16px] lg:text-[17px] leading-[1.85] text-black/65 mb-12 text-justify">
            Bindzo IT Solutions Pvt. Ltd. takes your business beyond boundaries
            with smart, scalable, and secure technology solutions. As a trusted
            end-to-end IT service partner, we deliver innovation that drives
            growth and efficiency. Our dedicated team ensures seamless IT
            support and strategic digital transformation tailored to your
            business goals. At Bindzo, we grow together, through collaboration,
            creativity, and a shared vision for success.
          </p>

          <button className="border border-[#ff3b6a] text-[#ff3b6a] px-12 py-4 rounded-full text-[18px] hover:bg-[#ff3b6a] hover:text-white transition-all duration-300">
            Explore
          </button>
        </div>

        {/* RIGHT — illustration */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/why_choose_us.png"
            alt="Bindzo team collaborating"
            className="w-full max-w-[480px] object-contain animate-float"
            
          />
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    tab: "ROI Tracking",
    title: "ROI Tracking",
    image: "/Property 1=Group 131.svg",
    points: [
      "Every campaign is monitored with advanced analytics to show exactly what returns you are getting.",
      "We track clicks, leads, conversions, and sales to ensure your investment is generating real growth.",
      "Transparent performance reports help you understand which strategies work best for your business.",
    ],
  },
  {
    tab: "KPI Optimization",
    title: "KPI Optimization",
    image: "/Property 1=Group 132.svg",
    points: [
      "We continuously optimize cost per click, conversion rate, and acquisition metrics.",
      "Underperforming ads are refined fast to reduce waste and improve output.",
      "Your budget is redirected toward the highest-performing channels.",
    ],
  },
  {
    tab: "Brand Reach",
    title: "Brand Reach",
    image: "/Property 1=Group 133.svg",
    points: [
      "Expand your brand visibility across multiple online platforms.",
      "Reach new customers with targeted campaigns.",
      "Build stronger recognition through consistent messaging.",
    ],
  },
  {
    tab: "Revenue Growth",
    title: "Revenue Growth",
    image: "/Property 1=Group 134.svg",
    points: [
      "Campaigns are focused on measurable business growth.",
      "We optimize funnels to improve conversions.",
      "Marketing efforts are aligned with revenue goals.",
    ],
  },
  {
    tab: "Faster Results",
    title: "Faster Results",
    image: "/Property 1=Group 135.svg",
    points: [
      "Launch campaigns faster with tested strategies.",
      "Reduce trial-and-error using data-driven decisions.",
      "Get quick feedback from campaign performance.",
    ],
  },
];

export default function KeyBenefitsScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${benefits.length * 700}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (benefits.length - 1));
          setActiveIndex(index);
        },
      });
    },
    { scope: sectionRef }
  );

  const active = benefits[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#004b5a_0%,transparent_35%),radial-gradient(circle_at_left_bottom,#706a00_0%,transparent_30%),radial-gradient(circle_at_right_bottom,#7b004e_0%,transparent_35%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-8">
        <button className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-black">
          ←
        </button>

        <div className="grid w-full max-w-6xl grid-cols-[320px_1fr] items-center gap-20">
          {/* LEFT TABS */}
          <div className="relative flex items-center gap-10">
            <h2 className="-rotate-90 whitespace-nowrap text-2xl">
              Key Benefits
            </h2>

            <div className="relative flex flex-col gap-9">
              <div className="absolute left-full top-0 h-full w-px bg-white/70" />

              {benefits.map((item, index) => (
                <button
                  key={item.tab}
                  className={`relative w-[170px] rounded-md border px-4 py-2 text-sm transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-orange-500 text-white border-orange-400 font-semibold"
                      : "bg-white text-orange-500 border-white"
                  }`}
                >
                  {item.tab}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            ref={contentRef}
            key={active.title}
            className="flex flex-col items-center text-center"
          >
            <h3 className="mb-10 text-2xl">{active.title}</h3>

            <ol className="mb-12 max-w-[620px] list-decimal space-y-4 text-left text-sm leading-snug">
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>

            <div className="relative h-[220px] w-[260px]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <button className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/60 p-3 text-black">
          →
        </button>
      </div>
    </section>
  );
}
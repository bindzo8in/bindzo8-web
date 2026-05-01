"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const slideData = [
  {
    title: "ROI Tracking",
    content: [
      "Every campaign is monitored with advanced analytics to show exactly what returns you are getting.",
      "We track clicks, leads, conversions, and sales to ensure your investment is generating real growth.",
      "Transparent performance reports help you understand which strategies work best for your business.",
    ],
    media: "/key_benefit/ROI.png",
  },
  {
    title: "KPI Optimization",
    content: [
      "We continuously refine your campaigns to improve results across all key performance indicators.",
      "Metrics like engagement, reach, cost-per-click, and conversion rates are optimized for maximum impact.",
      "Data-driven adjustments ensure your marketing stays efficient, powerful, and aligned with your goals.",
    ],
    media: "/key_benefit/KPI.png",
  },
  {
    title: "Brand Reach",
    content: [
      "We expand your brand visibility across social media, search engines, and digital platforms.",
      "Targeted advertising helps you reach the right audience at the right time.",
      "Consistent content and creative campaigns help your brand become easily recognizable and memorable.",
    ],
    media: "/key_benefit/brand.png",
  },
  {
    title: "Revenue Growth",
    content: [
      "Our strategies focus on attracting high-quality leads that convert into paying customers.",
      "With strong targeting and optimized campaigns, your business generates increased sales and long-term revenue.",
      "We build marketing funnels that guide customers smoothly from awareness to purchase.",
    ],
    media: "/key_benefit/revenue.png",
  },
  {
    title: "Faster Results",
    content: [
      "Our proven marketing frameworks deliver quick improvements in reach, leads, and engagement.",
      "Automated processes and optimized ad setups accelerate performance from day one.",
      "You get rapid visibility and faster conversions without compromising quality.",
    ],
    media: "/key_benefit/fast.png",
  },
];

const KeybenefitContent = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${slideData.length * window.innerHeight}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (slideData.length - 1));
          setSelectedIndex(index);
        },
      });
    },
    { scope: sectionRef }
  );

  const selectedSlide = slideData[selectedIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden py-[95px]"
    >
      <div className="flex h-full w-full items-center justify-center">
        <header className="relative h-[220px] w-[40px] shrink-0">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-2xl text-white">
            Key Benefits
          </h1>
        </header>

        {/* selector section */}
        <section className="flex flex-col gap-16 border-r border-r-white">
          {slideData.map((slide, index) => (
            <Button
              key={slide.title}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "min-w-[156px] rounded-none rounded-bl-md rounded-tl-md px-8 py-5 transition-all duration-300",
                selectedIndex === index
                  ? "bg-[#EF8030] text-white"
                  : "bg-white text-[#EF8030]"
              )}
            >
              {slide.title}
            </Button>
          ))}
        </section>

        {/* content section */}
        <section className="flex min-w-[650px] flex-col items-center justify-center gap-4 p-8 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSlide.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <header>
                <h2 className="text-2xl">{selectedSlide.title}</h2>
              </header>

              <ol className="space-y-4 pl-16">
                {selectedSlide.content.map((item) => (
                  <li key={item} className="max-w-xl list-decimal text-wrap">
                    {item}
                  </li>
                ))}
              </ol>

              <figure className="relative h-64 w-64">
                <Image
                  src={selectedSlide.media}
                  alt={selectedSlide.title}
                  fill
                  className="object-contain"
                />
              </figure>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </section>
  );
};

export default KeybenefitContent;
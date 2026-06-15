"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

gsap.registerPlugin(useGSAP);

const BASE_W = 830;
const BASE_H = 767;

const slots = [
  {
    x: 95,
    y: 55,
    size: 335,
    color: "#C90000",
    fontSize: 38,
    z: 5,
  },
  {
    x: 500,
    y: 155,
    size: 275,
    color: "#E22E33",
    fontSize: 30,
    z: 4,
  },
  {
    x: 700,
    y: 405,
    size: 125,
    color: "#FBDDDD",
    fontSize: 10,
    z: 1,
  },
  {
    x: 485,
    y: 505,
    size: 180,
    color: "#F8AAAA",
    fontSize: 16,
    z: 2,
  },
  {
    x: 140,
    y: 455,
    size: 265,
    color: "#FF6B70",
    fontSize: 26,
    z: 3,
  },
];

const circles = [
  {
    title: "On- Page\nSEO",
    slot: 0,
  },
  {
    title: "Technical\nSeo",
    slot: 1,
  },
  {
    title: "Content\nOptimization",
    slot: 2,
  },
  {
    title: "Local\nSEO",
    slot: 3,
  },
  {
    title: "Off-Page\nSEO",
    slot: 4,
  },
];

const seoContent = [
  {
    title: "On-Page Optimization",
    points: [
      "Keyword research",
      "Optimized titles, meta descriptions, headings",
      "Structured content and internal linking",
      "Image and speed optimization",
    ],
  },
  {
    title: "Technical SEO",
    points: [
      "Website speed improvement",
      "Mobile-friendly optimization",
      "Fixing index errors and broken links",
      "Schema markup integration",
      "Sitemap & robots setup",
    ],
  },
  {
    title: "Off-Page SEO",
    points: [
      "High-quality backlink building",
      "Social signals",
      "Brand mentions",
      "Guest posts & directory submissions",
    ],
  },
  {
    title: "Local SEO",
    points: [
      "Google Business Profile setup",
      "Local citations",
      "Map ranking optimization",
      "Local keyword targeting",
    ],
  },
  {
    title: "Content Optimization",
    points: [
      "SEO-friendly blog writing",
      "Keyword-rich content for pages",
      "Topic clusters and pillar pages",
      "Engaging, informative content for users",
    ],
  },
];

const KeySeoContent = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const slotIndexes = useRef(circles.map((circle) => circle.slot));
  const isAnimating = useRef(false);

  const applySlot = (
    el: HTMLDivElement,
    slotIndex: number,
    immediate = false
  ) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();

    const scale = Math.min(rect.width / BASE_W, rect.height / BASE_H);
    const offsetX = (rect.width - BASE_W * scale) / 2;
    const offsetY = (rect.height - BASE_H * scale) / 2;

    const slot = slots[slotIndex];
    const circleSize = slot.size * scale;
    const fontSize = slot.fontSize * scale;

    const vars = {
      x: offsetX + slot.x * scale,
      y: offsetY + slot.y * scale,
      width: circleSize,
      height: circleSize,
      backgroundColor: slot.color,
      fontSize: Math.max(fontSize, 8),
      padding: Math.max(circleSize * 0.12, 6),
      zIndex: slot.z,
    };

    if (immediate) {
      gsap.set(el, vars);
      return;
    }

    gsap.to(el, {
      ...vars,
      duration: 1.15,
      ease: "power2.inOut",
    });
  };

  const moveCircles = (direction: "next" | "prev" = "next") => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    circleRefs.current.forEach((el, index) => {
      const currentSlot = slotIndexes.current[index];

      const nextSlot =
        direction === "next"
          ? (currentSlot - 1 + slots.length) % slots.length
          : (currentSlot + 1) % slots.length;

      slotIndexes.current[index] = nextSlot;
      applySlot(el, nextSlot);
    });

    gsap.delayedCall(1.15, () => {
      isAnimating.current = false;
    });
  };

  useGSAP(
    () => {
      circleRefs.current.forEach((el, index) => {
        applySlot(el, slotIndexes.current[index], true);
      });

      const animationTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.35,
      });

      animationTl.call(() => moveCircles("next"));
      animationTl.to({}, { duration: 1.8 });

      const glowTl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      glowTl.to(".seo-glow-blue", {
        x: 60,
        y: 40,
        scale: 1.12,
        duration: 4,
        ease: "sine.inOut",
      });

      glowTl.to(
        ".seo-glow-yellow",
        {
          x: -40,
          y: -30,
          scale: 1.1,
          duration: 4,
          ease: "sine.inOut",
        },
        0
      );

      glowTl.to(
        ".seo-glow-pink",
        {
          x: -60,
          y: 45,
          scale: 1.15,
          duration: 4,
          ease: "sine.inOut",
        },
        0
      );

      const resizeObserver = new ResizeObserver(() => {
        circleRefs.current.forEach((el, index) => {
          applySlot(el, slotIndexes.current[index], true);
        });
      });

      if (stageRef.current) {
        resizeObserver.observe(stageRef.current);
      }

      return () => {
        animationTl.kill();
        glowTl.kill();
        resizeObserver.disconnect();
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <HorizontalSlide
      className="
        overflow-hidden
        flex justify-center items-center
      "
    >
      <div
        ref={sectionRef}
        className="
          relative w-full overflow-hidden font-kumbh text-white

          py-12
          sm:py-14

          lg:mt-[96px]
          lg:h-[calc(100%-96px)]
          lg:py-0
        "
      >
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-[1320px]
            flex-col
            gap-8
            px-5

            sm:px-6

            lg:grid
            lg:h-full
            lg:grid-rows-[auto_1fr]
            lg:items-center
            lg:gap-2
            lg:px-4
            lg:py-2

            lg:grid-cols-[380px_1fr]
            lg:grid-rows-1
            lg:gap-4
            lg:px-8
            lg:py-0

            xl:grid-cols-[420px_1fr]
          "
        >
          {/* Mobile Heading */}
          <div className="lg:hidden">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#d3325c]">
              SEO Services
            </p>

            <h2 className="max-w-[340px] text-[28px] font-semibold leading-tight text-white">
              Key SEO Services We Provide
            </h2>

            <p className="mt-3 max-w-[350px] text-[14px] leading-relaxed text-white/70">
              Improve search visibility, page performance, keyword ranking, and
              organic business growth.
            </p>
          </div>

          {/* Left content */}
          <div
            className="
              order-3 flex w-full items-center justify-center

              lg:order-none
              lg:h-full
            "
          >
            <div className="w-full max-w-[430px] lg:max-w-[340px]">
              <h2 className="mb-2 hidden text-xs font-bold text-[#d3325c] sm:text-sm lg:mb-3 lg:block lg:text-base">
                Key SEO Services We Provide
              </h2>

              <div
                className="
                  grid grid-cols-1 gap-3

                  sm:grid-cols-2

                  lg:block
                  lg:space-y-3
                "
              >
                {seoContent.map((item, index) => (
                  <div
                    key={item.title}
                    className="
                      rounded-[20px]
                      border
                      border-white/10
                      bg-white/[0.06]
                      p-4
                      shadow-[0_16px_50px_rgba(0,0,0,0.22)]
                      backdrop-blur-md

                      lg:rounded-none
                      lg:border-0
                      lg:bg-transparent
                      lg:p-0
                      lg:shadow-none
                      lg:backdrop-blur-0
                    "
                  >
                    <h3 className="text-[14px] font-bold leading-tight text-white lg:text-base">
                      <span className="text-[#d3325c] lg:hidden">
                        {String(index + 1).padStart(2, "0")}.
                      </span>

                      <span className="hidden lg:inline">{index + 1}. </span>

                      {item.title}
                    </h3>

                    <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-white/75 lg:mt-0.5 lg:space-y-0 lg:text-[13px] lg:leading-snug">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 lg:block">
                          <span className="mt-[1px] text-[#d3325c] lg:hidden">
                            •
                          </span>
                          <span>
                            <span className="hidden lg:inline">· </span>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right animation */}
          <div
            className="
              order-2 relative flex w-full items-center justify-center overflow-visible

              lg:order-none
              lg:h-full
            "
          >
            <div
              className="
                relative
                aspect-[830/767]
                h-[310px]
                max-w-full
                overflow-visible

                sm:h-[430px]

                lg:h-[clamp(430px,58vh,560px)]
                lg:max-h-[calc(100svh-150px)]

                xl:h-[clamp(460px,62vh,590px)]
              "
            >
              <div
                ref={stageRef}
                className="relative h-full w-full overflow-visible"
              >
                {circles.map((circle, index) => (
                  <div
                    key={circle.title}
                    ref={(el) => {
                      if (el) circleRefs.current[index] = el;
                    }}
                    className="
                      absolute
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      text-center
                      font-bold
                      leading-[1.05]
                      text-white
                      shadow-[0_18px_60px_rgba(0,0,0,0.28)]
                      will-change-transform

                      lg:shadow-none
                    "
                  >
                    <span className="block max-w-full break-words px-1">
                      {circle.title.split("\n").map((line) => (
                        <Fragment key={line}>
                          {line}
                          <br />
                        </Fragment>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HorizontalSlide>
  );
};

export default KeySeoContent;
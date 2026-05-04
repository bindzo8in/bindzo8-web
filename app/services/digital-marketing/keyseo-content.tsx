"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

gsap.registerPlugin(useGSAP);

const NAV_HEIGHT = 96;

const BASE_W = 830;
const BASE_H = 767;

const slots = [
  {
    x: 95,
    y: 55,
    size: 335,
    color: "#C90000",
    fontSize: 42,
    z: 5,
  },
  {
    x: 500,
    y: 155,
    size: 275,
    color: "#E22E33",
    fontSize: 34,
    z: 4,
  },
  {
    x: 700,
    y: 405,
    size: 125,
    color: "#FBDDDD",
    fontSize: 18,
    z: 1,
  },
  {
    x: 485,
    y: 505,
    size: 180,
    color: "#F8AAAA",
    fontSize: 26,
    z: 2,
  },
  {
    x: 140,
    y: 455,
    size: 265,
    color: "#FF6B70",
    fontSize: 32,
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

    const vars = {
      x: offsetX + slot.x * scale,
      y: offsetY + slot.y * scale,
      width: slot.size * scale,
      height: slot.size * scale,
      backgroundColor: slot.color,
      fontSize: Math.max(slot.fontSize * scale, 9),
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
        className="relative mt-[96px] h-[calc(100%-96px)] w-full overflow-hidden font-kumbh text-white"
      >
        <div
          className="
          relative
          z-10
          mx-auto
          grid
          h-full
          w-full
          max-w-[1320px]
          grid-rows-[auto_1fr]
          items-center
          gap-2
          px-4
          py-2
          sm:px-6
          lg:grid-cols-[300px_1fr]
          lg:grid-rows-1
          lg:gap-4
          lg:px-8
          lg:py-0
          xl:grid-cols-[340px_1fr]
        "
        >
          {/* Left content */}
          <div className="w-full max-w-[340px] lg:pl-3 xl:pl-6">
            <h2 className="mb-2 text-xs font-bold text-orange-500 sm:text-sm lg:mb-3 lg:text-base">
              Key SEO Services We Provide
            </h2>

            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              {seoContent.map((item, index) => (
                <div key={item.title}>
                  <h3 className="text-xs font-bold leading-tight sm:text-sm lg:text-base">
                    {index + 1}. {item.title}
                  </h3>

                  <ul className="mt-0.5 space-y-0 text-[11px] leading-snug text-white/85 sm:text-xs lg:text-[13px]">
                    {item.points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right animation */}
          <div className="relative flex h-full w-full items-center justify-center overflow-visible">
            <div
              className="
              relative
              aspect-[830/767]
              h-[clamp(260px,52vw,520px)]
              max-h-[calc(100svh-150px)]
              max-w-full
              overflow-visible
              sm:h-[clamp(320px,56vw,560px)]
              lg:h-[clamp(430px,58vh,560px)]
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
                    className="absolute flex items-center justify-center rounded-full text-center font-bold leading-tight text-white will-change-transform"
                  >
                    {circle.title.split("\n").map((line) => (
                      <Fragment key={line}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
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
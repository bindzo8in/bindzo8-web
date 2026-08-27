"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const data = [
  {
    title: "Digital Product Design",
    desc: "We design digital products from early concepts to scalable systems. Combining product strategy, UX and interface design, we help startups and established companies turn complex ideas into clear, usable experiences.",
  },
  {
    title: "Web Design & Development",
    desc: "We create marketing websites that explain products clearly, strengthen brands and support business growth. From structure and content to responsive design and development, every website is built around a specific goal.",
  },
  {
    title: "UX Research & UI Design",
    desc: "We uncover how people use digital products and where their experience breaks down. Through research, user flows, wireframes and prototypes, we improve usability before moving into interface design.",
  },
  {
    title: "Brand Identity",
    desc: "We create visual identities that give companies a distinct and consistent presence. From typography and color to digital guidelines and campaign assets, every element is designed to work as one system.",
  },
  {
    title: "Creative Development",
    desc: "We bring ambitious digital concepts to life through motion, 3D and interactive development. Using technologies such as WebGL, GSAP and modern JavaScript frameworks, we build experiences that standard templates cannot deliver.",
  },
];

export default function ServiceSection() {
  const introRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    const section = introRef.current;

    if (!section) return;

    const heading = section.querySelector(".service-intro-heading");
    const paragraph = section.querySelector(".service-intro-paragraph");

    if (!heading || !paragraph) return;

    /*
     * =========================================================
     * HEADING WORD SPLIT
     * =========================================================
     */

    const headingText = heading.textContent?.trim() || "";
    const headingWords = headingText.split(" ");

    heading.innerHTML = headingWords
      .map((word, index) => {
        const isLast = index === headingWords.length - 1;

        const gradientClass = isLast
          ? " bg-gradient-to-r from-[#E7325C] to-[#EF8030] bg-clip-text text-transparent"
          : "";

        return `<span class="service-intro-word-mask inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]"><span class="service-intro-word inline-block${gradientClass}">${word}</span></span>`;
      })
      .join(" ");

    const words = heading.querySelectorAll(
      ".service-intro-word",
    );

    /*
     * =========================================================
     * INITIAL STATE
     * =========================================================
     */

    gsap.set(words, {
      yPercent: 110,
      opacity: 0,
    });

    gsap.set(paragraph, {
      y: 35,
      opacity: 0,
    });

    /*
     * =========================================================
     * SCROLL ANIMATION
     * =========================================================
     */

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    });

    /*
     * Heading
     */

    tl.to(
      words,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      },
      0,
    );

    /*
     * Paragraph
     */

    tl.to(
      paragraph,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0.55,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  },
  {
    scope: introRef,
  },
);

  return (
    <section id="home-what-we-do" className="w-full">
      {/* Intro */}
<div
  ref={introRef}
  className="
    mx-auto
    w-full
    max-w-7xl
    px-6
    pb-12
    pt-24
    md:px-8
    lg:px-16
    lg:pb-16
    lg:pt-32
    xl:px-32
  "
>
  <div className="max-w-7xl">

    {/* =====================================================
        TOP META
    ===================================================== */}

    <div className="service-intro-meta flex items-center justify-between border-b border-black/10 pb-5">
      <div className="flex items-center gap-3">
        <span className="service-intro-dot h-2 w-2 rounded-full bg-black" />

        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-gray-400
          "
        >
          Services
        </span>
      </div>

      <span
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-gray-400
        "
      >
        01 — 05
      </span>
    </div>

    {/* =====================================================
        MAIN TITLE
    ===================================================== */}

    <div className="mt-10 lg:mt-14">

      <p
        className="
          service-intro-kicker
          mb-5
          text-xs
          font-medium
          uppercase
          tracking-[0.2em]
          text-gray-400
        "
      >
        What we bring to the table
      </p>

      <h2
        className="
          service-intro-heading
          max-w-6xl
          text-[clamp(4rem,11vw,10rem)]
          font-medium
          leading-[0.78]
          tracking-tight
          text-black
        "
      >
        What we do
      </h2>

    </div>

    {/* =====================================================
        DESCRIPTION
    ===================================================== */}

    <div
      className="
        mt-12
        flex
        flex-col
        gap-8
        lg:mt-16
        lg:flex-row
        lg:items-start
        lg:justify-between
      "
    >

      <div className="service-intro-line h-px w-20 bg-black lg:mt-3" />

      <p
        className="
          service-intro-paragraph
          max-w-2xl
          text-base
          leading-[1.7]
          text-gray-500
          lg:text-lg
        "
      >
        We partner with ambitious teams to design brands, websites and
        digital products that combine thoughtful strategy, beautiful design
        and technology to create meaningful results.
      </p>

      <span
        className="
          hidden
          text-[10px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-gray-400
          lg:block
        "
      >
        Strategy
        <br />
        Design
        <br />
        Technology
      </span>

    </div>

  </div>
</div>

      {/* Mobile */}
      <div className="block md:hidden">
        <MobileServiceSection />
      </div>

      {/* Tablet + Desktop */}
      <div className="hidden md:block">
        <DesktopServiceSection />
      </div>
    </section>
  );
}

function MobileServiceSection() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="flex flex-col gap-2">
        {data.map((item, index) => {
          const isActive = activeService === index;

          return (
            <article
              key={item.title}
              onClick={() =>
                setActiveService((prev) => (prev === index ? null : index))
              }
              className={cn(
                "flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-6",
                "transition-all duration-500",
                isActive && "bg-primary text-gray-100",
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm text-gray-400",
                      isActive && "text-white/70",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4 className="text-2xl font-semibold leading-tight">
                  {item.title}
                </h4>
              </div>

              <div
                className={cn(
                  "grid transition-all duration-500",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-md pb-2 pt-2 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function DesktopServiceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const wrapper = cardsWrapperRef.current;

        if (!section || !wrapper) return;

        const cards = gsap.utils.toArray<HTMLElement>(".desktop-service-card");

        const descriptions = gsap.utils.toArray<HTMLElement>(
          ".desktop-service-desc",
        );

        const numbers = gsap.utils.toArray<HTMLElement>(
          ".desktop-service-number",
        );

        if (!cards.length) return;

        const primaryForeground = "var(--primary-foreground)";

        const white70 = "rgba(255,255,255,0.7)";

        /*
         * =========================================================
         * INITIAL STATE
         * =========================================================
         */

        gsap.set(descriptions, {
          height: 0,
          opacity: 0,
          y: 30,
          overflow: "hidden",
        });

        gsap.set(cards, {
          backgroundColor: "#f3f4f6",
          color: "inherit",
        });

        gsap.set(numbers, {
          color: "#9ca3af",
        });

        gsap.set(wrapper, {
          y: 0,
        });

        /*
         * =========================================================
         * MAIN SCROLL TIMELINE
         * =========================================================
         */

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },

          scrollTrigger: {
            trigger: section,

            start: "top top",

            /*
             * Long scroll distance.
             *
             * More distance = slower / smoother
             * Cuberto-style presentation.
             */
            end: `+=${cards.length * 1400}`,

            scrub: 1.4,

            pin: true,
            pinSpacing: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

        /*
         * =========================================================
         * CARD SEQUENCE
         * =========================================================
         */

        cards.forEach((card, index) => {
          const description = descriptions[index];
          const number = numbers[index];

          /*
           * -----------------------------------------------------
           * 1. ACTIVE CARD
           * -----------------------------------------------------
           */

          tl.to(card, {
            backgroundColor: "#000",
            color: primaryForeground,

            duration: 1,

            ease: "power3.inOut",
          });

          /*
           * Number
           */

          tl.to(
            number,
            {
              color: white70,

              duration: 1,

              ease: "power3.inOut",
            },
            "<",
          );

          /*
           * -----------------------------------------------------
           * 2. DESCRIPTION
           * -----------------------------------------------------
           */

          tl.to(
            description,
            {
              height: () => description.scrollHeight,

              opacity: 1,

              y: 0,

              duration: 1.2,

              ease: "power3.out",
            },
            "<0.15",
          );

          /*
           * -----------------------------------------------------
           * 3. HOLD
           * -----------------------------------------------------
           *
           * Let the active card breathe.
           */

          tl.to(
            {},
            {
              duration: 1,
            },
          );

          /*
           * -----------------------------------------------------
           * 4. CONTINUOUS STACK MOVEMENT
           * -----------------------------------------------------
           *
           * Instead of jumping 40% of viewport,
           * move the stack a small amount every time.
           *
           * This is the important Cuberto-style part.
           */

          if (index < cards.length - 1) {
            const moveAmount = window.innerHeight * 0.18;

            tl.to(wrapper, {
              y: `-=${moveAmount}`,

              duration: 1.8,

              ease: "power2.inOut",
            });

            /*
             * Tiny breathing space between cards.
             */

            tl.to(
              {},
              {
                duration: 0.35,
              },
            );
          }
        });

        /*
         * =========================================================
         * LAST CARD HOLD
         * =========================================================
         *
         * Important:
         * Don't immediately release the pin after card 5.
         */

        tl.to(
          {},
          {
            duration: 1.8,
          },
        );

        /*
         * =========================================================
         * REFRESH
         * =========================================================
         */

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        /*
         * Wait for layout.
         */

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            refresh();
          });
        });

        /*
         * Refresh after images load.
         */

        window.addEventListener("load", refresh);

        return () => {
          window.removeEventListener("load", refresh);
        };
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="
                min-h-screen
                overflow-hidden
                px-6
                pt-12
                pb-20
                md:px-8
                lg:px-16
                lg:pt-16
                xl:px-32
            "
    >
      <div
        ref={cardsWrapperRef}
        className="
                    mx-auto
                    w-full
                    max-w-7xl
                    will-change-transform
                "
      >
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <article
              key={item.title}
              className="
                                desktop-service-card
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-200
                                bg-gray-100
                                p-7
                                lg:p-10
                                will-change-[background-color,color]
                            "
            >
              {/* ==================================================
                                BACKGROUND IMAGE
                                ================================================== */}

              <div
                className="
                                    pointer-events-none
                                    absolute
                                    inset-y-0
                                    right-0
                                    hidden
                                    w-[40%]
                                    lg:block
                                "
              >
                <Image
                  src={`/img/services/${index + 1}.png`}
                  alt=""
                  fill
                  priority={index === 0}
                  className="
                                        object-cover
                                        object-center
                                    "
                  sizes="40vw"
                />

                <div
                  className="
        absolute
        inset-0
        bg-linear-to-r
        from-black
        via-black/70
        via-40%
        to-transparent
    "
                />
              </div>

              {/* ==================================================
                                CONTENT
                                ================================================== */}

              <div className="relative z-10">
                <div
                  className="
                                        flex
                                        items-start
                                        justify-between
                                        gap-6
                                    "
                >
                  <h4
                    className="
                                            max-w-3xl
                                            text-2xl
                                            font-medium
                                            leading-tight
                                            lg:text-4xl
                                        "
                  >
                    {item.title}
                  </h4>

                  <span
                    className="
                                            desktop-service-number
                                            shrink-0
                                            pt-1
                                            text-sm
                                            text-gray-400
                                        "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p
                  className="
                                        desktop-service-desc
                                        mt-6
                                        max-w-xl
                                        text-sm
                                        leading-relaxed
                                        lg:text-base
                                    "
                >
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
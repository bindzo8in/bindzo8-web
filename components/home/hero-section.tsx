"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const HEADING_WORDS = ["Crafting", "Digital", "Excellence"];

const DESCRIPTION =
  "We partner with ambitious businesses to build high-performance websites, custom software, and scalable marketing engines.";

export default function HomeHeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      const gradientWords = gsap.utils.toArray<HTMLElement>(
        ".hero-gradient-word",
      );
      const descriptionWords = gsap.utils.toArray<HTMLElement>(
        ".hero-description-word",
      );
      const buttons = gsap.utils.toArray<HTMLElement>(".hero-button");

      if (prefersReducedMotion) {
        gsap.set(letters, { autoAlpha: 1, y: 0, rotateX: 0 });
        gsap.set(gradientWords, { autoAlpha: 1, y: 0, x: 0 });
        gsap.set(descriptionWords, { autoAlpha: 1, y: 0 });
        gsap.set(buttons, { autoAlpha: 1, y: 0 });
        return;
      }

      // Initial states
      gsap.set(letters, { autoAlpha: 0, y: 90, rotateX: -55 });
      gsap.set(gradientWords, { autoAlpha: 0, y: 35, x: 20 });
      gsap.set(descriptionWords, { autoAlpha: 0, y: 22 });
      gsap.set(buttons, { autoAlpha: 0, y: 25 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Heading letters
      tl.to(letters, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "power4.out",
      });

      // 2. Gradient overlay (only opacity + slide, NO clip-path)
      tl.to(
        gradientWords,
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power4.out",
        },
        "-=0.35",
      );

      // Fade out underlying white text smoothly to prevent edge bleeding
      tl.to(
        ".hero-letter-hide",
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 3. Description
      tl.to(
        descriptionWords,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.018,
          ease: "power3.out",
        },
        "-=0.25",
      );

      // 4. Buttons
      tl.to(
        buttons,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.25",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      // CRITICAL: overflow visible for entire section
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-visible
        px-4
        py-24
        sm:px-6
      "
    >
      {/* ===== BACKGROUND (only here overflow hidden) ===== */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            inset-0
            scale-105
            bg-cover
            bg-center
            bg-no-repeat
            blur-sm
          "
          style={{ backgroundImage: "url('/img/background.webp')" }}
        /> */}
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden bg-[#0B0F19]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(30,41,59,0.9) 0%, rgba(15,23,42,1) 55%, rgba(11,15,25,1) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ===== CONTENT ===== */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
          overflow-visible   /* <--- content wrapper */
          text-center
          text-white
        "
      >
        {/* Heading */}
        <h1
          className="
            perspective-[1000px]
            overflow-visible   /* <--- h1 */
            text-[3.25rem]
            font-semibold
            leading-[1.1]
            tracking-normal
            sm:text-6xl
            sm:leading-[1.2]
            md:text-8xl
            lg:text-9xl
          "
          aria-label={HEADING_WORDS.join(" ")}
        >
          <span
            aria-hidden="true"
            className="
              flex
              flex-col
              items-center
              justify-center
              overflow-visible
              gap-1
              sm:flex-row
              sm:flex-wrap
              sm:gap-2
            "
          >
            {HEADING_WORDS.map((word, wordIndex) => (
              <span
                key={word}
                className="
                  relative
                  inline-block
                  overflow-visible   
                  whitespace-nowrap
                  px-4
                  sm:mr-2
                  sm:px-3
                  md:mr-3
                  md:px-4
                  
                "
              >
                {/* Base white text wrapper */}
                <span
                  className="
                    hero-word-text
                    relative
                    inline-block
                    overflow-visible   
                  "
                >
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${word}-${letterIndex}`}
                      className={`hero-letter inline-block text-white ${
                        wordIndex > 0 ? "hero-letter-hide" : ""
                      }`}
                    >
                      {letter}
                    </span>
                  ))}

                  {/* Static gradient overlay (fades + slides) */}
                  {wordIndex > 0 && (
                    <span
                      aria-hidden="true"
                      className="
                        hero-gradient-word
                        pointer-events-none
                        absolute
                        inset-0
                        overflow-visible  
                        whitespace-nowrap
                        bg-linear-to-r
                        from-[#E7325C]
                        to-[#EF8030]
                        bg-clip-text
                        text-transparent
                        h-[inherit]
                        w-full  
                      "
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <span
                          key={`${word}-gradient-${letterIndex}`}
                          className="inline-block"
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-6
            max-w-[22rem]
            text-base
            leading-relaxed
            text-white/70
            sm:mt-7
            sm:max-w-2xl
            sm:text-lg
            md:mt-8
            md:max-w-3xl
            md:text-xl
            lg:max-w-4xl
            lg:text-3xl
          "
          aria-label={DESCRIPTION}
        >
          <span aria-hidden="true">
            {DESCRIPTION.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="hero-description-word mr-[0.25em] inline-block"
              >
                {word}
              </span>
            ))}
          </span>
        </p>

        {/* Buttons */}
        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:mt-9
            sm:flex-row
            sm:gap-4
            lg:mt-10
          "
        >
          <Link
            href="/contact"
            className="
              hero-button
              w-full
              max-w-[280px]
              rounded-full
              bg-primary
              px-7
              py-3.5
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
              sm:w-auto
              sm:px-8
              sm:py-4
              sm:text-base
            "
          >
            Start a Project
          </Link>

          <Link
            href="/portfolio"
            className="
              hero-button
              w-full
              max-w-[280px]
              rounded-full
              border
              border-white/20
              bg-white/5
              px-7
              py-3.5
              text-sm
              font-medium
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/10
              sm:w-auto
              sm:px-8
              sm:py-4
              sm:text-base
            "
          >
            Explore Our Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollArrow />
    </section>
  );
}

function ScrollArrow() {
  return (
    <div
      className="
        absolute
        bottom-4
        left-1/2
        z-20
        flex
        h-16
        w-12
        -translate-x-1/2
        items-start
        justify-center
        sm:bottom-6
        sm:h-20
        sm:w-14
        lg:bottom-8
        lg:h-24
        lg:w-16
      "
      aria-hidden="true"
    >
      <span className="scroll-chevron" />
      <span className="scroll-chevron" />
      <span className="scroll-chevron" />
    </div>
  );
}

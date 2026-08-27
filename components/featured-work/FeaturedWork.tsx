"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fraunces, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FeaturedWorkHero from "./FeaturedWorkHero";
import FeaturedWorkMarquee from "./FeaturedWorkMarquee";
import FeaturedWorkFilters from "./FeaturedWorkFilters";
import FeaturedWorkGrid from "./FeaturedWorkGrid";
import FeaturedWorkCursor from "./FeaturedWorkCursor";

import { WORK_ITEMS } from "./featured-work.data";
import type { WorkFilter } from "./featured-work.types";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
});

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] =
    useState<WorkFilter>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return WORK_ITEMS;
    }

    return WORK_ITEMS.filter(
      (item) => item.category === activeFilter,
    );
  }, [activeFilter]);

  /*
   * -------------------------------
   * GSAP
   * -------------------------------
   */

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * Hero
       */

      const heroFills =
        gsap.utils.toArray<HTMLElement>(
          ".hero-fill",
        );

      if (reduceMotion) {
        gsap.set(heroFills, {
          clipPath: "inset(0 0% 0 0)",
        });
      } else {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".featured-work-hero",
            start: "top 90%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        });

        timeline
          .fromTo(
            heroFills[0],
            {
              clipPath: "inset(0 100% 0 0)",
            },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
            },
          )
          .fromTo(
            heroFills[1],
            {
              clipPath: "inset(0 0 0 100%)",
            },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: "none",
            },
            0.15,
          );
      }

      /*
       * Marquee
       */

      const marquee =
        document.querySelector<HTMLElement>(
          "[data-marquee-track]",
        );

      if (!reduceMotion && marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }

      /*
       * Work cards entrance
       */

      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-work-tile]",
        );

      if (reduceMotion) {
        gsap.set(cards, {
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.set(cards, {
          opacity: 0,
          y: 36,
        });

        ScrollTrigger.batch(cards, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
        });
      }

      /*
       * Video hover
       */

      const videos =
        document.querySelectorAll<HTMLVideoElement>(
          "[data-work-video]",
        );

      videos.forEach((video) => {
        const parent = video.closest(
          "[data-work-media]",
        );

        if (!parent) return;

        const play = () => {
          video.play().catch(() => {});
        };

        const pause = () => {
          video.pause();
        };

        parent.addEventListener(
          "mouseenter",
          play,
        );

        parent.addEventListener(
          "mouseleave",
          pause,
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * -------------------------------
   * Filtering animation
   * -------------------------------
   */

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards =
      gsap.utils.toArray<HTMLElement>(
        "[data-work-tile]",
      );

    cards.forEach((card) => {
      const category = card.dataset.category;

      const matches =
        activeFilter === "all" ||
        category === activeFilter;

      if (matches) {
        card.style.display = "";

        if (!reduceMotion) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 16,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        } else {
          gsap.set(card, {
            opacity: 1,
            y: 0,
            scale: 1,
          });
        }
      } else {
        card.style.display = "none";
      }
    });

    ScrollTrigger.refresh();
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className={`
        ${fraunces.variable}
        ${spaceGrotesk.variable}
        relative
        min-h-screen
        overflow-hidden
        bg-[#0b0b0c]
        text-[#f2efe9]
      `}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[50]
          opacity-[0.045]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E\")",
        }}
      />

      <FeaturedWorkCursor />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1560px]
          px-5
          pb-[clamp(90px,11vw,150px)]
          sm:px-8
          lg:px-[clamp(40px,6vw,72px)]
        "
      >
        <FeaturedWorkHero />

        <FeaturedWorkMarquee />

        <FeaturedWorkGrid
          items={filteredItems}
        />
      </div>
    </section>
  );
}
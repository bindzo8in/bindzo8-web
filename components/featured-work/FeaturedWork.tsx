"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Fraunces, Space_Grotesk } from "next/font/google";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FeaturedWorkHero from "./FeaturedWorkHero";
import FeaturedWorkMarquee from "./FeaturedWorkMarquee";
import FeaturedWorkGrid from "./FeaturedWorkGrid";
import FeaturedWorkCursor from "./FeaturedWorkCursor";

import type {
  FeaturedWorkItem,
  FeaturedWorkProject,
} from "./featured-work.types";
import { normalizeProjectToFeaturedWorkItem } from "./featured-work.utils";
import Link from "next/link";

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

interface FeaturedWorkProps {
  items: FeaturedWorkProject[];
}

export default function FeaturedWork({
  items,
}: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const normalizedItems =
    useMemo<FeaturedWorkItem[]>(() => {
      return items.map(normalizeProjectToFeaturedWorkItem);
    }, [items]);

  const filteredItems =
    useMemo<FeaturedWorkItem[]>(() => {
      if (activeFilter === "all") {
        return normalizedItems;
      }

      return normalizedItems.filter(
        (item) =>
          item.category === activeFilter,
      );
    }, [
      activeFilter,
      normalizedItems,
    ]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

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

        if (heroFills[0]) {
          timeline.fromTo(
            heroFills[0],
            {
              clipPath:
                "inset(0 100% 0 0)",
            },
            {
              clipPath:
                "inset(0 0% 0 0)",
              ease: "none",
            },
          );
        }

        if (heroFills[1]) {
          timeline.fromTo(
            heroFills[1],
            {
              clipPath:
                "inset(0 0 0 100%)",
            },
            {
              clipPath:
                "inset(0 0 0 0%)",
              ease: "none",
            },
            0.15,
          );
        }
      }

      const marquee =
        section.querySelector<HTMLElement>(
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
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [filteredItems]);

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
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-50
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

        <div className="mt-16 flex justify-center">
          <Link
            href="/portfolio"
            className="
              group
              relative
              inline-flex
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-[#EF8030]
              px-8
              py-3
              font-[var(--font-space-grotesk)]
              text-[14px]
              uppercase
              tracking-[0.1em]
              text-[#EF8030]
              transition-colors
              hover:bg-[#EF8030]
              hover:text-white
            "
          >
            <span className="relative z-10">View All Work</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
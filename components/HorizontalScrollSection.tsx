"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface HorizontalSection {
  id: string;
  content: React.ReactNode;
  backgroundColor?: string;
}

interface HorizontalScrollSectionProps {
  sections: HorizontalSection[];
  scrubValue?: number | boolean;
  triggerStart?: string;
  containerClassName?: string;
  innerClassName?: string;
}

export default function HorizontalScrollSection({
  sections,
  scrubValue = 1,
  triggerStart = "top top",
  containerClassName = "",
  innerClassName = "",
}: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrap = pinWrapRef.current;

      if (!section || !pinWrap) return;

      const getDistance = () => {
        return pinWrap.scrollWidth - window.innerWidth;
      };

      const horizontalTween = gsap.to(pinWrap, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: scrubValue,
          start: triggerStart,
          end: () => `+=${getDistance()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".horizontal-panel").forEach((panel) => {
        const items = panel.querySelectorAll(".parallax-item");

        if (!items.length) return;

        gsap.fromTo(
          items,
          { x: 60 },
          {
            x: -60,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });

      return () => {
        horizontalTween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      dependencies: [sections.length, scrubValue, triggerStart],
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden ${containerClassName}`}
    >
      <div
        ref={pinWrapRef}
        className="flex h-screen w-max will-change-transform"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            className="horizontal-panel h-screen w-screen shrink-0 overflow-hidden"
            style={{
              backgroundColor: section.backgroundColor ?? "transparent",
            }}
          >
            <div
              className={`
                mx-auto flex h-full w-full max-w-[1440px]
                items-center px-5 py-10
                sm:px-8
                lg:px-14
                xl:px-20
                ${innerClassName}
              `}
            >
              <div className="w-full">{section.content}</div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
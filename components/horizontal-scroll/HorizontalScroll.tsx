"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export default function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const scrollWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = scrollWidth - viewportWidth;

        if (scrollDistance <= 0) return;

        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              document.body.dataset.hscroll = "1";
            },
            onEnterBack: () => {
              document.body.dataset.hscroll = "1";
            },
            onLeave: () => {
              delete document.body.dataset.hscroll;
            },
            onLeaveBack: () => {
              delete document.body.dataset.hscroll;
            },
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full lg:h-screen lg:overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="flex h-full flex-col lg:w-max lg:flex-row"
      >
        {children}
      </div>
    </section>
  );
}
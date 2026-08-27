"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedBlobs from "@/components/animatedBlob";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SectionFixedBlobsProps = {
  children: ReactNode;
};

export default function SectionFixedBlobs({ children }: SectionFixedBlobsProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const blob = blobRef.current;

      if (!wrapper || !blob) return;

      gsap.set(blob, {
        opacity: 0,
        pointerEvents: "none",
      });

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",

        onEnter: () => {
          gsap.to(blob, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },

        onEnterBack: () => {
          gsap.to(blob, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },

        onLeave: () => {
          gsap.to(blob, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },

        onLeaveBack: () => {
          gsap.to(blob, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });

      return () => {
        trigger.kill();
      };
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div ref={wrapperRef} className="relative bg-black">
      {/* fixed blob, but visible only inside this section */}
      <div ref={blobRef} className="fixed inset-0 z-0">
        <AnimatedBlobs className="absolute inset-0" />
      </div>

      {/* content above blob */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
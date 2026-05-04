"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const Page = () => {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null); // Ref on the wrapper div

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (!logoRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      // 1. Initial centering via GSAP to avoid CSS conflicts
      gsap.set(logoRef.current, { yPercent: -50 });

      // 2. Sequence
      tl.to(logoRef.current, { scale: 1.5, xPercent: 30 })
        .to(logoRef.current, { scale: 2, xPercent: 100, yPercent: -150 }) // -150 because base is -50
        .to(logoRef.current, { rotate: 45 })
        .to(logoRef.current, { rotate: 135 })
        .to(logoRef.current, { rotate: 360 })
        
        // 3. The Reset Phase
        // We use .set to zero the rotation instantly so it doesn't spin back
        .set(logoRef.current, { rotate: 0 }) 
        .to(logoRef.current, {
          yPercent: -50, // Back to center-left
          xPercent: 0,
          scale: 1,
          duration: 1.5,
        });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-black w-full min-h-screen flex items-center overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* 
            - 'left-10' keeps it on the left.
            - 'top-1/2' starts the vertical centering.
            - We removed '-translate-y-1/2' from CSS and handled it in GSAP.
        */}
        <div
          ref={logoRef}
          className="absolute left-10 top-1/2 z-5"
        >
          <Image
            src="/logo_career.png"
            alt="logo"
            width={181}
            height={214}
            priority
            className="b"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import MethodologySVG from "./MethodologySVG";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);



export default function MethodologySection() {
  const wrapRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Only run the complex SVG motion path animation on screens wider than md (768px)
    mm.add("(min-width: 768px)", () => {
      /**
       * IMPORTANT:
       * Replace selectors below if your exported SVG ids are different.
       *
       * Expected ids:
       * #ball
       * #logo
       * #spin
       * #step
       * #hole
       */

      const ball = wrapRef.current?.querySelector("#ball");
      const ballWrap = wrapRef.current?.querySelector("#ballWrap");
      const logo = wrapRef.current?.querySelector("#logo");
      const spin = wrapRef.current?.querySelector("#spin");

      if (!ball || !logo || !spin || !ballWrap) return;

      const svgWidth = 1920;
      const svgHeight = 2422;

      const getRenderedSvgHeight = () => {
        const el = wrapRef.current;
        if (!el) return window.innerHeight;

        const renderedWidth = el.offsetWidth;
        const scale = renderedWidth / svgWidth;

        return svgHeight * scale;
      };

      gsap.set(ballWrap, {
        force3D: true,
        willChange: "transform",
      });

      gsap.set(ball, {
        transformOrigin: "50% 50%",
        force3D: true,
        willChange: "transform",
      });

      gsap.set(logo, {
        transformOrigin: "50% 50%",
      });

      //       const tl = gsap.timeline({
      //         // repeat: -1,
      //         // repeatDelay: 1,
      //         defaults: { ease: "none" },
      //         scrollTrigger: {
      //   trigger: wrapRef.current,
      //   start: "top top",
      //   end: () => {
      //     const sectionHeight = wrapRef.current?.offsetHeight || window.innerHeight;
      //     const viewportHeight = window.innerHeight;

      //     return `+=${sectionHeight + viewportHeight}`;
      //   },
      //   scrub: 1,
      //   pin: true,
      //   invalidateOnRefresh: true,
      //   anticipatePin: 1,
      //   markers: true,
      // }
      //       });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        repeat: -1,
        repeatDelay: 1,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          // end: "+=2200",
          end: () => {
            const renderedSvgHeight = getRenderedSvgHeight();
            const viewportHeight = window.innerHeight;

            return `+=${Math.max(renderedSvgHeight - viewportHeight, viewportHeight)}`;
          },

          // scrub: 1,
          // pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* =====================================
         BALL MAIN MOTION
      ===================================== */
      tl.to(ballWrap, {
        duration: 1,
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 170, y: 0 }
          ],
        },
      }, ">")
      tl.to(ballWrap, {
        duration: 0.4,
        motionPath: {
          path: [
            { x: 170, y: 0 },
            { x: 260, y: 80 }
          ]
        }
      }, ">")
      tl.to(ballWrap, {
        duration: 0.4,
        motionPath: {
          path: [
            { x: 260, y: 80 },
            { x: 260, y: 485 }
          ]
        }
      }, ">")
      tl.to(ballWrap, {
        duration: 0.4,
        motionPath: {
          path: [
            { x: 260, y: 485 },
            { x: 360, y: 485 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.2,
        motionPath: {
          path: [
            { x: 360, y: 485 },
            { x: 360, y: 470 },
          ]
        }
      }, ">")
      tl.to(ballWrap, {
        duration: 0.15,
        motionPath: {
          path: [
            { x: 360, y: 470 },
            { x: 360, y: 485 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.15,
        motionPath: {
          path: [
            { x: 360, y: 485 },
            { x: 360, y: 510 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.5,
        motionPath: {
          path: [
            { x: 360, y: 510 },
            { x: 305, y: 550 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.2,
        motionPath: {
          path: [
            { x: 305, y: 550 },
            { x: 260, y: 550 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.2,
        motionPath: {
          path: [
            { x: 260, y: 550 },
            { x: 258, y: 563 },
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.5,
        motionPath: {
          path: [
            { x: 258, y: 563 },
            { x: 230, y: 590 }
          ],
          curviness: 1.1
        },
      }, ">")

      tl.to(ballWrap, {
        duration: 0.5,
        motionPath: {
          path: [
            { x: 230, y: 590 },
            { x: 180, y: 620 }
          ]
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.5,
        motionPath: {
          path: [
            { x: 180, y: 620 },
            { x: 160, y: 640 }, // slight curve
            { x: 155, y: 660 }
          ]
        }
      }, ">");

      tl.to(ballWrap, {
        id: "drop",
        duration: 0.5,
        motionPath: {
          path: [
            { x: 155, y: 660 },

            { x: 170, y: 1280 }
          ],
          curviness: 0.3
        }
      }, ">")

      tl.to(ballWrap, {
        duration: 0.1,
        autoAlpha: 0
      }, ">")

      tl.to(ballWrap, {
        duration: 0.25,
        motionPath: {
          path: [
            { x: 170, y: 1280 },
            { x: 150, y: 1650 }
          ]
        },
        autoAlpha: 0
      }, ">")

      tl.to(ballWrap, {
        duration: 0.1,
        motionPath: {
          path: [
            { x: 150, y: 1650 }
          ]
        },
        autoAlpha: 1
      }, ">")

      tl.to(ballWrap, {
        duration: 0.3,
        motionPath: {
          path: [
            { x: 150, y: 1650 },
            { x: 100, y: 1700 }
          ]
        },
        autoAlpha: 0
      }, ">")

      tl.to(ball, {
        rotate: 2000, // adjust for speed feel
        ease: "none",
        duration: tl.duration(),
      }, 0);

      tl.to(
        logo,
        {
          duration: 3.2,
          rotate: -150,
          ease: "power2.out", // smooth natural rotation
        },
        2.2
      );

    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative z-10 bg-[#FFF5F4] w-full font-kumbh">
      {/* --- DESKTOP SVG VIEW (Hidden on Mobile) --- */}
      <div ref={wrapRef} className="hidden w-full overflow-hidden md:block">
        <MethodologySVG className="h-full w-full object-contain" />
      </div>

     {/* --- MOBILE HTML SVG-LIKE VIEW (Hidden on Desktop) --- */}
<div className="relative block md:hidden w-full min-h-fit bg-[#FFF5F4] overflow-hidden font-kumbh px-6 py-10">
  {/* Main Heading */}
  <h2 className="text-3xl leading-tight text-center font-medium text-[#E7325C] whitespace-nowrap">
    Our Methodology
  </h2>

  <div className="mt-6 flex flex-col gap-12">
    {/* Branding */}
    <div className="w-full">
      <h3 className="mb-4 text-center text-[24px] font-medium text-black">
        BRANDING
      </h3>

      <p className="text-justify text-[14px] leading-[1.5] text-black">
        Branding gives your business a unique identity that builds trust,
        attracts customers, and sets you apart. We help you create a powerful
        brand that connects, inspires, and drives growth.
      </p>
    </div>

    {/* Marketing */}
    <div className="w-full">
      <h3 className="mb-4 text-center text-[24px] font-medium text-black">
        MARKETING
      </h3>

      <p className="text-justify text-[14px] leading-[1.5] text-black">
        Marketing connects your brand with the right audience, builds
        awareness, and drives sales. We help you create impact strategies that
        attract, engage, and grow your business.
      </p>
    </div>

    {/* Development */}
    <div className="w-full">
      <h3 className="mb-4 text-center text-[24px] font-medium text-black">
        DEVELOPMENT
      </h3>

      <p className="text-justify text-[14px] leading-[1.5] text-black">
        Development drives growth, innovation, and success in business. We help
        you build strong strategies and solutions to move your business forward.
      </p>
    </div>
  </div>
</div>
    </section>
  );
}
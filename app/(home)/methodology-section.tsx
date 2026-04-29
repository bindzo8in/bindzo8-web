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
    const ctx = gsap.context(() => {
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
       *
       * If Figma exported names differently:
       * inspect DOM and rename selectors.
       */

      const ball = wrapRef.current?.querySelector("#ball");
      const ballWrap = wrapRef.current?.querySelector("#ballWrap");
      const logo = wrapRef.current?.querySelector("#logo");
      const spin = wrapRef.current?.querySelector("#spin");

      if (!ball || !logo || !spin || !ballWrap) return;



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

      // gsap.to(ball, {
      //   rotate: 360,
      //   repeat: -1,
      //   ease: "none",
      //   duration: 1.4
      // });

      // gsap.set(spin, {
      //   transformOrigin: "50% 50%",
      // });

      const ballStartTransform = ball.getAttribute("transform") || "";

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { ease: "none" },
        // scrollTrigger: {
        //   trigger: wrapRef.current,
        //   // markers: true,
        //   start: "top 40%",
        //   end: "+=1500",
        //   scrub: 1,
        // }
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
          // curviness: 1.35,
          // autoRotate: true,
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
      // till this time is 2.20s

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

      // 3.20s

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

      //  3.60s

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

      // 4.60s

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

      // 5.40s

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
            // { x: 170, y: 1280},
            { x: 150, y: 1650 }
          ]
        },
        autoAlpha: 1
      }, ">")

      tl.to(ballWrap, {
        duration: 0.3,
        motionPath: {
          path: [
            // { x: 170, y: 1280},
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

    }, wrapRef);


    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      <div ref={wrapRef} className="w-full">
        <MethodologySVG className="h-auto w-full" />
      </div>
    </section>
  );
}
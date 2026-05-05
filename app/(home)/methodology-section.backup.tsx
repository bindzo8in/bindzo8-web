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

      gsap.to(ball, {
        rotate: 360,
        repeat: -1,
        ease: "none",
        duration: 1.4
      });

      // gsap.set(spin, {
      //   transformOrigin: "50% 50%",
      // });

      const ballStartTransform = ball.getAttribute("transform") || "";

      const tl = gsap.timeline({
        // repeat: -1,
        // repeatDelay: 1,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 40%",
          toggleActions: "play none none none"
        }
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

     tl.to(ballWrap,  {
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
      { x: 155, y: 660},

      { x: 170, y: 1280}
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
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// import BallSvg from "@/public/home/methodology/ball.svg";

// gsap.registerPlugin(MotionPathPlugin);

// export default function Methodology() {
//   const scope = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "none" } });

//       tl.to(".ball", {
//         duration: 6.2,
//         motionPath: {
//           path: "#motionPath",
//           align: "#motionPath",
//           start: 0,
//           end: 1,
//           autoRotate: true,
//           alignOrigin: [0.5, 0.5],
//         },
//       });

//       tl.to(".logo", {
//         rotate: -145,
//         duration: 3.2,
//         ease: "power1.out",
//         transformOrigin: "50% 50%",
//       }, 2.28);

//       tl.to(".spin", {
//         rotate: 110,
//         duration: 1.6,
//         ease: "power1.out",
//         transformOrigin: "50% 50%",
//       }, 4.1);

//       tl.to(".ball", {
//         scale: 0.35,
//         opacity: 0,
//         duration: 0.45,
//         ease: "power2.in",
//       }, 5.75);
//     }, scope);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="relative w-full overflow-hidden bg-[#e9e1df] pt-24 pb-28 px-6 md:px-12 lg:px-20 xl:px-28">
//       <div className="mx-auto max-w-[1380px]">

//         <h2 className="mb-20 text-center text-3xl md:text-5xl">
//           Our Methodology
//         </h2>

//         {/* ── MAIN WRAP ── ref here so gsap.context scopes correctly */}
//         <div
//           ref={scope}
//           className="relative mx-auto min-h-[2422px] max-w-[1500px]"
//         >

//           {/* ── TEXT GRID ── */}
//           <div className="relative z-10 flex flex-col gap-28 md:gap-44">

//             {/* ROW 1 */}
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
//               <div>
//                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">01</h1>
//                 <p className="mt-8 max-w-[560px] text-[22px] leading-[1.45]">
//                   Branding gives your business a unique identity that builds
//                   trust, attracts customers, and sets you apart.
//                 </p>
//               </div>
//               <div />
//               <div className="md:text-right">
//                 <h3 className="text-3xl md:text-5xl">BRANDING</h3>
//               </div>
//             </div>

//             {/* ROW 2 */}
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
//               <div>
//                 <h3 className="text-3xl md:text-5xl">MARKETING</h3>
//               </div>
//               <div />
//               <div className="md:text-right">
//                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">02</h1>
//                 <p className="mt-8 ml-auto max-w-[560px] text-[22px] leading-[1.45] text-right">
//                   Marketing connects your brand with the right audience and drives sales.
//                 </p>
//               </div>
//             </div>

//             {/* ROW 3 */}
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
//               <div>
//                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">03</h1>
//                 <p className="mt-8 max-w-[560px] text-[22px] leading-[1.45]">
//                   Development drives growth, innovation, and success in business.
//                 </p>
//               </div>
//               <div />
//               <div className="md:text-right">
//                 <h3 className="text-3xl md:text-5xl">DEVELOPMENT</h3>
//               </div>
//             </div>
//           </div>

//           {/* ════════════════════════════════════════
//               FULL 1920px ANIMATION LAYER
//               - absolutely centered, 1920px wide
//               - overflow hidden on <section> clips it
//           ════════════════════════════════════════ */}
//           <div
//             className="
//               pointer-events-none
//               absolute top-0
//               left-1/2 -translate-x-1/2
//               w-[1920px]
//               h-full
//               z-20
//             "
//           >

//             {/* Your images stay in their original 1920-space positions */}
//             <Image
//               src="/home/methodology/step.png"
//               alt="" width={267} height={75} priority
//               className="absolute select-none"
//               style={{ left: 726, top: 35 }}
//             />

//             <Image
//               src="/home/methodology/symbol.png"
//               alt="" width={264} height={312} priority
//               className="logo absolute select-none origin-center"
//               style={{ left: 922, top: 505 }}
//             />

//             <Image
//               src="/home/methodology/spin.png"
//               alt="" width={483} height={567} priority
//               className="spin absolute select-none origin-center"
//               style={{ left: 725, top: 1185 }}
//             />

//             <Image
//               src="/home/methodology/hole.png"
//               alt="" width={215} height={48} priority
//               className="absolute select-none"
//               style={{ left: 808, top: 1860 }}
//             />

//             {/* BALL — GSAP moves it via motionPath, initial pos doesn't matter */}
//             <div
//               className="ball absolute z-30 w-[82px] h-[70px]"
//               style={{ left: 0, top: 0 }}
//             >
//               <BallSvg className="w-full h-full block" />
//             </div>

//             {/* SVG PATH — full 1920 × 2422 space, your exact coordinates */}
//             <svg
//               className="absolute inset-0 w-full h-full"
//               viewBox="0 0 1920 2422"
//               preserveAspectRatio="none"
//               fill="none"
//             >

//                {/* Center vertical line */}
//   <line x1="960" y1="0" x2="960" y2="2422"
//     stroke="blue" strokeWidth="2" strokeDasharray="10 5" />

//   {/* Lane boundaries (430px wide, centered) */}
//   <line x1="745" y1="0" x2="745" y2="2422"
//     stroke="green" strokeWidth="1" strokeDasharray="5 5" />
//   <line x1="1175" y1="0" x2="1175" y2="2422"
//     stroke="green" strokeWidth="1" strokeDasharray="5 5" />

//   {/* Horizontal markers every 200px */}
//   {Array.from({ length: 12 }).map((_, i) => (
//     <g key={i}>
//       <line x1="700" y1={i * 200} x2="1220" y2={i * 200}
//         stroke="#f0f" strokeWidth="1" opacity="0.4" />
//       <text x="750" y={i * 200 + 16} fill="#f0f" fontSize="24">
//         y={i * 200}
//       </text>
//     </g>
//   ))}
//               <path
//                 id="motionPath"
//                 d="
//                   M 593  366
//                   C 650  340  710  330  739.91 347.41
//                   C 820  370  895  450  895  508
//                   L 895  831
//                   L 976  831
//                   C 972  837  966.33 846.14  966.33 846.14
//                   L 995  902
//                   L 908.85 892.84
//                   L 811  935
//                   C 790  968  765.94 1006.69  765.94 1006.69
//                   L 716  1122
//                   L 757  1611
//                   L 742  1979
//                 "
//                 stroke="red"          
//                 strokeWidth="3"
//                 strokeDasharray="8 5"
//                 fill="none"
//               />
//             </svg>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// // "use client";

// // import { useLayoutEffect, useRef } from "react";
// // import Image from "next/image";
// // import gsap from "gsap";
// // import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// // import BallSvg from "@/public/home/methodology/ball.svg";

// // gsap.registerPlugin(MotionPathPlugin);

// // export default function Methodology() {
// //   const scope = useRef<HTMLDivElement>(null);

// //   useLayoutEffect(() => {
// //     const ctx = gsap.context(() => {
// //       const tl = gsap.timeline({
// //         defaults: { ease: "none" },
// //       });

// //       /* ===============================
// //          BALL MAIN TRAVEL
// //       =============================== */
// //       tl.to(".ball", {
// //         duration: 6.2,
// //         motionPath: {
// //           path: "#motionPath",
// //           align: "#motionPath",
// //           start: 0,
// //           end: 1,
// //           autoRotate: true,
// //           alignOrigin: [0.5, 0.5],
// //         },
// //       });

// //       /* ===============================
// //          LOGO HIT + ANTICLOCK ROTATION
// //          starts when ball touches logo
// //       =============================== */
// //       tl.to(
// //         ".logo",
// //         {
// //           rotate: -145,
// //           duration: 3.2,
// //           ease: "power1.out",
// //           transformOrigin: "50% 50%",
// //         },
// //         2.28
// //       );

// //       /* ===============================
// //          SPIN OBJECT STARTS SLOW ROTATE
// //       =============================== */
// //       tl.to(
// //         ".spin",
// //         {
// //           rotate: 110,
// //           duration: 1.6,
// //           ease: "power1.out",
// //           transformOrigin: "50% 50%",
// //         },
// //         4.1
// //       );

// //       /* ===============================
// //          BALL GOES INSIDE HOLE
// //       =============================== */
// //       tl.to(
// //         ".ball",
// //         {
// //           scale: 0.35,
// //           opacity: 0,
// //           duration: 0.45,
// //           ease: "power2.in",
// //         },
// //         5.75
// //       );
// //     }, scope);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section className="relative w-full overflow-hidden bg-[#e9e1df] pt-24 pb-28 px-6 md:px-12 lg:px-20 xl:px-28">
// //       <div className="mx-auto max-w-[1380px]">

// //         {/* HEADING */}
// //         <h2 className="mb-20 text-center text-3xl md:text-5xl">
// //           Our Methodology
// //         </h2>

// //         {/* MAIN WRAP */}
// //         <div
// //           ref={scope}
// //           className="relative mx-auto min-h-[2050px] max-w-[1500px]"
// //         >
// //           {/* ===========================
// //              TEXT GRID
// //           =========================== */}
// //           <div className="relative z-10 flex flex-col gap-28 md:gap-44">

// //             {/* ROW 1 */}
// //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// //               <div>
// //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// //                   01
// //                 </h1>

// //                 <p className="mt-8 max-w-[560px] text-[22px] leading-[1.45]">
// //                   Branding gives your business a unique identity that builds
// //                   trust, attracts customers, and sets you apart. We help you
// //                   create a powerful brand that connects, inspires, and drives
// //                   growth.
// //                 </p>
// //               </div>

// //               <div />

// //               <div className="md:text-right">
// //                 <h3 className="text-3xl md:text-5xl">
// //                   BRANDING
// //                 </h3>
// //               </div>
// //             </div>

// //             {/* ROW 2 */}
// //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// //               <div>
// //                 <h3 className="text-3xl md:text-5xl">
// //                   MARKETING
// //                 </h3>
// //               </div>

// //               <div />

// //               <div className="md:text-right">
// //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// //                   02
// //                 </h1>

// //                 <p className="mt-8 ml-auto max-w-[560px] text-[22px] leading-[1.45] text-right">
// //                   Marketing connects your brand with the right audience, builds
// //                   awareness, and drives sales. We help you create impact
// //                   strategies that attract, engage, and grow your business.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* ROW 3 */}
// //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// //               <div>
// //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// //                   03
// //                 </h1>

// //                 <p className="mt-8 max-w-[560px] text-[22px] leading-[1.45]">
// //                   Development drives growth, innovation, and success in
// //                   business. We help you build strong strategies and solutions
// //                   to move your business forward.
// //                 </p>
// //               </div>

// //               <div />

// //               <div className="md:text-right">
// //                 <h3 className="text-3xl md:text-5xl">
// //                   DEVELOPMENT
// //                 </h3>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ===========================
// //              CENTER ANIMATION LANE
// //           =========================== */}
// //           <div className="pointer-events-none absolute top-0 left-1/2 z-20 hidden h-full w-[430px] -translate-x-1/2 md:block">

// //             {/* STEP */}
// //             <Image
// //               src="/home/methodology/step.png"
// //               alt=""
// //               width={267}
// //               height={75}
// //               priority
// //               className="absolute left-[-55px] top-[35px] select-none"
// //             />

// //             {/* LOGO */}
// //             <Image
// //               src="/home/methodology/symbol.png"
// //               alt=""
// //               width={264}
// //               height={312}
// //               priority
// //               className="logo absolute left-[162px] top-[505px] select-none origin-center"
// //             />

// //             {/* SPIN */}
// //             <Image
// //               src="/home/methodology/spin.png"
// //               alt=""
// //               width={483}
// //               height={567}
// //               priority
// //               className="spin absolute left-[-55px] top-[1185px] select-none origin-center"
// //             />

// //             {/* HOLE */}
// //             <Image
// //               src="/home/methodology/hole.png"
// //               alt=""
// //               width={215}
// //               height={48}
// //               priority
// //               className="absolute left-[48px] top-[1860px] select-none"
// //             />

// //             {/* BALL */}
// //             <div className="ball absolute left-0 top-0 z-30 w-[82px] h-[70px]">
// //               <BallSvg className="w-full h-full block" />
// //             </div>

// //             {/* PATH DEBUG */}
// //             <svg
// //               className="absolute inset-0 h-full w-full"
// //               viewBox="0 0 430 2050"
// //               fill="none"
// //             >
// //               <path
// //                 id="motionPath"
// //                 d="
// //                   M 133 366
// //                   Q 170 330 205 430
// //                   T 225 831
// //                   Q 252 830 258 900
// //                   Q 240 900 205 935
// //                   Q 182 980 170 1122
// //                   T 170 1611
// //                   T 166 1890
// //                 "
// //                 stroke="transparent"
// //                 fill="none"
// //               />
// //             </svg>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // "use client";

// // // import { useLayoutEffect, useRef } from "react";
// // // import gsap from "gsap";
// // // import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// // // import StepSvg from "@/public/home/methodology/step.svg";
// // // import BallSvg from "@/public/home/methodology/ball.svg";
// // // import LogoSvg from "@/public/home/methodology/logo.svg";
// // // import SpinSvg from "@/public/home/methodology/spin_container.svg";
// // // import Image from "next/image";

// // // gsap.registerPlugin(MotionPathPlugin);

// // // export default function Methodology() {
// // //   const scope = useRef<HTMLDivElement>(null);

// // //   // useLayoutEffect(() => {
// // //   //   const ctx = gsap.context(() => {
// // //   //     const tl = gsap.timeline();

// // //   //     // Ball follows path
// // //   //     // tl.to(".ball", {
// // //   //     //   duration: 6,
// // //   //     //   ease: "none",
// // //   //     //   motionPath: {
// // //   //     //     path: "#motionPath",
// // //   //     //     // start: 1,
// // //   //     //     // end: 0,
// // //   //     //     align: "#motionPath",
// // //   //     //     autoRotate: true,
// // //   //     //     alignOrigin: [0.5, 0.5]
// // //   //     //   }
// // //   //     // });

// // //   //     // Logo reacts when ball hits
// // //   //     // tl.to(
// // //   //     //   ".logo",
// // //   //     //   {
// // //   //     //     rotate: -28,
// // //   //     //     duration: 0.22,
// // //   //     //     transformOrigin: "50% 50%",
// // //   //     //     ease: "power2.out",
// // //   //     //   },
// // //   //     //   2.15
// // //   //     // );

// // //   //     // tl.to(
// // //   //     //   ".logo",
// // //   //     //   {
// // //   //     //     rotate: 0,
// // //   //     //     duration: 0.35,
// // //   //     //     ease: "back.out(3)",
// // //   //     //   },
// // //   //     //   2.38
// // //   //     // );

// // //   //     // tl.to(
// // //   //     //   ".logo",
// // //   //     //   {
// // //   //     //     rotate: -180,
// // //   //     //     duration: 2.5,
// // //   //     //     ease: "none",
// // //   //     //     transformOrigin: "50% 50%",
// // //   //     //   },
// // //   //     //   2.15
// // //   //     // );

// // //   //     tl.to(".ball", { x: 739, y: 347, duration: .4, ease:"power1.inOut" })
// // //   // .to(".ball", { x: 895, y: 508, duration: .4 })
// // //   // .to(".ball", { x: 895, y: 831, duration: .4 })
// // //   // .to(".ball", { x: 742, y: 1979, duration: .8 });

// // //   //     // Ball disappear inside hole
// // //   //     tl.to(
// // //   //       ".ball",
// // //   //       {
// // //   //         opacity: 0,
// // //   //         scale: 0.6,
// // //   //         duration: 0.35,
// // //   //       },
// // //   //       5.55
// // //   //     );

// // //   //     // subtle spin
// // //   //     gsap.to(".spin", {
// // //   //       rotate: 360,
// // //   //       repeat: -1,
// // //   //       ease: "none",
// // //   //       duration: 12,
// // //   //       transformOrigin: "50% 50%",
// // //   //     });
// // //   //   }, scope);

// // //   //   return () => ctx.revert();
// // //   // }, []);
// // // useLayoutEffect(() => {
// // //   const ctx = gsap.context(() => {
// // //     const tl = gsap.timeline({ delay: 0.001 });

// // //     const points = [
// // //       { x: 133, y: 366 }, // 593
// // //       { x: 166, y: 347 }, // 739
// // //       { x: 200, y: 508 }, // 895
// // //       { x: 200, y: 831 }, // 895
// // //       { x: 218, y: 831 }, // 976
// // //       { x: 216, y: 846 },
// // //       { x: 223, y: 902 },
// // //       { x: 204, y: 892 },
// // //       { x: 182, y: 935 },
// // //       { x: 172, y: 1006 },
// // //       { x: 160, y: 1122 },
// // //       { x: 170, y: 1611 },
// // //       { x: 166, y: 1979 },
// // //     ];

// // //     // initial position
// // //     gsap.set(".ball", {
// // //       left: points[0].x,
// // //       top: points[0].y,
// // //     });

// // //     // animate step-by-step
// // //     points.slice(1).forEach((p, i) => {
// // //       tl.to(".ball", {
// // //         left: p.x,
// // //         top: p.y,
// // //         duration: 0.3,
// // //         ease: "none",
// // //       });

// // //       // logo starts rotating when hitting point 4
// // //       if (i === 2) {
// // //         tl.to(
// // //           ".logo",
// // //           {
// // //             rotate: -180,
// // //             duration: 3,
// // //             ease: "none",
// // //             transformOrigin: "50% 50%",
// // //           },
// // //           "<"
// // //         );
// // //       }
// // //     });

// // //     // disappear in hole
// // //     tl.to(".ball", {
// // //       opacity: 0,
// // //       scale: 0.5,
// // //       duration: 0.25,
// // //     });

// // //     // spin image
// // //     gsap.to(".spin", {
// // //       rotate: 360,
// // //       repeat: -1,
// // //       duration: 12,
// // //       ease: "none",
// // //       transformOrigin: "50% 50%",
// // //     });
// // //   }, scope);

// // //   return () => ctx.revert();
// // // }, []);
// // //   return (
// // //     <section className="relative w-full overflow-hidden bg-[#e9e1df] pt-24 pb-28 px-6 md:px-12 lg:px-20 xl:px-28 font-kumbh">
// // //       <div className="mx-auto max-w-[1380px]">

// // //         {/* heading */}
// // //         <h2 className="mb-16 md:mb-24 text-center text-3xl md:text-5xl">
// // //           Our Methodology
// // //         </h2>

// // //         <div
// // //           ref={scope}
// // //           className="relative mx-auto min-h-[2100px] max-w-[1500px]"
// // //         >
// // //           {/* =======================================
// // //               TEXT CONTENT GRID
// // //           ======================================= */}
// // //           <div className="relative z-10 flex flex-col gap-28 md:gap-44">

// // //             {/* ROW 1 */}
// // //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// // //               <div>
// // //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// // //                   01
// // //                 </h1>
// // //                 <p className="mt-8 max-w-[560px] text-lg leading-[1.4]">
// // //                   Branding gives your business a unique identity that builds trust, attracts customers, and sets you apart. We help you create a powerful brand that connects, inspires, and drives growth.
// // //                 </p>
// // //               </div>

// // //               <div />

// // //               <div className="md:text-right">
// // //                 <h3 className="text-3xl md:text-5xl">BRANDING</h3>
// // //               </div>
// // //             </div>

// // //             {/* ROW 2 */}
// // //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// // //               <div>
// // //                 <h3 className="text-3xl md:text-5xl">MARKETING</h3>
// // //               </div>

// // //               <div />

// // //               <div className="md:text-right">
// // //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// // //                   02
// // //                 </h1>
// // //                 <p className="mt-8 ml-auto max-w-[560px] text-lg leading-[1.4]">
// // //                   Marketing connects your brand with the right audience, builds awareness, and drives sales. We help you create impact strategies that attract, engage, and grow your business.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {/* ROW 3 */}
// // //             <div className="grid grid-cols-1 md:grid-cols-[1fr_430px_1fr] items-center gap-8">
// // //               <div>
// // //                 <h1 className="text-[92px] md:text-[160px] leading-none text-[#E7325C]">
// // //                   03
// // //                 </h1>
// // //                 <p className="mt-8 max-w-[560px] text-lg leading-[1.4]">
// // //                   Development drives growth, innovation, and success in business. We help you build strong strategies and solutions to move your business forward.
// // //                 </p>
// // //               </div>

// // //               <div />

// // //               <div className="md:text-right">
// // //                 <h3 className="text-3xl md:text-5xl">DEVELOPMENT</h3>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* =======================================
// // //               CENTER SVG ANIMATION LANE
// // //           ======================================= */}
// // //           <div className="pointer-events-none absolute top-0 left-1/2 z-20 hidden h-full w-[430px] -translate-x-1/2 md:block">

// // //             {/* STEP IMAGE */}
// // //             <Image
// // //               src="/home/methodology/step.png"
// // //               alt=""
// // //               width={267}
// // //               height={75}
// // //               priority
// // //               className="absolute left-[-50px] top-[70px] select-none"
// // //             />

// // //             {/* LOGO IMAGE */}
// // //             <Image
// // //               src="/home/methodology/symbol.png"
// // //               alt=""
// // //               width={264}
// // //               height={312}
// // //               priority
// // //               className="logo absolute left-[165px] top-[510px] select-none"
// // //             />

// // //             {/* SPIN IMAGE */}
// // //             <Image
// // //               src="/home/methodology/spin.png"
// // //               alt=""
// // //               width={483}
// // //               height={567}
// // //               priority
// // //               className="absolute left-[-50px] top-[1180px] select-none"
// // //             />

// // //             {/* HOLE */}
// // //             {/* <Image
// // //               src="/home/methodology/hole.png"
// // //               alt=""
// // //               width={120}
// // //               height={22}
// // //               priority
// // //               className="absolute left-[95px] top-[1515px] select-none"
// // //             /> */}


// // //             {/* BALL */}
// // //             {/* <BallSvg className="ball absolute left-0 top-0 z-30 w-[44px] h-[44px]" /> */}
// // //            <div className="ball absolute z-30 w-[82px] h-[70px]">
// // //               <BallSvg className="w-full h-full block overflow-visible" />
// // //             </div>

// // //             {/* HIDDEN PATH */}
// // //             <svg
// // //               className="absolute inset-0 h-full w-full"
// // //               viewBox="0 0 430 1650"
// // //               fill="none"
// // //             >
// // //               {/* <path
// // //                 id="motionPath"
// // //                 d="
// // //                 M 40 40
// // //     C 200 35, 315 110, 305 505
// // //     C 300 560, 250 575, 220 595
// // //     C 175 650, 185 980, 175 1220
// // //     C 170 1370, 155 1475, 145 1510
// // //                 "
// // //                 stroke="red"
// // //                 fill="none"
// // //               /> */}
// // //               {/* <path
// // //   id="motionPath"
// // //   d="
// // //     M 133 366
// // //     C 165 350, 185 360, 200 430
// // //     C 225 520, 225 700, 225 831
// // //     C 240 831, 250 850, 255 900
// // //     C 240 905, 225 900, 205 920
// // //     C 190 950, 178 1000, 170 1122
// // //     C 172 1350, 176 1611, 166 1979
// // //   "
// // //   stroke="red"
// // //   fill="none"
// // // /> */}
// // // {/* <path
// // //   id="motionPath"
// // //   d="
// // //     M 133 366
// // //     Q 170 330 200 430
// // //     T 225 831
// // //     Q 250 830 255 902
// // //     Q 235 900 205 935
// // //     Q 180 980 170 1122
// // //     T 170 1611
// // //     T 166 1979
// // //   "
// // //   stroke="red"
// // //   fill="none"
// // // /> */}
// // //             </svg>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // //     // C 200 35, 315 110, 305 505
// // //     // C 300 560, 250 575, 220 595
// // //     // C 175 650, 185 980, 175 1220
// // //     // C 170 1370, 155 1475, 145 1510

// // // // "use client"

// // // // import { motion } from "motion/react"

// // // // const fadeUp = {
// // // //   hidden: { opacity: 0, y: 40 },
// // // //   visible: { opacity: 1, y: 0 },
// // // // }

// // // // const fadeLeft = {
// // // //   hidden: { opacity: 0, x: -60 },
// // // //   visible: { opacity: 1, x: 0 },
// // // // }

// // // // const fadeRight = {
// // // //   hidden: { opacity: 0, x: 60 },
// // // //   visible: { opacity: 1, x: 0 },
// // // // }

// // // // export default function Methodology() {
// // // //   return (
// // // //     <section className="relative w-full bg-[#e9e1df] py-14 md:py-20 px-4 md:px-8 lg:px-14 overflow-hidden font-kumbh">

// // // //       {/* Heading */}
// // // //       <motion.h2
// // // //         className="text-center text-[28px] md:text-[38px] mb-14 md:mb-20"
// // // //         variants={fadeUp}
// // // //         initial="hidden"
// // // //         whileInView="visible"
// // // //         viewport={{ once: true }}
// // // //         transition={{ duration: 0.6 }}
// // // //       >
// // // //         Our Methodology
// // // //       </motion.h2>

// // // //       {/* Main wrapper */}
// // // //       <div className="relative max-w-[1500px] mx-auto">

// // // //         {/* =========================
// // // //             CONTENT GRID
// // // //         ========================== */}
// // // //         <div className="flex flex-col gap-24 md:gap-36 relative z-10">

// // // //           {/* ROW 1 */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] items-center gap-8">

// // // //             <motion.div
// // // //               variants={fadeLeft}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="flex flex-col"
// // // //             >
// // // //               <h1 className="text-[#E7325C] text-[90px] md:text-[150px] leading-none">
// // // //                 01
// // // //               </h1>

// // // //               <p className="mt-8 text-[18px] leading-[1.35] max-w-[420px]">
// // // //                 Branding gives your business a unique identity that builds trust,
// // // //                 attracts customers, and sets you apart. We help you create a
// // // //                 powerful brand that connects, inspires, and drives growth.
// // // //               </p>
// // // //             </motion.div>

// // // //             <div />

// // // //             <motion.div
// // // //               variants={fadeRight}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="md:text-right"
// // // //             >
// // // //               <h3 className="text-[28px] md:text-[42px] tracking-tight">
// // // //                 BRANDING
// // // //               </h3>
// // // //             </motion.div>
// // // //           </div>

// // // //           {/* ROW 2 */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] items-center gap-8">

// // // //             <motion.div
// // // //               variants={fadeLeft}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //             >
// // // //               <h3 className="text-[28px] md:text-[42px] tracking-tight">
// // // //                 MARKETING
// // // //               </h3>
// // // //             </motion.div>

// // // //             <div />

// // // //             <motion.div
// // // //               variants={fadeRight}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="flex flex-col items-start md:items-end"
// // // //             >
// // // //               <h1 className="text-[#E7325C] text-[90px] md:text-[150px] leading-none">
// // // //                 02
// // // //               </h1>

// // // //               <p className="mt-8 text-[18px] leading-[1.35] max-w-[430px] md:text-right">
// // // //                 Marketing connects your brand with the right audience, builds
// // // //                 awareness, and drives sales. We help you create impact
// // // //                 strategies that attract, engage, and grow your business.
// // // //               </p>
// // // //             </motion.div>
// // // //           </div>

// // // //           {/* ROW 3 */}
// // // //           <div className="grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] items-center gap-8">

// // // //             <motion.div
// // // //               variants={fadeLeft}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="flex flex-col"
// // // //             >
// // // //               <h1 className="text-[#E7325C] text-[90px] md:text-[150px] leading-none">
// // // //                 03
// // // //               </h1>

// // // //               <p className="mt-8 text-[18px] leading-[1.35] max-w-[430px]">
// // // //                 Development drives growth, innovation, and success in business.
// // // //                 We help you build strong strategies and solutions to move your
// // // //                 business forward.
// // // //               </p>
// // // //             </motion.div>

// // // //             <div />

// // // //             <motion.div
// // // //               variants={fadeRight}
// // // //               initial="hidden"
// // // //               whileInView="visible"
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="md:text-right"
// // // //             >
// // // //               <h3 className="text-[28px] md:text-[42px] tracking-tight">
// // // //                 DEVELOPMENT
// // // //               </h3>
// // // //             </motion.div>
// // // //           </div>
// // // //         </div>

// // // //         {/* =========================
// // // //             CENTER ANIMATION LANE
// // // //         ========================== */}
// // // //         <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-full pointer-events-none z-20">

// // // //           <div className="relative w-full h-full">

// // // //             {/* BALL */}
// // // //             <motion.img
// // // //               src="/home/methodology/ball.svg"
// // // //               alt=""
// // // //               className="absolute top-[110px] left-[70px] w-[46px] h-[46px] z-30"
// // // //               initial={{ opacity: 0 }}
// // // //               whileInView={{
// // // //                 opacity: [0, 1, 1, 1, 1, 0],
// // // //                 x: [0, 120, 170, 160, 40, 0],
// // // //                 y: [0, 40, 430, 930, 1290, 1360],
// // // //                 rotate: [0, 360, 720, 1080],
// // // //               }}
// // // //               viewport={{ once: true }}
// // // //               transition={{
// // // //                 duration: 6,
// // // //                 ease: "linear",
// // // //               }}
// // // //             />

// // // //             {/* STEP */}
// // // //             <img
// // // //               src="/home/methodology/step.svg"
// // // //               alt=""
// // // //               className="absolute top-[135px] left-[55px] w-[180px]"
// // // //             />

// // // //             {/* LOGO */}
// // // //             <motion.img
// // // //               src="/home/methodology/logo.svg"
// // // //               alt=""
// // // //               className="absolute top-[560px] left-[135px] w-[160px]"
// // // //               initial={{ rotate: 0 }}
// // // //               whileInView={{ rotate: [0, -20, -30, 0] }}
// // // //               viewport={{ once: true }}
// // // //               transition={{
// // // //                 duration: 1.2,
// // // //                 delay: 2.2,
// // // //                 ease: "easeInOut",
// // // //               }}
// // // //             />

// // // //             {/* SPIN */}
// // // //             <img
// // // //               src="/home/methodology/spin_container.svg"
// // // //               alt=""
// // // //               className="absolute top-[1180px] left-[30px] w-[250px]"
// // // //             />

// // // //             {/* HOLE */}
// // // //             <div className="absolute bottom-[35px] left-[92px] w-[110px] h-[26px] bg-black rounded-full blur-[0.5px]" />

// // // //           </div>
// // // //         </div>

// // // //       </div>
// // // //     </section>
// // // //   )
// // // // }// "use client"
// // // // // import { motion } from "motion/react"

// // // // // // Reusable variants
// // // // // const fadeUp = {
// // // // //   hidden: { opacity: 0, y: 40 },
// // // // //   visible: { opacity: 1, y: 0 },
// // // // // }

// // // // // const fadeLeft = {
// // // // //   hidden: { opacity: 0, x: -60 },
// // // // //   visible: { opacity: 1, x: 0 },
// // // // // }

// // // // // const fadeRight = {
// // // // //   hidden: { opacity: 0, x: 60 },
// // // // //   visible: { opacity: 1, x: 0 },
// // // // // }

// // // // // export default function Methodology() {
// // // // //   return (
// // // // //     <section className="relative w-full min-h-[80vh] md:min-h-[90vh] bg-[#e9e1df] py-12 px-4 md:px-8 lg:px-20 font-kumbh z-10 @container">
// // // // //       <motion.h2
// // // // //         className="text-center text-xl @md:text-2xl @lg:text-3xl mb-10 md:mb-16"
// // // // //         variants={fadeUp}
// // // // //         initial="hidden"
// // // // //         whileInView="visible"
// // // // //         viewport={{ once: true, amount: 0.5 }}
// // // // //         transition={{ duration: 0.6, ease: "easeOut" }}
// // // // //       >
// // // // //         Our Methodology
// // // // //       </motion.h2>

// // // // //       <div className="grid grid-cols-1 @md:grid-cols-[1fr_minmax(300px,500px)_1fr] gap-4 @md:gap-6">

// // // // //         {/* ROW 1 */}
// // // // //         <motion.div
// // // // //           className="flex flex-col h-full"
// // // // //           variants={fadeLeft}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, ease: "easeOut" }}
// // // // //         >
// // // // //          <h1 className="text-[80px] @md:text-[120px] @lg:text-[160px] leading-none text-[#E7325C]">01</h1>
// // // // //           <p className="mt-auto text-lg max-w-md justify-self-end">
// // // // //             Branding gives your business a unique identity that builds trust, attracts customers, and sets you apart. We help you create a powerful brand that connects, inspires, and drives growth.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         <div></div>

// // // // //         <motion.div
// // // // //           className="flex justify-end items-start p-8 h-full"
// // // // //           variants={fadeRight}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
// // // // //         >
// // // // //           <h3 className="text-xl @md:text-2xl @lg:text-3xl tracking-wide">BRANDING</h3>
// // // // //         </motion.div>

// // // // //         {/* ROW 2 */}
// // // // //         <motion.div
// // // // //           className="flex items-center h-full"
// // // // //           variants={fadeLeft}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, ease: "easeOut" }}
// // // // //         >
// // // // //           <h3 className="text-xl @md:text-2xl @lg:text-3xl tracking-wide">MARKETING</h3>
// // // // //         </motion.div>

// // // // //         <div></div>

// // // // //         <motion.div
// // // // //           className="flex flex-col items-end h-full"
// // // // //           variants={fadeRight}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
// // // // //         >
// // // // //           <h1 className="text-[80px] @md:text-[120px] @lg:text-[160px] leading-none text-[#E7325C]">02</h1>
// // // // //           <p className="text-lg max-w-md text-right mt-auto">
// // // // //             Marketing connects your brand with the right audience, builds awareness, and drives sales. We help you create impact strategies that attract, engage, and grow your business.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         {/* ROW 3 */}
// // // // //         <motion.div
// // // // //           className="flex flex-col justify-center h-full"
// // // // //           variants={fadeLeft}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, ease: "easeOut" }}
// // // // //         >
// // // // //           <div>
// // // // //          <h1 className="text-[80px] @md:text-[120px] @lg:text-[160px] leading-none text-[#E7325C]">03</h1>

// // // // //           </div>
// // // // //           <p className="mt-auto text-lg max-w-md">
// // // // //             Development drives growth, innovation, and success in business. We help you build strong strategies and solutions to move your business forward.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         <div></div>

// // // // //         <motion.div
// // // // //           className="flex justify-end items-center h-full"
// // // // //           variants={fadeRight}
// // // // //           initial="hidden"
// // // // //           whileInView="visible"
// // // // //           viewport={{ once: true, amount: 0.3 }}
// // // // //           transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
// // // // //         >
// // // // //           <h3 className="text-xl @md:text-2xl @lg:text-3xl tracking-wide">DEVELOPMENT</h3>
// // // // //         </motion.div>
// // // // //       </div>

// // // // //       {/* Centered decorative vertical strip */}
// // // // //       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full flex justify-center pointer-events-none">
// // // // //         <div className="relative w-full h-full max-w-[500px]">

// // // // //           {/* RED BALL */}
// // // // //           <motion.img
// // // // //             src="/home/methodology/red_ball.png"
// // // // //             className="absolute top-[11%] left-0 w-auto h-[72px] animate-ball z-50"
// // // // //             alt=""
// // // // //             initial={{ opacity: 0 }}
// // // // //             whileInView={{
// // // // //               x: [0, 150, 230, 230, 230, 320, 320, 320, 325, 325, 300, 325, 325, 240, 220, 105, 105, 80, 60, 50],
// // // // //               y: [0, 0, 75, 210, 638, 638, 635, 640, 650, 660, 700, 660, 625, 625, 625, 1245, 1540, 1550, 1580],
// // // // //               opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
// // // // //               rotate: [0, 360, 720, 1080],
// // // // //             }}
// // // // //             viewport={{ once: true, amount: 0.1 }}
// // // // //             transition={{
// // // // //               duration: 6,
// // // // //               times: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.2, 4.5],
// // // // //               ease: "linear",
// // // // //             }}
// // // // //           />

// // // // //           {/* STEP LINE */}
// // // // //           <motion.img
// // // // //             src="/home/methodology/step.png"
// // // // //             className="absolute top-[14%] left-0 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[267px]"
// // // // //             alt=""
// // // // //             variants={fadeUp}
// // // // //             initial="hidden"
// // // // //             whileInView="visible"
// // // // //             viewport={{ once: true, amount: 0.2 }}
// // // // //             transition={{ duration: 0.6, ease: "easeOut" }}
// // // // //           />

// // // // //           {/* SYMBOL */}
// // // // //           <motion.img
// // // // //             src="/home/methodology/symbol.png"
// // // // //             className="absolute top-[45%] left-[50%] w-[40%] max-w-[200px] sm:max-w-[230px] md:max-w-[260px]"
// // // // //             alt=""
// // // // //             initial={{ rotate: 0 }}
// // // // //             whileInView={{
// // // // //               rotate: [0, -20, -40, -60, -90, -120, -135],
// // // // //               // opacity: 1,
// // // // //             }}
// // // // //             viewport={{ once: true, amount: 0.3 }}
// // // // //             transition={{
// // // // //               delay: 2.5,
// // // // //               ease: "linear",
// // // // //               duration: 2,
// // // // //             }}
// // // // //           />

// // // // //           {/* SPIRAL */}
// // // // //           <motion.img
// // // // //             src="/home/methodology/spin.png"
// // // // //             className="absolute top-[73%] left-[-27%] h-auto"
// // // // //             alt=""
// // // // //             variants={fadeUp}
// // // // //             initial="hidden"
// // // // //             whileInView="visible"
// // // // //             viewport={{ once: true, amount: 0.2 }}
// // // // //             transition={{ duration: 0.7, ease: "easeOut" }}
// // // // //           />

// // // // //           {/* HOLE */}
// // // // //           <motion.img
// // // // //             src="/home/methodology/hole.png"
// // // // //             className="absolute top-[90%] left-[-10%] w-[60%] max-w-[160px] sm:max-w-[190px] md:max-w-[217px] h-auto"
// // // // //             alt=""
// // // // //             variants={fadeUp}
// // // // //             initial="hidden"
// // // // //             whileInView="visible"
// // // // //             viewport={{ once: true, amount: 0.2 }}
// // // // //             transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
// // // // //           />
// // // // //         </div>


// // // // //         <svg width="448" height="1746" viewBox="0 0 448 1746" fill="none" xmlns="http://www.w3.org/2000/svg">
// // // // // <path id="motionPath" d="M82.625 1745.3L170.625 1658.8V1313.8C170.625 1313.8 104.062 646.799 170.625 579.299C237.188 511.799 381.125 422.099 447.125 579.299C446.458 530.465 412.025 441.499 279.625 476.299C279.625 476.299 272.958 183.799 249.625 113.799C229.625 62.9653 151.725 -29.0014 0.125 9.79861" stroke="black"/>
// // // // // </svg>

// // // // //       </div>
// // // // //     </section>
// // // // //   )
// // // // // }
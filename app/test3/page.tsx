"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import WaveBackground from "./background";

export default function IntroGradientScreen() {
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const sources = [
    "/Website.png",
    "/Edit Online Order.png",
    "/External Link.png",
    "/Favorite Mobile Shop.png",
    "/Internet(1).png",
    "/Itch Io.png",
    "/Popup.png",
    "/Sound Cloud.png",
    "/StumbleUpon.png",
    "/Web Design.png",
    "/services/digital_marketing.png",
  ];

  let loaded = 0;

  sources.forEach((src) => {
    const img = new window.Image();

    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === sources.length) {
        setReady(true);
      }
    };

    img.src = src;
  });
}, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const overlay = bgRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* ---------------- HIDE FLASH ON LOAD ---------------- */
      gsap.set(".hero-image", {
        autoAlpha: 0,
        scale: 0.78,
        y: 40,
      });

      gsap.set([".hero-title", ".hero-sub"], {
        y: -400,
        color: "#000000",
        autoAlpha: 1,
      });

      /* each icon different random direction */
      gsap.utils.toArray<HTMLElement>(".hero-icon").forEach((el) => {
        gsap.set(el, {
          autoAlpha: 1,
          x: gsap.utils.random(-220, 220),
          y: gsap.utils.random(-220, 220),
          rotate: gsap.utils.random(-80, 80),
          scale: gsap.utils.random(0.45, 0.8),
          filter: "brightness(0)",
        });
      });

      gsap.set(overlay, {
        opacity: 1,
        background:
          "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
      });

      /* ---------------- OVERLAY ---------------- */

      tl.to(
        overlay,
        {
          background:
            "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
          duration: 0.45,
          ease: "none",
        },
        0
      );

      tl.to(
        overlay,
        {
          background:
            "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
          duration: 0.45,
          ease: "none",
        },
        0.45
      );

      tl.to(
        overlay,
        {
          background: "#000000",
          opacity: 0.45,
          duration: 0.45,
          ease: "none",
        },
        0.9
      );

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.55,
          ease: "none",
          pointerEvents: "none",
        },
        1.2
      );

      /* ---------------- TEXT ---------------- */

      tl.to(
        [".hero-title", ".hero-sub"],
        {
          y: 0,
          color: "#ffffff",
          duration: 1.65,
          ease: "none",
          stagger: 0,
        },
        0
      );

      /* ---------------- ICONS RANDOM ENTRY ---------------- */

      tl.to(
        ".hero-icon",
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: "brightness(1)",
          duration: 1.65,
          ease: "none",
          stagger: {
            each: 0.04,
            from: "random",
          },
        },
        0
      );

      /* ---------------- IMAGE AFTER TEXT ---------------- */

      tl.to(
        ".hero-image",
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
        },
        1.68
      );

      /* ---------------- FLOAT AFTER INTRO ---------------- */

      // tl.add(() => {
      //   gsap.to(".hero-icon", {
      //     x: "random(-12,12)",
      //     y: "random(-12,12)",
      //     rotate: "random(-8,8)",
      //     duration: 2.4,
      //     ease: "sine.inOut",
      //     repeat: -1,
      //     yoyo: true,
      //     stagger: {
      //       each: 0.08,
      //       from: "random",
      //     },
      //   });
      // }, 1.9);
      const icons = gsap.utils.toArray<HTMLElement>(".hero-icon");

icons.forEach((icon, i) => {
  const delay = i * 0.045;

  const startX = gsap.getProperty(icon, "x") as number;
  const startY = gsap.getProperty(icon, "y") as number;

  const mid1X = startX * 0.55;
  const mid1Y = startY * 0.55;

  const mid2X = startX * -0.18;
  const mid2Y = startY * -0.18;

  const mid3X = startX * 0.06;
  const mid3Y = startY * 0.06;

  tl.to(
    icon,
    {
      x: mid1X,
      y: mid1Y,
      scale: 0.82,
      rotate: -8,
      filter: "brightness(.35)",
      duration: 0.42,
      ease: "none",
    },
    delay
  );

  tl.to(
    icon,
    {
      x: mid2X,
      y: mid2Y,
      scale: 0.92,
      rotate: 6,
      filter: "brightness(.6)",
      duration: 0.34,
      ease: "none",
    },
    delay + 0.42
  );

  tl.to(
    icon,
    {
      x: mid3X,
      y: mid3Y,
      scale: 0.98,
      rotate: -2,
      filter: "brightness(.82)",
      duration: 0.26,
      ease: "none",
    },
    delay + 0.76
  );

  tl.to(
    icon,
    {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "brightness(1)",
      duration: 0.38,
      ease: "none",
    },
    delay + 1.02
  );
});
    }, wrapRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
  ref={wrapRef}
  className={`relative h-screen overflow-hidden bg-black font-kumbh transition-opacity duration-300 ${
    ready ? "opacity-100" : "opacity-0"
  }`}
>
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-[10]">
        <WaveBackground />
      </div>

{/* CONTENT */}
<div className="relative z-[200] h-full w-full">

  {/* FULL WIDTH ICON LAYER */}
  <div className="absolute inset-0 w-full h-full">

    <img src="/Website.png" className="hero-icon absolute left-[6%] top-[10%] w-10 h-10 object-contain" />
    <img src="/Edit Online Order.png" className="hero-icon absolute right-[6%] top-[10%] w-10 h-10 object-contain" />

    <img src="/External Link.png" className="hero-icon absolute left-[12%] top-[40%] w-10 h-10 object-contain" />
    <img src="/Favorite Mobile Shop.png" className="hero-icon absolute right-[12%] top-[40%] w-10 h-10 object-contain" />

    <img src="/Internet(1).png" className="hero-icon absolute left-[8%] bottom-[14%] w-10 h-10 object-contain" />
    <img src="/Itch Io.png" className="hero-icon absolute right-[8%] bottom-[14%] w-10 h-10 object-contain" />

    <img src="/Popup.png" className="hero-icon absolute left-[28%] bottom-[10%] w-10 h-10 object-contain" />
    <img src="/Sound Cloud.png" className="hero-icon absolute right-[28%] bottom-[10%] w-10 h-10 object-contain" />

    <img src="/StumbleUpon.png" className="hero-icon absolute left-[24%] top-[18%] w-10 h-10 object-contain" />
    <img src="/Web Design.png" className="hero-icon absolute right-[24%] top-[18%] w-10 h-10 object-contain" />

  </div>

  {/* CENTER CONTENT */}
  <div className="relative h-full flex items-center justify-center px-6">
    <div className="text-center max-w-5xl w-full">

      <div className="hero-image flex justify-center mb-6">
        <Image
          src="/services/digital_marketing.png"
          alt="Digital Marketing"
          width={300}
          height={300}
          priority
          className="object-contain"
        />
      </div>

      <h1 className="hero-title text-6xl md:text-7xl font-bold leading-tight">
        Website Development
      </h1>

      <p className="hero-sub mt-5 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
        High-performance websites designed to convert visitors into customers.
      </p>

    </div>
  </div>
</div>

      {/* OVERLAY */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[100]"
      />
    </section>
  );
}

// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import Image from "next/image";
// import WaveBackground from "./background";

// /*
// ONLY added:
// 1. icon elements
// 2. icon animation synced with existing overlay timeline

// Did NOT disturb your other structure.
// */

// export default function IntroGradientScreen() {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const bgRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const overlay = bgRef.current;
//     if (!overlay) return;

//     const tl = gsap.timeline();

//     /* ---------------- INITIAL STATES ---------------- */

//     gsap.set(".hero-image", {
//       opacity: 0,
//       scale: 0.78,
//       y: 40,
//     });

//     gsap.set([".hero-title", ".hero-sub"], {
//       opacity: 1,
//       y: -400,
//       color: "#000000",
//     });

//     /* ICONS */
//     gsap.set(".hero-icon", {
//       opacity: 1,
//       y: -260,
//       scale: 0.72,
//       rotate: -12,
//       filter: "brightness(0)",
//     });

//     gsap.set(overlay, {
//       opacity: 1,
//       background:
//         "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
//     });

//     /* ---------------- OVERLAY ---------------- */

//     tl.to(
//       overlay,
//       {
//         background:
//           "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
//         duration: 0.45,
//         ease: "none",
//       },
//       0
//     );

//     tl.to(
//       overlay,
//       {
//         background:
//           "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
//         duration: 0.45,
//         ease: "none",
//       },
//       0.45
//     );

//     tl.to(
//       overlay,
//       {
//         background: "#000000",
//         opacity: 0.45,
//         duration: 0.45,
//         ease: "none",
//       },
//       0.9
//     );

//     tl.to(
//       overlay,
//       {
//         opacity: 0,
//         duration: 0.55,
//         ease: "none",
//         pointerEvents: "none",
//       },
//       1.2
//     );

//     /* ---------------- TITLE + SUB ---------------- */

//     tl.to(
//       [".hero-title", ".hero-sub"],
//       {
//         y: 0,
//         color: "#ffffff",
//         duration: 1.65,
//         ease: "none",
//         stagger: 0,
//       },
//       0
//     );

//     /* ---------------- ICONS SYNCED ---------------- */

//     tl.to(
//       ".hero-icon",
//       {
//         y: 0,
//         rotate: 0,
//         scale: 1,
//         filter: "brightness(1)",
//         duration: 1.65,
//         ease: "none",
//         stagger: {
//           each: 0.04,
//           from: "random",
//         },
//       },
//       0
//     );

//     /* idle float after intro */
//     tl.add(() => {
//       gsap.to(".hero-icon", {
//         y: "random(-12,12)",
//         x: "random(-10,10)",
//         rotate: "random(-6,6)",
//         duration: 2.4,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//         stagger: {
//           each: 0.08,
//           from: "random",
//         },
//       });
//     }, 1.7);

//     /* ---------------- IMAGE AFTER TEXT DONE ---------------- */

//     tl.to(
//       ".hero-image",
//       {
//         opacity: 1,
//         scale: 1,
//         y: 0,
//         duration: 0.75,
//         ease: "power2.out",
//       },
//       1.68
//     );

//     return () => {tl.kill()};
//   }, []);

//   return (
//     <section
//       ref={wrapRef}
//       className="relative h-screen overflow-hidden bg-black font-kumbh"
//     >
//       {/* BACKGROUND */}
//       <div className="absolute inset-0 z-[10]">
//         <WaveBackground />
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-[200] h-full flex items-center justify-center px-6">
//         <div className="relative text-center max-w-5xl w-full">

//           {/* ICONS */}
//           <img src="/Website.png" className="hero-icon absolute left-[6%] top-[10%] w-10 h-10 object-contain" />
//           <img src="/Edit Online Order.png" className="hero-icon absolute right-[6%] top-[10%] w-10 h-10 object-contain" />
//           <img src="/External Link.png" className="hero-icon absolute left-[14%] top-[38%] w-10 h-10 object-contain" />
//           <img src="/Favorite Mobile Shop.png" className="hero-icon absolute right-[14%] top-[38%] w-10 h-10 object-contain" />
//           <img src="/Internet(1).png" className="hero-icon absolute left-[10%] bottom-[18%] w-10 h-10 object-contain" />
//           <img src="/Itch Io.png" className="hero-icon absolute right-[10%] bottom-[18%] w-10 h-10 object-contain" />
//           <img src="/Popup.png" className="hero-icon absolute left-[28%] bottom-[8%] w-10 h-10 object-contain" />
//           <img src="/Sound Cloud.png" className="hero-icon absolute right-[28%] bottom-[8%] w-10 h-10 object-contain" />
//           <img src="/StumbleUpon.png" className="hero-icon absolute left-[24%] top-[22%] w-10 h-10 object-contain" />
//           <img src="/Web Design.png" className="hero-icon absolute right-[24%] top-[22%] w-10 h-10 object-contain" />

//           {/* IMAGE */}
//           <div className="hero-image flex justify-center mb-6">
//             <Image
//               src="/services/digital_marketing.png"
//               alt="Digital Marketing"
//               width={300}
//               height={300}
//               priority
//               className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.25)]"
//             />
//           </div>

//           {/* TITLE */}
//           <h1 className="hero-title text-6xl md:text-7xl font-bold leading-tight">
//             Website Development
//           </h1>

//           {/* SUBTITLE */}
//           <p className="hero-sub mt-5 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
//             High-performance websites designed to convert
//             visitors into customers.
//           </p>

//         </div>
//       </div>

//       {/* OVERLAY */}
//       <div
//         ref={bgRef}
//         className="absolute inset-0 z-[100]"
//       />
//     </section>
//   );
// }

// // "use client";

// // import { useLayoutEffect, useRef } from "react";
// // import gsap from "gsap";
// // import Image from "next/image";
// // import WaveBackground from "./background";

// // export default function IntroGradientScreen() {
// //   const wrapRef = useRef<HTMLDivElement>(null);
// //   const bgRef = useRef<HTMLDivElement>(null);

// //   useLayoutEffect(() => {
// //     const overlay = bgRef.current;
// //     if (!overlay) return;

// //     const tl = gsap.timeline();

// //     /* ---------------- INITIAL STATES ---------------- */

// //     gsap.set(".hero-image", {
// //       opacity: 0,
// //       scale: 0.78,
// //       y: 40,
// //     });

// //     gsap.set([".hero-title", ".hero-sub"], {
// //       opacity: 1,
// //       y: -400,
// //       color: "#000000",
// //     });

// //     gsap.set(overlay, {
// //       opacity: 1,
// //       background:
// //         "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
// //     });

// //     /* ---------------- OVERLAY ---------------- */

// //     tl.to(
// //       overlay,
// //       {
// //         background:
// //           "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
// //         duration: 0.45,
// //         ease: "none",
// //       },
// //       0
// //     );

// //     tl.to(
// //       overlay,
// //       {
// //         background:
// //           "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
// //         duration: 0.45,
// //         ease: "none",
// //       },
// //       0.45
// //     );

// //     tl.to(
// //       overlay,
// //       {
// //         background: "#000000",
// //         opacity: 0.45,
// //         duration: 0.45,
// //         ease: "none",
// //       },
// //       0.9
// //     );

// //     tl.to(
// //       overlay,
// //       {
// //         opacity: 0,
// //         duration: 0.55,
// //         ease: "none",
// //         pointerEvents: "none",
// //       },
// //       1.2
// //     );

// //     /* ---------------- TEXT FIRST ---------------- */
// //     /* Heading + subheading finish completely */

// //     tl.to(
// //       [".hero-title", ".hero-sub"],
// //       {
// //         y: 0,
// //         color: "#ffffff",
// //         duration: 1.65,
// //         ease: "none",
// //         stagger: 0,
// //       },
// //       0
// //     );

// //     /* ---------------- IMAGE AFTER TEXT DONE ---------------- */

// //     tl.to(
// //       ".hero-image",
// //       {
// //         opacity: 1,
// //         scale: 1,
// //         y: 0,
// //         duration: 0.75,
// //         ease: "power2.out",
// //       },
// //       1.68
// //     );

// //     return () => {tl.kill()};
// //   }, []);

// //   return (
// //     <section
// //       ref={wrapRef}
// //       className="relative h-screen overflow-hidden bg-black font-kumbh"
// //     >
// //       {/* BACKGROUND */}
// //       <div className="absolute inset-0 z-[10]">
// //         <WaveBackground />
// //       </div>

// //       {/* CONTENT */}
// //       <div className="relative z-[200] h-full flex items-center justify-center px-6">
// //         <div className="text-center max-w-5xl">

// //           {/* IMAGE (shows later) */}
// //           <div className="hero-image flex justify-center mb-6">
// //             <Image
// //               src="/services/digital_marketing.png"
// //               alt="Digital Marketing"
// //               width={300}
// //               height={300}
// //               priority
// //               className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.25)]"
// //             />
// //           </div>

// //           {/* TITLE */}
// //           <h1 className="hero-title text-6xl md:text-7xl font-bold leading-tight">
// //             Website Development
// //           </h1>

// //           {/* SUBTITLE */}
// //           <p className="hero-sub mt-5 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
// //             High-performance websites designed to convert
// //             visitors into customers.
// //           </p>

// //         </div>
// //       </div>

// //       {/* OVERLAY */}
// //       <div
// //         ref={bgRef}
// //         className="absolute inset-0 z-[100]"
// //       />
// //     </section>
// //   );
// // }
// // // "use client";

// // // import { useLayoutEffect, useRef } from "react";
// // // import gsap from "gsap";
// // // import Image from "next/image";
// // // import WaveBackground from "./background";

// // // export default function IntroGradientScreen() {
// // //   const wrapRef = useRef<HTMLDivElement>(null);
// // //   const bgRef = useRef<HTMLDivElement>(null);

// // //   useLayoutEffect(() => {
// // //     const overlay = bgRef.current;
// // //     if (!overlay) return;

// // //     const tl = gsap.timeline();

// // //     /* ---------------- INITIAL STATES ---------------- */

// // //     gsap.set(".hero-image", {
// // //       opacity: 0,
// // //       scale: 0.8,
// // //       y: -40,
// // //     });

// // //     /* title + sub ABOVE overlay */
// // //     gsap.set([".hero-title", ".hero-sub"], {
// // //       opacity: 1,
// // //       y: -400,
// // //       color: "#000000",
// // //     });

// // //     gsap.set(overlay, {
// // //       opacity: 1,
// // //       background:
// // //         "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
// // //     });

// // //     /* ---------------- SAME TIME ANIMATION ---------------- */

// // //     tl.to(
// // //       overlay,
// // //       {
// // //         background:
// // //           "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
// // //         duration: 0.45,
// // //         ease: "none",
// // //       },
// // //       0
// // //     );

// // //     tl.to(
// // //       overlay,
// // //       {
// // //         background:
// // //           "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
// // //         duration: 0.45,
// // //         ease: "none",
// // //       },
// // //       0.45
// // //     );

// // //     tl.to(
// // //       overlay,
// // //       {
// // //         background: "#000000",
// // //         opacity: 0.45,
// // //         duration: 0.45,
// // //         ease: "none",
// // //       },
// // //       0.9
// // //     );

// // //     tl.to(
// // //       overlay,
// // //       {
// // //         opacity: 0,
// // //         duration: 0.55,
// // //         ease: "none",
// // //         pointerEvents: "none",
// // //       },
// // //       1.2
// // //     );

// // //     /* ---------------- HEADING + SUBHEADING ---------------- */
// // //     /* Starts immediately, synced with overlay */

// // //     tl.to(
// // //       [".hero-title", ".hero-sub"],
// // //       {
// // //         y: 0,
// // //         color: "#ffffff",
// // //         duration: 1.75,
// // //         ease: "none",
// // //         stagger: 0,
// // //       },
// // //       0
// // //     );

// // //     /* ---------------- IMAGE ---------------- */

// // //     tl.to(
// // //       ".hero-image",
// // //       {
// // //         opacity: 1,
// // //         scale: 1,
// // //         y: 0,
// // //         duration: 1,
// // //         ease: "power2.out",
// // //       },
// // //       0.55
// // //     );

// // //     return () => tl.kill();
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={wrapRef}
// // //       className="relative h-screen overflow-hidden bg-black font-kumbh"
// // //     >
// // //       {/* BACKGROUND */}
// // //       <div className="absolute inset-0 z-[10]">
// // //         <WaveBackground />
// // //       </div>

// // //       {/* CONTENT */}
// // //       <div className="relative z-[200] h-full flex items-center justify-center px-6">
// // //         <div className="text-center max-w-5xl">

// // //           {/* IMAGE */}
// // //           <div className="hero-image flex justify-center mb-6">
// // //             <Image
// // //               src="/services/digital_marketing.png"
// // //               alt="Digital Marketing"
// // //               width={220}
// // //               height={220}
// // //               priority
// // //               className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.25)]"
// // //             />
// // //           </div>

// // //           {/* TITLE */}
// // //           <h1 className="hero-title text-6xl md:text-7xl font-bold leading-tight">
// // //             Website Development
// // //           </h1>

// // //           {/* SUBTITLE */}
// // //           <p className="hero-sub mt-5 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
// // //             High-performance websites designed to convert
// // //             visitors into customers.
// // //           </p>

// // //         </div>
// // //       </div>

// // //       {/* OVERLAY BELOW TEXT */}
// // //       <div
// // //         ref={bgRef}
// // //         className="absolute inset-0 z-[100]"
// // //       />
// // //     </section>
// // //   );
// // // }

// // // // "use client";

// // // // import { useLayoutEffect, useRef } from "react";
// // // // import gsap from "gsap";
// // // // import Image from "next/image";
// // // // import WaveBackground from "./background";

// // // // export default function IntroGradientScreen() {
// // // //   const wrapRef = useRef<HTMLDivElement>(null);
// // // //   const bgRef = useRef<HTMLDivElement>(null);

// // // //   useLayoutEffect(() => {
// // // //     const el = bgRef.current;
// // // //     if (!el) return;

// // // //     const tl = gsap.timeline();

// // // //     /* ---------------- INITIAL STATES ---------------- */

// // // //     gsap.set(".hero-image", {
// // // //       opacity: 0,
// // // //       scale: 0.8,
// // // //       y: -40,
// // // //     });

// // // //     gsap.set([".hero-title", ".hero-sub"], {
// // // //       opacity: 0,
// // // //       y: -80,
// // // //     });

// // // //     gsap.set(el, {
// // // //       opacity: 1,
// // // //       background:
// // // //         "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
// // // //     });

// // // //     /* ---------------- WRAP ANIMATION ---------------- */

// // // //     tl.to(el, {
// // // //       background:
// // // //         "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
// // // //       duration: 0.6,
// // // //       ease: "none",
// // // //     });

// // // //     tl.to(el, {
// // // //       background:
// // // //         "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
// // // //       duration: 0.6,
// // // //       ease: "none",
// // // //     });

// // // //     tl.to(el, {
// // // //       background: "#000000",
// // // //       opacity: 0.5,
// // // //       duration: 0.6,
// // // //       ease: "none",
// // // //     });

// // // //     tl.to(el, {
// // // //       opacity: 0,
// // // //       duration: 0.55,
// // // //       ease: "power2.out",
// // // //       pointerEvents: "none",
// // // //     });

// // // //     /* ---------------- CONTENT REVEAL ---------------- */

// // // //     tl.to(
// // // //       ".hero-image",
// // // //       {
// // // //         opacity: 1,
// // // //         scale: 1,
// // // //         y: 0,
// // // //         duration: 0.8,
// // // //         ease: "power3.out",
// // // //       },
// // // //       "-=0.35"
// // // //     );

// // // //     /* Heading + Subheading same time */
// // // //     tl.to(
// // // //       [".hero-title", ".hero-sub"],
// // // //       {
// // // //         opacity: 1,
// // // //         y: 0,
// // // //         duration: 0.9,
// // // //         ease: "power4.out",
// // // //         stagger: 0,
// // // //       },
// // // //       "-=0.55"
// // // //     );

// // // //     return () => {tl.kill()};
// // // //   }, []);

// // // //   return (
// // // //     <section
// // // //       ref={wrapRef}
// // // //       className="relative h-screen overflow-hidden bg-black font-kumbh"
// // // //     >
// // // //       {/* BACKGROUND */}
// // // //       <div className="absolute inset-0 z-[10]">
// // // //         <WaveBackground />
// // // //       </div>

// // // //       {/* CONTENT */}
// // // //       <div className="relative z-[50] h-full flex items-center justify-center px-6">
// // // //         <div className="text-center text-white max-w-5xl">

// // // //           {/* IMAGE */}
// // // //           <div className="hero-image flex justify-center mb-6">
// // // //             <Image
// // // //               src="/services/digital_marketing.png"
// // // //               alt="Digital Marketing"
// // // //               width={300}
// // // //               height={300}
// // // //               priority
// // // //               className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.25)]"
// // // //             />
// // // //           </div>

// // // //           {/* TITLE */}
// // // //           <h1 className="hero-title text-6xl md:text-7xl font-bold leading-tight">
// // // //             Website Development
// // // //           </h1>

// // // //           {/* SUBTITLE */}
// // // //           <p className="hero-sub mt-5 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
// // // //             High-performance websites designed to convert
// // // //             visitors into customers.
// // // //           </p>

// // // //         </div>
// // // //       </div>

// // // //       {/* INTRO OVERLAY */}
// // // //       <div
// // // //         ref={bgRef}
// // // //         className="absolute inset-0 z-[100]"
// // // //       />
// // // //     </section>
// // // //   );
// // // // }
// // // // // "use client";

// // // // // import { useLayoutEffect, useRef } from "react";
// // // // // import gsap from "gsap";
// // // // // import WaveBackground from "./background";

// // // // // export default function IntroGradientScreen() {
// // // // //   const wrapRef = useRef<HTMLDivElement>(null);
// // // // //   const bgRef = useRef<HTMLDivElement>(null);

// // // // //   useLayoutEffect(() => {
// // // // //     const el = bgRef.current;
// // // // //     if (!el) return;

// // // // //     const tl = gsap.timeline();

// // // // //     gsap.set(el, {
// // // // //       opacity: 1,
// // // // //       background:
// // // // //         "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
// // // // //     });

// // // // //     tl.to(el, {
// // // // //       background:
// // // // //         "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
// // // // //       duration: 0.6,
// // // // //       ease: "none",
// // // // //     });

// // // // //     tl.to(el, {
// // // // //       background:
// // // // //         "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
// // // // //       duration: 0.6,
// // // // //       ease: "none",
// // // // //     });

// // // // //     tl.to(el, {
// // // // //       background: "#000000",
// // // // //       opacity: 0.5,
// // // // //       duration: 0.6,
// // // // //       ease: "none",
// // // // //     });

// // // // //     tl.to(el, {
// // // // //       opacity: 0,
// // // // //       duration: 0.6,
// // // // //       ease: "power2.out",
// // // // //       pointerEvents: "none",
// // // // //     });

// // // // //     return () => {tl.kill()};
// // // // //   }, []);

// // // // //   return (
// // // // //     <section
// // // // //       ref={wrapRef}
// // // // //       className="relative h-screen overflow-hidden bg-black font-kumbh"
// // // // //     >
// // // // //       {/* Wave Background BELOW */}
// // // // //       <div className="absolute inset-0 z-[10]">
// // // // //         <WaveBackground />
// // // // //       </div>

// // // // //        {/* 2. CONTENT HERE */}
// // // // //     <div className="relative  h-full flex items-center justify-center z-99999999999999">
// // // // //       <div className="text-center text-white px-6">
// // // // //         <h1 className="text-7xl font-bold">
// // // // //           Website Development
// // // // //         </h1>

// // // // //         <p className="mt-5 text-2xl text-white/80 max-w-3xl mx-auto">
// // // // //           High-performance websites designed to convert
// // // // //           visitors into customers.
// // // // //         </p>
// // // // //       </div>
// // // // //     </div>


// // // // //       {/* Intro Wrap ABOVE */}
// // // // //       <div
// // // // //         ref={bgRef}
// // // // //         className="absolute inset-0 z-[100]"
// // // // //       />
// // // // //     </section>
// // // // //   );
// // // // // }
// // // // // // "use client";

// // // // // // import { useLayoutEffect, useRef } from "react";
// // // // // // import gsap from "gsap";
// // // // // // import {
// // // // // //   Globe,
// // // // // //   Shield,
// // // // // //   Cloud,
// // // // // //   Store,
// // // // // //   ExternalLink,
// // // // // //   LayoutPanelTop,
// // // // // //   ListChecks,
// // // // // //   CircleDashed,
// // // // // // } from "lucide-react";
// // // // // // import WaveBackground from "./background";

// // // // // // export default function IntroGradientScreen() {
// // // // // //   const wrapRef = useRef<HTMLDivElement>(null);
// // // // // //   const bgRef = useRef<HTMLDivElement>(null);

// // // // // //   useLayoutEffect(() => {
// // // // // //     const ctx = gsap.context(() => {
// // // // // //       const tl = gsap.timeline();

// // // // // //       /* ---------------- INITIAL STATES ---------------- */
// // // // // //       gsap.set(".hero-icon", { opacity: 0, scale: 0.4 });
// // // // // //       gsap.set(".title-line", { yPercent: 110 });
// // // // // //       gsap.set(".hero-sub", { opacity: 0, y: 24 });

// // // // // //       gsap.set(bgRef.current, {
// // // // // //         opacity: 0.8,
// // // // // //         background:
// // // // // //           "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
// // // // // //       });

// // // // // //       /* ---------------- INTRO BACKGROUND ---------------- */

// // // // // //       tl.to(bgRef.current, {
// // // // // //         background:
// // // // // //           "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
// // // // // //         opacity: 0.8,
// // // // // //         duration: 0.5,
// // // // // //         ease: "none",
// // // // // //       });

// // // // // //       tl.to(bgRef.current, {
// // // // // //         background:
// // // // // //           "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
// // // // // //         opacity: 0.8,
// // // // // //         duration: 0.5,
// // // // // //         ease: "none",
// // // // // //       });

// // // // // //       tl.to(bgRef.current, {
// // // // // //         background: "#000000",
// // // // // //         opacity: 0,
// // // // // //         duration: 0.5,
// // // // // //         ease: "none",
// // // // // //       });

// // // // // //       /* ---------------- ICONS ---------------- */

// // // // // //       tl.to(
// // // // // //         ".hero-icon",
// // // // // //         {
// // // // // //           opacity: 1,
// // // // // //           scale: 1,
// // // // // //           duration: 0.55,
// // // // // //           stagger: 0.05,
// // // // // //           ease: "back.out(2)",
// // // // // //         },
// // // // // //         0.18
// // // // // //       );

// // // // // //       /* ---------------- TITLE ---------------- */

// // // // // //       tl.to(
// // // // // //         ".title-line",
// // // // // //         {
// // // // // //           yPercent: 0,
// // // // // //           duration: 0.8,
// // // // // //           stagger: 0.08,
// // // // // //           ease: "power4.out",
// // // // // //         },
// // // // // //         0.45
// // // // // //       );

// // // // // //       /* ---------------- SUBTITLE ---------------- */

// // // // // //       tl.to(
// // // // // //         ".hero-sub",
// // // // // //         {
// // // // // //           opacity: 1,
// // // // // //           y: 0,
// // // // // //           duration: 0.55,
// // // // // //           ease: "power3.out",
// // // // // //         },
// // // // // //         0.72
// // // // // //       );

// // // // // //       /* ---------------- FLOATING ---------------- */

// // // // // //       tl.add(() => {
// // // // // //         gsap.to(".hero-icon", {
// // // // // //           y: "random(-10,10)",
// // // // // //           x: "random(-6,6)",
// // // // // //           duration: 2.2,
// // // // // //           repeat: -1,
// // // // // //           yoyo: true,
// // // // // //           stagger: {
// // // // // //             each: 0.12,
// // // // // //             from: "random",
// // // // // //           },
// // // // // //           ease: "sine.inOut",
// // // // // //         });
// // // // // //       });

// // // // // //     }, wrapRef);

// // // // // //     return () => ctx.revert();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <section
// // // // // //       ref={wrapRef}
// // // // // //       className="relative h-screen overflow-hidden bg-black text-white"
// // // // // //     >
// // // // // //       {/* BASE */}
// // // // // //       <div className="absolute inset-0 z-99">
// // // // // //         <WaveBackground />
// // // // // //       </div>

// // // // // //       {/* INTRO GRADIENT */}
// // // // // //       <div
// // // // // //         ref={bgRef}
// // // // // //         className="absolute inset-0 z-999"
// // // // // //       />

      
// // // // // //     </section>
// // // // // //   );
// // // // // // }
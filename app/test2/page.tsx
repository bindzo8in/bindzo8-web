"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;

    if (!el) return;

    const state = {
      angle: 90,
      white: 100,
      gray: 0,
      black: 0,
    };

    const updateGradient = () => {
      el.style.background = `
        linear-gradient(
          ${state.angle}deg,
          #ffffff 0%,
          #ffffff ${state.white}%,
          #d1d5db ${state.white}%,
          #d1d5db ${state.white + state.gray}%,
          #000000 ${state.white + state.gray}%,
          #000000 100%
        )
      `;
    };

    updateGradient();

    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power2.inOut",
        onUpdate: updateGradient,
      },
    });

    // Step 1 → white to split colors
    tl.to(state, {
      white: 70,
      gray: 20,
      black: 10,
    })

      // Step 2 → rotate + grow black
      .to(state, {
        angle: 180,
        white: 40,
        gray: 20,
        black: 40,
        duration: 2.5,
      })

      // Step 3 → black dominates
      .to(state, {
        angle: 270,
        white: 10,
        gray: 10,
        black: 80,
        duration: 2.5,
      })

      // Final → full black
      .to(state, {
        angle: 360,
        white: 0,
        gray: 0,
        black: 100,
        duration: 2,
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="w-full h-screen transition-all duration-300"
    />
  );
}
// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function GsapBackground() {
//   const bgRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

//     tl.to(bgRef.current, {
//       duration: 0,
//       background: "linear-gradient(0deg, #fff 100%, #808080 100%, #000 100%)",
//     })
//     // Step 2: 70% White, 20% Gray, 10% Black
//     .to(bgRef.current, {
//       duration: 2,
//       background: "linear-gradient(-45deg, #fff 70%, #808080 90%, #000 100%)",
//       ease: "power2.inOut",
//     })
//     // Step 3: Shift degree and swallow with Black
//     .to(bgRef.current, {
//       duration: 3,
//       background: "linear-gradient(-180deg, #fff 0%, #808080 0%, #000 100%)",
//       ease: "power2.out",
//     });
//   }, []);

//   return (
//     <div 
//       ref={bgRef} 
//       className="fixed inset-0 w-full h-full flex items-center justify-center"
//     >
//       <h1 className="text-2xl font-bold mix-blend-difference text-white">
//         GSAP Animation
//       </h1>
//     </div>
//   );
// }
// // "use client"
// // import { motion, useAnimation } from "motion/react";
// // import { useEffect } from "react";

// // const BackgroundAnimation = () => {
// //   return (
// //     <div className="relative w-full h-screen overflow-hidden bg-black">
      
// //       {/* LAYER 1: FINAL BACKGROUND (Glow & Waves) */}
// //       <div className="absolute inset-0 z-0">
// //         {/* Glow Balls */}
// //         <motion.div 
// //           animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
// //           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// //           className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px]" 
// //         />
// //         <motion.div 
// //           animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
// //           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
// //           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" 
// //         />
        
// //         {/* Wave Lines (Simplified) */}
// //         <svg className="absolute bottom-0 w-full h-64 opacity-30" viewBox="0 0 1440 320">
// //           <motion.path
// //             initial={{ pathLength: 0, opacity: 0 }}
// //             animate={{ pathLength: 1, opacity: 1 }}
// //             transition={{ delay: 2, duration: 2 }}
// //             fill="none"
// //             stroke="white"
// //             strokeWidth="2"
// //             d="M0,160 C320,300 420,10 640,160 C860,310 960,10 1280,160 L1440,160"
// //           />
// //         </svg>
// //       </div>

// //       {/* LAYER 2: THE GRADIENT SWEEP (The "Sweeper") */}
// //       <motion.div
// //         initial={{ x: "-100%", rotate: -15 }}
// //         animate={{ x: "100%", rotate: 15 }}
// //         transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
// //         className="absolute inset-0 z-10 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
// //         style={{ left: "-50%", top: "-50%" }}
// //       />

// //       {/* LAYER 3: INITIAL WHITE BACKGROUND */}
// //       <motion.div
// //         initial={{ opacity: 1 }}
// //         animate={{ opacity: 0 }}
// //         transition={{ duration: 0.8, delay: 1.2 }}
// //         className="absolute inset-0 z-20 bg-white"
// //       />

// //     </div>
// //   );
// // };

// // export default BackgroundAnimation;

// // // "use client";

// // // import { useEffect, useState } from "react";

// // // // ─── Types ────────────────────────────────────────────────────────────────────
// // // interface FloatingIconDef {
// // //   id: string;
// // //   x: string;
// // //   y: string;
// // //   size: number;
// // //   delay: number;
// // //   svg: React.ReactNode;
// // // }

// // // // ─── Floating Icon Data ───────────────────────────────────────────────────────
// // // const FLOATING_ICONS: FloatingIconDef[] = [
// // //   {
// // //     id: "laptop-lock",
// // //     x: "7%", y: "62%", size: 64, delay: 0,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="8" y="12" width="48" height="32" rx="3" stroke="white" strokeWidth="3" />
// // //         <rect x="14" y="17" width="36" height="22" rx="1" fill="white" fillOpacity="0.12" />
// // //         <path d="M2 44h60v4H2z" fill="white" fillOpacity="0.55" />
// // //         <circle cx="32" cy="46" r="2" fill="white" />
// // //         <rect x="26" y="36" width="12" height="8" rx="2" fill="white" fillOpacity="0.85" />
// // //         <path d="M28 36v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="2.5" fill="none" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "cloud-music",
// // //     x: "6%", y: "22%", size: 56, delay: 1.2,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
// // //         <path d="M48 26a12 12 0 1 0-23.5-3.5A10 10 0 1 0 18 42h30a10 10 0 0 0 0-16z" fill="white" fillOpacity="0.9" />
// // //         <path d="M29 32v10m0-10l6 3-6 3V32z" stroke="#1a1a1a" strokeWidth="2" fill="none" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "cms",
// // //     x: "63%", y: "15%", size: 58, delay: 0.6,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="6" y="8" width="52" height="48" rx="3" stroke="white" strokeWidth="3" />
// // //         <rect x="6" y="8" width="52" height="14" rx="3" fill="white" fillOpacity="0.9" />
// // //         <circle cx="15" cy="15" r="3" fill="#1a1a1a" />
// // //         <circle cx="25" cy="15" r="3" fill="#1a1a1a" />
// // //         <rect x="14" y="30" width="36" height="4" rx="2" fill="white" fillOpacity="0.7" />
// // //         <rect x="14" y="38" width="24" height="4" rx="2" fill="white" fillOpacity="0.5" />
// // //         <rect x="14" y="46" width="28" height="4" rx="2" fill="white" fillOpacity="0.4" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "globe-cursor",
// // //     x: "45%", y: "12%", size: 56, delay: 1.8,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <circle cx="28" cy="28" r="20" stroke="white" strokeWidth="3" />
// // //         <ellipse cx="28" cy="28" rx="10" ry="20" stroke="white" strokeWidth="2" />
// // //         <path d="M8 28h40M28 8c-5 6-8 12-8 20s3 14 8 20M28 8c5 6 8 12 8 20s-3 14-8 20" stroke="white" strokeWidth="2" />
// // //         <path d="M40 40l12 12M40 40l-4-10 10-4-6 14z" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.35" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "www",
// // //     x: "68%", y: "60%", size: 64, delay: 2.4,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <circle cx="32" cy="28" r="22" stroke="white" strokeWidth="3" />
// // //         <ellipse cx="32" cy="28" rx="11" ry="22" stroke="white" strokeWidth="2" />
// // //         <path d="M10 28h44M10 17h44M10 39h44" stroke="white" strokeWidth="2" />
// // //         <text x="32" y="60" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold">WWW</text>
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "external-link",
// // //     x: "87%", y: "58%", size: 58, delay: 0.9,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="8" y="18" width="38" height="38" rx="3" stroke="white" strokeWidth="3" />
// // //         <path d="M30 8h26v26M30 34 56 8" stroke="white" strokeWidth="3" strokeLinecap="round" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "stumbleupon",
// // //     x: "88%", y: "22%", size: 56, delay: 1.5,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <circle cx="32" cy="32" r="26" stroke="white" strokeWidth="3" />
// // //         <text x="32" y="42" textAnchor="middle" fill="white" fontSize="22" fontFamily="Georgia,serif" fontWeight="bold">Su</text>
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "game-shop",
// // //     x: "5%", y: "50%", size: 58, delay: 2.0,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="8" y="16" width="48" height="36" rx="4" stroke="white" strokeWidth="3" />
// // //         <path d="M8 26h48" stroke="white" strokeWidth="2.5" />
// // //         <rect x="20" y="10" width="8" height="10" rx="2" fill="white" fillOpacity="0.8" />
// // //         <rect x="36" y="10" width="8" height="10" rx="2" fill="white" fillOpacity="0.8" />
// // //         <path d="M20 38a6 6 0 0 1 12 0" stroke="white" strokeWidth="2" fill="none" />
// // //         <rect x="36" y="33" width="10" height="10" rx="2" fill="white" fillOpacity="0.45" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "checklist",
// // //     x: "31%", y: "20%", size: 52, delay: 0.3,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="12" y="8" width="40" height="48" rx="4" stroke="white" strokeWidth="3" />
// // //         <path d="M20 24l4 4 8-8M20 36l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
// // //         <rect x="20" y="10" width="24" height="6" rx="2" fill="white" fillOpacity="0.55" />
// // //       </svg>
// // //     ),
// // //   },
// // //   {
// // //     id: "checklist2",
// // //     x: "52%", y: "68%", size: 52, delay: 2.7,
// // //     svg: (
// // //       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //         <rect x="12" y="8" width="40" height="48" rx="4" stroke="white" strokeWidth="3" />
// // //         <path d="M20 24l4 4 8-8M20 36l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
// // //         <rect x="20" y="10" width="24" height="6" rx="2" fill="white" fillOpacity="0.55" />
// // //       </svg>
// // //     ),
// // //   },
// // // ];

// // // // ─── Animated SVG background lines ───────────────────────────────────────────
// // // function BackgroundLines() {
// // //   return (
// // //     <svg
// // //       className="absolute inset-0 w-full h-full pointer-events-none"
// // //       viewBox="0 0 1280 800"
// // //       preserveAspectRatio="xMidYMid slice"
// // //       fill="none"
// // //     >
// // //       <path
// // //         d="M-100 400 Q200 200 500 350 Q800 500 1100 300 Q1300 200 1400 400"
// // //         stroke="rgba(200,80,50,0.3)" strokeWidth="1.5"
// // //         strokeDasharray="1200" strokeDashoffset="1200"
// // //         style={{ animation: "dashDraw 8s linear infinite" }}
// // //       />
// // //       <path
// // //         d="M-100 500 Q300 300 600 450 Q900 600 1300 400"
// // //         stroke="rgba(200,80,50,0.2)" strokeWidth="1"
// // //         strokeDasharray="1400" strokeDashoffset="1400"
// // //         style={{ animation: "dashDraw 11s linear 2s infinite" }}
// // //       />
// // //       <path
// // //         d="M0 600 Q300 400 700 550 Q1000 700 1300 500"
// // //         stroke="rgba(0,180,180,0.22)" strokeWidth="1.5"
// // //         strokeDasharray="1500" strokeDashoffset="1500"
// // //         style={{ animation: "dashDraw 13s linear 1s infinite" }}
// // //       />
// // //       <path
// // //         d="M-50 300 Q250 150 550 250 Q850 350 1150 200 Q1350 100 1450 300"
// // //         stroke="rgba(0,180,180,0.16)" strokeWidth="1"
// // //         strokeDasharray="1300" strokeDashoffset="1300"
// // //         style={{ animation: "dashDraw 9s linear 3s infinite" }}
// // //       />
// // //       <path
// // //         d="M100 700 Q400 500 700 650 Q1000 800 1300 600"
// // //         stroke="rgba(200,160,0,0.15)" strokeWidth="1"
// // //         strokeDasharray="1400" strokeDashoffset="1400"
// // //         style={{ animation: "dashDraw 12s linear 2.5s infinite" }}
// // //       />
// // //       <path
// // //         d="M-100 650 Q200 450 600 600 Q900 750 1280 550"
// // //         stroke="rgba(50,200,100,0.12)" strokeWidth="1"
// // //         strokeDasharray="1600" strokeDashoffset="1600"
// // //         style={{ animation: "dashDraw 15s linear 0.5s infinite" }}
// // //       />
// // //     </svg>
// // //   );
// // // }

// // // // ─── Animated color orb background ───────────────────────────────────────────
// // // function AnimatedBackground() {
// // //   return (
// // //     <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
// // //       <div className="absolute rounded-full blur-[130px] opacity-55"
// // //         style={{ width:"55%", height:"60%", top:"5%", left:"-12%",
// // //           background:"radial-gradient(ellipse,#8b1a1a 0%,#6b0f0f 40%,transparent 70%)",
// // //           animation:"pulseOrb 4s ease-in-out infinite" }} />
// // //       <div className="absolute rounded-full blur-[110px] opacity-45"
// // //         style={{ width:"38%", height:"48%", top:"4%", right:"4%",
// // //           background:"radial-gradient(ellipse,#6b0f6b 0%,#3d0b3d 50%,transparent 70%)",
// // //           animation:"pulseOrb 5.5s ease-in-out infinite alternate" }} />
// // //       <div className="absolute rounded-full blur-[95px] opacity-38"
// // //         style={{ width:"48%", height:"50%", bottom:"-8%", left:"8%",
// // //           background:"radial-gradient(ellipse,#006b6b 0%,#004040 50%,transparent 70%)",
// // //           animation:"pulseOrb 6.5s ease-in-out infinite alternate-reverse" }} />
// // //       <div className="absolute rounded-full blur-[85px] opacity-32"
// // //         style={{ width:"32%", height:"38%", bottom:"-2%", left:"28%",
// // //           background:"radial-gradient(ellipse,#4a6b00 0%,#2a3d00 50%,transparent 70%)",
// // //           animation:"pulseOrb 7.5s ease-in-out infinite" }} />
// // //       <div className="absolute rounded-full blur-[105px] opacity-28"
// // //         style={{ width:"28%", height:"34%", bottom:"8%", right:"-2%",
// // //           background:"radial-gradient(ellipse,#6b006b 0%,#4d004d 50%,transparent 70%)",
// // //           animation:"pulseOrb 5s ease-in-out infinite alternate" }} />
// // //       <BackgroundLines />
// // //     </div>
// // //   );
// // // }

// // // // ─── Floating Icon wrapper ────────────────────────────────────────────────────
// // // function FloatingIcon({ icon }: { icon: FloatingIconDef }) {
// // //   return (
// // //     <div
// // //       className="absolute select-none pointer-events-none"
// // //       style={{
// // //         left: icon.x, top: icon.y,
// // //         width: icon.size, height: icon.size,
// // //         opacity: 0.82,
// // //         animation: `floatIcon ${3.6 + icon.delay * 0.35}s ease-in-out infinite`,
// // //         animationDelay: `${icon.delay}s`,
// // //       }}
// // //     >
// // //       {icon.svg}
// // //     </div>
// // //   );
// // // }

// // // // ─── Navbar ───────────────────────────────────────────────────────────────────
// // // const NAV_LINKS = ["Home", "About", "Services", "Products", "Who we are?", "Career", "Contact"];

// // // function Navbar() {
// // //   const [open, setOpen] = useState(false);
// // //   return (
// // //     <header className="fixed top-0 inset-x-0 z-50 bg-white/96 backdrop-blur-sm shadow-sm">
// // //       <div className="max-w-[1280px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
// // //         {/* Logo */}
// // //         <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
// // //           <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-label="Bindzo 8">
// // //             <circle cx="20" cy="20" r="17" stroke="#111" strokeWidth="2.5" />
// // //             <path d="M13 16a5 5 0 1 1 0 8 5 5 0 0 1 0-8z" fill="#111" fillOpacity="0.9" />
// // //             <path d="M27 16a5 5 0 1 1 0 8 5 5 0 0 1 0-8z" fill="#111" fillOpacity="0.9" />
// // //             <circle cx="20" cy="20" r="3" fill="white" />
// // //           </svg>
// // //           <div>
// // //             <p className="text-[17px] font-black leading-none tracking-wide text-gray-900">BINDZO 8</p>
// // //             <p className="text-[8.5px] tracking-[0.18em] text-gray-400 uppercase mt-0.5">Techno Solutions</p>
// // //           </div>
// // //         </a>

// // //         {/* Desktop nav */}
// // //         <nav className="hidden lg:flex items-center gap-6">
// // //           {NAV_LINKS.map((l) => (
// // //             <a key={l} href="#"
// // //               className={`text-[13.5px] font-medium transition-colors ${l === "Services" ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-gray-900"}`}>
// // //               {l}
// // //             </a>
// // //           ))}
// // //         </nav>

// // //         <a href="#"
// // //           className="hidden lg:flex items-center gap-1.5 px-5 py-2.5 bg-[#e84432] hover:bg-[#c73825] text-white text-[13px] font-semibold rounded-full transition-all shadow-md hover:shadow-lg">
// // //           Start a Project
// // //           <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //             <path d="M3 8h10M9 4l4 4-4 4" />
// // //           </svg>
// // //         </a>

// // //         <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
// // //           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //             {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
// // //           </svg>
// // //         </button>
// // //       </div>

// // //       {open && (
// // //         <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
// // //           {NAV_LINKS.map((l) => (
// // //             <a key={l} href="#" onClick={() => setOpen(false)}
// // //               className={`text-sm py-1 font-medium ${l === "Services" ? "text-orange-500" : "text-gray-700"}`}>
// // //               {l}
// // //             </a>
// // //           ))}
// // //           <a href="#" className="mt-2 text-center px-5 py-2.5 bg-[#e84432] text-white text-sm font-semibold rounded-full">
// // //             Start a Project →
// // //           </a>
// // //         </div>
// // //       )}
// // //     </header>
// // //   );
// // // }

// // // // ─── Vertical side tab ────────────────────────────────────────────────────────
// // // function GetQuoteTab() {
// // //   return (
// // //     <a href="#contact"
// // //       className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#e84432] hover:bg-[#c73825] text-white text-[11px] font-bold tracking-[0.18em] uppercase py-3.5 px-2 rounded-l-md shadow-xl transition-colors"
// // //       style={{ writingMode: "vertical-rl" }}>
// // //       Get Quote
// // //     </a>
// // //   );
// // // }

// // // // ─── 3D e-shop SVG illustration ───────────────────────────────────────────────
// // // function ShopIllustration() {
// // //   return (
// // //     <svg viewBox="0 0 360 290" fill="none" xmlns="http://www.w3.org/2000/svg"
// // //       className="w-full h-full drop-shadow-2xl">
// // //       {/* Monitor shell */}
// // //       <rect x="55" y="20" width="250" height="172" rx="9" fill="#d8d8d8" />
// // //       <rect x="60" y="25" width="240" height="162" rx="7" fill="#14141e" />
// // //       {/* Browser chrome */}
// // //       <rect x="60" y="25" width="240" height="22" rx="7" fill="#2a2a3e" />
// // //       <circle cx="73" cy="36" r="4.5" fill="#ff5f57" />
// // //       <circle cx="87" cy="36" r="4.5" fill="#febc2e" />
// // //       <circle cx="101" cy="36" r="4.5" fill="#28c840" />
// // //       {/* Page content */}
// // //       <rect x="60" y="47" width="240" height="137" fill="#fff8f4" />
// // //       {/* Site header */}
// // //       <rect x="60" y="47" width="240" height="24" fill="#e84432" />
// // //       <text x="180" y="63" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold">SHOP</text>
// // //       <rect x="66" y="54" width="55" height="10" rx="2" fill="white" fillOpacity="0.8" />
// // //       <rect x="220" y="54" width="34" height="10" rx="2" fill="white" fillOpacity="0.55" />
// // //       {/* Product cards */}
// // //       <rect x="68" y="77" width="50" height="44" rx="3" fill="#fde5de" />
// // //       <rect x="125" y="77" width="50" height="44" rx="3" fill="#ddf0ff" />
// // //       <rect x="182" y="77" width="50" height="44" rx="3" fill="#dfffdf" />
// // //       {/* Search */}
// // //       <rect x="68" y="130" width="110" height="13" rx="6.5" fill="#eee" />
// // //       <circle cx="192" cy="136.5" r="9" fill="#e84432" />
// // //       <path d="M188 133 a5 5 0 1 1 7 7M193 138l4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
// // //       {/* Sale badge */}
// // //       <circle cx="165" cy="68" r="16" fill="#e84432" />
// // //       <text x="165" y="72" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="Arial" fontWeight="bold">SALE</text>
// // //       {/* Monitor stand */}
// // //       <rect x="168" y="192" width="24" height="16" rx="2" fill="#bbb" />
// // //       <rect x="145" y="205" width="70" height="10" rx="5" fill="#b4b4b4" />
// // //       {/* Shopping cart */}
// // //       <g transform="translate(52,185)">
// // //         <rect width="58" height="48" rx="5" fill="#ff8c42" fillOpacity="0.82" />
// // //         <path d="M8 14 L13 8 L45 8 L49 30 L13 30z" fill="white" fillOpacity="0.88" />
// // //         <circle cx="19" cy="35" r="5.5" fill="#333" />
// // //         <circle cx="40" cy="35" r="5.5" fill="#333" />
// // //         <path d="M4 4 L10 4 L14 26" stroke="#555" strokeWidth="2.2" fill="none" />
// // //       </g>
// // //       {/* Red shopping bags */}
// // //       <g transform="translate(236,175)">
// // //         <rect width="52" height="62" rx="5" fill="#e84432" fillOpacity="0.88" />
// // //         <path d="M14 10 Q26 -6 38 10" stroke="#c03020" strokeWidth="3" fill="none" />
// // //         <rect x="5" y="26" width="42" height="2.5" fill="white" fillOpacity="0.45" />
// // //         <rect x="15" y="40" width="22" height="18" rx="3" fill="#c03020" fillOpacity="0.45" />
// // //       </g>
// // //       {/* Teal globe at bottom */}
// // //       <circle cx="105" cy="250" r="24" stroke="#4dc8c8" strokeWidth="2.5" />
// // //       <ellipse cx="105" cy="250" rx="12" ry="24" stroke="#4dc8c8" strokeWidth="1.8" />
// // //       <path d="M81 250h48M81 238h48M81 262h48" stroke="#4dc8c8" strokeWidth="1.6" />
// // //       <text x="105" y="284" textAnchor="middle" fill="#4dc8c8" fontSize="9" fontFamily="Arial" fontWeight="bold">WWW</text>
// // //     </svg>
// // //   );
// // // }

// // // // ─── Service feature cards data ───────────────────────────────────────────────
// // // const SERVICES = [
// // //   { icon: "🛍️", title: "E-Commerce Stores",     desc: "Seamless shopping with secure checkout, product management, and conversion-optimised layouts." },
// // //   { icon: "🌐", title: "Business Websites",      desc: "Professional presence that establishes credibility and drives qualified leads." },
// // //   { icon: "📱", title: "Responsive Design",      desc: "Pixel-perfect layouts that look stunning on every screen — mobile, tablet, and desktop." },
// // //   { icon: "⚡", title: "Performance Optimised",  desc: "Lightning-fast load times with Core Web Vitals excellence for better rankings." },
// // //   { icon: "🔒", title: "Secure & Reliable",      desc: "SSL, secure forms, and robust infrastructure that keeps your site and users safe." },
// // //   { icon: "📊", title: "Analytics Ready",        desc: "Built-in tracking integration to measure what matters and grow your business." },
// // // ];

// // // // ─── Process steps ────────────────────────────────────────────────────────────
// // // const STEPS = [
// // //   { n: "01", label: "Discovery", desc: "We understand your goals, audience, and competitive landscape." },
// // //   { n: "02", label: "Design",    desc: "Wireframes and high-fidelity mockups aligned to your brand." },
// // //   { n: "03", label: "Develop",   desc: "Clean, performant code built with modern frameworks." },
// // //   { n: "04", label: "Launch",    desc: "Thorough testing, then a smooth go-live with post-launch support." },
// // // ];

// // // // ─── Page ─────────────────────────────────────────────────────────────────────
// // // export default function WebsiteDevelopmentPage() {
// // //   useEffect(() => {
// // //     // Inject keyframe animations once into document
// // //     const style = document.createElement("style");
// // //     style.textContent = `
// // //       @keyframes floatIcon {
// // //         0%,100% { transform: translateY(0px)   rotate(0deg); }
// // //         33%      { transform: translateY(-13px) rotate(2deg); }
// // //         66%      { transform: translateY(-6px)  rotate(-2deg); }
// // //       }
// // //       @keyframes pulseOrb {
// // //         0%,100% { opacity: var(--orb-opacity, 0.5); transform: scale(1); }
// // //         50%     { opacity: calc(var(--orb-opacity, 0.5) * 1.3); transform: scale(1.07); }
// // //       }
// // //       @keyframes dashDraw {
// // //         to { stroke-dashoffset: 0; }
// // //       }
// // //     `;
// // //     if (!document.getElementById("wb-keyframes")) {
// // //       style.id = "wb-keyframes";
// // //       document.head.appendChild(style);
// // //     }
// // //     return () => document.getElementById("wb-keyframes")?.remove();
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-black">
// // //       <Navbar />
// // //       <GetQuoteTab />

// // //       {/* ── Hero ─────────────────────────────────────────────────────────── */}
// // //       <main className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden pt-16">
// // //         <AnimatedBackground />

// // //         {/* Floating icons */}
// // //         {FLOATING_ICONS.map((icon) => <FloatingIcon key={icon.id} icon={icon} />)}

// // //         {/* Hero content */}
// // //         <div className="relative z-20 flex flex-col items-center text-center px-6 py-16 max-w-4xl mx-auto">
// // //           {/* Illustration */}
// // //           <div className="mb-6 w-full max-w-xs sm:max-w-sm"
// // //             style={{ filter:"drop-shadow(0 24px 60px rgba(0,0,0,0.65))",
// // //                      animation:"floatIcon 4.2s ease-in-out infinite" }}>
// // //             <ShopIllustration />
// // //           </div>

// // //           {/* Heading */}
// // //           <h1 className="text-white font-black leading-[1.06] tracking-tight mb-4"
// // //             style={{ fontSize:"clamp(2.4rem,7vw,5rem)", textShadow:"0 2px 40px rgba(0,0,0,0.55)" }}>
// // //             Website Development
// // //           </h1>

// // //           {/* Subtitle */}
// // //           <p className="text-white/75 font-medium max-w-lg"
// // //             style={{ fontSize:"clamp(1rem,2.2vw,1.2rem)" }}>
// // //             High-performance websites designed to convert visitors into customers.
// // //           </p>

// // //           {/* CTAs */}
// // //           <div className="flex flex-wrap gap-4 justify-center mt-8">
// // //             <a href="#contact"
// // //               className="px-7 py-3 bg-[#e84432] hover:bg-[#c73825] text-white font-semibold rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
// // //               Start a Project
// // //               <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //                 <path d="M3 8h10M9 4l4 4-4 4" />
// // //               </svg>
// // //             </a>
// // //             <a href="#services"
// // //               className="px-7 py-3 bg-white/10 hover:bg-white/18 border border-white/22 text-white font-semibold rounded-full text-sm transition-all backdrop-blur-sm">
// // //               View Our Work
// // //             </a>
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* ── Services Grid ─────────────────────────────────────────────────── */}
// // //       <section id="services" className="bg-[#0d0d0d] py-20 px-6">
// // //         <div className="max-w-6xl mx-auto">
// // //           <div className="text-center mb-14">
// // //             <h2 className="text-white font-bold mb-3"
// // //               style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)" }}>
// // //               What We Build
// // //             </h2>
// // //             <p className="text-white/45 max-w-lg mx-auto text-base">
// // //               From landing pages to full e-commerce platforms — we craft web experiences that perform.
// // //             </p>
// // //           </div>
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
// // //             {SERVICES.map((s) => (
// // //               <div key={s.title}
// // //                 className="group p-6 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300">
// // //                 <div className="text-3xl mb-4">{s.icon}</div>
// // //                 <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
// // //                 <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── Process ───────────────────────────────────────────────────────── */}
// // //       <section className="relative py-20 px-6 bg-[#080808] overflow-hidden">
// // //         <div className="absolute inset-0 opacity-18"
// // //           style={{ background:"radial-gradient(ellipse at 50% 100%,#8b1a1a 0%,transparent 60%)" }} />
// // //         <div className="max-w-5xl mx-auto relative z-10">
// // //           <div className="text-center mb-14">
// // //             <h2 className="text-white font-bold mb-3"
// // //               style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)" }}>
// // //               Our Process
// // //             </h2>
// // //             <p className="text-white/45 max-w-md mx-auto text-base">
// // //               A clear, collaborative workflow — on time and on budget.
// // //             </p>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //             {STEPS.map((s, i) => (
// // //               <div key={s.n} className="relative text-center group">
// // //                 {i < 3 && (
// // //                   <div className="hidden md:block absolute top-8 left-[62%] w-[76%] h-px bg-white/12" />
// // //                 )}
// // //                 <div className="relative z-10">
// // //                   <div className="w-16 h-16 rounded-full bg-[#e84432]/18 border border-[#e84432]/36 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e84432]/28 transition-colors">
// // //                     <span className="text-[#e84432] font-black text-xl">{s.n}</span>
// // //                   </div>
// // //                   <h3 className="text-white font-semibold mb-2">{s.label}</h3>
// // //                   <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── CTA ───────────────────────────────────────────────────────────── */}
// // //       <section id="contact" className="py-20 px-6 bg-[#0d0d0d]">
// // //         <div className="max-w-3xl mx-auto text-center">
// // //           <h2 className="text-white font-bold mb-4"
// // //             style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)" }}>
// // //             Ready to build something great?
// // //           </h2>
// // //           <p className="text-white/50 mb-8 text-base max-w-lg mx-auto">
// // //             Tell us about your project and get a free, no-obligation quote within 24 hours.
// // //           </p>
// // //           <a href="mailto:hello@bindzo8.com"
// // //             className="inline-flex items-center gap-2 px-8 py-4 bg-[#e84432] hover:bg-[#c73825] text-white font-semibold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:scale-105">
// // //             Start a Project
// // //             <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //               <path d="M3 8h10M9 4l4 4-4 4" />
// // //             </svg>
// // //           </a>
// // //         </div>
// // //       </section>

// // //       {/* ── Footer ────────────────────────────────────────────────────────── */}
// // //       <footer className="bg-[#040404] border-t border-white/[0.07] py-10 px-6">
// // //         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
// // //           <div className="flex items-center gap-2">
// // //             <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-label="Bindzo 8">
// // //               <circle cx="20" cy="20" r="17" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.05" />
// // //               <path d="M13 16a5 5 0 1 1 0 8 5 5 0 0 1 0-8z" fill="white" fillOpacity="0.85" />
// // //               <path d="M27 16a5 5 0 1 1 0 8 5 5 0 0 1 0-8z" fill="white" fillOpacity="0.85" />
// // //               <circle cx="20" cy="20" r="3" fill="#040404" />
// // //             </svg>
// // //             <span className="text-white/60 text-sm font-semibold tracking-wide">BINDZO 8</span>
// // //           </div>
// // //           <p className="text-white/25 text-xs text-center">
// // //             © {new Date().getFullYear()} Bindzo 8 Techno Solutions. All rights reserved.
// // //           </p>
// // //           <div className="flex gap-5">
// // //             {["Privacy","Terms","Contact"].map((l) => (
// // //               <a key={l} href="#" className="text-white/30 hover:text-white/65 text-xs transition-colors">{l}</a>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // }
"use client"
import { motion, useAnimationControls } from "motion/react"
import { useEffect } from "react"
import SlideButton from "./slide-button"
import Background from "./background"
import HeroRight from "./heroRight" // ← your SVG component

export default function HeroSection() {
  const floatControls = useAnimationControls()

  useEffect(() => {
    const timeout = setTimeout(() => {
      floatControls.start({
        y: [0, -20, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      })
    }, 1600)
    return () => clearTimeout(timeout)
  }, [floatControls])

  return (
    <>
      <style>{`
        @keyframes scrolling13 {
          0%   { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(10px); }
        }
        .mouse-scroll-dot { animation: scrolling13 1s linear infinite; }
      `}</style>

      <section className="relative w-full min-h-screen lg:h-screen bg-black flex flex-col lg:flex-row justify-center items-center px-6 py-16 sm:px-10 md:px-16 lg:py-0 lg:px-24 xl:px-36 gap-10 lg:gap-4 overflow-hidden">

        <Background />

        {/* left side */}
        <motion.div
          className="w-full lg:w-1/2 font-kumbh font-normal flex flex-col justify-center items-start gap-4 md:gap-6 z-10"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.001, ease: "easeInOut", type: "spring", stiffness: 100 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight md:leading-[3.75rem]">
            Building your Digital Identity With{" "}
            <span className="text-[#E7325C] font-bold">Precision and Creativity.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white">
            Because we value your brand as much as you do.
          </p>
          <div>
            <SlideButton />
          </div>
        </motion.div>

        {/* right side — SVG scales itself, no explicit heights needed */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center z-10"
          animate={floatControls}
        >
          <HeroRight className="w-full h-auto max-w-[609px]" />
        </motion.div>

        {/* scroll indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        >
          <div className="w-[38px] h-[68px] border-[3px] border-[rgba(122,122,124,0.918)] rounded-[20px] flex items-center justify-center">
            <span
              className="mouse-scroll-dot block w-[14px] h-[14px] rounded-full"
              style={{ background: "linear-gradient(170deg, rgba(122,122,124,0.918), rgb(123,124,124))" }}
            />
          </div>
          <span className="text-[rgba(122,122,124,0.918)] text-xs font-kumbh tracking-widest uppercase">
            Scroll Down
          </span>
        </motion.div> */}

      </section>
    </>
  )
}

// "use client"
// import { motion, useAnimationControls } from "motion/react"
// import Image from "next/image";
// import { useEffect } from "react";
// import SlideButton from "./slide-button";
// import Background from "./background";

// const MotionImage = motion.create(Image);

// export default function HeroSection() {
//     const floatControls = useAnimationControls();

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             floatControls.start({
//                 y: [0, -20, 0], // Move up and down
//                 transition: {
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                 },
//             })
//         }, 1600)
//         return () => clearTimeout(timeout);
//     }, [floatControls])

 
//     return (
//         <>
//             {/* hero section */}
//             <section className="relative w-full h-screen bg-black flex justify-center items-center p-36 gap-4 overflow-hidden">

//                 <Background />

//                 {/* left side */}
//                 <motion.div className="w-1/2 h-full font-kumbh font-normal flex flex-col justify-center items-start gap-6 z-10"
//                     initial={{ opacity: 0, x: -500 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.001, ease: "easeInOut", type: "spring", stiffness: 100 }}

//                 >
//                     <h1 className=" text-5xl text-white leading-15">Building your Digital Identity With <span className="text-[#E7325C] font-bold">Precision and Creativity.</span></h1>
//                     <p className="text-2xl text-white">Because we value your brand as much as you do.</p>
//                     <div>
//                         {/* <button className="rounded-full bg-[#EF8030] px-20 py-3">Explore</button> */}
//                         <SlideButton />
//                     </div>
//                 </motion.div>

//                 {/* right side */}
//                 <motion.div className="w-1/2 h-full flex justify-center items-center z-10"
//                     animate={floatControls}
//                 >
//                     <div className="relative w-full h-full">
//                         {/* Layer 1 - Static */}
//                         <Image
//                             src="/home/hero_Ellipse_1.svg"
//                             loading="eager"
//                             className="w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//                             alt="Hero Ellipse 1"
//                             height={443}
//                             width={443}
//                         />

//                         {/* Layer 2 - From Top */}
//                         <MotionImage
//                             src="/home/hero_Ellipse_2.svg"
//                             loading="eager"
//                             className="w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//                             alt="Hero Ellipse 2"
//                             height={443}
//                             width={443}
//                             initial={{ y: -100, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//                         />

//                         {/* Layer 3 - From Left */}
//                         <MotionImage
//                             src="/home/hero_Ellipse_3.svg"
//                             loading="eager"
//                             className="w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//                             alt="Hero Ellipse 3"
//                             height={443}
//                             width={443}
//                             initial={{ x: -100, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
//                         />

//                         {/* Layer 4 - From Bottom */}
//                         <MotionImage
//                             src="/home/hero_char.svg"
//                             loading="eager"
//                             className="w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//                             alt="Hero Character"
//                             height={443}
//                             width={443}
//                             initial={{ y: 100, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
//                         />

//                         {/* Layer 5 - Static */}
//                         <MotionImage
//                             src="/home/pencil.svg"
//                             loading="eager"
//                             className="w-auto h-auto absolute top-28 -right-1/6 transform -translate-x-1/2 -translate-y-1/2 z-50"
//                             alt="Pencil"
//                             height={443}
//                             width={443}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
//                         />
//                     </div>
//                 </motion.div>
//             </section>
//         </>
//     );
// }
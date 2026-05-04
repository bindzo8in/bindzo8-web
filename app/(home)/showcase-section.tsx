"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import gsap from "gsap";
import FloatingBrandMark from "./floatingBrandMark";

/* ------------------------------------------------------------------ */
/*  Slide data — replace src values with real screenshots when ready  */
/* ------------------------------------------------------------------ */
const slides = [
  {
    id: 1,
    bg: "from-[#0d1b2a] to-[#1b3a5c]",
    accent: "#64b5f6",
    label: "Travel & Explore",
    desc: "Responsive multi-platform web experience",
    device: "laptop",
  },
  {
    id: 2,
    bg: "from-[#72c6ef] to-[#004e8c]",
    accent: "#ffffff",
    label: "Landscape Discovery",
    desc: "Nature photography portfolio",
    device: "tablet",
  },
  {
    id: 3,
    bg: "from-[#fff3e0] to-[#ffe0b2]",
    accent: "#e65100",
    label: "Food & Lifestyle",
    desc: "E-commerce & delivery platform",
    device: "mobile",
  },
  {
    id: 4,
    bg: "from-[#e8f5e9] to-[#c8e6c9]",
    accent: "#2e7d32",
    label: "Green Living",
    desc: "Sustainability & eco-tech app",
    device: "laptop",
  },
  {
    id: 5,
    bg: "from-[#fce4ec] to-[#f8bbd0]",
    accent: "#ad1457",
    label: "Beauty & Wellness",
    desc: "Booking & CRM solution",
    device: "mobile",
  },
];

/* ------------------------------------------------------------------ */
/*  Root wrapper                                                      */
/* ------------------------------------------------------------------ */
export default function ShowcaseSections() {
  return (
    <section className="relative overflow-hidden font-kumbh bg-[#f3f1f1]">
      {/* Shared ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[38%] h-[45%] bg-gradient-to-r from-[#dbe8ff] to-transparent blur-2xl opacity-80" />
        <div className="absolute top-[35%] left-[35%] w-[420px] h-[420px] rounded-full bg-[#ffd9e4] blur-[140px] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[35%] h-[40%] bg-gradient-to-l from-[#dce7f8] to-transparent blur-2xl opacity-70" />
      </div>

      <FloatingBrandMark>
        <ProductSection />
      </FloatingBrandMark>
      <WhyChooseUs />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT SECTION                                                   */
/* ------------------------------------------------------------------ */
function ProductSection() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <section className="relative min-h-[640px] max-w-7xl mx-auto flex flex-col md:flex-row items-center py-16 md:py-0 w-full">
      {/* LEFT — copy */}
      <article className="relative z-10 w-full md:flex-1 flex justify-center md:justify-start items-center px-8 lg:px-16 mb-12 md:mb-0">
        <div className="flex flex-col gap-5 md:gap-7 max-w-xs text-center md:text-left items-center md:items-start w-full">
          <span className="text-[#E7325C] text-lg font-semibold tracking-wide">
            Our Products
          </span>

          <h2 className="font-bold text-black text-3xl md:text-[2.25rem] leading-tight">
            Latest Projects
            <br className="hidden md:block" /> From Our Team
          </h2>

          <button className="flex items-center gap-2 border border-[#E7325C] text-[#E7325C] px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#E7325C] hover:text-white transition-all duration-300 group mt-2 md:mt-0">
            View all Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </article>

      {/* RIGHT — carousel */}
      <article className="relative z-10 w-full md:flex-1 flex justify-center items-center px-4 md:px-0 md:py-16 md:pr-4 overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "center", loop: true }}
          className="w-full max-w-[560px]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="pl-4 basis-[85%] sm:basis-[75%] md:basis-[70%]"
              >
                <div
                  className={`relative rounded-2xl bg-gradient-to-br ${slide.bg} p-6 h-[280px] md:h-[320px] flex flex-col justify-between shadow-xl overflow-hidden`}
                >
                  {/* your slide content */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 md:-left-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10 hidden sm:flex" />

          <CarouselNext className="right-2 md:-right-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10 hidden sm:flex" />
        </Carousel>
      </article>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY CHOOSE US                                                     */
/* ------------------------------------------------------------------ */
function WhyChooseUs() {
  return (
    <section className="relative min-h-[640px] max-w-7xl mx-auto flex items-center px-8 lg:px-16 py-20 w-full">
      {/* soft left blue wash */}
      <div className="absolute left-0 top-0 w-[38%] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
        {/* LEFT */}
        <div className="max-w-[520px]">
          <p className="text-black text-[18px] mb-5 font-medium tracking-wide">
            Why Choose Us?
          </p>

          <h2 className="text-[2.6rem] lg:text-[3rem] font-bold leading-tight text-black mb-7">
            We're Bindzo IT Solutions Pvt Ltd
          </h2>

          <p className="text-[16px] lg:text-[17px] leading-[1.85] text-black/65 mb-12 text-justify">
            Bindzo IT Solutions Pvt. Ltd. takes your business beyond boundaries
            with smart, scalable, and secure technology solutions. As a trusted
            end-to-end IT service partner, we deliver innovation that drives
            growth and efficiency. Our dedicated team ensures seamless IT
            support and strategic digital transformation tailored to your
            business goals. At Bindzo, we grow together, through collaboration,
            creativity, and a shared vision for success.
          </p>

          <button className="border border-[#ff3b6a] text-[#ff3b6a] px-12 py-4 rounded-full text-[18px] hover:bg-[#ff3b6a] hover:text-white transition-all duration-300">
            Explore
          </button>
        </div>

        {/* RIGHT — illustration */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/why_choose_us.png"
            alt="Bindzo team collaborating"
            className="w-full max-w-[480px] object-contain animate-float"
          />
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
// "use client";

// import React, { useLayoutEffect, useRef } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { motion } from "motion/react";
// import gsap from "gsap";
// import FloatingBrandMark from "./floatingBrandMark";
// /* ------------------------------------------------------------------ */
// /*  Slide data — replace src values with real screenshots when ready    */
// /* ------------------------------------------------------------------ */
// const slides = [
//   {
//     id: 1,
//     bg: "from-[#0d1b2a] to-[#1b3a5c]",
//     accent: "#64b5f6",
//     label: "Travel & Explore",
//     desc: "Responsive multi-platform web experience",
//     device: "laptop",
//   },
//   {
//     id: 2,
//     bg: "from-[#72c6ef] to-[#004e8c]",
//     accent: "#ffffff",
//     label: "Landscape Discovery",
//     desc: "Nature photography portfolio",
//     device: "tablet",
//   },
//   {
//     id: 3,
//     bg: "from-[#fff3e0] to-[#ffe0b2]",
//     accent: "#e65100",
//     label: "Food & Lifestyle",
//     desc: "E-commerce & delivery platform",
//     device: "mobile",
//   },
//   {
//     id: 4,
//     bg: "from-[#e8f5e9] to-[#c8e6c9]",
//     accent: "#2e7d32",
//     label: "Green Living",
//     desc: "Sustainability & eco-tech app",
//     device: "laptop",
//   },
//   {
//     id: 5,
//     bg: "from-[#fce4ec] to-[#f8bbd0]",
//     accent: "#ad1457",
//     label: "Beauty & Wellness",
//     desc: "Booking & CRM solution",
//     device: "mobile",
//   },
// ];

// /* ------------------------------------------------------------------ */
// /*  Root wrapper                                                         */
// /* ------------------------------------------------------------------ */
// export default function ShowcaseSections() {
//   return (
//     <section className="relative overflow-hidden font-kumbh bg-[#f3f1f1]">
//       {/* Shared ambient gradients */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-[38%] h-[45%] bg-gradient-to-r from-[#dbe8ff] to-transparent blur-2xl opacity-80" />
//         <div className="absolute top-[35%] left-[35%] w-[420px] h-[420px] rounded-full bg-[#ffd9e4] blur-[140px] opacity-40" />
//         <div className="absolute bottom-0 right-0 w-[35%] h-[40%] bg-gradient-to-l from-[#dce7f8] to-transparent blur-2xl opacity-70" />
//       </div>

//       <FloatingBrandMark>
//         <ProductSection />
//       </FloatingBrandMark>
//       <WhyChooseUs />
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  PRODUCT SECTION                                                      */
// /* ------------------------------------------------------------------ */
// function ProductSection() {
//   const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));




 

//   return (
//     <section
//       className="relative min-h-[640px] flex flex-col md:flex-row items-center overflow-hidden py-16 md:py-0 inset-0 w-full "
//     >
//       {/* LEFT — copy */}
//       <article className="relative z-10 w-full md:flex-1 flex justify-center md:justify-start items-center px-8 lg:px-16 mb-12 md:mb-0">
//         <div className="flex flex-col gap-5 md:gap-7 max-w-xs text-center md:text-left items-center md:items-start w-full">
//           <span className="text-[#E7325C] text-lg font-semibold tracking-wide">
//             Our Products
//           </span>

//           <h2 className="font-bold text-black text-3xl md:text-[2.25rem] leading-tight">
//             Latest Projects
//             <br className="hidden md:block" /> From Our Team
//           </h2>

//           <button className="flex items-center gap-2 border border-[#E7325C] text-[#E7325C] px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#E7325C] hover:text-white transition-all duration-300 group mt-2 md:mt-0">
//             View all Projects
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//           </button>
//         </div>
//       </article>

//       {/* RIGHT — carousel */}
//       <article className="relative z-10 w-full md:flex-1 flex justify-center items-center px-4 md:px-0 md:py-16 md:pr-4 overflow-hidden">
//         <Carousel
//           plugins={[plugin.current]}
//           opts={{ align: "center", loop: true }}
//           className="w-full max-w-[560px]"
//           onMouseEnter={plugin.current.stop}
//           onMouseLeave={plugin.current.reset}
//         >
//           <CarouselContent className="-ml-4">
//             {slides.map((slide) => (
//               <CarouselItem
//                 key={slide.id}
//                 className="pl-4 basis-[85%] sm:basis-[75%] md:basis-[70%]"
//               >
//                 <div
//                   className={`relative rounded-2xl bg-gradient-to-br ${slide.bg} p-6 h-[280px] md:h-[320px] flex flex-col justify-between shadow-xl overflow-hidden`}
//                 >
//                   {/* your slide content */}
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="left-2 md:-left-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10 hidden sm:flex" />

//           <CarouselNext className="right-2 md:-right-5 bg-[#f97316] border-0 text-white hover:bg-[#ea580c] hover:scale-110 shadow-md transition-all duration-200 w-10 h-10 hidden sm:flex" />
//         </Carousel>
//       </article>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  WHY CHOOSE US                                                        */
// /* ------------------------------------------------------------------ */
// function WhyChooseUs() {
//   return (
//     <section className="relative min-h-[640px] flex items-center px-8 lg:px-24 py-20">
//       {/* soft left blue wash */}
//       <div className="absolute left-0 top-0  w-[38%] pointer-events-none" />

//       <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center w-full">
//         {/* LEFT */}
//         <div className="max-w-[520px]">
//           <p className="text-black text-[18px] mb-5 font-medium tracking-wide">
//             Why Choose Us?
//           </p>

//           <h2 className="text-[2.6rem] lg:text-[3rem] font-bold leading-tight text-black mb-7">
//             We're Bindzo IT Solutions Pvt Ltd
//           </h2>

//           <p className="text-[16px] lg:text-[17px] leading-[1.85] text-black/65 mb-12 text-justify">
//             Bindzo IT Solutions Pvt. Ltd. takes your business beyond boundaries
//             with smart, scalable, and secure technology solutions. As a trusted
//             end-to-end IT service partner, we deliver innovation that drives
//             growth and efficiency. Our dedicated team ensures seamless IT
//             support and strategic digital transformation tailored to your
//             business goals. At Bindzo, we grow together, through collaboration,
//             creativity, and a shared vision for success.
//           </p>

//           <button className="border border-[#ff3b6a] text-[#ff3b6a] px-12 py-4 rounded-full text-[18px] hover:bg-[#ff3b6a] hover:text-white transition-all duration-300">
//             Explore
//           </button>
//         </div>

//         {/* RIGHT — illustration */}
//         <div className="flex justify-center lg:justify-end">
//           <img
//             src="/why_choose_us.png"
//             alt="Bindzo team collaborating"
//             className="w-full max-w-[480px] object-contain animate-float"

//           />
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         @keyframes float {
//           0%   { transform: translateY(0px); }
//           50%  { transform: translateY(-14px); }
//           100% { transform: translateY(0px); }
//         }
//       `}</style>
//     </section>
//   );
// }
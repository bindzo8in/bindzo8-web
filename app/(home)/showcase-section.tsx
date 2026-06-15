"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FloatingBrandMark from "./floatingBrandMark";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  mediaUrl: string;
};

const FALLBACK_SLIDES = [
  {
    id: "1",
    bg: "from-[#0d1b2a] to-[#1b3a5c]",
    accent: "#64b5f6",
    label: "Travel & Explore",
    desc: "Responsive multi-platform web experience",
    image: "/products/1.jpeg",
  },
  {
    id: "2",
    bg: "from-[#72c6ef] to-[#004e8c]",
    accent: "#ffffff",
    label: "Landscape Discovery",
    desc: "Nature photography portfolio",
    image: "/products/2.jpeg",
  },
  {
    id: "3",
    bg: "from-[#fff3e0] to-[#ffe0b2]",
    accent: "#e65100",
    label: "Food & Lifestyle",
    desc: "E-commerce & delivery platform",
    image: "/products/3.jpeg",
  },
];

const GRADIENTS = [
  "from-[#0d1b2a] to-[#1b3a5c]",
  "from-[#72c6ef] to-[#004e8c]",
  "from-[#fff3e0] to-[#ffe0b2]",
  "from-[#e8f5e9] to-[#c8e6c9]",
  "from-[#fce4ec] to-[#f8bbd0]",
];

export default function ShowcaseSections() {
  return (
    <section className="relative overflow-hidden bg-[#f3f1f1] font-kumbh">
      {/* Shared ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[35%] w-[70%] bg-gradient-to-r from-[#dbe8ff] to-transparent opacity-70 blur-2xl sm:h-[45%] sm:w-[38%]" />
        <div className="absolute left-1/2 top-[30%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#ffd9e4] opacity-40 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[35%] w-[70%] bg-gradient-to-l from-[#dce7f8] to-transparent opacity-70 blur-2xl sm:h-[40%] sm:w-[35%]" />
      </div>

      <FloatingBrandMark>
        <ProductSection />
      </FloatingBrandMark>

      <WhyChooseUs />
    </section>
  );
}

function ProductSection() {
  const autoScrollRef = useRef(AutoScroll({ 
    speed: 1, 
    stopOnInteraction: false,
    stopOnMouseEnter: true
  }));
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    fetch("/api/projects?limit=10")
      .then((res) => res.json())
      .then((data) => {
        if (data?.items?.length > 0) {
          setSlides(
            data.items.map((item: Project, idx: number) => ({
              id: item.id,
              bg: GRADIENTS[idx % GRADIENTS.length],
              accent: "#c42b47",
              label: item.title,
              desc: item.description,
              image: item.mediaUrl,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center gap-12 px-5 py-8 md:flex-row md:justify-between md:px-8 md:py-10 lg:px-12 lg:py-10">
      {/* LEFT — copy */}
      <article className="relative z-10 mb-10 flex w-full justify-center md:mb-0 md:flex-1 md:justify-start lg:pl-10">
        <div className="flex w-full max-w-[430px] flex-col items-center gap-4 text-center md:items-start md:text-left lg:gap-6">
          <span className="text-base font-semibold tracking-wide text-[#c42b47] sm:text-lg">
            Our Products
          </span>

          <h2 className="text-[34px] font-bold leading-[1.08] text-black sm:text-4xl md:text-[2.25rem]">
            Latest Projects
            <br className="hidden md:block" /> From Our Team
          </h2>

          <button className="group mt-2 flex items-center gap-2 rounded-2xl border border-[#c42b47] px-6 py-2.5 text-sm font-medium text-[#c42b47] transition-all duration-300 hover:bg-[#c42b47] hover:text-white">
            View all Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </article>

      {/* RIGHT — carousel */}
      <article className="relative z-10 flex w-full justify-center overflow-hidden md:flex-1 md:justify-end md:py-8 lg:pr-10">
        <Carousel
          plugins={[autoScrollRef.current]}
          opts={{ align: "start", loop: true, dragFree: true }}
          className="w-full max-w-[800px]"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="pl-3 basis-[88%] sm:pl-4 sm:basis-[72%] md:basis-[78%] lg:basis-[70%]"
              >
                <div
                  className={`group/card relative h-[320px] overflow-hidden rounded-[28px] bg-gradient-to-br ${slide.bg} p-1 shadow-xl sm:h-[360px] md:h-[350px] lg:h-[380px]`}
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slide.image}
                      alt={slide.label}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 768px) 72vw, 480px"
                      className="object-cover opacity-65 transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover/card:bg-black/10" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 sm:p-6">
                    <h3 className="mb-2 translate-y-0 text-xl font-bold text-white transition-transform duration-500 group-hover/card:translate-y-0 md:text-2xl">
                      {slide.label}
                    </h3>

                    <p className="line-clamp-2 text-sm leading-relaxed text-white/85 opacity-100 transition-all duration-500 sm:line-clamp-3 md:opacity-0 md:translate-y-4 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </article>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative mx-auto flex min-h-fit w-full max-w-[1600px] items-center px-5 py-6 sm:px-6 md:min-h-[400px] md:px-8 md:py-8 lg:px-20 lg:py-8">
      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
        {/* LEFT */}
        <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
          <p className="mb-4 text-[16px] font-semibold tracking-wide text-[#d3325c] sm:text-[18px] uppercase">
            Why Choose Us?
          </p>

          <h2 className="mb-6 text-[34px] font-bold leading-[1.12] text-gray-900 sm:text-[2.4rem] lg:text-[3rem]">
            We're Bindzo 8 Pvt Ltd
          </h2>

          <p className="mb-8 text-justify text-[15px] leading-[1.8] text-gray-600 sm:text-[16px] lg:mb-10 lg:text-[17px]">
            Bindzo 8 Pvt. Ltd. takes your business beyond boundaries
            with smart, scalable, and secure technology solutions. As a trusted
            end-to-end IT service partner, we deliver innovation that drives
            growth and efficiency. Our dedicated team ensures seamless IT
            support and strategic digital transformation tailored to your
            business goals. At Bindzo, we grow together, through collaboration,
            creativity, and a shared vision for success.
          </p>

          <button className="rounded-full border border-[#d3325c] px-10 py-3.5 text-[16px] font-medium text-[#d3325c] transition-all duration-300 hover:bg-[#d3325c] hover:text-white sm:px-12 sm:py-4 sm:text-[18px]">
            Explore
          </button>
        </div>

        {/* RIGHT — illustration */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/why_choose_us.png"
            alt="Bindzo team collaborating"
            width={480}
            height={480}
            className="h-auto w-full max-w-[300px] object-contain animate-float sm:max-w-[400px] lg:max-w-[480px]"
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
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const partners = [
  { name: "Adobe", logo: "/img/partners/adobe.svg" },
  { name: "AWS", logo: "/img/partners/aws.webp" },
  { name: "DigitalOcean", logo: "/img/partners/do.webp" },
  { name: "Docker", logo: "/img/partners/docker.svg" },
  { name: "Figma", logo: "/img/partners/figma.webp" },
  { name: "Google Ads", logo: "/img/partners/gad.webp" },
  { name: "Google Cloud", logo: "/img/partners/gcloud.webp" },
  { name: "GitHub", logo: "/img/partners/github.webp" },
  { name: "Meta", logo: "/img/partners/meta.svg" },
  { name: "Vercel", logo: "/img/partners/vercel.svg" },
  { name: "PostgreSQL", logo: "/img/partners/postgresql.png" },
  { name: "React", logo: "/img/partners/react.svg" },
  { name: "Zoho", logo: "/img/partners/zoho.svg" },
  { name: "Resend", logo: "/img/partners/resend.png" },
  { name: "DJI", logo: "/img/partners/dji.svg" },
  { name: "Sony", logo: "/img/partners/sony.svg" },
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const label = section.querySelector(".partners-label");
      const heading = section.querySelector(".partners-heading");
      const description = section.querySelector(".partners-description");
      const items = section.querySelectorAll(".partner-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (label) {
        tl.fromTo(
          label,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          {
            y: 100,
            opacity: 0,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        );
      }

      if (description) {
        tl.fromTo(
          description,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }

      if (items.length) {
        tl.fromTo(
          items,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.25",
        );
      }
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="
                relative
                w-full
                overflow-hidden
                bg-white
                py-24
                md:py-32
                lg:py-40
            "
    >
      <div
        className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-6
                    md:px-8
                    lg:px-16
                    xl:px-32
                "
      >
        {/* =====================================================
                    HEADER
                ===================================================== */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Small label */}

          <div className="lg:col-span-3">
            <div className="partners-label flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-black" />

              <span
                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                    text-gray-400
                                "
              >
                Industry Standard
              </span>
            </div>
          </div>

          {/* Main heading */}

          <div className="lg:col-span-9">
            <h2
              className="
                                partners-heading
                                max-w-5xl
                                text-[clamp(3.5rem,8vw,8rem)]
                                font-medium
                                leading-[0.84]
                                tracking-[-0.065em]
                                text-black
                            "
            >
              Partners we put
              <br />
              our trust{" "}
              <span
                className="
                                    bg-gradient-to-r
                                    from-[#E7325C]
                                    to-[#EF8030]
                                    bg-clip-text
                                    text-transparent
                                "
              >
                in.
              </span>
            </h2>

            <p
              className="
                                partners-description
                                mt-10
                                max-w-xl
                                text-base
                                leading-relaxed
                                text-gray-500
                                md:text-lg
                            "
            >
              We collaborate with trusted partners who share our standards for
              quality, creativity and technology — helping us deliver better
              experiences from idea to execution.
            </p>
          </div>
        </div>

        {/* =====================================================
                    DIVIDER
                ===================================================== */}

        <div className="mt-20 border-t border-gray-200 md:mt-28 lg:mt-36" />

        {/* =====================================================
                    PARTNER GRID
                ===================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="
                                partner-item
                                group
                                relative
                                flex
                                h-32
                                items-center
                                justify-center
                                border-b
                                border-gray-200
                                px-6
                                md:h-40
                                md:border-r
                                lg:h-48
                            "
            >
              {/* Remove right border from last column */}

              <div
                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gray-50
                                    opacity-0
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                "
              />

              <Image
                src={partner.logo}
                alt={partner.name}
                width={220}
                height={80}
                className="
                                    relative
                                    z-10
                                    max-h-10
                                    w-auto
                                    max-w-[150px]
                                    object-contain

                                    grayscale
                                    opacity-40

                                    transition-all
                                    duration-500
                                    ease-out

                                    group-hover:scale-110
                                    group-hover:grayscale-0
                                    group-hover:opacity-100

                                    md:max-h-12
                                    md:max-w-[180px]
                                "
              />

              {/* Number */}

              <span
                className="
                                    absolute
                                    right-4
                                    top-4
                                    text-[10px]
                                    tracking-widest
                                    text-gray-300
                                    transition-colors
                                    duration-300
                                    group-hover:text-gray-500
                                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* =====================================================
                    BOTTOM STATEMENT
                ===================================================== */}

        <div
          className="
                        mt-10
                        flex
                        flex-col
                        justify-between
                        gap-4
                        md:flex-row
                        md:items-center
                    "
        >
          <p
            className="
                            text-xs
                            uppercase
                            tracking-[0.18em]
                            text-gray-400
                        "
          >
            Selected partners & collaborations
          </p>

          <span
            className="
                            text-xs
                            uppercase
                            tracking-[0.18em]
                            text-gray-400
                        "
          >
            08 — 2026
          </span>
        </div>
      </div>
    </section>
  );
}
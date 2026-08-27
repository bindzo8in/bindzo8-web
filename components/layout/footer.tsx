"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Logo from "@/public/img/logo.webp";
import LogoSymbol from "@/public/img/logo-symbol.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  "Website Development",
  "Mobile App Development",
  "Custom Software",
  "E-Commerce",
  "UI / UX Design",
  "Branding",
  "SEO",
  "Digital Marketing",
];

const navigation = [
  ["HOME", "/"],
  ["ABOUT", "/about"],
  ["SERVICES", "/services"],
  ["PORTFOLIO", "/portfolio"],
  ["CONTACT", "/contact"],
];

// Two lines, each split into words so we can mask-reveal word by word.
const headline = [
  ["Let's", "build"],
  ["what's", "next."],
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;

      if (!footer) return;

      const mm = gsap.matchMedia();

      /* =========================================================
         DESKTOP
      ========================================================= */

      mm.add("(min-width: 768px)", () => {
        const topContent = footer.querySelector<HTMLElement>(
          ".footer-top-content",
        );

        const words = gsap.utils.toArray<HTMLElement>(".footer-word-inner");

        const description = footer.querySelector<HTMLElement>(
          ".footer-description",
        );

        const ctaButton = footer.querySelector<HTMLElement>(
          ".footer-cta-button",
        );

        const marquee = footer.querySelector<HTMLElement>(
          ".footer-marquee",
        );

        const footerColumns = gsap.utils.toArray<HTMLElement>(
          ".footer-column",
        );

        const bottom = footer.querySelector<HTMLElement>(
          ".footer-bottom",
        );

        const watermark = footer.querySelector<HTMLElement>(
          ".footer-watermark",
        );

        if (
          !topContent ||
          !words.length ||
          !description ||
          !ctaButton ||
          !marquee ||
          !bottom ||
          !watermark
        ) {
          return;
        }

        /* =====================================================
           INITIAL STATE
        ===================================================== */

        gsap.set(topContent, {
          opacity: 0,
          y: 30,
        });

        gsap.set(words, {
          yPercent: 115,
        });

        gsap.set(description, {
          opacity: 0,
          y: 30,
        });

        gsap.set(ctaButton, {
          opacity: 0,
          scale: 0.75,
          rotate: -8,
        });

        gsap.set(marquee, {
          opacity: 0,
          y: 30,
        });

        gsap.set(footerColumns, {
          opacity: 0,
          y: 35,
        });

        gsap.set(bottom, {
          opacity: 0,
          y: 20,
        });

        gsap.set(watermark, {
          opacity: 0,
          scale: 0.85,
          y: 100,
        });

        /* =====================================================
           MAIN REVEAL
        ===================================================== */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(topContent, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });

        tl.to(
          words,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.35",
        );

        tl.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.7",
        );

        tl.to(
          ctaButton,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.55",
        );

        tl.to(
          marquee,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35",
        );

        tl.to(
          footerColumns,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        );

        tl.to(
          bottom,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2",
        );

        tl.to(
          watermark,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.7",
        );

        /* =====================================================
           MAGNETIC CTA BUTTON
        ===================================================== */

        const button = ctaButtonRef.current;

        if (button) {
          const strength = 0.4;

          const xTo = gsap.quickTo(button, "x", {
            duration: 0.6,
            ease: "power3.out",
          });

          const yTo = gsap.quickTo(button, "y", {
            duration: 0.6,
            ease: "power3.out",
          });

          const move = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);

            xTo(relX * strength);
            yTo(relY * strength);

            gsap.to(button, {
              scale: 1.08,
              duration: 0.4,
              ease: "power3.out",
            });
          };

          const leave = () => {
            xTo(0);
            yTo(0);

            gsap.to(button, {
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.4)",
            });
          };

          button.addEventListener("mousemove", move);
          button.addEventListener("mouseleave", leave);

          return () => {
            button.removeEventListener("mousemove", move);
            button.removeEventListener("mouseleave", leave);
          };
        }
      });

      /* =========================================================
         MOBILE
      ========================================================= */

      mm.add("(max-width: 767px)", () => {
        const topContent = footer.querySelector<HTMLElement>(
          ".footer-top-content",
        );

        const words = gsap.utils.toArray<HTMLElement>(".footer-word-inner");

        const description = footer.querySelector<HTMLElement>(
          ".footer-description",
        );

        const ctaButton = footer.querySelector<HTMLElement>(
          ".footer-cta-button",
        );

        const marquee = footer.querySelector<HTMLElement>(
          ".footer-marquee",
        );

        const columns = gsap.utils.toArray<HTMLElement>(
          ".footer-column",
        );

        const bottom = footer.querySelector<HTMLElement>(
          ".footer-bottom",
        );

        const watermark = footer.querySelector<HTMLElement>(
          ".footer-watermark",
        );

        if (
          !topContent ||
          !words.length ||
          !description ||
          !ctaButton ||
          !marquee ||
          !bottom ||
          !watermark
        ) {
          return;
        }

        /* =====================================================
           INITIAL
        ===================================================== */

        gsap.set(
          [
            topContent,
            description,
            ctaButton,
            marquee,
            ...columns,
            bottom,
            watermark,
          ],
          {
            opacity: 0,
            y: 35,
          },
        );

        gsap.set(words, {
          yPercent: 115,
        });

        gsap.set(ctaButton, {
          scale: 0.85,
          rotate: -5,
        });

        gsap.set(watermark, {
          scale: 0.85,
          y: 60,
        });

        /* =====================================================
           MOBILE REVEAL
        ===================================================== */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(topContent, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        tl.to(
          words,
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2",
        );

        tl.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4",
        );

        tl.to(
          ctaButton,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );

        tl.to(
          marquee,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2",
        );

        tl.to(
          columns,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2",
        );

        tl.to(
          bottom,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.2",
        );

        tl.to(
          watermark,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.35",
        );
      });

      /* =========================================================
         CLEANUP
      ========================================================= */

      return () => {
        mm.revert();
      };
    },
    {
      scope: footerRef,
    },
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      {/* =======================================================
          BACKGROUND GLOW
      ======================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/4
          -z-10
          h-[550px]
          w-[550px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[160px]
          md:h-[800px]
          md:w-[800px]
        "
      />

      {/* =======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
          px-6
          py-24
          sm:px-8
          lg:px-16
          lg:py-32
          xl:px-24
        "
      >
        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div
          className="
            footer-top-content
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-6
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                bg-primary
              "
            />

            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/65
                md:text-sm
              "
            >
              Start something meaningful
            </span>
          </div>

          <span
            className="
              hidden
              text-xs
              uppercase
              tracking-[0.2em]
              text-white/50
              sm:block
            "
          >
            Bindzo 8
          </span>
        </div>

        {/* =====================================================
            CTA — BIG KINETIC HEADLINE
        ===================================================== */}

        <div
          className="
            footer-cta
            py-24
            md:py-36
            lg:py-44
          "
        >
          <h2
            className="
              max-w-[90rem]
              font-medium
              leading-[0.85]
              tracking-[-0.08em]
            "
          >
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="flex flex-wrap gap-x-6">
                {line.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="
                      footer-word
                      inline-block
                      overflow-hidden
                      align-top
                      pb-[0.15em]
                      -mb-[0.15em]
                      leading-[0.85]
                    "
                  >
                    <span
                      className={`
                        footer-word-inner
                        inline-block
                        text-[clamp(3.6rem,11vw,10.5rem)]
                        ${
                          lineIndex === 1
                            ? "bg-gradient-to-r from-[#E7325C] to-[#EF8030] bg-clip-text text-transparent"
                            : "text-white"
                        }
                      `}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          {/* CTA ROW */}

          <div
            className="
              mt-14
              flex
              flex-col
              gap-10
              md:mt-20
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <p
              className="
                footer-description
                max-w-2xl
                text-base
                leading-8
                text-white/40
                md:text-xl
              "
            >
              Have an idea, a challenge or a product that needs
              to move forward? Let&apos;s turn it into something
              people remember.
            </p>

            <a
              ref={ctaButtonRef}
              href="/contact"
              className="
                footer-cta-button
                group
                flex
                h-32
                w-32
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                transition-colors
                duration-500
                will-change-transform
                hover:bg-primary
                hover:text-white
                md:h-44
                md:w-44
                lg:h-52
                lg:w-52
              "
            >
              <span
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  leading-tight
                  tracking-[0.15em]
                  md:text-sm
                "
              >
                Start
                <br />
                a project

                <span
                  className="
                    mt-3
                    text-2xl
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    md:text-3xl
                  "
                >
                  ↗
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* =====================================================
            SERVICES MARQUEE
        ===================================================== */}

        <div
          className="
            footer-marquee
            overflow-hidden
            border-y
            border-white/10
            py-7
          "
        >
          <div
            className="
              flex
              w-max
              whitespace-nowrap
              motion-safe:animate-[footer-marquee_28s_linear_infinite]
            "
          >
            {[...services, ...services].map(
              (service, index) => (
                <div
                  key={`${service}-${index}`}
                  className="
                    flex
                    items-center
                    gap-10
                    pr-10
                  "
                >
                  <span
                    className="
                      text-sm
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-white/30
                      md:text-base
                    "
                  >
                    {service}
                  </span>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-primary
                    "
                  />
                </div>
              ),
            )}
          </div>
        </div>

        {/* =====================================================
            FOOTER CONTENT
        ===================================================== */}

        <div
          className="
            grid
            gap-16
            py-20
            md:grid-cols-2
            md:py-24
            lg:grid-cols-4
          "
        >
          {/* BRAND */}

          <div className="footer-column lg:col-span-2">
            <Image
              src={Logo}
              alt="Bindzo 8"
              priority={false}
              className="h-14 w-auto object-contain md:h-20"
            />

            <p
              className="
                mt-8
                max-w-md
                text-base
                leading-8
                text-white/60
                md:text-lg
              "
            >
              Strategy, design, technology and growth —
              connected into one digital experience.
            </p>
          </div>

          {/* NAVIGATION */}

          <div className="footer-column">
            <p
              className="
                mb-7
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/50
              "
            >
              Explore
            </p>

            <nav>
              <ul className="space-y-4">
                {navigation.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="
                        text-base
                        text-white/65
                        transition-colors
                        duration-300
                        hover:text-white
                        md:text-lg
                      "
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* SERVICES */}

          <div className="footer-column">
            <p
              className="
                mb-7
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/50
              "
            >
              Capabilities
            </p>

            <ul className="space-y-4">
              {services.slice(0, 6).map((service) => (
                <li
                  key={service}
                  className="
                    cursor-default
                    text-base
                    text-white/65
                    transition-colors
                    duration-300
                    hover:text-white
                    md:text-lg
                  "
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            footer-bottom
            flex
            flex-col
            gap-5
            border-t
            border-white/10
            pt-7
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/50
              md:text-xs
            "
          >
            © {new Date().getFullYear()} Bindzo8. All rights reserved.
          </span>

          <div className="flex gap-7">
            <a
              href="https://instagram.com/bindzo8"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-white/50
                transition-colors
                hover:text-white
                md:text-xs
              "
            >
              Instagram
            </a>

            <a
              href="https://linkedin.com/company/bindzo8"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-white/50
                transition-colors
                hover:text-white
                md:text-xs
              "
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* =======================================================
          LOGO WATERMARK
      ======================================================= */}

      <div
        aria-hidden="true"
        className="
          footer-watermark
          pointer-events-none
          absolute
          inset-x-0
          bottom-[-6%]
          -z-10
          flex
          w-full
          justify-center
          overflow-hidden
          select-none
        "
      >
        <Image
          src={LogoSymbol}
          alt=""
          priority={false}
          sizes="(max-width: 768px) 45vw, 30vw"
          className="
            h-auto
            w-[45vw]
            max-w-[420px]
            object-contain
            opacity-40
            mix-blend-screen
            md:w-[30vw]
          "
        />
      </div>
    </footer>
  );
}
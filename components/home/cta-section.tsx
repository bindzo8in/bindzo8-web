"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  "Google Ads",
  "Social Media",
  "Video Production",
  "Quality Assurance",
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      const eyebrow = section.querySelector<HTMLElement>(".cta-eyebrow");

      const headingLines = gsap.utils.toArray<HTMLElement>(
        ".cta-heading-text",
      );

      const description =
        section.querySelector<HTMLElement>(".cta-description");

      const button = section.querySelector<HTMLElement>(".cta-button");

      const buttonArrow =
        section.querySelector<HTMLElement>(".cta-button-arrow");

      const serviceItems = gsap.utils.toArray<HTMLElement>(".cta-service");

      const footer = section.querySelector<HTMLElement>(".cta-footer");

      const orb = section.querySelector<HTMLElement>(".cta-orb");

      /*
       * =========================================================
       * REDUCED MOTION
       * =========================================================
       */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            eyebrow,
            ...headingLines,
            description,
            button,
            ...serviceItems,
            footer,
            orb,
          ],
          {
            clearProps: "all",
          },
        );
      });

      /*
       * =========================================================
       * NORMAL MOTION
       * =========================================================
       */

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * -------------------------------------------------------
         * INITIAL STATES
         * -------------------------------------------------------
         */

        if (eyebrow) {
          gsap.set(eyebrow, {
            y: 25,
            opacity: 0,
          });
        }

        /*
         * IMPORTANT
         *
         * The wrapper handles overflow.
         * The actual text moves inside it.
         *
         * This prevents the glyphs from getting clipped.
         */

        gsap.set(headingLines, {
          yPercent: 115,
          opacity: 0,
          willChange: "transform, opacity",
        });

        if (description) {
          gsap.set(description, {
            y: 30,
            opacity: 0,
          });
        }

        if (button) {
          gsap.set(button, {
            y: 35,
            opacity: 0,
            scale: 0.88,
          });
        }

        gsap.set(serviceItems, {
          y: 35,
          opacity: 0,
        });

        if (footer) {
          gsap.set(footer, {
            y: 20,
            opacity: 0,
          });
        }

        if (orb) {
          gsap.set(orb, {
            scale: 0.55,
            opacity: 0,
          });
        }

        /*
         * =======================================================
         * MAIN SCROLL TIMELINE
         * =======================================================
         */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 25%",
            scrub: 1.15,
          },
        });

        /*
         * -------------------------------------------------------
         * EYEBROW
         * -------------------------------------------------------
         */

        if (eyebrow) {
          tl.to(eyebrow, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          });
        }

        /*
         * -------------------------------------------------------
         * GIANT HEADING
         * -------------------------------------------------------
         */

        tl.to(
          headingLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.16,
            ease: "power4.out",
          },
          "-=0.08",
        );

        /*
         * -------------------------------------------------------
         * DESCRIPTION
         * -------------------------------------------------------
         */

        if (description) {
          tl.to(
            description,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4",
          );
        }

        /*
         * -------------------------------------------------------
         * CTA BUTTON
         * -------------------------------------------------------
         */

        if (button) {
          tl.to(
            button,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.5)",
            },
            "-=0.3",
          );
        }

        /*
         * -------------------------------------------------------
         * SERVICES
         * -------------------------------------------------------
         */

        tl.to(
          serviceItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.055,
            ease: "power3.out",
          },
          "-=0.4",
        );

        /*
         * -------------------------------------------------------
         * FOOTER
         * -------------------------------------------------------
         */

        if (footer) {
          tl.to(
            footer,
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            "-=0.3",
          );
        }

        /*
         * -------------------------------------------------------
         * ORB
         * -------------------------------------------------------
         */

        if (orb) {
          tl.to(
            orb,
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=1",
          );
        }

        /*
         * =======================================================
         * DESKTOP PARALLAX
         * =======================================================
         */

        mm.add("(min-width: 768px)", () => {
          if (orb) {
            gsap.to(orb, {
              x: 130,
              y: -90,
              scale: 1.2,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            });
          }

          serviceItems.forEach((item, index) => {
            gsap.to(item, {
              y: index % 2 === 0 ? -28 : 28,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
        });

        /*
         * =======================================================
         * BUTTON HOVER
         * =======================================================
         */

        if (button && buttonArrow) {
          const handleEnter = () => {
            gsap.killTweensOf([button, buttonArrow]);

            gsap.to(button, {
              scale: 1.06,
              duration: 0.45,
              ease: "power3.out",
            });

            gsap.to(buttonArrow, {
              x: 7,
              y: -7,
              rotate: 5,
              duration: 0.45,
              ease: "power3.out",
            });
          };

          const handleLeave = () => {
            gsap.killTweensOf([button, buttonArrow]);

            gsap.to(button, {
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            });

            gsap.to(buttonArrow, {
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.45,
              ease: "power3.out",
            });
          };

          button.addEventListener("mouseenter", handleEnter);
          button.addEventListener("mouseleave", handleLeave);

          return () => {
            button.removeEventListener("mouseenter", handleEnter);
            button.removeEventListener("mouseleave", handleLeave);
          };
        }
      });

      /*
       * =========================================================
       * REFRESH
       * =========================================================
       */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="home-cta"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =======================================================
          AMBIENT GLOW
      ======================================================= */}

      <div
        className="
          cta-orb
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/20
          blur-[130px]

          md:h-[600px]
          md:w-[600px]

          lg:h-[800px]
          lg:w-[800px]
        "
      />

      {/* =======================================================
          MAIN
      ======================================================= */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          flex-col
          justify-center
          px-6
          py-28

          md:px-8
          md:py-32

          lg:px-16
          lg:py-40

          xl:px-32
        "
      >
        {/* =====================================================
            EYEBROW
        ===================================================== */}

        <div
          className="
            cta-eyebrow
            mb-10
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/50
              "
            >
              Let&apos;s create what&apos;s next
            </span>
          </div>

          <span
            className="
              hidden
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-white/25
              md:block
            "
          >
            Bindzo 8
          </span>
        </div>

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div
          className="
            relative
            w-full
          "
        >
          <h2
            className="
              w-full
              overflow-visible
              text-[clamp(3.5rem,10vw,9.5rem)]
              font-medium
              leading-[0.9]
              tracking-[-0.075em]
            "
          >
            {/* LINE 1 */}

            <span
              className="
                block
                overflow-visible
                py-[0.08em]
              "
            >
              <span
                className="
                  cta-heading-text
                  block
                  will-change-transform
                "
              >
                Your next
              </span>
            </span>

            {/* LINE 2 */}

            <span
              className="
                block
                overflow-visible
                py-[0.08em]
              "
            >
              <span
                className="
                  cta-heading-text
                  block
                  text-white/30
                  will-change-transform
                "
              >
                big move.
              </span>
            </span>
          </h2>
        </div>

        {/* =====================================================
            DESCRIPTION + CTA
        ===================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-12

            md:mt-16

            lg:mt-20
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* DESCRIPTION */}

          <p
            className="
              cta-description
              max-w-2xl
              text-base
              leading-[1.75]
              text-white/50

              md:text-lg
            "
          >
            Whether you&apos;re launching a new product, building a digital
            platform or looking to grow your brand online — we bring
            technology, design and marketing together to make it happen.
          </p>

          {/* CTA BUTTON */}

          <a
            href="/contact"
            className="
              cta-button
              group
              relative
              flex
              h-28
              w-28
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-white
              text-black

              transition-colors
              duration-500

              hover:bg-primary
              hover:text-white

              md:h-36
              md:w-36

              lg:h-44
              lg:w-44
            "
          >
            {/* INNER RING */}

            <span
              className="
                pointer-events-none
                absolute
                inset-2
                rounded-full
                border
                border-black/10
                transition-all
                duration-500

                group-hover:inset-3
                group-hover:border-white/20
              "
            />

            <span
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  leading-tight
                  tracking-[0.15em]

                  md:text-xs
                "
              >
                Start
                <br />
                a project
              </span>

              <span
                className="
                  cta-button-arrow
                  mt-2
                  text-xl
                  leading-none
                  will-change-transform
                "
              >
                ↗
              </span>
            </span>
          </a>
        </div>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <div
          className="
            mt-20
            grid
            grid-cols-2
            border-y
            border-white/10

            md:grid-cols-3

            lg:mt-28
            lg:grid-cols-4
          "
        >
          {services.map((service, index) => (
            <div
              key={service}
              className="
                cta-service
                flex
                min-h-20
                items-center
                gap-3
                border-b
                border-white/10
                px-3
                py-4
                will-change-transform

                md:min-h-24
                md:px-5

                lg:border-r
                lg:px-6

                lg:[&:nth-child(4n)]:border-r-0
                lg:[&:nth-child(n+9)]:border-b-0
              "
            >
              <span
                className="
                  shrink-0
                  text-[9px]
                  tracking-[0.15em]
                  text-white/20
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  leading-tight
                  tracking-[0.13em]
                  text-white/50

                  md:text-xs
                "
              >
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div
          className="
            cta-footer
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25

              md:text-[9px]
            "
          >
            Strategy · Design · Development · Growth
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25

              md:text-[9px]
            "
          >
            2026
          </span>
        </div>
      </div>
    </section>
  );
}
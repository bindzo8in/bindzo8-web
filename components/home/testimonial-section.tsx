"use client";

import { Fragment, use, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PrismaPromise } from "@/app/generated/prisma";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    quote:
      "They understood our vision, challenged our thinking and turned a complicated idea into a digital product that feels remarkably simple.",
    name: "Arun Kumar",
    role: "Founder & CEO",
    company: "Technology Company",
  },
  {
    quote:
      "What impressed us most was the thinking behind the work. Every design decision had a purpose and the final result genuinely moved the business forward.",
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "Growth Brand",
  },
  {
    quote:
      "From strategy to launch, the team brought clarity to every stage of the project. We ended up with something far better than what we initially imagined.",
    name: "Rahul Mehta",
    role: "Co-Founder",
    company: "Digital Platform",
  },
  {
    quote:
      "We were looking for more than an agency. We needed a team that could think about technology, design and growth as one connected experience.",
    name: "Karthik Raj",
    role: "Managing Director",
    company: "Enterprise Solutions",
  },
  {
    quote:
      "They don't simply execute a brief. They ask the right questions, find better solutions and care deeply about the final experience.",
    name: "Naveen Kumar",
    role: "Product Head",
    company: "SaaS Company",
  },
];

/* =========================================================
   WORD REVEAL — quote text
========================================================= */

function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="testimonial-word inline-block will-change-transform">
            {word}
          </span>
          {index < words.length - 1 && "\u00A0"}
        </Fragment>
      ))}
    </span>
  );
}

/* =========================================================
   HEADING REVEAL — masked word-by-word, last word gradient
========================================================= */

function HeadingReveal({
  text,
  wordClassName = "",
}: {
  text: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <Fragment key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]">
              <span
                className={`inline-block ${wordClassName} ${
                  isLast
                    ? "bg-gradient-to-r from-[#E7325C] to-[#EF8030] bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </span>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TestimonialSection({
  testimonials,
}: {
  testimonials: 
    {
      content: string;
      position: string | null;
      id: string;
      author: string;
    }[]
  ;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsData = testimonials;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* =====================================================
         HEADING REVEAL
      ===================================================== */

      const headingWords = section.querySelectorAll<HTMLElement>(
        ".testimonial-heading-word",
      );
      const headingLabel = section.querySelector<HTMLElement>(
        ".testimonial-heading-label",
      );

      if (headingWords.length) {
        gsap.set(headingWords, { yPercent: 115, opacity: 0 });
        if (headingLabel) gsap.set(headingLabel, { y: 20, opacity: 0 });

        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (headingLabel) {
          headingTl.to(headingLabel, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }

        headingTl.to(
          headingWords,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          headingLabel ? "-=0.2" : 0,
        );
      }

      /* =====================================================
         TESTIMONIAL CARDS — each reveals on scroll
      ===================================================== */

      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

      cards.forEach((card) => {
        const words = card.querySelectorAll<HTMLElement>(".testimonial-word");
        const person = card.querySelector<HTMLElement>(".testimonial-person");
        const meta = card.querySelector<HTMLElement>(".testimonial-meta");
        const number = card.querySelector<HTMLElement>(".testimonial-number");
        const line = card.querySelector<HTMLElement>(".testimonial-line");

        gsap.set(words, { y: 28, opacity: 0, filter: "blur(5px)" });
        if (person) gsap.set(person, { y: 20, opacity: 0 });
        if (meta) gsap.set(meta, { opacity: 0 });
        if (number) gsap.set(number, { y: 16, opacity: 0 });
        if (line)
          gsap.set(line, { scaleX: 0, opacity: 0, transformOrigin: "left" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        if (line) {
          tl.to(line, {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (number) {
          tl.to(
            number,
            { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
            line ? "-=0.5" : 0,
          );
        }

        tl.to(
          words,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: 0.022,
            ease: "power4.out",
          },
          "-=0.25",
        );

        if (person) {
          tl.to(
            person,
            { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
            "-=0.3",
          );
        }

        if (meta) {
          tl.to(
            meta,
            { opacity: 1, duration: 0.3, ease: "power3.out" },
            "-=0.25",
          );
        }
      });

      return () => {};
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home-testimonials"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-6
          pt-24
          md:px-8
          md:pt-32
          lg:px-16
          lg:pt-40
          xl:px-32
        "
      >
        <div className="border-b border-white/10 pb-8">
          {/* Meta bar */}
          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span
                className="
                  testimonial-heading-label
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-white/50
                "
              >
                Client Stories
              </span>
            </div>
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              {String(testimonialsData.length).padStart(2, "0")} Voices
            </span>
          </div>

          {/* Big heading */}
          <h2
            className="
              max-w-5xl
              text-[clamp(4rem,8vw,8rem)]
              font-medium
              leading-[0.84]
              tracking-[-0.065em]
            "
          >
            <HeadingReveal
              text="Voices behind the work."
              wordClassName="testimonial-heading-word"
            />
          </h2>
        </div>
      </div>

      {/* =====================================================
          TESTIMONIALS — stacked, each reveals on scroll
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-6
          pb-24
          md:px-8
          md:pb-32
          lg:px-16
          lg:pb-40
          xl:px-32
        "
      >
        {testimonialsData.map((testimonial, index) => (
          <article
            key={testimonial.author}
            className="testimonial-card border-b border-white/10 py-14 md:py-20 lg:py-24"
          >
            {/* Top line reveal */}
            <div className="testimonial-line mb-10 h-px w-16 bg-primary" />

            <div
              className="
                grid
                grid-cols-1
                gap-8
                lg:grid-cols-[3rem_1fr]
                lg:gap-16
              "
            >
              {/* Index number */}
              <span
                className="
                  testimonial-number
                  pt-1
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-white/20
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-10 lg:gap-14">
                {/* Quote */}
                <blockquote
                  className="
                    text-xl
                    font-medium
                    leading-[1.4]
                    tracking-[-0.02em]
                    text-white
                    sm:text-2xl
                    md:text-3xl
                    lg:text-4xl
                  "
                >
                  <WordReveal text={`"${testimonial.content}"`} />
                </blockquote>

                {/* Person */}
                <div className="testimonial-person flex items-center gap-5">
                  {/* Accent dot */}
                  <span className="h-8 w-px bg-primary/60 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {testimonial.author}
                    </p>
                    <p className="testimonial-meta mt-1 text-xs text-white/40">
                      {testimonial.position}
                      {testimonial.position && ` — ${testimonial.position}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

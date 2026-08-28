"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Fraunces, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
});

type Category =
  | "all"
  | "website"
  | "app"
  | "software"
  | "branding"
  | "marketing"
  | "video";

type WorkItem = {
  id: number;
  category: Exclude<Category, "all">;
  size: "c4" | "c2" | "c3" | "c6";
  image?: string;
  video?: string;
  poster?: string;
  alt: string;
  cat: string;
  title: string;
  year: string;
};

const works: WorkItem[] = [
  {
    id: 8,
    category: "video",
    size: "c6",
    video: "/video/yassh-mockup.mp4",
    alt: "Yash Organics",
    cat: "Video Editing",
    title: "Yash Organics",
    year: "2025",
  },
  {
    id: 1,
    category: "website",
    size: "c4",
    image: "https://picsum.photos/seed/anndoctor-store/1200/820",
    alt: "Ann Doctor",
    cat: "Website · E-Commerce",
    title: "Ann Doctor",
    year: "2025",
  },
  {
    id: 2,
    category: "app",
    size: "c2",
    // image: "https://picsum.photos/seed/attendance-app/700/900",
    video: "/video/attendance-app.mp4",
    alt: "Attendance app",
    cat: "Mobile App",
    title: "Attendance App",
    year: "2025",
  },
  {
    id: 3,
    category: "branding",
    size: "c2",
    image: "https://picsum.photos/seed/hospitality-rebrand/700/900",
    alt: "Hospitality rebrand",
    cat: "Branding · Identity",
    title: "Bayleaf Hotels",
    year: "2024",
  },
  {
    id: 4,
    category: "software",
    size: "c4",
    image: "https://picsum.photos/seed/crmplatform/1200/820",
    alt: "CRM Platform",
    cat: "Software & CRM",
    title: "CRM Platform",
    year: "2025",
  },
  {
    id: 5,
    category: "marketing",
    size: "c3",
    image: "https://picsum.photos/seed/fmcg-campaign/900/700",
    alt: "Marketing campaign",
    cat: "Digital Marketing",
    title: "Launch Campaign",
    year: "2024",
  },
  {
    id: 6,
    category: "website",
    size: "c3",
    image: "https://picsum.photos/seed/studiosite-agency/900/700",
    alt: "Studio site",
    cat: "Website · Studio Site",
    title: "Studio Site",
    year: "2024",
  },
  {
    id: 7,
    category: "video",
    size: "c6",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/showreel-bindzo8/1600/700",
    alt: "2025 Showreel",
    cat: "Video Editing · Showreel",
    title: "2025 Showreel",
    year: "Promo & Motion",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All Work", value: "all" },
  { label: "Website", value: "website" },
  { label: "Mobile App", value: "app" },
  { label: "Software & CRM", value: "software" },
  { label: "Branding", value: "branding" },
  { label: "Marketing", value: "marketing" },
  { label: "Video Editing", value: "video" },
];

const marqueeItems = [
  "Website Development",
  "Mobile App Development",
  "Software & CRM",
  "Branding & Design",
  "Digital Marketing",
  "Video Editing",
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const visibleWorks = useMemo(() => {
    if (activeFilter === "all") return works;

    return works.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const isFinePointer = window.matchMedia(
        "(pointer: fine)",
      ).matches;

      /*
       * --------------------------------
       * Hero ink wipe
       * --------------------------------
       */

      const fills = gsap.utils.toArray<HTMLElement>(".hero-fill");

      if (reduceMotion) {
        gsap.set(fills, {
          clipPath: "inset(0 0% 0 0)",
        });
      } else {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".featured-hero",
              start: "top 90%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          })
          .fromTo(
            fills[0],
            {
              clipPath: "inset(0 100% 0 0)",
            },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
            },
          )
          .fromTo(
            fills[1],
            {
              clipPath: "inset(0 0 0 100%)",
            },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: "none",
            },
            0.15,
          );
      }

      /*
       * --------------------------------
       * Marquee
       * --------------------------------
       */

      if (!reduceMotion && marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }

      /*
       * --------------------------------
       * Grid entrance
       * --------------------------------
       */

      const tiles = gsap.utils.toArray<HTMLElement>(".work-tile");

      if (reduceMotion) {
        gsap.set(tiles, {
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.set(tiles, {
          opacity: 0,
          y: 36,
        });

        ScrollTrigger.batch(tiles, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
        });
      }

      /*
       * --------------------------------
       * Custom cursor
       * --------------------------------
       */

      if (
        !reduceMotion &&
        isFinePointer &&
        cursor &&
        cursorText
      ) {
        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.35,
          ease: "power3",
        });

        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.35,
          ease: "power3",
        });

        const moveCursor = (event: MouseEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        const activateCursor = () => {
          cursor.classList.add("cursor-active");
        };

        const deactivateCursor = () => {
          cursor.classList.remove("cursor-active");
          cursorText.textContent = "View";
        };

        const selectCursor = () => {
          cursorText.textContent = "Select";
          cursor.classList.add("cursor-active");
        };

        window.addEventListener("mousemove", moveCursor);

        const medias = gsap.utils.toArray<HTMLElement>(
          ".work-media",
        );

        medias.forEach((media) => {
          media.addEventListener("mouseenter", activateCursor);
          media.addEventListener("mouseleave", deactivateCursor);
        });

        const filterButtons = gsap.utils.toArray<HTMLElement>(
          ".filter-button",
        );

        filterButtons.forEach((button) => {
          button.addEventListener("mouseenter", selectCursor);
          button.addEventListener("mouseleave", deactivateCursor);
        });

        return () => {
          window.removeEventListener("mousemove", moveCursor);

          medias.forEach((media) => {
            media.removeEventListener(
              "mouseenter",
              activateCursor,
            );

            media.removeEventListener(
              "mouseleave",
              deactivateCursor,
            );
          });

          filterButtons.forEach((button) => {
            button.removeEventListener(
              "mouseenter",
              selectCursor,
            );

            button.removeEventListener(
              "mouseleave",
              deactivateCursor,
            );
          });
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /*
   * --------------------------------
   * Filtering animation
   * --------------------------------
   */

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    requestAnimationFrame(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(
        ".work-tile",
      );

      tiles.forEach((tile) => {
        const category = tile.dataset.category;
        const matches =
          activeFilter === "all" ||
          category === activeFilter;

        if (matches) {
          gsap.fromTo(
            tile,
            {
              opacity: 0,
              y: 16,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        }
      });

      ScrollTrigger.refresh();
    });
  }, [activeFilter]);

  const handleFilter = (filter: Category) => {
    setActiveFilter(filter);
  };

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${spaceGrotesk.variable} relative min-h-screen overflow-hidden bg-[#0b0b0c] text-[#f2efe9]`}
    >
      {/* Grain */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[50]
          opacity-[0.045]
          mix-blend-overlay
        "
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E")
          `,
        }}
      />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[100]
          hidden
          h-[14px]
          w-[14px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#f2efe9]
          mix-blend-difference
          transition-[width,height]
          duration-300
          ease-out
          lg:flex
          [.cursor-active]:h-[84px]
          [.cursor-active]:w-[84px]
        "
      >
        <span
          ref={cursorTextRef}
          className="
            text-[11px]
            uppercase
            tracking-[0.06em]
            text-[#0c0c0d]
            opacity-0
            transition-opacity
            duration-200
            [.cursor-active_&]:opacity-100
          "
        >
          View
        </span>
      </div>

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1560px]
          px-5
          pb-[clamp(90px,11vw,150px)]
          sm:px-8
          lg:px-[clamp(40px,6vw,72px)]
        "
      >
        {/* =========================
            HERO
        ========================== */}

        <div
          className="
            featured-hero
            py-[clamp(70px,11vw,120px)]
            pb-[clamp(24px,4vw,44px)]
          "
        >
          {/* Eyebrow */}
          <p
            className="
              mb-[22px]
              flex
              flex-wrap
              items-center
              gap-2.5
              font-[var(--font-space-grotesk)]
              text-[12px]
              uppercase
              tracking-[0.26em]
              text-[#8b8985]
            "
          >
            <span>Website</span>
            <span className="opacity-40">·</span>

            <span>Mobile App</span>
            <span className="opacity-40">·</span>

            <span>Software &amp; CRM</span>
            <span className="opacity-40">·</span>

            <span>Branding</span>
            <span className="opacity-40">·</span>

            <span>Digital Marketing</span>
            <span className="opacity-40">·</span>

            <span>Video Editing</span>
          </p>

          {/* Selected */}
          <div
            className="
              relative
              overflow-hidden
              leading-[0.92]
            "
          >
            <span
              className="
                block
                whitespace-nowrap
                font-[var(--font-fraunces)]
                text-[clamp(56px,13vw,210px)]
                font-semibold
                italic
                tracking-[-0.02em]
                text-transparent
                [-webkit-text-stroke:1.4px_rgba(242,239,233,0.35)]
              "
            >
              Selected
            </span>

            <span
              aria-hidden="true"
              className="
                hero-fill
                absolute
                left-0
                top-0
                block
                whitespace-nowrap
                bg-gradient-to-br
                from-[#E7325C]
                to-[#EF8030]
                bg-clip-text
                font-[var(--font-fraunces)]
                text-[clamp(56px,13vw,210px)]
                font-semibold
                italic
                tracking-[-0.02em]
                text-transparent
                [clip-path:inset(0_100%_0_0)]
              "
            >
              Selected
            </span>
          </div>

          {/* Work */}
          <div
            className="
              relative
              overflow-hidden
              text-right
              leading-[0.92]
            "
          >
            <span
              className="
                block
                whitespace-nowrap
                font-[var(--font-fraunces)]
                text-[clamp(56px,13vw,210px)]
                font-semibold
                italic
                tracking-[-0.02em]
                text-transparent
                [-webkit-text-stroke:1.4px_rgba(242,239,233,0.35)]
              "
            >
              Work.
            </span>

            <span
              aria-hidden="true"
              className="
                hero-fill
                absolute
                right-0
                top-0
                block
                whitespace-nowrap
                bg-gradient-to-br
                from-[#E7325C]
                to-[#EF8030]
                bg-clip-text
                font-[var(--font-fraunces)]
                text-[clamp(56px,13vw,210px)]
                font-semibold
                italic
                tracking-[-0.02em]
                text-transparent
                [clip-path:inset(0_0_0_100%)]
              "
            >
              Work.
            </span>
          </div>

          {/* Description */}
          <p
            className="
              ml-auto
              mt-[clamp(22px,3vw,32px)]
              max-w-[600px]
              text-right
              font-[var(--font-space-grotesk)]
              text-[15px]
              leading-[1.6]
              text-[#8b8985]
            "
          >
            Across screens, systems, and brands — a few builds
            that show how we think, end to end.
          </p>
        </div>

        {/* =========================
            MARQUEE
        ========================== */}

        <div
          className="
            my-[clamp(40px,5vw,64px)]
            overflow-hidden
            border-y
            border-[rgba(242,239,233,0.13)]
            py-[15px]
          "
        >
          <div
            ref={marqueeRef}
            className="flex w-max whitespace-nowrap"
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0"
              >
                {marqueeItems.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="
                      px-5
                      font-[var(--font-space-grotesk)]
                      text-[clamp(13px,1.8vw,19px)]
                      uppercase
                      tracking-[0.05em]
                      text-[#8b8985]
                    "
                  >
                    {item}

                    <span className="ml-5 text-[#EF8030]">
                      •
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            FILTER
        ========================== */}

        <div
          className="
            mb-[clamp(30px,4vw,46px)]
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              gap-[clamp(18px,2.4vw,32px)]
            "
          >
            {filters.map((filter) => {
              const active =
                activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() =>
                    handleFilter(filter.value)
                  }
                  className={`
                    filter-button
                    group
                    relative
                    cursor-pointer
                    border-0
                    bg-transparent
                    pb-2
                    font-[var(--font-space-grotesk)]
                    text-[clamp(14px,1.6vw,17px)]
                    tracking-[0.01em]
                    transition-colors
                    duration-300
                    ${
                      active
                        ? "text-[#f2efe9]"
                        : "text-[#8b8985]"
                    }
                  `}
                >
                  {filter.label}

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-gradient-to-r
                      from-[#E7325C]
                      to-[#EF8030]
                      transition-transform
                      duration-400
                      origin-left
                      ${
                        active
                          ? "w-full scale-x-100"
                          : "w-full scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          <span
            className="
              whitespace-nowrap
              font-[var(--font-space-grotesk)]
              text-[13px]
              tracking-[0.08em]
              text-[#8b8985]
            "
          >
            ( {String(visibleWorks.length).padStart(2, "0")} )
          </span>
        </div>

        {/* =========================
            BENTO GRID
        ========================== */}

        <div
          className="
            grid
            grid-cols-6
            gap-[clamp(14px,1.6vw,22px)]
          "
        >
          {visibleWorks.map((item) => (
            <article
              key={item.id}
              data-category={item.category}
              className={`
                work-tile
                relative
                col-span-6
                ${
                  item.size === "c4"
                    ? "lg:col-span-4"
                    : ""
                }
                ${
                  item.size === "c2"
                    ? "lg:col-span-2"
                    : ""
                }
                ${
                  item.size === "c3"
                    ? "lg:col-span-3"
                    : ""
                }
                ${
                  item.size === "c6"
                    ? "lg:col-span-6"
                    : ""
                }
              `}
            >
              <div
                className={`
                  work-media
                  group
                  relative
                  cursor-pointer
                  overflow-hidden
                  rounded-lg
                  border
                  border-[rgba(242,239,233,0.13)]
                  bg-[#161616]
                  ${
                    item.size === "c6"
                      ? "aspect-[4/5] lg:aspect-[21/9]"
                      : item.size === "c2"
                        ? "aspect-[4/5]"
                        : item.size === "c3"
                          ? "aspect-[4/5] lg:aspect-[16/12]"
                          : "aspect-[16/11]"
                  }
                `}
              >
                {/* Number */}
                <span
                  className="
                    absolute
                    left-4
                    top-3.5
                    z-20
                    font-[var(--font-space-grotesk)]
                    text-[12px]
                    tracking-[0.05em]
                    text-[#8b8985]
                  "
                >
                  {String(item.id).padStart(2, "0")}
                </span>

                {/* Image */}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1024px) 100vw,
                      50vw
                    "
                    className="
                      object-cover
                      grayscale
                      contrast-[1.03]
                      scale-[1.12]
                      transition-all
                      duration-700
                      ease-[cubic-bezier(.16,1,.3,1)]
                      group-hover:scale-100
                      group-hover:grayscale-0
                    "
                  />
                )}

                {/* Video */}
                {item.video && (
                  <>
                    <video
                      src={item.video}
                      poster={item.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                      }}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        grayscale
                        contrast-[1.03]
                        scale-[1.12]
                        transition-all
                        duration-700
                        ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover:scale-100
                        group-hover:grayscale-0
                      "
                    />

                    {/* Play button */}
                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        z-20
                        flex
                        h-16
                        w-16
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgba(11,11,12,0.55)]
                        backdrop-blur-md
                        transition-all
                        duration-400
                        group-hover:scale-[1.12]
                        group-hover:bg-gradient-to-br
                        group-hover:from-[#E7325C]
                        group-hover:to-[#EF8030]
                      "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-[18px] w-[18px] fill-[#f2efe9]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                )}

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    z-10
                    flex
                    flex-col
                    justify-end
                    bg-gradient-to-t
                    from-[rgba(11,11,12,0.82)]
                    via-[rgba(11,11,12,0.05)]
                    to-transparent
                    p-[clamp(16px,2vw,26px)]
                  "
                >
                  {/* Category */}
                  <p
                    className="
                      mb-2
                      translate-y-2
                      font-[var(--font-space-grotesk)]
                      text-[11px]
                      uppercase
                      tracking-[0.1em]
                      text-[#EF8030]
                      opacity-0
                      transition-all
                      duration-400
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    {item.cat}
                  </p>

                  {/* Title */}
                  <h3
                    className="
                      m-0
                      font-[var(--font-fraunces)]
                      text-[clamp(22px,2.4vw,34px)]
                      font-medium
                      leading-[1.05]
                      text-[#f2efe9]
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Year */}
                  <p
                    className="
                      mt-2
                      translate-y-2
                      font-[var(--font-space-grotesk)]
                      text-[12px]
                      tracking-[0.06em]
                      text-[#8b8985]
                      opacity-0
                      transition-all
                      delay-50
                      duration-400
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    {item.year}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
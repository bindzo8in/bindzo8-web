"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./hero-section";

gsap.registerPlugin(ScrollTrigger);

export default function WebDevPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
        const inner = panel.querySelectorAll(".parallax-item");

        gsap.set(inner, {
          opacity: 1,
          clearProps: "opacity",
          willChange: "transform",
        });

        gsap.fromTo(
          inner,
          { x: 60 },
          {
            x: -60,
            stagger: 0.04,
            ease: "none",
            overwrite: "auto",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "right center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden font-kumbh ">
      <HeroSection />

      <section className="min-h-[320px] grid place-items-center px-6 sm:px-10 z-99 relative bg-black">
        <p className="max-w-5xl text-center text-[clamp(1.15rem,2vw,2rem)] leading-relaxed">
          Your website is often the first impression your customers have of your brand.
          We build fast, beautiful, and conversion-focused websites that work for your business.
        </p>
      </section>

      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden z-50 bg-black/40"
      >
        <div ref={trackRef} className="flex min-h-screen w-max">
          <Slide>
            <UseCasesSlide />
          </Slide>

          <Slide>
            <ProcessSlide />
          </Slide>

          <Slide>
            <BenefitsSlide />
          </Slide>

          <Slide>
            <ServicesSlide />
          </Slide>

          <Slide>
            <TechSlide />
          </Slide>
        </div>
      </section>
    </main>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <section className="panel w-screen min-h-screen shrink-0 overflow-hidden">
      <div className="w-full min-h-screen px-6 sm:px-10 lg:px-14 xl:px-20 flex items-center">
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}

/* ---------------- USE CASES ---------------- */

function UseCasesSlide() {
  return (
    <section className="relative h-full w-full">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_1fr_1.15fr] gap-10 lg:gap-14 items-center">
        <ListBlock
          title="Usage / Use Cases"
          items={[
            "Business portfolio websites",
            "E-commerce & online stores",
            "Landing pages & lead generation",
            "Corporate & enterprise sites",
            "Blogs & content platforms",
            "Booking & appointment systems",
            "Membership & community portals",
          ]}
        />

        <ListBlock
          title="Technologies Used"
          items={[
            "React / Next.js",
            "WordPress & WooCommerce",
            "Shopify & Headless CMS",
            "Tailwind CSS / GSAP",
            "Node.js & REST APIs",
            "PostgreSQL / MongoDB",
            "Vercel / AWS / Cloudflare",
          ]}
        />

        <div className="relative h-[340px] sm:h-[420px] lg:h-[620px] xl:h-[700px] parallax-item">
          <div className="absolute left-[4%] top-[44%] -translate-y-1/2 z-20">
            <h2 className="text-orange-500 font-bold leading-[0.92] tracking-tight text-[clamp(2.8rem,4.2vw,5.8rem)]">
              360° Web
              <br />
              Development
            </h2>
          </div>

          <div className="absolute right-[-2%] top-[6%] z-10 w-[clamp(240px,26vw,560px)] aspect-square">
            <Image
              src="/home/services/web_&_cms.png"
              alt="Web Development"
              fill
              priority
              className="object-contain object-right-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */

function ProcessSlide() {
  const cols = [
    {
      title: "1. Discovery & Planning",
      items: [
        "Understand business goals & audience",
        "Competitor & market analysis",
        "Define sitemap & page structure",
        "Choose the right tech stack",
      ],
    },
    {
      title: "3. Development",
      items: [
        "Front-end coding (React / Next.js)",
        "Back-end APIs & database setup",
        "CMS integration (WordPress / Headless)",
        "Responsive & cross-browser implementation",
      ],
    },
    {
      title: "5. Launch",
      items: [
        "Domain setup & DNS configuration",
        "Deploy to production server",
        "Final QA & stakeholder sign-off",
      ],
    },
    {
      title: "2. UI/UX Design",
      items: [
        "Wireframes & low-fi mockups",
        "High-fidelity designs in Figma",
        "Brand-aligned color & typography",
        "Prototype & client approval",
      ],
    },
    {
      title: "4. Testing & QA",
      items: [
        "Cross-device responsiveness checks",
        "Page speed & Core Web Vitals",
        "Accessibility audit (WCAG)",
        "Forms, payments & API testing",
      ],
    },
    {
      title: "6. Maintenance",
      items: [
        "Ongoing performance monitoring",
        "Regular security patches",
        "Feature updates & content edits",
      ],
    },
  ];

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="grid h-full max-w-full content-center items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center">
        {cols.map((col) => (
          <div
            key={col.title}
            className="parallax-item border border-white/15 rounded-3xl p-6"
          >
            <h3 className="text-orange-500 font-semibold text-[clamp(1.35rem,2vw,2rem)] mb-6">
              {col.title}
            </h3>

            <ul className="space-y-4 text-white/90 text-[clamp(1rem,1vw,1.15rem)]">
              {col.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-white/55">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */

function BenefitsSlide() {
  const data = [
    {
      id: 0,
      tab: "Performance",
      title: "Blazing Performance",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="32" cy="32" r="28" stroke="#F58B2D" strokeWidth="2" opacity="0.3"/>
          <path d="M20 44L32 20L38 34L44 28" stroke="#F58B2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="44" cy="28" r="3" fill="#F58B2D"/>
        </svg>
      ),
      points: [
        "We build with Next.js & edge caching to achieve sub-second load times on every device.",
        "Optimised images, lazy loading, and code-splitting ensure your site scores 90+ on Lighthouse.",
        "Fast-loading pages reduce bounce rates and directly improve conversion rates.",
      ],
    },
    {
      id: 1,
      tab: "SEO-Ready",
      title: "SEO-Ready by Default",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="28" cy="28" r="16" stroke="#F58B2D" strokeWidth="2"/>
          <path d="M39 39L50 50" stroke="#F58B2D" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 28h12M28 22v12" stroke="#F58B2D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      points: [
        "Every page is server-side rendered with clean semantic HTML, proper meta tags, and structured data.",
        "We implement technical SEO from day one — sitemaps, canonical tags, and Open Graph.",
        "Our sites are built to rank, not just look good.",
      ],
    },
    {
      id: 2,
      tab: "Mobile-First",
      title: "Mobile-First Design",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <rect x="22" y="10" width="20" height="36" rx="4" stroke="#F58B2D" strokeWidth="2"/>
          <path d="M28 42h8" stroke="#F58B2D" strokeWidth="2" strokeLinecap="round"/>
          <rect x="26" y="16" width="12" height="18" rx="1" fill="#F58B2D" opacity="0.2"/>
        </svg>
      ),
      points: [
        "Over 65% of web traffic comes from mobile — we design every screen for mobile first.",
        "Responsive layouts adapt flawlessly from 320px to 4K screens.",
        "Touch-optimised interactions ensure a premium experience for smartphone users.",
      ],
    },
    {
      id: 3,
      tab: "Scalable",
      title: "Scalable Architecture",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <rect x="10" y="38" width="14" height="16" rx="2" stroke="#F58B2D" strokeWidth="2"/>
          <rect x="26" y="26" width="14" height="28" rx="2" stroke="#F58B2D" strokeWidth="2"/>
          <rect x="42" y="14" width="14" height="40" rx="2" stroke="#F58B2D" strokeWidth="2"/>
        </svg>
      ),
      points: [
        "Built on modular component architecture that scales as your business grows.",
        "Headless CMS setups allow your content team to publish without a developer.",
        "Infrastructure designed to handle traffic spikes and growing user bases.",
      ],
    },
    {
      id: 4,
      tab: "Secure",
      title: "Secure & Reliable",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M32 8L12 16v16c0 12 10 22 20 26 10-4 20-14 20-26V16L32 8z" stroke="#F58B2D" strokeWidth="2"/>
          <path d="M22 32l7 7 13-14" stroke="#F58B2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      points: [
        "SSL certificates, HTTPS enforcement, and security headers on every deployment.",
        "OWASP best practices implemented to prevent XSS, CSRF, and injection attacks.",
        "99.9% uptime SLAs with automated backups and monitoring.",
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const current = data[active];

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[340px_1fr] items-center gap-8">
        {/* Desktop left rail */}
        <div className="hidden lg:block relative h-full min-h-[620px]">
          <div className="absolute left-[28px] top-1/2 -translate-y-1/2 -rotate-90 origin-left">
            <h2 className="text-white font-light text-[64px] whitespace-nowrap">
              Key Benefits
            </h2>
          </div>

          <div className="absolute left-[140px] top-1/2 -translate-y-1/2 w-[260px] space-y-8">
            {data.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`w-full h-[58px] rounded-md border text-xl transition-all ${
                  active === i
                    ? "bg-[#F58B2D] border-white text-white"
                    : "bg-white border-white text-[#F58B2D]"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden space-y-4">
          <h2 className="text-4xl">Key Benefits</h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`rounded-md px-3 py-3 text-sm border ${
                  active === i
                    ? "bg-[#F58B2D] text-white"
                    : "bg-white text-[#F58B2D]"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="parallax-item">
          <h3 className="text-white text-center lg:text-left font-light text-[clamp(2.5rem,4vw,4.5rem)] mb-8">
            {current.title}
          </h3>

          <div className="space-y-6 max-w-[860px]">
            {current.points.map((point, idx) => (
              <p
                key={idx}
                className="text-white/90 text-[clamp(1rem,1.4vw,1.45rem)]"
              >
                {idx + 1}. {point}
              </p>
            ))}
          </div>

          <div className="mt-10 flex justify-center lg:justify-start">
            <div className="relative w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] lg:w-[340px] lg:h-[340px]">
              {current.icon}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES / TYPES OF SITES ---------------- */

function ServicesSlide() {
  return (
    <section className="relative w-full">
      <div className="grid h-full grid-cols-1 xl:grid-cols-2 gap-x-14 items-start content-center">
        {/* top left */}
        <div className="parallax-item">
          <MediaBlock
            src="/home/services/web_&_cms.png"
            alt="Web & CMS"
            className="w-full aspect-[1.95/1]"
          />
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            CMS & Blog Websites
          </h3>
          <p className="max-w-[760px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            Power your content with WordPress, Webflow, or headless CMS.
            Easy to manage, beautifully designed, and SEO-optimised out of the box.
          </p>
        </div>

        {/* top right */}
        <div className="parallax-item">
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            E-Commerce Stores
          </h3>
          <p className="max-w-[820px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            Full-featured online stores with Shopify, WooCommerce, or custom
            solutions. Secure payments, smart inventory, and conversion-focused UX.
          </p>

          <MediaBlock
            src="/home/services/software_development.png"
            alt="E-Commerce"
            className="w-full aspect-[1.95/1]"
          />
        </div>

        {/* bottom left */}
        <div className="parallax-item space-y-6">
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            Landing Pages
          </h3>
          <p className="max-w-[780px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            High-converting landing pages built for campaigns, product launches,
            and lead generation.{" "}
            <span className="font-semibold">Designed to turn clicks into customers.</span>
          </p>
        </div>

        {/* bottom right */}
        <div className="parallax-item gap-y-5 xl:pt-6">
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            Custom Web Applications
          </h3>
          <p className="max-w-[820px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            Bespoke web apps, dashboards, portals, and SaaS platforms built with
            modern stacks.{" "}
            <span className="font-semibold">(Tailored to your exact requirements)</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TECH STACK ---------------- */

function TechSlide() {
  const techs = [
    {
      category: "Front-End",
      items: [
        { name: "React / Next.js", desc: "Server-side rendering, static generation, app router" },
        { name: "Tailwind CSS", desc: "Utility-first rapid styling with design systems" },
        { name: "GSAP / Framer Motion", desc: "Premium animations and scroll interactions" },
        { name: "TypeScript", desc: "Type-safe scalable front-end codebase" },
      ],
    },
    {
      category: "Back-End & CMS",
      items: [
        { name: "Node.js / Express", desc: "RESTful APIs and server-side logic" },
        { name: "WordPress / Headless", desc: "Flexible CMS for content-driven sites" },
        { name: "Shopify / WooCommerce", desc: "E-commerce platform integrations" },
        { name: "PostgreSQL / MongoDB", desc: "Relational and NoSQL database solutions" },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Vercel / Netlify", desc: "Edge deployment and CDN for global speed" },
        { name: "AWS / Cloudflare", desc: "Enterprise-grade infrastructure and security" },
        { name: "Docker / CI/CD", desc: "Automated pipelines for reliable deployments" },
        { name: "Google Analytics 4", desc: "Data-driven insights and conversion tracking" },
      ],
    },
  ];

  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="h-full flex items-center">
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-x-10 2xl:gap-x-14 gap-y-6 lg:gap-y-7 items-start">
          {techs.map((group) => (
            <div key={group.category} className="parallax-item space-y-4">
              <h3 className="text-orange-500 font-bold leading-none text-[clamp(1.35rem,2vw,2.65rem)]">
                {group.category}
              </h3>

              <div className="space-y-4">
                {group.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="border border-white/15 rounded-2xl p-4"
                  >
                    <p className="text-white font-semibold text-[clamp(1rem,1.15vw,1.25rem)] mb-1">
                      {tech.name}
                    </p>
                    <p className="text-white/60 text-[clamp(0.85rem,0.95vw,1.05rem)] leading-snug">
                      {tech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HELPERS ---------------- */

function ListBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="parallax-item">
      <h3 className="text-orange-500 font-semibold mb-6 text-[clamp(1.45rem,2vw,2.4rem)]">
        {title}
      </h3>

      <ul className="space-y-4 text-white/95 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-white/55">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MediaBlock({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] bg-white/5 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale contrast-125"
      />
    </div>
  );
}

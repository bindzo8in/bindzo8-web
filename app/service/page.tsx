"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./hero-section";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {

  //   const container = containerRef.current;
  //   const track = trackRef.current;

  //   if (!container || !track) return;

  //   const ctx = gsap.context(() => {
  //     const getDistance = () =>
  //       track.scrollWidth - window.innerWidth;

  //     const horizontalTween = gsap.to(track, {
  //       x: () => -getDistance(),
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: container,
  //         start: "top top",
  //         end: () => `+=${getDistance()}`,
  //         scrub: 1,
  //         pin: true,
  //         anticipatePin: 1,
  //         invalidateOnRefresh: true,
  //       },
  //     });

  //     gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
  //       const inner = panel.querySelectorAll(".parallax-item");

  //       gsap.set(inner, {
  //         opacity: 1,
  //         willChange: "transform",
  //       });

  //       gsap.fromTo(
  //         inner,
  //         { x: 60 },
  //         {
  //           x: -60,
  //           stagger: 0.04,
  //           ease: "none",
  //           scrollTrigger: {
  //             trigger: panel,
  //             containerAnimation: horizontalTween,
  //             start: "left center",
  //             end: "right center",
  //             scrub: true,
  //           },
  //         }
  //       );
  //     });

  //     ScrollTrigger.refresh();
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <main className="relative isolate min-h-screen bg-black text-white overflow-x-hidden font-kumbh">

      <HeroSection />

      <section className="min-h-[300px] flex items-center justify-center px-6 text-center">
        <p className="max-w-4xl text-[clamp(1.2rem,2vw,2rem)]">
          Your website is often the first impression your customers have of your brand.
        </p>
      </section>

      <HorizontalScrollSection
        sections={[
          {
            id: "use-cases",
            content: <UseCasesSlide />,
          },
          {
            id: "process",
            content: <ProcessSlide />,
          },
          {
            id: "benefits",
            content: <BenefitsSlide />,
          },
          {
            id: "services",
            content: <ServicesSlide />,
          },
          {
            id: "channels",
            content: <ChannelsSlide />,
          },
        ]}
      />
    </main>
  );
}

/* ---------------- SLIDE ---------------- */

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <section className="panel w-screen h-screen shrink-0">
      <div className="w-full h-full overflow-y-auto px-5 sm:px-8 lg:px-14 py-12">
        <div className="min-h-full flex items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */

function ProcessSlide() {
  const cols = [
    {
      title: "1. User & Market Research",
      items: [
        "Analyze target audience behavior",
        "Understand customer pain points",
        "Study competitor marketing strategies",
        "Identify marketing gaps & opportunities",
      ],
    },
    {
      title: "3. Development",
      items: [
        "Setting up ad campaigns",
        "Creating landing pages",
        "Configuring tracking & analytics",
        "Audience segmentation",
      ],
    },
    {
      title: "5. Deployment",
      items: [
        "Launching digital campaigns",
        "Publishing posts & ads",
        "Scheduling content",
      ],
    },
    {
      title: "2. Designing & Prototyping",
      items: [
        "Campaign visual mockups",
        "Ad creative designs",
        "Content planning & calendars",
        "Copywriting for ads & captions",
      ],
    },
    {
      title: "4. Testing",
      items: [
        "A/B testing of creatives",
        "Split testing headlines",
        "Testing audience groups",
        "Reviewing engagement metrics",
      ],
    },
    {
      title: "6. Platform Approval",
      items: [
        "Facebook/Instagram ad approval",
        "Google search/display ad approval",
      ],
    },
  ];

  return (
    // <section className="relative h-full w-full overflow-hidden bg-green-400">

    // </section>
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
      tab: "ROI Tracking",
      title: "ROI Tracking",
      image: "/Property 1=Group 131.svg",
      points: [
        "Every campaign is monitored with advanced analytics.",
        "We track clicks, leads, conversions, and sales.",
        "Transparent reports help you understand performance.",
      ],
    },
    {
      tab: "KPI Optimization",
      title: "KPI Optimization",
      image: "/Property 1=Group 132.svg",
      points: [
        "We continuously refine your campaigns to improve results across all key performance indicators.",
        "Metrics like engagement, reach, cost-per-click, and conversion rates are optimized for maximum impact.",
        "Data-driven adjustments ensure your marketing stays efficient, powerful, and aligned with your goals.",
      ],
    },
    {
      tab: "Brand Reach",
      title: "Brand Reach",
      image: "/Property 1=Group 133.svg",
      points: [
        "Expand visibility across platforms.",
        "Reach the right audience.",
        "Build strong brand recognition.",
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const current = data[active];

  return (
    <section className="w-full flex flex-col lg:flex-row items-center gap-10">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col gap-5 w-[260px]">
        <h2 className="rotate-[-90deg] origin-left text-white text-4xl mb-20 my-auto">
          Key Benefits
        </h2>

        {data.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-12 rounded ${active === i
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-500"
              }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      {/* RIGHT */}
      <div className="text-center lg:text-left max-w-2xl">

        <h3 className="text-3xl lg:text-5xl mb-6">
          {current.title}
        </h3>

        <div className="space-y-4">
          {current.points.map((p, i) => (
            <p key={i}>{i + 1}. {p}</p>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:justify-start">
          <Image src={current.image} alt="" width={300} height={300} />
        </div>

      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */

function ServicesSlide() {
  return (
    <section className="relative w-full">
      <div className="grid h-full grid-cols-1 xl:grid-cols-2 gap-x-14 items-start content-center">
        {/* top left */}
        <div className="parallax-item ">
          <MediaBlock
            src="/services/smm-1.jpg"
            alt="SMM"
            className="w-full aspect-[1.95/1]"
          />
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            SMM (Social Media Marketing)
          </h3>
          <p className="max-w-[760px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            World is connected through Social Media. We create a brand identity
            of your business in all social media and reach potential customers
            based on your preference to increase your revenue.
          </p>
        </div>

        {/* top right */}
        <div className="parallax-item ">
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            SEO (Search Engine Optimization)
          </h3>
          <p className="max-w-[820px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            To make your website top in google search engine result page
            organically which leads to come more Business Conversion, High
            Visibility & Higher Traffic.
          </p>

          <MediaBlock
            src="/services/seo-1.jpg"
            alt="SEO"
            className="w-full aspect-[1.95/1]"
          />
        </div>

        {/* bottom left */}
        <div className="parallax-item space-y-6">
          <MediaBlock
            src="/services/seo-2.jpg"
            alt="PPC"
            className="w-full aspect-[1.95/1]"
          />
        </div>

        {/* bottom right */}
        <div className="parallax-item gap-y-5 xl:pt-6">
          <h3 className="text-orange-500 font-bold text-[clamp(1.7rem,2.6vw,3rem)]">
            PPC (Pay Per Click)
          </h3>

          <p className="max-w-[820px] text-white/90 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
            Ads which focused on targeted people boost traffic, increased sales,
            Brand Recognition of your business with a cost-effective method
            <br />
            <span className="font-semibold">(Only pay for the clicks)</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CHANNELS ---------------- */

function ChannelsSlide() {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="h-full flex items-center">
        <div
          className="
            w-full
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-x-10
            2xl:gap-x-14
            gap-y-6
            lg:gap-y-7
            xl:gap-y-6
            items-center
            content-center
          "
        >
          {/* ---------- ROW 1 LEFT ---------- */}
          <div className="parallax-item space-y-3 lg:space-y-4">
            <MediaBlock
              src="/services/sms.jpg"
              alt="SMS Marketing"
              className="
                w-full
                aspect-[2.25/1]
                lg:aspect-[2.15/1]
                2xl:aspect-[1.95/1]
              "
            />

            <h3
              className="
                text-orange-500
                font-bold
                leading-none
                text-[clamp(1.35rem,2vw,2.65rem)]
              "
            >
              SMS Marketing
            </h3>

            <p
              className="
                max-w-[760px]
                text-white/90
                leading-snug
                text-[clamp(.92rem,1vw,1.18rem)]
              "
            >
              Mobile is a lot closer than any other in this digital world.
              Meet your customers in a{" "}
              <span className="font-semibold">More Accessible Way</span> and get
              enquiries for your business.
            </p>
          </div>

          {/* ---------- ROW 1 RIGHT ---------- */}
          <div className="parallax-item space-y-3 lg:space-y-4 xl:pt-1">
            <h3
              className="
                text-orange-500
                font-bold
                leading-none
                text-[clamp(1.35rem,2vw,2.65rem)]
              "
            >
              e-Mail Marketing
            </h3>

            <p
              className="
                max-w-[780px]
                text-white/90
                leading-snug
                text-[clamp(.92rem,1vw,1.18rem)]
              "
            >
              Email marketing is about building relationships. A cost-effective
              way of{" "}
              <span className="font-semibold">
                Advertising your Business with Crispy Contents.
              </span>
            </p>

            <MediaBlock
              src="/services/email.jpg"
              alt="Email Marketing"
              className="
                w-full
                aspect-[2.25/1]
                lg:aspect-[2.15/1]
                2xl:aspect-[1.95/1]
              "
            />
          </div>

          {/* ---------- ROW 2 LEFT ---------- */}
          <div className="parallax-item">
            <MediaBlock
              src="/services/people.jpg"
              alt="People Using Phones"
              className="
                w-full
                aspect-[2.25/1]
                lg:aspect-[2.15/1]
                2xl:aspect-[1.95/1]
              "
            />
          </div>

          {/* ---------- ROW 2 RIGHT ---------- */}
          <div className="parallax-item space-y-3 lg:space-y-4">
            <h3
              className="
                text-orange-500
                font-bold
                leading-none
                text-[clamp(1.35rem,2vw,2.65rem)]
              "
            >
              WhatsApp Marketing
            </h3>

            <p
              className="
                max-w-[780px]
                text-white/90
                leading-snug
                text-[clamp(.92rem,1vw,1.18rem)]
              "
            >
              No one has time to read a newspaper or a signboard or a flyer in
              this busy world. But everyone is using WhatsApp. The best way to
              reach your{" "}
              <span className="font-semibold">Potential Customers.</span>
            </p>

            <MediaBlock
              src="/services/whatsapp.jpg"
              alt="WhatsApp Marketing"
              className="
                w-full
                aspect-[2.25/1]
                lg:aspect-[2.15/1]
                2xl:aspect-[1.95/1]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- USE CASES ---------------- */

function UseCasesSlide() {
  return (
    <section className="relative h-full w-full">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[0.5fr_0.5fr_1fr] gap-10 lg:gap-14 items-center">
        <ListBlock
          title="Usage / Use Cases"
          items={[
            "Brand promotion",
            "Lead generation",
            "Product marketing",
            "Event promotions",
            "E-commerce campaigns",
            "Social media branding",
            "Customer engagement",
          ]}
        />

        <ListBlock
          title="Technologies Used"
          items={[
            "Meta Ads Manager",
            "Google Ads",
            "Google Analytics",
            "Canva, Photoshop, Illustrator",
            "Mailchimp / SendGrid",
            "Keyword research tools (SEMrush, Ahrefs)",
          ]}
        />

        <div className="relative h-[340px] sm:h-[420px] lg:h-[620px] xl:h-[700px] parallax-item">
          <div className="absolute left-[4%] top-[44%] -translate-y-1/2 z-20">
            <h2 className="text-orange-500 font-bold leading-[0.92] tracking-tight text-[clamp(1.8rem,3vw,3.8rem)]">
              360° Digital
              <br />
              Marketing
            </h2>
          </div>

          <div className="absolute right-[-1%] top-[6%] z-10 w-[clamp(240px,26vw,560px)] aspect-square">
            <Image
              src="/services/rocket.png"
              alt="Rocket"
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
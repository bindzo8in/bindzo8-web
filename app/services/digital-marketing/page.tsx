"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroSection from "./hero-section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- PAGE ---------------- */

export default function Page() {
  const sections = [
    { id: "use-cases", content: <UseCasesSlide /> },
    { id: "services-1", content: <ServicesSlide /> },
    { id: "services-2", content: <ServicesSlide /> },
    { id: "process", content: <ProcessSlide /> },
    { id: "benefits", content: <BenefitsSlide /> },
  ];

  return (
    <main className="relative overflow-x-hidden bg-black">

      {/* BACKGROUND */}
      {/* <div className="pointer-events-none absolute inset-0 z-0">
        <WaveBackground />
      </div> */}

      <HeroSection />

      <section className="min-h-[300px] flex items-center justify-center px-6 text-center">
        <p className="max-w-4xl text-[clamp(1.2rem,2vw,2rem)]">
          Your website is often the first impression your customers have of your brand.
        </p>
      </section>

      {/* CONTENT */}
      <div className="relative z-10">
        <HorizontalScrollSection sections={sections} />
      </div>

    </main>
  );
}

/* ---------------- HORIZONTAL SCROLL WRAPPER ---------------- */

type HorizontalSection = {
  id: string;
  content: ReactNode;
};

function HorizontalScrollSection({
  sections,
}: {
  sections: HorizontalSection[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;

      if (!container || !track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
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

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [sections.length] }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden z-10"
    >
      <div ref={trackRef} className="flex h-screen w-max will-change-transform">
        {sections.map((section) => (
          <section
            key={section.id}
            className="h-screen w-screen shrink-0 overflow-hidden "
          >
            <div className="mx-auto h-full w-full max-w-[1440px] overflow-hidden px-4 sm:px-6 lg:px-12">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

/* ---------------- USE CASES ---------------- */

function UseCasesSlide() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-8 font-kumbh text-white lg:flex-row">
      <div className="grid w-full flex-1 grid-cols-1 gap-8 md:grid-cols-2">
        <ListBlock
          title="Usage / Use Cases"
          items={[
            "Brand Promotion",
            "Lead Generation",
            "Product Marketing",
            "Event Promotions",
            "E-commerce Campaigns",
            "Social Media Branding",
            "Customer Engagement",
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
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center">
        <h4 className="absolute left-2 top-1/2 z-10 max-w-[220px] -translate-y-1/2 text-[clamp(1.8rem,3vw,3.5rem)] font-bold leading-tight text-[#EF8030]">
          360° Digital Marketing
        </h4>

        <figure className="relative h-[min(72vh,655px)] w-[min(55vw,496px)]">
          <Image
            src="/services/rocket.png"
            alt="rocket"
            fill
            priority
            className="object-contain"
          />
        </figure>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */

function ServicesSlide() {
  const services = [
    {
      title: "SMM (Social Media Marketing)",
      image: "/services/smm-1.jpg",
      desc: "World is connected through Social Media. We create a brand identity of your business in all social media and reach Potential Customers based on your preference to increase Your Revenue.",
    },
    {
      title: "SEO (Search Engine Optimization)",
      image: "/services/seo-1.jpg",
      desc: "To make your website top in google search engine result page organically which leads to come more Business Conversion, High Visibility & Higher Traffic.",
    },
    {
      title: "PPC (Pay Per Click)",
      image: "/services/seo-2.jpg",
      desc: "Ads which focused on targeted peoples boost traffic, increased sales, Brand Recognition of your business with a cost-effective method (Only pay for the clicks)",
    },
  ];

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden font-kumbh text-white">

      <div className="relative z-10 grid w-full max-w-[980px] grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-5">
          <ServiceCard {...services[0]} />

          <ImageBox
            src="/services/seo-2.jpg"
            alt="Marketing workspace"
          />
        </div>

        <div className="space-y-5">
          <ServiceText title={services[1].title} desc={services[1].desc} />
          <ImageBox src={services[1].image} alt={services[1].title} />
          <ServiceText title={services[2].title} desc={services[2].desc} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */

function ProcessSlide() {
  const columns = [
    [
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
        title: "2. Designing & Prototyping",
        items: [
          "Campaign visual mockups",
          "Ad creative designs",
          "Content planning & calendars",
          "Copywriting for ads & captions",
        ],
      },
    ],
    [
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
        title: "4. Testing",
        items: [
          "A/B testing of creatives",
          "Split testing headlines",
          "Testing audience groups",
          "Reviewing engagement metrics",
        ],
      },
    ],
    [
      {
        title: "5. Deployment",
        items: [
          "Launching digital campaigns",
          "Publishing posts & ads",
          "Scheduling content",
        ],
      },
      {
        title: "6. Platform Approval",
        items: [
          "(Optional – Ads Approval)",
          "Facebook/Instagram ad approval",
          "Google search/display ad approval",
        ],
      },
    ],
  ];

  return (
    <section className="flex h-full w-full items-center overflow-hidden font-kumbh text-white">
      <div className="flex h-[80vh] py-4 w-full flex-col justify-center overflow-hidden">
        <h2 className="mb-[clamp(1rem,3vh,2.5rem)] text-[clamp(1.6rem,2.5vw,2.7rem)] font-bold text-[#EF8030]">
          Process:
        </h2>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-hidden lg:grid-cols-3 lg:gap-0">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`flex min-h-0 flex-col justify-around gap-5 overflow-hidden lg:px-8 ${colIndex !== 0 ? "lg:border-l lg:border-white/70" : ""
                }`}
            >
              {column.map((block) => (
                <div key={block.title} className="min-h-0">
                  <h3 className="mb-3 text-[clamp(1rem,1.45vw,1.55rem)] font-bold leading-tight">
                    {block.title}
                  </h3>

                  <ul className="space-y-[clamp(0.35rem,1.2vh,0.85rem)] text-[clamp(0.8rem,1vw,1.1rem)] leading-snug text-white/85">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="shrink-0 text-white/80">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
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
      image: "/key_benefit_wd/brand.png",
      points: [
        "Every campaign is monitored with advanced analytics to show exactly what returns you are getting.",
        "We track clicks, leads, conversions, and sales to ensure your investment is generating real growth.",
        "Transparent performance reports help you understand which strategies work best for your business.",
      ],
    },
    {
      tab: "KPI Optimization",
      title: "KPI Optimization",
      image: "/key_benefit_wd/brand.png",
      points: [
        "We continuously refine your campaigns to improve results across all key performance indicators.",
        "Metrics like engagement, reach, cost-per-click, and conversion rates are optimized for maximum impact.",
        "Data-driven adjustments ensure your marketing stays efficient, powerful, and aligned with your goals.",
      ],
    },
    {
      tab: "Brand Reach",
      title: "Brand Reach",
      image: "/key_benefit_wd/brand.png",
      points: [
        "We expand your brand visibility across social media, search engines, and digital platforms.",
        "Targeted advertising helps you reach the right audience at the right time.",
        "Consistent content and creative campaigns help your brand become easily recognizable and memorable.",
      ],
    },
    {
      tab: "Revenue Growth",
      title: "Revenue Growth",
      image: "/key_benefit_wd/brand.png",
      points: [
        "Our strategies focus on attracting high-quality leads that convert into paying customers.",
        "With strong targeting and optimized campaigns, your business generates increased sales and long-term revenue.",
        "We build marketing funnels that guide customers smoothly from awareness to purchase.",
      ],
    },
  ];

  const [selectedBenefit, setSelectedBenefit] = useState(0);
  const current = data[selectedBenefit];

  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden font-kumbh text-white">
      <div className="flex h-[82vh] w-full max-w-[1100px] items-center overflow-hidden gap-4">
        <div className="hidden w-[70px] shrink-0 items-center justify-center md:flex">
          <h2 className="[writing-mode:vertical-rl] rotate-180 text-[clamp(2rem,3vw,3.2rem)] leading-none text-white">
            Key Benefits
          </h2>
        </div>

        <div className="flex shrink-0 flex-col space-y-16 border-r border-white/70">
          {data.map((item, index) => (
            <Button
              key={item.title}
              onClick={() => setSelectedBenefit(index)}
              className="w-[180px] rounded-none rounded-bl-xl rounded-tl-xl text-base font-extralight py-5"
            >
              {item.tab}
            </Button>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-6 font-extralight">
          <h3 className="mb-5 text-center text-[clamp(1.4rem,2vw,2rem)]">
            {current.title}
          </h3>

          <ol className="max-w-[620px] list-decimal space-y-3 pl-5 text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed">
            {current.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>

          <figure className="relative mt-8 h-[min(28vh,260px)] w-[min(40vw,300px)]">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-contain"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HELPERS ---------------- */

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-4 text-center text-[clamp(1.2rem,1.7vw,1.6rem)] font-bold text-[#EF8030]">
        {title}
      </h3>

      <ul className="list-disc space-y-2 pl-6 text-[clamp(0.95rem,1.2vw,1.25rem)] leading-relaxed text-white">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ImageBox({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative h-[clamp(110px,19vh,160px)] w-full overflow-hidden rounded-xl bg-white/5">
      <Image src={src} alt={alt} fill className="object-cover grayscale" />
    </figure>
  );
}

function ServiceCard({
  image,
  title,
  desc,
}: {
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <ImageBox src={image} alt={title} />
      <div className="mt-4">
        <ServiceText title={title} desc={desc} />
      </div>
    </div>
  );
}

function ServiceText({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="mb-2 text-[clamp(1rem,1.3vw,1.3rem)] font-bold leading-tight text-[#EF8030]">
        {title}
      </h3>

      <p className="max-w-[440px] text-[clamp(0.7rem,0.85vw,0.85rem)] font-medium leading-snug text-white">
        {desc}
      </p>
    </div>
  );
}
"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Box,
  Megaphone,
  Users,
  Lightbulb,
  PackageSearch,
  CheckCircle2,
  PlayCircle,
  Monitor,
  Radio,
  MessageCircle,
  Smartphone,
  Globe2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CircleFeature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type AdFormat = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ComparisonItem = {
  label: string;
  googleAds: string;
  dv360: string;
};

const circleFeatures: CircleFeature[] = [
  {
    title: "Campaigns",
    description: "Build and execute a cross-channel media plan.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "Audiences",
    description: "Manage your audiences alongside your media buys.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Creatives",
    description: "Tie your creative strategy to your data and your media plan.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Insights",
    description: "Get all the campaign metrics you need, in one place.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Inventory",
    description:
      "Discover high-quality inventory from top broadcasters and publishers.",
    icon: <PackageSearch className="h-5 w-5" />,
  },
];

const adFormats: AdFormat[] = [
  {
    title: "Native",
    description:
      "Ads that blend seamlessly into content. Earn attention, not just impressions — across millions of sites and apps.",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    title: "Display",
    description:
      "Bold banners and rich media across the open web. High impact visuals that build brand awareness at scale.",
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    title: "Video",
    description:
      "Pre-roll, outstream, Connected TV. Reach audience on YouTube, streaming service, and premium publishers with video that drives action.",
    icon: <PlayCircle className="h-5 w-5" />,
  },
  {
    title: "Audio",
    description:
      "Programmatic audio on Spotify, podcasts, and streaming radio. High attention, clutter-free and no screen required.",
    icon: <Radio className="h-5 w-5" />,
  },
  {
    title: "Conversational",
    description:
      "Interactive formats that create two-way experiences. Higher engagement, longer dwell time, more qualified leads.",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: "In App",
    description:
      "Reach users inside their favorite mobile apps. Premium placements with higher viewability and full-screen impact.",
    icon: <Smartphone className="h-5 w-5" />,
  },
];

const comparisonData: ComparisonItem[] = [
  {
    label: "Exchange Access",
    googleAds: "Access to the Google Ad Manager exchange only.",
    dv360: "Access to Google Ad Manager and 76+ third-party exchanges.",
  },
  {
    label: "Video Inventory",
    googleAds: "Video inventory is only available on YouTube.",
    dv360: "Available YouTube and other video inventory, including non-YouTube.",
  },
  {
    label: "Publisher Deals",
    googleAds: "You cannot directly interact with publishers.",
    dv360:
      "Marketplace is available, which gives direct deals with publishers.",
  },
  {
    label: "Frequency Control",
    googleAds:
      "It is not possible to set a common frequency between campaigns of different formats.",
    dv360:
      "You can set common frequency for display, video, Gmail, and video-YouTube beta.",
  },
  {
    label: "Audience Setup",
    googleAds: "Standard audience targeting.",
    dv360: "Advanced audience setup.",
  },
  {
    label: "Ad Formats",
    googleAds: "Standard ad formats.",
    dv360: "Standard and non-standard ad formats.",
  },
  {
    label: "Brand Safety",
    googleAds: "General Brand Safety.",
    dv360:
      "Managed Brand Safety settings and integrated third-party verifiers: IAS, Adloox, DoubleVerify.",
  },
];

export default function DV360ServicePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = useMemo(() => {
    return circleFeatures[activeIndex];
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % circleFeatures.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-[#070712] font-kumbh text-white">
      {/* Background */}
      <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[430px] w-[430px] rounded-full bg-[#c42b47]/35 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-160px] top-[420px] h-[520px] w-[520px] rounded-full bg-[#d3325c]/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[300px] left-[30%] h-[440px] w-[440px] rounded-full bg-[#6D5DFB]/20 blur-[140px]" />

      {/* HERO */}
      <section className="relative z-10">
        <div className="container mx-auto grid min-h-screen grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-white/75 backdrop-blur-md">
              <Box className="h-4 w-4 text-[#d3325c]" />
              Display & Video 360
            </div>

            <h1 className="max-w-[820px] text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[76px] lg:text-[112px]">
              DV 360°
            </h1>

            <p className="mt-7 max-w-[680px] text-[16px] leading-[1.8] text-white/70 sm:text-[18px]">
              <span className="font-semibold text-white">
                Display & Video 360
              </span>{" "}
              is an advanced digital advertising platform by Google used for
              programmatic ad buying. It allows businesses to plan, run, and
              optimize ads across display, video, mobile apps, and connected TV
              — all from one platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Plan", "Buy", "Manage", "Optimize Ads"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-[13px] font-medium text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="group mt-9 inline-flex h-[48px] items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#c42b47,#d3325c)] px-8 text-[14px] font-semibold text-white shadow-[0_18px_50px_rgba(231,50,92,0.35)] transition duration-300 hover:scale-[1.03]"
            >
              Get Quote
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[44px] bg-[linear-gradient(135deg,#c42b47,#d3325c)] opacity-35 blur-2xl" />

            <div className="relative overflow-hidden rounded-[40px] border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                DSP Platform
              </div>

              <div className="flex min-h-[330px] items-center justify-center">
                <Image
                  src="/dv_360.webp"
                  alt="DV360 dashboard"
                  width={560}
                  height={420}
                  className="h-auto w-full max-w-[480px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO CONTENT */}
      <section className="relative z-10 py-8 lg:py-16">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoCard
              title="What is DV360?"
              description="DV360 is an advanced advertising platform by Google for running programmatic digital ad campaigns across multiple channels."
            />
            <InfoCard
              title="Platform Type"
              description="It is a Demand-Side Platform (DSP) used to plan, buy, manage, and optimize digital ads."
            />
            <InfoCard
              title="Advertising Channels"
              description="Run campaigns across websites, YouTube, video, mobile apps, and Connected TV."
            />
          </div>
        </div>
      </section>

      {/* CIRCLE FEATURES */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#d3325c]">
              Display and Video 360
            </p>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-white sm:text-[48px]">
              One Platform. Complete Campaign Control.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-white/65 sm:text-[17px]">
              DV360 connects campaign planning, audiences, creatives, insights,
              and premium inventory into a single professional media buying
              ecosystem.
            </p>
          </div>

          <div className="mt-16 hidden justify-center md:flex">
            <div className="relative h-[580px] w-full max-w-[680px]">
              <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-5 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-white/20" />
                <div className="absolute inset-12 rounded-full bg-[conic-gradient(from_90deg,#c42b47,#d3325c,#6466F1,#c42b47)] opacity-20 blur-md" />
              </div>

              <div className="absolute left-1/2 top-1/2 z-20 flex h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-[#090914]/95 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div
                  key={activeIndex}
                  className="animate-[featurePop_0.55s_ease_both]"
                >
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#c42b47,#d3325c)] text-white">
                    {activeFeature.icon}
                  </span>

                  <h3 className="text-[20px] font-semibold leading-tight text-white">
                    {activeFeature.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.6] text-white/65">
                    {activeFeature.description}
                  </p>
                </div>
              </div>

              {circleFeatures.map((feature, index) => {
                const angle = (360 / circleFeatures.length) * index - 90;
                const radius = 235;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="absolute left-1/2 top-1/2 z-30 transition-all duration-500"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div
                      className={[
                        "group flex h-[102px] w-[165px] flex-col items-center justify-center gap-2 rounded-[26px] border p-4 text-center shadow-xl backdrop-blur-xl transition-all duration-500",
                        isActive
                          ? "scale-110 border-[#d3325c]/70 bg-[linear-gradient(135deg,rgba(231,50,92,0.95),rgba(239,128,48,0.95))] text-white shadow-[0_20px_60px_rgba(231,50,92,0.35)]"
                          : "border-white/10 bg-white/[0.08] text-white/70 hover:scale-105 hover:border-white/25 hover:bg-white/[0.13]",
                      ].join(" ")}
                    >
                      <span>{feature.icon}</span>
                      <span className="text-[13px] font-semibold leading-tight">
                        {feature.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:hidden">
            {circleFeatures.map((feature, index) => (
              <FeatureMobileCard
                key={feature.title}
                index={index}
                feature={feature}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AD FORMATS */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#d3325c]">
                Ad Formats
              </p>
              <h2 className="mt-4 max-w-[720px] text-[32px] font-semibold tracking-[-0.04em] text-white sm:text-[48px]">
                Built to Stop the Scroll
              </h2>
            </div>

            <p className="max-w-[520px] text-[15px] leading-[1.7] text-white/65">
              From native placements to immersive video and in-app experiences,
              DV360 helps brands reach audiences with high-impact formats.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {adFormats.map((format, index) => (
              <div
                key={format.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#d3325c]/45 hover:bg-white/[0.1]"
              >
                <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-[#c42b47]/0 blur-2xl transition duration-500 group-hover:bg-[#c42b47]/25" />

                <div className="mb-7 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c42b47,#d3325c)] text-white shadow-[0_14px_35px_rgba(231,50,92,0.28)]">
                    {format.icon}
                  </span>

                  <span className="text-[13px] font-semibold text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-white">
                  {format.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mx-auto mb-14 max-w-[880px] text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#d3325c]">
              Platform Comparison
            </p>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-white sm:text-[48px]">
              Difference Between Google Ads & DV360
            </h2>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1fr_1fr]">
              <div className="hidden border-b border-white/10 bg-white/[0.06] p-5 lg:block">
                <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Feature
                </p>
              </div>

              <div className="border-b border-white/10 bg-white/[0.06] p-5">
                <h3 className="text-[22px] font-semibold text-white">
                  Google Ads
                </h3>
              </div>

              <div className="border-b border-white/10 bg-[linear-gradient(90deg,rgba(231,50,92,0.3),rgba(239,128,48,0.24))] p-5">
                <h3 className="text-[22px] font-semibold text-white">
                  Display & Video 360
                </h3>
              </div>

              {comparisonData.map((item) => (
                <ComparisonRow key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes featurePop {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:border-[#d3325c]/40 hover:bg-white/[0.1]">
      <CheckCircle2 className="mb-5 h-6 w-6 text-[#d3325c]" />
      <h3 className="text-[20px] font-semibold text-white">{title}</h3>
      <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
        {description}
      </p>
    </div>
  );
}

function FeatureMobileCard({
  feature,
  index,
  activeIndex,
  setActiveIndex,
}: {
  feature: CircleFeature;
  index: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isActive = activeIndex === index;

  return (
    <button
      type="button"
      onClick={() => setActiveIndex(index)}
      className={[
        "rounded-[24px] border p-5 text-left transition-all duration-300",
        isActive
          ? "border-[#d3325c]/70 bg-[linear-gradient(135deg,rgba(231,50,92,0.95),rgba(239,128,48,0.95))] shadow-[0_18px_45px_rgba(231,50,92,0.28)]"
          : "border-white/10 bg-white/[0.07]",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
          {feature.icon}
        </span>

        <div>
          <h3 className="text-[16px] font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.6] text-white/70">
            {feature.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function ComparisonRow({ item }: { item: ComparisonItem }) {
  return (
    <>
      <div className="border-b border-white/10 p-5 lg:block">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d3325c] lg:mb-0">
          {item.label}
        </p>
      </div>

      <div className="border-b border-white/10 p-5">
        <p className="text-[14px] leading-[1.6] text-white/62">
          {item.googleAds}
        </p>
      </div>

      <div className="border-b border-white/10 bg-white/[0.035] p-5">
        <p className="text-[14px] leading-[1.6] text-white/82">
          {item.dv360}
        </p>
      </div>
    </>
  );
}
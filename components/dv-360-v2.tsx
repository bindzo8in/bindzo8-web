"use client";

import Image from "next/image";
import {
  ArrowRight,
  AudioLines,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  ChartSpline,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  DatabaseZap,
  Eye,
  FileSpreadsheet,
  Gauge,
  Globe2,
  Layers3,
  LockKeyhole,
  Megaphone,
  MonitorPlay,
  MousePointerClick,
  Network,
  Orbit,
  PackageSearch,
  PlayCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Target,
  Tv,
  Users,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const BRAND = "#d3325c";

const platformModules = [
  {
    title: "Campaigns",
    description:
      "Build cross-channel media plans, consolidate budgets, manage flight dates, and control frequency across digital touchpoints.",
    icon: Megaphone,
  },
  {
    title: "Audiences",
    description:
      "Activate first-party data, Google signals, third-party data, custom affinities, in-market segments, and lookalike expansion.",
    icon: Users,
  },
  {
    title: "Creatives",
    description:
      "Connect creative strategy with media data using rich media, native, audio, video, CTV, and dynamic creative workflows.",
    icon: WandSparkles,
  },
  {
    title: "Inventory",
    description:
      "Discover premium supply across publishers, broadcasters, private marketplaces, programmatic guaranteed, and CTV environments.",
    icon: PackageSearch,
  },
  {
    title: "Insights",
    description:
      "Centralize reporting, attribution, verification, brand-safety checks, and campaign performance diagnostics.",
    icon: BarChart3,
  },
];

const painPoints = [
  {
    title: "Signal loss & cookie deprecation",
    description:
      "Future-ready campaigns need first-party data, clean-room thinking, contextual intelligence, and privacy-safe audience activation.",
    icon: LockKeyhole,
  },
  {
    title: "Ad fraud & supply opacity",
    description:
      "We reduce wasted spend with curated inventory, SPO discipline, verification workflows, and quality-controlled buying paths.",
    icon: ShieldCheck,
  },
  {
    title: "Fragmented reporting",
    description:
      "DV360, CM360, Analytics, and custom dashboards are aligned into one executive-friendly performance story.",
    icon: ChartSpline,
  },
  {
    title: "Internal talent gaps",
    description:
      "Programmatic requires pacing discipline, trading expertise, creative QA, audience logic, and constant optimization.",
    icon: BrainCircuit,
  },
];

const channels = [
  {
    title: "Display",
    description:
      "High-impact banners, rich media, native placements, and premium open-web visibility.",
    icon: Globe2,
  },
  {
    title: "Video",
    description:
      "YouTube, non-YouTube video inventory, pre-roll, outstream, premium publisher video, and full-funnel storytelling.",
    icon: PlayCircle,
  },
  {
    title: "Connected TV",
    description:
      "Addressable TV buying across premium streaming environments and large-screen brand experiences.",
    icon: Tv,
  },
  {
    title: "Programmatic Audio",
    description:
      "Podcast, streaming radio, and music platform placements for screen-free high-attention reach.",
    icon: AudioLines,
  },
  {
    title: "DOOH",
    description:
      "Digital billboard, transit, retail, and location-based programmatic outdoor media planning.",
    icon: MonitorPlay,
  },
  {
    title: "In-App",
    description:
      "Reach mobile users inside premium apps with full-screen, rewarded, native, and high-viewability formats.",
    icon: MousePointerClick,
  },
];

const adSizes = [
  {
    size: "320 × 50",
    title: "Mobile Leaderboard",
    usage: "Maximum reach on mobile web and app environments.",
    value: "32.62%",
  },
  {
    size: "300 × 250",
    title: "Medium Rectangle",
    usage: "Versatile format inside content on desktop and mobile.",
    value: "26.43%",
  },
  {
    size: "728 × 90",
    title: "Leaderboard",
    usage: "Premium top-of-page desktop visibility.",
    value: "14.14%",
  },
  {
    size: "300 × 600",
    title: "Half Page",
    usage: "High-impact vertical storytelling and longer dwell time.",
    value: "7.88%",
  },
  {
    size: "320 × 480",
    title: "Mobile Fullscreen",
    usage: "Immersive interstitial experience for mobile apps.",
    value: "3.46%",
  },
  {
    size: "970 × 250",
    title: "Billboard",
    usage: "Large canvas for brand-awareness campaigns.",
    value: "3.20%",
  },
];

const comparisonRows = [
  {
    feature: "Core Function",
    googleAds: "Self-serve platform focused on Google Search and direct response.",
    dv360: "Enterprise DSP for cross-exchange programmatic orchestration.",
  },
  {
    feature: "Inventory Access",
    googleAds: "Google Search, YouTube, and Google Display Network.",
    dv360: "Premium publishers, CTV, audio, DOOH, PMPs, PG deals, and 80+ exchanges.",
  },
  {
    feature: "Funnel Strength",
    googleAds: "Bottom-funnel demand capture and lead generation.",
    dv360: "Full-funnel reach, awareness, consideration, and brand influence.",
  },
  {
    feature: "Buying Models",
    googleAds: "CPC, CPM, CPA, and automated standard auctions.",
    dv360: "RTB, Programmatic Guaranteed, Private Marketplace, and direct deals.",
  },
  {
    feature: "Attribution",
    googleAds: "Click-led attribution and straightforward ROI tracking.",
    dv360: "Cross-channel measurement, view-through attribution, and longer journeys.",
  },
  {
    feature: "Audience Data",
    googleAds: "Google behavioral and login-based audience data.",
    dv360: "Advanced first-party, third-party, CDP, clean-room, and contextual signals.",
  },
  {
    feature: "Best For",
    googleAds: "Small to mid-scale direct response advertising.",
    dv360: "Enterprise, agency, omnichannel, and premium media buying.",
  },
];

const workflow = [
  {
    title: "Audit",
    description:
      "We analyze media spend, funnel gaps, tracking setup, data readiness, and current platform limitations.",
    icon: Eye,
  },
  {
    title: "Architect",
    description:
      "We design the DV360 structure: campaigns, insertion orders, line items, audiences, creatives, and measurement.",
    icon: Layers3,
  },
  {
    title: "Activate",
    description:
      "We launch display, video, CTV, audio, DOOH, and in-app campaigns with controlled pacing and brand safety.",
    icon: Orbit,
  },
  {
    title: "Optimize",
    description:
      "We refine bidding, frequency, audiences, supply paths, creatives, placements, and budget allocation.",
    icon: Gauge,
  },
  {
    title: "Report",
    description:
      "We convert complex programmatic data into clear executive dashboards and actionable growth insights.",
    icon: FileSpreadsheet,
  },
];

const aiFeatures = [
  {
    title: "AI creative variation",
    description:
      "Generate and test multiple creative directions faster for seasonal, audience-based, and dynamic campaigns.",
    icon: Sparkles,
  },
  {
    title: "Audience persona engineering",
    description:
      "Translate customer personas into executable targeting logic across affinity, in-market, demographic, and first-party signals.",
    icon: Bot,
  },
  {
    title: "Conversational reporting",
    description:
      "Turn complex campaign data into performance narratives, next actions, and simple stakeholder summaries.",
    icon: DatabaseZap,
  },
];

const privacyCards = [
  {
    title: "First-party data architecture",
    description:
      "Build audiences from CRM, website, app, and customer behavior data to reduce dependency on unstable third-party signals.",
    icon: DatabaseZap,
  },
  {
    title: "PAIR & clean-room thinking",
    description:
      "Privacy-forward reconciliation helps brands and publishers activate known audiences without exposing personal data.",
    icon: LockKeyhole,
  },
  {
    title: "AI contextual intelligence",
    description:
      "Modern contextual targeting analyzes meaning, sentiment, and content environment instead of relying only on historical identity.",
    icon: Target,
  },
];

const faq = [
  {
    question: "When should a brand move from Google Ads to DV360?",
    answer:
      "When the brand needs premium inventory, CTV/audio/DOOH, deeper frequency control, advanced audience architecture, view-through measurement, or enterprise-level programmatic buying beyond the Google network.",
  },
  {
    question: "Is DV360 only for big companies?",
    answer:
      "DV360 is best suited for businesses with serious media investment, complex funnels, or agency-supported programmatic operations. Many brands use a hybrid model where they own the data and seat while specialists manage daily trading.",
  },
  {
    question: "Can DV360 support automation?",
    answer:
      "Yes. DV360 API and Structured Data Files can support bulk campaign management, workflow automation, resource retrieval, and large-scale updates.",
  },
  {
    question: "What makes DV360 better for brand safety?",
    answer:
      "DV360 can combine curated inventory, publisher deals, verification workflows, frequency controls, private marketplaces, and third-party verification partners to reduce risk.",
  },
];

export default function DV360ServicePage() {
  const [activeModule, setActiveModule] = useState(0);
  const active = useMemo(() => platformModules[activeModule], [activeModule]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % platformModules.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#070711] text-white font-kumbh pt-16 md:pt-20">
      <JsonLd />

      {/* global illusions */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(211,50,92,0.22),transparent_34%),radial-gradient(circle_at_80%_28%,rgba(239,128,48,0.14),transparent_28%),radial-gradient(circle_at_10%_70%,rgba(105,93,251,0.13),transparent_30%)]" />

      <HeroSection />
      <StatsStrip />
      <ProblemSection />
      <ModuleOrbitSection
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        active={active}
      />
      <ChannelUniverse />
      <AIStrategySection />
      <AdSizeVisualSection />
      <PrivacySection />
      <WorkflowSection />
      <ComparisonSection />
      <ReportingSection />
      <EngagementModelSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden">
      <FloatingOrbs />

      <div className="container mx-auto grid min-h-screen grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-md">
            <Sparkles className="h-4 w-4" style={{ color: BRAND }} />
            Enterprise Programmatic Advertising
          </div>

          <h1 className="max-w-[850px] text-[46px] font-semibold leading-[0.95] tracking-[-0.07em] text-white sm:text-[74px] lg:text-[112px]">
            DV360 Media Buying That Feels{" "}
            <span className="bg-[linear-gradient(90deg,#d3325c,#ff8a3d)] bg-clip-text text-transparent">
              Intelligent.
            </span>
          </h1>

          <p className="mt-7 max-w-[720px] text-[16px] leading-[1.85] text-white/68 sm:text-[18px]">
            We help brands move beyond fragmented ad buying with Google Display
            & Video 360 — unifying media planning, premium inventory, audience
            architecture, creative QA, reporting, and optimization into one
            enterprise-grade growth system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["CTV", "Audio", "DOOH", "Video", "Display", "In-App"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-[13px] font-semibold text-white/80 backdrop-blur"
                >
                  {item}
                </span>
              )
            )}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#d3325c] px-8 text-[14px] font-bold text-white shadow-[0_18px_60px_rgba(211,50,92,0.38)] transition duration-300 hover:scale-[1.03] hover:bg-[#be2b52]">
              Get DV360 Strategy
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>

            <button className="inline-flex h-[50px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-8 text-[14px] font-bold text-white/85 backdrop-blur transition duration-300 hover:border-white/30 hover:bg-white/[0.1]">
              View Capabilities
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute inset-0 rounded-[48px] bg-[#d3325c]/40 blur-[70px]" />

          <div className="relative overflow-hidden rounded-[42px] border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_10%,rgba(211,50,92,0.25),transparent_38%)]" />

            <div className="relative rounded-[32px] border border-white/10 bg-black/30 p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                    Live Media Command Center
                  </p>
                  <h2 className="mt-1 text-[22px] font-semibold text-white">
                    DV360 Performance
                  </h2>
                </div>

                <div className="rounded-full bg-[#d3325c]/20 px-3 py-1 text-[12px] font-bold text-[#ff8aa8]">
                  +28.4%
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Impressions", "18.4M"],
                  ["Reach", "4.2M"],
                  ["ROAS", "6.8x"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <p className="text-[11px] text-white/45">{label}</p>
                    <p className="mt-2 text-[24px] font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[#080811] p-4">
                <div className="flex h-[210px] items-end gap-2">
                  {[34, 58, 42, 76, 52, 88, 62, 96, 72, 108, 86, 124].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#d3325c,#ff8a3d)] opacity-80 transition duration-500 hover:opacity-100"
                        style={{
                          height: `${height}px`,
                          animation: `barRise 1s ease ${index * 0.06}s both`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MiniSignal title="Brand Safety" value="Verified" />
                <MiniSignal title="Supply Path" value="Optimized" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimationStyles />
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-white/[0.035] backdrop-blur-xl">
      <div className="container mx-auto grid gap-4 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
        {[
          ["80+", "Ad exchanges & premium paths"],
          ["5", "Integrated DV360 modules"],
          ["6", "Major omnichannel formats"],
          ["1", "Unified enterprise workflow"],
        ].map(([value, label]) => (
          <div key={label} className="text-center md:text-left">
            <p className="text-[34px] font-bold text-white">{value}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/55">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Why DV360 Management Matters"
          title="Programmatic growth fails when strategy, data, creative, and reporting are disconnected."
          description="Our DV360 service is built for brands that need enterprise-level orchestration, not just campaign setup."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((item) => (
            <GlassCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleOrbitSection({
  activeModule,
  setActiveModule,
  active,
}: {
  activeModule: number;
  setActiveModule: React.Dispatch<React.SetStateAction<number>>;
  active: (typeof platformModules)[number];
}) {
  const ActiveIcon = active.icon;

  return (
    <section className="relative z-10 overflow-hidden py-20 lg:py-28">
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d3325c]/15 blur-[130px]" />

      <div className="container relative mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="DV360 Architecture"
          title="Five connected modules working like one campaign operating system."
          description="This circular interaction mirrors the campaign lifecycle — planning, audience activation, creative delivery, inventory selection, and performance learning."
        />

        <div className="mt-16 hidden justify-center md:flex">
          <div className="relative h-[620px] w-full max-w-[760px]">
            <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03]">
              <div className="absolute inset-6 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-white/20" />
              <div className="absolute inset-16 rounded-full bg-[conic-gradient(from_90deg,#d3325c,#ff8a3d,#685dfb,#d3325c)] opacity-25 blur-md" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-20 flex h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-[#090914]/95 p-8 text-center shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div
                key={active.title}
                className="animate-[featurePop_0.55s_ease_both]"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d3325c] text-white shadow-[0_18px_40px_rgba(211,50,92,0.45)]">
                  <ActiveIcon className="h-6 w-6" />
                </span>

                <h3 className="text-[24px] font-semibold text-white">
                  {active.title}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.65] text-white/65">
                  {active.description}
                </p>
              </div>
            </div>

            {platformModules.map((item, index) => {
              const Icon = item.icon;
              const angle = (360 / platformModules.length) * index - 90;
              const radius = 255;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isActive = index === activeModule;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveModule(index)}
                  className="absolute left-1/2 top-1/2 z-30 transition-all duration-500"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div
                    className={[
                      "flex h-[112px] w-[178px] flex-col items-center justify-center gap-2 rounded-[28px] border p-4 text-center shadow-xl backdrop-blur-xl transition-all duration-500",
                      isActive
                        ? "scale-110 border-[#ff8a3d]/70 bg-[#d3325c] text-white shadow-[0_24px_70px_rgba(211,50,92,0.45)]"
                        : "border-white/10 bg-white/[0.08] text-white/70 hover:scale-105 hover:border-white/25 hover:bg-white/[0.12]",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[13px] font-bold">{item.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {platformModules.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeModule;

            return (
              <button
                key={item.title}
                onClick={() => setActiveModule(index)}
                className={[
                  "rounded-[26px] border p-5 text-left transition-all",
                  isActive
                    ? "border-[#ff8a3d]/60 bg-[#d3325c]"
                    : "border-white/10 bg-white/[0.07]",
                ].join(" ")}
              >
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChannelUniverse() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff8aa8]">
              Omnichannel Expansion
            </p>
            <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.05em] sm:text-[52px]">
              Reach people across every premium digital environment.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-white/65">
              DV360 helps brands move beyond basic banner buying into an
              omnichannel strategy across display, video, CTV, DOOH, audio, and
              mobile app environments.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[30px] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#d3325c]/70 hover:bg-white/[0.11]"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d3325c] shadow-[0_15px_40px_rgba(211,50,92,0.35)] transition group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-[20px] font-bold">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIStrategySection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff8aa8]">
                Google AI + Programmatic Strategy
              </p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.05em] sm:text-[52px]">
                From manual trading to AI-assisted media intelligence.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-white/65">
                Modern DV360 campaigns use AI to reduce operational friction,
                accelerate audience planning, generate creative variations, and
                simplify reporting for stakeholders.
              </p>
            </div>

            <div className="grid gap-4">
              {aiFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-5 rounded-[28px] border border-white/10 bg-black/20 p-5 transition hover:border-[#d3325c]/60 hover:bg-black/30"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d3325c]/20 text-[#ff8aa8]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[18px] font-bold">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.7] text-white/62">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdSizeVisualSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Ad Format Visualization"
          title="Plan creative dimensions around where attention actually happens."
          description="Use this section as a visual way to explain standard programmatic display sizes and their strategic role."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {adSizes.map((item, index) => (
            <div
              key={item.size}
              className="group rounded-[32px] border border-white/10 bg-white/[0.065] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#d3325c]/60"
            >
              <div className="relative mb-5 flex h-[180px] items-center justify-center overflow-hidden rounded-[24px] bg-black/30">
                <div
                  className="rounded-xl border border-[#d3325c]/70 bg-[#d3325c]/25 shadow-[0_0_45px_rgba(211,50,92,0.35)] transition duration-500 group-hover:scale-105"
                  style={{
                    width:
                      index === 0
                        ? "150px"
                        : index === 1
                          ? "130px"
                          : index === 2
                            ? "190px"
                            : index === 3
                              ? "105px"
                              : index === 4
                                ? "120px"
                                : "210px",
                    height:
                      index === 0
                        ? "34px"
                        : index === 1
                          ? "105px"
                          : index === 2
                            ? "36px"
                            : index === 3
                              ? "155px"
                              : index === 4
                                ? "160px"
                                : "60px",
                  }}
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/65">
                  {item.size}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[19px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-white/60">
                    {item.usage}
                  </p>
                </div>
                <span className="rounded-full bg-[#d3325c]/20 px-3 py-1 text-[12px] font-bold text-[#ff8aa8]">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Privacy-Ready Targeting"
          title="Built for a world with fewer deterministic signals."
          description="A future-proof DV360 setup combines first-party data, privacy-safe identity, contextual intelligence, and high-quality inventory."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {privacyCards.map((item) => (
            <GlassCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Our Execution Model"
          title="A clear workflow for complex programmatic campaigns."
          description="This layout helps users understand your agency process without overwhelming them with technical platform language."
        />

        <div className="relative mt-14">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-white/10 lg:block" />

          <div className="grid gap-5">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group grid gap-5 rounded-[32px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-500 hover:border-[#d3325c]/60 lg:grid-cols-[80px_1fr]"
                >
                  <div className="relative flex items-start justify-center">
                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#d3325c] shadow-[0_18px_45px_rgba(211,50,92,0.35)] transition group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff8aa8]">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-[24px] font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.75] text-white/62">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Google Ads vs DV360"
          title="Know when to scale from direct-response ads to enterprise media buying."
          description="Google Ads captures demand. DV360 helps create, influence, and measure demand across premium programmatic channels."
        />

        <div className="mt-12 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] backdrop-blur-xl">
          <div className="hidden grid-cols-[0.75fr_1fr_1fr] border-b border-white/10 bg-white/[0.06] lg:grid">
            <div className="p-5 text-[12px] font-bold uppercase tracking-[0.22em] text-white/45">
              Capability
            </div>
            <div className="p-5 text-[22px] font-bold">Google Ads</div>
            <div className="bg-[#d3325c]/20 p-5 text-[22px] font-bold">
              Display & Video 360
            </div>
          </div>

          {comparisonRows.map((row) => (
            <div
              key={row.feature}
              className="grid border-b border-white/10 last:border-b-0 lg:grid-cols-[0.75fr_1fr_1fr]"
            >
              <div className="p-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ff8aa8]">
                  {row.feature}
                </p>
              </div>
              <div className="p-5">
                <p className="mb-2 text-[13px] font-bold text-white lg:hidden">
                  Google Ads
                </p>
                <p className="text-[14px] leading-[1.65] text-white/62">
                  {row.googleAds}
                </p>
              </div>
              <div className="bg-white/[0.03] p-5">
                <p className="mb-2 text-[13px] font-bold text-white lg:hidden">
                  DV360
                </p>
                <p className="text-[14px] leading-[1.65] text-white/82">
                  {row.dv360}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportingSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff8aa8]">
              Reporting & Technical Credibility
            </p>
            <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.05em] sm:text-[52px]">
              Show clients the numbers that matter, not vanity metrics.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-white/65">
              Your service page should make reporting feel simple: impressions,
              clicks, cost, site-level quality, view-through influence, audience
              performance, and business impact.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Executive scorecards",
                "Cross-channel ROAS",
                "Placement quality",
                "View-through impact",
                "SDF/API automation",
                "YouTube & Partners scale",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#ff8aa8]" />
                  <span className="text-[14px] text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[38px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[28px] bg-black/30 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[22px] font-bold">Media Dashboard</h3>
                <div className="rounded-full bg-[#d3325c]/20 px-3 py-1 text-[12px] font-bold text-[#ff8aa8]">
                  Live
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DashboardMetric label="Spend Efficiency" value="84%" />
                <DashboardMetric label="Verified Reach" value="92%" />
                <DashboardMetric label="Frequency Health" value="Good" />
                <DashboardMetric label="Supply Quality" value="High" />
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                <div className="space-y-4">
                  {[
                    ["CTV", "86%"],
                    ["Video", "74%"],
                    ["Display", "68%"],
                    ["Audio", "52%"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-2 flex justify-between text-[12px] text-white/55">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#d3325c]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-white/45">
                Visual placeholder for your sanitized programmatic reporting UI.
                Replace with your dashboard screenshot or SVG illustration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EngagementModelSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(135deg,rgba(211,50,92,0.28),rgba(255,255,255,0.06))] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#ffb2c6]">
                Hybrid In-Housing Model
              </p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.05em] sm:text-[52px]">
                You own the seat and data. We execute the complex trading.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-white/70">
                This model gives brands financial transparency, data ownership,
                and expert execution without the risk of relying on one internal
                programmatic specialist.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Client Owns",
                  points: ["DV360 seat", "First-party data", "Business goals"],
                  icon: Building2,
                },
                {
                  title: "Agency Runs",
                  points: ["Trading", "QA", "Optimization"],
                  icon: Network,
                },
                {
                  title: "Together Scale",
                  points: ["Insights", "Reporting", "Growth loops"],
                  icon: CircleDollarSign,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-white/10 bg-black/20 p-5"
                  >
                    <Icon className="mb-5 h-7 w-7 text-[#ffb2c6]" />
                    <h3 className="text-[18px] font-bold">{item.title}</h3>
                    <div className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <p
                          key={point}
                          className="flex items-center gap-2 text-[13px] text-white/65"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb2c6]" />
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions enterprise clients usually ask before starting DV360."
          description="This section improves SEO and helps serious leads understand your technical capability."
        />

        <div className="mx-auto mt-12 max-w-[980px] space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
            >
              <summary className="cursor-pointer list-none text-[17px] font-bold text-white">
                <div className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="rounded-full bg-[#d3325c]/20 p-2 text-[#ff8aa8] transition group-open:rotate-90">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </summary>
              <p className="mt-4 text-[14px] leading-[1.75] text-white/62">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative z-10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="container mx-auto overflow-hidden rounded-[44px] border border-white/10 bg-[#d3325c] p-8 text-center shadow-[0_30px_100px_rgba(211,50,92,0.35)] sm:p-12 lg:p-16">
        <h2 className="mx-auto max-w-[820px] text-[34px] font-semibold tracking-[-0.05em] sm:text-[54px]">
          Ready to turn programmatic complexity into measurable growth?
        </h2>
        <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.8] text-white/78">
          Let’s architect a DV360 strategy across premium inventory, privacy-safe
          data, AI-assisted creative, and transparent reporting.
        </p>

        <button className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-white px-8 text-[14px] font-bold text-[#d3325c] transition duration-300 hover:scale-[1.03]">
          Get Quote
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-[900px] text-center">
      <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff8aa8]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[34px] font-semibold leading-tight tracking-[-0.05em] text-white sm:text-[52px]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.8] text-white/62 sm:text-[17px]">
        {description}
      </p>
    </div>
  );
}

function GlassCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.065] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#d3325c]/60 hover:bg-white/[0.1]">
      <div className="absolute right-[-50px] top-[-50px] h-[130px] w-[130px] rounded-full bg-[#d3325c]/0 blur-2xl transition duration-500 group-hover:bg-[#d3325c]/30" />
      <span className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d3325c] shadow-[0_15px_40px_rgba(211,50,92,0.35)] transition group-hover:scale-110 group-hover:rotate-6">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <h3 className="relative text-[20px] font-bold">{title}</h3>
      <p className="relative mt-3 text-[14px] leading-[1.7] text-white/62">
        {description}
      </p>
    </div>
  );
}

function MiniSignal({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-[11px] text-white/45">{title}</p>
      <p className="mt-2 text-[16px] font-bold text-white">{value}</p>
    </div>
  );
}

function DashboardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-[11px] text-white/45">{label}</p>
      <p className="mt-2 text-[22px] font-bold text-white">{value}</p>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[18%] h-24 w-24 animate-[floatOne_7s_ease-in-out_infinite] rounded-full border border-[#d3325c]/40 bg-[#d3325c]/10 blur-[1px]" />
      <div className="absolute right-[12%] top-[16%] h-16 w-16 animate-[floatTwo_8s_ease-in-out_infinite] rounded-full border border-white/15 bg-white/5" />
      <div className="absolute bottom-[16%] left-[48%] h-28 w-28 animate-[floatThree_9s_ease-in-out_infinite] rounded-full border border-[#ff8a3d]/30 bg-[#ff8a3d]/10" />
    </div>
  );
}

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DV360 Programmatic Advertising Management",
    serviceType: "Display & Video 360 Media Buying",
    description:
      "Enterprise DV360 programmatic advertising service for omnichannel media buying, CTV, audio, DOOH, reporting, audience strategy, and campaign optimization.",
    provider: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_COMPANY_NAME,
    },
    areaServed: "Tamil Nadu, India"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function AnimationStyles() {
  return (
    <style jsx global>{`
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

      @keyframes barRise {
        0% {
          height: 0;
          opacity: 0;
        }
        100% {
          opacity: 0.8;
        }
      }

      @keyframes floatOne {
        0%,
        100% {
          transform: translate3d(0, 0, 0);
        }
        50% {
          transform: translate3d(34px, -28px, 0);
        }
      }

      @keyframes floatTwo {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(-28px, 36px, 0) scale(1.12);
        }
      }

      @keyframes floatThree {
        0%,
        100% {
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
        50% {
          transform: translate3d(24px, 24px, 0) rotate(12deg);
        }
      }

      html {
        scroll-behavior: smooth;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}
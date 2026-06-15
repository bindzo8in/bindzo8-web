import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import React from "react";

const processSteps = [
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
];

function ProcessContent() {
  return (
    <HorizontalSlide className="flex min-h-screen flex-col justify-center text-white">
      <section className="w-full px-5 py-16 font-kumbh sm:px-8 lg:px-12 lg:py-[95px] xl:px-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <header className="mb-8 sm:mb-12 lg:mb-16">
            <h4 className="text-[22px] font-semibold tracking-tight text-[#d3325c] sm:text-[28px] lg:text-[32px]">
              Process:
            </h4>
          </header>

          {/* Mobile / Tablet Card Layout */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
            {processSteps.map((step) => (
              <ProcessCard key={step.title} title={step.title} items={step.items} />
            ))}
          </div>

          {/* Desktop Column Layout */}
          <div className="hidden grid-cols-3 lg:grid">
            <div className="space-y-16 border-r border-white/40 pr-10">
              <ListBlock
                title={processSteps[0].title}
                items={processSteps[0].items}
              />
              <ListBlock
                title={processSteps[1].title}
                items={processSteps[1].items}
              />
            </div>

            <div className="space-y-16 border-r border-white/40 px-10">
              <ListBlock
                title={processSteps[2].title}
                items={processSteps[2].items}
              />
              <ListBlock
                title={processSteps[3].title}
                items={processSteps[3].items}
              />
            </div>

            <div className="space-y-16 pl-10">
              <ListBlock
                title={processSteps[4].title}
                items={processSteps[4].items}
              />
              <ListBlock
                title={processSteps[5].title}
                items={processSteps[5].items}
              />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}

export default ProcessContent;

/* ---------------- HELPERS ---------------- */

function ProcessCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const stepNumber = title.split(".")[0];
  const stepTitle = title.replace(`${stepNumber}. `, "");

  return (
    <article className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d3325c] text-[18px] font-bold text-white">
          {stepNumber}
        </span>

        <h3 className="pt-1 text-[21px] font-semibold leading-tight text-white sm:text-[24px]">
          {stepTitle}
        </h3>
      </div>

      <ul className="space-y-3 text-[15px] leading-relaxed text-white/85 sm:text-[16px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d3325c]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ListBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="parallax-item">
      <h3 className="mb-6 text-[clamp(1.45rem,2vw,2.4rem)] font-semibold text-white">
        {title}
      </h3>

      <ul className="space-y-4 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug text-white/95">
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
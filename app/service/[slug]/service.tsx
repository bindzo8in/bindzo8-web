"use client";

import Image from "next/image";
import QuoteModal from "../contact";

export type Feature = {
  title: string;
  description: string;
};

export type MarketingSectionProps = {
  title: string;
  media: string;
  heroLabel: string;
  heroDescription: string;
  features: Feature[];
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function MarketingSection({
  title,
  media,
  heroLabel,
  heroDescription,
  features,
  ctaLabel = "Get Quote",
  onCtaClick,
}: MarketingSectionProps) {
  return (
    <section className="w-full bg-white font-kumbh">
      <div className="relative w-full overflow-hidden">
        {/* Top gradient area */}
        <div className="relative min-h-[520px] bg-[linear-gradient(115deg,#FFF1F1_0%,#FFFFFF_42%,#EEFFF8_100%)]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="pt-10 text-center text-[26px] font-medium leading-tight text-[#D40000] sm:text-[32px]">
              {title}
            </h2>

            <div className="grid min-h-[420px] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-0">
              {/* Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative flex w-full max-w-[420px] items-center justify-center">
                  <Image
                    src={media}
                    alt={title}
                    width={420}
                    height={360}
                    className="h-auto w-full max-w-[360px] object-contain sm:max-w-[420px]"
                    priority
                  />
                </div>
              </div>

              {/* Hero text */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-full max-w-[620px] text-center lg:text-left">
                  <p className="text-[15px] leading-[1.35] text-black sm:text-[16px]">
                    <span className="font-bold">{heroLabel}</span>{" "}
                    {heroDescription}
                  </p>

                  {ctaLabel && (
                    <QuoteModal service={title}>
                    <button
                      type="button"
                      // onClick={onCtaClick}
                      className="mt-5 inline-flex h-[28px] min-w-[190px] items-center justify-center rounded-full bg-[#c42b47] px-8 text-[12px] font-medium text-white shadow-[0_4px_6px_rgba(0,0,0,0.25)] transition hover:bg-[#d6244e]"
                    >
                      <span>{ctaLabel}</span>
                      <span className="ml-4 text-[16px] leading-none">→</span>
                    </button>
                    </QuoteModal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom soft gradient area */}
        <div className="relative bg-[radial-gradient(circle_at_58%_5%,rgba(202,204,255,0.72)_0%,rgba(226,228,255,0.45)_28%,rgba(255,255,255,1)_62%)]">
          <div className="container mx-auto px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="max-w-[980px] space-y-7">
              {features.map((feature, index) => (
                <div key={`${feature.title}-${index}`}>
                  <h3 className="text-[15px] font-bold leading-tight text-black sm:text-[16px]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.35] text-black sm:text-[15px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
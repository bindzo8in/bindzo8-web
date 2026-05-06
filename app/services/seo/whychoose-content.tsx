import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const whyChoosePoints = [
  "Industry-specific strategies",
  "Expert team with modern tools",
  "Transparent communication & reporting",
  "Focus on real results, not just ranking",
  "Long-term growth-oriented approach",
  "Ethical, white-hat SEO practices",
];

const benefitsPoints = [
  "Higher visibility on Google",
  "Organic and long-lasting traffic",
  "Increased leads and conversions",
  "Strong brand trust and authority",
  "Cost-effective compared to paid ads",
  "Better user experience and engagement",
  "Competitive advantage in your industry",
];

const reportingPoints = [
  "Monthly performance reports",
  "Keyword ranking updates",
  "Traffic growth analysis",
  "Conversion tracking",
  "Competitor movement insights",
];

export default function SeoWhyChooseContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center gap-10 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8 xl:gap-12">
          {/* Left Image */}
          <div className="relative z-10 flex w-full items-center justify-center lg:h-full lg:justify-center">
            <div className="relative h-[300px] w-full max-w-[520px] sm:h-[420px] sm:max-w-[620px] md:h-[480px] lg:h-[56vh] lg:max-h-[520px] lg:max-w-[620px] xl:h-[62vh] xl:max-h-[600px] xl:max-w-[700px]">
              <Image
                src="/wcu.png"
                alt="SEO analytics illustration"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 700px"
                className="object-contain"
              />
            </div>
          </div>

{/* Right Content */}
<div className="relative z-10 w-full lg:max-w-[560px] xl:max-w-[620px]">
  <div className="space-y-8 sm:space-y-9 lg:space-y-5 xl:space-y-6">
    <div>
      <h2 className="text-[21px] font-bold leading-[1.15] text-[#EF8030] sm:text-[25px] lg:text-[17px] xl:text-[19px]">
        Why Choose Bindzo 8 for SEO?
      </h2>

      <ul className="mt-4 space-y-2 text-white/80 lg:mt-3 lg:space-y-1.5">
        {whyChoosePoints.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-[15px] font-normal leading-[1.45] sm:text-[17px] lg:text-[13px] lg:leading-[1.35] xl:text-[14px]"
          >
            <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF8030]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-[21px] font-bold leading-[1.15] text-[#EF8030] sm:text-[25px] lg:text-[17px] xl:text-[19px]">
        Benefits of SEO with Bindzo 8
      </h3>

      <ul className="mt-4 space-y-2 text-white/80 lg:mt-3 lg:space-y-1.5">
        {benefitsPoints.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-[15px] font-normal leading-[1.45] sm:text-[17px] lg:text-[13px] lg:leading-[1.35] xl:text-[14px]"
          >
            <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF8030]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-[21px] font-bold leading-[1.15] text-[#EF8030] sm:text-[25px] lg:text-[17px] xl:text-[19px]">
        Performance Tracking & Reporting
      </h3>

      <div className="mt-4 space-y-2 text-[15px] font-normal leading-[1.45] text-white/80 sm:text-[17px] lg:mt-3 lg:text-[13px] lg:leading-[1.35] xl:text-[14px]">
        <p className="text-white/90">
          SEO is measurable and we keep everything transparent.
        </p>

        <p className="font-medium text-white">You’ll receive:</p>

        <ul className="space-y-1.5">
          {reportingPoints.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF8030]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="text-white/90">
          This helps you understand the exact value SEO is bringing to your
          business.
        </p>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
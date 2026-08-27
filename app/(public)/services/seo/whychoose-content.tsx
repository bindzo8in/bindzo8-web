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
      <section
        className="
          relative w-full overflow-hidden px-5 py-12 font-kumbh
          sm:px-8 sm:py-16

          lg:h-screen
          lg:px-12
          lg:py-0

          xl:px-20
        "
      >
        <div
          className="
            mx-auto flex h-full w-full max-w-[1500px] flex-col gap-8

            lg:grid
            lg:grid-cols-[0.95fr_1.05fr]
            lg:items-center
            lg:justify-center
            lg:gap-8

            xl:gap-12
          "
        >
          {/* Mobile Heading */}
          <div className="relative z-10 lg:hidden">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#d3325c]">
              Why Choose Us
            </p>

            <h2 className="max-w-[340px] text-[28px] font-semibold leading-tight text-white">
              SEO that focuses on ranking, traffic, and real business growth
            </h2>

            <p className="mt-3 max-w-[360px] text-[14px] leading-relaxed text-white/70">
              We combine strategy, technical optimization, content, reporting,
              and ethical SEO practices to improve your online visibility.
            </p>
          </div>

          {/* Left Image */}
          <div
            className="
              relative z-10 flex w-full items-center justify-center

              lg:h-full
              lg:justify-center
            "
          >
            <div
              className="
                relative h-[260px] w-full max-w-[360px]

                sm:h-[380px]
                sm:max-w-[560px]

                md:h-[430px]
                md:max-w-[620px]

                lg:h-[56vh]
                lg:max-h-[520px]
                lg:max-w-[620px]

                xl:h-[62vh]
                xl:max-h-[600px]
                xl:max-w-[700px]
              "
            >
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
          <div
            className="
              relative z-10 w-full

              lg:max-w-[560px]

              xl:max-w-[620px]
            "
          >
            <div
              className="
                grid grid-cols-1 gap-4

                md:grid-cols-2

                lg:block
                lg:space-y-5

                xl:space-y-6
              "
            >
              {/* Why Choose */}
              <div
                className="
                  rounded-[22px] border border-white/10 bg-white/[0.06]
                  p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]
                  backdrop-blur-md

                  lg:rounded-none
                  lg:border-0
                  lg:bg-transparent
                  lg:p-0
                  lg:shadow-none
                  lg:backdrop-blur-0
                "
              >
                <h2
                  className="
                    text-[19px] font-bold leading-[1.2] text-[#d3325c]

                    sm:text-[22px]

                    lg:text-[17px]

                    xl:text-[19px]
                  "
                >
                  Why Choose Bindzo 8 for SEO?
                </h2>

                <ul
                  className="
                    mt-4 space-y-2.5 text-white/80

                    lg:mt-3
                    lg:space-y-1.5
                  "
                >
                  {whyChoosePoints.map((point) => (
                    <li
                      key={point}
                      className="
                        flex gap-3 text-[14px] font-normal leading-[1.55]

                        sm:text-[15px]

                        lg:text-[13px]
                        lg:leading-[1.35]

                        xl:text-[14px]
                      "
                    >
                      <span
                        className="
                          mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d3325c]
                        "
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div
                className="
                  rounded-[22px] border border-white/10 bg-white/[0.06]
                  p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]
                  backdrop-blur-md

                  lg:rounded-none
                  lg:border-0
                  lg:bg-transparent
                  lg:p-0
                  lg:shadow-none
                  lg:backdrop-blur-0
                "
              >
                <h3
                  className="
                    text-[19px] font-bold leading-[1.2] text-[#d3325c]

                    sm:text-[22px]

                    lg:text-[17px]

                    xl:text-[19px]
                  "
                >
                  Benefits of SEO with Bindzo 8
                </h3>

                <ul
                  className="
                    mt-4 space-y-2.5 text-white/80

                    lg:mt-3
                    lg:space-y-1.5
                  "
                >
                  {benefitsPoints.map((point) => (
                    <li
                      key={point}
                      className="
                        flex gap-3 text-[14px] font-normal leading-[1.55]

                        sm:text-[15px]

                        lg:text-[13px]
                        lg:leading-[1.35]

                        xl:text-[14px]
                      "
                    >
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d3325c]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reporting */}
              <div
                className="
                  rounded-[22px] border border-white/10 bg-white/[0.06]
                  p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]
                  backdrop-blur-md

                  md:col-span-2

                  lg:col-span-auto
                  lg:rounded-none
                  lg:border-0
                  lg:bg-transparent
                  lg:p-0
                  lg:shadow-none
                  lg:backdrop-blur-0
                "
              >
                <h3
                  className="
                    text-[19px] font-bold leading-[1.2] text-[#d3325c]

                    sm:text-[22px]

                    lg:text-[17px]

                    xl:text-[19px]
                  "
                >
                  Performance Tracking & Reporting
                </h3>

                <div
                  className="
                    mt-4 space-y-3 text-[14px] font-normal leading-[1.55]
                    text-white/80

                    sm:text-[15px]

                    lg:mt-3
                    lg:space-y-2
                    lg:text-[13px]
                    lg:leading-[1.35]

                    xl:text-[14px]
                  "
                >
                  <p className="text-white/90">
                    SEO is measurable and we keep everything transparent.
                  </p>

                  <p className="font-medium text-white">You’ll receive:</p>

                  <ul
                    className="
                      grid grid-cols-1 gap-2

                      sm:grid-cols-2

                      lg:block
                      lg:space-y-1.5
                    "
                  >
                    {reportingPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d3325c]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-white/90">
                    This helps you understand the exact value SEO is bringing to
                    your business.
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
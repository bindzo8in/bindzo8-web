import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const videoOffers = [
  {
    title: "Professional Video Refinement",
    desc: "We edit, trim, and refine every clip to create smooth flow, perfect pacing, and clean visuals.",
  },
  {
    title: "Creative Storytelling",
    desc: "Your video is shaped into a compelling narrative using transitions, effects, music, and thoughtful sequencing.",
  },
  {
    title: "Color Correction & Grading",
    desc: "Balanced colors, enhanced tones, and cinematic grading to give your video a polished, premium look.",
  },
  {
    title: "Sound Design & Audio Cleanup",
    desc: "Noise reduction, audio balancing, soundtrack selection, and crisp voice enhancement for a high-quality sound experience.",
  },
  {
    title: "Motion Graphics & Text Animation",
    desc: "Animated titles, lower thirds, infographics, and motion elements to make your content more engaging.",
  },
  {
    title: "Social Media Optimized Edits",
    desc: "Vertical, square, and widescreen versions for platforms like Instagram, YouTube, Facebook, and Reels/Shorts.",
  },
  {
    title: "Brand-Focused Output",
    desc: "Every video aligns with your brand style — fonts, tone, colors, and messaging included flawlessly.",
  },
];

export default function VideoEditingOfferContent() {
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
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#EF8030]">
              Video Editing
            </p>

            <h2 className="max-w-[340px] text-[28px] font-semibold leading-tight text-white">
              Professional edits that make every video feel premium
            </h2>

            <p className="mt-3 max-w-[360px] text-[14px] leading-relaxed text-white/70">
              From storytelling to motion graphics, we refine your videos for
              brand, platform, and audience impact.
            </p>
          </div>

          {/* Left Content */}
          <div
            className="
              relative z-10 order-2 w-full

              lg:order-none
              lg:max-w-[620px]

              xl:max-w-[700px]
            "
          >
            <h2
              className="
                mb-8 hidden text-[28px] font-bold leading-none text-[#EF8030]

                lg:block
                lg:mb-7
                lg:text-[28px]

                xl:text-[34px]
              "
            >
              What We Offer
            </h2>

            <div
              className="
                grid grid-cols-1 gap-4

                sm:grid-cols-2
                sm:gap-5

                lg:block
                lg:space-y-5

                xl:space-y-6
              "
            >
              {videoOffers.map((item, index) => (
                <div
                  key={item.title}
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
                      text-[15px] font-bold leading-[1.25] text-white

                      sm:text-[16px]

                      lg:text-[16px]
                      lg:leading-[1.15]

                      xl:text-[18px]
                    "
                  >
                    <span className="mr-2 text-[#EF8030] lg:hidden">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2 text-[13px] font-normal leading-relaxed text-white/75

                      sm:text-[14px]

                      lg:mt-1
                      lg:max-w-[690px]
                      lg:text-[14.5px]
                      lg:leading-[1.22]
                      lg:text-white/95

                      xl:text-[16px]
                      xl:leading-[1.25]
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div
            className="
              relative z-10 order-1 flex w-full items-center justify-center

              lg:order-none
              lg:h-full
              lg:justify-end
            "
          >
            <div
              className="
                relative h-[280px] w-full max-w-[390px]

                sm:h-[420px]
                sm:max-w-[620px]

                md:h-[480px]
                md:max-w-[700px]

                lg:h-[62vh]
                lg:max-h-[580px]
                lg:max-w-[740px]

                xl:h-[68vh]
                xl:max-h-[680px]
                xl:max-w-[860px]
              "
            >
              <Image
                src="/gurl.png"
                alt="Video editing professional illustration"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52vw, 860px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
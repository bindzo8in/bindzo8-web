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
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center gap-10 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8 xl:gap-12">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:max-w-[620px] xl:max-w-[700px]">
            <h2 className="mb-8 text-[28px] font-bold leading-none text-[#EF8030] sm:text-[34px] lg:mb-7 lg:text-[28px] xl:text-[34px]">
              What We Offer
            </h2>

            <div className="space-y-6 sm:space-y-7 lg:space-y-5 xl:space-y-6">
              {videoOffers.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[16px] font-bold leading-[1.15] sm:text-[18px] lg:text-[16px] xl:text-[18px]">
                    {item.title}
                  </h3>

                  <p className="mt-1 max-w-[690px] text-[14px] font-normal leading-[1.3] text-white/95 sm:text-[16px] lg:text-[14.5px] lg:leading-[1.22] xl:text-[16px] xl:leading-[1.25]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 flex w-full items-center justify-center lg:h-full lg:justify-end">
            <div className="relative h-[330px] w-full max-w-[620px] sm:h-[460px] sm:max-w-[760px] md:h-[520px] lg:h-[62vh] lg:max-h-[580px] lg:max-w-[740px] xl:h-[68vh] xl:max-h-[680px] xl:max-w-[860px]">
              <Image
                src="/video-editing/video-editor.png"
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
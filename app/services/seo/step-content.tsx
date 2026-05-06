import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";

const usageList = [
  "Ranking product pages",
  "Improving brand visibility",
  "Increasing blog traffic",
  "Local business optimization",
  "Lead generation",
];

const techList = [
  "Meta Ads Manager",
  "Google Ads",
  "Google Analytics",
  "Canva, Photoshop, Illustrator",
  "Mailchimp / SendGrid",
  "Keyword research tools (SEMrush, Ahrefs)",
];

const images = [
  {
    src: "/seo_step_slide/1.png",
    alt: "Mobile app infographic",
    className: "left-[8%] top-[4%] w-[240px] xl:w-[260px]",
  },
  {
    src: "/seo_step_slide/2.png",
    alt: "Mobile app screens",
    className: "left-[28%] top-[34%] w-[245px] xl:w-[265px]",
  },
  {
    src: "/seo_step_slide/3.png",
    alt: "Mobile app AI interface",
    className: "left-[48%] bottom-[1%] w-[270px] xl:w-[300px]",
  },
];

export default function UsageContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <div className="relative z-10 mx-auto grid h-[calc(100%-96px)] w-full max-w-[1280px] grid-cols-1 items-center gap-6 px-5 md:grid-cols-[0.9fr_1.1fr] lg:px-10">
        {/* Left text */}
        <div className="grid w-full max-w-[620px] grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="mb-5 text-base font-bold text-orange-500 lg:text-xl">
              Usage / Use Cases
            </h2>

            <ul className="space-y-3 text-sm leading-relaxed text-white/85 lg:space-y-4 lg:text-base">
              {usageList.map((item) => (
                <li key={item} className="flex gap-3">
                  <span>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-base font-bold text-orange-500 lg:text-xl">
              Technologies Used
            </h2>

            <ul className="space-y-3 text-sm leading-relaxed text-white/85 lg:space-y-4 lg:text-base">
              {techList.map((item) => (
                <li key={item} className="flex gap-3">
                  <span>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right image stack - desktop/tablet */}
        <div className="relative hidden h-[560px] w-full md:block lg:h-[610px]">
          {images.map((image) => (
            <div
              key={image.src}
              className={`absolute rounded-[14px] border-[8px] border-white bg-white shadow-2xl ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={420}
                height={260}
                className="h-auto w-full rounded-[6px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile image stack */}
        <div className="grid max-h-[45vh] grid-cols-3 gap-3 overflow-hidden md:hidden">
          {images.map((image) => (
            <div
              key={image.src}
              className="rounded-[10px] border-[5px] border-white bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={420}
                height={260}
                className="h-auto w-full rounded-[4px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </HorizontalSlide>
  );
}
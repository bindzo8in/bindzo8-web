import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";

const usageList = [
  "E-commerce apps",
  "Service booking apps",
  "Food delivery apps",
  "Fitness apps",
  "CRM / ERP apps",
  "Education & training apps",
];

const techList = [
  "Flutter, React Native",
  "Kotlin, Swift, Java",
  "Firebase, MySQL, MongoDB",
  "REST APIs, JSON, Node.js",
];

const images = [
  {
    src: "/mobile_step_slide/1.png",
    alt: "Mobile app infographic",
    className: "left-[8%] top-[4%] w-[240px] xl:w-[260px]",
  },
  {
    src: "/mobile_step_slide/2.png",
    alt: "Mobile app screens",
    className: "left-[28%] top-[34%] w-[245px] xl:w-[265px]",
  },
  {
    src: "/mobile_step_slide/3.png",
    alt: "Mobile app AI interface",
    className: "left-[48%] bottom-[1%] w-[270px] xl:w-[300px]",
  },
];

export default function UsageContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
          <div
            className="
              relative z-10 mx-auto w-full max-w-[1280px]
    
              px-5 py-10
              sm:px-6 sm:py-12
    
              md:grid md:h-[calc(100%-96px)] md:grid-cols-[0.9fr_1.1fr]
              md:items-center md:gap-6 md:px-5 md:py-0
    
              lg:px-10
            "
          >
            {/* Mobile title */}
            <div className="mb-7 md:hidden">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-400">
                Mobile App Development
              </p>
    
              <h2 className="max-w-[340px] text-[28px] font-semibold leading-tight text-white">
                Smart app solutions for modern businesses
              </h2>
            </div>
    
            {/* Left text */}
            <div
              className="
                grid w-full max-w-[620px] grid-cols-1 gap-4
    
                md:grid-cols-2 md:gap-8
                lg:gap-12
              "
            >
              <div
                className="
                  rounded-[22px] border border-white/10 bg-white/[0.06]
                  p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-md
    
                  md:rounded-none md:border-0 md:bg-transparent md:p-0
                  md:shadow-none md:backdrop-blur-0
                "
              >
                <h2 className="mb-4 text-base font-bold text-orange-500 lg:text-xl">
                  Usage / Use Cases
                </h2>
    
                <ul className="space-y-3 text-sm leading-relaxed text-white/85 lg:space-y-4 lg:text-base">
                  {usageList.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[1px] text-orange-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
    
              <div
                className="
                  rounded-[22px] border border-white/10 bg-white/[0.06]
                  p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-md
    
                  md:rounded-none md:border-0 md:bg-transparent md:p-0
                  md:shadow-none md:backdrop-blur-0
                "
              >
                <h2 className="mb-4 text-base font-bold text-orange-500 lg:text-xl">
                  Technologies Used
                </h2>
    
                <ul className="space-y-3 text-sm leading-relaxed text-white/85 lg:space-y-4 lg:text-base">
                  {techList.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[1px] text-orange-400">•</span>
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
            <div className="mt-7 space-y-4 md:hidden">
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className={`
                    overflow-hidden rounded-[22px] border-[6px] border-white
                    bg-white shadow-[0_22px_70px_rgba(0,0,0,0.35)]
                    ${index === 1 ? "ml-8" : ""}
                    ${index === 2 ? "mr-8" : ""}
                  `}
                >
                  <div className="relative h-[170px] w-full xs:h-[190px] sm:h-[230px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HorizontalSlide>
  );
}
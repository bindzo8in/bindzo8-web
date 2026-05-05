import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const packageItems = [
  {
    name: "Gram Flour Package",
    src: "/package-designs/gram-flour.png",
    className:
      "left-[5%] top-[15%] h-[210px] w-[300px] xl:h-[260px] xl:w-[370px]",
  },
  {
    name: "Reel Box Package",
    src: "/package-designs/reel-box.png",
    className:
      "left-[37%] top-[10%] h-[150px] w-[290px] xl:h-[190px] xl:w-[370px]",
  },
  {
    name: "Turmeric Package",
    src: "/package-designs/turmeric.png",
    className:
      "right-[5%] top-[8%] h-[220px] w-[370px] xl:h-[280px] xl:w-[470px]",
  },
  {
    name: "Brochure Package Design",
    src: "/package-designs/brochure.png",
    className:
      "left-[13%] bottom-[9%] h-[190px] w-[370px] xl:h-[250px] xl:w-[480px]",
  },
  {
    name: "Good Vibes Box",
    src: "/package-designs/good-vibes-box.png",
    className:
      "left-[50%] bottom-[5%] h-[210px] w-[330px] xl:h-[280px] xl:w-[430px]",
  },
  {
    name: "Laser Poster Standee",
    src: "/package-designs/laser-standee.png",
    className:
      "right-[3%] bottom-[5%] h-[250px] w-[250px] xl:h-[330px] xl:w-[310px]",
  },
];

export default function PackageDesignsContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        {/* Desktop horizontal-scroll slide */}
        <div className="relative mx-auto hidden h-full w-full max-w-[1500px] lg:block">
          <h2 className="absolute left-1/2 top-1/2 z-20 w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 text-center text-[48px] font-bold uppercase leading-[1.2] tracking-wide text-[#EF8030] xl:text-[64px] 2xl:text-[72px]">
            Package Designs
          </h2>

          {packageItems.map((item) => (
            <div
              key={item.name}
              className={`absolute z-10 ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                priority
                sizes="480px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet normal view */}
        <div className="mx-auto flex w-full max-w-[950px] flex-col items-center justify-center lg:hidden">
          <h2 className="mb-10 text-center text-[34px] font-bold uppercase leading-[1.15] tracking-wide text-[#EF8030] sm:text-[46px]">
            Package Designs
          </h2>

          <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-2">
            {packageItems.map((item) => (
              <div
                key={item.name}
                className="relative mx-auto h-[230px] w-full max-w-[360px] sm:h-[260px] sm:max-w-[390px]"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 390px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const packageItems = [
  {
    name: "Gram Flour Package",
    src: "/package_design_slide/1.png",
    position: "left-[4%] top-[16%]",
  },
  {
    name: "Reel Box Package",
    src: "/package_design_slide/2.png",
    position: "left-[36%] top-[8%]",
  },
  {
    name: "Turmeric Package",
    src: "/package_design_slide/3.png",
    position: "right-[6%] top-[8%]",
  },
  {
    name: "Brochure Package Design",
    src: "/package_design_slide/4.png",
    position: "left-[12%] bottom-[8%]",
  },
  {
    name: "Good Vibes Box",
    src: "/package_design_slide/5.png",
    position: "left-[44%] bottom-[4%]",
  },
  {
    name: "Laser Poster Standee",
    src: "/package_design_slide/6.png",
    position: "right-[6%] bottom-[5%]",
  },
];

export default function PackageDesignsContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        {/* Desktop horizontal-scroll slide */}
        <div className="relative mx-auto hidden h-full w-full max-w-[1500px] lg:block">
          <h2 className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 text-center text-[54px] font-bold uppercase leading-[1.12] tracking-wide text-[#EF8030] xl:text-[64px] 2xl:text-[72px]">
            Package Designs
          </h2>

          {packageItems.map((item, i) => (
            <div
              key={item.name}
              className={`absolute z-10 flex items-center justify-center overflow-hidden ${item.position}`}
            >
              <div
                className={[
                  "relative overflow-hidden bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.25)]",
                  i === 0 && "h-[210px] w-[300px] xl:h-[240px] xl:w-[340px]",
                  i === 1 && "h-[150px] w-[290px] xl:h-[175px] xl:w-[340px]",
                  i === 2 && "h-[210px] w-[330px] xl:h-[245px] xl:w-[390px]",
                  i === 3 && "h-[190px] w-[360px] xl:h-[225px] xl:w-[430px]",
                  i === 4 && "h-[200px] w-[320px] xl:h-[240px] xl:w-[380px]",
                  i === 5 && "h-[230px] w-[230px] xl:h-[275px] xl:w-[275px]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  priority={i < 3}
                  sizes="430px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet card view */}
        <div className="mx-auto flex w-full max-w-[950px] flex-col items-center justify-center lg:hidden">
          <h2 className="mb-8 text-center text-[32px] font-bold uppercase leading-[1.15] tracking-wide text-[#EF8030] sm:mb-10 sm:text-[46px]">
            Package Designs
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {packageItems.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex h-[230px] w-full items-center justify-center overflow-hidden rounded-[22px] bg-white">
                  <div className="relative h-[86%] w-[86%]">
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 90vw, 420px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-center text-[18px] font-semibold leading-tight text-white">
                  {item.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
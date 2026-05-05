import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const logoItems = [
  {
    name: "Super Safe",
    src: "/branding-logos/super-safe.png",
    className:
      "left-[8%] top-[4%] h-[160px] w-[210px] xl:h-[200px] xl:w-[260px]",
  },
  {
    name: "Terragrat Engineering",
    src: "/branding-logos/terragrat.png",
    className:
      "left-[40%] top-[22%] h-[70px] w-[250px] xl:h-[90px] xl:w-[320px]",
  },
  {
    name: "Indian Pest Control",
    src: "/branding-logos/indian-pest-control.png",
    className:
      "right-[13%] top-[9%] h-[150px] w-[260px] xl:h-[190px] xl:w-[330px]",
  },
  {
    name: "Spark Cretech",
    src: "/branding-logos/spark-cretech.png",
    className:
      "left-[7%] top-[45%] h-[80px] w-[280px] xl:h-[100px] xl:w-[350px]",
  },
  {
    name: "Vaari",
    src: "/branding-logos/vaari.png",
    className:
      "right-[13%] top-[50%] h-[110px] w-[260px] xl:h-[140px] xl:w-[330px]",
  },
  {
    name: "Nalan",
    src: "/branding-logos/nalan.png",
    className:
      "left-[26%] bottom-[27%] h-[70px] w-[230px] xl:h-[90px] xl:w-[300px]",
  },
  {
    name: "Good Vibes",
    src: "/branding-logos/good-vibes.png",
    className:
      "left-[4%] bottom-[9%] h-[130px] w-[260px] xl:h-[170px] xl:w-[330px]",
  },
  {
    name: "Rooba's",
    src: "/branding-logos/roobas.png",
    className:
      "left-[58%] bottom-[13%] h-[80px] w-[280px] xl:h-[100px] xl:w-[350px]",
  },
  {
    name: "R Electrical Services",
    src: "/branding-logos/r-electrical.png",
    className:
      "right-[4%] bottom-[7%] h-[110px] w-[260px] xl:h-[140px] xl:w-[330px]",
  },
];

export default function BrandingLogoDesignsContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        {/* Desktop horizontal-scroll slide */}
        <div className="relative mx-auto hidden h-full w-full max-w-[1500px] lg:block">
          <h2 className="absolute left-1/2 top-1/2 z-20 w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 text-center text-[48px] font-bold uppercase leading-[1.18] tracking-wide text-[#EF8030] xl:text-[64px] 2xl:text-[72px]">
            Branding and Logo Designs
          </h2>

          {logoItems.map((logo) => (
            <div
              key={logo.name}
              className={`absolute z-10 ${logo.className}`}
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                priority
                sizes="360px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet normal view */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center lg:hidden">
          <h2 className="mb-10 text-center text-[34px] font-bold uppercase leading-[1.15] tracking-wide text-[#EF8030] sm:text-[46px]">
            Branding and Logo Designs
          </h2>

          <div className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3">
            {logoItems.map((logo) => (
              <div
                key={logo.name}
                className="relative mx-auto h-[90px] w-full max-w-[220px] sm:h-[110px]"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
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
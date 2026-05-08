import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const logoItems = [
  {
    name: "Super Safe",
    src: "/branding-logos/super-safe.png",
    position: "left-[8%] top-[5%]",
  },
  {
    name: "Terragrat Engineering",
    src: "/branding-logos/terragrat.png",
    position: "left-[39%] top-[18%]",
  },
  {
    name: "Indian Pest Control",
    src: "/branding-logos/indian-pest-control.png",
    position: "right-[10%] top-[7%]",
  },
  {
    name: "Spark Cretech",
    src: "/branding-logos/spark-cretech.png",
    position: "left-[7%] top-[43%]",
  },
  {
    name: "Vaari",
    src: "/branding-logos/vaari.png",
    position: "right-[12%] top-[47%]",
  },
  {
    name: "Nalan",
    src: "/branding-logos/nalan.png",
    position: "left-[28%] bottom-[26%]",
  },
  {
    name: "Good Vibes",
    src: "/branding-logos/good-vibes.png",
    position: "left-[5%] bottom-[8%]",
  },
  {
    name: "Rooba's",
    src: "/branding-logos/roobas.png",
    position: "left-[56%] bottom-[12%]",
  },
  {
    name: "R Electrical Services",
    src: "/branding-logos/r-electrical.png",
    position: "right-[4%] bottom-[7%]",
  },
];

export default function BrandingLogoDesignsContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        {/* Desktop horizontal-scroll slide - untouched */}
        <div className="relative mx-auto hidden h-full w-full max-w-[1500px] lg:block">
          <h2 className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 text-center text-[48px] font-bold uppercase leading-[1.18] tracking-wide text-[#EF8030] xl:text-[64px] 2xl:text-[72px]">
            Branding and Logo Designs
          </h2>

          {logoItems.map((logo, i) => (
            <div
              key={logo.name}
              className={`absolute z-10 flex items-center justify-center ${logo.position}`}
            >
              <div className="relative h-32 w-32">
                <Image
                  src={`/client_logos_slide/${i + 1}.png`}
                  alt={`${logo.name} logo`}
                  fill
                  priority={i < 3}
                  sizes="65px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet normal view */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col lg:hidden">
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#EF8030]">
              Brand Identity
            </p>

            <h2 className="mx-auto max-w-[340px] text-[30px] font-bold uppercase leading-[1.12] tracking-wide text-[#EF8030] sm:max-w-[560px] sm:text-[46px]">
              Branding and Logo Designs
            </h2>

            <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-white/70 sm:max-w-[520px] sm:text-[15px]">
              A showcase of logo identities crafted with clarity, balance, and
              visual impact.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {logoItems.map((logo, i) => (
              <div
                key={logo.name}
                className="
                  group relative flex h-[118px] items-center justify-center
                  overflow-hidden rounded-[22px] border border-white/10
                  bg-white/[0.06] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-md

                  sm:h-[140px]
                  sm:p-6
                "
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,128,48,0.18),transparent_58%)] opacity-80" />

                <div className="relative h-[64px] w-full max-w-[110px] transition-transform duration-300 group-hover:scale-105 sm:h-[78px] sm:max-w-[140px]">
                  <Image
                    src={`/client_logos_slide/${i + 1}.png`}
                    alt={`${logo.name} logo`}
                    fill
                    sizes="(max-width: 640px) 110px, 140px"
                    className="object-contain"
                  />
                </div>

                <span className="sr-only">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
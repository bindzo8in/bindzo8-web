import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";
import React from "react";

function ServiceContent({
  services,
}: {
  services: {
    title: string;
    image: string;
    text: React.ReactNode;
  }[];
}) {
  return (
    <HorizontalSlide className="flex items-center justify-center bg-transparent py-12 lg:py-[95px]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-20 md:gap-y-10">
          {services.map((service, index) => (
            <React.Fragment key={service.title}>
              {/* Mobile: always image first */}
              <div className="md:hidden">
                <ImageCard src={service.image} alt={service.title} />
              </div>

              <div className="md:hidden">
                <TextCard title={service.title} text={service.text} />
              </div>

              {/* Desktop/tablet: alternate */}
              {index % 2 === 0 ? (
                <>
                  <div className="hidden md:block">
                    <ImageCard src={service.image} alt={service.title} />
                  </div>

                  <div className="hidden md:flex">
                    <TextCard title={service.title} text={service.text} />
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden md:flex">
                    <TextCard title={service.title} text={service.text} />
                  </div>

                  <div className="hidden md:block">
                    <ImageCard src={service.image} alt={service.title} />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </HorizontalSlide>
  );
}

export default ServiceContent;

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[200px]">
      <Image src={src} alt={alt} fill className="object-cover grayscale" />
    </div>
  );
}

function TextCard({
  title,
  text,
}: {
  title: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-0">
      <h3 className="mb-3 text-xl font-bold leading-tight text-[#d3325c] lg:text-2xl">
        {title}
      </h3>

      <p className="max-w-xl text-[15px] leading-relaxed text-white/90">
        {text}
      </p>
    </div>
  );
}
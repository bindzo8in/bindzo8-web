import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const standOutPoints = [
  "Designed for high-speed performance",
  "Attractive UI with a branded theme",
  "Strong cloud-based backend",
  "Complete automation of food ordering & delivery flow",
  "Reliable maintenance and continuous system updates",
  "Built to scale as the business expands",
];

export default function GoodVibesContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center gap-10 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 xl:gap-12">
          {/* Left Image */}
          <div className="relative z-10 flex w-full items-center justify-center lg:h-full lg:justify-start">
            <div className="relative h-[300px] w-full max-w-[620px] sm:h-[430px] sm:max-w-[760px] md:h-[500px] lg:h-[68vh] lg:max-h-[580px] lg:max-w-[760px] xl:h-[70vh] xl:max-h-[640px] xl:max-w-[820px]">
              <Image
                src="/mobile_app.png"
                alt="Good Vibes food delivery app screens"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52vw, 820px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10 w-full lg:max-w-[620px] xl:max-w-[680px]">
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 xl:space-y-16">
              <div>
                <h2 className="text-[24px] font-bold leading-[1.2] text-[#EF8030] sm:text-[30px] lg:text-[24px] xl:text-[28px]">
                  Good Vibes Food Delivery (By Bindzo 8)
                </h2>

                <p className="mt-5 max-w-[680px] text-[15px] font-normal leading-[1.35] text-white/95 sm:text-[17px] lg:mt-5 lg:text-[16px] lg:leading-[1.25] xl:text-[18px] xl:leading-[1.25]">
                  The Good Vibes food delivery app is crafted by Bindzo 8 to
                  deliver a smooth, fast, and enjoyable ordering experience for
                  customers while giving restaurants a powerful platform to
                  manage orders efficiently. Designed with modern UI/UX, strong
                  backend systems, and real-time features, the app provides a
                  complete digital ecosystem for food delivery businesses.
                </p>
              </div>

              <div>
                <h3 className="text-[22px] font-bold leading-[1.2] text-[#EF8030] sm:text-[28px] lg:text-[23px] xl:text-[27px]">
                  Why Good Vibes App by Bindzo 8 Stands Out?
                </h3>

                <ul className="mt-6 space-y-5 sm:space-y-6 lg:mt-5 lg:space-y-4 xl:space-y-5">
                  {standOutPoints.map((point) => (
                    <li
                      key={point}
                      className="text-[15px] font-normal leading-[1.25] text-white/95 sm:text-[17px] lg:text-[16px] xl:text-[18px]"
                    >
                      · {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
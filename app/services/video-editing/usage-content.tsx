import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";

const UsageContent = () => {
  return (
    <HorizontalSlide className="flex items-center justify-center py-12 sm:py-16 lg:py-[95px]">
      <section className="w-full px-5 font-kumbh sm:px-8 lg:px-12 xl:px-20">
        <div
          className="
            mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8

            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-12

            xl:gap-16
          "
        >
          {/* Mobile Heading */}
          <div className="lg:hidden">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#d3325c]">
              Digital Marketing
            </p>

            <h2 className="max-w-[350px] text-[28px] font-semibold leading-tight text-white">
              Campaigns built for visibility, leads, and customer engagement
            </h2>

            <p className="mt-3 max-w-[360px] text-[14px] leading-relaxed text-white/70">
              We use modern marketing tools and creative strategies to promote
              your brand across digital platforms.
            </p>
          </div>

          {/* Left Content */}
          <div
            className="
              order-2 grid grid-cols-1 gap-4

              sm:grid-cols-2
              sm:gap-5

              lg:order-none
              lg:gap-10
            "
          >
            <ListBlock
              title="Usage / Use Cases"
              items={[
                "Brand promotion",
                "Lead generation",
                "Product marketing",
                "Event promotions",
                "E-commerce campaigns",
                "Social media branding",
                "Customer engagement",
              ]}
            />

            <ListBlock
              title="Technologies Used"
              items={[
                "Meta Ads Manager",
                "Google Ads",
                "Google Analytics",
                "Canva, Photoshop, Illustrator",
                "Mailchimp / SendGrid",
                "Keyword research tools (SEMrush, Ahrefs)",
              ]}
            />
          </div>

          {/* Right Image Only */}
          <div
            className="
              order-1 relative flex w-full items-center justify-center

              lg:order-none
            "
          >
            <div
              className="
                relative h-[230px] w-full max-w-[390px] overflow-hidden
                rounded-[24px] border border-white/10
                bg-white/[0.04] shadow-[0_22px_70px_rgba(0,0,0,0.32)]

                sm:h-[320px]
                sm:max-w-[560px]

                md:h-[360px]
                md:max-w-[620px]

                lg:h-[340px]
                lg:max-w-[600px]
                lg:border-0
                lg:bg-transparent
                lg:shadow-none

                xl:h-[380px]
                xl:max-w-[680px]
              "
            >
              <Image
                src="/ve.png"
                alt="Digital marketing visual"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 680px"
                className="object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
};

export default UsageContent;

/* ---------------- HELPERS ---------------- */

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="
        parallax-item rounded-[22px] border border-white/10
        bg-white/[0.06] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]
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
          mb-4 text-[20px] font-semibold leading-tight text-[#d3325c]

          sm:text-[22px]

          lg:mb-5
          lg:text-[26px]

          xl:text-[30px]
        "
      >
        {title}
      </h3>

      <ul
        className="
          space-y-2.5 text-[14px] leading-relaxed text-white/85

          sm:text-[15px]

          lg:space-y-3
          lg:text-[17px]
          lg:leading-snug
          lg:text-white/90

          xl:text-[18px]
        "
      >
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[2px] text-[#d3325c] lg:text-white/55">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
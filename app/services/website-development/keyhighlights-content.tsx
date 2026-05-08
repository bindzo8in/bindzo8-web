import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const highlights = [
  {
    title: "Custom business-focused web solutions",
    desc: "Tailor-made websites that match your brand identity, goals, and audience needs.",
  },
  {
    title: "Responsive design for all devices",
    desc: "Your website will look elegant and function perfectly on mobiles, tablets, and desktops.",
  },
  {
    title: "Fast-loading & performance optimized",
    desc: "Clean coding, optimized assets, and smart architecture for lightning-fast page speeds.",
  },
  {
    title: "SEO-ready foundation",
    desc: "Structured layouts, optimized tags, and search-friendly architecture to boost ranking potential.",
  },
  {
    title: "Secure and reliable development",
    desc: "Advanced security practices, encrypted data handling, and safe server configurations.",
  },
  {
    title: "Modern UI/UX design",
    desc: "Aesthetic visuals, intuitive layouts, and smooth interactions for a premium user experience.",
  },
  {
    title: "CMS-driven easy management",
    desc: "WordPress or custom admin dashboards that allow you to update content anytime without technical help.",
  },
  {
    title: "Feature-rich integrations",
    desc: "E-commerce, payment gateways, booking tools, chat systems, analytics, automation, and more based on your requirements.",
  },
  {
    title: "Scalable for future expansion",
    desc: "Built to grow with your business — whether you need new pages, modules, or advanced features.",
  },
  {
    title: "Ongoing maintenance & updates",
    desc: "Regular monitoring, bug fixes, security updates, and performance improvements for long-term stability.",
  },
];

export default function KeyHighlightContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6 xl:gap-10">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:max-w-[570px] xl:max-w-[610px] order-2 lg:order-1">
            <h2 className="mb-8 text-[28px] font-bold leading-none text-[#EF8030] sm:text-[32px] lg:mb-7 lg:text-[28px] xl:mb-8 xl:text-[32px]">
              Key Highlights:
            </h2>

            <div className="space-y-5 sm:space-y-6 lg:space-y-3 xl:space-y-4">
              {highlights.map((item, index) => (
                <div key={item.title} className="text-white">
                  <h3 className="text-[15px] font-bold leading-[1.15] sm:text-[16px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                    {index + 1}. {item.title}
                  </h3>

                  <p className="mt-1 max-w-[610px] text-[14px] font-normal leading-[1.25] text-white/95 sm:text-[15px] lg:text-[13px] lg:leading-[1.2] xl:text-[14px] 2xl:text-[15px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 flex w-full items-center justify-center lg:h-full lg:justify-end order-1 lg:order-2">
            <div className="relative h-[280px] w-full max-w-[620px] sm:h-[420px] sm:max-w-[760px] md:h-[500px] lg:h-[70vh] lg:max-h-[560px] lg:max-w-[780px] xl:h-[72vh] xl:max-h-[620px] xl:max-w-[900px]">
              <Image
                src="/web_keyhl.png"
                alt="Website development showcase"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 900px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}
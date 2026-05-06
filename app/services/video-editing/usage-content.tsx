import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";

const UsageContent = () => {
  return (
    <HorizontalSlide className="flex items-center justify-center py-[95px]">
      <section className="w-full px-5 font-kumbh sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          {/* Left Content */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
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
          <div className="relative flex w-full items-center justify-center">
            <div className="relative h-[230px] w-full max-w-[520px] overflow-hidden rounded-[24px] sm:h-[300px] lg:h-[340px] lg:max-w-[600px] xl:h-[380px] xl:max-w-[680px]">
              <Image
                src="/ve.png"
                alt="Digital marketing visual"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 680px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
};

export default UsageContent;

/* ---------------- HELPERS ---------------- */

function ListBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="parallax-item">
      <h3 className="mb-5 text-[22px] font-semibold leading-tight text-orange-500 sm:text-[24px] lg:text-[26px] xl:text-[30px]">
        {title}
      </h3>

      <ul className="space-y-3 text-[15px] leading-snug text-white/90 sm:text-[16px] lg:text-[17px] xl:text-[18px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-white/55">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
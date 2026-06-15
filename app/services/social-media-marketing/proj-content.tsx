import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";
import Image from "next/image";

const ProjectContent = () => {
  return (
    <HorizontalSlide className="flex items-center justify-center px-4 py-16 lg:py-[95px] text-white sm:px-6 lg:px-10 bg-black">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* left */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/website_mockup.png"
            alt="Good Vibes website mockup"
            width={529}
            height={658}
            className="h-auto w-full max-w-[280px] object-contain sm:max-w-[360px] lg:max-w-[420px]"
          />
        </div>

        {/* right */}
        <div className="max-w-xl">
          <h3 className="mb-6 text-xl font-bold text-[#d3325c] sm:text-2xl">
            Project Description
          </h3>

          <p className="mb-8 text-sm leading-relaxed text-white/90 sm:text-base">
            <span className="font-bold text-white">Good Vibes</span> is a
            modern, user-friendly food delivery website designed to provide
            customers with a smooth ordering experience. The website focuses on
            presenting food categories, delivery services, offers, and brand
            information in a clean and attractive layout. It highlights fast
            delivery, fresh food, multiple meal categories, and an
            easy-to-navigate interface, making it a complete digital solution
            for food businesses.
          </p>

          <h4 className="mb-5 text-lg font-bold text-[#d3325c] sm:text-xl">
            Key Features Developed:
          </h4>

          <div className="space-y-4 text-sm leading-relaxed text-white/90 sm:text-base">
            <p>
              <span className="font-bold text-white">Responsive Design:</span>{" "}
              Fully optimized for mobile, tablet, and desktop.
            </p>

            <p>
              <span className="font-bold text-white">Clean UI/UX:</span> Simple
              navigation with visually appealing sections.
            </p>

            <p>
              <span className="font-bold text-white">
                Category Showcasing:
              </span>{" "}
              Fast food, vegetables, meat, sweets, and more.
            </p>

            <p>
              <span className="font-bold text-white">Dynamic Sections:</span>{" "}
              Offers, testimonials, team, and special categories.
            </p>

            <p>
              <span className="font-bold text-white">
                About & Branding Pages:
              </span>{" "}
              Includes mission, vision, values, and tagline.
            </p>

            <p>
              <span className="font-bold text-white">
                SEO-Optimized Structure:
              </span>{" "}
              Fast loading, clean code, and keyword-ready.
            </p>

            <p>
              <span className="font-bold text-white">User-Friendly Layout:</span>{" "}
              Designed to make ordering fast and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </HorizontalSlide>
  );
};

export default ProjectContent;
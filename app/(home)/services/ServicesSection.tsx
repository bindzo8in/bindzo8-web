"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";


const services = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    items: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Search Engine Marketing",
      "Content Marketing",
      "Influencer Marketing",
    ],
    icon: '/services_icons/digi_marketing.png'
  },
  {
    id: "website-development",
    title: "Website Development",
    items: [
      "Website Development",
      "Website Design & Development",
      "E-Commerce Development",
      "Mobile Application",
      "SEO Services",
      "CRM Development",
    ],
    icon: '/services_icons/web_dev.png'
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    items: [
      "Android & iOS App Development",
      "Custom App UI/UX",
      "App Testing & Performance Optimization",
      "App Launch, Deployment & Maintenance",
    ],
    icon: '/services_icons/mobile_app.png'
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    items: [
      "On-Page & Technical SEO",
      "Keyword Research & Optimization",
      "Backlink Strategy & Off-Page SEO",
      "Website Ranking & Performance Boost"
    ],
    icon: '/services_icons/seo.png'
  },
  {
    id: "graphic-design",
    title: "Design Solution",
    items: [
      "Logo & Brand Identity",
      "Business Promotional Design",
      "Package & Label Design",
      "UI & UX Design"
    ],
    icon: '/services_icons/graphic-design.png'
  },
  {
    id: "video-editing",
    title: "Video Editing",
    items: [
      "Creative Video Production",
      "Motion Graphics & Animation",
      "Promo, Ad & Reels Editing",
      "Color Grading & Visual Enhancements"
    ],
    icon: '/services_icons/video_editing.png'
  },
];

export default function ServicesSection() {
  const router = useRouter();

  return (
    <section className="px-4 sm:px-8 pt-12 md:pt-20 pb-16 bg-transparent min-h-screen">
      {/* Heading */}
      <h1 className="text-center text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[#EF8030] mb-12 tracking-tight">
        Our Services
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#151515] rounded-xl p-7 flex flex-col gap-4 shadow-xl border border-white/5 transition-transform hover:-translate-y-1"
            onClick={() => router.push(`/service/${service.id}`)}
          >
            {/* Icon placeholder */}
            <div className="w-32 h-24 mx-auto bg-transparent flex items-center justify-center">
              <Image
                src={service.icon}
                alt={service.title}
                width={300}
                height={200}
              />
            </div>

            {/* Title */}
            <h3 className="text-center text-[15px] font-extrabold text-[#f2efe9] leading-tight">
              {service.title}
            </h3>

            {/* Sub-items */}
            {service.items.length > 0 && (
              <ul className="text-center space-y-0.5">
                {service.items.map((item) => (
                  <li key={item} className="text-[12.5px] text-[#f2efe9]/70 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 justify-center mt-auto pt-3">
              <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/90 text-[11px] font-medium px-4 py-2 rounded-full hover:bg-[#EF8030] hover:text-white transition-colors">
                <span className="text-[10px]">💬</span> Chat With Us
              </button>
              <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/90 text-[11px] font-medium px-4 py-2 rounded-full hover:bg-[#EF8030] hover:text-white transition-colors">
                <span className="text-[10px]">📞</span> Call Us
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
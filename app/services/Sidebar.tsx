"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sidebarCategories = [
  {
    text: "ECommerce Software",
    slug: "ecommerce-solutions",
    media: "/services_gif/ecommerce.gif",
  },
  {
    text: "Branding",
    slug: "branding",
    media: "/services_gif/branding.gif",
  },
  {
    text: "Website Development",
    slug: "website-design-and-development",
    media: "/services_gif/webdev.gif",
  },
  {
    text: "Quality Assurance",
    slug: "quality-assurance",
    media: "/services_gif/qa.gif",
  },
  {
    text: "Mobile App Development",
    slug: "mobile-app-development",
    media: "/services_gif/mobile-app.gif",
  },
  {
    text: "Design Solution",
    slug: "design-solution",
    media: "/services_gif/graphics.gif",
  },
  {
    text: "Software Development",
    slug: "software-development",
    media: "/services_gif/software.gif",
  },
  {
    text: "Digital Marketing",
    slug: "digital-marketing",
    media: "/services_gif/dm.gif",
  },
  {
    text: "Product Shooting",
    slug: "product-shooting",
    media: "/services_gif/cc.gif",
  },
  // {
  //   text: "IoT",
  //   media: "/services_gif/iot.gif",
  // },
  {
    text: "Search Engine Marketing",
    slug: "search-engine-marketing",
    media: "/services_gif/sem.gif",
  },
  {
    text: "Cyber Security",
    slug: "cyber-security",
    media: "/services_gif/digital-secure.gif",
  },
  {
    text: "Creative & Communication",
    slug: "creative-and-communication",
    media: "/services_gif/cc.gif",
  },
];

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const router = useRouter();

  return (
    <aside className="relative z-40 order-2 flex h-auto w-full flex-shrink-0 flex-col overflow-hidden bg-[#0a0a0a] shadow-xl lg:sticky lg:top-[95px] lg:order-none lg:h-[calc(100vh-95px)] lg:w-[425px]">
      {/* Mobile / Tablet Grid Card View */}
      <div className="block lg:hidden" >
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4">
          {sidebarCategories.map((cat) => (
            <button
              key={cat.text}
              onClick={() => router.push(`/service/${cat.slug}`)}
              type="button"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#E7325C]/60 hover:bg-[#1f1f1f]"
            >
              <div className="relative h-[120px] w-full bg-white sm:h-[135px] md:h-[145px]">
                <img
                  src={cat.media}
                  alt={cat.text}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="flex min-h-[56px] items-center justify-center px-2 py-3">
                <h3 className="text-center text-[12px] font-semibold leading-tight text-white transition group-hover:text-[#E7325C] sm:text-[13px]">
                  {cat.text}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar Button View */}
      <div
        className="hidden grid-cols-2 gap-2 overflow-y-auto p-3 lg:grid"
        onMouseLeave={() => setSelectedCategory(null)}
      >
        {sidebarCategories.map((cat, index) => (
          <button
            key={cat.text}
            type="button"
            className={cn(
              "bg-[#1c1c1c] px-2 py-3 text-center text-[11px] font-medium leading-tight text-white/85 transition-colors hover:bg-[#E7325C] hover:text-white",
              selectedCategory === index && "bg-[#E7325C] text-white",
              index % 2 === 0 && "rounded-tr-2xl rounded-br-2xl",
              index % 2 !== 0 && "rounded-tl-2xl rounded-bl-2xl"
            )}
            onMouseEnter={() => setSelectedCategory(index)}
            onClick={() =>
              router.push(`/service/${cat.slug}`)
            }
          >
            {cat.text}
          </button>
        ))}
      </div>

      {/* Desktop GIF Preview */}
      {selectedCategory !== null && (
        <div className="mt-auto hidden w-full bg-[#0a0a0a] px-4 py-4 pb-8 lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
            <div className="relative h-[240px] w-full">
              <img
                key={sidebarCategories[selectedCategory].media}
                src={sidebarCategories[selectedCategory].media}
                alt={sidebarCategories[selectedCategory].text}
                className="h-full w-full rounded-xl bg-white object-contain"
              />
            </div>

            <div className="mt-3 text-center text-sm font-semibold uppercase tracking-wider text-white">
              {sidebarCategories[selectedCategory].text}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
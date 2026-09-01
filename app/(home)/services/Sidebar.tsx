"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const sidebarCategories = [
  {
    text: "E-Commerce Development",
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
    text: "Design Solution",
    slug: "design-solution",
    media: "/services_gif/graphics.gif",
  },
  {
    text: "Mobile App Development",
    slug: "mobile-app-development",
    media: "/services_gif/mobile-app.gif",
  },
  {
    text: "Social Media Marketing",
    slug: "digital-marketing",
    media: "/services_gif/dm.gif",
  },
  {
    text: "Software Development",
    slug: "software-development",
    media: "/services_gif/software.gif",
  },
  {
    text: "Google Ads",
    slug: "google-ads",
    media: "/services_gif/google-ads.gif",
  },
  {
    text: "Quality Assurance",
    slug: "quality-assurance",
    media: "/services_gif/qa.gif",
  },
  {
    text: "DV 360",
    slug: "dv-360",
    media: "/services_gif/dv360.gif",
  },
  {
    text: "Product Shooting",
    slug: "product-shooting",
    media: "/services_gif/cc.gif",
  },
  {
    text: "Search Engine Marketing",
    slug: "search-engine-marketing",
    media: "/services_gif/sem.gif",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<
    (typeof sidebarCategories)[number]
  >(sidebarCategories[0]);

  const previewItem = hoveredItem ?? sidebarCategories[0];

  return (
    <aside className="relative z-40 order-2 flex h-auto w-full flex-shrink-0 flex-col overflow-hidden bg-[#0a0a0a] shadow-xl lg:sticky lg:top-[var(--nav-height,95px)] lg:order-none lg:h-[calc(100vh-var(--nav-height,95px))] lg:w-[425px]">
      {/* Mobile */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 sm:p-4">
          {sidebarCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/service/${cat.slug}`)}
              type="button"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#c42b47]/60 hover:bg-[#1f1f1f]"
            >
              <div className="relative h-[120px] w-full bg-white sm:h-[135px] md:h-[145px]">
                <Image
                  src={cat.media}
                  alt={cat.text}
                  fill
                  sizes="(max-width: 640px) 120px, 145px"
                  className="object-contain p-2"
                />
              </div>

              <div className="flex min-h-[56px] items-center justify-center px-2 py-3">
                <h3 className="text-center text-[12px] font-semibold leading-tight text-white transition group-hover:text-[#c42b47] sm:text-[13px]">
                  {cat.text}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden flex-1 flex-col lg:flex">
        <div
          className="grid grid-cols-2 gap-2 p-3"
          onMouseLeave={() => setHoveredItem(sidebarCategories[0])}
        >
          {sidebarCategories.map((cat, index) => (
            <button
              key={cat.slug}
              type="button"
              onMouseEnter={() => setHoveredItem(cat)}
              onClick={() => router.push(`/service/${cat.slug}`)}
              className={cn(
                "min-h-[54px] px-3 py-3 text-center text-[12px] font-medium transition-all duration-200",
                index % 2 === 0
                  ? "rounded-r-2xl"
                  : "rounded-l-2xl",
                hoveredItem?.slug === cat.slug
                  ? "bg-[#c42b47] text-white"
                  : "bg-[#1c1c1c] text-white/85 hover:bg-[#c42b47] hover:text-white"
              )}
            >
              {cat.text}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="mt-auto px-4 pb-4">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4 shadow-2xl">
            <div className="relative h-[180px] w-full">
              <Image
                key={previewItem.media}
                src={previewItem.media}
                alt={previewItem.text}
                fill
                sizes="390px"
                className="rounded-xl bg-white object-contain"
              />
            </div>

            <div className="mt-3 text-center text-sm font-semibold uppercase tracking-wider text-white">
              {previewItem.text}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
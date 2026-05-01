"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const sidebarCategories = [
  {
    text: "Enterprise Software",
    media: "/services_gif/enterprise.gif",
  },
  {
    text: "Branding",
    media: "/services_gif/branding.gif",
  },
  {
    text: "Website Development",
    media: "/services_gif/webdev.gif",
  },
  {
    text: "Quality Assurance",
    media: "/services_gif/qa.gif",
  },
  {
    text: "Mobile App Development",
    media: "/services_gif/mobile-app.gif",
  },
  {
    text: "Graphic Design",
    media: "/services_gif/graphics.gif",
  },
  {
    text: "Software Development",
    media: "/services_gif/software.gif",
  },
  {
    text: "AR and VR Service",
    media: "/services_gif/arvr.gif",
  },
  {
    text: "Digital Marketing",
    media: "/services_gif/dm.gif",
  },
  {
    text: "Animation and Video Production",
    media: "/services_gif/cc.gif",
  },
  {
    text: "IoT",
    media: "/services_gif/iot.gif",
  },
  {
    text: "Search Engine Marketing",
    media: "/services_gif/sem.gif",
  },
  {
    text: "Cyber Security",
    media: "/services_gif/digital-secure.gif",
  },
  {
    text: "Creative & Communication",
    media: "/services_gif/cc.gif",
  },
  {
    text: "Cloud Service",
    media: "/services_gif/cloud.gif",
  },
  {
    text: "Social Media Marketing",
    media: "/services_gif/smm.gif",
  },
];

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)


  return (
    <aside className="sticky top-[95px] hidden h-[calc(100vh-95px)] w-[425px] flex-shrink-0 overflow-hidden bg-[#0a0a0a] z-40 lg:block">
      <div
        className="grid grid-cols-2 gap-2 py-3"
        onMouseLeave={() => setSelectedCategory(null)}
      >
        {sidebarCategories.map((cat, index) => (
          <button
            key={cat.text}
            className={cn(
              "text-[10.5px] text-white/85 text-center font-medium bg-[#1c1c1c] border border-white/10 px-2 py-2.5 hover:text-white hover:bg-[#E7325C] transition-colors leading-tight rounded-none",
              selectedCategory === index && "bg-[#E7325C] text-white",
              index % 2 === 0
                ? "rounded-tr-2xl rounded-br-2xl"
                : "rounded-tl-2xl rounded-bl-2xl"
            )}
            onMouseEnter={() => setSelectedCategory(index)}
          >
            {cat.text}
          </button>
        ))}
      </div>

      {/* GIF preview - absolute, so it won't create scrollbar */}
      {selectedCategory !== null && (
        <div className="absolute left-0 right-0 bottom-6 px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-4">
            <img
              key={sidebarCategories[selectedCategory].media}
              src={sidebarCategories[selectedCategory].media}
              alt={sidebarCategories[selectedCategory].text}
              className="h-[260px] w-full bg-white object-contain"
            />

            <div className="mt-4 text-center text-sm font-semibold text-white">
              {sidebarCategories[selectedCategory].text}
            </div>
          </div>
        </div>
      )}
    </aside>

  );
}

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
    <aside className="relative w-full h-auto lg:h-[calc(100vh-95px)] bg-[#0a0a0a] z-40 lg:sticky lg:top-[95px] lg:w-[425px] flex-shrink-0 flex flex-col overflow-hidden shadow-xl order-2 lg:order-none">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-1 sm:gap-2 p-2 sm:p-3 overflow-y-auto no-scrollbar"
        onMouseLeave={() => setSelectedCategory(null)}
      >
        {sidebarCategories.map((cat, index) => (
          <button
            key={cat.text}
            className={cn(
              "text-[9px] sm:text-[10.5px] text-white/85 text-center font-medium bg-[#1c1c1c] border border-white/10 px-1 sm:px-2 py-2 sm:py-2.5 hover:text-white hover:bg-[#E7325C] transition-colors leading-tight rounded-none",
              selectedCategory === index && "bg-[#E7325C] text-white",
              "rounded-lg lg:rounded-none",
              index % 2 === 0 && "lg:rounded-tr-2xl lg:rounded-br-2xl",
              index % 2 !== 0 && "lg:rounded-tl-2xl lg:rounded-bl-2xl"
            )}
            onMouseEnter={() => setSelectedCategory(index)}
            onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
          >
            {cat.text}
          </button>
        ))}
      </div>

      {/* GIF preview - Positioned below the buttons without overlap */}
      {selectedCategory !== null && (
        <div className="mt-auto w-full px-4 py-4 lg:pb-8 bg-[#0a0a0a]">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#111] p-3 md:p-4 shadow-2xl">
            <div className="relative w-full h-[160px] sm:h-[200px] lg:h-[240px]">
              <img
                key={sidebarCategories[selectedCategory].media}
                src={sidebarCategories[selectedCategory].media}
                alt={sidebarCategories[selectedCategory].text}
                className="w-full h-full bg-white object-contain rounded-xl"
              />
            </div>

            <div className="mt-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
              {sidebarCategories[selectedCategory].text}
            </div>
            
            {/* Mobile/Tablet close button */}
            <button 
              className="absolute top-2 right-2 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-white lg:hidden"
              onClick={() => setSelectedCategory(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </aside>

  );
}

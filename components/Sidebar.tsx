"use client";
import { useState } from "react";
import DevAnimation from "./DevAnimation";

const sidebarItems = [
  "Enterprise Software", "Branding",
  "Website Development", "Quality Assurance",
  "Mobile App Development", "Graphic Design",
  "Software Development", "AR and VR Service",
  "Digital Marketing", "Animation and Video Production",
  "IoT", "Search Engine Marketing",
  "Cyber Security", "Creative & Communication",
  "Cloud Service", "Social Media Marketing",
];

export default function Sidebar() {
  const [active, setActive] = useState("Mobile App Development");
  const [hovered, setHovered] = useState(false);

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col bg-gradient-to-b from-[#111122] to-[#1a1a2e] overflow-hidden">
      {/* Grid */}
      <div
        className="grid grid-cols-2 gap-2 p-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {sidebarItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`text-[11px] text-center px-2 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 font-medium ${
              active === item
                ? "bg-[rgba(227,0,27,0.25)] text-white border-[rgba(227,0,27,0.5)]"
                : "bg-[rgba(255,255,255,0.07)] text-gray-400 border-transparent hover:bg-[rgba(227,0,27,0.2)] hover:text-white hover:border-[rgba(227,0,27,0.4)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Animated character – shown on hover */}
      <div
        className={`transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <DevAnimation />
      </div>
    </aside>
  );
}

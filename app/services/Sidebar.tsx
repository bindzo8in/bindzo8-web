"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sidebarCategories = [
  "Enterprise Software",
  "Branding",
  "Website Development",
  "Quality Assurance",
  "Mobile App Development",
  "Graphic Design",
  "Software Development",
  "AR and VR Service",
  "Digital Marketing",
  "Animation and Video Production",
  "IoT",
  "Search Engine Marketing",
  "Cyber Security",
  "Creative & Communication",
  "Cloud Service",
  "Social Media Marketing",
];

export default function Sidebar() {
  return (
    <>
      {/* Left Sidebar */}
      <aside className="sticky top-[95px] w-[425px] h-[calc(100vh-95px)] bg-[#0a0a0a] z-40 overflow-y-auto hidden lg:block flex-shrink-0">
        <div className="py-3 grid grid-cols-2 gap-2">
          {sidebarCategories.map((cat, index) => (
            <button
              key={cat}
              className={cn(`text-[10.5px] text-white/85 text-center font-medium bg-[#1c1c1c] border border-white/10 px-2 py-2.5  hover:text-white hover:bg-[#E7325C] transition-colors leading-tight rounded-none`,
                index%2==0 ? "rounded-tr-2xl rounded-br-2xl" : "rounded-tl-2xl rounded-bl-2xl" 
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
      </aside>

      {/* Right side "Get Quote" floating tab */}
      {/* <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <div
          className="bg-[#e3001b] text-white text-[11px] font-semibold px-2 py-4 cursor-pointer rounded-l-md"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Get Quote
        </div>
      </div> */}
    </>
  );
}

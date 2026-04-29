"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", active: true },
  { label: "Products", href: "/products" },
  { label: "Who we are?", href: "/who-we-are" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

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

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex items-center justify-between px-9 py-3 bg-white shadow-sm fixed w-full top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Bindzo 8 Logo" className="h-[46px] object-contain" />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-7 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[13px] font-medium transition-colors no-underline ${
                  link.active
                    ? "text-[#e3001b] font-semibold"
                    : "text-gray-700 hover:text-[#e3001b]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="bg-[#e3001b] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer transition-colors hover:bg-[#c0001a] whitespace-nowrap">
          Start a Project →
        </button>
      </nav>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-[68px] w-[425px] h-[calc(100vh-68px)] bg-[#0a0a0a] z-40 overflow-y-auto hidden lg:block">
        <div className="p-3 grid grid-cols-2 gap-2">
          {sidebarCategories.map((cat) => (
            <button
              key={cat}
              className="text-[10.5px] text-white/85 text-center font-medium bg-[#1c1c1c] border border-white/10 rounded-md px-2 py-2.5 hover:bg-[#2a2a2a] hover:text-white transition-colors leading-tight"
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
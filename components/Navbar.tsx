"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Who we are?", href: "/who-we-are" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-[999999] bg-[#e4dfd9]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-12 h-[80px] lg:h-[95px] font-kumbh">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 w-40 lg:w-48 xl:w-64" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.png" alt="Bindzo 8 Logo" className="h-[45px] lg:h-[60px] object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center justify-center gap-7 xl:gap-11 list-none flex-grow">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-[15px] transition-colors no-underline tracking-wide ${
                    isActive
                      ? "text-[#df803b] font-semibold"
                      : "text-[#222222] hover:text-[#df803b] font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex flex-shrink-0 w-48 xl:w-64 justify-end">
          <button 
            className="text-white px-7 py-2.5 rounded-full text-[14px] font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
            }}
          >
            Start a Project &rarr;
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-[#222222] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-[#e4dfd9] shadow-md border-t border-[#d5d0ca] font-kumbh py-4">
          <ul className="flex flex-col items-center gap-4 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <li key={link.label} className="w-full text-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-[16px] transition-colors no-underline tracking-wide ${
                      isActive
                        ? "text-[#df803b] font-bold"
                        : "text-[#222222] hover:text-[#df803b] font-medium"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="w-full text-center mt-2">
              <button 
                className="text-white px-8 py-3 rounded-full text-[15px] font-semibold tracking-wide"
                style={{
                  background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
                }}
              >
                Start a Project &rarr;
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

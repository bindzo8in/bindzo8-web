"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Hide on scroll-down, reveal on scroll-up / at top
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 0) {
        // Always visible at the very top
        setHidden(false);
      } else if (currentY > lastScrollY.current && currentY > 80) {
        // Scrolling down past navbar height → hide
        setHidden(true);
        setIsOpen(false);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up → show, UNLESS we're inside the pinned horizontal scroll zone
        if (!document.body.dataset.hscroll) {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full fixed top-0 z-[100] bg-[#e4dfd9] shadow-sm border-b border-black/5",
        "transition-transform duration-300 ease-in-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-[1700px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-20 h-[75px] md:h-[95px] font-kumbh">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-[110] flex items-center">
          <img
            src="/nav_logo.png"
            alt="Bindzo 8 Logo"
            className="h-[40px] sm:h-[50px] md:h-[60px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links - Hidden on screens smaller than XL due to many links */}
        <ul className="hidden xl:flex items-center justify-center gap-4 2xl:gap-8 list-none flex-1 px-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <li key={link.label} className="flex-shrink-0">
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13px] 2xl:text-[15px] transition-all duration-300 no-underline tracking-wide relative group whitespace-nowrap px-1 2xl:px-2 py-1",
                    isActive
                      ? "text-[#df803b] font-bold"
                      : "text-[#222222] hover:text-[#df803b] font-medium"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1 right-1 h-[2px] bg-[#df803b] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100",
                      isActive && "scale-x-100"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden xl:flex flex-shrink-0 items-center">
          <button
            className="text-white px-5 2xl:px-7 py-2.5 rounded-full text-[13px] 2xl:text-[14px] font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#d3325c]/30 whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
            }}
          >
            Start a Project &rarr;
          </button>
        </div>

        {/* Mobile Hamburger Button - Visible below XL */}
        <div className="xl:hidden flex items-center">
          <button
            className="z-[110] p-2.5 text-[#222222] hover:bg-black/5 rounded-xl transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <X size={32} strokeWidth={2.5} />
            ) : (
              <Menu size={32} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-[#e4dfd9] z-[105] flex flex-col pt-24 px-8 transition-all duration-500 xl:hidden",
            isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          )}
        >
          <ul className="flex flex-col gap-4 list-none mt-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <li key={link.label} className="border-b border-black/5 pb-3">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xl font-bold transition-colors no-underline block w-full",
                      isActive ? "text-[#df803b]" : "text-[#222222]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <button
              className="w-full text-white py-4 rounded-2xl text-lg font-bold tracking-wide shadow-xl active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
              }}
            >
              Start a Project
            </button>
            <p className="mt-6 text-center text-gray-500 font-medium text-sm">
              Ready to elevate your digital presence?
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

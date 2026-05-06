"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      const isHScroll = document.body.dataset.hscroll === "1";

      if (isHScroll) {
        setIsVisible(false);
      } else if (scrollY < 50) {
        // Always show at the very top
        setIsVisible(true);
      } else if (direction === "down" && scrollY > 100) {
        // Hide when scrolling down after some threshold
        setIsVisible(false);
      } else if (direction === "up") {
        // Show when scrolling up
        setIsVisible(true);
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Handle horizontal scroll state changes (via body attribute)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-hscroll"
        ) {
          updateNavbar();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      window.removeEventListener("scroll", updateNavbar);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-[999999] w-full bg-[#e4dfd9] transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-[80px] max-w-[1600px] items-center justify-between px-6 font-kumbh lg:h-[95px] lg:px-12">
        {/* Logo */}
        <Link href="/" className="w-40 flex-shrink-0 lg:w-48 xl:w-64">
          <img
            src="/nav_logo.png"
            alt="Bindzo 8 Logo"
            className="h-[45px] object-contain lg:h-[60px]"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden flex-grow list-none items-center justify-center gap-7 lg:flex xl:gap-11">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-[15px] tracking-wide no-underline transition-colors ${
                    isActive
                      ? "font-semibold text-[#d3325c]"
                      : "font-medium text-[#222222] hover:text-[#d3325c]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden w-48 flex-shrink-0 justify-end lg:flex xl:w-64">
          <Link
            href="/contact"
            className="rounded-full px-7 py-2.5 text-[14px] font-semibold tracking-wide text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
            }}
          >
            Start a Project &rarr;
          </Link>
        </div>

        {/* Mobile Sheet Menu */}
        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-black/5"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="z-[999999] w-[85vw] max-w-[360px] border-l border-[#d5d0ca] bg-[#e4dfd9] px-6 py-6 font-kumbh"
            >
              <SheetHeader className="text-left">
                <SheetTitle asChild>
                  <Link href="/" className="inline-flex w-fit">
                    <img
                      src="/logo.png"
                      alt="Bindzo 8 Logo"
                      className="h-[48px] object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-10 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href));

                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className={`rounded-2xl px-4 py-3 text-[17px] tracking-wide no-underline transition-colors ${
                          isActive
                            ? "bg-white/60 font-bold text-[#df803b]"
                            : "font-medium text-[#222222] hover:bg-white/40 hover:text-[#df803b]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}

                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#d3325c] to-[#c42b47] px-8 py-3 text-[15px] font-semibold tracking-wide text-white shadow-md"
                  >
                    Start a Project &rarr;
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
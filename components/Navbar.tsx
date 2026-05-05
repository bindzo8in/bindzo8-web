"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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

  return (
    <nav className="fixed left-0 top-0 z-[999999] w-full bg-[#e4dfd9]">
      <div className="mx-auto flex h-[80px] max-w-[1600px] items-center justify-between px-6 font-kumbh lg:h-[95px] lg:px-12">
        {/* Logo */}
        <Link href="/" className="w-40 flex-shrink-0 lg:w-48 xl:w-64">
          <img
            src="/logo.png"
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
                      ? "font-semibold text-[#df803b]"
                      : "font-medium text-[#222222] hover:text-[#df803b]"
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
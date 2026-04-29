"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav className="w-full fixed top-0 z-50 bg-[#e4dfd9]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 lg:px-36 h-[95px] font-kumbh">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 w-48 xl:w-64">
          <img src="/nav_logo.png" alt="Bindzo 8 Logo" className="h-[60px] object-contain" />
        </Link>

        {/* Nav Links */}
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

        {/* CTA Button */}
        <div className="flex-shrink-0 w-48 xl:w-64 flex justify-end">
          <button 
            className="hidden lg:block text-white px-7 py-2.5 rounded-full text-[14px] font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #d3325c 0%, #c42b47 100%)",
            }}
          >
            Start a Project &rarr;
          </button>
        </div>
      </div>
    </nav>
  );
}

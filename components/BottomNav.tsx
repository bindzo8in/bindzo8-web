"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Package, Users, Phone } from "lucide-react";

const bottomNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Portfolio", href: "/portfolio", icon: Package },
  { label: "About", href: "/who-we-are", icon: Users },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div 
      className="fixed bottom-0 left-0 z-999999 w-full border-t border-gray-200 bg-white lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-16 items-center justify-around px-2 font-kumbh">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full flex-col items-center justify-center gap-1 p-2 transition-colors ${
                isActive
                  ? "text-[#d3325c]"
                  : "text-gray-500 hover:text-[#d3325c]"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

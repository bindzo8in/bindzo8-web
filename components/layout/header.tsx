"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/public/img/logo.webp";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "PORTFOLIO", href: "/portfolio" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        left-0
        top-4
        z-[999]
        w-full
        px-4
        transition-all
        duration-500

        sm:top-6
        sm:px-8

        lg:top-8
        lg:px-16

        xl:px-32

        2xl:px-64

        ${scrolled ? "top-3 sm:top-4 lg:top-5" : ""}
      `}
    >
      <div
        className={`
          rounded-md
          border
          transition-all
          duration-500

          ${
            scrolled
              ? "border-white/30 bg-black/50 shadow-2xl backdrop-blur-2xl"
              : "border-white/20 bg-white/10 shadow-lg backdrop-blur-xl"
          }
        `}
        style={{
          boxShadow: scrolled
            ? "0 10px 40px rgba(0, 0, 0, 0.25)"
            : "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* =====================================================
            MAIN NAVBAR
        ===================================================== */}

        <div
          className="
            flex
            h-[58px]
            items-center
            justify-between
            px-4

            sm:px-6
          "
        >
          {/* ===================================================
              LOGO
          =================================================== */}

          <a
            href="/"
            aria-label="Home"
            className="shrink-0"
          >
            <div
              className="
                h-[38px]
                w-[88px]
                bg-primary-foreground

                sm:h-[42px]
                sm:w-[96px]
              "
              style={{
                maskImage: `url(${Logo.src})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",

                WebkitMaskImage: `url(${Logo.src})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          </a>

          {/* ===================================================
              DESKTOP NAVIGATION
          =================================================== */}

          <nav className="hidden md:block">
            <ul
              className="
                flex
                items-center
                gap-4
                text-sm
                font-semibold
                text-primary-foreground

                lg:gap-6
              "
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="
                      relative
                      py-2
                      transition-opacity
                      duration-300
                      hover:opacity-70
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              {/* CONTACT */}

              <li>
                <a
                  href="/contact"
                  className="
                    rounded-2xl
                    bg-primary/60
                    px-4
                    py-2
                    text-primary-foreground
                    transition-all
                    duration-300
                    hover:bg-primary
                  "
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          {/* ===================================================
              MOBILE MENU BUTTON
          =================================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-md
              border
              border-white/20
              bg-white/10

              md:hidden
            "
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
          >
            <div className="flex w-5 flex-col gap-1.5">
              {/* TOP */}

              <span
                className={`
                  h-[2px]
                  w-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    menuOpen
                      ? "translate-y-[4px] rotate-45"
                      : ""
                  }
                `}
              />

              {/* MIDDLE */}

              <span
                className={`
                  h-[2px]
                  w-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    menuOpen
                      ? "opacity-0"
                      : ""
                  }
                `}
              />

              {/* BOTTOM */}

              <span
                className={`
                  h-[2px]
                  w-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    menuOpen
                      ? "-translate-y-[4px] -rotate-45"
                      : ""
                  }
                `}
              />
            </div>
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300

            md:hidden

            ${
              menuOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <nav className="border-t border-white/10 px-4 pb-4">
            <ul
              className="
                flex
                flex-col
                gap-1
                pt-3
                text-sm
                font-semibold
                text-primary-foreground
              "
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="
                      block
                      rounded-md
                      px-3
                      py-3
                      transition-colors
                      hover:bg-white/10
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              {/* CONTACT */}

              <li className="pt-2">
                <a
                  href="/contact"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    block
                    rounded-2xl
                    bg-primary/60
                    px-4
                    py-3
                    text-center
                    transition-colors
                    hover:bg-primary
                  "
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
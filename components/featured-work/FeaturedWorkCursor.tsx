"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FeaturedWorkCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;

    if (!cursor || !text) return;

    const finePointer = window.matchMedia(
      "(pointer: fine)",
    ).matches;

    if (!finePointer) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.35,
      ease: "power3",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.35,
      ease: "power3",
    });

    const move = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const activate = () => {
      cursor.classList.add("is-active");
    };

    const deactivate = () => {
      cursor.classList.remove("is-active");
      text.textContent = "View";
    };

    const select = () => {
      cursor.classList.add("is-active");
      text.textContent = "Select";
    };

    window.addEventListener("mousemove", move);

    const mediaElements =
      document.querySelectorAll<HTMLElement>(
        "[data-work-media]",
      );

    const selectElements =
      document.querySelectorAll<HTMLElement>(
        "[data-cursor-select]",
      );

    mediaElements.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        activate,
      );

      element.addEventListener(
        "mouseleave",
        deactivate,
      );
    });

    selectElements.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        select,
      );

      element.addEventListener(
        "mouseleave",
        deactivate,
      );
    });

    return () => {
      window.removeEventListener("mousemove", move);

      mediaElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          activate,
        );

        element.removeEventListener(
          "mouseleave",
          deactivate,
        );
      });

      selectElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          select,
        );

        element.removeEventListener(
          "mouseleave",
          deactivate,
        );
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[100]
        hidden
        h-[14px]
        w-[14px]
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        bg-[#f2efe9]
        mix-blend-difference
        transition-[width,height]
        duration-300
        ease-out
        lg:flex
        [.is-active]:h-[84px]
        [.is-active]:w-[84px]
      "
    >
      <span
        ref={textRef}
        className="
          text-[11px]
          uppercase
          tracking-[0.06em]
          text-[#0c0c0d]
          opacity-0
          transition-opacity
          duration-200
          [.is-active_&]:opacity-100
        "
      >
        View
      </span>
    </div>
  );
}
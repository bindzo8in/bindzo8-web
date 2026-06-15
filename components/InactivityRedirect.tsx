"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes in ms

export default function InactivityRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // Only redirect if not already on the home page
      if (pathname !== "/") {
        router.push("/#services");
      } else {
        // Already on home — just scroll to the services section
        const servicesEl = document.getElementById("services");
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, INACTIVITY_TIMEOUT);
  }, [pathname, router]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ];

    // Start the timer immediately
    resetTimer();

    // Reset on any user interaction
    const handleActivity = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [resetTimer]);

  return null; // This component renders nothing
}

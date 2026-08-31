"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes

export default function InactivityRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDashboard = pathname.startsWith("/dashboard");

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (pathname !== "/") {
        router.push("/#services");
      } else {
        const servicesEl = document.getElementById("services");

        if (servicesEl) {
          servicesEl.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }, INACTIVITY_TIMEOUT);
  }, [pathname, router]);

  useEffect(() => {
    // Completely disable inactivity redirect in dashboard
    if (isDashboard) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ];

    const handleActivity = () => resetTimer();

    resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, {
        passive: true,
      });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer, isDashboard]);

  return null;
}
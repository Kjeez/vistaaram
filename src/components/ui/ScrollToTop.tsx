"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window to the top on every route change, except when the URL has a #section
 * (e.g. the footer's "/#faq"): then it scrolls to that section instead.
 * Rendered once in the root layout — no UI output.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // The section may render a moment after navigation, and images/animations above it can
    // shift it; aim for it a few times while the page settles.
    const timers = [0, 150, 500, 1200].map((ms) =>
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}

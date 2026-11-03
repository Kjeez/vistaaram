"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll animations measure where each section starts when they are created. Images, reviews
 * and other content that load later change the page height, which leaves those measurements
 * stale (a section's reveal animation can then fire in the wrong place). Re-measure after the
 * page finishes loading and whenever the page height changes.
 */
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);

    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) > 40) {
        lastHeight = height;
        refresh();
      }
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      observer.disconnect();
    };
  }, []);

  return null;
}

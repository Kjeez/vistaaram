"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps page content with a smooth fade entrance animation.
 * Avoids transforms on the page container so position: sticky works reliably.
 */
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          if (el) {
            el.style.opacity = "";
            el.style.transform = "";
          }
        },
      }
    );

    return () => {
      if (el) {
        gsap.killTweensOf(el);
        el.style.opacity = "";
        el.style.transform = "";
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

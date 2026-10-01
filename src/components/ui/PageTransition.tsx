"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps page content with a smooth GSAP fade-up entrance animation.
 * Use this around <main> in each page that needs an entry animation.
 */
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Kill any leftover tweens on this element
    gsap.killTweensOf(ref.current);

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

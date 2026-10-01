"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { navbarContent } from "@/data/content";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

/* ── SVG Icon Components ────────────────────────────── */

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-[22px] h-[22px] ${className}`}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-[22px] h-[22px] ${className}`}
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 ${className}`}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function OmIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="currentColor"
      className={`w-[26px] h-[26px] ${className}`}
    >
      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fontSize="34" fontFamily="serif" fontWeight="400">ॐ</text>
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <span
        className={`block h-0.5 w-full bg-maroon-dark rounded transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[9px]" : ""
          }`}
      />
      <span
        className={`block h-0.5 w-full bg-maroon-dark rounded transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""
          }`}
      />
      <span
        className={`block h-0.5 w-full bg-maroon-dark rounded transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[9px]" : ""
          }`}
      />
    </div>
  );
}

/* ── Navbar Component ───────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: navRef }
  );

  // Track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 w-full bg-cream h-[72px] px-[48px] lg:px-[96px] transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_15px_rgba(43,15,20,0.06)]" : ""
          }`}
      >
        <div className="w-full h-full mx-auto flex items-center justify-between">
          {/* ── Left: Logo ── */}
          <Link href="/" className="shrink-0 relative flex items-center h-full pt-1 pb-1" aria-label="Vistaaram Home">
            <Image
              src={navbarContent.logo}
              alt="Vistaaram - From Devbhoomi Uttarakhand"
              width={200}
              height={55}
              className="h-full w-auto object-contain py-1"
              priority
            />
          </Link>

          {/* ── Center: Nav Links (desktop only) ── */}
          <div className="hidden lg:flex items-center gap-10">
            {navbarContent.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-[17px] font-display text-maroon-dark hover:text-maroon transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right: Icons & Tagline ── */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              className="p-1 hover:text-maroon transition-colors duration-200 cursor-pointer text-maroon-dark"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-1 hover:text-maroon transition-colors duration-200 cursor-pointer text-maroon-dark"
              aria-label={`Cart (${count} items)`}
            >
              <CartIcon />
              {/* Count badge */}
              <span className="absolute top-0 -right-1.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-maroon-dark text-white text-[10px] font-bold leading-none px-1 border border-cream">
                {count}
              </span>
            </Link>

            {/* First Divider */}
            <div className="hidden lg:block w-px h-8 bg-[#E5DCC5] mx-1" />

            {/* Tagline */}
            <div className="hidden lg:block text-left leading-[1.2]">
              <div className="text-[9px] tracking-[0.1em] text-gold-light font-semibold uppercase">
                {navbarContent.taglineSide.line1}
              </div>
              <div className="text-[9px] tracking-[0.1em] text-gold-light font-semibold uppercase">
                {navbarContent.taglineSide.line2}
              </div>
              <div className="text-[9px] tracking-[0.1em] text-gold-light font-semibold uppercase">
                {navbarContent.taglineSide.line3}
              </div>
            </div>

            {/* Second Divider */}
            <div className="hidden lg:block w-px h-8 bg-[#E5DCC5] mx-1" />

            {/* Om Icon */}
            <div className="hidden lg:block">
              <OmIcon className="text-gold" />
            </div>

            {/* Hamburger (mobile/tablet) */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-maroon/5 transition-colors duration-200 cursor-pointer ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-maroon-dark/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-cream shadow-2xl transition-transform duration-500 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-8">
            {/* Links */}
            <nav className="flex flex-col gap-1">
              {navbarContent.links.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-4 text-2xl font-display font-semibold text-maroon-dark hover:text-maroon transition-colors border-b border-gold/10"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animation: mobileOpen
                      ? `fadeInUp 0.4s ease-out ${i * 80}ms forwards`
                      : "none",
                    opacity: mobileOpen ? 0 : 1,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="mt-auto space-y-6">
              {/* WhatsApp */}
              <a
                href={navbarContent.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-base font-medium text-[#25D366]"
              >
                <WhatsAppIcon />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Tagline */}
              <div className="flex items-center gap-3 pt-4 border-t border-gold/15">
                <OmIcon className="text-maroon" />
                <div className="leading-tight">
                  <div className="text-[10px] tracking-[0.2em] text-maroon-dark font-semibold uppercase">
                    {navbarContent.taglineSide.line1}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-maroon-dark font-semibold uppercase">
                    {navbarContent.taglineSide.line2} {navbarContent.taglineSide.line3}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

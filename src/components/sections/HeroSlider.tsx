"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { heroSlides } from "@/data/content";
import { useCart } from "@/context/CartContext";

/* =========================================================
   ICONS
========================================================= */

function CartIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="20" cy="21" r="1.5" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  if (paused) {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }

  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function ArrowIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}

/* =========================================================
   ARROW BUTTON
========================================================= */

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "left"
          ? "Previous slide"
          : "Next slide"
      }
      className="
        group
        w-[58px]
        h-[58px]
        rounded-full
        bg-[#FAF6EE]
        border
        border-[#E6DED2]
        shadow-[0_4px_18px_rgba(60,35,20,0.10)]
        flex
        items-center
        justify-center
        text-[#6E2028]
        transition-all
        duration-300
        hover:bg-white
        hover:shadow-[0_8px_24px_rgba(60,35,20,0.16)]
        hover:scale-[1.03]
        cursor-pointer
      "
    >
      <span
        className="
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        <ArrowIcon direction={direction} />
      </span>
    </button>
  );
}

/* =========================================================
   HERO SLIDER
========================================================= */

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-image-block", {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.from(".hero-content-block", {
        x: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: heroRef }
  );

  const { addToCart } = useCart();

  const total = heroSlides.length;
  const slide = heroSlides[current];

  /* =======================================================
     CHANGE SLIDE
  ======================================================= */

  const goTo = useCallback(
    (index: number) => {
      if (
        isTransitioning ||
        index === current
      ) {
        return;
      }

      setIsTransitioning(true);
      setCurrent(index);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo(
      (current - 1 + total) % total
    );
  }, [current, total, goTo]);

  /* =======================================================
     AUTOPLAY — 5 SECONDS
  ======================================================= */

  useEffect(() => {
    if (paused || total <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      next();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused, next, total]);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyboard = (
      event: KeyboardEvent
    ) => {
      if (event.key === "ArrowLeft") {
        prev();
      }

      if (event.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [prev, next]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="hero"
      ref={heroRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FAF6EE]
      "
    >

      {/* ==================================================
          MAIN HERO
      ================================================== */}

      <div
        className="
          relative
          w-full
          h-[680px]
          lg:h-[640px]
          xl:h-[640px]
          overflow-hidden
        "
      >

        {/* =================================================
            LEFT — PHOTOGRAPH
        ================================================= */}

        <div
          className="
            hero-image-block
            absolute
            inset-y-0
            left-0
            w-full
            lg:w-[56%]
            overflow-hidden
            bg-black
          "
        >
          {heroSlides.map(
            (item, index) => (
              <div
                key={item.id}
                className={`
                  absolute
                  inset-0
                  transition-opacity
                  duration-700
                  ease-in-out
                  ${index === current
                    ? "opacity-100 z-[1]"
                    : "opacity-0 z-0 pointer-events-none"
                  }
                `}
              >
                <Image
                  src={item.image}
                  alt={item.headline.replace(
                    "\n",
                    " "
                  )}
                  fill
                  priority={index === 0}
                  sizes="
                    (max-width: 1024px) 100vw,
                    56vw
                  "
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>
            )
          )}

          {/* =================================================
              VERY SUBTLE CINEMATIC VIGNETTE
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              z-[2]
              pointer-events-none
              bg-gradient-to-r
              from-black/5
              via-transparent
              to-black/10
            "
          />

          {/* =================================================
              BOTTOM LEFT EDITORIAL CAPTION
          ================================================= */}

          <div
            className="
              absolute
              z-[10]
              left-[40px]
              bottom-[32px]
              text-white
              pointer-events-none
            "
          >
            <p
              className="
                uppercase
                tracking-[0.28em]
                text-[11px]
                font-medium
                leading-[1.7]
                drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]
              "
            >
              {slide.bottomLeft.line1}
              <br />
              {slide.bottomLeft.line2}
            </p>
          </div>
        </div>

        {/* ==================================================
            RIGHT — EDITORIAL CREAM PANEL
        ================================================== */}

        <div
          className="
            absolute
            inset-y-0
            right-0
            w-full
            lg:w-[44%]
            bg-[#FAF6EE]
            z-[4]
            flex
            items-center
          "
        >

          {/* =================================================
              SIDE FLOWER — ONLY ADDITION
              
              File:
              /public/images/side_flower.png

              This sits behind the content and stays subtle.
          ================================================= */}

          <div
            className="
              absolute
              top-0
              right-[-12px]
              h-full
              w-[190px]
              pointer-events-none
              select-none
              z-[3]
              overflow-hidden
            "
          >
            <Image
              src="/images/side_flower.png"
              alt=""
              fill
              priority
              sizes="190px"
              className="
                object-contain
                object-right
                opacity-[0.28]
              "
            />
          </div>

          {/* =================================================
              SUBTLE PAPER TEXTURE / LIGHT RADIAL WARMTH
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-40
            "
            style={{
              background:
                "radial-gradient(circle at 15% 30%, rgba(201,162,75,0.08), transparent 32%), radial-gradient(circle at 90% 80%, rgba(122,31,43,0.035), transparent 28%)",
            }}
          />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-[10]
              w-full
              px-[42px]
              lg:px-[58px]
              xl:px-[72px]
              pt-[10px]
              pb-[115px]
            "
          >

            {/* =================================================
                EYEBROW
            ================================================= */}

            <p
              key={`label-${current}`}
              className="
                hero-content-block
                text-[#B48635]
                uppercase
                tracking-[0.20em]
                text-[13px]
                lg:text-[14px]
                font-semibold
                mb-[17px]
              "
            >
              {slide.label}
            </p>

            {/* =================================================
                HEADLINE
            ================================================= */}

            <h1
              key={`headline-${current}`}
              className="
                hero-content-block
                text-[#751E29]
                font-display
                font-semibold
                text-[52px]
                lg:text-[58px]
                xl:text-[62px]
                leading-[0.98]
                tracking-[-0.025em]
                max-w-[610px]
                whitespace-pre-line
                mb-[19px]
              "
            >
              {slide.headline}
            </h1>

            {/* =================================================
                GOLD SHORT RULE
            ================================================= */}

            <div
              className="
                hero-content-block
                w-[78px]
                h-[2px]
                bg-[#C9A24B]
                mb-[22px]
              "
            />

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              key={`description-${current}`}
              className="
                hero-content-block
                text-[#393331]
                font-body
                text-[16px]
                lg:text-[17px]
                leading-[1.55]
                max-w-[570px]
                mb-[27px]
              "
            >
              {slide.subheadline}
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div
              key={`buttons-${current}`}
              className="
                hero-content-block
                flex
                flex-wrap
                items-center
                gap-[14px]
                mb-[30px]
              "
            >

              {/* PRIMARY */}

              <button
                type="button"
                onClick={() =>
                  addToCart()
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-[10px]
                  h-[56px]
                  px-[29px]
                  rounded-full
                  bg-[#7A1F2B]
                  text-[#FAF6EE]
                  text-[12px]
                  font-semibold
                  tracking-[0.10em]
                  uppercase
                  shadow-[0_6px_18px_rgba(122,31,43,0.18)]
                  hover:bg-[#651821]
                  hover:shadow-[0_8px_22px_rgba(122,31,43,0.24)]
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                <CartIcon />

                <span>
                  {slide.cta ||
                    "ADD TO CART — ₹279"}
                </span>
              </button>

              {/* SECONDARY */}

              <a
                href={
                  slide.ctaSecondaryLink ||
                  "#process"
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  h-[56px]
                  px-[29px]
                  rounded-full
                  border
                  border-[#C9A24B]
                  text-[#8A5D20]
                  bg-transparent
                  text-[12px]
                  font-semibold
                  tracking-[0.10em]
                  uppercase
                  hover:bg-[#C9A24B]/[0.06]
                  transition-all
                  duration-300
                "
              >
                {slide.ctaSecondary ||
                  "OUR PROCESS ↓"}
              </a>
            </div>

            {/* =================================================
                TRUST ROW
            ================================================= */}

            <div
              key={`trust-${current}`}
              className="
                hero-content-block
                flex
                items-center
                flex-wrap
                gap-y-[10px]
                text-[#514A45]
                text-[14px]
                font-medium
              "
            >

              {/* Rating */}

              <div className="flex items-center gap-[7px]">
                <span
                  className="
                    text-[#C9A24B]
                    text-[20px]
                    leading-none
                  "
                >
                  ★
                </span>

                <span>
                  4.8
                </span>
              </div>

              <span
                className="
                  w-px
                  h-[19px]
                  bg-[#A79C91]/50
                  mx-[5px]
                "
              />

              {/* Cups */}

              <div className="flex items-center gap-[7px]">
                <span className="text-[#C9A24B]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />

                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />

                    <line
                      x1="12"
                      y1="22.08"
                      x2="12"
                      y2="12"
                    />
                  </svg>
                </span>

                <span>
                  12 Cups
                </span>
              </div>

              <span
                className="
                  w-px
                  h-[19px]
                  bg-[#A79C91]/50
                  mx-[5px]
                "
              />

              {/* Uttarakhand */}

              <div className="flex items-center gap-[7px]">
                <span className="text-[#C9A24B]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                  >
                    <path d="M2 19l7-9 4 5 3-4 6 8" />
                    <path d="M5 19l4-4 2 2 3-4" />
                  </svg>
                </span>

                <span>
                  Made in Uttarakhand
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              MOUNTAIN ELEMENT
              EXISTING — UNCHANGED
          ================================================= */}

          <div
            className="
              absolute
              right-[-12px]
              bottom-[-5px]
              w-[72%]
              max-w-[610px]
              z-[6]
              pointer-events-none
              select-none
            "
          >
            <Image
              src="/images/mountainelement.png"
              alt=""
              width={1000}
              height={260}
              priority
              className="
                w-full
                h-auto
                object-contain
                object-right-bottom
                opacity-[0.72]
              "
            />
          </div>

          {/* =================================================
              HANDWRITTEN MOUNTAIN CAPTION

              Existing code retained.
              Remove only if the text is already included
              inside mountainelement.png.
          ================================================= */}

          {/*
          <div
            className="
              absolute
              right-[38px]
              bottom-[100px]
              z-[8]
              text-[#C49343]
              font-display
              italic
              text-[17px]
              leading-[1.15]
              rotate-[-4deg]
            "
          >
            <div>Some</div>
            <div>Sacred Mountains</div>
            <div>Now in Your Home</div>

            <div className="mt-2 ml-auto w-[45px] h-[1px] bg-[#C49343]" />
          </div>
          */}
        </div>

        {/* ==================================================
            PAUSE — TOP RIGHT
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            setPaused(
              (value) => !value
            )
          }
          aria-label={
            paused
              ? "Play slideshow"
              : "Pause slideshow"
          }
          className="
            absolute
            right-[35px]
            top-[25px]
            z-[30]
            flex
            items-center
            gap-[9px]
            text-[#765D4A]
            hover:text-[#7A1F2B]
            transition-colors
            duration-300
            cursor-pointer
          "
        >
          <PauseIcon
            paused={paused}
          />

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.13em]
              font-medium
            "
          >
            {paused
              ? "PLAY"
              : "PAUSE"}
          </span>
        </button>

        {/* ==================================================
            LEFT ARROW
        ================================================== */}

        <div
          className="
            absolute
            left-[21px]
            top-1/2
            -translate-y-1/2
            z-[30]
          "
        >
          <ArrowButton
            direction="left"
            onClick={prev}
          />
        </div>

        {/* ==================================================
            RIGHT ARROW
        ================================================== */}

        <div
          className="
            absolute
            right-[21px]
            top-1/2
            -translate-y-1/2
            z-[30]
          "
        >
          <ArrowButton
            direction="right"
            onClick={next}
          />
        </div>

        {/* ==================================================
            PROGRESS + DOTS
        ================================================== */}

        <div
          className="
            absolute
            z-[30]
            left-[40%]
            bottom-[48px]
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-[11px]
          "
        >

          {/* Progress */}

          <div
            className="
              relative
              w-[315px]
              h-[2px]
              bg-white/35
              overflow-hidden
            "
          >
            <div
              key={`progress-${current}`}
              className={`
                absolute
                left-0
                top-0
                h-full
                bg-[#FAF6EE]
                ${paused
                  ? "w-0"
                  : "animate-hero-progress"
                }
              `}
            />
          </div>

          {/* Dots */}

          <div className="flex items-center gap-[11px]">
            {heroSlides.map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    goTo(index)
                  }
                  aria-label={`Go to slide ${index + 1
                    }`}
                  className={`
                    rounded-full
                    border
                    border-[#C9A24B]
                    transition-all
                    duration-300
                    cursor-pointer
                    ${index === current
                      ? "w-[13px] h-[13px] bg-[#C9A24B]"
                      : "w-[9px] h-[9px] bg-transparent"
                    }
                  `}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          MOBILE CONTENT
          EXISTING VERSION — UNCHANGED
      ==================================================== */}

      <div
        className="
          lg:hidden
          bg-[#FAF6EE]
          px-6
          py-12
        "
      >

        <p
          className="
            text-[#B48635]
            uppercase
            tracking-[0.18em]
            text-[11px]
            font-semibold
            mb-4
          "
        >
          {slide.label}
        </p>

        <h1
          className="
            text-[#751E29]
            font-display
            font-semibold
            text-[42px]
            leading-[0.98]
            tracking-[-0.02em]
            whitespace-pre-line
            mb-5
          "
        >
          {slide.headline}
        </h1>

        <div
          className="
            w-[60px]
            h-[2px]
            bg-[#C9A24B]
            mb-5
          "
        />

        <p
          className="
            text-[#393331]
            text-[15px]
            leading-[1.6]
            mb-7
          "
        >
          {slide.subheadline}
        </p>

        <div className="flex flex-col gap-3">

          <button
            type="button"
            onClick={() =>
              addToCart()
            }
            className="
              w-full
              h-[54px]
              rounded-full
              bg-[#7A1F2B]
              text-[#FAF6EE]
              font-semibold
              text-[12px]
              tracking-[0.1em]
              uppercase
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <CartIcon />

            {slide.cta ||
              "ADD TO CART — ₹279"}
          </button>

          <a
            href={
              slide.ctaSecondaryLink ||
              "#process"
            }
            className="
              w-full
              h-[54px]
              rounded-full
              border
              border-[#C9A24B]
              text-[#7A1F2B]
              font-semibold
              text-[12px]
              tracking-[0.1em]
              uppercase
              flex
              items-center
              justify-center
            "
          >
            {slide.ctaSecondary ||
              "OUR PROCESS ↓"}
          </a>
        </div>

        <div
          className="
            mt-7
            flex
            flex-wrap
            gap-4
            text-[13px]
            text-[#514A45]
          "
        >
          <span>
            ★ 4.8
          </span>

          <span>
            12 Cups
          </span>

          <span>
            Made in Uttarakhand
          </span>
        </div>
      </div>
    </section>
  );
}
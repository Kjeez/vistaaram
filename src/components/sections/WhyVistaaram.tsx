"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyVistaaram() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading entrance animation
      gsap.from(".why-heading", {
        scrollTrigger: {
          trigger: ".why-heading",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Temples image reveal animation
      gsap.from(".temples-img", {
        scrollTrigger: {
          trigger: ".temples-container",
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why"
      ref={containerRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FAF6EE]
        text-[#7A1F2B]
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 15%,
              rgba(201,162,75,0.08),
              transparent 38%
            ),
            radial-gradient(
              circle at 15% 60%,
              rgba(122,31,43,0.025),
              transparent 30%
            )
          `,
        }}
      />

      {/* =====================================================
          TOP CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          max-w-[1280px]
          px-6
          lg:px-10
          pt-4
          md:pt-6
          lg:pt-8
        "
      >

        {/* =================================================
            LEFT — FOUR DHAMS
        ================================================= */}

        <div
          className="
            absolute
            left-6
            lg:left-10
            top-[150px]
            lg:top-[150px]
            hidden
            md:block
            w-[210px]
          "
        >
          <p
            className="
              text-[#B48635]
              text-[10px]
              lg:text-[11px]
              uppercase
              tracking-[0.28em]
              font-medium
              mb-3
            "
          >
            FOUR DHAMS
          </p>

          <p
            className="
              font-display
              text-[#7A1F2B]
              text-[18px]
              lg:text-[20px]
              leading-[1.4]
            "
          >
            Yamunotri · Gangotri
            <br />
            Kedarnath · Badrinath
          </p>
        </div>

        {/* =================================================
            RIGHT — HINDI MESSAGE
        ================================================= */}

        <div
          className="
            absolute
            right-6
            lg:right-10
            top-[130px]
            lg:top-[130px]
            hidden
            md:block
            w-[200px]
            text-right
          "
        >
          <p
            className="
              font-display
              text-[#7A1F2B]
              text-[20px]
              lg:text-[22px]
              leading-[1.35]
            "
          >
            देवभूमि की
            <br />
            पवित्र सुगंध,
            <br />
            अब आपके घर में।
          </p>

          <p
            className="
              mt-3
              text-[#B48635]
              font-body
              text-[9px]
              lg:text-[10px]
              uppercase
              tracking-[0.18em]
              leading-[1.5]
            "
          >
            A FRAGRANCE OF
            <br />
            DEVBHOOMI
          </p>
        </div>

        {/* =================================================
            CENTER — BRAND + HEADLINE
        ================================================= */}

        <div
          className="
            mx-auto
            max-w-[760px]
            text-center
            mt-[60px]
            md:mt-[80px]
            lg:mt-[100px]
          "
        >

          {/* Brand label */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              mb-5
            "
          >
            <span
              className="
                hidden
                sm:block
                w-[75px]
                h-px
                bg-[#C9A24B]/45
              "
            />

            <span
              className="
                text-[#B48635]
                text-[10px]
                md:text-[11px]
                uppercase
                tracking-[0.38em]
                font-medium
              "
            >
              FROM THE SACRED LAND
            </span>

            <span
              className="
                hidden
                sm:block
                w-[75px]
                h-px
                bg-[#C9A24B]/45
              "
            />
          </div>

          {/* Main heading */}

          <h2
            className="
              why-heading
              font-display
              font-semibold
              text-[#7A1F2B]
              text-[46px]
              sm:text-[52px]
              md:text-[60px]
              lg:text-[68px]
              leading-[0.94]
              tracking-[-0.035em]
            "
          >
            Rooted in Devbhoomi
          </h2>

          {/* Decorative gold line */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
            "
          >
            <span
              className="
                w-[48px]
                h-px
                bg-[#C9A24B]/60
              "
            />

            <span
              className="
                text-[#C9A24B]
                text-[14px]
                leading-none
              "
            >
              ✦
            </span>

            <span
              className="
                w-[48px]
                h-px
                bg-[#C9A24B]/60
              "
            />
          </div>
        </div>

        {/* =================================================
            FOUR DHAM ROUTE — SMALL
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            mt-7
            md:mt-8
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              flex-wrap
              gap-x-3
              md:gap-x-5
              text-[#9B702C]
              text-[9px]
              md:text-[10px]
              uppercase
              tracking-[0.16em]
            "
          >
            <span>Yamunotri</span>

            <span className="text-[#C9A24B]">
              ✦
            </span>

            <span>Gangotri</span>

            <span className="text-[#C9A24B]">
              ✦
            </span>

            <span>Kedarnath</span>

            <span className="text-[#C9A24B]">
              ✦
            </span>

            <span>Badrinath</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOUNTAINS + TEMPLES ARTWORK
      ===================================================== */}

      <div
        className="
          temples-container
          relative
          z-10
          w-full
          mt-[-80px]
          md:mt-[-140px]
          lg:mt-[-180px]
        "
      >
        <Image
          src="/images/temples.png"
          alt="Himalayan temples of Devbhoomi"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="
            temples-img
            block
            w-full
            h-auto
            object-contain
            object-bottom
            select-none
            pointer-events-none
          "
        />

        {/* Soft ivory fade at bottom */}

        <div
          className="
            absolute
            left-0
            right-0
            bottom-0
            h-[70px]
            pointer-events-none
            bg-gradient-to-t
            from-[#FAF6EE]
            via-[#FAF6EE]/55
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          VISTAARAM PROMISE
      ===================================================== */}

      <div
        className="
          relative
          z-20
          max-w-[1180px]
          mx-auto
          px-6
          mt-[-18px]
          md:mt-[-25px]
          pb-10
          md:pb-12
        "
      >

        <div
          className="
            border-t
            border-[#C9A24B]/30
            pt-5
          "
        >

          {/* Promise heading */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              mb-5
            "
          >
            <span
              className="
                hidden
                sm:block
                w-[65px]
                h-px
                bg-[#C9A24B]/45
              "
            />

            <p
              className="
                text-[#B48635]
                uppercase
                tracking-[0.28em]
                text-[9px]
                md:text-[10px]
                font-medium
              "
            >
              THE VISTAARAM PROMISE
            </p>

            <span
              className="
                hidden
                sm:block
                w-[65px]
                h-px
                bg-[#C9A24B]/45
              "
            />
          </div>

          {/* =================================================
              PROMISE GRID
          ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
            "
          >

            {/* =================================================
                01 — CHARCOAL FREE
            ================================================= */}

            <div
              className="
                text-center
                px-4
                lg:px-7
                py-2
                lg:border-r
                border-[#C9A24B]/25
              "
            >
              <span
                className="
                  font-display
                  text-[#C9A24B]
                  text-[12px]
                "
              >
                01
              </span>

              <h3
                className="
                  mt-1
                  font-display
                  font-semibold
                  text-[#7A1F2B]
                  text-[18px]
                  md:text-[20px]
                "
              >
                Charcoal Free
              </h3>

              <p
                className="
                  mt-1
                  text-[#625A54]
                  text-[11px]
                  md:text-[12px]
                  leading-[1.45]
                "
              >
                A clean and natural burn.
              </p>
            </div>

            {/* =================================================
                02 — CHEMICAL FREE
            ================================================= */}

            <div
              className="
                text-center
                px-4
                lg:px-7
                py-2
                lg:border-r
                border-[#C9A24B]/25
              "
            >
              <span
                className="
                  font-display
                  text-[#C9A24B]
                  text-[12px]
                "
              >
                02
              </span>

              <h3
                className="
                  mt-1
                  font-display
                  font-semibold
                  text-[#7A1F2B]
                  text-[18px]
                  md:text-[20px]
                "
              >
                Chemical Free
              </h3>

              <p
                className="
                  mt-1
                  text-[#625A54]
                  text-[11px]
                  md:text-[12px]
                  leading-[1.45]
                "
              >
                Pure ingredients, nothing artificial.
              </p>
            </div>

            {/* =================================================
                03 — TEMPLE FLOWERS
            ================================================= */}

            <div
              className="
                text-center
                px-4
                lg:px-7
                py-2
                lg:border-r
                border-[#C9A24B]/25
              "
            >
              <span
                className="
                  font-display
                  text-[#C9A24B]
                  text-[12px]
                "
              >
                03
              </span>

              <h3
                className="
                  mt-1
                  font-display
                  font-semibold
                  text-[#7A1F2B]
                  text-[17px]
                  md:text-[19px]
                "
              >
                Temple Flowers
                <br />
                & Cow Dung
              </h3>

              <p
                className="
                  mt-1
                  text-[#625A54]
                  text-[11px]
                  md:text-[12px]
                  leading-[1.45]
                "
              >
                Sacred offerings,
                thoughtfully repurposed.
              </p>
            </div>

            {/* =================================================
                04 — PANDIT KNOWLEDGE
            ================================================= */}

            <div
              className="
                text-center
                px-4
                lg:px-7
                py-2
              "
            >
              <span
                className="
                  font-display
                  text-[#C9A24B]
                  text-[12px]
                "
              >
                04
              </span>

              <h3
                className="
                  mt-1
                  font-display
                  font-semibold
                  text-[#7A1F2B]
                  text-[17px]
                  md:text-[19px]
                "
              >
                500+ Pandit Ji's
                <br />
                Knowledge
              </h3>

              <p
                className="
                  mt-1
                  text-[#625A54]
                  text-[11px]
                  md:text-[12px]
                  leading-[1.45]
                "
              >
                Traditional wisdom in every blend.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE EDITORIAL TEXT
      ===================================================== */}

      <div
        className="
          md:hidden
          px-6
          pb-8
          text-center
        "
      >

        {/* Hindi */}

        <div className="mb-6">
          <p
            className="
              font-display
              text-[#7A1F2B]
              text-[20px]
              leading-[1.4]
            "
          >
            देवभूमि की
            <br />
            पवित्र सुगंध,
            <br />
            अब आपके घर में।
          </p>

          <p
            className="
              mt-2
              text-[#B48635]
              text-[9px]
              uppercase
              tracking-[0.18em]
            "
          >
            A FRAGRANCE OF
            <br />
            DEVBHOOMI
          </p>
        </div>

        {/* Four Dhams */}

        <p
          className="
            text-[#B48635]
            text-[9px]
            uppercase
            tracking-[0.22em]
          "
        >
          FOUR DHAMS
        </p>

        <p
          className="
            mt-1
            font-display
            text-[#7A1F2B]
            text-[16px]
          "
        >
          Yamunotri · Gangotri · Kedarnath · Badrinath
        </p>

      </div>
    </section>
  );
} 
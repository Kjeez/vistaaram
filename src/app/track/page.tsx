import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import PolicyHeader from "@/components/sections/policy/PolicyHeader";
import TrackForm from "@/components/sections/track/TrackForm";
import Image from "next/image";
import { FlowerSpray, Mandala, MaroonBand, OrnamentDivider } from "@/components/ui/Decor";
import { businessDetails, trackContent } from "@/data/content";

export const metadata: Metadata = {
  title: trackContent.metaTitle,
  description: trackContent.metaDescription,
};

export default function TrackPage() {
  const { email, phone, phoneHref, whatsappLink, supportHours } = businessDetails;

  return (
    <>
      <Navbar />

      <PageTransition>
        <main className="bg-[#FAF6EE]">
          <PolicyHeader eyebrow={trackContent.eyebrow} headline={trackContent.headline} subline={trackContent.subline} />

          <section className="relative overflow-hidden max-w-[1060px] mx-auto px-4 md:px-8 pt-4 pb-16 md:pb-20">
            <Mandala className="absolute -left-56 top-0 w-[480px] h-[480px]" opacity={0.06} />
            <Mandala className="absolute -right-56 bottom-0 w-[480px] h-[480px]" opacity={0.06} />
            <div className="relative flex flex-col lg:flex-row gap-8 items-start">
              {/* Form */}
              <div className="relative w-full lg:flex-1 rounded-2xl border border-[#C9A24B]/35 bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(60,35,20,0.06)] overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C9A24B]/30 via-[#C9A24B] to-[#C9A24B]/30" aria-hidden="true" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-14 shrink-0" aria-hidden="true">
                    <Image src="/images/diya.png" alt="" fill sizes="64px" className="object-contain" />
                  </div>
                  <div>
                    <p className="font-display text-[#7A1F2B] text-[22px] leading-tight">Find your order</p>
                    <p className="text-[13px] text-[#8E8783]">We reply on WhatsApp with the latest status.</p>
                  </div>
                </div>
                <TrackForm />
              </div>

              {/* What happens next */}
              <div className="relative w-full lg:w-[40%] shrink-0 rounded-2xl border border-[#C9A24B]/35 bg-[#FFFDF8] p-6 md:p-7 overflow-hidden">
                <FlowerSpray variant={2} className="absolute -right-6 -top-4 w-[90px] h-[130px]" opacity={0.3} />
                <p className="text-[#B48635] text-[11px] uppercase tracking-[0.24em] font-semibold mb-5">Your order&apos;s journey</p>
                <ol className="relative flex flex-col gap-6">
                  <span className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-[#C9A24B] to-[#C9A24B]/20" aria-hidden="true" />
                  {trackContent.steps.map((step, idx) => (
                    <li key={step.title} className="relative flex gap-4">
                      <span className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-[#7A1F2B] text-[#FAF6EE] text-[14px] font-semibold flex items-center justify-center ring-4 ring-[#FFFDF8]">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-display text-[#7A1F2B] text-[17px] leading-tight">{step.title}</p>
                        <p className="text-[#6B6259] text-[14px] mt-1">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Help */}
          <MaroonBand>
            <div className="mx-auto max-w-[760px] px-5 py-14 text-center">
              <h2 className="font-display text-[#FAF6EE] text-[28px] sm:text-[34px] leading-tight">{trackContent.helpTitle}</h2>
              <OrnamentDivider light className="mt-5" />
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[50px] px-7 rounded-full bg-[#C9A24B] text-[#5E1620] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#EADAB8] transition-colors"
                >
                  WhatsApp us
                </a>
                <a
                  href={phoneHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[50px] px-7 rounded-full border border-[#C9A24B] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#C9A24B]/15 transition-colors"
                >
                  Call {phone}
                </a>
              </div>
              <p className="mt-6 text-[14px] text-[#FAF6EE]/75">
                <a href={`mailto:${email}`} className="underline underline-offset-2">{email}</a> · {supportHours}
              </p>
              <p className="mt-3 text-[13px] text-[#FAF6EE]/60">
                Delivery timelines are in our{" "}
                <Link href="/shipping" className="underline underline-offset-2 text-[#E8C77A]">Shipping Policy</Link>.
              </p>
            </div>
          </MaroonBand>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}

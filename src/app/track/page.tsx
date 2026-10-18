import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import PolicyHeader from "@/components/sections/policy/PolicyHeader";
import TrackForm from "@/components/sections/track/TrackForm";
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

          <section className="max-w-[1000px] mx-auto px-4 md:px-8 pb-16 md:pb-20">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Form */}
              <div className="w-full lg:flex-1 rounded-2xl border border-[#E5DCC8] bg-white p-6 md:p-8">
                <TrackForm />
              </div>

              {/* What to expect + help */}
              <div className="w-full lg:w-[38%] shrink-0 flex flex-col gap-6">
                <div className="rounded-2xl border border-[#E5DCC8] bg-white p-6">
                  <ol className="flex flex-col gap-5">
                    {trackContent.steps.map((step, idx) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="w-8 h-8 shrink-0 rounded-full bg-[#FAF4E8] border border-[#C9A24B]/50 text-[#7A1F2B] text-[14px] font-semibold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-[#4A3728] text-[15px]">{step.title}</p>
                          <p className="text-[#6B6259] text-[14px]">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-[#E5DCC8] bg-white p-6">
                  <h2 className="font-display text-[22px] font-medium text-[#7A1F2B] mb-3">{trackContent.helpTitle}</h2>
                  <ul className="flex flex-col gap-2 text-[15px] text-[#4A3728]">
                    <li>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#7A1F2B] underline underline-offset-2">
                        WhatsApp us
                      </a>{" "}
                      or call{" "}
                      <a href={phoneHref} className="text-[#7A1F2B] underline underline-offset-2">
                        {phone}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${email}`} className="text-[#7A1F2B] underline underline-offset-2">
                        {email}
                      </a>
                    </li>
                    <li className="text-[#6B6259] text-[14px]">{supportHours}</li>
                  </ul>
                  <p className="mt-4 text-[14px] text-[#6B6259]">
                    See our{" "}
                    <Link href="/shipping" className="text-[#7A1F2B] underline underline-offset-2">
                      Shipping Policy
                    </Link>{" "}
                    for delivery timelines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}

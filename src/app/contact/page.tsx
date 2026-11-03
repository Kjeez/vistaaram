import { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { FlowerSpray, Mandala, MaroonBand, OrnamentDivider, PageHero } from "@/components/ui/Decor";
import { businessDetails, contactContent } from "@/data/content";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMap from "@/components/sections/contact/ContactMap";
import QuickHelp from "@/components/sections/contact/QuickHelp";
import PahadiDivider from "@/components/ui/PahadiDivider";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Contact Us — Vistaaram",
  description:
    "Get in touch with Vistaaram. Questions about your order, bulk temple bookings, or general enquiries — we reply within 24 hours. Call, WhatsApp, or email us.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sati Enterprises (Vistaaram)",
  url: "https://vistaaram.in",
  telephone: "+91-7819058084",
  email: "contact@vistaaram.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sahastradhara Road",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    postalCode: "248013",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 10:00-19:00",
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <PageTransition>
        <main className="bg-[#FAF6EE]">
          <PageHero
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            eyebrow={contactContent.header.eyebrow}
            title={contactContent.header.headline}
            subtitle={contactContent.header.subline}
          />

          {/* Main 2-col grid: Info (40%) + Form (60%) */}
          <section className="relative overflow-hidden max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
            <Mandala className="absolute -left-48 top-10 w-[480px] h-[480px]" opacity={0.06} />
            <Mandala className="absolute -right-48 bottom-0 w-[480px] h-[480px]" opacity={0.06} />
            <FlowerSpray variant={2} className="hidden xl:block absolute -right-24 top-0 w-[140px] h-[200px]" opacity={0.4} />
            <div
              className="relative flex flex-col lg:flex-row gap-8 lg:gap-10 items-start"
              style={{ "--info-w": "40%", "--form-w": "60%" } as React.CSSProperties}
            >
              {/* Info column — stacks first on mobile */}
              <div className="w-full lg:w-[40%] shrink-0">
                <ContactInfo />
              </div>

              {/* Form column */}
              <div className="w-full lg:flex-1">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Map */}
          <ContactMap />



          {/* Bulk orders */}
          <MaroonBand>
            <div className="mx-auto max-w-[760px] px-5 py-14 md:py-16 text-center">
              <p className="text-[#E8C77A] text-[11px] sm:text-[12px] uppercase tracking-[0.26em] font-semibold mb-3">
                For temples &amp; events
              </p>
              <h2 className="font-display text-[#FAF6EE] text-[28px] sm:text-[36px] leading-tight">Bulk orders, made with devotion</h2>
              <OrnamentDivider light className="mt-5" />
              <p className="mt-5 text-[#FAF6EE]/80 text-[15px] leading-relaxed">
                Ordering for a temple, a hawan or a community event? Message us the quantity and date and we&apos;ll
                share bulk pricing.
              </p>
              <a
                href={`https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent("Hi Vistaaram, I'd like bulk pricing for sambrani cups.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center h-[50px] px-8 rounded-full bg-[#C9A24B] text-[#5E1620] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#EADAB8] transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>
          </MaroonBand>

          <PahadiDivider className="py-4 bg-[#FAF6EE]" />

          {/* Quick Help */}
          <QuickHelp />
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}

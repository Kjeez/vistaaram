import { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactHeader from "@/components/sections/contact/ContactHeader";
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
          {/* Header — eyebrow + headline + subline */}
          <ContactHeader />

          <PahadiDivider className="py-4 bg-[#FAF6EE]" />

          {/* Main 2-col grid: Info (40%) + Form (60%) */}
          <section className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
            <div
              className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start"
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

          <PahadiDivider className="py-4 bg-[#FAF6EE]" />

          {/* Quick Help */}
          <QuickHelp />
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}

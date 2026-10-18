import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import PolicyHeader from "@/components/sections/policy/PolicyHeader";
import { businessDetails, PolicyPageContent } from "@/data/content";

const policyLinks = [
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function BusinessCard() {
  const { brand, legalName, addressLines, email, phone, phoneHref, whatsappLink, supportHours, gstin, grievanceOfficer } =
    businessDetails;

  return (
    <aside className="rounded-2xl border border-[#E5DCC8] bg-white p-6 md:p-8">
      <h2 className="font-display text-[22px] font-medium text-[#7A1F2B] mb-4">Business details</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-3 text-[15px] text-[#4A3728]">
        <dt className="text-[#8E8783]">Business</dt>
        <dd>
          {legalName} ({brand})
        </dd>
        <dt className="text-[#8E8783]">Address</dt>
        <dd>{addressLines.join(", ")}</dd>
        <dt className="text-[#8E8783]">Email</dt>
        <dd>
          <a href={`mailto:${email}`} className="text-[#7A1F2B] underline underline-offset-2">
            {email}
          </a>
        </dd>
        <dt className="text-[#8E8783]">Phone / WhatsApp</dt>
        <dd>
          <a href={phoneHref} className="text-[#7A1F2B] underline underline-offset-2">
            {phone}
          </a>{" "}
          ·{" "}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#7A1F2B] underline underline-offset-2">
            WhatsApp
          </a>
        </dd>
        <dt className="text-[#8E8783]">Support hours</dt>
        <dd>{supportHours}</dd>
        {grievanceOfficer && (
          <>
            <dt className="text-[#8E8783]">Grievance Officer</dt>
            <dd>
              {grievanceOfficer} — {email}
            </dd>
          </>
        )}
        {gstin && (
          <>
            <dt className="text-[#8E8783]">GSTIN</dt>
            <dd className="font-mono tracking-wider">{gstin}</dd>
          </>
        )}
      </dl>
    </aside>
  );
}

export default function PolicyPage({ content, currentHref }: { content: PolicyPageContent; currentHref: string }) {
  return (
    <>
      <Navbar />

      <PageTransition>
        <main className="bg-[#FAF6EE]">
          <PolicyHeader
            eyebrow={content.eyebrow}
            headline={content.headline}
            subline={content.subline}
            lastUpdated={content.lastUpdated}
          />

          <section className="max-w-[860px] mx-auto px-4 md:px-8 pb-16 md:pb-20">
            {/* Related policies */}
            <nav aria-label="Store policies" className="flex flex-wrap justify-center gap-2 mb-10">
              {policyLinks.map((link) => {
                const active = link.href === currentHref;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                      active
                        ? "border-[#7A1F2B] bg-[#7A1F2B] text-white"
                        : "border-[#E5DCC8] bg-white text-[#6B6259] hover:border-[#C9A24B] hover:text-[#7A1F2B]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="rounded-2xl border border-[#E5DCC8] bg-white p-6 md:p-10 mb-8">
              {content.sections.map((section, idx) => (
                <div key={section.heading} className={idx > 0 ? "mt-8 pt-8 border-t border-[#F0E8D8]" : ""}>
                  <h2 className="font-display text-[22px] md:text-[24px] font-medium text-[#7A1F2B] mb-3">
                    {section.heading}
                  </h2>
                  {section.body?.map((para) => (
                    <p key={para} className="text-[15px] md:text-[16px] leading-[1.8] text-[#4A3728] mb-3">
                      {para}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="flex flex-col gap-2.5 mt-1">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] md:text-[16px] leading-[1.7] text-[#4A3728]">
                          <span className="text-[#C9A24B] mt-[2px] shrink-0" aria-hidden="true">
                            ✦
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <BusinessCard />
          </section>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}

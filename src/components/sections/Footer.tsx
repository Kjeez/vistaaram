import { footerContent } from "@/data/content";
import Image from "next/image";
import Link from "next/link";

function SmallLotus() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
      <path d="M12 22c0-4.5 2.5-8 6-9-3 1-6 4.5-6 9z" fill="currentColor" />
      <path d="M12 22c0-4.5-2.5-8-6-9 3 1 6 4.5 6 9z" fill="currentColor" />
      <path d="M12 22c0-7 4-12 8-14-3 1.5-8 7-8 14z" fill="currentColor" />
      <path d="M12 22c0-7-4-12-8-14 3 1.5 8 7 8 14z" fill="currentColor" />
      <path d="M12 22c0-9 0-16 0-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
    pinterest: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg> // Placeholder
    ),
  };
  return icons[type] || icons.instagram;
}

export default function Footer() {
  const { tagline } = footerContent;

  return (
    <footer className="relative bg-[#5A1520] text-[#FAF6EE] overflow-hidden">
      
      {/* Background Decoratives */}
      <div className="absolute -top-[150px] -left-[150px] w-[400px] h-[400px] pointer-events-none select-none opacity-20 z-0">
        <Image
          src="/images/circle_design.png"
          alt="Decorative Mandala"
          fill
          className="object-contain animate-[spin_60s_linear_infinite]"
        />
      </div>

      {/* Decorative Temple */}
      <div className="absolute right-0 bottom-0 w-[200px] md:w-[350px] lg:w-[450px] h-[250px] md:h-[400px] lg:h-[500px] pointer-events-none select-none opacity-40 z-0">
        <Image
          src="/images/temples_footer.png"
          alt="Temple Background"
          fill
          className="object-contain object-right-bottom"
        />
      </div>
      
      {/* Decorative Diya */}
      <div className="absolute left-0 bottom-0 w-[150px] md:w-[200px] lg:w-[250px] h-[150px] md:h-[200px] lg:h-[250px] pointer-events-none select-none z-10">
        <Image
          src="/images/diya.png"
          alt="Decorative Diya"
          fill
          sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
          className="object-contain object-left-bottom opacity-80"
        />
      </div>

      {/* Top Divider */}
      <div className="relative z-10 w-full flex items-center justify-center pt-8 mb-8">
        <div className="h-px bg-[#C9A24B]/40 flex-1 max-w-[400px]"></div>
        <div className="mx-4"><SmallLotus /></div>
        <div className="h-px bg-[#C9A24B]/40 flex-1 max-w-[400px]"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column (Left) */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="mb-6">
              <Image src="/images/logo.png" alt="Vistaaram Logo" width={240} height={80} className="object-contain filter brightness-[2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            </div>
            <p className="text-[14px] md:text-[15px] text-[#FAF6EE]/80 leading-relaxed font-body mb-8 max-w-[320px]">
              A Devotional Brand from Devbhoomi Uttarakhand — bringing the sacred purity, ancient traditions, and serene natural fragrances of Devbhoomi straight to your home.
            </p>
            
            <div className="flex items-center gap-4">
              {['instagram', 'facebook', 'youtube', 'pinterest'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#5A1520] transition-colors">
                  <SocialIcon type={social} />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-1 border-r border-[#C9A24B]/20 min-h-full"></div>

          {/* Quick Links Column (Center) */}
          <div className="md:col-span-3 flex flex-col gap-10">
            {footerContent.sections.slice(0, 2).map((section, idx) => (
              <div key={idx}>
                <h3 className="font-display text-[22px] font-medium text-[#C9A24B] mb-5">{section.title}</h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="flex items-center justify-between text-[#FAF6EE]/80 hover:text-[#C9A24B] text-[15px] transition-colors group">
                        <span>{link.label}</span>
                        <span className="text-[#C9A24B] group-hover:translate-x-1 transition-transform">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden md:block md:col-span-1 border-r border-[#C9A24B]/20 min-h-full"></div>

          {/* Contact Column (Right) */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="font-display text-[26px] font-medium text-[#C9A24B] mb-8">Contact Us</h3>
            <ul className="flex flex-col gap-5 mb-10">
              <li className="flex items-start gap-3 text-[14px] text-[#FAF6EE]/80 leading-relaxed">
                <svg className="w-5 h-5 flex-shrink-0 text-[#C9A24B] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Sati Enterprises,<br/>Sahastradhara Road, Dehradun,<br/>Uttarakhand - 248013</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#FAF6EE]/80">
                <svg className="w-5 h-5 flex-shrink-0 text-[#C9A24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>contact@vistaaram.in</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#FAF6EE]/80">
                <svg className="w-5 h-5 flex-shrink-0 text-[#C9A24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+91 7819058084</span>
              </li>
            </ul>

            <div className="border-t border-[#C9A24B]/20 pt-6 flex flex-wrap items-end gap-6 justify-between">
              <div>
                <p className="text-[12px] text-[#FAF6EE]/60 mb-2">Payment Methods</p>
                <div className="flex gap-2">
                  <div className="bg-white px-2 py-1 rounded-[4px] text-[#1D1D1D] font-bold text-[10px] italic">UPI</div>
                  <div className="bg-white px-2 py-1 rounded-[4px] text-[#1D1D1D] font-bold text-[10px] uppercase">Visa</div>
                  <div className="bg-white px-2 py-1 rounded-[4px] text-[#1D1D1D] font-bold text-[10px] relative overflow-hidden flex"><span className="w-3 h-3 bg-red-500 rounded-full opacity-90 inline-block -mr-1"></span><span className="w-3 h-3 bg-yellow-500 rounded-full opacity-90 inline-block"></span></div>
                  <div className="bg-[#EBD5A9] px-2 py-1 rounded-[4px] text-[#1D1D1D] font-bold text-[10px]">COD</div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-[#FAF6EE]/60 mb-1">GSTIN</p>
                <p className="text-[12px] text-[#FAF6EE]/80 font-mono tracking-wider">07ABCDE1234F1Z5</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-[#C9A24B]/20 py-4 flex flex-col items-center justify-center text-[12px] text-[#C9A24B] gap-1">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5A1520] px-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
            <path d="M12 22c0-4.5 2.5-8 6-9-3 1-6 4.5-6 9z" fill="currentColor" />
            <path d="M12 22c0-4.5-2.5-8-6-9 3 1 6 4.5 6 9z" fill="currentColor" />
          </svg>
        </div>
        <p>© 2026 Sati Enterprises · Har Har Mahadev 🙏</p>
      </div>

    </footer>
  );
}

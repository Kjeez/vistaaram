import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

/*
 * Shared decorative building blocks for inner pages, made from the homepage's own artwork
 * (temple pillars, mandala, flower sprays, mountain line art). Animations are plain CSS so
 * content can never be left hidden by a scroll-triggered script.
 */

const fadeUp = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

/** Gold line · diamond · gold line. */
export function OrnamentDivider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const line = light ? "bg-[#E8C77A]/70" : "bg-[#C9A24B]/60";
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className={`h-px w-10 sm:w-14 ${line}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
      <span className={`h-px w-4 ${line}`} />
      <span className="w-2 h-2 rotate-45 border border-[#C9A24B]" />
      <span className={`h-px w-4 ${line}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
      <span className={`h-px w-10 sm:w-14 ${line}`} />
    </div>
  );
}

/** Slowly turning gold mandala, used as a faint background accent. */
export function Mandala({ className = "", opacity = 0.08 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
      <Image
        src="/images/circle_design.png"
        alt=""
        fill
        sizes="600px"
        className="object-contain motion-safe:animate-[spin_120s_linear_infinite]"
      />
    </div>
  );
}

/** Flower spray in a corner. `variant` 1 rises from the bottom-left, 2 hangs from the top-right. */
export function FlowerSpray({
  variant,
  className = "",
  opacity = 0.45,
}: {
  variant: 1 | 2;
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
      <Image
        src={variant === 1 ? "/images/flower1.png" : "/images/flower2.png"}
        alt=""
        fill
        sizes="200px"
        className="object-contain"
      />
    </div>
  );
}

export type Crumb = { label: string; href?: string };

/**
 * Hero for inner pages: framed by carved temple pillars with bells (desktop), a turning mandala
 * behind the title, flower sprays, and the Devbhoomi mountain line art along the bottom.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  hindi = false,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Shows the brand line "देवभूमि की पवित्र सुगंध, अब आपके घर में।" under the title. */
  hindi?: boolean;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF6EE]">
      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(201,162,75,0.14), transparent 60%), radial-gradient(circle at 85% 90%, rgba(122,31,43,0.05), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <Mandala className="absolute left-1/2 top-6 -translate-x-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px]" opacity={0.09} />

      {/* Temple pillars with bells framing the title like a doorway */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-[130px] lg:w-[170px] pointer-events-none select-none" aria-hidden="true">
        <Image src="/images/pillar.png" alt="" fill sizes="170px" className="object-contain object-left-top" />
      </div>
      <div className="hidden md:block absolute right-0 top-0 h-full w-[130px] lg:w-[170px] pointer-events-none select-none -scale-x-100" aria-hidden="true">
        <Image src="/images/pillar.png" alt="" fill sizes="170px" className="object-contain object-left-top" />
      </div>

      <FlowerSpray variant={2} className="absolute top-2 right-3 md:right-[16%] w-[90px] h-[130px] md:w-[120px] md:h-[170px]" opacity={0.35} />
      <FlowerSpray variant={1} className="absolute bottom-16 left-2 md:left-[15%] w-[80px] h-[120px] md:w-[110px] md:h-[160px]" opacity={0.3} />

      <div className="relative z-10 mx-auto max-w-[760px] px-5 pt-8 pb-28 sm:pt-12 md:pt-16 md:pb-40 text-center">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="flex items-center justify-center flex-wrap gap-x-2 text-[12px] sm:text-[13px] text-[#8E8783] mb-8 animate-fade-in-up opacity-0" style={fadeUp(0)}>
            {breadcrumb.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#C9A24B]">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#751E29] transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-[#4A423C] font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="text-[#B48635] text-[11px] sm:text-[12px] uppercase tracking-[0.28em] font-semibold mb-4 animate-fade-in-up opacity-0" style={fadeUp(80)}>
          {eyebrow}
        </p>
        <h1 className="font-display font-semibold text-[#7A1F2B] text-[36px] sm:text-[46px] md:text-[56px] leading-[1.08] animate-fade-in-up opacity-0" style={fadeUp(160)}>
          {title}
        </h1>
        <OrnamentDivider className="mt-6 animate-fade-in-up opacity-0" />
        {hindi && (
          <p className="mt-5 font-display text-[#7A1F2B]/85 text-[18px] sm:text-[20px] leading-snug animate-fade-in-up opacity-0" style={fadeUp(260)}>
            देवभूमि की पवित्र सुगंध, अब आपके घर में।
          </p>
        )}
        {subtitle && (
          <p className="mt-5 mx-auto max-w-[560px] text-[#5A4F46] text-[15px] sm:text-[16px] leading-relaxed animate-fade-in-up opacity-0" style={fadeUp(320)}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-fade-in-up opacity-0" style={fadeUp(400)}>
            {children}
          </div>
        )}
      </div>

      {/* Devbhoomi mountains */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[640px] sm:w-[900px] md:w-[1100px] h-[90px] sm:h-[120px] md:h-[150px] pointer-events-none select-none opacity-70" aria-hidden="true">
        <Image src="/images/mountainelement.png" alt="" fill sizes="1100px" className="object-contain object-bottom" />
      </div>
    </section>
  );
}

/** Maroon band with faint mandalas, for trust strips and calls to action. */
export function MaroonBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative w-full overflow-hidden bg-[#7A1F2B] ${className}`}>
      <Mandala className="absolute -left-40 -top-40 w-[420px] h-[420px]" opacity={0.1} />
      <Mandala className="absolute -right-40 -bottom-40 w-[420px] h-[420px]" opacity={0.1} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

const ICONS = {
  cod: (
    <path d="M3 7h18v10H3zM3 11h18M7 15h3" />
  ),
  truck: (
    <>
      <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" />
      <circle cx="6" cy="17" r="1.6" />
      <circle cx="16.5" cy="17" r="1.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  returns: (
    <>
      <path d="M4 10a8 8 0 1 1 1.8 6.2" />
      <path d="M4 4v6h6" />
    </>
  ),
  leaf: (
    <path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19zM5 19l8-8" />
  ),
  whatsapp: (
    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9.5c.3 2 2 4.2 4.5 5l1.2-1.2 2 .8-.5 1.6c-3.6.4-8-3.6-8.4-7.6L9.4 7.7l1 1.8z" />
  ),
};

export type TrustIcon = keyof typeof ICONS;

/** Gold line icon used across the decorated sections. */
export function GoldLineIcon({ name, className = "w-7 h-7" }: { name: TrustIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E8C77A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/** Maroon band listing store promises with gold icons. */
export function TrustBand({ items }: { items: { icon: TrustIcon; title: string; text: string }[] }) {
  return (
    <MaroonBand>
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:py-14">
        <OrnamentDivider light className="mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <span className="w-14 h-14 rounded-full border border-[#C9A24B]/50 flex items-center justify-center mb-4 bg-[#FAF6EE]/5">
                <GoldLineIcon name={item.icon} />
              </span>
              <p className="font-display text-[#FAF6EE] text-[16px] sm:text-[18px] leading-tight">{item.title}</p>
              <p className="text-[#FAF6EE]/65 text-[12px] sm:text-[13px] mt-1.5">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </MaroonBand>
  );
}

/** Section heading in the homepage style: gold eyebrow, maroon serif title, ornament. */
export function DecoratedHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-[#B48635] text-[11px] sm:text-[12px] uppercase tracking-[0.26em] font-semibold mb-3">{eyebrow}</p>
      <h2 className="font-display font-medium text-[#7A1F2B] text-[30px] sm:text-[38px] md:text-[44px] leading-tight">{title}</h2>
      <OrnamentDivider className="mt-5" />
      {subtitle && <p className="mt-5 mx-auto max-w-[560px] text-[#5A4F46] text-[15px] leading-relaxed">{subtitle}</p>}
    </div>
  );
}

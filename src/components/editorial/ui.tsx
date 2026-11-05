import type { ReactNode } from "react";

/** Small uppercase gold label above a heading. */
export function Eyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`text-[12px] tracking-[0.24em] uppercase font-semibold ${light ? "text-[#E2BE72]" : "text-[#8A6526]"} ${className}`}>
      {children}
    </p>
  );
}

const TITLE_SIZES = {
  xl: "text-[clamp(40px,5.4vw,72px)] leading-[1.02]",
  lg: "text-[clamp(36px,4.4vw,56px)] leading-[1.05]",
  md: "text-[clamp(32px,3.8vw,48px)] leading-[1.08]",
  sm: "text-[clamp(28px,3.2vw,40px)] leading-[1.1]",
};

/** Large Playfair section heading in maroon (or cream on dark sections). */
export function Title({
  as: Tag = "h2",
  size = "lg",
  light = false,
  className = "",
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof TITLE_SIZES;
  light?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={`font-display font-medium ${TITLE_SIZES[size]} ${light ? "text-[#FAF1E4]" : "text-[#7A1F2B]"} ${className}`}>
      {children}
    </Tag>
  );
}

/** Underlined text link with a gold rule, used for "Read our story →" style links. */
export const textLinkClass =
  "inline-block text-[15px] font-medium text-[#7A1F2B] border-b border-[#C6A15B] pb-0.5 hover:text-[#561520] transition-colors";

/** Standard page container: 1200px wide with fluid side padding. */
export const containerClass = "mx-auto max-w-[1200px] px-5 sm:px-[clamp(20px,5vw,48px)]";

/** Numbered item with a gold top rule (ingredients, promises, process steps). */
export function RuledItem({ n, title, text, dark = false, titleClass = "text-[24px]" }: { n: string; title: string; text: string; dark?: boolean; titleClass?: string }) {
  return (
    <div className={`border-t pt-5 ${dark ? "border-[#E2BE72]/35" : "border-[#D9C49A]"}`}>
      <span className={`font-display italic ${dark ? "text-[#E2BE72]" : "text-[#8A6526]"}`}>{n}</span>
      <h3 className={`font-display font-medium mt-2 ${titleClass} ${dark ? "text-[#FAF1E4]" : "text-[#2A1B18]"}`}>{title}</h3>
      <p className={`text-[15px] leading-relaxed mt-1.5 ${dark ? "text-[#EAD8C8]" : "text-[#66544D]"}`}>{text}</p>
    </div>
  );
}

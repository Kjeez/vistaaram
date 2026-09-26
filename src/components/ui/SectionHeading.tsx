interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-cream" : "text-maroon-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-cream/70" : "text-gray-warm"}`}
        >
          {subtitle}
        </p>
      )}
      {/* Decorative gold underline */}
      <div
        className={`mt-6 h-0.5 w-16 bg-gradient-to-r from-gold to-gold-light ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

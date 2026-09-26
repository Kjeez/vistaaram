interface GoldIconProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A decorative gold-tinted icon wrapper that provides a subtle
 * golden background circle behind emoji or SVG icons.
 */
export default function GoldIcon({
  children,
  size = "md",
  className = "",
}: GoldIconProps) {
  const sizes = {
    sm: "w-10 h-10 text-lg",
    md: "w-14 h-14 text-2xl",
    lg: "w-18 h-18 text-3xl",
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-gold/10 to-gold/20 border border-gold/20 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
}

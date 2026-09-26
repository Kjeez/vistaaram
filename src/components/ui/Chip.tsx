interface ChipProps {
  children: React.ReactNode;
  variant?: "gold" | "maroon" | "cream";
  size?: "sm" | "md";
  className?: string;
}

export default function Chip({
  children,
  variant = "gold",
  size = "sm",
  className = "",
}: ChipProps) {
  const variants = {
    gold: "bg-gold/15 text-gold-light border border-gold/30",
    maroon: "bg-maroon/10 text-maroon border border-maroon/20",
    cream: "bg-cream/20 text-cream border border-cream/30",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium tracking-wide uppercase ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

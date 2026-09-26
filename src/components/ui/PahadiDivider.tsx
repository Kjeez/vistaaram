interface PahadiDividerProps {
  className?: string;
  variant?: "full" | "narrow";
}

/**
 * Thin gold Pahadi (Himalayan mountain) line-art divider.
 * SVG mountain silhouette rendered as a decorative section separator.
 */
export default function PahadiDivider({
  className = "",
  variant = "full",
}: PahadiDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden ${
        variant === "narrow" ? "max-w-3xl mx-auto" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* Mountain silhouette line art */}
        <path
          d="M0 45 L60 35 L120 40 L180 25 L240 30 L300 15 L360 20 L420 8 L480 18 L540 5 L600 12 L660 5 L720 18 L780 8 L840 20 L900 15 L960 30 L1020 25 L1080 40 L1140 35 L1200 45"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Subtle reflection / lower peaks */}
        <path
          d="M0 48 L150 44 L300 46 L450 42 L600 45 L750 42 L900 46 L1050 44 L1200 48"
          stroke="url(#goldGradientFaint)"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#C9A24B" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#C9A24B" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="goldGradientFaint" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#C9A24B" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#C9A24B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

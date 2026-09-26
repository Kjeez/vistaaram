interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * Renders a styled placeholder gradient box that matches the expected image dimensions.
 * Once real images are placed in /public/images/, this component can be swapped for
 * next/image with zero layout changes — or you can simply replace the gradient
 * background with a real <img> tag.
 *
 * For now, it shows a warm cream-to-maroon gradient with the alt text label.
 */
export default function PlaceholderImage({
  src,
  alt,
  className = "",
  aspectRatio = "4/3",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card)] ${className}`}
      style={{ aspectRatio }}
      title={`Placeholder for: ${src}`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark/80 via-maroon/60 to-gold/30" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(201,162,75,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(122,31,43,0.3) 0%, transparent 50%)",
        }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-cream/50 text-xs font-mono tracking-wider uppercase mb-1">
          📷 Image Placeholder
        </span>
        <span className="text-cream/70 text-sm font-medium">{alt}</span>
        <span className="text-cream/30 text-xs mt-1 font-mono">{src}</span>
      </div>
    </div>
  );
}

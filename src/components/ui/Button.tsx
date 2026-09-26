"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-full cursor-pointer select-none";

  const variants = {
    primary:
      "bg-maroon text-cream hover:bg-maroon-dark shadow-md hover:shadow-lg active:scale-[0.97]",
    secondary:
      "bg-gold text-maroon-dark hover:bg-gold-light shadow-md hover:shadow-gold active:scale-[0.97]",
    outline:
      "border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream active:scale-[0.97]",
    ghost:
      "text-maroon hover:bg-maroon/5 active:scale-[0.97]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

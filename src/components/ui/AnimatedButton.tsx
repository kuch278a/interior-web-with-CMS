import React from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "gradient" | "glass" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * AnimatedButton – premium gradient button with glow and scale micro-interactions.
 */
export default function AnimatedButton({
  onClick,
  children,
  href,
  className = "",
  variant = "gradient",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    gradient:
      "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-400 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]",
    glass:
      "glass-panel glass-panel-hover text-white border border-white/20 hover:border-purple-500/50 hover:scale-[1.02]",
    outline:
      "border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:scale-[1.02]",
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.gradient} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}

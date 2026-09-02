import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-charcoal text-ivory hover:bg-charcoal-light shadow-luxury hover:shadow-luxury-hover",
    secondary:
      "bg-ivory text-charcoal border border-charcoal/20 hover:border-charcoal hover:bg-white",
    outline:
      "bg-transparent text-charcoal border border-champagne hover:bg-champagne/10",
    ghost:
      "bg-transparent text-charcoal hover:bg-charcoal/5 hover:text-champagne-dark",
    gold:
      "bg-champagne text-charcoal-dark font-medium hover:bg-gold-soft shadow-luxury",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 uppercase tracking-widest",
    md: "text-sm px-5 py-2.5 uppercase tracking-widest",
    lg: "text-base px-8 py-3.5 uppercase tracking-widest",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

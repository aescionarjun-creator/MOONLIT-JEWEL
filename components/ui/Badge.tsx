import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "new" | "featured" | "bestseller" | "rental" | "wholesale" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "featured", children, className }: BadgeProps) {
  const variants = {
    new: "bg-burgundy text-ivory",
    featured: "bg-champagne text-charcoal-dark",
    bestseller: "bg-emerald text-ivory",
    rental: "bg-taupe text-charcoal-dark",
    wholesale: "bg-charcoal text-ivory",
    outline: "border border-champagne text-charcoal-light bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-sans font-semibold rounded-xs shadow-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

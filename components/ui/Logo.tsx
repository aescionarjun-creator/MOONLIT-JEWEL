import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "full", className, size = "md" }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 group", className)}>
      {/* Golden Lotus Emblem Graphic */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-champagne/40 shadow-xs group-hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/logo.jpg"
          alt="Moonlit Jewel Showroom — Golden Lotus Emblem"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Typography Branding */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-serif tracking-[0.18em] font-bold uppercase transition-colors leading-tight",
            size === "sm" && "text-base sm:text-lg",
            size === "md" && "text-lg sm:text-2xl",
            size === "lg" && "text-2xl sm:text-3xl",
            isDark ? "text-ivory group-hover:text-champagne" : "text-charcoal group-hover:text-champagne-dark"
          )}
        >
          MOONLIT
        </span>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-gold-antique">
            JEWEL SHOWROOM
          </span>
          <span className="text-[9px] text-taupe font-serif italic tracking-wider">
            • Shine Forever
          </span>
        </div>
      </div>
    </Link>
  );
}

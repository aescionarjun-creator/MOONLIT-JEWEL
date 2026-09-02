"use client";

import React from "react";
import { TrendingUp, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface GoldRateProps {
  rate22k?: number;
  rate24k?: number;
  rateSilver?: number;
  unit?: string;
  effectiveDate?: string;
}

export function GoldRateWidget({
  rate22k = 6850,
  rate24k = 7470,
  rateSilver = 88,
  unit = "per gram",
  effectiveDate = "Today, 10:30 AM",
}: GoldRateProps) {
  return (
    <div className="bg-ivory border border-champagne/40 rounded-sm p-4 sm:p-6 shadow-luxury my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-champagne/20 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-charcoal font-semibold tracking-wide">
              Today&apos;s Live Gold & Silver Benchmark
            </span>
            <span className="inline-flex items-center text-[10px] uppercase tracking-widest bg-emerald/10 text-emerald px-2 py-0.5 rounded-xs font-semibold">
              <TrendingUp className="w-3 h-3 mr-1" /> Showroom Rate
            </span>
          </div>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Updated: {effectiveDate} | Transparent BIS 916 Pricing Policy
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-charcoal-light font-medium bg-champagne/10 px-3 py-1.5 rounded-xs">
          <ShieldCheck className="w-4 h-4 text-champagne-dark" />
          <span>100% Hallmarked Transparency</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 22K Gold */}
        <div className="bg-white border border-champagne/20 p-4 rounded-xs text-center shadow-xs">
          <span className="text-xs uppercase tracking-widest text-soft-brown block font-sans">
            22K Gold (916)
          </span>
          <span className="font-serif text-xl sm:text-2xl text-charcoal font-bold mt-1 block">
            {formatINR(rate22k)}
          </span>
          <span className="text-[10px] text-taupe block font-light">{unit}</span>
        </div>

        {/* 24K Gold */}
        <div className="bg-white border border-champagne/20 p-4 rounded-xs text-center shadow-xs">
          <span className="text-xs uppercase tracking-widest text-soft-brown block font-sans">
            24K Pure Gold
          </span>
          <span className="font-serif text-xl sm:text-2xl text-charcoal font-bold mt-1 block">
            {formatINR(rate24k)}
          </span>
          <span className="text-[10px] text-taupe block font-light">{unit}</span>
        </div>

        {/* Silver */}
        <div className="bg-white border border-champagne/20 p-4 rounded-xs text-center shadow-xs">
          <span className="text-xs uppercase tracking-widest text-soft-brown block font-sans">
            Fine Silver (999)
          </span>
          <span className="font-serif text-xl sm:text-2xl text-charcoal font-bold mt-1 block">
            {formatINR(rateSilver)}
          </span>
          <span className="text-[10px] text-taupe block font-light">{unit}</span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { TrendingUp, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminGoldRatesPage() {
  const currentRate = await prisma.goldRate.findFirst({
    where: { isCurrent: true },
    orderBy: { effectiveDate: "desc" },
  }) || { rate22k: 6850, rate24k: 7470, rateSilver: 88, unit: "per gram", effectiveDate: new Date() };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Live Gold & Silver Benchmark Controller
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Update daily showroom rates for 22K Hallmarked Gold, 24K Pure Gold, and Fine Silver.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Rates */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-6">
          <div className="flex items-center justify-between border-b border-champagne/20 pb-3">
            <h3 className="font-serif text-xl font-semibold text-charcoal flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald" /> Current Showroom Benchmark
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald bg-emerald/10 px-2 py-0.5 rounded-xs">
              Live Active
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">22K Gold (916)</span>
              <span className="font-serif text-2xl font-bold text-charcoal">{formatINR(currentRate.rate22k)} <span className="text-xs font-light text-taupe">/ gram</span></span>
            </div>

            <div className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">24K Pure Gold</span>
              <span className="font-serif text-2xl font-bold text-charcoal">{formatINR(currentRate.rate24k)} <span className="text-xs font-light text-taupe">/ gram</span></span>
            </div>

            <div className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">Fine Silver (999)</span>
              <span className="font-serif text-2xl font-bold text-charcoal">{formatINR(currentRate.rateSilver)} <span className="text-xs font-light text-taupe">/ gram</span></span>
            </div>
          </div>
        </div>

        {/* Rate Updater Form */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-4">
          <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-champagne/20 pb-3">
            Update Showroom Gold Rate
          </h3>

          <form className="space-y-4 text-xs">
            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                22K Gold Rate (₹ / gram) *
              </label>
              <input
                type="number"
                defaultValue={currentRate.rate22k}
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                24K Gold Rate (₹ / gram) *
              </label>
              <input
                type="number"
                defaultValue={currentRate.rate24k}
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                Silver Rate (₹ / gram) *
              </label>
              <input
                type="number"
                defaultValue={currentRate.rateSilver}
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne font-mono font-bold"
              />
            </div>

            <Button variant="gold" size="md" className="w-full mt-2">
              <RefreshCw className="w-4 h-4 mr-2" /> Publish Live Rate Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

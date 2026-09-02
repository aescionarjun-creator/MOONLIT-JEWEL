import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            Atelier Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Rooted in Heritage. Crafted for Generations.
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Moonlit Jewel represents generations of South Indian jewellery artistry, uncompromising 22K gold purity, and royal Mughal Kundan Polki craftsmanship.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 50/50 Craft Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-xs overflow-hidden shadow-2xl">
            <Image
              src="/images/homepage_hero.jpg"
              alt="Craftsmanship Moonlit Jewel"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-antique font-sans font-semibold">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
              Purity in Every Thread. Perfection in Every Curve.
            </h2>
            <p className="font-sans text-sm text-soft-brown font-light leading-relaxed">
              Every creation at Moonlit Jewel begins with raw 24K gold bullion, hand-alloyed to exact 916 BIS hallmark purity standards. Our master karigars spend hundreds of hours hand-engraving sacred temple motifs, setting natural Polki diamonds, and stringing Zambian emerald beads.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-champagne/20">
              <div className="space-y-1">
                <ShieldCheck className="w-6 h-6 text-champagne-dark" />
                <h4 className="font-serif text-base font-semibold text-charcoal">BIS 916 Hallmarked</h4>
                <p className="text-xs text-taupe font-light font-sans">Transparent melt purity certification</p>
              </div>

              <div className="space-y-1">
                <Sparkles className="w-6 h-6 text-champagne-dark" />
                <h4 className="font-serif text-base font-semibold text-charcoal">Ethically Sourced Stones</h4>
                <p className="text-xs text-taupe font-light font-sans">Conflict-free natural diamonds</p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/showroom">
                <Button variant="gold" size="md">
                  Visit Our Showrooms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

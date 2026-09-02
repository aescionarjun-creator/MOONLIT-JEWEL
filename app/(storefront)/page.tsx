import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Award, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoldRateWidget } from "@/components/storefront/GoldRateWidget";
import { ProductCard } from "@/components/storefront/ProductCard";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 60; // Refresh every 60s

export default async function HomePage() {
  // Fetch initial featured products and gold rates from database safely
  let featuredProducts: ProductType[] = [];
  let currentGoldRate = { rate22k: 6850, rate24k: 7470, rateSilver: 88, unit: "per gram", effectiveDate: "Today, 10:30 AM" };

  try {
    const dbProducts = await prisma.product.findMany({
      take: 6,
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    featuredProducts = dbProducts.map((p) => ({
      ...p,
      verticalTag: p.verticalTag as any,
    }));

    const rate = await prisma.goldRate.findFirst({
      where: { isCurrent: true },
      orderBy: { effectiveDate: "desc" },
    });
    if (rate) {
      currentGoldRate = {
        rate22k: rate.rate22k,
        rate24k: rate.rate24k,
        rateSilver: rate.rateSilver,
        unit: rate.unit,
        effectiveDate: new Date(rate.effectiveDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };
    }
  } catch (error) {
    console.error("Database fetch fallback:", error);
  }

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] bg-ivory flex items-center overflow-hidden border-b border-champagne/20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage_hero.jpg"
            alt="South Indian Heritage Bride wearing Moonlit Jewel antique gold haram"
            fill
            priority
            className="object-cover object-right md:object-center"
            sizes="100vw"
          />
          {/* Subtle gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 to-transparent w-full md:w-3/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-champagne/15 border border-champagne/40 px-3.5 py-1 rounded-full text-xs font-sans uppercase tracking-[0.25em] text-charcoal">
              <Sparkles className="w-3.5 h-3.5 text-gold-antique" />
              <span>Heritage Showroom Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.15] font-semibold">
              Timeless Jewellery for Your Most Beautiful Moments
            </h1>

            <p className="font-sans text-base text-soft-brown font-light leading-relaxed">
              Crafted with heritage. Designed for you. Step into our world of 22K hallmarked antique gold, divine temple sculpture, uncut royal Kundan Polki, and certified solitaires.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/bridal">
                <Button variant="primary" size="lg">
                  Explore Bridal Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/showroom">
                <Button variant="outline" size="lg">
                  <Calendar className="w-4 h-4 ml-2" /> Book Showroom Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* 2. FOUR BUSINESS VERTICALS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-champagne-dark font-sans font-semibold">
              Four Iconic Divisions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
               Tailored for Every Celebration & Partnership
            </h2>
            <div className="w-16 h-[2px] bg-champagne mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bridal */}
            <div className="group bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between h-80">
              <div className="space-y-3">
                <span className="text-xs font-sans uppercase tracking-widest text-gold-antique font-semibold block">
                  01 / Couture
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-champagne-dark transition-colors">
                  BRIDAL
                </h3>
                <p className="text-xs text-soft-brown font-light leading-relaxed">
                  For the moments that become memories. Grand bridal harams, temple chokers, vanki, and maang tikka sets.
                </p>
              </div>
              <Link href="/bridal" className="inline-flex items-center text-xs uppercase tracking-widest font-sans font-semibold text-charcoal group-hover:text-champagne-dark">
                Explore Bridal <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Retail */}
            <div className="group bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between h-80">
              <div className="space-y-3">
                <span className="text-xs font-sans uppercase tracking-widest text-gold-antique font-semibold block">
                  02 / Showroom
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-champagne-dark transition-colors">
                  RETAIL
                </h3>
                <p className="text-xs text-soft-brown font-light leading-relaxed">
                  Everyday elegance, thoughtfully crafted. 22K gold chains, diamond studs, bangles, and festive gift collections.
                </p>
              </div>
              <Link href="/retail" className="inline-flex items-center text-xs uppercase tracking-widest font-sans font-semibold text-charcoal group-hover:text-champagne-dark">
                Explore Retail <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Wholesale */}
            <div className="group bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between h-80">
              <div className="space-y-3">
                <span className="text-xs font-sans uppercase tracking-widest text-gold-antique font-semibold block">
                  03 / B2B Portal
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-champagne-dark transition-colors">
                  WHOLESALE
                </h3>
                <p className="text-xs text-soft-brown font-light leading-relaxed">
                  Designed for trusted business partnerships. Exclusive B2B pricing, low MOQ, and dedicated trade account support.
                </p>
              </div>
              <Link href="/wholesale" className="inline-flex items-center text-xs uppercase tracking-widest font-sans font-semibold text-charcoal group-hover:text-champagne-dark">
                B2B Partner Portal <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Rental */}
            <div className="group bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between h-80">
              <div className="space-y-3">
                <span className="text-xs font-sans uppercase tracking-widest text-gold-antique font-semibold block">
                  04 / Concierge
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-champagne-dark transition-colors">
                  RENTAL
                </h3>
                <p className="text-xs text-soft-brown font-light leading-relaxed">
                  Wear extraordinary jewellery for extraordinary celebrations. Date-based availability & luxury concierge delivery.
                </p>
              </div>
              <Link href="/rental" className="inline-flex items-center text-xs uppercase tracking-widest font-sans font-semibold text-charcoal group-hover:text-champagne-dark">
                Explore Rental <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. LIVE GOLD RATE SECTION */}
        <section>
          <GoldRateWidget {...currentGoldRate} />
        </section>

        {/* 4. FEATURED BRIDAL COLLECTION */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-champagne/30 pb-6 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-champagne-dark font-sans font-semibold">
                Bridal Masterpieces
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                Bridal Jewellery, Made to Be Remembered
              </h2>
            </div>
            <Link href="/bridal">
              <Button variant="outline" size="sm">
                View Complete Bridal Catalogue <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center text-taupe font-sans py-12 col-span-3">
                No featured products currently available.
              </p>
            )}
          </div>
        </section>

        {/* 5. SIGNATURE COLLECTION EDITORIAL */}
        <section className="bg-white border border-champagne/30 rounded-xs p-8 lg:p-14 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-xs overflow-hidden shadow-2xl">
              <Image
                src="/images/bridal_hero.jpg"
                alt="Maharani Kundan Polki Choker"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-antique font-sans font-semibold">
                Signature Heritage Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
                The Temple & Kundan Polki Heritage Collection
              </h2>
              <p className="font-sans text-sm text-soft-brown font-light leading-relaxed">
                Inspired by centuries of royal South Indian temple iconography and Mughal miniature jewel craftsmanship. Every piece passes through master karigars taking over 250 hours of hand engraving.
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-champagne/20">
                <div>
                  <h4 className="font-serif text-lg text-charcoal font-semibold">22K BIS Hallmarked</h4>
                  <p className="text-xs text-taupe font-light">100% Purity guaranteed</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal font-semibold">SGL Certified</h4>
                  <p className="text-xs text-taupe font-light">Natural Polki & emeralds</p>
                </div>
              </div>

              <div className="pt-2 flex gap-4">
                <Link href="/collections">
                  <Button variant="gold" size="md">
                    Explore Collections
                  </Button>
                </Link>
                <Link href="/lookbook">
                  <Button variant="outline" size="md">
                    View Lookbook
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SHOWROOM & APPOINTMENT BANNER */}
        <section className="relative rounded-xs overflow-hidden min-h-[400px] flex items-center text-ivory">
          <Image
            src="/images/showroom_hero.jpg"
            alt="Moonlit Jewel Heritage Showroom Interior"
            fill
            className="object-cover brightness-[0.4]"
          />
          <div className="relative z-10 p-8 sm:p-16 max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-champagne font-sans font-semibold">
              Private Showroom Lounge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              Experience the Art of Fine Jewellery in Person
            </h2>
            <p className="font-sans text-sm text-ivory/80 font-light leading-relaxed">
              Book a private bridal suite consultation at our Chennai T. Nagar flagship or Hyderabad Banjara Hills lounge with our senior jewellery stylists.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/showroom">
                <Button variant="gold" size="md">
                  Book Showroom Appointment
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

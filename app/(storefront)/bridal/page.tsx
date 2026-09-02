import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 60;

export default async function BridalPage() {
  let bridalProducts: ProductType[] = [];

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { verticalTag: "BRIDAL" },
          { verticalTag: "ALL" },
          { category: { slug: "bridal-sets" } },
        ],
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    bridalProducts = products.map((p) => ({
      ...p,
      verticalTag: p.verticalTag as any,
    }));
  } catch (err) {
    console.error("Bridal products fetch error:", err);
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] bg-charcoal flex items-center justify-center overflow-hidden">
        <Image
          src="/images/bridal_hero.jpg"
          alt="Bridal Jewellery Collection Moonlit Jewel"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="relative z-10 text-center max-w-3xl px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            The Heritage Atelier
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory">
            Bridal Jewellery for the Beginning of Forever
          </h1>
          <p className="font-sans text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto">
            From monumental antique gold harams to regal Mughal Kundan Polki chokers, explore pieces crafted to define your wedding legacy.
          </p>
          <div className="pt-4">
            <Link href="/showroom">
              <Button variant="gold" size="md">
                <Calendar className="w-4 h-4 mr-2" /> Book Bridal Consultation Suite
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bridal Categories Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 py-6 border-y border-champagne/30 text-xs font-sans uppercase tracking-widest text-charcoal">
          <span className="px-4 py-1.5 bg-champagne text-charcoal-dark font-semibold rounded-xs">All Bridal</span>
          <span className="px-4 py-1.5 hover:bg-champagne/10 rounded-xs cursor-pointer">Bridal Sets</span>
          <span className="px-4 py-1.5 hover:bg-champagne/10 rounded-xs cursor-pointer">Temple Harams</span>
          <span className="px-4 py-1.5 hover:bg-champagne/10 rounded-xs cursor-pointer">Kundan Chokers</span>
          <span className="px-4 py-1.5 hover:bg-champagne/10 rounded-xs cursor-pointer">Maang Tikka & Vanki</span>
        </div>

        {/* Product Grid */}
        <div className="pt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-charcoal">
              Bridal Masterpieces ({bridalProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bridalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

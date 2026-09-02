import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 0;

export default async function WishlistPage() {
  let products: ProductType[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      take: 3,
      include: { images: true, category: true },
    });
    products = dbProducts.map((p) => ({ ...p, verticalTag: p.verticalTag as any }));
  } catch (err) {
    console.error("Wishlist fetch error:", err);
  }

  return (
    <div className="space-y-12 pb-20 font-sans">
      <div className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 text-burgundy fill-burgundy" /> Saved Masterpieces
          </span>
          <h1 className="font-serif text-4xl text-ivory">Your Wishlist</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
          <span className="text-xs text-soft-brown">Saved Pieces ({products.length})</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

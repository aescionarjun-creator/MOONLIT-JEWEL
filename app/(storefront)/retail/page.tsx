import React from "react";
import Image from "next/image";
import { Filter, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 60;

export default async function RetailPage() {
  let products: ProductType[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    products = dbProducts.map((p) => ({
      ...p,
      verticalTag: p.verticalTag as any,
    }));
  } catch (err) {
    console.error("Retail products fetch error:", err);
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Banner */}
      <div className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne font-sans font-semibold">
            Everyday Elegance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Retail Gold & Diamond Collections
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-lg mx-auto font-sans">
            Explore 22K hallmarked gold chains, bangles, diamond drop earrings, and festive jewellery crafted for every moment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter Controls */}
          <div className="lg:col-span-1 space-y-6 bg-white border border-champagne/30 p-6 rounded-xs h-fit shadow-luxury">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/20">
              <span className="font-serif text-lg font-semibold text-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-antique" /> Filters
              </span>
              <span className="text-[11px] uppercase tracking-widest text-taupe cursor-pointer hover:text-champagne-dark">
                Reset
              </span>
            </div>

            {/* Purity Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-sans uppercase tracking-widest text-charcoal font-semibold">
                Purity / Metal
              </h4>
              <div className="space-y-2 text-xs text-soft-brown">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>22K Antique Gold (916)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>18K Polki & Diamond</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-champagne" />
                  <span>24K Pure Gold Coin</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-3 border-t border-champagne/20 pt-4">
              <h4 className="text-xs font-sans uppercase tracking-widest text-charcoal font-semibold">
                Category
              </h4>
              <div className="space-y-2 text-xs text-soft-brown">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>Bridal Sets</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>Necklaces & Harams</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>Earrings & Jhumkas</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-champagne" />
                  <span>Bangles & Kadas</span>
                </label>
              </div>
            </div>
          </div>

          {/* Catalogue Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/20">
              <span className="text-xs text-soft-brown font-sans">
                Showing <strong className="text-charcoal">{products.length}</strong> items
              </span>

              <select className="bg-white border border-champagne/40 text-xs text-charcoal py-1.5 px-3 rounded-xs font-sans focus:outline-none">
                <option>Sort by: Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

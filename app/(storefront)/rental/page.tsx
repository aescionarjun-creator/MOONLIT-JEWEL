import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon, Shield, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 0;

export default async function RentalPage() {
  let rentalProducts: ProductType[] = [];

  try {
    const products = await prisma.product.findMany({
      where: {
        rentalPrice: { not: null },
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    rentalProducts = products.map((p) => ({
      ...p,
      verticalTag: p.verticalTag as any,
    }));
  } catch (err) {
    console.error("Rental products fetch error:", err);
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            Concierge Rental Atelier
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Wear the Extraordinary. For Every Celebration.
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Access royal bridal jewellery sets, temple harams, and uncut Kundan chokers for your wedding weekend without permanent capital commitment. Flexible 3-day to 7-day bookings with concierge doorstep delivery and security deposit protection.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Date Selector & Availability Widget */}
        <div className="bg-white border border-champagne/40 p-6 rounded-xs shadow-luxury space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-champagne/20 pb-4 gap-4">
            <div>
              <h3 className="font-serif text-xl text-charcoal font-semibold flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gold-antique" /> Check Event Availability
              </h3>
              <p className="text-xs text-soft-brown font-sans">
                Select your event start and end date to see real-time reserved dates.
              </p>
            </div>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                Event Start Date
              </label>
              <input
                type="date"
                defaultValue="2026-09-20"
                className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
              />
            </div>
            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                Return Date
              </label>
              <input
                type="date"
                defaultValue="2026-09-23"
                className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
              />
            </div>
            <div className="flex items-end">
              <Button variant="gold" size="md" className="w-full">
                Verify Availability
              </Button>
            </div>
          </form>
        </div>

        {/* How Rental Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-champagne/30 p-6 rounded-xs space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-antique font-sans font-bold block">
              Step 01
            </span>
            <h4 className="font-serif text-lg font-semibold text-charcoal">Select & Reserve Dates</h4>
            <p className="text-xs text-taupe font-sans font-light leading-relaxed">
              Choose your piece and lock your event dates. Live availability prevents double booking.
            </p>
          </div>

          <div className="bg-white border border-champagne/30 p-6 rounded-xs space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-antique font-sans font-bold block">
              Step 02
            </span>
            <h4 className="font-serif text-lg font-semibold text-charcoal">Security Deposit</h4>
            <p className="text-xs text-taupe font-sans font-light leading-relaxed">
              Pay the transparent daily rental fee along with refundable security deposit held securely.
            </p>
          </div>

          <div className="bg-white border border-champagne/30 p-6 rounded-xs space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-antique font-sans font-bold block">
              Step 03
            </span>
            <h4 className="font-serif text-lg font-semibold text-charcoal">Concierge Pickup & Return</h4>
            <p className="text-xs text-taupe font-sans font-light leading-relaxed">
              Pick up from our T. Nagar / Banjara Hills showroom or receive insured home delivery.
            </p>
          </div>
        </div>

        {/* Available Rental Catalogue */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-charcoal">
              Available Bridal Rental Masterpieces ({rentalProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

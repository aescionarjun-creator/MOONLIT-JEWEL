import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Building2, FileCheck, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types";

export const revalidate = 0; // Dynamic server check

export default async function WholesalePage() {
  const user = await getCurrentUser();
  const isWholesaleApproved = user?.role === "WHOLESALE_CUSTOMER" && user.wholesale?.status === "APPROVED";

  let wholesaleProducts: ProductType[] = [];

  if (isWholesaleApproved) {
    const dbProducts = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
      },
    });

    wholesaleProducts = dbProducts.map((p) => ({
      ...p,
      verticalTag: p.verticalTag as any,
    }));
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            B2B Trade Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Designed for Partnership. Built on Trust.
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Partner directly with Moonlit Jewel Atelier for 22K hallmarked gold & Kundan Polki jewellery. Verified business pricing, low MOQs, guaranteed weight accuracy, and dedicated account management.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* If user is approved wholesale partner */}
        {isWholesaleApproved ? (
          <div className="space-y-8">
            <div className="bg-emerald/10 border border-emerald/40 p-6 rounded-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">
                    Approved Wholesale Partner Account ({user.wholesale?.businessName})
                  </h3>
                  <p className="text-xs text-soft-brown font-sans">
                    GST: {user.wholesale?.gstNumber} | Trade Access Active
                  </p>
                </div>
              </div>
              <span className="text-xs font-sans uppercase tracking-widest text-emerald font-bold">
                Protected B2B Pricing Unlocked
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-charcoal">
                Wholesale Trade Catalogue ({wholesaleProducts.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wholesaleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    userRole={user.role}
                    isWholesaleApproved={true}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Registration & Trade Security Overview */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Value Proposition & Security Notice */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-antique font-sans font-semibold">
                  Why Register as a Partner?
                </span>
                <h2 className="font-serif text-3xl text-charcoal">
                  Direct Factory-Direct Pricing for Verified Jewellers
                </h2>
                <p className="text-xs sm:text-sm text-soft-brown font-light leading-relaxed font-sans">
                  To protect our trade partners, wholesale prices are strictly confidential and server-authenticated. Once your business details (GST / Registration) are verified by our team, your account unlocks protected B2B tier pricing.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white border border-champagne/30 rounded-xs">
                  <Building2 className="w-6 h-6 text-champagne-dark shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">Low MOQ Flexibility</h4>
                    <p className="text-xs text-taupe font-light font-sans">Order sample pieces or full showroom stock starting from just 1 item MOQ per design.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-champagne/30 rounded-xs">
                  <ShieldCheck className="w-6 h-6 text-emerald shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">100% Weight & Purity Audit</h4>
                    <p className="text-xs text-taupe font-light font-sans">Every dispatch includes individual melt-and-purity certificates and BIS hallmark verification.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-champagne/30 rounded-xs">
                  <Lock className="w-6 h-6 text-burgundy shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">Strict Price Protection</h4>
                    <p className="text-xs text-taupe font-light font-sans">Retail customers and unverified guests can never view wholesale pricing tier data.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="bg-white border border-champagne/40 p-8 rounded-xs shadow-luxury space-y-6">
              <div className="border-b border-champagne/20 pb-4">
                <h3 className="font-serif text-2xl text-charcoal font-semibold">
                  Wholesale Partner Registration
                </h3>
                <p className="text-xs text-soft-brown font-sans font-light mt-1">
                  Submit your business credentials for instant verification review.
                </p>
              </div>

              <form className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Jewellers Pvt Ltd"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      Owner / Director Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      Business Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      placeholder="b2b@company.com"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      GST Number / Trade License *
                    </label>
                    <input
                      type="text"
                      placeholder="33AAAAA0000A1Z5"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      Business Type
                    </label>
                    <select className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                      <option>Retail Jewellery Showroom</option>
                      <option>Bridal Boutique</option>
                      <option>Jewellery Exporter</option>
                      <option>Regional Distributor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Chennai"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="Tamil Nadu"
                      required
                      className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                    Expected Purchase Volume / Year
                  </label>
                  <select className="w-full bg-ivory border border-champagne/40 p-2.5 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                    <option>₹10 Lakhs - ₹25 Lakhs</option>
                    <option>₹25 Lakhs - ₹50 Lakhs</option>
                    <option>₹50 Lakhs - ₹1 Crore</option>
                    <option>₹1 Crore+</option>
                  </select>
                </div>

                <Button variant="gold" size="lg" className="w-full mt-4">
                  Submit Registration Application
                </Button>

                <p className="text-[10px] text-taupe text-center font-light pt-2">
                  Applications are reviewed by senior business administration within 4 business hours.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

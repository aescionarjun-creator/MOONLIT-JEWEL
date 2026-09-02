import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Calendar, ShieldCheck, MessageCircle, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      category: true,
      collection: true,
    },
  });

  if (!product) {
    notFound();
  }

  const isWholesaleApproved = user?.role === "WHOLESALE_CUSTOMER" && user.wholesale?.status === "APPROVED";
  const primaryImg = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url || "/images/homepage_hero.jpg";

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-xs font-sans uppercase tracking-widest text-taupe mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-champagne-dark">Home</Link>
          <span>/</span>
          <Link href="/retail" className="hover:text-champagne-dark">{product.category?.name || "Jewellery"}</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xs overflow-hidden bg-ivory border border-champagne/30 shadow-luxury">
              <Image
                src={primaryImg}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                {product.rentalPrice && <Badge variant="rental" className="font-sans">Rental Available</Badge>}
              </div>
            </div>

            {/* Thumbnail Array */}
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square rounded-xs overflow-hidden bg-ivory border border-champagne/30 cursor-pointer hover:border-champagne"
                >
                  <Image src={img.url} alt={product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Specifications & Actions Column */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-gold-antique mb-2">
                <span>{product.purity}</span>
                <span>CODE: {product.productCode}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold leading-snug">
                {product.name}
              </h1>

              {product.collection && (
                <p className="text-xs font-sans text-soft-brown mt-1">
                  Collection: <strong className="text-charcoal">{product.collection.name}</strong>
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-white border border-champagne/40 p-6 rounded-xs space-y-3 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-taupe font-sans block">
                    Showroom Price
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal">
                    {formatINR(product.retailPrice)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-sans block font-semibold">
                    100% BIS Hallmarked
                  </span>
                  <span className="text-xs text-taupe font-sans font-light">
                    Includes Taxes & Insured Shipping
                  </span>
                </div>
              </div>

              {/* Wholesale Protected Price Banner */}
              {isWholesaleApproved && product.wholesalePrice ? (
                <div className="pt-3 border-t border-emerald/20 flex items-center justify-between text-emerald">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-sans font-bold">
                      Your B2B Wholesale Tier Price (MOQ: {product.moq})
                    </span>
                    <p className="font-serif text-2xl font-bold">{formatINR(product.wholesalePrice)}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald" />
                </div>
              ) : (
                <div className="pt-2 text-[11px] text-taupe font-sans flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-taupe" />
                  <span>Wholesale pricing is visible only to approved B2B partners. <Link href="/wholesale" className="text-champagne-dark hover:underline">Apply here</Link></span>
                </div>
              )}

              {/* Rental Rate Banner */}
              {product.rentalPrice && (
                <div className="pt-3 border-t border-champagne/20 flex items-center justify-between text-charcoal">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-gold-antique">
                      Bridal Rental Rate
                    </span>
                    <p className="font-sans text-sm font-semibold">
                      {formatINR(product.rentalPrice)} / day{" "}
                      <span className="text-taupe font-light font-sans text-xs">
                        (Security Deposit: {formatINR(product.securityDeposit || 0)})
                      </span>
                    </p>
                  </div>
                  <Link href="/rental">
                    <Button variant="outline" size="sm">
                      Check Event Dates
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/showroom">
                  <Button variant="gold" size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" /> Book Showroom Visit
                  </Button>
                </Link>

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Moonlit Jewel, I am interested in piece ${product.name} (Code: ${product.productCode}). Please share details.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="primary" size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald" /> WhatsApp Concierge
                  </Button>
                </a>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-white border border-champagne/30 p-6 rounded-xs space-y-4 font-sans text-xs">
              <h3 className="font-serif text-lg font-semibold text-charcoal border-b border-champagne/20 pb-2">
                Craftsmanship & Product Specifications
              </h3>

              <div className="grid grid-cols-2 gap-y-3 text-soft-brown">
                <div>
                  <span className="text-taupe block font-light">Gross Weight</span>
                  <span className="font-semibold text-charcoal">{product.weight}</span>
                </div>
                <div>
                  <span className="text-taupe block font-light">Purity Benchmark</span>
                  <span className="font-semibold text-charcoal">{product.purity}</span>
                </div>
                <div>
                  <span className="text-taupe block font-light">Gemstone Details</span>
                  <span className="font-semibold text-charcoal">{product.stoneDetails || "N/A"}</span>
                </div>
                <div>
                  <span className="text-taupe block font-light">Hallmark Certification</span>
                  <span className="font-semibold text-charcoal">{product.certification || "BIS 916 Hallmarked"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-champagne/20">
                <p className="text-taupe font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ArrowUpRight, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";
import { ProductType } from "@/types";

interface ProductCardProps {
  product: ProductType;
  userRole?: string;
  isWholesaleApproved?: boolean;
}

export function ProductCard({
  product,
  userRole = "CUSTOMER",
  isWholesaleApproved = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const primaryImg = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url || "/images/homepage_hero.jpg";

  // Wholesale pricing protection check
  const showWholesalePrice =
    (userRole === "WHOLESALE_CUSTOMER" || userRole === "ADMIN" || userRole === "SUPER_ADMIN") &&
    isWholesaleApproved &&
    product.wholesalePrice;

  return (
    <div className="group bg-white border border-champagne/30 rounded-xs overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between">
      {/* Image & Badge Container */}
      <div className="relative aspect-square overflow-hidden bg-ivory/50">
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
          {product.rentalPrice && <Badge variant="rental">Rental Available</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full text-charcoal hover:text-burgundy transition-colors shadow-xs z-10"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-burgundy text-burgundy" : ""}`} />
        </button>

        {/* Quick Overlay Action */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="bg-ivory text-charcoal px-3 py-1.5 text-xs uppercase tracking-widest font-sans font-medium flex items-center gap-1 hover:bg-champagne hover:text-charcoal-dark transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" /> View Piece
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-soft-brown font-sans mb-1">
            <span>{product.purity}</span>
            <span>{product.productCode}</span>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-champagne-dark transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-champagne/20 flex items-center justify-between">
          <div>
            {showWholesalePrice ? (
              <div>
                <span className="text-[10px] text-emerald font-semibold uppercase tracking-wider block">
                  Wholesale Price (MOQ: {product.moq})
                </span>
                <span className="font-serif text-lg font-bold text-emerald">
                  {formatINR(product.wholesalePrice!)}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-taupe uppercase tracking-wider block">
                  Showroom Price
                </span>
                <span className="font-serif text-lg font-bold text-charcoal">
                  {formatINR(product.retailPrice)}
                </span>
              </div>
            )}

            {product.rentalPrice && (
              <span className="text-[11px] text-soft-brown block font-sans">
                Rent: <strong className="text-charcoal">{formatINR(product.rentalPrice)}</strong>/day
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="text-charcoal hover:text-champagne transition-colors p-1"
            title="View Details"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

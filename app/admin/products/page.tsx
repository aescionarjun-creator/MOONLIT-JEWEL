import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit, Trash, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Product Catalogue & Inventory
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Manage 22K gold, diamond, Kundan Polki jewellery, stock counts, and multi-tier pricing.
          </p>
        </div>

        <Button variant="gold" size="sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add New Piece
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-champagne/30 rounded-xs shadow-luxury overflow-hidden">
        <div className="p-4 border-b border-champagne/20 bg-ivory/50 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-xs w-full bg-white border border-champagne/30 px-3 py-1.5 rounded-xs">
            <Search className="w-4 h-4 text-taupe" />
            <input
              type="text"
              placeholder="Search product by code or name..."
              className="w-full bg-transparent text-xs text-charcoal focus:outline-none placeholder:text-taupe"
            />
          </div>

          <span className="text-xs text-soft-brown font-sans">
            Total Pieces: <strong className="text-charcoal">{products.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal text-ivory uppercase tracking-widest font-serif text-[11px]">
              <tr>
                <th className="p-4">Piece & Image</th>
                <th className="p-4">Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Purity & Weight</th>
                <th className="p-4">Retail Price</th>
                <th className="p-4">Wholesale Price</th>
                <th className="p-4">Rental Fee</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-champagne/20 text-soft-brown">
              {products.map((p) => {
                const primaryImg = p.images?.find((i) => i.isPrimary)?.url || p.images?.[0]?.url || "/images/homepage_hero.jpg";

                return (
                  <tr key={p.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xs overflow-hidden bg-ivory shrink-0 border border-champagne/30">
                        <Image src={primaryImg} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-serif text-sm font-semibold text-charcoal block line-clamp-1">{p.name}</span>
                        <span className="text-[10px] text-taupe block font-sans">Tag: {p.verticalTag}</span>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-charcoal">{p.productCode}</td>
                    <td className="p-4 font-sans">{p.category?.name}</td>
                    <td className="p-4 font-sans">
                      <span className="block font-semibold text-charcoal">{p.purity}</span>
                      <span className="text-[10px] text-taupe">{p.weight}</span>
                    </td>

                    <td className="p-4 font-serif font-bold text-charcoal">{formatINR(p.retailPrice)}</td>
                    <td className="p-4 font-serif font-semibold text-emerald">
                      {p.wholesalePrice ? formatINR(p.wholesalePrice) : "—"}
                    </td>
                    <td className="p-4 font-sans">
                      {p.rentalPrice ? `${formatINR(p.rentalPrice)}/day` : "—"}
                    </td>

                    <td className="p-4 font-sans">
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-xs ${
                        p.stockQuantity > 2 ? "bg-emerald/10 text-emerald" : "bg-burgundy/10 text-burgundy"
                      }`}>
                        {p.stockQuantity} in stock
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-charcoal hover:text-champagne transition-colors" title="Edit Product">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-burgundy hover:text-red-600 transition-colors" title="Delete Product">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

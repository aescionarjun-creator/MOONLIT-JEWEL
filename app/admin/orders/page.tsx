import React from "react";
import { ShoppingBag, FileText, CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.retailOrder.findMany({
    include: {
      customer: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Orders & Invoice Generator
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Manage customer orders, track dispatch status, and issue tax invoices.
          </p>
        </div>
      </div>

      <div className="bg-white border border-champagne/30 rounded-xs shadow-luxury overflow-hidden">
        <div className="p-4 border-b border-champagne/20 bg-ivory/50">
          <span className="text-xs font-sans font-semibold text-charcoal">
            Total Orders ({orders.length})
          </span>
        </div>

        <div className="p-6 text-xs text-taupe text-center space-y-4">
          <p className="font-sans font-light">All dispatches processed through 100% insured transit & courier protocols.</p>
          <div className="p-4 bg-ivory border border-champagne/20 rounded-xs text-left flex items-center justify-between text-charcoal">
            <div>
              <span className="font-serif font-bold text-sm block">Order #MJ-ORD-2026-884</span>
              <span className="text-[11px] text-taupe block">Customer: Priya Sharma | Total: ₹9,85,000</span>
            </div>
            <span className="px-2.5 py-1 bg-emerald/10 text-emerald font-bold text-[10px] uppercase tracking-wider rounded-xs">
              CONFIRMED & PAID
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

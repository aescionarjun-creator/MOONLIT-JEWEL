import React from "react";
import { Users, Phone, Mail, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminCRMPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            CRM Lead Management & Inquiries
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Track customer inquiries across Bridal consultations, Showroom bookings, B2B wholesale, and Rental quotes.
          </p>
        </div>
      </div>

      <div className="bg-white border border-champagne/30 rounded-xs p-6 shadow-luxury space-y-4">
        <h3 className="font-serif text-xl font-semibold text-charcoal">
          Customer Inquiry Pipeline ({enquiries.length})
        </h3>

        <div className="space-y-3">
          {enquiries.length > 0 ? (
            enquiries.map((e) => (
              <div key={e.id} className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-serif font-bold text-sm text-charcoal block">{e.name}</span>
                  <span className="text-xs text-soft-brown block">
                    Phone: {e.phone} | Email: {e.email}
                  </span>
                  <p className="text-xs text-taupe font-light italic">
                    &quot;{e.message}&quot;
                  </p>
                </div>
                <span className="px-3 py-1 bg-champagne/20 text-charcoal-dark text-[10px] uppercase font-bold tracking-widest rounded-xs">
                  {e.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-taupe py-6 text-center font-light">No new CRM inquiries captured yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

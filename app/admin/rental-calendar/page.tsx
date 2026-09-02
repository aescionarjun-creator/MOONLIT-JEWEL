import React from "react";
import { Calendar as CalendarIcon, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminRentalCalendarPage() {
  const rentals = await prisma.rentalBooking.findMany({
    include: {
      customer: true,
      items: { include: { product: true } },
    },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Bridal Rental Calendar & Logistics
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Monitor rental dates, pickup & return schedules, security deposits, and availability lockouts.
          </p>
        </div>
      </div>

      <div className="bg-white border border-champagne/30 rounded-xs p-6 shadow-luxury space-y-6">
        <h3 className="font-serif text-xl font-semibold text-charcoal">
          Scheduled Bridal Rental Bookings ({rentals.length})
        </h3>

        <div className="space-y-4">
          {rentals.map((r) => (
            <div key={r.id} className="p-4 bg-ivory border border-champagne/30 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-charcoal">#{r.bookingNumber}</span>
                  <span className="px-2 py-0.5 bg-emerald/10 text-emerald text-[10px] uppercase font-bold tracking-wider rounded-xs">
                    {r.bookingStatus}
                  </span>
                </div>
                <p className="text-xs text-charcoal font-medium">Customer: {r.customer.name} ({r.customer.email})</p>
                <p className="text-xs text-soft-brown">
                  Item: <strong className="text-charcoal">{r.items[0]?.product?.name || "Bridal Set"}</strong>
                </p>
                <p className="text-xs text-taupe flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5 text-gold-antique" />
                  Reserved Dates: <strong>{new Date(r.startDate).toLocaleDateString()}</strong> to <strong>{new Date(r.endDate).toLocaleDateString()}</strong>
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="text-[10px] text-taupe uppercase tracking-widest block">Rental Fee</span>
                <span className="font-serif text-lg font-bold text-charcoal">{formatINR(r.totalFee)}</span>
                <span className="text-xs text-emerald block font-sans">
                  Deposit Held: {formatINR(r.securityDepositTotal)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

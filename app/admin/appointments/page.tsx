import React from "react";
import { Calendar, Clock, CheckCircle, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { preferredDate: "asc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Showroom Appointments & Bridal Suite Schedule
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Manage scheduled bridal consultations, private showroom visits, and B2B meetings.
          </p>
        </div>
      </div>

      <div className="bg-white border border-champagne/30 rounded-xs p-6 shadow-luxury space-y-4">
        <h3 className="font-serif text-xl font-semibold text-charcoal">
          Scheduled Appointments ({appointments.length})
        </h3>

        <div className="space-y-3 text-xs">
          {appointments.length > 0 ? (
            appointments.map((a) => (
              <div key={a.id} className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-serif font-bold text-sm text-charcoal block">{a.name} ({a.type})</span>
                  <span className="text-soft-brown block">Phone: {a.phone} | Email: {a.email}</span>
                  <span className="text-taupe flex items-center gap-1 font-light pt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-antique" /> Location: {a.showroomLocation} | Slot: {a.preferredTime}
                  </span>
                </div>
                <span className="px-3 py-1 bg-emerald/10 text-emerald text-[10px] uppercase font-bold tracking-widest rounded-xs">
                  {a.status}
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
              <div>
                <span className="font-serif font-bold text-sm text-charcoal block">Priya Sharma (Bridal Suite Consultation)</span>
                <span className="text-soft-brown block">Phone: +91 98200 11223 | Email: priya.sharma@example.com</span>
                <span className="text-taupe flex items-center gap-1 font-light pt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-antique" /> Location: Chennai — T. Nagar Flagship | Slot: Afternoon (2:30 PM)
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald/10 text-emerald text-[10px] uppercase font-bold tracking-widest rounded-xs">
                CONFIRMED
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

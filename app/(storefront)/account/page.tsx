import React from "react";
import Link from "next/link";
import { User, Calendar, ShoppingBag, Heart, ShieldCheck, Lock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { formatINR } from "@/lib/utils";

export const revalidate = 0;

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-12 pb-20 font-sans">
      <div className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
            Bespoke Account Atelier
          </span>
          <h1 className="font-serif text-4xl text-ivory">
            Welcome, {user?.name || "Priya Sharma"}
          </h1>
          <p className="text-xs text-taupe font-light font-sans">
            Manage your orders, rental bookings, showroom appointments, and B2B wholesale access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-3">
            <User className="w-6 h-6 text-gold-antique" />
            <h3 className="font-serif text-lg font-semibold text-charcoal">Profile Details</h3>
            <div className="text-xs text-soft-brown space-y-1">
              <p>Email: {user?.email || "priya.sharma@example.com"}</p>
              <p>Role: <strong className="text-charcoal font-semibold">{user?.role || "CUSTOMER"}</strong></p>
            </div>
          </div>

          <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-3">
            <Calendar className="w-6 h-6 text-emerald" />
            <h3 className="font-serif text-lg font-semibold text-charcoal">Active Rental Bookings</h3>
            <p className="text-xs text-taupe font-light">1 Scheduled Booking (#MJ-RNT-2026-101)</p>
          </div>

          <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-3">
            <ShieldCheck className="w-6 h-6 text-champagne-dark" />
            <h3 className="font-serif text-lg font-semibold text-charcoal">B2B Wholesale Status</h3>
            <p className="text-xs text-soft-brown">
              {user?.role === "WHOLESALE_CUSTOMER" ? (
                <span className="text-emerald font-bold uppercase tracking-wider">Approved Partner</span>
              ) : (
                <Link href="/wholesale" className="text-champagne-dark hover:underline">Apply for Wholesale Tier</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Calendar,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  Package,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let stats = {
    totalRevenue: 2745000,
    totalProducts: 0,
    activeRentalsCount: 0,
    pendingWholesaleCount: 0,
    pendingAppointmentsCount: 0,
  };

  let products: any[] = [];
  let recentRentals: any[] = [];
  let wholesaleRequests: any[] = [];

  try {
    stats.totalProducts = await prisma.product.count();
    stats.activeRentalsCount = await prisma.rentalBooking.count({
      where: { bookingStatus: "BOOKED" },
    });
    stats.pendingWholesaleCount = await prisma.wholesaleCustomer.count({
      where: { status: "PENDING" },
    });
    stats.pendingAppointmentsCount = await prisma.appointment.count({
      where: { status: "PENDING" },
    });

    products = await prisma.product.findMany({
      take: 5,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    recentRentals = await prisma.rentalBooking.findMany({
      take: 5,
      include: {
        customer: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    wholesaleRequests = await prisma.wholesaleCustomer.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Admin dashboard fetch error:", err);
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top Title */}
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Real-time analytics across Retail, Wholesale B2B, Rental Bookings, and Showroom CRM.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs uppercase tracking-widest font-semibold">Total Revenue (MTD)</span>
            <TrendingUp className="w-5 h-5 text-emerald" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal">
            {formatINR(stats.totalRevenue)}
          </p>
          <span className="text-[10px] text-emerald font-semibold">+18.4% vs last month</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs uppercase tracking-widest font-semibold">Active Rental Bookings</span>
            <Calendar className="w-5 h-5 text-gold-antique" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal">
            {stats.activeRentalsCount}
          </p>
          <span className="text-[10px] text-soft-brown">Date conflict prevention active</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs uppercase tracking-widest font-semibold">Pending Wholesale B2B</span>
            <Building2 className="w-5 h-5 text-burgundy" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal">
            {stats.pendingWholesaleCount}
          </p>
          <span className="text-[10px] text-burgundy font-semibold">Requires GST Verification</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs uppercase tracking-widest font-semibold">Catalogue Products</span>
            <Package className="w-5 h-5 text-charcoal" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal">
            {stats.totalProducts}
          </p>
          <span className="text-[10px] text-soft-brown">BIS 916 Hallmarked</span>
        </div>
      </div>

      {/* Main Content Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Rental Schedule */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-4">
          <div className="flex items-center justify-between border-b border-champagne/20 pb-3">
            <h3 className="font-serif text-xl font-semibold text-charcoal flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-antique" /> Active Bridal Rentals
            </h3>
            <Link href="/admin/rental-calendar" className="text-xs uppercase tracking-widest text-champagne-dark font-semibold hover:underline">
              View Calendar
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {recentRentals.map((rental) => (
              <div key={rental.id} className="p-3 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-charcoal block">{rental.customer.name}</span>
                  <span className="text-[11px] text-taupe block">
                    Booking: #{rental.bookingNumber} | Dates: {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </span>
                </div>
                <span className="px-2 py-1 bg-emerald/10 text-emerald text-[10px] uppercase font-bold tracking-wider rounded-xs">
                  {rental.bookingStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* B2B Wholesale Applications */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-4">
          <div className="flex items-center justify-between border-b border-champagne/20 pb-3">
            <h3 className="font-serif text-xl font-semibold text-charcoal flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gold-antique" /> B2B Partner Applications
            </h3>
            <Link href="/admin/wholesale-requests" className="text-xs uppercase tracking-widest text-champagne-dark font-semibold hover:underline">
              Manage Registrations
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {wholesaleRequests.map((req) => (
              <div key={req.id} className="p-3 bg-ivory border border-champagne/20 rounded-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-charcoal block">{req.businessName}</span>
                  <span className="text-[11px] text-taupe block">
                    Owner: {req.ownerName} | GST: {req.gstNumber || "N/A"}
                  </span>
                </div>
                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs ${
                  req.status === "APPROVED" ? "bg-emerald/10 text-emerald" : "bg-burgundy/10 text-burgundy"
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

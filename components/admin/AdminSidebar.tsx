"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Building2,
  Users,
  TrendingUp,
  ShoppingBag,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Stock", href: "/admin/products", icon: Package },
    { name: "Rental Calendar", href: "/admin/rental-calendar", icon: Calendar },
    { name: "Wholesale B2B", href: "/admin/wholesale-requests", icon: Building2 },
    { name: "CRM & Inquiries", href: "/admin/crm", icon: Users },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Orders & Invoices", href: "/admin/orders", icon: ShoppingBag },
    { name: "Gold Rates", href: "/admin/gold-rates", icon: TrendingUp },
    { name: "Settings & Audit", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-charcoal text-ivory flex flex-col justify-between h-screen sticky top-0 border-r border-champagne/20 font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-charcoal-light flex flex-col">
          <Logo variant="dark" size="sm" />
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-champagne text-charcoal-dark font-bold shadow-xs"
                    : "text-taupe hover:bg-charcoal-light hover:text-ivory"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="p-4 border-t border-charcoal-light space-y-2 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-taupe hover:text-champagne transition-colors px-2 py-1"
        >
          <ExternalLink className="w-4 h-4" /> View Storefront
        </Link>
        <Link
          href="/api/auth/logout"
          className="flex items-center gap-2 text-burgundy hover:text-red-400 transition-colors px-2 py-1"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </aside>
  );
}

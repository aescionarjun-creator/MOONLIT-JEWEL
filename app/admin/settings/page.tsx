import React from "react";
import { Settings, ShieldCheck, History } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const auditLogs = [
    { id: 1, user: "admin@moonlitjewel.com", action: "GOLD_RATE_UPDATED", entity: "GoldRate", time: "Today, 10:30 AM", details: "Updated 22K rate to ₹6,850/g" },
    { id: 2, user: "admin@moonlitjewel.com", action: "WHOLESALE_APPROVED", entity: "WholesaleCustomer", time: "Today, 09:15 AM", details: "Approved Rajesh Retail Jewellers Pvt Ltd" },
    { id: 3, user: "admin@moonlitjewel.com", action: "PRODUCT_CREATED", entity: "Product", time: "Yesterday, 04:45 PM", details: "Added Royal Lakshmi Antique Gold Haram Set" },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            System Settings & Security Audit Logs
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Configure brand parameters, WhatsApp integration numbers, and view administrative activity logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Form */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-4">
          <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-champagne/20 pb-3">
            Brand & Concierge Settings
          </h3>

          <form className="space-y-4 text-xs">
            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                WhatsApp Concierge Number
              </label>
              <input
                type="text"
                defaultValue="+919876543210"
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
              />
            </div>

            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                Concierge Email Address
              </label>
              <input
                type="email"
                defaultValue="concierge@moonlitjewel.com"
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
              />
            </div>

            <div>
              <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                Default Rental Security Deposit (%)
              </label>
              <input
                type="text"
                defaultValue="25%"
                className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
              />
            </div>

            <Button variant="gold" size="md" className="w-full mt-2">
              Save Configuration Settings
            </Button>
          </form>
        </div>

        {/* Audit Log */}
        <div className="bg-white border border-champagne/30 p-6 rounded-xs shadow-luxury space-y-4">
          <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-champagne/20 pb-3 flex items-center gap-2">
            <History className="w-5 h-5 text-gold-antique" /> Admin Audit Log
          </h3>

          <div className="space-y-3 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-ivory border border-champagne/20 rounded-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-charcoal">{log.action}</span>
                  <span className="text-[10px] text-taupe">{log.time}</span>
                </div>
                <p className="text-soft-brown font-light">{log.details}</p>
                <span className="text-[10px] text-taupe block font-mono">User: {log.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

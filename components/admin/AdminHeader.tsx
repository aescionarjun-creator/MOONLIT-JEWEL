import React from "react";
import { Bell, ShieldCheck, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-champagne/30 px-8 py-4 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest text-gold-antique font-semibold bg-champagne/10 px-3 py-1 rounded-xs flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald" /> Administrator Privileges Active
        </span>
      </div>

      <div className="flex items-center space-x-4 text-xs">
        <div className="relative p-2 text-charcoal hover:text-champagne cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-burgundy rounded-full animate-ping" />
        </div>

        <div className="flex items-center gap-2 pl-4 border-l border-champagne/30">
          <div className="w-8 h-8 rounded-full bg-charcoal text-champagne flex items-center justify-center font-serif text-sm font-bold">
            M
          </div>
          <div>
            <span className="font-semibold text-charcoal block">Moonlit Super Admin</span>
            <span className="text-[10px] text-taupe block font-light">admin@moonlitjewel.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}

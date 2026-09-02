"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productCode?: string;
  productName?: string;
  rentalDates?: string;
  wholesale?: boolean;
}

export function WhatsAppButton({
  productCode,
  productName,
  rentalDates,
  wholesale = false,
}: WhatsAppButtonProps) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  let message = "Hello Moonlit Jewel Concierge, I would like to inquire about your jewellery collections.";

  if (productName && productCode) {
    if (rentalDates) {
      message = `Hello, I am interested in renting ${productName} (Code: ${productCode}) for dates: ${rentalDates}. Please confirm availability.`;
    } else if (wholesale) {
      message = `Hello, I would like to inquire about B2B wholesale pricing & MOQ for ${productName} (Code: ${productCode}).`;
    } else {
      message = `Hello, I am interested in ${productName} (Code: ${productCode}). Please share more details and showroom booking availability.`;
    }
  }

  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group"
      title="WhatsApp Concierge"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-sans uppercase tracking-widest font-semibold pl-1 pr-2">
        WhatsApp Concierge
      </span>
    </a>
  );
}

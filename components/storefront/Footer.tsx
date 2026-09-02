import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-16 pb-8 border-t border-champagne/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-charcoal-light">
          {/* Brand Story */}
          <div className="space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-xs text-taupe leading-relaxed font-light pt-1">
              Shine Forever. Crafting fine South Indian heritage jewellery across generations. Uncompromising 22K gold purity, artisan temple carvings, royal Mughal Kundan Polki, and modern bridal design.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs text-champagne hover:text-gold-soft uppercase tracking-widest gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald" /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links / Verticals */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest text-ivory uppercase">
              Business Divisions
            </h4>
            <ul className="space-y-2 text-xs text-taupe font-light">
              <li>
                <Link href="/bridal" className="hover:text-champagne transition-colors">
                  Bridal Couture & Sets
                </Link>
              </li>
              <li>
                <Link href="/retail" className="hover:text-champagne transition-colors">
                  Retail Gold & Diamond
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-champagne transition-colors">
                  B2B Wholesale Portal
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-champagne transition-colors">
                  Bridal Jewellery Rental
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-champagne transition-colors">
                  Temple & Antique Heritage
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-champagne transition-colors">
                  Bridal Editorial Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest text-ivory uppercase">
              Customer Experience
            </h4>
            <ul className="space-y-2 text-xs text-taupe font-light">
              <li>
                <Link href="/showroom" className="hover:text-champagne transition-colors">
                  Book Showroom Visit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne transition-colors">
                  Bridal Consultation
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-champagne transition-colors">
                  My Orders & Rental Bookings
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-champagne transition-colors">
                  Privacy Policy & Rental Terms
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-champagne transition-colors">
                  Terms of Service & Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom Flagship */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest text-ivory uppercase">
              Flagship Showroom
            </h4>
            <div className="text-xs text-taupe space-y-2 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>12 Usman Road, T. Nagar, Chennai, Tamil Nadu 600017</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>+91 44 2434 8888</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <span>concierge@moonlitjewel.com</span>
              </p>
              <p className="text-[11px] text-taupe/80 pt-2 border-t border-charcoal-light">
                Hours: Mon – Sun: 10:00 AM – 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-taupe/60 font-light gap-4">
          <p>© 2026 Moonlit Jewel Showroom — Shine Forever. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>BIS 916 Hallmarked</span>
            <span>•</span>
            <span>SGL/IGI Certified Diamonds</span>
            <span>•</span>
            <Link href="/admin" className="text-champagne hover:underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

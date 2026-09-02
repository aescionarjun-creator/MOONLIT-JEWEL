"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, Menu, X, PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bridal", href: "/bridal" },
    { name: "Retail", href: "/retail" },
    { name: "Wholesale B2B", href: "/wholesale" },
    { name: "Rental", href: "/rental" },
    { name: "Collections", href: "/collections" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Showroom", href: "/showroom" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal text-ivory text-xs font-sans tracking-widest py-2 px-4 text-center border-b border-champagne/20">
        <span>Crafted with Heritage. Designed for Your Most Beautiful Moments.</span>
      </div>

      {/* Header Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-luxury border-b border-champagne/30 py-3"
            : "bg-ivory border-b border-champagne/20 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-champagne transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-sans font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-champagne-dark font-semibold"
                      : "text-charcoal-light hover:text-champagne-dark"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons & CTA */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-charcoal hover:text-champagne transition-colors"
              title="Search Catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="p-2 text-charcoal hover:text-champagne transition-colors relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/account"
              className="p-2 text-charcoal hover:text-champagne transition-colors"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link href="/showroom" className="hidden sm:inline-block">
              <Button variant="gold" size="sm">
                <Calendar className="w-3.5 h-3.5 mr-1.5" /> Book Visit
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Modal Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-ivory border-b border-champagne p-6 shadow-luxury animate-in slide-in-from-top-2">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-taupe" />
              <input
                type="text"
                placeholder="Search by necklace, jhumka, code (e.g. MJ-BRD-001)..."
                className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal placeholder:text-taupe focus:outline-none focus:border-champagne text-sm font-sans"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs uppercase tracking-widest text-charcoal hover:text-champagne"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex">
          <div className="bg-ivory w-4/5 max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-champagne/30">
                <Logo variant="dark" size="sm" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6 text-charcoal" />
                </button>
              </div>

              <div className="py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-charcoal hover:text-champagne font-sans border-b border-charcoal/5 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-champagne/30 space-y-3">
              <Link href="/showroom" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <Button variant="gold" size="md" className="w-full">
                  Book Showroom Visit
                </Button>
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="block text-center text-xs text-charcoal-light hover:text-champagne uppercase tracking-widest"
              >
                WhatsApp Inquiry: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

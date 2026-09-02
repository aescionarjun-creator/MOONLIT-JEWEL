import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LookbookPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Royal South Indian Temple Bride",
      category: "South Indian Bride",
      image: "/images/homepage_hero.jpg",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      id: 2,
      title: "Maharani Kundan Polki Choker Suite",
      category: "Kundan & Polki",
      image: "/images/bridal_hero.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 3,
      title: "The Atelier Private Lounge",
      category: "Showroom",
      image: "/images/showroom_hero.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 4,
      title: "Divine Lakshmi Haram Details",
      category: "Temple Gold",
      image: "/images/homepage_hero.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 5,
      title: "Uncut Emerald & Diamond Craft",
      category: "High Jewellery",
      image: "/images/bridal_hero.jpg",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            Bridal Editorial Showcase
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            The Bridal Lookbook
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Every bride has a story. Explore editorial campaign photography featuring real bridal transformations, temple heritage heirlooms, and Kundan Polki styling.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-xs overflow-hidden shadow-luxury border border-champagne/20 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-ivory space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-champagne font-sans font-semibold">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white border border-champagne/40 p-8 rounded-xs text-center space-y-4 shadow-luxury">
          <h3 className="font-serif text-2xl text-charcoal font-semibold">
            Want Custom Bridal Jewellery Styling?
          </h3>
          <p className="text-xs text-soft-brown font-sans max-w-md mx-auto font-light">
            Book an exclusive 1-on-1 session with senior bridal jewellery curators at our Chennai or Hyderabad private lounges.
          </p>
          <Link href="/showroom" className="inline-block">
            <Button variant="gold" size="md">
              <Calendar className="w-4 h-4 mr-2" /> Schedule Styling Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

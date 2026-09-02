import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = [
    {
      name: "Temple Heritage",
      slug: "temple-heritage",
      description: "Hand-carved divine motifs featuring Goddess Lakshmi, Mayura peacocks, and sacred temple arches in 22K antique gold.",
      image: "/images/homepage_hero.jpg",
      count: "14 Pieces",
    },
    {
      name: "Kundan & Uncut Polki",
      slug: "kundan-polki",
      description: "Royal Mughal and Rajasthani inspired uncut diamond settings with vivid emerald beads and delicate meenakari enamel.",
      image: "/images/bridal_hero.jpg",
      count: "18 Pieces",
    },
    {
      name: "Antique Royal Gold",
      slug: "antique-royal",
      description: "Heavy Nakshi and Guttapusalu craftsmanship passed down through generations of South Indian goldsmiths.",
      image: "/images/homepage_hero.jpg",
      count: "12 Pieces",
    },
    {
      name: "Certified Solitaires & Diamonds",
      slug: "certified-diamonds",
      description: "Flawless IGI certified diamond necklaces, drop earrings, and contemporary cocktail rings.",
      image: "/images/showroom_hero.jpg",
      count: "22 Pieces",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            Signature Editorial Editions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            The Signature Collections
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Curated anthologies of fine jewellery celebrating sacred mythology, royal courts, and contemporary high-jewellery artistry.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {collections.map((col, idx) => (
            <div
              key={col.slug}
              className="group bg-white border border-champagne/30 rounded-xs overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-xs text-ivory text-[10px] uppercase tracking-widest px-3 py-1 rounded-xs font-sans">
                  {col.count}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <span className="text-xs font-sans uppercase tracking-widest text-gold-antique font-semibold block">
                  Collection {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-charcoal group-hover:text-champagne-dark transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-soft-brown font-sans font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link href={`/retail?collection=${col.slug}`}>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      Explore Collection <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function ShowroomPage() {
  let showrooms = [
    {
      name: "Flagship Showroom — T. Nagar, Chennai",
      city: "Chennai",
      address: "12 Usman Road, T. Nagar, Chennai, Tamil Nadu 600017",
      phone: "+91 44 2434 8888",
      email: "tnagar@moonlitjewel.com",
      openingHours: "Mon - Sun: 10:00 AM - 9:00 PM",
      image: "/images/showroom_hero.jpg",
    },
    {
      name: "Banjara Hills Lounge — Hyderabad",
      city: "Hyderabad",
      address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
      phone: "+91 40 6688 9900",
      email: "banjarahills@moonlitjewel.com",
      openingHours: "Mon - Sun: 10:30 AM - 8:30 PM",
      image: "/images/showroom_hero.jpg",
    },
  ];

  try {
    const dbShowrooms = await prisma.showroom.findMany();
    if (dbShowrooms.length > 0) {
      showrooms = dbShowrooms as any;
    }
  } catch (err) {
    console.error("Showroom fetch fallback:", err);
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-sans font-semibold">
            Bespoke Customer Experience
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Visit Our Heritage Showrooms
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto font-sans leading-relaxed">
            Step into our private bridal suites for an exclusive 1-on-1 jewellery consultation with senior gemologists and bridal stylists.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showrooms.map((sr, idx) => (
            <div key={idx} className="bg-white border border-champagne/30 rounded-xs overflow-hidden shadow-luxury">
              <div className="relative aspect-[16/9] overflow-hidden bg-ivory">
                <Image src={sr.image || "/images/showroom_hero.jpg"} alt={sr.name} fill className="object-cover" />
              </div>
              <div className="p-8 space-y-4 font-sans text-xs">
                <h3 className="font-serif text-2xl text-charcoal font-semibold">{sr.name}</h3>
                <div className="space-y-2 text-soft-brown font-light">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{sr.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-champagne shrink-0" />
                    <span>{sr.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-champagne shrink-0" />
                    <span>{sr.email}</span>
                  </p>
                  <p className="flex items-center gap-2 pt-2 border-t border-champagne/20">
                    <Clock className="w-4 h-4 text-champagne shrink-0" />
                    <span>{sr.openingHours}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Booking Form */}
        <div className="bg-white border border-champagne/40 p-8 lg:p-12 rounded-xs shadow-luxury space-y-6">
          <div className="border-b border-champagne/20 pb-4 text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-antique font-sans font-semibold">
              Personalized Consultation
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-semibold mt-1">
              Book a Private Showroom Appointment
            </h2>
            <p className="text-xs text-soft-brown font-sans font-light mt-1">
              Reserve a private suite with our senior bridal consultants.
            </p>
          </div>

          <form className="max-w-3xl mx-auto space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Priya Sharma"
                  required
                  className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="priya@example.com"
                  required
                  className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Appointment Type
                </label>
                <select className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                  <option>Bridal Suite Consultation</option>
                  <option>Retail Showroom Visit</option>
                  <option>Wholesale B2B Meeting</option>
                  <option>Rental Trial & Pickup</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Showroom Location *
                </label>
                <select className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                  <option>Chennai — T. Nagar Flagship</option>
                  <option>Hyderabad — Banjara Hills Lounge</option>
                </select>
              </div>
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Preferred Slot
                </label>
                <select className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                  <option>Morning (11:00 AM)</option>
                  <option>Afternoon (2:30 PM)</option>
                  <option>Evening (6:00 PM)</option>
                </select>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full mt-4">
              Confirm Appointment Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

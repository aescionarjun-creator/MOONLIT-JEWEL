import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* Banner */}
      <section className="bg-charcoal text-ivory py-16 px-4 text-center border-b border-champagne/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-champagne font-semibold">
            Concierge Client Care
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory">
            Connect with Moonlit Jewel Atelier
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-xl mx-auto leading-relaxed">
            Our jewellery concierge advisors are available for custom bridal orders, B2B wholesale partnerships, and rental inquiries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-champagne/40 p-8 rounded-xs shadow-luxury space-y-6">
            <div className="border-b border-champagne/20 pb-4">
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Send an Inquiry
              </h3>
              <p className="text-xs text-soft-brown font-light mt-1">
                We respond to all bespoke client requests within 2 hours.
              </p>
            </div>

            <form className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                    Your Name *
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
                  Inquiry Topic
                </label>
                <select className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne">
                  <option>Bridal Consultation</option>
                  <option>Retail Gold & Diamond Purchase</option>
                  <option>B2B Wholesale Partnership</option>
                  <option>Jewellery Rental Booking</option>
                  <option>Showroom Appointment</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal uppercase tracking-widest font-semibold mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your event date or jewellery requirement..."
                  required
                  className="w-full bg-ivory border border-champagne/40 p-3 rounded-xs text-charcoal focus:outline-none focus:border-champagne"
                />
              </div>

              <Button variant="gold" size="lg" className="w-full">
                Submit Inquiry to Concierge
              </Button>
            </form>
          </div>

          {/* Showroom Contact Direct */}
          <div className="space-y-6">
            <div className="bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury space-y-4">
              <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-champagne/20 pb-3">
                Flagship Showroom — Chennai
              </h3>
              <div className="space-y-3 text-xs text-soft-brown font-light">
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
                  <span>tnagar@moonlitjewel.com</span>
                </p>
                <p className="flex items-center gap-2 pt-2 border-t border-champagne/20">
                  <Clock className="w-4 h-4 text-champagne shrink-0" />
                  <span>Mon - Sun: 10:00 AM - 9:00 PM</span>
                </p>
              </div>
            </div>

            <div className="bg-white border border-champagne/30 p-8 rounded-xs shadow-luxury space-y-4">
              <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-champagne/20 pb-3">
                Private Lounge — Hyderabad
              </h3>
              <div className="space-y-3 text-xs text-soft-brown font-light">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                  <span>Road No. 12, Banjara Hills, Hyderabad, Telangana 500034</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-champagne shrink-0" />
                  <span>+91 40 6688 9900</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-champagne shrink-0" />
                  <span>banjarahills@moonlitjewel.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/storefront/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moonlit Jewel Showroom | Shine Forever — Luxury Heritage Jewellery",
  description:
    "Moonlit Jewel Showroom — Shine Forever. Explore timeless South Indian bridal jewellery, antique temple collections, royal Kundan Polki, 22K gold retail, B2B wholesale, and date-based bridal jewellery rentals.",
  keywords: [
    "Moonlit Jewel Showroom",
    "Shine Forever",
    "Bridal Jewellery Chennai",
    "Temple Jewellery",
    "Kundan Polki Choker",
    "Jewellery Rental",
    "B2B Wholesale Jewellery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col justify-between">
        <main className="flex-1">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}

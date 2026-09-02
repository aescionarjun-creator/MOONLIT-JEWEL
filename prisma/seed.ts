import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Moonlit Jewel Database...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  const userPassword = await bcrypt.hash("Customer@123456", 10);

  // 1. Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@moonlitjewel.com" },
    update: {},
    create: {
      email: "admin@moonlitjewel.com",
      passwordHash: adminPassword,
      name: "Moonlit Admin",
      phone: "+919876543210",
      role: "SUPER_ADMIN",
    },
  });

  // 2. Customer User
  const customerUser = await prisma.user.upsert({
    where: { email: "priya.sharma@example.com" },
    update: {},
    create: {
      email: "priya.sharma@example.com",
      passwordHash: userPassword,
      name: "Priya Sharma",
      phone: "+919820011223",
      role: "CUSTOMER",
    },
  });

  // 3. Approved Wholesale User
  const wholesaleUser = await prisma.user.upsert({
    where: { email: "wholesale.partner@example.com" },
    update: {},
    create: {
      email: "wholesale.partner@example.com",
      passwordHash: userPassword,
      name: "Rajesh Jewellers B2B",
      phone: "+919840055443",
      role: "WHOLESALE_CUSTOMER",
    },
  });

  await prisma.wholesaleCustomer.upsert({
    where: { userId: wholesaleUser.id },
    update: {},
    create: {
      userId: wholesaleUser.id,
      businessName: "Rajesh Retail Jewellers Pvt Ltd",
      ownerName: "Rajesh Kumar",
      phone: "+919840055443",
      email: "wholesale.partner@example.com",
      gstNumber: "33AAAAA0000A1Z5",
      businessType: "RETAILER",
      city: "Chennai",
      state: "Tamil Nadu",
      address: "45 T. Nagar Commercial Complex",
      expectedVolume: "₹50L - ₹1Cr annually",
      status: "APPROVED",
      approvedAt: new Date(),
    },
  });

  // 4. Categories
  const catBridal = await prisma.category.upsert({
    where: { slug: "bridal-sets" },
    update: {},
    create: {
      name: "Bridal Sets",
      slug: "bridal-sets",
      description: "Grand bridal necklace sets crafted for royal heritage brides.",
      displayOrder: 1,
    },
  });

  const catNecklace = await prisma.category.upsert({
    where: { slug: "necklaces" },
    update: {},
    create: {
      name: "Necklaces & Harams",
      slug: "necklaces",
      description: "Traditional South Indian harams, chokers, and statement necklaces.",
      displayOrder: 2,
    },
  });

  const catEarrings = await prisma.category.upsert({
    where: { slug: "earrings" },
    update: {},
    create: {
      name: "Earrings & Jhumkas",
      slug: "earrings",
      description: "Intricately detailed gold jhumkas, chandbalis, and diamond studs.",
      displayOrder: 3,
    },
  });

  const catBangles = await prisma.category.upsert({
    where: { slug: "bangles" },
    update: {},
    create: {
      name: "Bangles & Kadas",
      slug: "bangles",
      description: "Solid 22K gold bangles, temple relief kadas, and gemstone bracelets.",
      displayOrder: 4,
    },
  });

  // 5. Collections
  const colTemple = await prisma.collection.upsert({
    where: { slug: "temple-heritage" },
    update: {},
    create: {
      name: "Temple Heritage",
      slug: "temple-heritage",
      description: "Hand-carved divine motifs featuring Lakshmi and peacock craft.",
      heroImage: "/images/homepage_hero.jpg",
      featured: true,
    },
  });

  const colKundan = await prisma.collection.upsert({
    where: { slug: "kundan-polki" },
    update: {},
    create: {
      name: "Kundan & Uncut Polki",
      slug: "kundan-polki",
      description: "Royal Mughal and Rajasthani inspired royal uncut diamond craftsmanship.",
      heroImage: "/images/bridal_hero.jpg",
      featured: true,
    },
  });

  // 6. Gold Rates
  await prisma.goldRate.create({
    data: {
      rate22k: 6850,
      rate24k: 7470,
      rateSilver: 88,
      unit: "per gram",
      isCurrent: true,
    },
  });

  // 7. Showrooms
  await prisma.showroom.createMany({
    data: [
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
    ],
  });

  // 8. Products
  const productsData = [
    {
      productCode: "MJ-BRD-001",
      name: "Royal Lakshmi Antique Gold Haram Set",
      slug: "royal-lakshmi-antique-gold-haram-set",
      categoryId: catBridal.id,
      collectionId: colTemple.id,
      description: "A monumental 22K antique gold bridal haram adorned with hand-carved Goddess Lakshmi iconography, ruby cabochons, and natural emerald drops. Paired with matching statement jhumkas.",
      purity: "22K Antique Gold (916)",
      weight: "142.80g",
      stoneDetails: "Uncut Rubies (8.4ct), Emerald Drops (12.2ct), Freshwater Pearls",
      dimensions: "Length: 24 inches | Pendant width: 3.5 inches",
      retailPrice: 985000,
      wholesalePrice: 840000,
      rentalPrice: 18500,
      securityDeposit: 50000,
      moq: 1,
      stockQuantity: 3,
      isAvailable: true,
      certification: "BIS 916 Hallmarked",
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      verticalTag: "ALL",
      images: {
        create: [
          { url: "/images/homepage_hero.jpg", type: "FRONT", isPrimary: true, sortOrder: 1 },
          { url: "/images/bridal_hero.jpg", type: "WORN", isPrimary: false, sortOrder: 2 },
        ],
      },
    },
    {
      productCode: "MJ-KND-002",
      name: "Maharani Royal Kundan Polki Choker",
      slug: "maharani-royal-kundan-polki-choker",
      categoryId: catBridal.id,
      collectionId: colKundan.id,
      description: "An extraordinary multi-tier choker meticulously set with uncut Polki diamonds, meenakari enamel work on the reverse, and vivid emerald bead clusters.",
      purity: "22K Gold & Silver Alloy (Polki Setting)",
      weight: "118.40g",
      stoneDetails: "Natural Polki Diamonds (34.5ct), Zambian Emerald Beads (45.0ct)",
      dimensions: "Choker width: 2.8 inches | Adjustable silk dori",
      retailPrice: 1250000,
      wholesalePrice: 1050000,
      rentalPrice: 24000,
      securityDeposit: 75000,
      moq: 1,
      stockQuantity: 2,
      isAvailable: true,
      certification: "SGL Gemological Certificate Included",
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      verticalTag: "BRIDAL",
      images: {
        create: [
          { url: "/images/bridal_hero.jpg", type: "FRONT", isPrimary: true, sortOrder: 1 },
        ],
      },
    },
    {
      productCode: "MJ-RTL-003",
      name: "Divine Mayura 22K Gold Jhumkas",
      slug: "divine-mayura-22k-gold-jhumkas",
      categoryId: catEarrings.id,
      collectionId: colTemple.id,
      description: "Intricately sculpted peacock motif temple jhumkas featuring delicate gold pearl clusters and ruby drop accents. Perfect for festive celebrations and wedding receptions.",
      purity: "22K Yellow Gold (916)",
      weight: "36.20g",
      stoneDetails: "Sythetic Rubies & Cultured Seed Pearls",
      dimensions: "Height: 2.4 inches",
      retailPrice: 245000,
      wholesalePrice: 210000,
      rentalPrice: 4500,
      securityDeposit: 15000,
      moq: 2,
      stockQuantity: 8,
      isAvailable: true,
      certification: "BIS 916 Hallmarked",
      isFeatured: false,
      isNew: true,
      isBestSeller: true,
      verticalTag: "RETAIL",
      images: {
        create: [
          { url: "/images/bridal_hero.jpg", type: "FRONT", isPrimary: true, sortOrder: 1 },
        ],
      },
    },
    {
      productCode: "MJ-BNG-004",
      name: "Nawabi Antique Gold Kada Pair",
      slug: "nawabi-antique-gold-kada-pair",
      categoryId: catBangles.id,
      collectionId: colTemple.id,
      description: "A pair of heavy screw-open antique gold kadas carved with royal lion head end caps and studded with ruby cabochons.",
      purity: "22K Antique Gold",
      weight: "72.40g (Pair)",
      stoneDetails: "Natural Burmese Rubies (3.2ct)",
      dimensions: "Size 2.6 (Customizable)",
      retailPrice: 510000,
      wholesalePrice: 435000,
      rentalPrice: 8500,
      securityDeposit: 25000,
      moq: 1,
      stockQuantity: 4,
      isAvailable: true,
      certification: "BIS 916 Hallmarked",
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      verticalTag: "WHOLESALE",
      images: {
        create: [
          { url: "/images/homepage_hero.jpg", type: "FRONT", isPrimary: true, sortOrder: 1 },
        ],
      },
    },
  ];

  for (const p of productsData) {
    const createdProduct = await prisma.product.upsert({
      where: { productCode: p.productCode },
      update: {},
      create: p,
    });

    await prisma.inventory.upsert({
      where: { productId: createdProduct.id },
      update: {},
      create: {
        productId: createdProduct.id,
        totalStock: p.stockQuantity,
        reserved: 0,
        available: p.stockQuantity,
        lowStockThreshold: 2,
      },
    });
  }

  // 9. Sample Rental Booking
  const firstProduct = await prisma.product.findFirst();
  if (firstProduct && firstProduct.rentalPrice && firstProduct.securityDeposit) {
    const existingBooking = await prisma.rentalBooking.findFirst();
    if (!existingBooking) {
      await prisma.rentalBooking.create({
        data: {
          bookingNumber: "MJ-RNT-2026-101",
          customerId: customerUser.id,
          startDate: new Date("2026-09-15"),
          endDate: new Date("2026-09-18"),
          totalFee: firstProduct.rentalPrice * 3,
          securityDepositTotal: firstProduct.securityDeposit,
          paymentStatus: "PAID",
          bookingStatus: "BOOKED",
          notes: "Bridal rental booking for wedding reception",
          items: {
            create: [
              {
                productId: firstProduct.id,
                rentalFee: firstProduct.rentalPrice * 3,
                securityDeposit: firstProduct.securityDeposit,
              },
            ],
          },
        },
      });
    }
  }

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

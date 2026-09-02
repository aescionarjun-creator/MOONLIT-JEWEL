export type Role = "CUSTOMER" | "WHOLESALE_CUSTOMER" | "STAFF" | "ADMIN" | "SUPER_ADMIN";

export type VerticalTag = "BRIDAL" | "RETAIL" | "WHOLESALE" | "RENTAL" | "ALL";

export interface ProductType {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
  };
  collectionId?: string | null;
  collection?: {
    name: string;
    slug: string;
  } | null;
  description: string;
  purity: string;
  weight: string;
  stoneDetails?: string | null;
  dimensions?: string | null;
  retailPrice: number;
  wholesalePrice?: number | null;
  rentalPrice?: number | null;
  securityDeposit?: number | null;
  moq: number;
  stockQuantity: number;
  isAvailable: boolean;
  certification?: string | null;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  verticalTag: VerticalTag;
  images: {
    id: string;
    url: string;
    type: string;
    isPrimary: boolean;
  }[];
}

export interface RentalBookingType {
  id: string;
  bookingNumber: string;
  startDate: string;
  endDate: string;
  totalFee: number;
  securityDepositTotal: number;
  paymentStatus: string;
  bookingStatus: "RESERVED" | "BOOKED" | "PICKED_UP" | "RETURNED" | "LATE" | "CANCELLED";
  customer: {
    name: string;
    email: string;
    phone?: string | null;
  };
  items: {
    product: ProductType;
    rentalFee: number;
    securityDeposit: number;
  }[];
}

export interface WholesaleApplicationType {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  gstNumber?: string | null;
  businessType: string;
  city: string;
  state: string;
  expectedVolume?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface GoldRateType {
  rate22k: number;
  rate24k: number;
  rateSilver: number;
  unit: string;
  effectiveDate: string;
}

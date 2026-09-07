export interface TreatmentItem {
  id: string;
  categoryId: string;
  name: string;
  subTitle?: string;
  inclusions: string[]; // e.g. ["1x IPL Glow", "1x Diamond Peel", "1x Collagen Mask"]
  originalPrice: number; // in thousands IDR, e.g. 797 means 797.000
  nonMemberPrice: number; // e.g. 459
  memberPrice: number; // e.g. 399
  badge?: string; // e.g. "Best Seller", "Hemat 50%", "Promo Merdeka"
  isNewPromo?: boolean;
  outletNotes?: string; // e.g. "Hanya tersedia di Arteri"
  skinGoal?: string; // Glowing, Acne, Scar, Anti-Aging, Slimming, Hair
  sessionsCount?: number;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  pdfOrPhotoUrl: string; // link to PDF or image on Google Drive / Web
  badge?: string;
  order: number;
}

export interface SinglePromoItem {
  id: string;
  group: 'Glow & Rejuve' | 'Slimming & Contouring' | 'Acne & Scar' | 'Anti-Aging' | 'Hair Grow';
  name: string;
  originalPrice: number;
  nonMemberPrice: number;
  memberPrice: number;
  outletRestricted?: string;
  notes?: string;
}

export interface SubscriptionItem {
  id: string;
  treatmentName: string;
  singlePrice: number;
  package3x?: {
    nonMember: number;
    member: number;
    original: number;
    perSessionNonMember: number;
    perSessionMember: number;
  };
  package4x?: {
    nonMember: number;
    member: number;
    original: number;
    perSessionNonMember: number;
    perSessionMember: number;
  };
  package6x?: {
    nonMember: number;
    member: number;
    original: number;
    perSessionNonMember: number;
    perSessionMember: number;
  };
  package8x?: {
    nonMember: number;
    member: number;
    original: number;
    perSessionNonMember: number;
    perSessionMember: number;
  };
  package12x?: {
    nonMember: number;
    member: number;
    original: number;
    perSessionNonMember: number;
    perSessionMember: number;
  };
}

export interface SkincareKit {
  id: string;
  name: string;
  originalPrice: number;
  promoPrice: number;
  items: string[];
  freeGift?: string;
}

export interface BranchLocation {
  id: string;
  city: string;
  name: string;
  address: string;
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  periodText: string;
  bookingDp: number;
  serviceChargePercent: number;
  serviceChargeMax: number;
  packageValidityMonths: number;
  csWhatsappNumber: string;
  spreadsheetId?: string;
  webAppUrl?: string;
  lastSyncedAt?: string;
}

export interface CartItem {
  treatment: TreatmentItem;
  quantity: number;
  priceType: 'member' | 'nonMember';
}

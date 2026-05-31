export interface FragranceNote {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Perfume {
  id: string;
  name: string;
  subName: string;
  category: "amber" | "woody" | "floral" | "fresh";
  categoryLabel: string;
  description: string;
  richDescription: string;
  image: string;
  notes: FragranceNote;
  characteristics: {
    longevity: number; // 1-5
    sillage: number; // 1-5
    intensity: 'Légère' | 'Ambiante' | 'Intense' | 'Souveraine';
  };
  sizes: {
    ml: number;
    price: number; // in DZD (Dinar Algérien)
  }[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  perfume: Perfume;
  selectedSize: {
    ml: number;
    price: number;
  };
  quantity: number;
}

export interface Wilaya {
  id: number;
  code: string;
  name: string;
  arabicName: string;
  shippingFee: number;
}

export interface Review {
  id: string;
  perfumeId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  image?: string;
}

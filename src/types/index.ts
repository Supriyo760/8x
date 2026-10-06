export type CategorySlug = 'all' | 'electronics' | 'computers' | 'audio' | 'gaming' | 'home' | 'books';

export interface ProductVariant {
  id: string;
  type: 'color' | 'storage' | 'size';
  label: string;
  value: string;
  priceModifier: number;
  image?: string;
}

export interface AIReviewDigest {
  verdict: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface Product {
  id: string;
  asin?: string;
  amazonUrl?: string;
  title: string;
  brand: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  isBestSeller?: boolean;
  isAmazonChoice?: boolean;
  inStock: boolean;
  stockCount: number;
  deliveryDays: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  aiReviewDigest: AIReviewDigest;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type DeliverySpeed = 'prime_two_day' | 'next_day' | 'standard';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  deliverySpeed: DeliverySpeed;
  estimatedDeliveryDate: string;
  status: 'ordered' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  trackingNumber: string;
  promoCodeApplied?: string;
}

export interface FilterState {
  searchQuery: string;
  category: CategorySlug;
  isPrimeOnly: boolean;
  minRating: number;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  brand: string;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export interface UserPersona {
  id: string;
  name: string;
  isPrime: boolean;
  email: string;
  defaultZip: string;
  avatarUrl: string;
}

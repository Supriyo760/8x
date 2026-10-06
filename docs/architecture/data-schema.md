# Data Schema & Entity Models — Amazon Re-imagined

## 1. Entity Overview
The system models a realistic e-commerce retail platform around 6 primary entities:
1. `Product`: The base catalog item with metadata, pricing, badges, and specs.
2. `ProductVariant`: Child variations (Color, Storage, Size) with price and image offsets.
3. `Category`: Department taxonomy.
4. `CartItem`: Active shopping cart entry referencing a product, selected variant, and quantity.
5. `Order`: Completed checkout transaction with customer address, pricing breakdown, and fulfillment status.
6. `Review`: Customer feedback entity with ratings, verified purchase status, and AI sentiment tags.

## 2. TypeScript Data Interfaces

```typescript
export interface Product {
  id: string;
  title: string;
  brand: string;
  category: 'electronics' | 'computers' | 'home' | 'audio' | 'gaming' | 'books';
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

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  deliverySpeed: 'prime_two_day' | 'next_day' | 'standard';
  estimatedDeliveryDate: string;
  status: 'ordered' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  trackingNumber: string;
}
```

import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';
import { PRODUCTS } from '../data/products';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qoyximsmzrgouohvpied.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseService = {
  /**
   * Fetch products from Supabase table or fallback gracefully to curated catalog
   */
  async getProducts(): Promise<Product[]> {
    if (!supabase) return PRODUCTS;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error || !data || data.length === 0) {
        return PRODUCTS;
      }

      return data as Product[];
    } catch (err) {
      console.warn('Supabase products fetch failed, using local catalog:', err);
      return PRODUCTS;
    }
  },

  /**
   * Save a new order to Supabase orders table
   */
  async saveOrder(order: Order): Promise<boolean> {
    if (!supabase) return true;

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            id: order.id,
            placed_at: order.createdAt,
            items: order.items,
            total_amount: order.total,
            status: order.status,
            shipping_address: order.shippingAddress,
            delivery_speed: order.deliverySpeed,
            tracking_number: order.trackingNumber,
            estimated_delivery: order.estimatedDeliveryDate
          }
        ]);

      if (error) {
        console.warn('Supabase order insert notice:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase order save error:', err);
      return false;
    }
  },

  /**
   * Fetch saved orders from Supabase
   */
  async getOrders(): Promise<Order[] | null> {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('placed_at', { ascending: false });

      if (error || !data) return null;
      return data as unknown as Order[];
    } catch {
      return null;
    }
  },

  /**
   * Seed / Sync local benchmark products to Supabase cloud database
   */
  async seedProductsToSupabase(): Promise<{ success: boolean; count: number; error?: string }> {
    if (!supabase) return { success: false, count: 0, error: 'Supabase client not initialized.' };

    try {
      const { error } = await supabase
        .from('products')
        .upsert(
          PRODUCTS.map(p => ({
            id: p.id,
            title: p.title,
            brand: p.brand,
            category: p.category,
            price: p.price,
            original_price: p.originalPrice,
            discount_percentage: p.discountPercentage,
            rating: p.rating,
            review_count: p.reviewCount,
            is_prime: p.isPrime,
            is_best_seller: p.isBestSeller,
            in_stock: p.inStock,
            stock_count: p.stockCount,
            images: p.images,
            description: p.description,
            features: p.features,
            specs: p.specs,
            variants: p.variants,
            ai_review_digest: p.aiReviewDigest
          }))
        );

      if (error) {
        return { success: false, count: 0, error: error.message };
      }

      return { success: true, count: PRODUCTS.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Failed to seed products' };
    }
  }
};


import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  ProductVariant, 
  Order, 
  FilterState, 
  UserPersona, 
  ShippingAddress, 
  DeliverySpeed,
  CategorySlug 
} from '../types';
import { PRODUCTS } from '../data/products';
import { supabaseService } from '../services/supabase';
import { geminiService } from '../services/gemini';
import { amazonApiService } from '../services/amazonApi';
import { taxService } from '../services/tax';
import { promoService } from '../services/promos';
import { playAudioFeedback } from '../utils/audio';

interface AppContextType {
  products: Product[];
  activeView: 'home' | 'catalog' | 'pdp' | 'cart' | 'orders';
  setActiveView: (view: 'home' | 'catalog' | 'pdp' | 'cart' | 'orders') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  navigateToProduct: (product: Product) => void;
  searchOnlineProducts: (query: string) => Promise<Product[]>;
  isSearchingAI: boolean;
  
  // Theme & Audio
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingGap: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Promo Code
  promoCode: string;
  discountPercent: number;
  applyPromoCode: (code: string) => boolean;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Comparison Dock
  comparedProducts: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // Quick Peek
  quickPeekProduct: Product | null;
  setQuickPeekProduct: (product: Product | null) => void;

  // Delivery & Persona / Auth
  deliveryZip: string;
  setDeliveryZip: (zip: string) => void;
  isDeliveryModalOpen: boolean;
  setIsDeliveryModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  persona: UserPersona;
  togglePersona: () => void;
  loginCustomUser: (name: string, email: string, isPrime: boolean) => void;
  logoutUser: () => void;

  // Orders
  orders: Order[];
  placeOrder: (address: ShippingAddress, speed: DeliverySpeed) => Order;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_PERSONAS: Record<'prime' | 'guest', UserPersona> = {
  prime: {
    id: 'user-prime',
    name: 'Sarah Connor',
    isPrime: true,
    email: 'sarah.connor@sky.net',
    defaultZip: '98101',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  guest: {
    id: 'user-guest',
    name: 'Guest Shopper',
    isPrime: false,
    email: 'guest@shopper.local',
    defaultZip: '90210',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
  }
};

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  isPrimeOnly: false,
  minRating: 0,
  minPrice: 0,
  maxPrice: 3000,
  inStockOnly: false,
  brand: 'all',
  sortBy: 'featured'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'pdp' | 'cart' | 'orders'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [quickPeekProduct, setQuickPeekProduct] = useState<Product | null>(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [deliveryZip, setDeliveryZip] = useState('98101');
  const [persona, setPersona] = useState<UserPersona>(DEFAULT_PERSONAS.prime);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Sync products and orders from Supabase cloud database & Real Product API
  useEffect(() => {
    supabaseService.getProducts().then((remote) => {
      if (remote && remote.length > 0) {
        setProducts(remote);
      }
    });

    // Auto-enrich catalog with real commercial items (MacBook, iPhone, Audio, etc.)
    amazonApiService.searchRealProducts('macbook iphone watch fragrance').then((real) => {
      if (real && real.length > 0) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = real.filter(p => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });
      }
    });

    supabaseService.getOrders().then((remoteOrders) => {
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(prev => {
          const merged = [...remoteOrders];
          prev.forEach(p => {
            if (!merged.some(m => m.id === p.id)) merged.push(p);
          });
          return merged;
        });
      }
    });
  }, []);

  // Theme & Sound state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('amazon_elevated_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('amazon_elevated_sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('amazon_elevated_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('amazon_elevated_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(`Switched to ${next === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
      return next;
    });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      showToast(`Audio feedback: ${next ? 'Enabled 🔊' : 'Muted 🔇'}`);
      return next;
    });
  };

  // LocalStorage-backed state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_reimagined_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_reimagined_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [comparedProducts, setComparedProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_reimagined_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_reimagined_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('amazon_reimagined_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amazon_reimagined_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('amazon_reimagined_compare', JSON.stringify(comparedProducts));
  }, [comparedProducts]);

  useEffect(() => {
    localStorage.setItem('amazon_reimagined_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const togglePersona = () => {
    setPersona(prev => {
      const next = prev.id === 'user-prime' ? DEFAULT_PERSONAS.guest : DEFAULT_PERSONAS.prime;
      showToast(`Switched persona to: ${next.name} (${next.isPrime ? 'Prime' : 'Non-Prime'})`);
      return next;
    });
  };

  const loginCustomUser = (name: string, email: string, isPrime: boolean) => {
    const newUser: UserPersona = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Amazon Shopper',
      email: email.trim() || 'shopper@amazon.com',
      isPrime,
      defaultZip: deliveryZip || '98101',
      avatarUrl: isPrime
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    };
    setPersona(newUser);
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${newUser.name} (${isPrime ? 'Prime Member' : 'Standard Member'})`);
  };

  const logoutUser = () => {
    setPersona(DEFAULT_PERSONAS.guest);
    showToast('Signed out of Amazon account');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    if (soundEnabled) {
      playAudioFeedback('cart');
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(newQty, product.stockCount)
        };
        return next;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity }];
      }
    });

    setIsCartDrawerOpen(true);
    showToast(`Added "${product.title.slice(0, 32)}..." to Cart!`);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedVariant?.id === variantId)
    ));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedVariant?.id === variantId) {
        return { ...item, quantity: Math.min(quantity, item.product.stockCount) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const variantModifier = item.selectedVariant ? item.selectedVariant.priceModifier : 0;
      return total + (item.product.price + variantModifier) * item.quantity;
    }, 0);
  }, [cart]);

  const freeShippingGap = useMemo(() => {
    if (persona.isPrime) return 0;
    const threshold = 35;
    return Math.max(0, threshold - cartSubtotal);
  }, [persona.isPrime, cartSubtotal]);

  // Promo code
  const applyPromoCode = (code: string): boolean => {
    const result = promoService.validatePromo(code, cartSubtotal, persona.isPrime);
    if (result.valid) {
      setPromoCode(code.trim().toUpperCase());
      setDiscountPercent(result.discountPercent);
      showToast(`Promo "${code.trim().toUpperCase()}" applied: ${result.promo?.description || `${result.discountPercent}% off`}`);
      return true;
    } else {
      showToast(result.error || 'Invalid promo code. Try "ELEVATE10", "PRIME20", or "WELCOME50"');
      return false;
    }
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Amazon Wishlist');
        return [...prev, productId];
      }
    });
  };

  // Compare Dock
  const addToCompare = (product: Product): boolean => {
    if (comparedProducts.some(p => p.id === product.id)) {
      showToast('Item already in Comparison Dock');
      return true;
    }
    if (comparedProducts.length >= 4) {
      showToast('Comparison Dock full (Maximum 4 items)');
      return false;
    }
    setComparedProducts(prev => [...prev, product]);
    showToast(`Added "${product.title.slice(0, 24)}..." to Compare (${comparedProducts.length + 1}/4)`);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => setComparedProducts([]);

  // Orders & Checkout
  const placeOrder = (address: ShippingAddress, speed: DeliverySpeed): Order => {
    if (soundEnabled) {
      playAudioFeedback('order');
    }

    const discountAmount = (cartSubtotal * discountPercent) / 100;
    const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);
    
    // Real-time location-based municipal and state sales tax
    const { amount: tax } = taxService.computeTaxAmount(discountedSubtotal, address.zipCode || deliveryZip);

    let shipping = 0;
    if (speed === 'prime_two_day') {
      shipping = persona.isPrime ? 0.00 : 7.99;
    } else if (speed === 'next_day') {
      shipping = persona.isPrime ? 4.99 : 9.99;
    } else {
      shipping = (discountedSubtotal >= 25 || persona.isPrime) ? 0.00 : 5.99;
    }

    const total = discountedSubtotal + tax + shipping;

    // Realistic Amazon Order ID format: 114-8392019-4820194
    const r1 = Math.floor(100 + Math.random() * 900);
    const r2 = Math.floor(1000000 + Math.random() * 9000000);
    const r3 = Math.floor(1000000 + Math.random() * 9000000);
    const orderId = `${r1}-${r2}-${r3}`;

    const deliveryDaysMap: Record<DeliverySpeed, number> = {
      prime_two_day: 1,
      next_day: 1,
      standard: 3
    };

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDaysMap[speed]);
    const estDateStr = estDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax,
      shipping,
      total,
      shippingAddress: address,
      deliverySpeed: speed,
      estimatedDeliveryDate: estDateStr,
      status: 'ordered',
      trackingNumber: `TBA${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      promoCodeApplied: promoCode || undefined
    };

    // Update live product inventory in real time
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        const newStock = Math.max(0, p.stockCount - cartItem.quantity);
        return { ...p, stockCount: newStock, inStock: newStock > 0 };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${orderId} successfully placed!`);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder && targetOrder.status !== 'cancelled') {
      // Replenish product inventory in real time
      setProducts(prev => prev.map(p => {
        const orderItem = targetOrder.items.find(oi => oi.product.id === p.id);
        if (orderItem) {
          const newStock = p.stockCount + orderItem.quantity;
          return { ...p, stockCount: newStock, inStock: true };
        }
        return p;
      }));
    }

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'cancelled' };
      }
      return order;
    }));
    showToast(`Order #${orderId} has been cancelled.`);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status };
      }
      return order;
    }));
    showToast(`Order #${orderId} status updated to: ${status.replace(/_/g, ' ').toUpperCase()}`);
  };

  const searchOnlineProducts = async (query: string): Promise<Product[]> => {
    if (!query.trim()) return [];
    setIsSearchingAI(true);
    showToast(`🔍 Searching live Amazon & retail product database for "${query}"...`);
    try {
      // 1. Search real commercial products from Amazon API
      const realItems = await amazonApiService.searchRealProducts(query);
      if (realItems && realItems.length > 0) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = realItems.filter(p => !existingIds.has(p.id));
          return [...newUnique, ...prev];
        });
        showToast(`✨ Found ${realItems.length} real commercial products matching "${query}"!`);
        return realItems;
      }

      // 2. Fallback to Gemini AI generation if no real retail matches found
      const generated = await geminiService.generateProductsForQuery(query);
      if (generated && generated.length > 0) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = generated.filter(p => !existingIds.has(p.id));
          return [...newUnique, ...prev];
        });
        showToast(`✨ Found ${generated.length} catalog products matching "${query}"!`);
        return generated;
      } else {
        showToast(`No catalog matches found for "${query}".`);
        return [];
      }
    } catch (err) {
      console.warn('Live catalog search error:', err);
      showToast('Error querying live catalog. Please try again.');
      return [];
    } finally {
      setIsSearchingAI(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('Filters cleared');
  };

  // Sub-second indexing and client-side filtering
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query match across title, brand, description, and specs
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesVerdict = product.aiReviewDigest.verdict.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesVerdict) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Prime only
      if (filters.isPrimeOnly && !product.isPrime) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Price range
      if (product.price > filters.maxPrice) {
        return false;
      }

      // In stock only
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Brand
      if (filters.brand !== 'all' && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return b.reviewCount - a.reviewCount;
      return 0; // featured default
    });
  }, [filters, products]);

  return (
    <AppContext.Provider value={{
      products,
      activeView,
      setActiveView,
      selectedProduct,
      setSelectedProduct,
      navigateToProduct,
      searchOnlineProducts,
      isSearchingAI,
      theme,
      toggleTheme,
      soundEnabled,
      toggleSound,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      freeShippingGap,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      promoCode,
      discountPercent,
      applyPromoCode,
      wishlist,
      toggleWishlist,
      comparedProducts,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isCompareModalOpen,
      setIsCompareModalOpen,
      quickPeekProduct,
      setQuickPeekProduct,
      deliveryZip,
      setDeliveryZip,
      isDeliveryModalOpen,
      setIsDeliveryModalOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      persona,
      togglePersona,
      loginCustomUser,
      logoutUser,
      orders,
      placeOrder,
      cancelOrder,
      updateOrderStatus,
      filters,
      setFilters,
      resetFilters,
      filteredProducts,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

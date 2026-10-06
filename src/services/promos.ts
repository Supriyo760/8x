export interface PromoCodeDefinition {
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number; // e.g., 20 for 20% or 50 for $50 off
  description: string;
  minSubtotal?: number;
  requiresPrime?: boolean;
  expiresAt?: string;
  isActive: boolean;
}

const DEFAULT_PROMO_CODES: PromoCodeDefinition[] = [
  {
    code: 'ELEVATE10',
    type: 'percentage',
    value: 10,
    description: '10% off entire order for all customers',
    isActive: true
  },
  {
    code: 'PRIME20',
    type: 'percentage',
    value: 20,
    description: '20% off for verified Amazon Prime members',
    requiresPrime: true,
    isActive: true
  },
  {
    code: 'WELCOME50',
    type: 'fixed_amount',
    value: 50,
    minSubtotal: 250,
    description: '$50 off orders of $250 or more',
    isActive: true
  },
  {
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 100,
    description: 'Free Express/Next-Day delivery on any order',
    isActive: true
  },
  {
    code: 'TURBO15',
    type: 'percentage',
    value: 15,
    description: '15% instant discount across all categories',
    isActive: true
  }
];

export const promoService = {
  getStoredPromos(): PromoCodeDefinition[] {
    try {
      const saved = localStorage.getItem('amazon_elevated_custom_promos');
      if (saved) {
        const custom: PromoCodeDefinition[] = JSON.parse(saved);
        const map = new Map<string, PromoCodeDefinition>();
        DEFAULT_PROMO_CODES.forEach(p => map.set(p.code.toUpperCase(), p));
        custom.forEach(p => map.set(p.code.toUpperCase(), p));
        return Array.from(map.values());
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROMO_CODES;
  },

  /**
   * Validate a promo code against current cart state & user persona
   */
  validatePromo(code: string, subtotal: number, isPrime: boolean): { 
    valid: boolean; 
    discountAmount: number; 
    discountPercent: number; 
    freeShipping: boolean;
    promo?: PromoCodeDefinition; 
    error?: string;
  } {
    const cleanCode = code.trim().toUpperCase();
    const promos = this.getStoredPromos();
    const promo = promos.find(p => p.code.toUpperCase() === cleanCode && p.isActive);

    if (!promo) {
      return { 
        valid: false, 
        discountAmount: 0, 
        discountPercent: 0, 
        freeShipping: false, 
        error: `Promo code "${cleanCode}" is invalid or expired.` 
      };
    }

    if (promo.requiresPrime && !isPrime) {
      return { 
        valid: false, 
        discountAmount: 0, 
        discountPercent: 0, 
        freeShipping: false, 
        error: `Code "${cleanCode}" requires an active Amazon Prime membership. Switch persona to Prime to redeem.` 
      };
    }

    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      return { 
        valid: false, 
        discountAmount: 0, 
        discountPercent: 0, 
        freeShipping: false, 
        error: `Code "${cleanCode}" requires a minimum cart subtotal of $${promo.minSubtotal.toFixed(2)}.` 
      };
    }

    let discountAmount = 0;
    let discountPercent = 0;
    let freeShipping = false;

    if (promo.type === 'percentage') {
      discountPercent = promo.value;
      discountAmount = Math.round(subtotal * (promo.value / 100) * 100) / 100;
    } else if (promo.type === 'fixed_amount') {
      discountAmount = Math.min(promo.value, subtotal);
      discountPercent = Math.round((discountAmount / subtotal) * 100);
    } else if (promo.type === 'free_shipping') {
      freeShipping = true;
    }

    return {
      valid: true,
      discountAmount,
      discountPercent,
      freeShipping,
      promo
    };
  },

  /**
   * Allow shopper/evaluator to register custom test promo codes dynamically
   */
  createCustomPromo(newPromo: PromoCodeDefinition): boolean {
    try {
      const current = this.getStoredPromos();
      const updated = [newPromo, ...current.filter(p => p.code.toUpperCase() !== newPromo.code.toUpperCase())];
      localStorage.setItem('amazon_elevated_custom_promos', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
};

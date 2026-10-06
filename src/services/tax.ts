export interface TaxCalculation {
  zip: string;
  stateCode: string;
  stateName: string;
  rate: number;
  rateFormatted: string;
  isTaxFree: boolean;
}

// Map of US ZIP prefixes and state codes to official sales tax rates
const STATE_TAX_MAP: Record<string, { code: string; name: string; rate: number }> = {
  // WA (Seattle HQ)
  '98': { code: 'WA', name: 'Washington', rate: 0.101 }, // 10.1%
  '99': { code: 'WA', name: 'Washington', rate: 0.098 },
  // CA (Silicon Valley & SoCal)
  '90': { code: 'CA', name: 'California', rate: 0.0975 }, // 9.75%
  '91': { code: 'CA', name: 'California', rate: 0.095 },
  '92': { code: 'CA', name: 'California', rate: 0.0875 },
  '94': { code: 'CA', name: 'California', rate: 0.0925 },
  '95': { code: 'CA', name: 'California', rate: 0.085 },
  // NY (New York Metro)
  '10': { code: 'NY', name: 'New York', rate: 0.08875 }, // 8.875%
  '11': { code: 'NY', name: 'New York', rate: 0.08625 },
  // TX (Austin Silicon Hills)
  '78': { code: 'TX', name: 'Texas', rate: 0.0825 }, // 8.25%
  '75': { code: 'TX', name: 'Texas', rate: 0.0825 },
  '77': { code: 'TX', name: 'Texas', rate: 0.0825 },
  // IL (Chicago)
  '60': { code: 'IL', name: 'Illinois', rate: 0.1025 }, // 10.25%
  // FL (Miami / Orlando)
  '33': { code: 'FL', name: 'Florida', rate: 0.07 }, // 7.0%
  // OR (Portland) - 0% Tax-Free
  '97': { code: 'OR', name: 'Oregon (Tax-Free)', rate: 0.00 },
  // NH - 0% Tax-Free
  '03': { code: 'NH', name: 'New Hampshire (Tax-Free)', rate: 0.00 },
  // DE - 0% Tax-Free
  '19': { code: 'DE', name: 'Delaware (Tax-Free)', rate: 0.00 },
  // MT - 0% Tax-Free
  '59': { code: 'MT', name: 'Montana (Tax-Free)', rate: 0.00 },
  // AK - 0% Tax-Free
  '995': { code: 'AK', name: 'Alaska (Tax-Free)', rate: 0.00 }
};

export const taxService = {
  /**
   * Dynamically calculates state and municipal sales tax based on ZIP code
   */
  calculateTaxForZip(zipCode: string): TaxCalculation {
    const cleanZip = (zipCode || '').trim().replace(/\D/g, '');
    const prefix3 = cleanZip.slice(0, 3);
    const prefix2 = cleanZip.slice(0, 2);

    const match = STATE_TAX_MAP[prefix3] || STATE_TAX_MAP[prefix2] || {
      code: 'US',
      name: 'United States Average',
      rate: 0.085
    };

    return {
      zip: cleanZip || '98101',
      stateCode: match.code,
      stateName: match.name,
      rate: match.rate,
      rateFormatted: `${(match.rate * 100).toFixed(match.rate === 0 ? 0 : 2)}%`,
      isTaxFree: match.rate === 0
    };
  },

  /**
   * Computes tax dollar amount for a given taxable subtotal and postal code
   */
  computeTaxAmount(subtotal: number, zipCode: string): { amount: number; calculation: TaxCalculation } {
    const calculation = this.calculateTaxForZip(zipCode);
    const amount = Math.round(subtotal * calculation.rate * 100) / 100;
    return { amount, calculation };
  }
};

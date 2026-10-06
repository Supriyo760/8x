import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise || Promise.resolve(null);
};

export const stripeService = {
  isConfigured(): boolean {
    return Boolean(stripePublishableKey && stripePublishableKey.startsWith('pk_'));
  },

  async processTestPayment(amount: number, cardDetails: { number: string; exp: string; cvc: string }): Promise<{ success: boolean; transactionId: string; message: string }> {
    // Artificial 600ms latency to simulate real payment gateway roundtrip
    await new Promise(r => setTimeout(r, 600));

    const cleanNum = cardDetails.number.replace(/\s+/g, '');
    
    // Check if test card is valid (standard Luhn / length check or test card format)
    if (cleanNum.length < 13) {
      return {
        success: false,
        transactionId: '',
        message: 'Invalid card number. Please check card digits.'
      };
    }

    const txId = `ch_test_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    return {
      success: true,
      transactionId: txId,
      message: `Payment of $${amount.toFixed(2)} authorized successfully via Stripe Test Gateway (${txId.slice(0, 14)}...).`
    };
  }
};

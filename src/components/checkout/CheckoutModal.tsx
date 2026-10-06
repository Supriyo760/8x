import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductVariant, ShippingAddress, DeliverySpeed, CartItem } from '../../types';
import { stripeService } from '../../services/stripe';
import { supabaseService } from '../../services/supabase';
import { taxService } from '../../services/tax';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Lock, 
  MapPin, 
  Clock, 
  ArrowRight,
  Package,
  ShieldCheck
} from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
  directProduct?: {
    product: Product;
    variant?: ProductVariant;
    quantity: number;
  };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, directProduct }) => {
  const { 
    cart, 
    cartSubtotal, 
    discountPercent, 
    promoCode, 
    deliveryZip, 
    persona, 
    placeOrder, 
    setActiveView 
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeTxId, setStripeTxId] = useState<string | null>(null);

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: persona.name,
    street: '1200 6th Ave, Apt 14B',
    city: 'Seattle',
    state: 'WA',
    zipCode: deliveryZip,
    country: 'United States'
  });

  // Delivery Speed State
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>(
    persona.isPrime ? 'prime_two_day' : 'standard'
  );

  // Payment State
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');

  // Determine items to purchase
  const itemsToCheckout: CartItem[] = directProduct 
    ? [{ product: directProduct.product, selectedVariant: directProduct.variant, quantity: directProduct.quantity }]
    : cart;

  const rawSubtotal = directProduct
    ? (directProduct.product.price + (directProduct.variant?.priceModifier || 0)) * directProduct.quantity
    : cartSubtotal;

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const taxableSubtotal = Math.max(0, rawSubtotal - discountAmount);
  
  // Real-time location-based tax calculation
  const { amount: estimatedTax, calculation: taxCalc } = taxService.computeTaxAmount(taxableSubtotal, address.zipCode || deliveryZip);

  let shippingCost = 0;
  if (deliverySpeed === 'next_day') {
    shippingCost = persona.isPrime ? 4.99 : 9.99;
  } else if (deliverySpeed === 'standard') {
    shippingCost = taxableSubtotal >= 25 ? 0 : 5.99;
  } else {
    // prime_two_day
    shippingCost = persona.isPrime ? 0 : 7.99;
  }

  const grandTotal = taxableSubtotal + estimatedTax + shippingCost;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // 1. Process payment via Stripe Test Gateway
    const paymentResult = await stripeService.processTestPayment(grandTotal, {
      number: cardNumber,
      exp: expiry,
      cvc: '123'
    });

    // 2. Generate and place local order
    const order = placeOrder(address, deliverySpeed);

    // 3. Persist order to Supabase cloud database
    await supabaseService.saveOrder(order);

    setStripeTxId(paymentResult.transactionId);
    setConfirmedOrder(order);
    setIsProcessing(false);
  };

  const handleGoToTracking = () => {
    onClose();
    setActiveView('orders');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '780px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* If Order is Confirmed */}
        {confirmedOrder ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: '#dcfce7', 
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f1111', marginBottom: '0.5rem' }}>
              Order placed, thank you!
            </h2>

            <p style={{ color: '#565959', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Confirmation sent to <strong>{persona.email}</strong>
            </p>

            <div 
              style={{ 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '1.25rem',
                maxWidth: '520px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#565959' }}>Order #:</span>
                <strong style={{ color: '#0f1111' }}>{confirmedOrder.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#565959' }}>Tracking #:</span>
                <strong style={{ color: '#007185' }}>{confirmedOrder.trackingNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#565959' }}>Estimated Delivery:</span>
                <strong style={{ color: '#16a34a' }}>{confirmedOrder.estimatedDeliveryDate}</strong>
              </div>

              {stripeTxId && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem', background: '#f0fdf4', padding: '4px 8px', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#166534', fontWeight: 700 }}>
                    <ShieldCheck size={14} />
                    <span>Stripe Authorized:</span>
                  </span>
                  <code style={{ fontSize: '0.75rem', color: '#166534' }}>{stripeTxId.slice(0, 20)}...</code>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem', background: '#f0f9ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid #bae6fd' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0369a1', fontWeight: 700 }}>
                  <ShieldCheck size={14} />
                  <span>Cloud Database:</span>
                </span>
                <span style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 600 }}>Synced to Supabase</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontWeight: 800 }}>Total Charged:</span>
                <strong style={{ color: 'var(--amazon-red-urgent)' }}>${confirmedOrder.total.toFixed(2)}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={handleGoToTracking}
                className="btn-add-cart btn-press"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
              >
                <Package size={18} />
                <span>Track Package in Real-Time</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={20} color="#16a34a" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Encrypted Checkout</h2>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', color: '#565959', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: step === 1 ? '2px solid var(--amazon-amber)' : '1px solid #d5d9d9',
                  backgroundColor: step === 1 ? '#fff7ed' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#0f1111',
                  cursor: 'pointer'
                }}
              >
                1. Delivery & Address
              </button>
              <button
                onClick={() => setStep(2)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: step === 2 ? '2px solid var(--amazon-amber)' : '1px solid #d5d9d9',
                  backgroundColor: step === 2 ? '#fff7ed' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#0f1111',
                  cursor: 'pointer'
                }}
              >
                2. Payment & Review
              </button>
            </div>

            {/* Step 1: Address & Delivery Speed */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Shipping Address
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '2px' }}>Full Name</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress(prev => ({ ...prev, fullName: e.target.value }))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d5d9d9', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '2px' }}>Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d5d9d9', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '2px' }}>City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d5d9d9', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '2px' }}>ZIP Code</label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d5d9d9', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Choose your delivery speed:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: deliverySpeed === 'prime_two_day' ? '2px solid #007185' : '1px solid #e5e7eb',
                      backgroundColor: deliverySpeed === 'prime_two_day' ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === 'prime_two_day'}
                        onChange={() => setDeliverySpeed('prime_two_day')}
                        style={{ accentColor: '#007185' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Prime Two-Day Shipping</div>
                        <div style={{ fontSize: '0.78rem', color: '#565959' }}>Guaranteed 2-day delivery</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: persona.isPrime ? '#16a34a' : '#0f1111' }}>
                      {persona.isPrime ? 'FREE' : '$7.99'}
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: deliverySpeed === 'next_day' ? '2px solid #007185' : '1px solid #e5e7eb',
                      backgroundColor: deliverySpeed === 'next_day' ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === 'next_day'}
                        onChange={() => setDeliverySpeed('next_day')}
                        style={{ accentColor: '#007185' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Next-Day Morning Delivery</div>
                        <div style={{ fontSize: '0.78rem', color: '#565959' }}>Delivered tomorrow by 10 AM</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: '#0f1111' }}>
                      {persona.isPrime ? '$4.99' : '$9.99'}
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: deliverySpeed === 'standard' ? '2px solid #007185' : '1px solid #e5e7eb',
                      backgroundColor: deliverySpeed === 'standard' ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === 'standard'}
                        onChange={() => setDeliverySpeed('standard')}
                        style={{ accentColor: '#007185' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Standard Shipping</div>
                        <div style={{ fontSize: '0.78rem', color: '#565959' }}>3 - 5 business days</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: taxableSubtotal >= 25 ? '#16a34a' : '#0f1111' }}>
                      {taxableSubtotal >= 25 ? 'FREE' : '$5.99'}
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-add-cart"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                >
                  <span>Continue to Payment & Review</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Payment Method & Final Place Order */}
            {step === 2 && (
              <div>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <CreditCard size={18} color="#007185" />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Payment Method: Amazon Prime Rewards Card</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#565959' }}>Card number:</span>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{cardNumber}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#565959' }}>Exp:</span>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{expiry}</div>
                    </div>
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#565959' }}>Items subtotal:</span>
                    <span>${rawSubtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, marginBottom: '4px' }}>
                      <span>Promotion discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#565959' }}>Shipping & handling:</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span style={{ color: '#565959' }}>
                      Estimated tax ({taxCalc.stateCode} {taxCalc.rateFormatted}):
                    </span>
                    <span style={{ fontWeight: taxCalc.isTaxFree ? 700 : 400, color: taxCalc.isTaxFree ? '#16a34a' : 'inherit' }}>
                      {taxCalc.isTaxFree ? '$0.00 (Tax Free)' : `$${estimatedTax.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, borderTop: '1px solid #e5e7eb', paddingTop: '6px' }}>
                    <span>Order Total:</span>
                    <span style={{ color: 'var(--amazon-red-urgent)' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="btn-buy-now"
                    style={{ flex: 1, padding: '0.75rem', fontSize: '1rem' }}
                  >
                    <span>Place Your Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

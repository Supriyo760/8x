import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Tag, 
  Check, 
  ShieldCheck, 
  ShoppingCart, 
  ArrowRight 
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    promoCode, 
    discountPercent, 
    applyPromoCode, 
    persona, 
    setActiveView 
  } = useApp();

  const [inputCode, setInputCode] = useState(promoCode);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const taxableSubtotal = cartSubtotal - discountAmount;
  const estimatedTax = taxableSubtotal * 0.085;
  const shippingFee = (persona.isPrime || taxableSubtotal >= 25 || cart.length === 0) ? 0 : 5.99;
  const grandTotal = taxableSubtotal + estimatedTax + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode.trim());
    if (success) {
      setPromoMessage({ text: 'Promo code applied! 10% discount added.', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "PRIME10"', isError: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="app-container" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            padding: '3rem 2rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            border: '1px solid var(--amazon-border)'
          }}
        >
          <ShoppingCart size={54} color="#94a3b8" style={{ margin: '0 auto 1.25rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f1111' }}>
            Your Amazon Cart is empty
          </h2>
          <p style={{ color: '#565959', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Check out today's top lightning deals, compare audio flagships, or browse best sellers.
          </p>
          <button
            onClick={() => setActiveView('home')}
            className="btn-add-cart"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Start Shopping Deals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <button
        onClick={() => setActiveView('catalog')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--amazon-link)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '1.25rem'
        }}
      >
        <ArrowLeft size={16} />
        <span>Continue shopping</span>
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Left Cart Items List */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '10px', 
            padding: '1.5rem',
            border: '1px solid var(--amazon-border)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Shopping Cart</h1>
            <span style={{ fontSize: '0.9rem', color: '#565959' }}>Price</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map((item, idx) => {
              const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
              return (
                <div 
                  key={`${item.product.id}-${item.selectedVariant?.id || 'base'}-${idx}`}
                  style={{ 
                    display: 'flex', 
                    gap: '1.25rem', 
                    paddingBottom: '1.5rem', 
                    borderBottom: idx !== cart.length - 1 ? '1px solid #f1f5f9' : 'none' 
                  }}
                >
                  <div 
                    style={{ 
                      width: '110px', 
                      height: '110px', 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      flexShrink: 0,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <img src={item.product.images[0]} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f1111', lineHeight: 1.3 }}>
                          {item.product.title}
                        </h3>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f1111', marginLeft: '1rem' }}>
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {item.selectedVariant && (
                        <div style={{ fontSize: '0.8rem', color: '#565959', marginTop: '2px' }}>
                          Selection: <strong>{item.selectedVariant.label}</strong>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--amazon-green-stock)', fontWeight: 600 }}>In Stock</span>
                        {item.product.isPrime && <span className="badge-prime">Prime</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d5d9d9', borderRadius: '6px' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                          style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ padding: '0 10px', fontSize: '0.85rem', fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                          style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--amazon-link)',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Order Summary & Promo Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div 
            style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '10px', 
              padding: '1.5rem',
              border: '1px solid var(--amazon-border)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#565959' }}>Items ({cart.reduce((s, i) => s + i.quantity, 0)}):</span>
                <span style={{ fontWeight: 600 }}>${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 600 }}>
                  <span>Promotion Savings ({discountPercent}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#565959' }}>Shipping & handling:</span>
                <span style={{ fontWeight: 600, color: shippingFee === 0 ? '#16a34a' : '#0f1111' }}>
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#565959' }}>Estimated tax to collect:</span>
                <span style={{ fontWeight: 600 }}>${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f1111' }}>Order Total:</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amazon-red-urgent)' }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Gift Card or Promo Code (Try: <code>PRIME10</code>)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. PRIME10"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d5d9d9',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <div 
                  style={{ 
                    fontSize: '0.78rem', 
                    marginTop: '0.4rem', 
                    color: promoMessage.isError ? '#cc0c39' : '#16a34a',
                    fontWeight: 600 
                  }}
                >
                  {promoMessage.text}
                </div>
              )}
            </form>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-add-cart"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Guarantee info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#565959', fontSize: '0.8rem', justifyContent: 'center' }}>
            <ShieldCheck size={18} color="#007185" />
            <span>A-to-z Safe Purchase & 30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      )}
    </div>
  );
};

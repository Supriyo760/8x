import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    freeShippingGap,
    persona,
    discountPercent,
    setActiveView
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartDrawerOpen) return null;

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const effectiveSubtotal = cartSubtotal - discountAmount;

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartDrawerOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        {/* Drawer Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.25rem',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={20} color="#0f1111" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Your Shopping Cart</h3>
            <span style={{ fontSize: '0.85rem', color: '#565959' }}>({cart.length} items)</span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#565959',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ padding: '0.75rem 1.25rem', backgroundColor: '#f0fdf4', borderBottom: '1px solid #dcfce7' }}>
          {persona.isPrime ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>Prime Member: You get FREE Two-Day Delivery on all items!</span>
            </div>
          ) : freeShippingGap === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>Your order qualifies for FREE Standard Shipping!</span>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.8rem', color: '#1f2937', marginBottom: '4px' }}>
                Add <strong style={{ color: '#b12704' }}>${freeShippingGap.toFixed(2)}</strong> more for <strong>FREE shipping</strong>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${Math.min(100, ((25 - freeShippingGap) / 25) * 100)}%`, 
                    height: '100%', 
                    backgroundColor: '#16a34a',
                    transition: 'width 0.3s ease'
                  }} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#565959' }}>
              <ShoppingCart size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1rem', color: '#0f1111', marginBottom: '0.5rem' }}>Your Cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Explore today's curated deals and add items to your cart.</p>
            </div>
          ) : (
            cart.map((item, idx) => {
              const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
              return (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.id || 'base'}-${idx}`}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                >
                  <div 
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '6px', 
                      overflow: 'hidden', 
                      flexShrink: 0,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <img src={item.product.images[0]} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 
                        style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 600, 
                          color: '#0f1111', 
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.product.title}
                      </h4>
                      {item.selectedVariant && (
                        <span style={{ fontSize: '0.75rem', color: '#565959' }}>
                          Option: {item.selectedVariant.label}
                        </span>
                      )}
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f1111', marginTop: '2px' }}>
                        ${itemPrice.toFixed(2)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d5d9d9', borderRadius: '4px' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                          style={{ padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                          style={{ padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & Checkout Button */}
        {cart.length > 0 && (
          <div 
            style={{ 
              padding: '1.25rem', 
              borderTop: '1px solid #e5e7eb', 
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.9rem', color: '#565959' }}>
                Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):
              </span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f1111' }}>
                ${effectiveSubtotal.toFixed(2)}
              </span>
            </div>

            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                <span>Promo Discount ({discountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-add-cart"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setActiveView('cart');
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
            >
              View Full Cart & Apply Coupons
            </button>
          </div>
        )}
      </div>

      {isCheckoutOpen && (
        <CheckoutModal 
          onClose={() => {
            setIsCheckoutOpen(false);
            setIsCartDrawerOpen(false);
          }} 
        />
      )}
    </div>
  );
};

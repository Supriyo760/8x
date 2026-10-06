import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ShoppingCart, 
  Zap, 
  Lock
} from 'lucide-react';

interface BuyBoxProps {
  product: Product;
  selectedVariant?: ProductVariant;
  onBuyNowClick: () => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({ product, selectedVariant, onBuyNowClick }) => {
  const { addToCart, deliveryZip, setIsDeliveryModalOpen, persona } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [cutoffTime, setCutoffTime] = useState({ hours: 1, minutes: 42, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCutoffTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const effectivePrice = product.price + (selectedVariant?.priceModifier || 0);

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + (persona.isPrime ? 1 : product.deliveryDays));
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const priceParts = effectivePrice.toFixed(2).split('.');

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--amazon-border-dark)',
        borderRadius: '12px',
        padding: '1.4rem',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'sticky',
        top: '84px'
      }}
    >
      {/* Price Display */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', color: '#0f1111', lineHeight: 1 }}>
            <span style={{ fontSize: '1rem', fontWeight: 600, marginTop: '3px' }}>$</span>
            <span style={{ fontSize: '2rem', fontWeight: 900 }}>{priceParts[0]}</span>
            <span style={{ fontSize: '1rem', fontWeight: 600, marginTop: '3px' }}>{priceParts[1]}</span>
          </div>

          {product.originalPrice && (
            <span style={{ fontSize: '0.92rem', color: '#64748b', textDecoration: 'line-through' }}>
              ${(product.originalPrice + (selectedVariant?.priceModifier || 0)).toFixed(2)}
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
          No import fees deposit & FREE Shipping to United States
        </div>
      </div>

      {/* Prime Delivery & Speed Guarantee */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
          border: '1px solid #bae6fd', 
          borderRadius: '8px', 
          padding: '0.85rem',
          fontSize: '0.84rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span className="badge-prime" style={{ fontSize: '0.75rem' }}>Prime One-Day</span>
          <span style={{ color: '#0369a1', fontWeight: 800 }}>FREE Delivery</span>
        </div>
        <div style={{ fontWeight: 600, color: '#0f1111', marginBottom: '4px' }}>
          Get it by <strong>{getDeliveryDate()}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--amazon-red-urgent)', fontSize: '0.76rem', fontWeight: 700 }}>
          <Clock size={13} />
          <span>Order within {cutoffTime.hours}h {cutoffTime.minutes}m {cutoffTime.seconds}s</span>
        </div>
      </div>

      {/* Deliver To Postal Code */}
      <div 
        onClick={() => setIsDeliveryModalOpen(true)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          cursor: 'pointer',
          fontSize: '0.82rem',
          color: 'var(--amazon-link)'
        }}
      >
        <MapPin size={16} color="#007185" />
        <span>Deliver to {persona.name.split(' ')[0]} - {deliveryZip}</span>
      </div>

      {/* Stock Status Indicator */}
      <div>
        {product.inStock ? (
          <div>
            <span style={{ color: 'var(--amazon-green-stock)', fontWeight: 800, fontSize: '1.05rem' }}>
              In Stock
            </span>
            {product.stockCount < 10 && (
              <span style={{ display: 'block', color: 'var(--amazon-red-urgent)', fontSize: '0.8rem', fontWeight: 700, marginTop: '2px' }}>
                Only {product.stockCount} left in stock - order soon.
              </span>
            )}
          </div>
        ) : (
          <span style={{ color: 'var(--amazon-red-urgent)', fontWeight: 800, fontSize: '1.05rem' }}>
            Currently unavailable
          </span>
        )}
      </div>

      {/* Quantity Dropdown */}
      {product.inStock && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      {product.inStock ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={handleAddToCart}
            className="btn-add-cart"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem' }}
          >
            <ShoppingCart size={17} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={onBuyNowClick}
            className="btn-buy-now"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem' }}
          >
            <Zap size={17} />
            <span>Buy Now</span>
          </button>
        </div>
      ) : (
        <button
          disabled
          style={{
            backgroundColor: '#e2e8f0',
            color: '#94a3b8',
            padding: '0.8rem',
            borderRadius: '9999px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'not-allowed'
          }}
        >
          Out of Stock
        </button>
      )}

      {/* Logistics & Security Guarantees */}
      <div 
        style={{ 
          fontSize: '0.78rem', 
          color: '#64748b', 
          borderTop: '1px solid #f1f5f9', 
          paddingTop: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ships from</span>
          <strong style={{ color: '#0f1111' }}>Amazon.com</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Sold by</span>
          <strong style={{ color: '#0f1111' }}>{product.brand} Official</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Returns</span>
          <strong style={{ color: 'var(--amazon-link)' }}>30-day refund guarantee</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px', color: '#16a34a', fontWeight: 700 }}>
          <Lock size={13} />
          <span>Secure 256-bit encrypted checkout</span>
        </div>
      </div>
    </div>
  );
};

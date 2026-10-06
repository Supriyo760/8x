import React from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { 
  X, 
  ShoppingCart, 
  Sparkles, 
  ExternalLink, 
  Truck, 
  Check,
  ShieldCheck
} from 'lucide-react';

export const QuickPeekDrawer: React.FC = () => {
  const { quickPeekProduct, setQuickPeekProduct, addToCart, navigateToProduct } = useApp();

  if (!quickPeekProduct) return null;

  const product = quickPeekProduct;

  const handleOpenFull = () => {
    setQuickPeekProduct(null);
    navigateToProduct(product);
  };

  const priceParts = product.price.toFixed(2).split('.');

  return (
    <div className="drawer-backdrop" onClick={() => setQuickPeekProduct(null)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ overflowY: 'auto' }}>
        {/* Header Bar */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            backgroundColor: '#ffffff',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--amazon-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Quick Peek
            </span>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>Zero-Friction Preview</span>
          </div>
          <button
            onClick={() => setQuickPeekProduct(null)}
            style={{
              background: '#f1f5f9',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Main Hero Image */}
          <div 
            style={{ 
              aspectRatio: '1/1', 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <img 
              src={product.images[0]} 
              alt={product.title} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          {/* Title & Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#007185', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {product.brand}
              </span>
              {product.isPrime && <span className="badge-prime">Prime One-Day</span>}
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f1111', lineHeight: 1.35, marginBottom: '6px' }}>
              {product.title}
            </h2>
            <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
          </div>

          {/* Pricing & Delivery Guarantee */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'flex-start', color: '#0f1111', lineHeight: 1 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>$</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900 }}>{priceParts[0]}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>{priceParts[1]}</span>
              </div>
              {product.originalPrice && (
                <span style={{ fontSize: '0.88rem', color: '#64748b', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--amazon-green-stock)', fontWeight: 700 }}>
              <Truck size={15} />
              <span>In Stock • FREE Prime Two-Day Shipping</span>
            </div>
          </div>

          {/* AI Review Digest Summary */}
          <div style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #faf5ff 100%)', border: '1px solid #d8b4fe', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={15} color="#9333ea" />
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                The Verdict (AI Synthesis)
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#3b0764', lineHeight: 1.45, marginBottom: '8px' }}>
              {product.aiReviewDigest.verdict}
            </p>
            <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700 }}>
              Best Suited For: {product.aiReviewDigest.bestFor}
            </div>
          </div>

          {/* Features Preview */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.6rem', color: '#0f1111' }}>
              Key Highlights
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {product.features.slice(0, 3).map((feat, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem', 
            borderTop: '1px solid #e2e8f0', 
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            backgroundColor: '#ffffff'
          }}
        >
          <button
            onClick={() => addToCart(product)}
            className="btn-add-cart"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem' }}
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleOpenFull}
            className="btn-secondary"
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.88rem' }}
          >
            <span>Full Product Page & All Reviews</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { 
  ShoppingCart, 
  Eye, 
  Heart, 
  Layers, 
  Check, 
  Sparkles,
  Truck
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    navigateToProduct, 
    addToCart, 
    setQuickPeekProduct, 
    wishlist, 
    toggleWishlist, 
    comparedProducts, 
    addToCompare, 
    removeFromCompare,
    persona
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparedProducts.some(p => p.id === product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const getEstimatedDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + (persona.isPrime ? Math.max(1, days - 1) : days));
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Price formatting helper
  const priceParts = product.price.toFixed(2).split('.');
  const wholePrice = priceParts[0];
  const decimalPrice = priceParts[1];

  return (
    <div 
      className="product-card"
      style={{
        display: 'flex',
        flexDirection: layout === 'list' ? 'row' : 'column',
        gap: layout === 'list' ? '1.5rem' : '0.75rem',
        alignItems: layout === 'list' ? 'center' : 'stretch'
      }}
    >
      {/* Product Image Box */}
      <div 
        className="card-img-wrap"
        style={{
          width: layout === 'list' ? '220px' : '100%',
          flexShrink: 0,
          cursor: 'pointer'
        }}
        onClick={() => navigateToProduct(product)}
      >
        <img src={product.images[0]} alt={product.title} />

        {/* Floating Quick Action Overlay Buttons */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
              color: isWishlisted ? '#e11d48' : '#64748b',
              transition: 'transform 0.15s ease'
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? '#e11d48' : 'none'} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickPeekProduct(product);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
              color: '#0f1111',
              transition: 'transform 0.15s ease'
            }}
            title="Zero-Friction Quick Peek Drawer"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Badges on Top Left of Image */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 2 }}>
          {product.isBestSeller && (
            <span className="badge-best-seller">#1 Best Seller</span>
          )}
          {product.isAmazonChoice && (
            <span className="badge-choice">
              Amazon's <span>Choice</span>
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Brand Tag & Category */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.brand}
            </span>
            {product.isPrime && <span className="badge-prime">Prime</span>}
          </div>

          {/* Title */}
          <h3
            onClick={() => navigateToProduct(product)}
            style={{
              fontSize: '0.96rem',
              fontWeight: 600,
              color: '#0f1111',
              lineHeight: 1.35,
              cursor: 'pointer',
              marginBottom: '6px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Ratings */}
          <div style={{ marginBottom: '8px' }}>
            <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
          </div>

          {/* Price Block - Authentic Amazon Typography */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'flex-start', color: '#0f1111', lineHeight: 1 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>$</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{wholePrice}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>{decimalPrice}</span>
            </div>

            {product.originalPrice && (
              <>
                <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
                <span className="badge-discount">
                  Save {product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Delivery Promise */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#334155', marginBottom: '10px' }}>
            <Truck size={14} color="#007185" />
            <span>
              Get it <strong style={{ color: '#0f1111' }}>{getEstimatedDate(product.deliveryDays)}</strong>
            </span>
          </div>

          {/* AI Review Digest Teaser Card */}
          <div 
            style={{
              backgroundColor: '#fbf7ff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              padding: '6px 10px',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <Sparkles size={13} color="#9333ea" />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9333ea', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                AI Verdict
              </span>
            </div>
            <p 
              style={{ 
                fontSize: '0.75rem', 
                color: '#4b5563', 
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                margin: 0
              }}
            >
              {product.aiReviewDigest.verdict}
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: 'auto' }}>
          <button
            onClick={() => addToCart(product)}
            className="btn-add-cart"
            style={{ flex: 1, padding: '0.52rem', fontSize: '0.82rem' }}
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleCompareClick}
            style={{
              backgroundColor: isCompared ? '#fff7ed' : '#ffffff',
              border: isCompared ? '1.5px solid #ff9900' : '1px solid #cbd5e1',
              color: isCompared ? '#b45309' : '#334155',
              padding: '0.52rem 0.75rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              fontWeight: 700,
              boxShadow: isCompared ? '0 0 8px rgba(255, 153, 0, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
            title={isCompared ? 'Remove from Compare Dock' : 'Add to Compare Dock'}
          >
            {isCompared ? <Check size={14} color="#ff9900" strokeWidth={3} /> : <Layers size={14} />}
            <span>{isCompared ? 'Compared' : '+ Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

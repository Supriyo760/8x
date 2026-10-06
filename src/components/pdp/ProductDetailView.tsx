import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageGallery } from './ImageGallery';
import { VariantSelector } from './VariantSelector';
import { BuyBox } from './BuyBox';
import { AIReviewDigest } from './AIReviewDigest';
import { SpecificationsTable } from './SpecificationsTable';
import { RatingStars } from '../common/RatingStars';
import { CheckoutModal } from '../checkout/CheckoutModal';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import { 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { 
    setActiveView, 
    setFilters, 
    wishlist, 
    toggleWishlist, 
    showToast,
    products,
    navigateToProduct
  } = useApp();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="app-container" style={{ paddingTop: '1.25rem', paddingBottom: '3.5rem' }}>
      {/* Top Breadcrumb & Navigation */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.82rem',
          color: '#565959'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--amazon-link)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: 0,
              fontWeight: 600
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to results</span>
          </button>
          <span>|</span>
          <span 
            onClick={() => { setFilters(prev => ({ ...prev, category: 'all' })); setActiveView('catalog'); }}
            style={{ cursor: 'pointer', color: 'var(--amazon-link)' }}
          >
            All
          </span>
          <ChevronRight size={12} />
          <span 
            onClick={() => { setFilters(prev => ({ ...prev, category: product.category })); setActiveView('catalog'); }}
            style={{ cursor: 'pointer', color: 'var(--amazon-link)', textTransform: 'capitalize' }}
          >
            {product.category}
          </span>
          <ChevronRight size={12} />
          <span style={{ color: '#0f1111', fontWeight: 600 }}>{product.brand}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleWishlist(product.id)}
            style={{
              background: '#ffffff',
              border: '1px solid #d5d9d9',
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: isWishlisted ? '#e11d48' : '#334155'
            }}
          >
            <Heart size={14} fill={isWishlisted ? '#e11d48' : 'none'} />
            <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              background: '#ffffff',
              border: '1px solid #d5d9d9',
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#334155'
            }}
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column PDP Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Column 1: Image Gallery */}
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
          <ImageGallery images={product.images} title={product.title} />
        </div>

        {/* Column 2: Center Product Details & AI Synthesis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Brand & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#007185', letterSpacing: '0.02em' }}>
              Brand: {product.brand}
            </span>
            {product.isBestSeller && <span className="badge-best-seller">#1 Best Seller</span>}
            {product.isAmazonChoice && (
              <span className="badge-choice">
                Amazon's <span>Choice</span>
              </span>
            )}
            {product.isPrime && <span className="badge-prime">Prime</span>}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.3, color: '#0f1111' }}>
            {product.title}
          </h1>

          {/* Rating Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
            <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
            <span style={{ fontSize: '0.8rem', color: '#565959' }}>| 500+ bought in past month</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.55 }}>
            {product.description}
          </p>

          {/* Variant Selector */}
          <VariantSelector 
            variants={product.variants} 
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />

          {/* Feature Highlights Bullet Points */}
          <div style={{ marginTop: '0.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f1111' }}>
              About this item
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {product.features.map((feat, idx) => (
                <li key={idx} style={{ fontSize: '0.85rem', color: '#1f2937', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.45 }}>
                  <span style={{ color: '#ff9900', fontWeight: 800 }}>•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Review Digest ("The Verdict") */}
          <AIReviewDigest digest={product.aiReviewDigest} productTitle={product.title} product={product} />

          {/* Full Specifications Table */}
          <SpecificationsTable product={product} />
        </div>

        {/* Column 3: Right Buy Box */}
        <div style={{ maxWidth: '340px', width: '100%', margin: '0 auto' }}>
          <BuyBox 
            product={product} 
            selectedVariant={selectedVariant}
            onBuyNowClick={() => setIsCheckoutOpen(true)}
          />
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '3.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#0f1111' }}>
            Compare Similar Items in {product.category}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigateToProduct(rel)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ aspectRatio: '1/1', backgroundColor: '#f8fafc', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={rel.images[0]} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f1111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {rel.title}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f1111' }}>
                  ${rel.price}
                </span>
                <RatingStars rating={rel.rating} count={rel.reviewCount} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Community Reviews & Gemini Consensus Regenerator */}
      <CustomerReviewsSection product={product} />

      {/* Checkout Modal for 1-Click Buy Now */}
      {isCheckoutOpen && (
        <CheckoutModal 
          onClose={() => setIsCheckoutOpen(false)} 
          directProduct={{ product, variant: selectedVariant, quantity: 1 }}
        />
      )}
    </div>
  );
};

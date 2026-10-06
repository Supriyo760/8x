import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { Clock, Eye, ShoppingCart, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

export const DealsSlider: React.FC = () => {
  const { products, navigateToProduct, addToCart, setQuickPeekProduct } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.discountPercentage && p.discountPercentage > 10);

  const formatTimer = () => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
  };

  const getClaimedRate = (product: { stockCount?: number; reviewCount?: number }) => {
    const remaining = product.stockCount ?? 15;
    const initial = 50;
    return Math.min(96, Math.max(48, Math.round(((initial - remaining) / initial) * 100)));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ marginTop: '1rem', marginBottom: '3.5rem' }}>
      <div className="app-container">
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '1.75rem',
            boxShadow: '0 4px 20px -2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)',
            position: 'relative'
          }}
        >
          {/* Header Bar with Countdown & Controls */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '1.5rem',
              gap: '1rem',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '1.1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: '#ef4444', 
                    display: 'inline-block',
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.7)',
                    animation: 'pulseDot 1.5s infinite' 
                  }} 
                />
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f1111', letterSpacing: '-0.025em' }}>
                  Today's Lightning Deals
                </h2>
              </div>
              <span className="badge-discount" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem' }}>
                Prime Exclusive Pricing
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  backgroundColor: '#fef2f2', 
                  color: 'var(--amazon-red-urgent)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  border: '1px solid #fecaca'
                }}
              >
                <Clock size={16} />
                <span>Ends in {formatTimer()}</span>
              </div>

              {/* Slider Left / Right Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleScroll('left')}
                  className="btn-press"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid #d5d9d9',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0f1111'
                  }}
                  title="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => handleScroll('right')}
                  className="btn-press"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid #d5d9d9',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0f1111'
                  }}
                  title="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div 
            ref={trackRef}
            style={{ 
              display: 'flex', 
              gap: '1.25rem', 
              overflowX: 'auto', 
              paddingBottom: '0.5rem',
              scrollBehavior: 'smooth'
            }}
          >
            {dealProducts.map(product => {
              const claimed = getClaimedRate(product);
              return (
                <div
                  key={product.id}
                  style={{
                    minWidth: '240px',
                    maxWidth: '260px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #eef2f6',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                  className="hover-lift"
                >
                  {/* Image & Quick Peek Overlay */}
                  <div 
                    style={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '0.85rem',
                      border: '1px solid #f1f5f9',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickPeekProduct(product);
                      }}
                      className="btn-press"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: '50%',
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        color: '#0f1111'
                      }}
                      title="Zero-friction Quick Peek"
                    >
                      <Eye size={15} />
                    </button>
                  </div>

                  {/* Deal Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span className="badge-discount">
                      {product.discountPercentage}% off
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--amazon-red-urgent)', fontWeight: 800 }}>
                      Limited time deal
                    </span>
                  </div>

                  {/* Price Display */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f1111' }}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h4 
                    onClick={() => navigateToProduct(product)}
                    style={{ 
                      fontSize: '0.86rem', 
                      fontWeight: 600, 
                      color: '#0f1111', 
                      marginBottom: '8px',
                      cursor: 'pointer',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.35
                    }}
                    title={product.title}
                  >
                    {product.title}
                  </h4>

                  <div style={{ marginBottom: '10px' }}>
                    <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
                  </div>

                  {/* Lightning Deal Claim Progress Bar */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#b45309' }}>
                        <Flame size={12} />
                        <span>{claimed}% claimed</span>
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${claimed}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                          borderRadius: '3px',
                          transition: 'width 0.8s ease'
                        }} 
                      />
                    </div>
                  </div>

                  {/* Quick Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-add-cart btn-press"
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.82rem', marginTop: 'auto', borderRadius: '8px' }}
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

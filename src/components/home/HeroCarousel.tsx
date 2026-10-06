import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Star } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  category: 'electronics' | 'computers' | 'audio' | 'gaming';
  ctaText: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  highlights: string[];
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'FLAGSHIP COMPUTING & WORKSTATIONS',
    title: 'Apple M3 Max & Snapdragon Elite',
    subtitle: 'Zero sponsored clutter. Verified developer benchmarks synthesized across 10,000+ engineer reviews with real thermal and battery data.',
    category: 'computers',
    ctaText: 'Explore Pro Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'radial-gradient(ellipse at 80% 40%, rgba(59, 130, 246, 0.18) 0%, rgba(15, 23, 42, 0) 65%), linear-gradient(135deg, #090d16 0%, #111827 100%)',
    accentColor: '#38bdf8',
    highlights: ['Synthesized AI Consensus', 'Pro Display XDR Calibrated', 'Prime One-Day Delivery']
  },
  {
    id: 'slide-2',
    badge: 'AUDIOPHILE SOUND & ANC',
    title: 'The Great ANC Showdown: Sony vs Apple vs Bose',
    subtitle: 'Evaluate spatial imaging, active noise isolation curves, and microphone latencies side-by-side using the 1-Click Spec Differential Dock.',
    category: 'audio',
    ctaText: 'Compare ANC Flagships',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'radial-gradient(ellipse at 80% 40%, rgba(168, 85, 247, 0.22) 0%, rgba(15, 23, 42, 0) 65%), linear-gradient(135deg, #0a0a14 0%, #1e1b4b 100%)',
    accentColor: '#c084fc',
    highlights: ['1-Click Spec Diff Matrix', '30-Hour ANC Endurance', 'Zero Sponsored Bias']
  },
  {
    id: 'slide-3',
    badge: 'PRECISION MECHANICAL & GAMING',
    title: 'Custom Hot-Swap Keyboards & Handhelds',
    subtitle: 'Double-gasket acoustics, custom aluminum enclosures, and verified millisecond switch actuations without counterfeit seller risk.',
    category: 'gaming',
    ctaText: 'Upgrade Battlestation',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'radial-gradient(ellipse at 80% 40%, rgba(245, 158, 11, 0.18) 0%, rgba(15, 23, 42, 0) 65%), linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)',
    accentColor: '#fbbf24',
    highlights: ['Sub-millisecond Latency', 'Hot-Swappable Switches', 'Guaranteed In-Stock']
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { products, setFilters, setActiveView } = useApp();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const slide = HERO_SLIDES[currentSlide];

  const handleCta = () => {
    setFilters(prev => ({ ...prev, category: slide.category, searchQuery: '' }));
    setActiveView('catalog');
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        style={{
          background: slide.bgGradient,
          minHeight: '470px',
          color: '#ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
          key={slide.id}
          className="view-fade-in"
          style={{
            maxWidth: '1540px',
            margin: '0 auto',
            width: '100%',
            padding: '3rem clamp(3.5rem, 6vw, 6rem) 6.5rem clamp(3.5rem, 6vw, 6rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            position: 'relative',
            zIndex: 3
          }}
        >
          {/* Left Hero Content Column */}
          <div style={{ maxWidth: '640px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 153, 0, 0.12)',
                color: '#ff9900',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                padding: '5px 14px',
                borderRadius: '9999px',
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 153, 0, 0.35)',
                boxShadow: '0 0 15px rgba(255, 153, 0, 0.15)'
              }}
            >
              <Sparkles size={14} color="#ff9900" style={{ animation: 'pulseDot 2s infinite ease-in-out' }} />
              <span>{slide.badge}</span>
            </div>

            <h1 
              style={{ 
                fontSize: 'clamp(2rem, 3.8vw, 2.85rem)', 
                fontWeight: 900, 
                lineHeight: 1.12, 
                color: '#ffffff',
                marginBottom: '1rem',
                letterSpacing: '-0.03em'
              }}
            >
              {slide.title}
            </h1>

            <p 
              style={{ 
                fontSize: '0.98rem', 
                color: '#cbd5e1', 
                lineHeight: 1.6, 
                marginBottom: '1.5rem',
                fontWeight: 400
              }}
            >
              {slide.subtitle}
            </p>

            {/* Feature Highlight Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
              {slide.highlights.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '4px 11px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    color: '#f1f5f9',
                    fontWeight: 600
                  }}
                >
                  <span style={{ color: slide.accentColor }}>✦</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handleCta}
                className="btn-add-cart btn-press"
                style={{ 
                  fontSize: '0.94rem', 
                  padding: '0.85rem 1.85rem',
                  backgroundColor: '#ffd814',
                  color: '#0f1111',
                  fontWeight: 800,
                  border: '1px solid #fcd200',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 216, 20, 0.4)'
                }}
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
                  setActiveView('catalog');
                }}
                className="btn-secondary btn-press"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.9rem',
                  borderRadius: '9999px'
                }}
              >
                Browse All {products.length} Products
              </button>
            </div>

            {/* In-Hero Animated Progress Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      width: i === currentSlide ? '32px' : '10px',
                      height: '6px',
                      borderRadius: '4px',
                      backgroundColor: i === currentSlide ? '#ff9900' : 'rgba(255,255,255,0.25)',
                      boxShadow: i === currentSlide ? '0 0 10px rgba(255, 153, 0, 0.7)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    title={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
                {currentSlide + 1} of {HERO_SLIDES.length}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#475569' }}>•</span>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                {isPaused ? 'Paused' : 'Auto-playing'}
              </span>
            </div>
          </div>

          {/* Right Hero Product Card with Floating 3D Micro-Animation */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '16/10',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 45px ${slide.accentColor}30`,
                border: '1.5px solid rgba(255,255,255,0.18)',
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.x !== 0 ? 1.02 : 1}, ${tilt.x !== 0 ? 1.02 : 1}, 1)`,
                transition: tilt.x === 0 ? 'transform 0.5s ease' : 'none',
                cursor: 'pointer',
                animation: 'floatSlow 6s ease-in-out infinite'
              }}
              onClick={handleCta}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 14, 23, 0.9) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#00a8e1" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    Prime Guaranteed Fast Dispatch
                  </span>
                </div>

                <div 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  Verified Stock
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amazon-Style Left Edge Chevron with Hover Glow */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          style={{
            position: 'absolute',
            left: '12px',
            top: '42%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            width: '40px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.45)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          title="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Amazon-Style Right Edge Chevron with Hover Glow */}
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '42%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            width: '40px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.45)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          title="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Atmospheric Bottom Gradient Mask */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '110px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(243, 244, 246, 0.4) 40%, #f3f4f6 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
          className="hero-bottom-fade"
        />
      </div>

      <style>{`
        [data-theme='dark'] .hero-bottom-fade {
          background: linear-gradient(to bottom, transparent 0%, rgba(11, 15, 25, 0.5) 40%, #0b0f19 100%) !important;
        }
      `}</style>
    </div>
  );
};

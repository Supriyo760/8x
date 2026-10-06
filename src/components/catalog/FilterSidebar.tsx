import React from 'react';
import { useApp } from '../../context/AppContext';
import { CategorySlug } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Filter, Check, RotateCcw, BarChart2 } from 'lucide-react';

const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: 'all', label: 'All Departments' },
  { slug: 'electronics', label: 'Electronics & Mobiles' },
  { slug: 'computers', label: 'Computers & Accessories' },
  { slug: 'audio', label: 'Headphones & Audio' },
  { slug: 'gaming', label: 'Gaming & Consoles' },
  { slug: 'home', label: 'Smart Home & Displays' },
  { slug: 'books', label: 'Books & E-Readers' }
];

const BRANDS = ['all', 'Apple', 'Sony', 'Bose', 'Keychron', 'Framework', 'Valve', 'Amazon'];

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters, products } = useApp();

  const handleCategoryChange = (cat: CategorySlug) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handlePrimeToggle = () => {
    setFilters(prev => ({ ...prev, isPrimeOnly: !prev.isPrimeOnly }));
  };

  const handleInStockToggle = () => {
    setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({ ...prev, brand }));
  };

  // Price Histogram Buckets
  const PRICE_BUCKETS = [
    { label: '<$250', min: 0, max: 250, count: products.filter(p => p.price <= 250).length },
    { label: '$250-$500', min: 250, max: 500, count: products.filter(p => p.price > 250 && p.price <= 500).length },
    { label: '$500-$1000', min: 500, max: 1000, count: products.filter(p => p.price > 500 && p.price <= 1000).length },
    { label: '$1000-$2000', min: 1000, max: 2000, count: products.filter(p => p.price > 1000 && p.price <= 2000).length },
    { label: '$2000+', min: 2000, max: 3500, count: products.filter(p => p.price > 2000).length },
  ];

  const maxBucketCount = Math.max(...PRICE_BUCKETS.map(b => b.count), 1);

  // Review Distribution Data
  const RATING_BREAKDOWN = [
    { star: 5, pct: 76, min: 4.8 },
    { star: 4, pct: 16, min: 4.0 },
    { star: 3, pct: 5, min: 3.0 },
    { star: 2, pct: 2, min: 2.0 },
    { star: 1, pct: 1, min: 1.0 }
  ];

  return (
    <aside 
      style={{ 
        width: '270px', 
        flexShrink: 0,
        backgroundColor: '#ffffff',
        border: '1px solid var(--amazon-border)',
        borderRadius: '12px',
        padding: '1.4rem',
        height: 'fit-content',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="#0f1111" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Filters & Metrics</h3>
        </div>
        <button
          onClick={resetFilters}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--amazon-link)',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Prime Eligible Toggle */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <label 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <span className="badge-prime" style={{ fontSize: '0.82rem' }}>
            Prime Eligible Only
          </span>
          <input
            type="checkbox"
            checked={filters.isPrimeOnly}
            onChange={handlePrimeToggle}
            style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: '#007185' }}
          />
        </label>
      </div>

      {/* Department Category List */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.65rem', color: '#0f1111' }}>
          Department
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {CATEGORIES.map(c => {
            const isActive = filters.category === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => handleCategoryChange(c.slug)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? '#007185' : '#334155',
                  backgroundColor: isActive ? '#e7f7fc' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <span>{c.label}</span>
                {isActive && <Check size={14} color="#007185" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Review Breakdown Bars */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f1111' }}>
          Customer Review Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {RATING_BREAKDOWN.map(r => {
            const isSelected = filters.minRating === r.star;
            return (
              <div
                key={r.star}
                onClick={() => handleRatingChange(r.star)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  backgroundColor: isSelected ? '#fff7ed' : 'transparent',
                  border: isSelected ? '1px solid #fdba74' : '1px solid transparent'
                }}
                title={`Filter by ${r.star}★ and above`}
              >
                <span style={{ fontSize: '0.78rem', color: '#475569', width: '28px', fontWeight: 600 }}>
                  {r.star} star
                </span>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${r.pct}%`, 
                      height: '100%', 
                      backgroundColor: '#ff9900',
                      borderRadius: '4px' 
                    }} 
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', width: '28px', textAlign: 'right' }}>
                  {r.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter & Frequency Histogram */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f1111' }}>
            Price Distribution
          </h4>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#007185' }}>
            ≤ ${filters.maxPrice}
          </span>
        </div>

        {/* Mini SVG Histogram Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '42px', marginBottom: '0.75rem', padding: '0 4px' }}>
          {PRICE_BUCKETS.map((b, idx) => {
            const heightPct = (b.count / maxBucketCount) * 100;
            const isCovered = b.min <= filters.maxPrice;
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: `${Math.max(15, heightPct)}%`,
                  backgroundColor: isCovered ? '#ff9900' : '#cbd5e1',
                  borderRadius: '3px 3px 0 0',
                  transition: 'background-color 0.2s ease, height 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: b.max }))}
                title={`${b.label}: ${b.count} products (Click to set max)`}
              />
            );
          })}
        </div>

        <input
          type="range"
          min="100"
          max="3000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          style={{ width: '100%', accentColor: 'var(--amazon-amber)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>
          <span>$100</span>
          <span>$1,500</span>
          <span>$3,000</span>
        </div>
      </div>

      {/* Brand Selector */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.65rem', color: '#0f1111' }}>
          Brand
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {BRANDS.map(brand => {
            const isActive = filters.brand === brand;
            return (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? '#007185' : '#334155',
                  backgroundColor: isActive ? '#e7f7fc' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <span>{brand === 'all' ? 'All Brands' : brand}</span>
                {isActive && <Check size={14} color="#007185" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <label 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleInStockToggle}
            style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: '#007185' }}
          />
        </label>
      </div>
    </aside>
  );
};

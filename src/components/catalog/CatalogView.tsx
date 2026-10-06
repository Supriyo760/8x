import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterSidebar } from './FilterSidebar';
import { ActiveFilterPills } from './ActiveFilterPills';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, SlidersHorizontal, PackageSearch, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { filteredProducts, filters, setFilters, resetFilters, searchOnlineProducts, isSearchingAI } = useApp();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="app-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      {/* Top Results & Sort Omnibar */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '0.85rem 1.25rem',
          borderRadius: '8px',
          border: '1px solid var(--amazon-border)',
          marginBottom: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #d5d9d9',
              background: '#f8fafc',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
            className="md-hidden"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>

          <span style={{ fontSize: '0.9rem', color: '#334155' }}>
            Showing <strong style={{ color: '#0f1111' }}>{filteredProducts.length}</strong> results
            {filters.category !== 'all' && <span> in <strong style={{ color: '#0f1111' }}>{filters.category}</strong></span>}
            {filters.searchQuery && <span> for "<strong style={{ color: '#0f1111' }}>{filters.searchQuery}</strong>"</span>}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', color: '#565959', fontWeight: 500 }}>Sort by:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #d5d9d9',
                backgroundColor: '#f8fafc',
                fontSize: '0.85rem',
                color: '#0f1111',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Grid / List Layout Switcher */}
          <div style={{ display: 'flex', border: '1px solid #d5d9d9', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setLayoutMode('grid')}
              style={{
                background: layoutMode === 'grid' ? '#e2e8f0' : '#ffffff',
                border: 'none',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: layoutMode === 'grid' ? '#0f1111' : '#64748b'
              }}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              style={{
                background: layoutMode === 'list' ? '#e2e8f0' : '#ffffff',
                border: 'none',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: layoutMode === 'list' ? '#0f1111' : '#64748b'
              }}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Global AI Search Expansion Callout Banner */}
      {filters.searchQuery && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(255, 153, 0, 0.08))',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Sparkles size={18} color="#0284c7" />
            <span style={{ fontSize: '0.86rem', color: '#1e293b' }}>
              Want to see more models or variants for "<strong>{filters.searchQuery}</strong>"?
            </span>
          </div>
          <button
            onClick={() => searchOnlineProducts(filters.searchQuery)}
            disabled={isSearchingAI}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: isSearchingAI ? 'wait' : 'pointer',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
            }}
          >
            {isSearchingAI ? (
              <>
                <Sparkles size={14} className="loading-spinner" />
                <span>Generating with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Search Global Catalog with AI</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Body: Sidebar + Catalog Grid */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Filter Sidebar */}
        <div style={{ display: isMobileFilterOpen ? 'block' : undefined }} className="sidebar-container">
          <FilterSidebar />
        </div>

        {/* Product Grid Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <ActiveFilterPills />

          {isSearchingAI ? (
            /* AI Shimmer Loading Skeleton */
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '3.5rem 1.5rem',
                textAlign: 'center',
                border: '1px solid var(--amazon-border)'
              }}
            >
              <Sparkles size={48} color="#0284c7" style={{ margin: '0 auto 1rem', animation: 'spin 3s linear infinite' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f1111' }}>
                Querying Amazon Catalog Intelligence via Google Gemini...
              </h3>
              <p style={{ color: '#565959', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
                Generating real-time spec differential matrices, verified review digests ("The Verdict"), and authentic commercial listings for <strong>"{filters.searchQuery}"</strong>.
              </p>
              <div className="skeleton-line" style={{ width: '60%', height: '14px', margin: '0 auto 8px' }} />
              <div className="skeleton-line" style={{ width: '40%', height: '14px', margin: '0 auto' }} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '3.5rem 1.5rem',
                textAlign: 'center',
                border: '1px solid var(--amazon-border)'
              }}
            >
              <PackageSearch size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f1111' }}>
                No cached products found for "{filters.searchQuery || 'your criteria'}"
              </h3>
              <p style={{ color: '#565959', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                {filters.searchQuery 
                  ? `Search Amazon's live global catalog for "${filters.searchQuery}" using Google Gemini 1.5 Flash.`
                  : 'Try relaxing your filter criteria or resetting active filters.'}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {filters.searchQuery && (
                  <button
                    onClick={() => searchOnlineProducts(filters.searchQuery)}
                    className="btn-add-cart"
                    style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', padding: '0.65rem 1.5rem' }}
                  >
                    <Sparkles size={16} />
                    <span>Search Global Amazon Catalog with AI</span>
                  </button>
                )}

                <button
                  onClick={resetFilters}
                  className="btn-secondary"
                  style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', padding: '0.65rem 1.25rem' }}
                >
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: layoutMode === 'grid' 
                  ? 'repeat(auto-fill, minmax(260px, 1fr))' 
                  : '1fr',
                gap: '1.25rem'
              }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout={layoutMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CategorySlug, Product } from '../../types';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  X,
  ChevronDown,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  Zap,
  ArrowRight
} from 'lucide-react';

const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'electronics', label: 'Electronics' },
  { slug: 'computers', label: 'Computers' },
  { slug: 'audio', label: 'Audio & Sound' },
  { slug: 'gaming', label: 'Gaming Gear' },
  { slug: 'home', label: 'Smart Home' },
  { slug: 'books', label: 'Books & Tech' }
];

const SUBNAV_LINKS: { slug: CategorySlug | 'deals'; label: string }[] = [
  { slug: 'deals', label: "Today's Deals" },
  { slug: 'electronics', label: 'Electronics' },
  { slug: 'computers', label: 'Computers' },
  { slug: 'audio', label: 'Headphones & Audio' },
  { slug: 'gaming', label: 'Gaming' },
  { slug: 'home', label: 'Smart Home' },
  { slug: 'books', label: 'Books' }
];

export const GlobalHeader: React.FC = () => {
  const { 
    cartCount, 
    setIsCartDrawerOpen, 
    setActiveView, 
    deliveryZip, 
    setIsDeliveryModalOpen,
    persona,
    togglePersona,
    orders,
    filters,
    setFilters,
    comparedProducts,
    setIsCompareModalOpen,
    products,
    navigateToProduct,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    setIsAuthModalOpen,
    logoutUser,
    searchOnlineProducts,
    isSearchingAI
  } = useApp();

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>(filters.category);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchSuggestions = useMemo(() => {
    if (!searchInput.trim() || searchInput.trim().length < 2) return [];
    const q = searchInput.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.aiReviewDigest.verdict.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchInput, products]);

  // Keyboard shortcut '/' focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) {
      setFilters(prev => ({ ...prev, searchQuery: '' }));
      return;
    }
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
      category: selectedCategory
    }));
    setActiveView('catalog');

    // If local catalog doesn't contain matching products, query Gemini AI
    const q = query.toLowerCase();
    const matches = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.aiReviewDigest.verdict.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      await searchOnlineProducts(query);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  const handleSubnavClick = (slug: CategorySlug | 'deals') => {
    if (slug === 'deals') {
      setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
      setActiveView('catalog');
    } else {
      setFilters(prev => ({ ...prev, category: slug, searchQuery: '' }));
      setActiveView('catalog');
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
      {/* ROW 1: PRIMARY NAVBAR (Amazon Navy #131921) */}
      <div 
        style={{ 
          backgroundColor: '#131921', 
          color: '#ffffff', 
          padding: '0.45rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          minHeight: '60px'
        }}
      >
        {/* Amazon Logo with Authentic Smile Curve */}
        <div 
          onClick={() => { setActiveView('home'); setFilters(prev => ({ ...prev, searchQuery: '', category: 'all' })); }}
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            padding: '4px 6px',
            borderRadius: '4px',
            userSelect: 'none',
            flexShrink: 0
          }}
          className="header-link-hover"
          title="Amazon Elevated Home"
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontSize: '1.55rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              amazon
            </span>
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: 800, 
              color: '#ff9900', 
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: 'rgba(255, 153, 0, 0.15)',
              padding: '1px 5px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 153, 0, 0.3)'
            }}>
              elevated
            </span>
          </div>
          {/* Authentic Amazon Smile Arrow: curves from 'a' to 'z' */}
          <svg width="65" height="12" viewBox="0 0 65 12" fill="none" style={{ marginTop: '-3px' }}>
            <path 
              d="M3 4C18 10 44 11 61 3.5" 
              stroke="#ff9900" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M57 3.5L62.5 4L59.5 8.5" 
              stroke="#ff9900" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {/* Deliver-To Location Widget */}
        <button
          onClick={() => setIsDeliveryModalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textAlign: 'left',
            flexShrink: 0
          }}
          className="header-link-hover"
          title="Change delivery postal code"
        >
          <MapPin size={18} color="#ffffff" style={{ marginTop: '4px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '0.72rem', color: '#cccccc' }}>Deliver to {persona.name.split(' ')[0]}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>Seattle {deliveryZip}</span>
          </div>
        </button>

        {/* Omnibar Search Form & Auto-Suggestions Dropdown */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', zIndex: 1000 }}>
          <form 
            onSubmit={handleSearchSubmit} 
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'stretch', 
              height: '40px',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              outline: isSearchFocused ? '3px solid #ff9900' : 'none',
              transition: 'outline 0.15s ease'
            }}
          >
            {/* Category Dropdown */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#e6e6e6', borderRight: '1px solid #cdcdcd' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategorySlug)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0f1111',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0 24px 0 10px',
                  height: '100%',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none'
                }}
              >
                {CATEGORIES.map(c => (
                  <option key={c.slug} value={c.slug} style={{ color: '#0f1111' }}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} color="#555555" style={{ position: 'absolute', right: '6px', pointerEvents: 'none' }} />
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Amazon Elevated or AI review verdicts... (press /)"
                value={searchInput}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  padding: '0 32px 0 12px',
                  fontSize: '0.92rem',
                  outline: 'none',
                  color: '#0f1111'
                }}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    color: '#888888',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              disabled={isSearchingAI}
              style={{
                backgroundColor: isSearchingAI ? '#ffd814' : '#febd69',
                border: 'none',
                padding: '0 16px',
                cursor: isSearchingAI ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              title="Search Amazon"
              onMouseEnter={(e) => !isSearchingAI && (e.currentTarget.style.backgroundColor = '#f3a847')}
              onMouseLeave={(e) => !isSearchingAI && (e.currentTarget.style.backgroundColor = '#febd69')}
            >
              {isSearchingAI ? (
                <Sparkles size={20} color="#0f1111" className="loading-spinner" />
              ) : (
                <Search size={20} color="#0f1111" strokeWidth={2.5} />
              )}
            </button>
          </form>

          {/* Real-Time Search Suggestions & AI Global Search Popup */}
          {isSearchFocused && searchInput.trim().length >= 2 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                border: '1px solid #cbd5e1',
                overflow: 'hidden',
                zIndex: 1200
              }}
              className="view-fade-in"
            >
              {searchSuggestions.length > 0 && (
                <div>
                  <div style={{ padding: '6px 12px', backgroundColor: '#f8fafc', borderBottom: '1px solid #eef2f6', fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Instant Product Matches ({searchSuggestions.length})
                  </div>
                  {searchSuggestions.map((item: Product) => (
                    <div
                      key={item.id}
                      onMouseDown={() => {
                        navigateToProduct(item);
                        setIsSearchFocused(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f8fafc',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#f8fafc', padding: '2px', border: '1px solid #e2e8f0' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f1111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{item.brand}</span>
                          <span>•</span>
                          <strong style={{ color: '#0f1111' }}>${item.price.toFixed(2)}</strong>
                          {item.isPrime && <span style={{ color: '#00a8e1', fontWeight: 800 }}>✓Prime</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Global Amazon Search Trigger Option */}
              <div
                onMouseDown={async () => {
                  setIsSearchFocused(false);
                  setFilters(prev => ({ ...prev, searchQuery: searchInput.trim() }));
                  setActiveView('catalog');
                  await searchOnlineProducts(searchInput.trim());
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#f0f9ff',
                  borderTop: '1px solid #bae6fd',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0f2fe')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f9ff')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#0284c7" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0369a1' }}>
                    Search global Amazon catalog for "{searchInput}" with Gemini AI
                  </span>
                </div>
                <ArrowRight size={15} color="#0284c7" />
              </div>
            </div>
          )}
        </div>

        {/* Persona Switcher / Account & Lists */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'left'
            }}
            className="header-link-hover"
          >
            <div 
              style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                border: persona.isPrime ? '2px solid #00a8e1' : '1px solid #888888' 
              }}
            >
              <img src={persona.avatarUrl} alt={persona.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.72rem', color: '#cccccc' }}>Hello, {persona.name.split(' ')[0]}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 800 }}>
                  {persona.isPrime ? 'Prime Active' : 'Account & Lists'}
                </span>
                <ChevronDown size={12} color="#cccccc" />
              </div>
            </div>
          </button>

          {isPersonaMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '270px',
                backgroundColor: '#ffffff',
                color: '#0f1111',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                padding: '1.1rem',
                zIndex: 1100,
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                <img src={persona.avatarUrl} alt={persona.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{persona.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#565959' }}>{persona.email}</div>
                  {persona.isPrime && (
                    <span className="badge-prime" style={{ marginTop: '3px', fontSize: '0.68rem' }}>
                      Prime Member
                    </span>
                  )}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                Switch personas to test member vs guest shipping fees and prime 1-day delivery guarantees.
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.65rem', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: '#64748b' }}>Clerk Auth:</span>
                  <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} /> Live Connected
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Supabase DB:</span>
                  <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} /> Synced
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <button
                  onClick={() => {
                    setIsPersonaMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="btn-add-cart"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
                >
                  Sign In / Create Account
                </button>

                <button
                  onClick={() => {
                    togglePersona();
                    setIsPersonaMenuOpen(false);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem' }}
                >
                  Switch to {persona.isPrime ? 'Guest Shopper' : 'Sarah Connor (Prime)'}
                </button>

                <button
                  onClick={() => {
                    logoutUser();
                    setIsPersonaMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#b12704',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '4px',
                    fontWeight: 600
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme (Dark/Light) & Sound Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="header-link-hover"
            title={`Toggle Theme (${theme === 'dark' ? 'Dark Mode' : 'Light Mode'})`}
          >
            {theme === 'dark' ? <Sun size={18} color="#ffd814" /> : <Moon size={18} color="#cbd5e1" />}
          </button>

          <button
            onClick={toggleSound}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="header-link-hover"
            title={`Toggle Audio Chimes (${soundEnabled ? 'Enabled' : 'Muted'})`}
          >
            {soundEnabled ? <Volume2 size={18} color="#38bdf8" /> : <VolumeX size={18} color="#94a3b8" />}
          </button>
        </div>

        {/* Returns & Orders Navigation */}
        <button
          onClick={() => setActiveView('orders')}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            lineHeight: 1.2,
            flexShrink: 0
          }}
          className="header-link-hover"
          title="View past orders & real-time tracking"
        >
          <span style={{ fontSize: '0.72rem', color: '#cccccc' }}>Returns</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>& Orders</span>
            {orders.length > 0 && (
              <span 
                style={{ 
                  background: '#ff9900', 
                  color: '#0f1111', 
                  fontSize: '0.65rem', 
                  fontWeight: 900, 
                  borderRadius: '10px', 
                  padding: '1px 5px' 
                }}
              >
                {orders.length}
              </span>
            )}
          </div>
        </button>

        {/* Compare Dock Trigger (if any selected) */}
        {comparedProducts.length > 0 && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            style={{
              background: '#232f3e',
              border: '1.5px solid #ff9900',
              color: '#ff9900',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 800,
              flexShrink: 0
            }}
          >
            <Layers size={15} />
            <span>Compare ({comparedProducts.length})</span>
          </button>
        )}

        {/* Cart Button with Signature Amazon Cart Badge */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            flexShrink: 0
          }}
          className="header-link-hover"
          title="Open Cart Drawer"
        >
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={28} color="#ffffff" strokeWidth={2.2} />
            <span
              className={cartCount > 0 ? 'badge-bounce' : ''}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ff9900',
                color: '#0f1111',
                fontSize: '0.75rem',
                fontWeight: 900,
                width: '19px',
                height: '19px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cartCount}
            </span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '8px' }}>
            Cart
          </span>
        </button>
      </div>

      {/* ROW 2: SUBNAV BAR (Amazon Slate #232f3e) */}
      <nav 
        style={{ 
          backgroundColor: '#232f3e', 
          color: '#ffffff', 
          fontSize: '0.84rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1600px', 
            margin: '0 auto', 
            padding: '0 1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            minHeight: '39px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {/* All Departments Button */}
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
                setActiveView('catalog');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '5px 8px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
              className="subnav-link-hover"
            >
              <Menu size={18} />
              <span>All</span>
            </button>

            {SUBNAV_LINKS.map(item => (
              <button
                key={item.slug}
                onClick={() => handleSubnavClick(item.slug)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '5px 8px',
                  borderRadius: '3px',
                  fontWeight: 500,
                  fontSize: '0.84rem'
                }}
                className="subnav-link-hover"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Feature Callout Badge */}
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '0.78rem', 
                color: '#ffd814',
                background: 'rgba(255, 216, 20, 0.12)',
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 216, 20, 0.3)'
              }}
            >
              <Sparkles size={13} color="#ffd814" style={{ animation: 'pulseDot 2s infinite ease-in-out' }} />
              <span style={{ fontWeight: 700 }}>AI Review Synthesis</span>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .header-link-hover:hover {
          outline: 1px solid #ffffff !important;
        }
        .subnav-link-hover:hover {
          outline: 1px solid #ffffff !important;
          background-color: #37475a;
        }
      `}</style>
    </header>
  );
};

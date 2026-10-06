import React from 'react';
import { useApp } from '../../context/AppContext';
import { CategorySlug } from '../../types';
import { Menu, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const NAV_ITEMS: { slug: CategorySlug | 'deals'; label: string }[] = [
  { slug: 'deals', label: "Today's Deals" },
  { slug: 'electronics', label: 'Electronics' },
  { slug: 'computers', label: 'Computers' },
  { slug: 'audio', label: 'Audio' },
  { slug: 'gaming', label: 'Gaming' },
  { slug: 'home', label: 'Smart Home' },
  { slug: 'books', label: 'Books & Tech' }
];

export const SubNav: React.FC = () => {
  const { setFilters, setActiveView } = useApp();

  const handleNavClick = (slug: CategorySlug | 'deals') => {
    if (slug === 'deals') {
      setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
      setActiveView('catalog');
    } else {
      setFilters(prev => ({ ...prev, category: slug, searchQuery: '' }));
      setActiveView('catalog');
    }
  };

  return (
    <nav 
      style={{ 
        backgroundColor: 'var(--amazon-subnav-bg)', 
        color: '#ffffff', 
        fontSize: '0.85rem',
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
          minHeight: '40px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {/* All Departments Button */}
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
              setActiveView('catalog');
            }}
            style={{
              background: 'none',
              border: '1px solid transparent',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700
            }}
            className="subnav-hover-box"
          >
            <Menu size={18} />
            <span>All</span>
          </button>

          {NAV_ITEMS.map(item => (
            <button
              key={item.slug}
              onClick={() => handleNavClick(item.slug)}
              style={{
                background: 'none',
                border: '1px solid transparent',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '4px',
                fontWeight: 500,
                fontSize: '0.84rem'
              }}
              className="subnav-hover-box"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Feature Callout Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px', 
              fontSize: '0.78rem', 
              color: '#ffd814',
              background: 'rgba(255, 216, 20, 0.1)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 216, 20, 0.2)'
            }}
          >
            <Sparkles size={14} color="#ffd814" />
            <span style={{ fontWeight: 600 }}>AI Review Synthesis Built-In</span>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              fontSize: '0.78rem', 
              color: '#67e8f9'
            }}
          >
            <Zap size={14} />
            <span>Sub-second Client Index</span>
          </div>
        </div>
      </div>

      <style>{`
        .subnav-hover-box:hover {
          border: 1px solid #ffffff !important;
          background: var(--amazon-subnav-hover);
        }
      `}</style>
    </nav>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';

export const ComparisonDock: React.FC = () => {
  const { comparedProducts, removeFromCompare, clearCompare, setIsCompareModalOpen } = useApp();

  if (comparedProducts.length === 0) return null;

  return (
    <div className="comparison-dock">
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
        {/* Left Info & Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', overflowX: 'auto', paddingRight: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #ff9900 0%, #f08804 100%)', 
                color: '#0f1111', 
                borderRadius: '8px', 
                padding: '4px 10px', 
                fontWeight: 900,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(255, 153, 0, 0.4)'
              }}
            >
              <Layers size={15} color="#ffffff" />
              <span style={{ color: '#ffffff' }}>{comparedProducts.length}/4</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap' }}>
                Spec Comparison Matrix
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                Side-by-side diff matrix active
              </span>
            </div>
          </div>

          {/* Product Mini Thumbnails */}
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            {comparedProducts.map(p => (
              <div 
                key={p.id}
                style={{
                  position: 'relative',
                  width: '46px',
                  height: '46px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid rgba(255, 153, 0, 0.5)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
                title={p.title}
              >
                <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => removeFromCompare(p.id)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: 'none',
                    color: '#ffffff',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '0 0 0 4px'
                  }}
                  title="Remove from dock"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <button
            onClick={clearCompare}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Trash2 size={13} />
            <span>Clear</span>
          </button>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="btn-add-cart"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.88rem' }}
          >
            <span>Compare Specs</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { 
  X, 
  Layers, 
  ShoppingCart, 
  Sparkles, 
  Minus,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { 
    comparedProducts, 
    removeFromCompare, 
    isCompareModalOpen, 
    setIsCompareModalOpen,
    addToCart,
    navigateToProduct
  } = useApp();

  const [highlightDiffs, setHighlightDiffs] = useState(true);

  if (!isCompareModalOpen || comparedProducts.length === 0) return null;

  // Collect all unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(comparedProducts.flatMap(p => Object.keys(p.specs || {})))
  );

  // Helper to determine if a spec or property differs across items
  const isRowDifferent = (getValue: (p: any) => string | number | boolean) => {
    if (comparedProducts.length <= 1) return false;
    const firstVal = getValue(comparedProducts[0]);
    return comparedProducts.some(p => getValue(p) !== firstVal);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCompareModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '1150px', padding: '2rem', width: '96%', borderRadius: '16px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '1rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #ff9900 0%, #f08804 100%)', 
                color: '#0f1111', 
                borderRadius: '10px', 
                padding: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(255, 153, 0, 0.3)'
              }}
            >
              <Layers size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f1111', letterSpacing: '-0.02em' }}>
                  Spec Differential Comparison Matrix
                </h2>
                <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#b45309', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', border: '1px solid #fde68a' }}>
                  1-Click Diff
                </span>
              </div>
              <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                Comparing {comparedProducts.length} items side-by-side with automated divergence detection
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Toggle Highlight Differences */}
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: highlightDiffs ? '#b45309' : '#475569',
                backgroundColor: highlightDiffs ? '#fffbeb' : '#f1f5f9',
                padding: '7px 14px',
                borderRadius: '8px',
                border: highlightDiffs ? '1.5px solid #f59e0b' : '1.5px solid #cbd5e1',
                boxShadow: highlightDiffs ? '0 0 10px rgba(245, 158, 11, 0.2)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <Sliders size={16} color={highlightDiffs ? '#d97706' : '#64748b'} />
              <span>Highlight Differences</span>
              <input
                type="checkbox"
                checked={highlightDiffs}
                onChange={() => setHighlightDiffs(!highlightDiffs)}
                style={{ accentColor: '#d97706', cursor: 'pointer', width: '15px', height: '15px' }}
              />
            </label>

            <button
              onClick={() => setIsCompareModalOpen(false)}
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
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Comparison Table Viewport */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
            {/* Top Product Cards Row */}
            <thead>
              <tr>
                <th style={{ width: '190px', padding: '1rem', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem' }}>
                  Product
                </th>
                {comparedProducts.map(product => (
                  <th 
                    key={product.id} 
                    style={{ 
                      padding: '1.25rem 1rem', 
                      borderBottom: '2px solid #e2e8f0', 
                      verticalAlign: 'top',
                      minWidth: '220px'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: '#f1f5f9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#64748b',
                          transition: 'background-color 0.15s ease'
                        }}
                        title="Remove from comparison"
                      >
                        <X size={14} />
                      </button>

                      <div 
                        onClick={() => { setIsCompareModalOpen(false); navigateToProduct(product); }}
                        style={{ 
                          width: '130px', 
                          height: '130px', 
                          margin: '0 auto', 
                          borderRadius: '10px', 
                          overflow: 'hidden', 
                          cursor: 'pointer',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      <div 
                        onClick={() => { setIsCompareModalOpen(false); navigateToProduct(product); }}
                        style={{ 
                          fontSize: '0.92rem', 
                          fontWeight: 700, 
                          color: '#0f1111', 
                          cursor: 'pointer',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.35
                        }}
                      >
                        {product.title}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f1111' }}>
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="btn-add-cart"
                        style={{ padding: '0.55rem', fontSize: '0.84rem', width: '100%' }}
                      >
                        <ShoppingCart size={15} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Row: Customer Rating */}
              {(() => {
                const isDiff = isRowDifferent(p => p.rating);
                return (
                  <tr style={{ backgroundColor: highlightDiffs && isDiff ? '#fffbeb' : '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontSize: '0.85rem', color: '#334155' }}>
                      Customer Rating {highlightDiffs && isDiff && <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 800 }}>● diff</span>}
                    </td>
                    {comparedProducts.map(p => (
                      <td key={p.id} style={{ padding: '0.85rem 1rem' }}>
                        <RatingStars rating={p.rating} count={p.reviewCount} size="sm" />
                      </td>
                    ))}
                  </tr>
                );
              })()}

              {/* Row: Prime Delivery */}
              {(() => {
                const isDiff = isRowDifferent(p => p.isPrime);
                return (
                  <tr style={{ backgroundColor: highlightDiffs && isDiff ? '#fffbeb' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontSize: '0.85rem', color: '#334155' }}>
                      Prime Eligible {highlightDiffs && isDiff && <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 800 }}>● diff</span>}
                    </td>
                    {comparedProducts.map(p => (
                      <td key={p.id} style={{ padding: '0.85rem 1rem' }}>
                        {p.isPrime ? <span className="badge-prime">Prime One-Day</span> : <span style={{ color: '#64748b', fontSize: '0.82rem' }}>Standard Shipping</span>}
                      </td>
                    ))}
                  </tr>
                );
              })()}

              {/* Row: AI Review Verdict */}
              <tr style={{ backgroundColor: '#fbf7ff', borderBottom: '1px solid #e9d5ff' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.85rem', color: '#6b21a8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#9333ea" />
                    <span>The Verdict</span>
                  </div>
                </td>
                {comparedProducts.map(p => (
                  <td key={p.id} style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: '#3b0764', lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px', color: '#7c3aed' }}>
                      Best For: {p.aiReviewDigest.bestFor}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4b5563' }}>
                      {p.aiReviewDigest.verdict}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Dynamic Specs Rows */}
              {allSpecKeys.map((key, idx) => {
                const isDiff = isRowDifferent(p => p.specs?.[key] || 'N/A');
                return (
                  <tr 
                    key={key}
                    style={{
                      backgroundColor: highlightDiffs && isDiff ? '#fffbeb' : idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontSize: '0.84rem', color: '#334155' }}>
                      {key} {highlightDiffs && isDiff && <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 800 }}>● diff</span>}
                    </td>
                    {comparedProducts.map(p => (
                      <td key={p.id} style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#0f1111', fontWeight: 500 }}>
                        {p.specs?.[key] || <Minus size={14} color="#94a3b8" />}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

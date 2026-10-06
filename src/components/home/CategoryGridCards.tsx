import React from 'react';
import { useApp } from '../../context/AppContext';
import { Product, CategorySlug } from '../../types';
import { ArrowRight, Headphones, Laptop, Gamepad2, Home } from 'lucide-react';

export const CategoryGridCards: React.FC = () => {
  const { products, navigateToProduct, setFilters, setActiveView } = useApp();

  const audioProducts = products.filter(p => p.category === 'audio').slice(0, 4);
  const computerProducts = products.filter(p => p.category === 'computers').slice(0, 4);
  const gamingProducts = products.filter(p => p.category === 'gaming').slice(0, 4);
  const smartHomeProducts = products.filter(p => p.category === 'home' || p.category === 'books').slice(0, 4);

  const handleCategoryClick = (category: CategorySlug) => {
    setFilters(prev => ({ ...prev, category, searchQuery: '' }));
    setActiveView('catalog');
  };

  const renderFourTileCard = (
    title: string,
    category: CategorySlug,
    items: Product[],
    ctaText: string,
    icon: React.ReactNode,
    accentColor: string = '#007185'
  ) => (
    <div className="cat-feature-card">
      <div className="cat-card-header">
        <div className="cat-header-text">
          <h3 className="cat-card-title">{title}</h3>
          <span className="cat-card-subtitle">{items.length} Curated Picks</span>
        </div>
        <div className="cat-icon-badge" style={{ color: accentColor }}>
          {icon}
        </div>
      </div>

      <div className="cat-tiles-grid">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateToProduct(item)}
            className="cat-sub-tile"
          >
            <div className="cat-tile-img-box">
              <img
                src={item.images[0]}
                alt={item.title}
                className="cat-tile-img"
                loading="lazy"
              />
            </div>
            <div className="cat-tile-info">
              <span className="cat-tile-title" title={item.title}>
                {item.title}
              </span>
              <div className="cat-tile-meta">
                <span className="cat-tile-price">${item.price.toFixed(2)}</span>
                {item.isPrime && (
                  <span className="cat-prime-badge">✓Prime</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleCategoryClick(category)}
        className="cat-cta-btn"
        type="button"
      >
        <span>{ctaText}</span>
        <ArrowRight size={14} className="cat-cta-arrow" />
      </button>
    </div>
  );

  return (
    <section className="category-grid-section">
      <div className="app-container">
        <div className="category-cards-grid">
          {renderFourTileCard(
            'Audiophile Flagships',
            'audio',
            audioProducts,
            'Explore Noise Cancelling',
            <Headphones size={18} />,
            '#007185'
          )}
          {renderFourTileCard(
            'Workstations & Displays',
            'computers',
            computerProducts,
            'See Apple & ThinkPad',
            <Laptop size={18} />,
            '#2563eb'
          )}
          {renderFourTileCard(
            'Custom Gaming Gear',
            'gaming',
            gamingProducts,
            'Upgrade Battlestation',
            <Gamepad2 size={18} />,
            '#d97706'
          )}
          {renderFourTileCard(
            'Smart Living & E-Ink',
            'home',
            smartHomeProducts,
            'Browse Smart Home',
            <Home size={18} />,
            '#059669'
          )}
        </div>
      </div>

      <style>{`
        .category-grid-section {
          margin-top: -65px;
          position: relative;
          z-index: 10;
          margin-bottom: 3rem;
        }

        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 1280px) {
          .category-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .category-cards-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
          }
        }

        .cat-feature-card {
          background-color: #ffffff;
          border-radius: 14px;
          padding: 1.35rem;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          min-width: 0;
          width: 100%;
          position: relative;
          box-sizing: border-box;
        }

        .cat-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08);
          z-index: 5;
        }

        .cat-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
          min-width: 0;
        }

        .cat-header-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .cat-card-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: #0f1111;
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cat-card-subtitle {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .cat-icon-badge {
          background: #f0f9ff;
          padding: 7px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(0, 113, 133, 0.1);
        }

        .cat-tiles-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          min-width: 0;
          width: 100%;
        }

        .cat-sub-tile {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #eef2f6;
          border-radius: 10px;
          padding: 8px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          min-width: 0;
          box-sizing: border-box;
          overflow: hidden;
        }

        .cat-sub-tile:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .cat-tile-img-box {
          height: 100px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 7px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #f1f5f9;
          padding: 6px;
          position: relative;
          box-sizing: border-box;
        }

        .cat-tile-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cat-sub-tile:hover .cat-tile-img {
          transform: scale(1.08);
        }

        .cat-tile-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          width: 100%;
        }

        .cat-tile-title {
          font-size: 0.75rem;
          color: #0f1111;
          font-weight: 600;
          line-height: 1.32;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 2.64em;
          word-break: break-word;
        }

        .cat-tile-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          min-width: 0;
          margin-top: 2px;
        }

        .cat-tile-price {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0f1111;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .cat-prime-badge {
          font-size: 0.64rem;
          color: #007185;
          font-weight: 800;
          background: #e0f2fe;
          padding: 1px 5px;
          border-radius: 4px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .cat-cta-btn {
          background: none;
          border: none;
          color: #007185;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          align-self: flex-start;
          transition: color 0.15s ease;
        }

        .cat-cta-btn:hover {
          color: #c7511f;
        }

        .cat-cta-arrow {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cat-cta-btn:hover .cat-cta-arrow {
          transform: translateX(4px);
        }

        /* Dark Mode Theme Support */
        [data-theme='dark'] .cat-feature-card {
          background-color: #111827 !important;
          border-color: #1e293b !important;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        [data-theme='dark'] .cat-card-title,
        [data-theme='dark'] .cat-tile-title,
        [data-theme='dark'] .cat-tile-price {
          color: #f8fafc !important;
        }

        [data-theme='dark'] .cat-card-subtitle {
          color: #94a3b8 !important;
        }

        [data-theme='dark'] .cat-icon-badge {
          background: #0f172a !important;
          border-color: #1e293b !important;
        }

        [data-theme='dark'] .cat-sub-tile {
          background: #0d131f !important;
          border-color: #1e293b !important;
        }

        [data-theme='dark'] .cat-sub-tile:hover {
          background: #162032 !important;
          border-color: #334155 !important;
        }

        [data-theme='dark'] .cat-tile-img-box {
          background-color: #090d16 !important;
          border-color: #1e293b !important;
        }

        [data-theme='dark'] .cat-prime-badge {
          background: #082f49 !important;
          color: #38bdf8 !important;
        }

        [data-theme='dark'] .cat-cta-btn {
          color: #38bdf8 !important;
        }

        [data-theme='dark'] .cat-cta-btn:hover {
          color: #f59e0b !important;
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, DollarSign, Sparkles } from 'lucide-react';

export const GlobalFooter: React.FC = () => {
  const { setActiveView, setFilters } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--amazon-subnav-bg)', color: '#ffffff', marginTop: 'auto' }}>
      {/* Back to Top Bar */}
      <button
        onClick={scrollToTop}
        style={{
          width: '100%',
          backgroundColor: '#37475a',
          color: '#ffffff',
          border: 'none',
          padding: '0.85rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'background-color 0.15s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#485769')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#37475a')}
      >
        Back to top
      </button>

      {/* Main Footer Links Columns */}
      <div 
        className="app-container"
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
            Get to Know Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <li><a href="#" style={{ color: '#cbd5e1' }}>About Amazon Elevated</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Why No Sponsored Clutter?</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>AI Verdict Architecture</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Amazon Science & Research</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
            Flagship Innovations
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <li>
              <button 
                onClick={() => { setFilters(prev => ({ ...prev, category: 'all' })); setActiveView('catalog'); }}
                style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
              >
                1-Click Spec Diff Matrix
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setFilters(prev => ({ ...prev, category: 'all' })); setActiveView('catalog'); }}
                style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
              >
                Zero-Friction Quick Peek
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('orders')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
              >
                Live 4-Stage Shipment Stepper
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('cart')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
              >
                Instant Coupon Validation
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
            Amazon Payment & Perks
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Amazon Prime Rewards Visa</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Code PRIME10 (10% Off)</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Reload Your Balance</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Amazon Currency Converter</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
            Let Us Help You
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <li>
              <button 
                onClick={() => setActiveView('orders')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#cbd5e1', fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left' }}
              >
                Your Orders & Tracking
              </button>
            </li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Shipping Rates & Policies</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Returns & Replacements</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Help Center & Accessibility</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Logo, Currency & 8x Hackathon Attribution */}
      <div style={{ backgroundColor: 'var(--amazon-nav-bg)', padding: '1.75rem 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>amazon</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--amazon-amber)', fontWeight: 800 }}>ELEVATED</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #848688', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>
              <Globe size={14} />
              <span>English</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #848688', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>
              <DollarSign size={14} />
              <span>USD - U.S. Dollar</span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#999999', lineHeight: 1.6 }}>
          <div>© 2026 Amazon Elevated, Inc. Built for the 8x Senior Software Engineer Rebuild Assignment.</div>
          <div style={{ color: '#cbd5e1', marginTop: '4px' }}>
            Equipped with Client-Side Vector Indices, AI Review Synthesis, Spec Differential Comparison Matrix, and Zero-Friction Quick Peek.
          </div>
        </div>
      </div>
    </footer>
  );
};

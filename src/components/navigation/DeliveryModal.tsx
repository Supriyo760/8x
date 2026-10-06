import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, X, Check } from 'lucide-react';
import { geolocationService } from '../../services/geolocation';

const POPULAR_ZIPS = [
  { zip: '98101', city: 'Seattle, WA', desc: 'Amazon HQ1 - Next Day Prime' },
  { zip: '10001', city: 'New York, NY', desc: 'NYC Metro - Same Day Eligible' },
  { zip: '90210', city: 'Beverly Hills, CA', desc: 'SoCal Hub - Morning Delivery' },
  { zip: '78701', city: 'Austin, TX', desc: 'Silicon Hills - Next Day Prime' },
  { zip: '60601', city: 'Chicago, IL', desc: 'Midwest Metro - Next Day Prime' }
];

export const DeliveryModal: React.FC = () => {
  const { isDeliveryModalOpen, setIsDeliveryModalOpen, deliveryZip, setDeliveryZip, showToast } = useApp();
  const [customZip, setCustomZip] = useState('');
  const [error, setError] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isDeliveryModalOpen) return null;

  const handleSelectZip = (zip: string) => {
    setDeliveryZip(zip);
    setIsDeliveryModalOpen(false);
    showToast(`Delivery location updated to ${zip}`);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(customZip)) {
      setError('Please enter a valid 5-digit US ZIP code.');
      return;
    }
    setError('');
    handleSelectZip(customZip);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsDeliveryModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '480px', padding: '1.75rem' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div 
              style={{ 
                background: '#e7f7fc', 
                color: '#007185', 
                borderRadius: '50%', 
                width: '36px', 
                height: '36px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <MapPin size={20} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Choose your location</h2>
          </div>
          <button
            onClick={() => setIsDeliveryModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#565959',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ color: '#565959', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          Delivery options and speeds vary by address. Select an address or enter a US postal code to view real-time shipping guarantees.
        </p>

        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={async () => {
              setIsLocating(true);
              setError('');
              const loc = await geolocationService.detectCurrentLocation();
              setIsLocating(false);
              if (loc && loc.zip) {
                handleSelectZip(loc.zip);
                showToast(`Location set to ${loc.city}, ${loc.state} (${loc.zip})`);
              } else {
                setError('Location access was denied or unavailable. Please enter ZIP manually.');
              }
            }}
            disabled={isLocating}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.7rem',
              borderRadius: '8px',
              border: '1px solid #007185',
              background: '#e7f7fc',
              color: '#007185',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: isLocating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <MapPin size={16} className={isLocating ? 'spin' : ''} />
            {isLocating ? 'Detecting your coordinates...' : 'Auto-Detect My Current Location'}
          </button>
        </div>

        <form onSubmit={handleApplyCustom} style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
            Or enter a US ZIP Code
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              maxLength={5}
              placeholder="e.g. 98101"
              value={customZip}
              onChange={(e) => setCustomZip(e.target.value.replace(/\D/g, ''))}
              style={{
                flex: 1,
                padding: '0.6rem 0.85rem',
                border: error ? '1px solid #cc0c39' : '1px solid #d5d9d9',
                borderRadius: '6px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-add-cart"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              Apply
            </button>
          </div>
          {error && <p style={{ color: '#cc0c39', fontSize: '0.75rem', marginTop: '0.35rem' }}>{error}</p>}
        </form>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#565959', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Or select popular delivery hubs
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
            {POPULAR_ZIPS.map((loc) => {
              const isSelected = deliveryZip === loc.zip;
              return (
                <button
                  key={loc.zip}
                  onClick={() => handleSelectZip(loc.zip)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid #007185' : '1px solid #e5e7eb',
                    background: isSelected ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f1111' }}>{loc.city}</span>
                      <span style={{ fontSize: '0.8rem', color: '#565959', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {loc.zip}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#007185', fontWeight: 500 }}>{loc.desc}</span>
                  </div>
                  {isSelected && <Check size={18} color="#007185" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

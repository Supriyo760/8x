import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const ActiveFilterPills: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.searchQuery) {
    chips.push({
      label: `"${filters.searchQuery}"`,
      onRemove: () => setFilters(prev => ({ ...prev, searchQuery: '' }))
    });
  }

  if (filters.category !== 'all') {
    chips.push({
      label: `Dept: ${filters.category}`,
      onRemove: () => setFilters(prev => ({ ...prev, category: 'all' }))
    });
  }

  if (filters.isPrimeOnly) {
    chips.push({
      label: 'Prime Only',
      onRemove: () => setFilters(prev => ({ ...prev, isPrimeOnly: false }))
    });
  }

  if (filters.minRating > 0) {
    chips.push({
      label: `Rating ≥ ${filters.minRating}★`,
      onRemove: () => setFilters(prev => ({ ...prev, minRating: 0 }))
    });
  }

  if (filters.brand !== 'all') {
    chips.push({
      label: `Brand: ${filters.brand}`,
      onRemove: () => setFilters(prev => ({ ...prev, brand: 'all' }))
    });
  }

  if (filters.maxPrice < 3000) {
    chips.push({
      label: `Max $${filters.maxPrice}`,
      onRemove: () => setFilters(prev => ({ ...prev, maxPrice: 3000 }))
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      label: 'In Stock',
      onRemove: () => setFilters(prev => ({ ...prev, inStockOnly: false }))
    });
  }

  if (chips.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <span style={{ fontSize: '0.8rem', color: '#565959', fontWeight: 600 }}>Active Filters:</span>
      {chips.map((chip, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#e2e8f0',
            color: '#1e293b',
            fontSize: '0.78rem',
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: '16px'
          }}
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              color: '#64748b'
            }}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <button
        onClick={resetFilters}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--amazon-link)',
          fontSize: '0.78rem',
          fontWeight: 600,
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Clear all
      </button>
    </div>
  );
};

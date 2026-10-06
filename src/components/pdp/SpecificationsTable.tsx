import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Layers, Check } from 'lucide-react';

interface SpecificationsTableProps {
  product: Product;
}

export const SpecificationsTable: React.FC<SpecificationsTableProps> = ({ product }) => {
  const { comparedProducts, addToCompare, removeFromCompare } = useApp();
  const isCompared = comparedProducts.some(p => p.id === product.id);

  const entries = Object.entries(product.specs || {});

  if (entries.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f1111' }}>
          Technical Specifications
        </h3>

        <button
          onClick={() => isCompared ? removeFromCompare(product.id) : addToCompare(product)}
          style={{
            backgroundColor: isCompared ? '#fff7ed' : '#ffffff',
            border: isCompared ? '1px solid #ff9900' : '1px solid #d5d9d9',
            color: isCompared ? '#b45309' : '#0f1111',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isCompared ? <Check size={14} color="#ff9900" /> : <Layers size={14} />}
          <span>{isCompared ? 'In Compare Dock' : 'Add to Compare Matrix'}</span>
        </button>
      </div>

      <div 
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <tbody>
            {entries.map(([key, val], idx) => (
              <tr 
                key={key} 
                style={{ 
                  backgroundColor: idx % 2 === 0 ? '#f8fafc' : '#ffffff',
                  borderBottom: idx !== entries.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#475569', width: '35%' }}>
                  {key}
                </td>
                <td style={{ padding: '0.65rem 1rem', color: '#0f1111', fontWeight: 500 }}>
                  {val}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#131921',
        color: '#ffffff',
        padding: '0.85rem 1.25rem',
        borderRadius: '8px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 2000,
        fontSize: '0.9rem',
        fontWeight: 500,
        border: '1px solid #37475a',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <CheckCircle2 size={18} color="#ff9900" />
      <span>{toast}</span>
    </div>
  );
};

import React from 'react';
import { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants?: ProductVariant[];
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant
}) => {
  if (!variants || variants.length === 0) return null;

  // Group by variant type
  const colorVariants = variants.filter(v => v.type === 'color');
  const storageVariants = variants.filter(v => v.type === 'storage' || v.type === 'size');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', marginBottom: '1.25rem' }}>
      {/* Color Swatches */}
      {colorVariants.length > 0 && (
        <div>
          <span style={{ fontSize: '0.85rem', color: '#565959', display: 'block', marginBottom: '0.4rem' }}>
            Color: <strong style={{ color: '#0f1111' }}>{selectedVariant?.type === 'color' ? selectedVariant.label : colorVariants[0].label}</strong>
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {colorVariants.map(variant => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelectVariant(variant)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid var(--amazon-amber)' : '1px solid #d5d9d9',
                    backgroundColor: isSelected ? '#fff7ed' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: '#0f1111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: variant.value,
                      border: '1px solid rgba(0,0,0,0.2)'
                    }}
                  />
                  <span>{variant.label}</span>
                  {variant.priceModifier !== 0 && (
                    <span style={{ fontSize: '0.75rem', color: '#565959' }}>
                      ({variant.priceModifier > 0 ? `+$${variant.priceModifier}` : `-$${Math.abs(variant.priceModifier)}`})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / Size Pills */}
      {storageVariants.length > 0 && (
        <div>
          <span style={{ fontSize: '0.85rem', color: '#565959', display: 'block', marginBottom: '0.4rem' }}>
            Capacity / Size: <strong style={{ color: '#0f1111' }}>{selectedVariant?.type !== 'color' ? selectedVariant?.label : storageVariants[0].label}</strong>
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {storageVariants.map(variant => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelectVariant(variant)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid var(--amazon-amber)' : '1px solid #d5d9d9',
                    backgroundColor: isSelected ? '#fff7ed' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: '#0f1111',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    minWidth: '85px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{variant.label}</span>
                  {variant.priceModifier !== 0 ? (
                    <span style={{ fontSize: '0.72rem', color: isSelected ? '#b45309' : '#565959' }}>
                      +{variant.priceModifier}$
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#16a34a' }}>Base</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

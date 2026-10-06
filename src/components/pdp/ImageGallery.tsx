import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      {/* Main Viewport */}
      <div
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid var(--amazon-border)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'crosshair'
        }}
      >
        <img
          src={activeImage}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transition: isZoomed ? 'none' : 'transform 0.25s ease'
          }}
        />

        {/* Hover Hint */}
        {!isZoomed && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: 'rgba(15, 17, 17, 0.7)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 500,
              padding: '3px 8px',
              borderRadius: '4px',
              pointerEvents: 'none'
            }}
          >
            Roll over image to zoom in
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setSelectedIndex(idx)}
              style={{
                width: '64px',
                height: '64px',
                flexShrink: 0,
                borderRadius: '6px',
                border: isSelected ? '2px solid var(--amazon-amber)' : '1px solid #d5d9d9',
                backgroundColor: '#ffffff',
                padding: '3px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.15s ease'
              }}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

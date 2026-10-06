import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  showNumber = true,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const totalStars = 5;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1px', color: '#de7921' }}>
        {[...Array(totalStars)].map((_, i) => {
          const starIndex = i + 1;
          const isFilled = starIndex <= fullStars;
          const isHalf = !isFilled && hasHalfStar && starIndex === fullStars + 1;

          return (
            <span key={i} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              {isFilled ? (
                <Star size={iconSize} fill="#de7921" stroke="#de7921" />
              ) : isHalf ? (
                <span style={{ position: 'relative', display: 'inline-flex' }}>
                  <Star size={iconSize} fill="none" stroke="#d5d9d9" />
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '50%',
                      overflow: 'hidden',
                      display: 'inline-flex'
                    }}
                  >
                    <Star size={iconSize} fill="#de7921" stroke="#de7921" />
                  </span>
                </span>
              ) : (
                <Star size={iconSize} fill="none" stroke="#d5d9d9" />
              )}
            </span>
          );
        })}
      </div>
      {showNumber && (
        <span
          style={{
            fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '0.95rem' : '0.85rem',
            fontWeight: 600,
            color: '#007185'
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span
          style={{
            fontSize: size === 'sm' ? '0.75rem' : '0.85rem',
            color: '#565959',
            fontWeight: 400
          }}
        >
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

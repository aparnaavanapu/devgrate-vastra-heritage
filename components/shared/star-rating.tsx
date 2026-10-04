'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getStars } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, size = 14, className, showValue, reviewCount }: StarRatingProps) {
  const { full, half, empty } = getStars(rating);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} style={{ width: size, height: size }} className="fill-gold text-gold" />
      ))}
      {half && (
        <div className="relative" style={{ width: size, height: size }}>
          <Star style={{ width: size, height: size }} className="text-gold/30" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: size / 2 }}>
            <Star style={{ width: size, height: size }} className="fill-gold text-gold" />
          </div>
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} style={{ width: size, height: size }} className="text-gold/30" />
      ))}
      {showValue && (
        <span className="ml-1.5 text-xs text-charcoal/60">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="ml-1 text-xs text-charcoal/40">({reviewCount})</span>
      )}
    </div>
  );
}

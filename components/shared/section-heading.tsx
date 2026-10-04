'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { OrnamentalDivider } from '@/components/ornaments';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  showDivider?: boolean;
  className?: string;
  scriptAccent?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  showDivider = true,
  className = '',
  scriptAccent,
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {scriptAccent && (
        <p className="font-script text-gold text-2xl md:text-3xl mb-1">{scriptAccent}</p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-maroon tracking-wide">{title}</h2>
      {showDivider && <OrnamentalDivider className="mt-4 mb-4" />}
      {subtitle && (
        <p className={`text-charcoal/60 text-sm md:text-base max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

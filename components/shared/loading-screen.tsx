'use client';

import { motion } from 'framer-motion';
import { MandalaSpinner } from '@/components/ornaments';
import { siteConfig } from '@/data/site';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <MandalaSpinner className="w-16 h-16 text-gold mb-6" />
        <h1 className="font-serif text-2xl text-maroon tracking-wide">{siteConfig.name}</h1>
        <p className="font-script text-gold text-lg mt-1">{siteConfig.tagline}</p>
        <motion.div
          className="mt-4 h-px bg-gold"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

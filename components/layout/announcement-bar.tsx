'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Sparkles } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Free shipping on all orders above ₹2,999' },
  { icon: Sparkles, text: 'Festive Season Sale — Up to 25% off on handloom sarees' },
  { icon: Truck, text: 'Use code WELCOME10 for 10% off your first order' },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-maroon-dark text-ivory text-xs sm:text-sm overflow-hidden">
      <div className="container mx-auto px-4 py-2 h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {(() => {
              const Icon = messages[index].icon;
              return <Icon className="h-3.5 w-3.5 text-gold" />;
            })()}
            <span className="small-caps tracking-wide text-center">{messages[index].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

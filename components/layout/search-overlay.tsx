'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useUI } from '@/store/ui-store';
import { products } from '@/data/products';
import { formatINR } from '@/lib/utils';

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q)
      )
      .slice(0, 6);
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    if (searchOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-maroon-dark/95 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-xl text-ivory">Search Sarees</span>
                <button
                  className="text-ivory hover:text-gold transition-colors"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, fabric, color, occasion..."
                  className="w-full pl-12 pr-4 py-4 bg-ivory/10 border border-gold/30 rounded-lg text-ivory placeholder:text-ivory/50 text-lg focus:outline-none focus:border-gold"
                />
              </div>

              {/* Suggestions */}
              {query && results.length > 0 && (
                <div className="mt-4 bg-ivory rounded-lg overflow-hidden shadow-xl">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 hover:bg-parchment/50 transition-colors border-b border-gold/10 last:border-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-16 object-cover rounded-md border border-gold/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-charcoal line-clamp-1">{product.name}</p>
                        <p className="text-xs text-charcoal/60">{product.category} · {product.color}</p>
                      </div>
                      <span className="text-sm font-medium text-maroon">{formatINR(product.price)}</span>
                    </Link>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <p className="mt-6 text-center text-ivory/60 text-sm">
                  No sarees found for &ldquo;{query}&rdquo;. Try a different search.
                </p>
              )}

              {!query && (
                <div className="mt-8">
                  <p className="text-gold text-sm small-caps tracking-wide mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Kanjivaram', 'Bridal', 'Banarasi', 'Silk', 'Cotton', 'Wedding'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-ivory/10 border border-gold/30 rounded-full text-ivory text-sm hover:bg-gold/20 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { formatINR } from '@/lib/utils';
import { StarRating } from '@/components/shared/star-rating';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCartStore((s) => s.add);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const hasWishlisted = useWishlistStore((s) => s.has(product.id));
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-gold/20">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          {/* Secondary image crossfade */}
          <img
            src={product.images[1]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Discount badge */}
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-maroon text-ivory text-xs font-medium px-2.5 py-1 rounded-full z-10">
              {product.discount}% OFF
            </span>
          )}

          {/* Tags */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {product.tags.includes('new') && (
              <span className="bg-gold text-maroon text-[10px] font-bold px-2 py-0.5 rounded-full small-caps">New</span>
            )}
            {product.tags.includes('handloom') && (
              <span className="bg-ivory/90 text-maroon text-[10px] font-bold px-2 py-0.5 rounded-full small-caps">Handloom</span>
            )}
          </div>
        </Link>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-maroon-dark/80 to-transparent">
          <button
            onClick={() => add(product)}
            className="flex-1 bg-ivory text-maroon text-sm font-medium py-2 rounded-md hover:bg-gold transition-colors flex items-center justify-center gap-1.5"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-maroon text-ivory px-3 py-2 rounded-md hover:bg-maroon-light transition-colors"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => wishlistToggle(product)}
          className="absolute top-3 right-3 z-20 hidden"
          aria-hidden="true"
        />
      </div>

      {/* Wishlist heart - separate positioned element */}
      <button
        onClick={() => wishlistToggle(product)}
        className={cn(
          'absolute top-12 right-3 z-20 h-9 w-9 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center transition-all',
          'opacity-0 group-hover:opacity-100 hover:bg-ivory'
        )}
        aria-label={hasWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        style={{ position: 'relative', top: '-4rem', left: 'calc(100% - 2.75rem)', marginBottom: '-2.25rem' }}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-all',
            hasWishlisted ? 'fill-destructive text-destructive' : 'text-charcoal'
          )}
        />
      </button>

      {/* Info */}
      <div className="pt-3 pb-1 text-center">
        <p className="text-[10px] text-gold-dark small-caps tracking-widest mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-sm md:text-base text-charcoal hover:text-maroon transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs text-charcoal/40">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="font-serif text-base text-maroon">{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-charcoal/40 line-through">{formatINR(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

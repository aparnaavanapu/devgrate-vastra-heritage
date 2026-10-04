'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useUI } from '@/store/ui-store';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import { TempleBorder } from '@/components/ornaments';

const navLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=Silk', label: 'Silk' },
  { href: '/shop?category=Banarasi', label: 'Banarasi' },
  { href: '/shop?category=Kanjivaram', label: 'Kanjivaram' },
  { href: '/shop?category=Bridal', label: 'Bridal' },
  { href: '/about', label: 'Our Story' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const { isScrolled, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useUI();
  const cartCount = useCartStore((s) => s.getCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useCartStore((s) => s.openCart);
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-500',
          isScrolled
            ? 'bg-maroon/95 backdrop-blur-md shadow-lg'
            : 'bg-maroon'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-ivory hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
              <span className="font-serif text-xl md:text-2xl text-ivory tracking-wide">
                {siteConfig.name}
              </span>
              <span className="hidden md:block text-[10px] text-gold small-caps tracking-[0.3em] -mt-1">
                {siteConfig.tagline}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm text-ivory/90 hover:text-gold transition-colors relative group',
                    pathname === link.href && 'text-gold'
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="text-ivory hover:text-gold transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/account"
                className="text-ivory hover:text-gold transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                href="/wishlist"
                className="text-ivory hover:text-gold transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-maroon text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                className="text-ivory hover:text-gold transition-colors relative"
                onClick={openCart}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-maroon text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="text-gold/30 h-2">
          <TempleBorder className="w-full h-2" />
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-maroon md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gold/20">
              <span className="font-serif text-xl text-ivory">{siteConfig.name}</span>
              <button
                className="text-ivory hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-lg text-ivory hover:text-gold border-b border-gold/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/account"
                className="block py-3 text-lg text-ivory hover:text-gold border-b border-gold/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart-store';
import { useUI } from '@/store/ui-store';
import { formatINR } from '@/lib/utils';
import { siteConfig } from '@/data/site';
import { OrnamentalDivider } from '@/components/ornaments';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, remove, couponCode, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingFree = subtotal >= siteConfig.shipping.freeAbove || subtotal === 0;
  const shipping = shippingFree ? 0 : siteConfig.shipping.standardCharge;

  const couponDiscount = couponCode ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponInput, subtotal }),
    });
    const data = await res.json();
    if (data.valid) {
      applyCoupon(data.code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError(data.message || 'Invalid coupon code');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-ivory p-0 flex flex-col overflow-y-auto"
      >
        <SheetHeader className="bg-maroon text-ivory p-5 pb-4">
          <SheetTitle className="font-serif text-xl text-ivory flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gold/30 mb-4" />
            <p className="font-serif text-xl text-charcoal mb-2">Your cart is empty</p>
            <p className="text-sm text-charcoal/60 mb-6">Discover our handwoven sarees</p>
            <Button asChild className="bg-maroon text-ivory hover:bg-maroon-light">
              <Link href="/shop" onClick={closeCart}>Explore Collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 bg-card border border-gold/20 rounded-lg p-3"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-md border border-gold/20"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-serif text-sm text-charcoal hover:text-maroon line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-charcoal/60 mt-1">{item.product.color}</p>
                      <p className="text-sm font-medium text-maroon mt-1">{formatINR(item.product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-7 w-7 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-7 w-7 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => remove(item.product.id)}
                          className="ml-auto text-charcoal/40 hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Coupon + Summary */}
            <div className="border-t border-gold/20 p-4 bg-parchment/30 space-y-3">
              {couponCode ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-maroon font-medium">Coupon: {couponCode}</span>
                  <button onClick={removeCoupon} className="text-xs text-destructive hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={handleApplyCoupon}
                    className="bg-maroon text-ivory hover:bg-maroon-light"
                  >
                    Apply
                  </Button>
                </div>
              )}
              {couponError && <p className="text-xs text-destructive">{couponError}</p>}

              <OrnamentalDivider className="opacity-50" />

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{shippingFree ? 'FREE' : formatINR(shipping)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-maroon">
                    <span>Discount</span>
                    <span>-{formatINR(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-lg text-charcoal pt-1">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              {!shippingFree && subtotal > 0 && (
                <p className="text-xs text-center text-gold-dark">
                  Add {formatINR(siteConfig.shipping.freeAbove - subtotal)} more for free shipping
                </p>
              )}

              <Button asChild className="w-full bg-maroon text-ivory hover:bg-maroon-light h-12 font-serif text-base" onClick={closeCart}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-maroon text-maroon hover:bg-maroon/5">
                <Link href="/cart" onClick={closeCart}>View Full Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

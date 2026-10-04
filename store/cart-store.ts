'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      add: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, { product, quantity }], isOpen: true });
        }
      },
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().remove(productId);
          return;
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clear: () => set({ items: [], couponCode: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      applyCoupon: (code) => set({ couponCode: code }),
      removeCoupon: () => set({ couponCode: null }),
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'vastra-cart' }
  )
);

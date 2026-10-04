'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items;
        if (items.find((i) => i.id === product.id)) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== productId) })),
      has: (productId) => get().items.some((i) => i.id === productId),
      clear: () => set({ items: [] }),
    }),
    { name: 'vastra-wishlist' }
  )
);

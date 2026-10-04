'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  slugs: string[];
  add: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      add: (slug) =>
        set((s) => ({
          slugs: [slug, ...s.slugs.filter((sl) => sl !== slug)].slice(0, 8),
        })),
      clear: () => set({ slugs: [] }),
    }),
    { name: 'vastra-recently-viewed' }
  )
);

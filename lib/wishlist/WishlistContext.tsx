"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type WishlistItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  onSale: boolean;
};

const STORAGE_KEY = "kannya-wishlist-v1";

type WishlistContextValue = {
  items: WishlistItem[];
  hydrated: boolean;
  count: number;
  isInWishlist: (id: string) => boolean;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const isInWishlist = useCallback(
    (id: string) => items.some((x) => x.id === id),
    [items]
  );

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === item.id)) {
        return prev.filter((x) => x.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const count = items.length;

  const value = useMemo(
    () => ({
      items,
      hydrated,
      count,
      isInWishlist,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist,
    }),
    [items, hydrated, count, isInWishlist, addItem, removeItem, toggleItem, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
}

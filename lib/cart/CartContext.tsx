"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  qty: number;
  onSale: boolean;
};

const STORAGE_KEY = "kannya-cart-v1";

type CartContextValue = {
  items: CartLine[];
  hydrated: boolean;
  addItem: (payload: Omit<CartLine, "qty"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
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

  const addItem = useCallback(
    (payload: Omit<CartLine, "qty"> & { qty?: number }) => {
      const addQty = payload.qty ?? 1;
      const line: Omit<CartLine, "qty"> = {
        id: payload.id,
        title: payload.title,
        image: payload.image,
        price: payload.price,
        oldPrice: payload.oldPrice,
        onSale: payload.onSale,
      };
      setItems((prev) => {
        const i = prev.findIndex((x) => x.id === line.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + addQty };
          return next;
        }
        return [...prev, { ...line, qty: addQty }];
      });
    },
    []
  );

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty } : x))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      addItem,
      setQty,
      removeItem,
      clearCart,
      itemCount,
    }),
    [items, hydrated, addItem, setQty, removeItem, clearCart, itemCount]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

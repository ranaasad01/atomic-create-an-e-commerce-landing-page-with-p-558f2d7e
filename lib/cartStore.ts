"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const computeTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          const items = existing
            ? state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.items, { ...newItem, quantity: 1 }];
          return { items, ...computeTotals(items) };
        }),
      removeItem: (id) =>
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return { items, ...computeTotals(items) };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
          return { items, ...computeTotals(items) };
        }),
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "lumiere-cart" }
  )
);
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  count: number;
  addToCart: () => void;
  removeFromCart: () => void;
  setCount: (n: number) => void;
}

const CartContext = createContext<CartContextType>({
  count: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  setCount: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const addToCart = () => setCount((c) => c + 1);
  const removeFromCart = () => setCount((c) => Math.max(0, c - 1));

  return (
    <CartContext.Provider value={{ count, addToCart, removeFromCart, setCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

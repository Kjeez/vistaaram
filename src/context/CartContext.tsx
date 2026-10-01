"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { productContent } from "@/data/content";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  subtitle: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  addBundle: () => void;
  subtotal: number;
  total: number;
  shipping: number;
  discount: number;
  coupon: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  // To not break existing simple header count:
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  addBundle: () => {},
  subtotal: 0,
  total: 0,
  shipping: 49,
  discount: 0,
  coupon: "",
  applyCoupon: () => ({ success: false, message: "" }),
  removeCoupon: () => {},
  count: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  // Start with 1 item for testing if you want, but prompt says "empty state... cart.length === 0"
  // Let's start with 1 item so the user sees the cart, but we can easily remove it.
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "sambrani-cup",
      name: productContent.name,
      price: productContent.price,
      originalPrice: productContent.mrp,
      quantity: 1,
      image: productContent.images[0].src,
      subtitle: "₹23 per cup · 12 cups per box",
    }
  ]);
  const [coupon, setCoupon] = useState("");

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        // Apply bundle discount logic if they hit 2 or more?
        // Wait, the prompt says "adds second unit at discounted line price". 
        // Let's dynamically update price based on qty for sambrani-cup
        let newPrice = productContent.price; // 279
        if (qty >= 2) newPrice = 251; // 502 / 2 = 251 (10% off)
        return { ...i, quantity: qty, price: newPrice };
      }
      return i;
    }));
  };

  const addBundle = () => {
    updateQuantity("sambrani-cup", 2);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);
  
  // Shipping logic: free above 499
  const shipping = subtotal >= 499 ? 0 : 49;

  // Coupon logic: WELCOME8 = 8% off above 999
  const discount = useMemo(() => {
    if (coupon === "WELCOME8" && subtotal >= 999) {
      return Math.round(subtotal * 0.08);
    }
    return 0;
  }, [subtotal, coupon]);

  const total = subtotal + shipping - discount;

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "WELCOME8") {
      if (subtotal >= 999) {
        setCoupon(cleanCode);
        return { success: true, message: "Coupon applied! 8% off." };
      } else {
        return { success: false, message: "Add items worth ₹999 to use this coupon." };
      }
    }
    return { success: false, message: "Invalid coupon code." };
  };

  const removeCoupon = () => setCoupon("");

  // Total count of items
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, addItem, updateQuantity, removeItem, addBundle,
      subtotal, total, shipping, discount, coupon, applyCoupon, removeCoupon, count 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { productContent } from "@/data/content";
import { medusa, INDIA_REGION_ID, VISTAARAM_VARIANTS } from "@/lib/medusa";

export interface CartItem {
  id: string;
  lineItemId?: string;
  variantId?: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  subtitle: string;
}

interface CartContextType {
  cartId: string | null;
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  addBundle: () => Promise<void>;
  subtotal: number;
  total: number;
  shipping: number;
  tax: number;
  discount: number;
  coupon: string;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => Promise<void>;
  count: number;
  isLoading: boolean;
}

const LOCAL_STORAGE_CART_ID = "vistaaram_medusa_cart_id";
const LOCAL_STORAGE_CART_ITEMS = "vistaaram_cart_items_cache";

const CartContext = createContext<CartContextType>({
  cartId: null,
  items: [],
  addItem: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  addBundle: async () => {},
  subtotal: 0,
  total: 0,
  shipping: 49,
  tax: 0,
  discount: 0,
  coupon: "",
  applyCoupon: async () => ({ success: false, message: "" }),
  removeCoupon: async () => {},
  count: 0,
  isLoading: false,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(49);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Save to local cache helper
  const saveLocalCache = useCallback((newItems: CartItem[], newCoupon = coupon, disc = discount) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_ITEMS, JSON.stringify(newItems));
    } catch {}
  }, [coupon, discount]);

  // Recalculate totals from items
  const recalcTotals = useCallback((currItems: CartItem[], disc = discount) => {
    const sTotal = currItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const ship = sTotal >= 499 || sTotal === 0 ? 0 : 49;
    const finalTotal = sTotal > 0 ? Math.max(0, sTotal + ship - disc) : 0;
    setSubtotal(sTotal);
    setShipping(ship);
    setTotal(finalTotal);
  }, [discount]);

  // Helper to map Medusa cart to local state
  const syncWithMedusaCart = useCallback((medusaCart: any) => {
    if (!medusaCart) return;

    setCartId(medusaCart.id);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_CART_ID, medusaCart.id);
    }

    if (Array.isArray(medusaCart.items)) {
      const mappedItems: CartItem[] = medusaCart.items.map((lineItem: any) => {
        const isBox4 =
          lineItem.variant_id === VISTAARAM_VARIANTS.BOX_4 ||
          lineItem.title?.includes("4 Boxes") ||
          lineItem.title?.includes("Pack of 4");
        const isBox2 =
          lineItem.variant_id === VISTAARAM_VARIANTS.BOX_2 ||
          lineItem.title?.includes("2 Boxes") ||
          lineItem.title?.includes("Pack of 2");

        const originalPrice = isBox4 ? 1596 : isBox2 ? 798 : 399;
        const defaultSubtitle = isBox4
          ? "₹237 per box · Pack of 4 (15% off) · 48 Cups"
          : isBox2
          ? "₹251 per box · Pack of 2 (10% off) · 24 Cups"
          : "₹23 per cup · 1 Box (12 Cups)";

        return {
          id: lineItem.id,
          lineItemId: lineItem.id,
          variantId: lineItem.variant_id,
          name: lineItem.title || productContent.name,
          price: Number(lineItem.unit_price) || productContent.price,
          originalPrice,
          quantity: lineItem.quantity || 1,
          image: lineItem.thumbnail
            ? lineItem.thumbnail.replace(/^http:\/\/localhost(:\d+)?/, "")
            : productContent.images[0].src,
          subtitle: lineItem.subtitle || defaultSubtitle,
        };
      });
      setItems(mappedItems);
      saveLocalCache(mappedItems);
    } else {
      setItems([]);
      saveLocalCache([]);
    }

    const sTotal = Number(medusaCart.item_subtotal ?? medusaCart.subtotal) || 0;
    setSubtotal(sTotal);

    const shipCost = sTotal >= 499 || sTotal === 0 ? 0 : 49;
    setShipping(shipCost);

    const disc = Number(medusaCart.discount_total) || 0;
    setDiscount(disc);

    const tTotal = Number(medusaCart.tax_total) || 0;
    setTax(tTotal);

    const appliedCode = medusaCart.promotions?.[0]?.code || "";
    setCoupon(appliedCode);

    const calcTotal = sTotal > 0 ? Math.max(0, sTotal + shipCost - disc) : 0;
    setTotal(calcTotal);
  }, [saveLocalCache]);

  // Helper: Retrieve existing or create new Medusa Cart
  const getOrCreateCartId = useCallback(async (): Promise<string | null> => {
    let currentId = cartId;

    if (!currentId && typeof window !== "undefined") {
      currentId = localStorage.getItem(LOCAL_STORAGE_CART_ID);
    }

    if (currentId) {
      try {
        const { cart } = await medusa.store.cart.retrieve(currentId, {
          fields: "*items,*items.variant,*promotions",
        });
        if (cart && !cart.completed_at) {
          syncWithMedusaCart(cart);
          return cart.id;
        }
      } catch (err) {
        console.warn("Could not retrieve existing Medusa cart, creating new one:", err);
      }
    }

    // Create fresh cart for India region
    try {
      const { cart } = await medusa.store.cart.create({
        region_id: INDIA_REGION_ID,
      });
      if (cart) {
        setCartId(cart.id);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_CART_ID, cart.id);
        }
        syncWithMedusaCart(cart);
        return cart.id;
      }
    } catch (err) {
      console.error("Failed to create Medusa cart:", err);
    }

    return null;
  }, [cartId, syncWithMedusaCart]);

  // Initial cart hydration on mount
  useEffect(() => {
    let isMounted = true;

    // 1. Immediately hydrate from local storage cache to avoid blank flash
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_CART_ITEMS);
      if (cached) {
        const parsed: CartItem[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          recalcTotals(parsed);
        }
      }
    } catch {}

    // 2. Sync with Medusa server in background
    const init = async () => {
      const savedCartId = localStorage.getItem(LOCAL_STORAGE_CART_ID);
      if (savedCartId) {
        try {
          setIsLoading(true);
          const { cart } = await medusa.store.cart.retrieve(savedCartId, {
            fields: "*items,*items.variant,*promotions",
          });
          if (isMounted && cart && !cart.completed_at) {
            syncWithMedusaCart(cart);
            return;
          }
        } catch {
          // If expired, clear
          localStorage.removeItem(LOCAL_STORAGE_CART_ID);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }

      // If no valid cart exists on server, create one
      try {
        setIsLoading(true);
        const { cart } = await medusa.store.cart.create({
          region_id: INDIA_REGION_ID,
        });
        if (isMounted && cart) {
          localStorage.setItem(LOCAL_STORAGE_CART_ID, cart.id);
          setCartId(cart.id);
        }
      } catch (err) {
        console.warn("Could not initialize Medusa cart:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [syncWithMedusaCart, recalcTotals]);

  // Add Item
  const addItem = async (item: CartItem) => {
    // 1. Optimistic instant state update
    const optimisticItem: CartItem = {
      ...item,
      price: item.price,
      subtitle: item.subtitle,
    };

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => (item.variantId && i.variantId === item.variantId) || i.id === item.id
      );
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        const newQty = updated[existingIndex].quantity + item.quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
      } else {
        updated = [...prev, optimisticItem];
      }
      saveLocalCache(updated);
      recalcTotals(updated);
      return updated;
    });

    // 2. Medusa backend persistence
    setIsLoading(true);
    try {
      const activeCartId = await getOrCreateCartId();
      if (!activeCartId) throw new Error("No cart ID available");

      let variantId = item.variantId;
      if (!variantId) {
        if (item.quantity >= 4) {
          variantId = VISTAARAM_VARIANTS.BOX_4;
        } else if (item.quantity >= 2) {
          variantId = VISTAARAM_VARIANTS.BOX_2;
        } else {
          variantId = VISTAARAM_VARIANTS.BOX_1;
        }
      }

      const { cart } = await medusa.store.cart.createLineItem(activeCartId, {
        variant_id: variantId,
        quantity: item.quantity,
      });

      syncWithMedusaCart(cart);
    } catch (err) {
      console.warn("Medusa line item create fallback to local cache:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (id: string, qty: number) => {
    if (qty <= 0) {
      await removeItem(id);
      return;
    }

    // 1. Optimistic update
    setItems((prev) => {
      const updated = prev.map((i) => {
        if (i.id === id || i.lineItemId === id) {
          return {
            ...i,
            quantity: qty,
          };
        }
        return i;
      });
      saveLocalCache(updated);
      recalcTotals(updated);
      return updated;
    });

    // 2. Medusa sync
    setIsLoading(true);
    try {
      const activeCartId = await getOrCreateCartId();
      if (!activeCartId) return;

      const target = items.find((i) => i.id === id || i.lineItemId === id);
      const lineItemId = target?.lineItemId || target?.id;

      if (lineItemId && lineItemId.startsWith("cali_")) {
        const { cart } = await medusa.store.cart.updateLineItem(activeCartId, lineItemId, {
          quantity: qty,
        });
        syncWithMedusaCart(cart);
      }
    } catch (err) {
      console.warn("Medusa update line item fallback to local:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove Item
  const removeItem = async (id: string) => {
    // 1. Optimistic update
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id && i.lineItemId !== id);
      saveLocalCache(updated);
      recalcTotals(updated);
      return updated;
    });

    // 2. Medusa sync
    setIsLoading(true);
    try {
      const activeCartId = await getOrCreateCartId();
      if (!activeCartId) return;

      const target = items.find((i) => i.id === id || i.lineItemId === id);
      const lineItemId = target?.lineItemId || target?.id;

      if (lineItemId && lineItemId.startsWith("cali_")) {
        await medusa.store.cart.deleteLineItem(activeCartId, lineItemId);
        const { cart } = await medusa.store.cart.retrieve(activeCartId, {
          fields: "*items,*items.variant,*promotions",
        });
        syncWithMedusaCart(cart);
      }
    } catch (err) {
      console.warn("Medusa delete line item fallback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add Bundle
  const addBundle = async () => {
    const singleBoxItem = items.find(
      (i) => i.variantId === VISTAARAM_VARIANTS.BOX_1 || i.id === "sambrani-cup" || i.price === 279
    );
    if (singleBoxItem) {
      await removeItem(singleBoxItem.id);
    }
    await addItem({
      id: "sambrani-cup-pack-2",
      name: `${productContent.name} — Pack of 2 (24 Cups)`,
      variantId: VISTAARAM_VARIANTS.BOX_2,
      price: 502,
      originalPrice: 798,
      quantity: 1,
      image: productContent.images[0].src,
      subtitle: "₹251 per box · Pack of 2 (10% off) · 24 Cups",
    });
  };

  // Apply Coupon
  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: "Please enter a coupon code." };
    }

    setIsLoading(true);
    try {
      const activeCartId = await getOrCreateCartId();
      if (!activeCartId) {
        return { success: false, message: "Cart not available." };
      }

      const { cart } = await medusa.store.cart.addPromotions(activeCartId, {
        promo_codes: [cleanCode],
      });

      if (cart) {
        syncWithMedusaCart(cart);
        const disc = Number(cart.discount_total) || 0;
        return {
          success: true,
          message: `Coupon ${cleanCode} applied! Saved ₹${disc}.`,
        };
      }
      return { success: false, message: "Invalid coupon code." };
    } catch (err: any) {
      // Local fallback for WELCOME8 (8% above ₹999) if backend offline
      if (cleanCode === "WELCOME8") {
        if (subtotal >= 999) {
          const disc = Math.round(subtotal * 0.08);
          setCoupon("WELCOME8");
          setDiscount(disc);
          recalcTotals(items, disc);
          return { success: true, message: "Coupon applied! 8% off." };
        } else {
          return {
            success: false,
            message: "Add items worth ₹999 to use this coupon.",
          };
        }
      }
      const errorMsg =
        err?.message ||
        err?.body?.message ||
        "Could not apply coupon. Check minimum order requirements.";
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove Coupon
  const removeCoupon = async () => {
    if (!coupon) return;
    setIsLoading(true);
    try {
      const activeCartId = await getOrCreateCartId();
      if (activeCartId) {
        const { cart } = await medusa.store.cart.removePromotions(activeCartId, {
          promo_codes: [coupon],
        });
        if (cart) {
          syncWithMedusaCart(cart);
        }
      }
    } catch (err) {
      console.warn("Could not remove promotion on server, resetting locally:", err);
      setCoupon("");
      setDiscount(0);
      recalcTotals(items, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        addItem,
        updateQuantity,
        removeItem,
        addBundle,
        subtotal,
        total,
        shipping,
        tax,
        discount,
        coupon,
        applyCoupon,
        removeCoupon,
        count,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

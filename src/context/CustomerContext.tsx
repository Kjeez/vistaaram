"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { medusa } from "@/lib/medusa";
import { useCart } from "@/context/CartContext";
import {
  addToWishlist,
  Customer,
  CUSTOMER_FIELDS,
  decodeToken,
  fetchWishlist,
  findGuestOrders,
  removeFromWishlist,
} from "@/lib/account";

const CART_ID_KEY = "vistaaram_medusa_cart_id";

interface CustomerContextType {
  customer: Customer | null;
  /** True until the first session check finishes. */
  loading: boolean;
  refresh: () => Promise<Customer | null>;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => Promise<void>;
  startGoogleLogin: () => Promise<void>;
  completeGoogleLogin: (query: Record<string, string>) => Promise<{ claimed: number; emailed: number }>;
  logout: () => Promise<void>;
  wishlist: Set<string>;
  toggleWishlist: (productId: string) => Promise<boolean>;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { resetCart } = useCart();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const loadWishlist = useCallback(async () => {
    try {
      const items = await fetchWishlist();
      setWishlist(new Set(items.map((i) => i.product_id)));
    } catch {
      setWishlist(new Set());
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { customer } = await medusa.store.customer.retrieve({ fields: CUSTOMER_FIELDS });
      setCustomer(customer);
      return customer;
    } catch {
      setCustomer(null);
      return null;
    }
  }, []);

  // Attach the anonymous cart to the account so it follows the shopper across devices.
  const adoptCart = useCallback(async () => {
    try {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) await medusa.store.cart.transferCart(cartId);
    } catch {
      // A completed or foreign cart can't be transferred; the shopper keeps browsing either way.
    }
  }, []);

  const afterLogin = useCallback(async () => {
    await adoptCart();
    const c = await refresh();
    if (c) await loadWishlist();
  }, [adoptCart, refresh, loadWishlist]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const c = await refresh();
      if (c && !cancelled) await loadWishlist();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh, loadWishlist]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await medusa.auth.login("customer", "emailpass", { email: email.trim().toLowerCase(), password });
      if (typeof result !== "string") throw new Error("Unexpected login response. Please try again.");
      await afterLogin();
    },
    [afterLogin]
  );

  const register = useCallback(
    async ({ email, password, firstName, lastName, phone }: Parameters<CustomerContextType["register"]>[0]) => {
      const normalized = email.trim().toLowerCase();
      await medusa.auth.register("customer", "emailpass", { email: normalized, password });
      await medusa.store.customer.create({
        email: normalized,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone?.trim() || undefined,
      });
      // The registration token has no customer attached; log in for one that does.
      await medusa.auth.login("customer", "emailpass", { email: normalized, password });
      await afterLogin();
    },
    [afterLogin]
  );

  const startGoogleLogin = useCallback(async () => {
    const result = await medusa.auth.login("customer", "google", {});
    if (typeof result === "object" && "location" in result && result.location) {
      window.location.href = result.location;
      return;
    }
    throw new Error("Google sign-in is unavailable right now.");
  }, []);

  const completeGoogleLogin = useCallback(
    async (query: Record<string, string>) => {
      const token = await medusa.auth.callback("customer", "google", query);
      if (typeof token !== "string") throw new Error("Google sign-in could not be completed.");

      const payload = decodeToken(token);
      if (!payload?.actor_id) {
        // First Google sign-in: create the customer from Google's profile, then get a token for it.
        const meta = (payload?.user_metadata ?? {}) as Record<string, string | undefined>;
        if (!meta.email) throw new Error("Google didn't share an email address for this account.");
        await medusa.store.customer.create({
          email: meta.email.toLowerCase(),
          first_name: meta.given_name ?? "",
          last_name: meta.family_name ?? "",
        });
        await medusa.auth.refresh();
      }
      await afterLogin();
      try {
        return await findGuestOrders();
      } catch {
        return { claimed: 0, emailed: 0 };
      }
    },
    [afterLogin]
  );

  const logout = useCallback(async () => {
    try {
      await medusa.auth.logout();
    } catch {}
    setCustomer(null);
    setWishlist(new Set());
    // The cart now belongs to the account; start the next visitor with a fresh one.
    resetCart();
  }, [resetCart]);

  const toggleWishlist = useCallback(
    async (productId: string) => {
      const saved = wishlist.has(productId);
      setWishlist((prev) => {
        const next = new Set(prev);
        if (saved) next.delete(productId);
        else next.add(productId);
        return next;
      });
      try {
        if (saved) await removeFromWishlist(productId);
        else await addToWishlist(productId);
        return !saved;
      } catch (err) {
        await loadWishlist();
        throw err;
      }
    },
    [wishlist, loadWishlist]
  );

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        refresh,
        login,
        register,
        startGoogleLogin,
        completeGoogleLogin,
        logout,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used inside CustomerProvider");
  return ctx;
}

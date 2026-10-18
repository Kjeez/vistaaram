import { medusa } from "@/lib/medusa";

export type Customer = Awaited<ReturnType<typeof medusa.store.customer.retrieve>>["customer"];
export type CustomerAddress = NonNullable<Customer["addresses"]>[number];

export const GOOGLE_LOGIN_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === "true";

export const CUSTOMER_FIELDS = "id,email,first_name,last_name,phone,has_account,metadata,*addresses";

/** Reads a JWT payload without verifying it (the server does that); used to check actor_id. */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(payload))));
  } catch {
    return null;
  }
}

/** Turns Medusa/SDK errors into a sentence fit for the shopper. */
export function errorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  const message = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  if (!message) return fallback;
  if (/invalid email or password/i.test(message)) return "Incorrect email or password.";
  if (/identity with email already exists/i.test(message)) return "An account with this email already exists. Please log in.";
  if (/unauthorized/i.test(message)) return "Please log in again.";
  return message;
}

// ---- Wishlist ----

export type WishlistEntry = {
  id: string;
  product_id: string;
  product: { id: string; title: string; handle: string; thumbnail: string | null } | null;
};

export async function fetchWishlist() {
  const { wishlist } = await medusa.client.fetch<{ wishlist: WishlistEntry[] }>("/store/customers/me/wishlist");
  return wishlist;
}

export async function addToWishlist(productId: string) {
  await medusa.client.fetch("/store/customers/me/wishlist", {
    method: "POST",
    body: { product_id: productId },
  });
}

export async function removeFromWishlist(productId: string) {
  await medusa.client.fetch(`/store/customers/me/wishlist/${productId}`, { method: "DELETE" });
}

// ---- Reviews ----

export type Review = {
  id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  content: string;
  verified_purchase: boolean;
  created_at: string;
};

export type ReviewSummary = {
  count: number;
  average: number;
  distribution: { stars: number; count: number }[];
};

export async function fetchProductReviews(productId: string) {
  return medusa.client.fetch<{ reviews: Review[]; summary: ReviewSummary }>(
    `/store/products/${productId}/reviews`
  );
}

export async function fetchMyReviews() {
  const { reviews } = await medusa.client.fetch<{
    reviews: { id: string; product_id: string; status: "pending" | "approved" | "rejected" }[];
  }>("/store/customers/me/reviews");
  return reviews;
}

export async function submitReview(input: { product_id: string; rating: number; title?: string; content: string }) {
  await medusa.client.fetch("/store/customers/me/reviews", { method: "POST", body: input });
}

// ---- Orders ----

/**
 * Finds guest orders placed with this account's email. Google accounts get them linked right
 * away (`claimed`); email/password accounts get a confirmation email per order (`emailed`).
 */
export async function findGuestOrders() {
  return medusa.client.fetch<{ claimed: number; emailed: number }>("/store/customers/me/find-orders", {
    method: "POST",
  });
}

export type ReturnOption = { id: string; name: string; amount: number };

export async function fetchReturnOptions() {
  const { return_options } = await medusa.client.fetch<{ return_options: ReturnOption[] }>("/store/return-options");
  return return_options;
}

export async function fetchReturnReasons() {
  const { return_reasons } = await medusa.client.fetch<{
    return_reasons: { id: string; label: string; value: string }[];
  }>("/store/return-reasons");
  return return_reasons;
}

export async function createReturn(input: {
  order_id: string;
  items: { id: string; quantity: number; reason_id?: string; note?: string }[];
  return_shipping: { option_id: string };
  note?: string;
}) {
  return medusa.client.fetch("/store/returns", { method: "POST", body: input });
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: "Placed",
  completed: "Completed",
  canceled: "Cancelled",
  archived: "Archived",
  requires_action: "Needs attention",
  draft: "Draft",
};

export const FULFILLMENT_STATUS_LABEL: Record<string, string> = {
  not_fulfilled: "Processing",
  partially_fulfilled: "Partially packed",
  fulfilled: "Packed",
  partially_shipped: "Partially shipped",
  shipped: "Shipped",
  partially_delivered: "Partially delivered",
  delivered: "Delivered",
  canceled: "Cancelled",
};

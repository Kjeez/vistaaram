import { medusa } from "@/lib/medusa";

export const COD_PROVIDER_ID = "pp_system_default";
export const RAZORPAY_PROVIDER_ID = "pp_razorpay_razorpay";

export type PaymentMethod = "razorpay" | "cod";

export const CHECKOUT_CART_FIELDS =
  "id,email,currency_code,completed_at,*items,*items.variant,*shipping_address,*shipping_methods," +
  "*payment_collection,*payment_collection.payment_sessions,*promotions," +
  "+item_total,+item_subtotal,+subtotal,+shipping_total,+discount_total,+tax_total,+total";

export interface CheckoutAddress {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export function validateAddress(a: CheckoutAddress): Partial<Record<keyof CheckoutAddress, string>> {
  const errors: Partial<Record<keyof CheckoutAddress, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(a.phone))) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!a.firstName.trim()) errors.firstName = "First name is required.";
  if (!a.address1.trim() || a.address1.trim().length < 5) errors.address1 = "Enter your house / street address.";
  if (!a.city.trim()) errors.city = "City is required.";
  if (!a.state) errors.state = "Select your state.";
  if (!/^[1-9]\d{5}$/.test(a.pincode.trim())) errors.pincode = "Enter a valid 6-digit pincode.";
  return errors;
}

/** Strips spaces, dashes and a leading +91 / 0 so only the 10-digit number remains. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
}

export async function retrieveCheckoutCart(cartId: string) {
  const { cart } = await medusa.store.cart.retrieve(cartId, { fields: CHECKOUT_CART_FIELDS });
  return cart;
}

/** Saves contact + address, then returns the shipping options available for the cart. */
export async function saveAddress(cartId: string, a: CheckoutAddress) {
  const address = {
    first_name: a.firstName.trim(),
    last_name: a.lastName.trim(),
    address_1: a.address1.trim(),
    address_2: a.address2.trim(),
    city: a.city.trim(),
    province: a.state,
    postal_code: a.pincode.trim(),
    country_code: "in",
    phone: `+91${normalizePhone(a.phone)}`,
  };
  await medusa.store.cart.update(cartId, {
    email: a.email.trim().toLowerCase(),
    shipping_address: address,
    billing_address: address,
  });
  const { shipping_options } = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
  return shipping_options;
}

export async function setShippingMethod(cartId: string, optionId: string) {
  await medusa.store.cart.addShippingMethod(cartId, { option_id: optionId });
  return retrieveCheckoutCart(cartId);
}

/** Creates (or refreshes) the payment session for the chosen method and returns its data. */
export async function initiatePayment(cartId: string, method: PaymentMethod) {
  const cart = await retrieveCheckoutCart(cartId);
  const providerId = method === "cod" ? COD_PROVIDER_ID : RAZORPAY_PROVIDER_ID;
  const { payment_collection } = await medusa.store.payment.initiatePaymentSession(cart, {
    provider_id: providerId,
  });
  const session = payment_collection?.payment_sessions?.find((s) => s.provider_id === providerId);
  if (!session) throw new Error("Could not start payment. Please try again.");
  return { cart, session };
}

export async function completeCart(cartId: string) {
  const result = await medusa.store.cart.complete(cartId);
  if (result.type === "order") return result.order;
  throw new Error(result.error?.message || "We couldn't place your order. Please try again.");
}

export async function listPaymentProviders(regionId: string) {
  const { payment_providers } = await medusa.store.payment.listPaymentProviders({ region_id: regionId });
  return payment_providers.map((p) => p.id);
}

export function formatINR(amount: number | null | undefined) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

// ---- Razorpay Checkout (https://checkout.razorpay.com/v1/checkout.js) ----

export interface RazorpaySuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: "payment.failed", cb: (resp: { error: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

/**
 * Opens Razorpay Checkout for the session's order. Resolves on payment success,
 * rejects when the shopper closes the modal or the payment fails.
 */
export function openRazorpay(opts: {
  sessionData: Record<string, unknown>;
  address: CheckoutAddress;
}): Promise<RazorpaySuccess> {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Payment window failed to load. Check your connection and try again."));
      return;
    }
    const { sessionData, address } = opts;
    const rzp = new window.Razorpay({
      key: sessionData.key_id,
      order_id: sessionData.razorpay_order_id,
      amount: sessionData.amount,
      currency: sessionData.currency,
      name: "Vistaaram",
      description: "Natural Sambrani Hawan Cups",
      image: "/images/logo.png",
      prefill: {
        name: `${address.firstName} ${address.lastName}`.trim(),
        email: address.email,
        contact: `+91${normalizePhone(address.phone)}`,
      },
      notes: { session_id: sessionData.session_id },
      theme: { color: "#751E29" },
      handler: (resp: RazorpaySuccess) => resolve(resp),
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled. You can try again whenever you're ready.")),
      },
    });
    rzp.on("payment.failed", (resp) => {
      reject(new Error(resp.error?.description || "Payment failed. Please try again."));
    });
    rzp.open();
  });
}

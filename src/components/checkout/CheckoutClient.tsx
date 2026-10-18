"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import { INDIA_REGION_ID } from "@/lib/medusa";
import {
  CheckoutAddress,
  COD_PROVIDER_ID,
  INDIAN_STATES,
  PaymentMethod,
  RAZORPAY_PROVIDER_ID,
  completeCart,
  formatINR,
  initiatePayment,
  listPaymentProviders,
  normalizePhone,
  openRazorpay,
  retrieveCheckoutCart,
  saveAddress,
  setShippingMethod,
  validateAddress,
} from "@/lib/checkout";

type Cart = Awaited<ReturnType<typeof retrieveCheckoutCart>>;
type ShippingOption = Awaited<ReturnType<typeof saveAddress>>[number];

const EMPTY_ADDRESS: CheckoutAddress = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

const inputClass =
  "w-full rounded-lg border border-[#E5DCC8] bg-white px-4 py-3 text-[15px] text-[#4A3728] placeholder:text-[#B0A090] outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all duration-200";
const labelClass = "block text-[13px] font-medium text-[#5A4F46] mb-1.5";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block">
        <span className={labelClass}>{label}</span>
        {children}
      </label>
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

function addressFromCart(cart: Cart): CheckoutAddress | null {
  const a = cart.shipping_address;
  if (!a?.address_1) return null;
  return {
    email: cart.email || "",
    phone: normalizePhone(a.phone || ""),
    firstName: a.first_name || "",
    lastName: a.last_name || "",
    address1: a.address_1 || "",
    address2: a.address_2 || "",
    city: a.city || "",
    state: a.province || "",
    pincode: a.postal_code || "",
  };
}

export default function CheckoutClient() {
  const router = useRouter();
  const { resetCart } = useCart();
  const { customer } = useCustomer();

  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState<CheckoutAddress>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutAddress, string>>>({});
  const [step, setStep] = useState<"address" | "payment">("address");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  const [providers, setProviders] = useState<string[]>([]);
  const [method, setMethod] = useState<PaymentMethod>("razorpay");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Set once Razorpay reports success, so a failed order confirmation can be retried without paying twice.
  const [paidPaymentId, setPaidPaymentId] = useState<string | null>(null);

  const razorpayEnabled = providers.includes(RAZORPAY_PROVIDER_ID);
  const codEnabled = providers.includes(COD_PROVIDER_ID);

  // Load the cart and enabled payment providers once. CartContext persists the cart id to
  // localStorage, so reading it here avoids racing the context's own hydration.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      let id: string | null = null;
      try {
        id = localStorage.getItem("vistaaram_medusa_cart_id");
      } catch {}
      try {
        if (!id) return;
        const [c, p] = await Promise.all([
          retrieveCheckoutCart(id),
          listPaymentProviders(INDIA_REGION_ID).catch(() => [] as string[]),
        ]);
        if (cancelled) return;
        setCartId(id);
        setCart(c);
        setProviders(p);
        setMethod(p.includes(RAZORPAY_PROVIDER_ID) ? "razorpay" : "cod");
        const saved = addressFromCart(c);
        if (saved) setAddress(saved);
      } catch {
        if (!cancelled) setError("We couldn't load your cart. Please refresh the page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Prefill a signed-in shopper's details unless the cart already carries an address.
  const [prefilled, setPrefilled] = useState(false);
  if (customer && cart && !prefilled) {
    setPrefilled(true);
    if (!addressFromCart(cart)) {
      const a = customer.addresses?.find((x) => x.is_default_shipping) ?? customer.addresses?.[0];
      setAddress((prev) => ({
        ...prev,
        email: prev.email || customer.email,
        firstName: prev.firstName || a?.first_name || customer.first_name || "",
        lastName: prev.lastName || a?.last_name || customer.last_name || "",
        phone: prev.phone || normalizePhone(a?.phone || customer.phone || ""),
        address1: prev.address1 || a?.address_1 || "",
        address2: prev.address2 || a?.address_2 || "",
        city: prev.city || a?.city || "",
        state: prev.state || a?.province || "",
        pincode: prev.pincode || a?.postal_code || "",
      }));
    }
  }

  const items = cart?.items ?? [];
  const selectedShipping = cart?.shipping_methods?.[0];

  const update = (key: keyof CheckoutAddress) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = key === "pincode" ? e.target.value.replace(/\D/g, "").slice(0, 6) : e.target.value;
    setAddress((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId) return;
    const found = validateAddress(address);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setError("");
    try {
      const options = await saveAddress(cartId, address);
      if (!options.length) {
        throw new Error("Sorry, we don't deliver to this pincode yet. Please contact us on WhatsApp.");
      }
      setShippingOptions(options);
      const cheapest = [...options].sort((a, b) => Number(a.amount) - Number(b.amount))[0];
      setCart(await setShippingMethod(cartId, cheapest.id));
      setStep("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleShippingChange = async (optionId: string) => {
    if (!cartId || optionId === selectedShipping?.shipping_option_id) return;
    setBusy(true);
    try {
      setCart(await setShippingMethod(cartId, optionId));
    } catch {
      setError("Couldn't update delivery option. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const finishOrder = async () => {
    if (!cartId) return;
    const order = await completeCart(cartId);
    resetCart();
    router.replace(`/order/confirmed/${order.id}`);
  };

  const handlePlaceOrder = async () => {
    if (!cartId || busy) return;
    setBusy(true);
    setError("");
    try {
      if (paidPaymentId) {
        await finishOrder();
        return;
      }
      const { session } = await initiatePayment(cartId, method);
      if (method === "razorpay") {
        const result = await openRazorpay({ sessionData: session.data ?? {}, address });
        setPaidPaymentId(result.razorpay_payment_id);
      }
      await finishOrder();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const totals = useMemo(
    () => ({
      subtotal: Number(cart?.item_subtotal ?? cart?.item_total ?? 0),
      shipping: Number(cart?.shipping_total ?? 0),
      discount: Number(cart?.discount_total ?? 0),
      total: Number(cart?.total ?? 0),
    }),
    [cart]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-32 text-[#8E8783] text-[14px]">Loading checkout…</div>
    );
  }

  if (!cart || items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-24 gap-4">
        <h1 className="font-display text-[#7A1F2B] text-[2rem]">Your cart is empty</h1>
        {error && <p className="text-[14px] text-red-600">{error}</p>}
        <Link
          href="/product/natural-sambrani-hawan-cup"
          className="h-12 px-8 rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center"
        >
          Shop Sambrani Cups
        </Link>
      </div>
    );
  }

  return (
    <>
      {razorpayEnabled && <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />}

      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="font-display font-medium text-[#7A1F2B] text-[2.25rem] leading-tight mb-1">Checkout</h1>
        <p className="text-[#8E8783] text-[13px] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure checkout
        </p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start">
        {/* Left: steps */}
        <div className="w-full lg:w-[58%] flex flex-col gap-6">
          {/* Step 1: Address */}
          <section className="bg-white/60 border border-[#E6DED2] rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-[#7A1F2B] text-[20px]">1. Delivery details</h2>
              {step === "payment" && (
                <button
                  onClick={() => setStep("address")}
                  disabled={busy}
                  className="text-[13px] text-[#751E29] hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {step === "payment" ? (
              <div className="text-[14px] text-[#5A4F46] leading-relaxed">
                <p className="font-medium text-[#4A423C]">
                  {address.firstName} {address.lastName}
                </p>
                <p>
                  {address.address1}
                  {address.address2 && `, ${address.address2}`}
                </p>
                <p>
                  {address.city}, {address.state} – {address.pincode}
                </p>
                <p className="text-[#8E8783] mt-1">
                  +91 {normalizePhone(address.phone)} · {address.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContinue} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email *" error={errors.email} className="sm:col-span-2">
                  <input type="email" autoComplete="email" className={inputClass} value={address.email} onChange={update("email")} placeholder="you@example.com" />
                </Field>
                <Field label="First name *" error={errors.firstName}>
                  <input autoComplete="given-name" className={inputClass} value={address.firstName} onChange={update("firstName")} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input autoComplete="family-name" className={inputClass} value={address.lastName} onChange={update("lastName")} />
                </Field>
                <Field label="Mobile number *" error={errors.phone} className="sm:col-span-2">
                  <div className="flex">
                    <span className="flex items-center px-3 rounded-l-lg border border-r-0 border-[#E5DCC8] bg-[#FAF6EE] text-[14px] text-[#8E8783]">+91</span>
                    <input type="tel" inputMode="numeric" autoComplete="tel-national" className={`${inputClass} rounded-l-none`} value={address.phone} onChange={update("phone")} placeholder="98765 43210" />
                  </div>
                </Field>
                <Field label="House no., building, street *" error={errors.address1} className="sm:col-span-2">
                  <input autoComplete="address-line1" className={inputClass} value={address.address1} onChange={update("address1")} />
                </Field>
                <Field label="Area, landmark (optional)" className="sm:col-span-2">
                  <input autoComplete="address-line2" className={inputClass} value={address.address2} onChange={update("address2")} />
                </Field>
                <Field label="Pincode *" error={errors.pincode}>
                  <input inputMode="numeric" autoComplete="postal-code" className={inputClass} value={address.pincode} onChange={update("pincode")} />
                </Field>
                <Field label="City *" error={errors.city}>
                  <input autoComplete="address-level2" className={inputClass} value={address.city} onChange={update("city")} />
                </Field>
                <Field label="State *" error={errors.state} className="sm:col-span-2">
                  <select autoComplete="address-level1" className={inputClass} value={address.state} onChange={update("state")}>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <button
                  type="submit"
                  disabled={busy}
                  className="sm:col-span-2 mt-2 h-[52px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#5E1620] transition-colors disabled:opacity-60"
                >
                  {busy ? "Saving…" : "Continue to payment"}
                </button>
              </form>
            )}
          </section>

          {/* Step 2: Shipping + Payment */}
          <section
            className={`bg-white/60 border border-[#E6DED2] rounded-xl p-6 md:p-8 ${step === "address" ? "opacity-50 pointer-events-none" : ""}`}
          >
            <h2 className="font-display text-[#7A1F2B] text-[20px] mb-5">2. Delivery &amp; payment</h2>

            {step === "payment" && (
              <>
                {shippingOptions.length > 1 && (
                  <div className="flex flex-col gap-2 mb-6">
                    {shippingOptions.map((o) => (
                      <label key={o.id} className="flex items-center justify-between gap-3 border border-[#E6DED2] rounded-lg px-4 py-3 cursor-pointer bg-white">
                        <span className="flex items-center gap-3 text-[14px] text-[#4A423C]">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedShipping?.shipping_option_id === o.id}
                            onChange={() => handleShippingChange(o.id)}
                            className="accent-[#751E29]"
                          />
                          {o.name}
                        </span>
                        <span className="text-[14px] font-medium">{Number(o.amount) === 0 ? "FREE" : formatINR(o.amount)}</span>
                      </label>
                    ))}
                  </div>
                )}
                {shippingOptions.length <= 1 && selectedShipping && (
                  <p className="text-[14px] text-[#5A4F46] mb-6">
                    {selectedShipping.name}:{" "}
                    <span className="font-medium">{totals.shipping === 0 ? "FREE" : formatINR(totals.shipping)}</span>
                    <span className="text-[#8E8783]"> · ships in 24 hrs, delivered in 3–5 days</span>
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  {razorpayEnabled && (
                    <label className={`flex items-start gap-3 border rounded-lg px-4 py-4 cursor-pointer bg-white ${method === "razorpay" ? "border-[#751E29]" : "border-[#E6DED2]"}`}>
                      <input type="radio" name="payment" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} className="mt-1 accent-[#751E29]" />
                      <span>
                        <span className="block text-[15px] font-medium text-[#4A423C]">Pay online</span>
                        <span className="block text-[13px] text-[#8E8783]">UPI, cards, net banking &amp; wallets via Razorpay</span>
                      </span>
                    </label>
                  )}
                  {codEnabled && (
                    <label className={`flex items-start gap-3 border rounded-lg px-4 py-4 cursor-pointer bg-white ${method === "cod" ? "border-[#751E29]" : "border-[#E6DED2]"}`}>
                      <input type="radio" name="payment" checked={method === "cod"} onChange={() => setMethod("cod")} className="mt-1 accent-[#751E29]" disabled={!!paidPaymentId} />
                      <span>
                        <span className="block text-[15px] font-medium text-[#4A423C]">Cash on Delivery</span>
                        <span className="block text-[13px] text-[#8E8783]">Pay in cash or UPI when your order arrives</span>
                      </span>
                    </label>
                  )}
                  {!razorpayEnabled && !codEnabled && (
                    <p className="text-[14px] text-red-600">Payments are temporarily unavailable. Please contact us on WhatsApp.</p>
                  )}
                </div>

                {error && (
                  <p className="mt-4 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {error}
                    {paidPaymentId && (
                      <span className="block mt-1 text-[#5A4F46]">
                        Your payment ({paidPaymentId}) was received. Tap the button below to confirm your order, or contact us with this ID.
                      </span>
                    )}
                  </p>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={busy || (!razorpayEnabled && !codEnabled)}
                  className="mt-6 w-full h-[52px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(117,30,41,0.2)] hover:bg-[#5E1620] transition-colors disabled:opacity-60"
                >
                  {busy
                    ? "Processing…"
                    : paidPaymentId
                    ? "Confirm my order"
                    : method === "cod"
                    ? `Place order — ${formatINR(totals.total)}`
                    : `Pay ${formatINR(totals.total)}`}
                </button>
                <p className="mt-3 text-center text-[12px] text-[#8E8783]">
                  By placing your order you agree to our{" "}
                  <Link href="/terms" className="underline">Terms</Link>,{" "}
                  <Link href="/privacy" className="underline">Privacy</Link> and{" "}
                  <Link href="/returns" className="underline">Return Policy</Link>.
                </p>
              </>
            )}

            {step === "address" && error && (
              <p className="text-[13px] text-red-600">{error}</p>
            )}
          </section>
        </div>

        {/* Right: summary */}
        <aside className="w-full lg:w-[42%] lg:sticky lg:top-24 bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-xl p-6 lg:p-8 shadow-sm">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[22px] mb-5">Order Summary</h2>
          <ul className="flex flex-col gap-4 border-b border-[#E6DED2] pb-5 mb-5">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-[#E6DED2]">
                  <Image
                    src={item.thumbnail?.replace(/^http:\/\/localhost(:\d+)?/, "") || "/images/product/1.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute -top-0 -right-0 bg-[#751E29] text-white text-[11px] w-5 h-5 rounded-bl-lg flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#4A423C] font-medium leading-snug">{item.product_title || item.title}</p>
                  {item.variant_title && <p className="text-[12px] text-[#8E8783]">{item.variant_title}</p>}
                </div>
                <span className="text-[14px] font-medium text-[#4A423C]">{formatINR(Number(item.subtotal ?? item.unit_price * item.quantity))}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 text-[14px] text-[#5A4F46] border-b border-[#E6DED2] pb-5 mb-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {selectedShipping
                  ? totals.shipping === 0
                    ? <span className="font-semibold text-[#C9A24B]">FREE</span>
                    : formatINR(totals.shipping)
                  : <span className="text-[#8E8783] text-[13px]">Calculated after address</span>}
              </span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-[#228B22]">
                <span>Discount{cart.promotions?.[0]?.code ? ` (${cart.promotions[0].code})` : ""}</span>
                <span>-{formatINR(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[12px] text-[#8E8783]">
              <span>Taxes</span>
              <span>Included in price</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-display font-medium text-[#751E29] text-[20px]">TOTAL</span>
            <span className="font-display font-semibold text-[#751E29] text-[26px]">{formatINR(totals.total)}</span>
          </div>
          <Link href="/cart" className="block mt-4 text-center text-[13px] text-[#751E29] hover:underline">
            ← Back to cart
          </Link>
        </aside>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { completeCart } from "@/lib/checkout";
import { businessDetails } from "@/data/content";

const CART_ID_KEY = "vistaaram_medusa_cart_id";

// Seconds to wait before each check while PhonePe still reports the payment as pending
// (roughly PhonePe's recommended status-check schedule), about two minutes in total.
const RETRY_DELAYS = [0, 3, 3, 3, 6, 6, 6, 10, 10, 10, 30, 30];

type Phase = "checking" | "waiting" | "failed" | "no-cart";

export default function PaymentReturn() {
  const router = useRouter();
  const { resetCart } = useCart();
  const [phase, setPhase] = useState<Phase>("checking");
  const [attempt, setAttempt] = useState(0);
  // Bumped by "Check again" to restart the verification loop.
  const [run, setRun] = useState(0);
  // Kept in refs so cart-context updates don't restart the loop mid-check.
  const resetCartRef = useRef(resetCart);
  const routerRef = useRef(router);
  useEffect(() => {
    resetCartRef.current = resetCart;
    routerRef.current = router;
  });

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      let cartId: string | null = null;
      try {
        cartId = localStorage.getItem(CART_ID_KEY);
      } catch {}
      if (!cartId) {
        await Promise.resolve();
        if (!cancelled) setPhase("no-cart");
        return;
      }

      for (let i = 0; i < RETRY_DELAYS.length; i++) {
        await new Promise((r) => setTimeout(r, RETRY_DELAYS[i] * 1000));
        if (cancelled) return;
        setAttempt(i + 1);
        try {
          // The backend asks PhonePe for the payment status; an order is only created once it's paid.
          const order = await completeCart(cartId);
          if (cancelled) return;
          resetCartRef.current();
          routerRef.current.replace(`/order/confirmed/${order.id}`);
          return;
        } catch {
          if (!cancelled && i > 0) setPhase("waiting");
        }
      }
      if (!cancelled) setPhase("failed");
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [run]);

  const whatsapp = `https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent(
    "Hi Vistaaram, I paid with PhonePe but my order didn't confirm on the website."
  )}`;

  return (
    <div className="max-w-[520px] mx-auto text-center py-16">
      {(phase === "checking" || phase === "waiting") && (
        <>
          <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-[#EADAB8] border-t-[#751E29] animate-spin" aria-hidden="true" />
          <h1 className="font-display text-[#7A1F2B] text-[28px] mb-3">Confirming your payment…</h1>
          <p className="text-[#5A4F46] text-[15px]">
            {phase === "checking"
              ? "Please don't close this page."
              : "PhonePe is still processing your payment. This can take a minute — please stay on this page."}
          </p>
          {attempt > 1 && <p className="text-[#A79C91] text-[12px] mt-4">Checked {attempt} times</p>}
        </>
      )}

      {phase === "failed" && (
        <>
          <h1 className="font-display text-[#7A1F2B] text-[28px] mb-3">Payment not confirmed</h1>
          <p className="text-[#5A4F46] text-[15px] mb-2">
            We couldn&apos;t confirm a payment for this order. If you cancelled or the payment failed, you can try
            again — nothing has been charged for a failed payment.
          </p>
          <p className="text-[#5A4F46] text-[14px] mb-8">
            If money was deducted, don&apos;t pay again: your order will be confirmed automatically once PhonePe
            notifies us, or contact us on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setPhase("checking");
                setAttempt(0);
                setRun((n) => n + 1);
              }}
              className="h-12 px-8 rounded-full border border-[#751E29] text-[#751E29] text-[13px] font-bold tracking-[0.1em] uppercase"
            >
              Check again
            </button>
            <Link
              href="/checkout"
              className="h-12 px-8 rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center"
            >
              Back to checkout
            </Link>
          </div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-[14px] text-[#751E29] underline">
            Contact us on WhatsApp
          </a>
        </>
      )}

      {phase === "no-cart" && (
        <>
          <h1 className="font-display text-[#7A1F2B] text-[28px] mb-3">No order in progress</h1>
          <p className="text-[#5A4F46] text-[15px] mb-8">
            If you just paid, your order may already be confirmed — check My Orders or contact us.
          </p>
          <Link
            href="/account/orders"
            className="inline-flex h-12 px-8 rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase items-center"
          >
            My orders
          </Link>
        </>
      )}
    </div>
  );
}

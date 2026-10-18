"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { medusa } from "@/lib/medusa";
import { errorMessage } from "@/lib/account";
import { Card, Notice, primaryButtonClass } from "./ui";

/**
 * Opened from the "add order to your account" email. Accepting doesn't need a login:
 * the emailed token proves the shopper controls the order's email address.
 */
export default function AcceptTransfer({ orderId, token }: { orderId: string; token?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleAccept = async () => {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      await medusa.store.order.acceptTransfer(orderId, { token });
      setDone(true);
    } catch (err) {
      setError(errorMessage(err, "This link is invalid or has already been used."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto">
      <Card className="flex flex-col gap-4 text-center">
        <h1 className="font-display text-[#7A1F2B] text-[26px]">Add order to your account</h1>
        {!token ? (
          <Notice tone="error">This link is incomplete. Please use the button in the email we sent you.</Notice>
        ) : done ? (
          <>
            <Notice tone="success">Done! The order now appears in your account.</Notice>
            <button onClick={() => router.push("/account/orders")} className={`${primaryButtonClass} w-full`}>
              View my orders
            </button>
          </>
        ) : (
          <>
            <p className="text-[14px] text-[#5A4F46]">
              Confirm to link this order to the Vistaaram account that requested it.
            </p>
            {error && <Notice tone="error">{error}</Notice>}
            <button onClick={handleAccept} disabled={busy} className={`${primaryButtonClass} w-full`}>
              {busy ? "Confirming…" : "Confirm"}
            </button>
          </>
        )}
        <Link href="/" className="text-[13px] text-[#751E29] hover:underline">Back to the store</Link>
      </Card>
    </div>
  );
}

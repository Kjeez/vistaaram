"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import {
  createReturn,
  errorMessage,
  fetchReturnOptions,
  fetchReturnReasons,
  ReturnOption,
} from "@/lib/account";
import { COD_PROVIDER_ID, formatINR } from "@/lib/checkout";
import { orderStatusLabel } from "./OrdersPage";
import { AccountShell, Card, Field, inputClass, Loading, Notice, primaryButtonClass, secondaryButtonClass } from "./ui";

type Order = Awaited<ReturnType<typeof medusa.store.order.retrieve>>["order"];
type OrderItem = NonNullable<Order["items"]>[number];

const ORDER_FIELDS =
  "id,display_id,email,status,fulfillment_status,payment_status,created_at,*items,*items.detail," +
  "*shipping_address,*shipping_methods,*fulfillments,*fulfillments.labels," +
  "*payment_collections,*payment_collections.payment_sessions," +
  "+item_subtotal,+shipping_total,+discount_total,+total";

/** Returns can be requested this long after ordering (7-day policy after delivery, plus transit). */
const RETURN_WINDOW_DAYS = 15;
const RETURNABLE_FULFILLMENT = ["fulfilled", "partially_shipped", "shipped", "partially_delivered", "delivered"];

function returnableQuantity(item: OrderItem) {
  const detail = item.detail as { return_requested_quantity?: number; return_received_quantity?: number } | undefined;
  return Math.max(0, item.quantity - Number(detail?.return_requested_quantity ?? 0) - Number(detail?.return_received_quantity ?? 0));
}

function ReturnRequest({ order, onDone }: { order: Order; onDone: () => void }) {
  const [reasons, setReasons] = useState<{ id: string; label: string }[]>([]);
  const [options, setOptions] = useState<ReturnOption[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reasonId, setReasonId] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchReturnReasons(), fetchReturnOptions()])
      .then(([r, o]) => {
        setReasons(r);
        setOptions(o);
      })
      .catch(() => setError("Returns are unavailable right now. Please contact us on WhatsApp."));
  }, []);

  const items = (order.items ?? []).filter((i) => returnableQuantity(i) > 0);
  const selected = items.filter((i) => (quantities[i.id] ?? 0) > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selected.length) return setError("Select at least one item to return.");
    if (!reasonId) return setError("Tell us why you're returning.");
    if (!options[0]) return setError("Returns are unavailable right now. Please contact us on WhatsApp.");
    setBusy(true);
    try {
      await createReturn({
        order_id: order.id,
        items: selected.map((i) => ({ id: i.id, quantity: quantities[i.id], reason_id: reasonId, note: note.trim() || undefined })),
        return_shipping: { option_id: options[0].id },
        note: note.trim() || undefined,
      });
      onDone();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const max = returnableQuantity(item);
          return (
            <label key={item.id} className="flex items-center gap-3 text-[14px] text-[#4A423C]">
              <select
                className="rounded-lg border border-[#E5DCC8] bg-white px-2 py-2 text-[14px]"
                value={quantities[item.id] ?? 0}
                onChange={(e) => setQuantities((q) => ({ ...q, [item.id]: Number(e.target.value) }))}
              >
                {Array.from({ length: max + 1 }, (_, n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span>{item.product_title || item.title} — {item.variant_title}</span>
            </label>
          );
        })}
      </div>
      <Field label="Reason *">
        <select className={inputClass} value={reasonId} onChange={(e) => setReasonId(e.target.value)}>
          <option value="">Select a reason</option>
          {reasons.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Anything else we should know? (optional)">
        <textarea className={`${inputClass} min-h-[90px]`} value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} />
      </Field>
      <p className="text-[12px] text-[#8E8783]">
        {options[0]?.amount === 0 ? "Return pickup is free. " : ""}Our team will confirm a pickup within 48 hours. Refunds are issued once the
        item reaches us — to your original payment method, or by bank/UPI transfer for Cash on Delivery orders.
      </p>
      {error && <Notice tone="error">{error}</Notice>}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className={primaryButtonClass}>
          {busy ? "Submitting…" : "Request return"}
        </button>
      </div>
    </form>
  );
}

function OrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  // When the order was fetched; the return window is measured from here, not during render.
  const [loadedAt, setLoadedAt] = useState(0);
  const [error, setError] = useState("");
  const [showReturn, setShowReturn] = useState(false);
  const [returnRequested, setReturnRequested] = useState(false);

  const load = () =>
    medusa.store.order
      .retrieve(orderId, { fields: ORDER_FIELDS })
      .then(({ order }) => {
        setOrder(order);
        setLoadedAt(Date.now());
      })
      .catch((err) => setError(errorMessage(err, "We couldn't find this order.")));

  useEffect(() => {
    medusa.store.order
      .retrieve(orderId, { fields: ORDER_FIELDS })
      .then(({ order }) => {
        setOrder(order);
        setLoadedAt(Date.now());
      })
      .catch((err) => setError(errorMessage(err, "We couldn't find this order.")));
  }, [orderId]);

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <Notice tone="error">{error}</Notice>
        <Link href="/account/orders" className="text-[#751E29] hover:underline text-[14px]">← Back to my orders</Link>
      </div>
    );
  }
  if (!order) return <Loading label="Loading order…" />;

  const isCod = order.payment_collections?.some((pc) => pc.payment_sessions?.some((s) => s.provider_id === COD_PROVIDER_ID));
  const ageDays = (loadedAt - new Date(order.created_at).getTime()) / 86_400_000;
  const canReturn =
    order.status !== "canceled" &&
    RETURNABLE_FULFILLMENT.includes(order.fulfillment_status ?? "") &&
    ageDays <= RETURN_WINDOW_DAYS &&
    (order.items ?? []).some((i) => returnableQuantity(i) > 0);
  const hasRequestedReturn = (order.items ?? []).some(
    (i) => Number((i.detail as { return_requested_quantity?: number } | undefined)?.return_requested_quantity ?? 0) > 0
  );
  // Requested via *fulfillments.labels; the store type omits the relation.
  type Label = { id: string; tracking_number: string; tracking_url?: string | null };
  const labels = (order.fulfillments ?? []).flatMap((f) => (f as { labels?: Label[] }).labels ?? []);
  const a = order.shipping_address;
  const helpUrl = `https://wa.me/917819058084?text=${encodeURIComponent(`Hi Vistaaram, I need help with order #${order.display_id}`)}`;

  return (
    <>
      <Link href="/account/orders" className="text-[13px] text-[#751E29] hover:underline">← My orders</Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-6">
        <div>
          <h1 className="font-display font-medium text-[#7A1F2B] text-[28px] leading-tight">Order #{order.display_id}</h1>
          <p className="text-[13px] text-[#8E8783]">
            Placed {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <span className="text-[12px] font-semibold uppercase tracking-wider bg-[#EADAB8] text-[#78591A] px-3 py-1 rounded-full">
          {orderStatusLabel(order)}
        </span>
      </div>

      {(returnRequested || hasRequestedReturn) && (
        <div className="mb-4">
          <Notice tone="success">Return requested. We&apos;ll contact you within 48 hours to arrange the pickup.</Notice>
        </div>
      )}

      {labels.length > 0 && (
        <Card className="mb-4 !p-5">
          <p className="text-[14px] font-medium text-[#4A423C] mb-1">Tracking</p>
          {labels.map((l) => (
            <p key={l.id} className="text-[14px] text-[#5A4F46]">
              {l.tracking_number}
              {l.tracking_url && l.tracking_url !== "#" && (
                <a href={l.tracking_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#751E29] hover:underline">
                  Track shipment →
                </a>
              )}
            </p>
          ))}
        </Card>
      )}

      <Card className="mb-4">
        <ul className="flex flex-col gap-4 border-b border-[#E6DED2] pb-5 mb-5">
          {order.items?.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-[#E6DED2]">
                <Image src={item.thumbnail?.replace(/^http:\/\/localhost(:\d+)?/, "") || "/images/product/1.jpg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#4A423C] font-medium">{item.product_title || item.title}</p>
                <p className="text-[12px] text-[#8E8783]">{item.variant_title ? `${item.variant_title} · ` : ""}Qty {item.quantity}</p>
              </div>
              <span className="text-[14px] font-medium text-[#4A423C]">{formatINR(Number(item.subtotal))}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 text-[14px] text-[#5A4F46]">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(Number(order.item_subtotal))}</span></div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{Number(order.shipping_total) === 0 ? "FREE" : formatINR(Number(order.shipping_total))}</span>
          </div>
          {Number(order.discount_total) > 0 && (
            <div className="flex justify-between text-[#228B22]"><span>Discount</span><span>-{formatINR(Number(order.discount_total))}</span></div>
          )}
          <div className="flex justify-between font-display text-[#751E29] text-[20px] mt-2">
            <span>Total</span>
            <span className="font-semibold">{formatINR(Number(order.total))}</span>
          </div>
          <p className="text-[13px] text-[#8E8783]">Payment: {isCod ? "Cash on Delivery" : "Paid online"}</p>
        </div>
      </Card>

      {a && (
        <Card className="mb-4 !p-5 text-[14px] text-[#5A4F46] leading-relaxed">
          <p className="font-medium text-[#4A423C] mb-1">Delivery address</p>
          <p>{a.first_name} {a.last_name}</p>
          <p>{a.address_1}{a.address_2 && `, ${a.address_2}`}</p>
          <p>{a.city}, {a.province} – {a.postal_code}</p>
          {a.phone && <p className="text-[#8E8783]">{a.phone}</p>}
        </Card>
      )}

      {showReturn && canReturn ? (
        <Card className="mb-4">
          <h2 className="font-display text-[#7A1F2B] text-[20px] mb-4">Request a return</h2>
          <ReturnRequest
            order={order}
            onDone={() => {
              setShowReturn(false);
              setReturnRequested(true);
              load();
            }}
          />
        </Card>
      ) : (
        <div className="flex flex-wrap gap-3">
          {canReturn && (
            <button onClick={() => setShowReturn(true)} className={secondaryButtonClass}>
              Return items
            </button>
          )}
          <a href={helpUrl} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
            Get help on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}

export default function OrderDetailPage({ orderId }: { orderId: string }) {
  return (
    <AccountShell>
      <OrderDetail orderId={orderId} />
    </AccountShell>
  );
}

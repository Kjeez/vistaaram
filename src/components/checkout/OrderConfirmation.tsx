"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { COD_PROVIDER_ID, formatINR } from "@/lib/checkout";

type Order = Awaited<ReturnType<typeof medusa.store.order.retrieve>>["order"];

const ORDER_FIELDS =
  "id,display_id,email,created_at,*items,*shipping_address,*shipping_methods," +
  "*payment_collections,*payment_collections.payment_sessions," +
  "+item_subtotal,+shipping_total,+discount_total,+total";

export default function OrderConfirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    medusa.store.order
      .retrieve(orderId, { fields: ORDER_FIELDS })
      .then(({ order }) => setOrder(order))
      .catch(() => setFailed(true));
  }, [orderId]);

  if (failed) {
    return (
      <div className="text-center py-24">
        <h1 className="font-display text-[#7A1F2B] text-[2rem] mb-3">Order not found</h1>
        <p className="text-[#8E8783] text-[14px] mb-6">
          If you just placed an order, check your email or contact us on WhatsApp with your payment details.
        </p>
        <Link href="/contact" className="text-[#751E29] underline text-[14px]">Contact us</Link>
      </div>
    );
  }

  if (!order) {
    return <div className="flex justify-center py-32 text-[#8E8783] text-[14px]">Loading your order…</div>;
  }

  const isCod = order.payment_collections?.some((pc) =>
    pc.payment_sessions?.some((s) => s.provider_id === COD_PROVIDER_ID)
  );
  const a = order.shipping_address;

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-[#C9A24B]/15 flex items-center justify-center mb-5">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#751E29" strokeWidth="2.2">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h1 className="font-display font-medium text-[#7A1F2B] text-[2.25rem] leading-tight mb-2">
          Thank you for your order!
        </h1>
        <p className="text-[#5A4F46] text-[15px]">
          Order <span className="font-semibold">#{order.display_id}</span> is confirmed. Please keep this order
          number handy for any questions.
        </p>
        <p className="text-[#8E8783] text-[13px] mt-2">
          {isCod
            ? `Please keep ${formatINR(Number(order.total))} ready to pay on delivery (cash or UPI).`
            : "Payment received. Your order ships within 24 hours."}
        </p>
      </div>

      <div className="bg-white/60 border border-[#E6DED2] rounded-xl p-6 md:p-8 mb-6">
        <ul className="flex flex-col gap-4 border-b border-[#E6DED2] pb-5 mb-5">
          {order.items?.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-[#E6DED2]">
                <Image
                  src={item.thumbnail?.replace(/^http:\/\/localhost(:\d+)?/, "") || "/images/product/1.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#4A423C] font-medium">{item.product_title || item.title}</p>
                <p className="text-[12px] text-[#8E8783]">
                  {item.variant_title ? `${item.variant_title} · ` : ""}Qty {item.quantity}
                </p>
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
            <span>Total {isCod ? "(Cash on Delivery)" : "(Paid)"}</span>
            <span className="font-semibold">{formatINR(Number(order.total))}</span>
          </div>
        </div>
      </div>

      {a && (
        <div className="bg-white/60 border border-[#E6DED2] rounded-xl p-6 md:p-8 mb-8 text-[14px] text-[#5A4F46] leading-relaxed">
          <h2 className="font-display text-[#7A1F2B] text-[18px] mb-2">Delivering to</h2>
          <p className="font-medium text-[#4A423C]">{a.first_name} {a.last_name}</p>
          <p>{a.address_1}{a.address_2 && `, ${a.address_2}`}</p>
          <p>{a.city}, {a.province} – {a.postal_code}</p>
          {a.phone && <p className="text-[#8E8783]">{a.phone}</p>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="h-12 px-8 rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center"
        >
          Continue shopping
        </Link>
        <a
          href={`https://wa.me/917819058084?text=${encodeURIComponent(`Hi Vistaaram, I have a question about order #${order.display_id}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-8 rounded-full border border-[#751E29] text-[#751E29] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center"
        >
          Questions? WhatsApp us
        </a>
      </div>
    </div>
  );
}

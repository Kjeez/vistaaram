"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage, findGuestOrders, FULFILLMENT_STATUS_LABEL, ORDER_STATUS_LABEL } from "@/lib/account";
import { formatINR } from "@/lib/checkout";
import { AccountShell, Card, Loading, Notice, PageTitle, primaryButtonClass, secondaryButtonClass } from "./ui";

type OrderList = Awaited<ReturnType<typeof medusa.store.order.list>>["orders"];

const LIST_FIELDS = "id,display_id,status,fulfillment_status,created_at,total,*items";

export function orderStatusLabel(order: { status: string; fulfillment_status?: string | null }) {
  if (order.status === "canceled") return ORDER_STATUS_LABEL.canceled;
  return FULFILLMENT_STATUS_LABEL[order.fulfillment_status ?? ""] ?? ORDER_STATUS_LABEL[order.status] ?? order.status;
}

function Orders({ linked }: { linked: boolean }) {
  const { customer } = useCustomer();
  const [orders, setOrders] = useState<OrderList | null>(null);
  const [error, setError] = useState("");
  const [finding, setFinding] = useState(false);
  const [findResult, setFindResult] = useState("");

  const load = async () => {
    try {
      const { orders } = await medusa.store.order.list({ fields: LIST_FIELDS, order: "-created_at", limit: 50 });
      setOrders(orders);
    } catch (err) {
      setError(errorMessage(err, "We couldn't load your orders."));
      setOrders([]);
    }
  };

  useEffect(() => {
    let cancelled = false;
    medusa.store.order
      .list({ fields: LIST_FIELDS, order: "-created_at", limit: 50 })
      .then(({ orders }) => !cancelled && setOrders(orders))
      .catch((err) => {
        if (cancelled) return;
        setError(errorMessage(err, "We couldn't load your orders."));
        setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFind = async () => {
    setFinding(true);
    setFindResult("");
    try {
      const { claimed, emailed } = await findGuestOrders();
      if (claimed) {
        setFindResult(`Added ${claimed} past order${claimed > 1 ? "s" : ""} to your account.`);
        await load();
      } else if (emailed) {
        setFindResult(
          `We found ${emailed} past order${emailed > 1 ? "s" : ""}. We've emailed ${customer?.email} a link to confirm each one.`
        );
      } else {
        setFindResult(`No other orders found for ${customer?.email}.`);
      }
    } catch (err) {
      setFindResult(errorMessage(err));
    } finally {
      setFinding(false);
    }
  };

  if (!orders) return <Loading label="Loading your orders…" />;

  return (
    <>
      <PageTitle title="My Orders" />
      {linked && <div className="mb-4"><Notice tone="success">We found your earlier orders and added them to your account.</Notice></div>}
      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}

      {orders.length === 0 ? (
        <Card className="text-center">
          <p className="text-[15px] text-[#5A4F46] mb-5">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className={`${primaryButtonClass} inline-flex`}>
            Shop Sambrani Cups
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="bg-white/70 border border-[#E6DED2] rounded-xl p-5 hover:border-[#C9A24B] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <p className="font-medium text-[#4A423C] text-[15px]">Order #{order.display_id}</p>
                  <p className="text-[12px] text-[#8E8783]">
                    {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-wider bg-[#EADAB8] text-[#78591A] px-3 py-1 rounded-full">
                  {orderStatusLabel(order)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {order.items?.slice(0, 3).map((item) => (
                    <div key={item.id} className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border-2 border-[#FAF6EE]">
                      <Image
                        src={item.thumbnail?.replace(/^http:\/\/localhost(:\d+)?/, "") || "/images/product/1.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="flex-1 text-[13px] text-[#5A4F46] truncate">
                  {order.items?.map((i) => `${i.variant_title || i.title} × ${i.quantity}`).join(", ")}
                </p>
                <span className="font-medium text-[#4A423C]">{formatINR(Number(order.total))}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Card className="mt-8 !p-5">
        <p className="text-[14px] text-[#4A423C] font-medium">Missing an order?</p>
        <p className="text-[13px] text-[#8E8783] mt-1 mb-3">
          Orders placed without logging in can be added to your account if they used {customer?.email}.
        </p>
        <button onClick={handleFind} disabled={finding} className={secondaryButtonClass}>
          {finding ? "Searching…" : "Find my past orders"}
        </button>
        {findResult && <p className="text-[13px] text-[#5A4F46] mt-3">{findResult}</p>}
      </Card>
    </>
  );
}

export default function OrdersPage({ linked = false }: { linked?: boolean }) {
  return (
    <AccountShell>
      <Orders linked={linked} />
    </AccountShell>
  );
}

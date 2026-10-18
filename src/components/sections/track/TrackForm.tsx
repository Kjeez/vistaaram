"use client";

import { useState } from "react";
import { businessDetails, trackContent } from "@/data/content";

const inputBase =
  "w-full rounded-lg border border-[#E5DCC8] bg-white px-4 py-3 text-[15px] text-[#4A3728] placeholder:text-[#B0A090] outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all duration-200";

export default function TrackForm() {
  const { form, whatsappMessage } = trackContent;
  const [order, setOrder] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ order?: string; phone?: string }>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const orderNo = order.trim().replace(/^#/, "");
    const mobile = phone.replace(/\D/g, "").slice(-10);
    const next: typeof errors = {};
    if (!orderNo) next.order = form.orderError;
    if (!/^[6-9]\d{9}$/.test(mobile)) next.phone = form.phoneError;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const text = encodeURIComponent(whatsappMessage(orderNo, mobile));
    window.open(`https://wa.me/${businessDetails.whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="track-order" className="block text-[14px] font-medium text-[#4A3728] mb-2">
          {form.orderLabel}
        </label>
        <input
          id="track-order"
          type="text"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder={form.orderPlaceholder}
          className={inputBase}
          aria-invalid={!!errors.order}
          aria-describedby={errors.order ? "track-order-error" : undefined}
        />
        {errors.order && (
          <p id="track-order-error" className="mt-1.5 text-[13px] text-[#B3261E]">
            {errors.order}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="track-phone" className="block text-[14px] font-medium text-[#4A3728] mb-2">
          {form.phoneLabel}
        </label>
        <input
          id="track-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={form.phonePlaceholder}
          className={inputBase}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "track-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="track-phone-error" className="mt-1.5 text-[13px] text-[#B3261E]">
            {errors.phone}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#7A1F2B] hover:bg-[#5A1520] text-white font-semibold text-[14px] tracking-[0.08em] py-3.5 transition-colors"
      >
        {form.cta}
      </button>
    </form>
  );
}

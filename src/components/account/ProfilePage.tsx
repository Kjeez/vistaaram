"use client";

import { useState } from "react";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage } from "@/lib/account";
import { normalizePhone } from "@/lib/checkout";
import { AccountShell, Card, Field, inputClass, Notice, PageTitle, primaryButtonClass } from "./ui";

function ProfileForm() {
  const { customer, refresh } = useCustomer();
  const [firstName, setFirstName] = useState(customer?.first_name ?? "");
  const [lastName, setLastName] = useState(customer?.last_name ?? "");
  const [phone, setPhone] = useState(normalizePhone(customer?.phone ?? ""));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  if (!customer) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!firstName.trim()) return setMessage({ tone: "error", text: "First name is required." });
    if (phone && !/^[6-9]\d{9}$/.test(normalizePhone(phone))) {
      return setMessage({ tone: "error", text: "Enter a valid 10-digit mobile number." });
    }
    setBusy(true);
    try {
      await medusa.store.customer.update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone ? `+91${normalizePhone(phone)}` : "",
      });
      await refresh();
      setMessage({ tone: "success", text: "Profile updated." });
    } catch (err) {
      setMessage({ tone: "error", text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle title="Profile" subtitle="Your details are used to speed up checkout." />
      <Card className="mb-6">
        <form onSubmit={handleSave} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name *">
            <input autoComplete="given-name" className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Field>
          <Field label="Last name">
            <input autoComplete="family-name" className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Field>
          <Field label="Email">
            <input className={`${inputClass} bg-[#FAF6EE] text-[#8E8783]`} value={customer.email} disabled />
          </Field>
          <Field label="Mobile number">
            <input type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" />
          </Field>
          {message && (
            <div className="sm:col-span-2">
              <Notice tone={message.tone}>{message.text}</Notice>
            </div>
          )}
          <div className="sm:col-span-2">
            <button type="submit" disabled={busy} className={primaryButtonClass}>
              {busy ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/account/orders", title: "My Orders", text: "Track orders and request returns" },
          { href: "/account/addresses", title: "Addresses", text: "Manage delivery addresses" },
          { href: "/account/wishlist", title: "Wishlist", text: "Products you've saved" },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white/70 border border-[#E6DED2] rounded-xl p-5 hover:border-[#C9A24B] transition-colors"
          >
            <p className="font-display text-[#7A1F2B] text-[18px]">{card.title}</p>
            <p className="text-[13px] text-[#8E8783] mt-1">{card.text}</p>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-[13px] text-[#8E8783]">
        Want to change your password?{" "}
        <Link href="/account/forgot-password" className="text-[#751E29] hover:underline">
          Send me a reset link
        </Link>
        .
      </p>
    </>
  );
}

export default function ProfilePage() {
  return (
    <AccountShell>
      <ProfileForm />
    </AccountShell>
  );
}

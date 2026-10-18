"use client";

import { useState } from "react";
import { medusa } from "@/lib/medusa";
import { useCustomer } from "@/context/CustomerContext";
import { CustomerAddress, errorMessage } from "@/lib/account";
import { CheckoutAddress, INDIAN_STATES, normalizePhone, validateAddress } from "@/lib/checkout";
import {
  AccountShell,
  Card,
  Field,
  inputClass,
  Notice,
  PageTitle,
  primaryButtonClass,
  secondaryButtonClass,
} from "./ui";

type FormState = Omit<CheckoutAddress, "email"> & { isDefault: boolean };

const EMPTY: FormState = {
  phone: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

function toForm(a: CustomerAddress): FormState {
  return {
    phone: normalizePhone(a.phone ?? ""),
    firstName: a.first_name ?? "",
    lastName: a.last_name ?? "",
    address1: a.address_1 ?? "",
    address2: a.address_2 ?? "",
    city: a.city ?? "",
    state: a.province ?? "",
    pincode: a.postal_code ?? "",
    isDefault: Boolean(a.is_default_shipping),
  };
}

function AddressForm({
  initial,
  email,
  onCancel,
  onSave,
}: {
  initial: FormState;
  email: string;
  onCancel: () => void;
  onSave: (form: FormState) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutAddress, string>>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : key === "pincode"
        ? e.target.value.replace(/\D/g, "").slice(0, 6)
        : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateAddress({ ...form, email });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    setError("");
    try {
      await onSave(form);
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="First name *" error={errors.firstName}>
        <input autoComplete="given-name" className={inputClass} value={form.firstName} onChange={set("firstName")} />
      </Field>
      <Field label="Last name">
        <input autoComplete="family-name" className={inputClass} value={form.lastName} onChange={set("lastName")} />
      </Field>
      <Field label="Mobile number *" error={errors.phone} className="sm:col-span-2">
        <input type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClass} value={form.phone} onChange={set("phone")} placeholder="98765 43210" />
      </Field>
      <Field label="House no., building, street *" error={errors.address1} className="sm:col-span-2">
        <input autoComplete="address-line1" className={inputClass} value={form.address1} onChange={set("address1")} />
      </Field>
      <Field label="Area, landmark (optional)" className="sm:col-span-2">
        <input autoComplete="address-line2" className={inputClass} value={form.address2} onChange={set("address2")} />
      </Field>
      <Field label="Pincode *" error={errors.pincode}>
        <input inputMode="numeric" autoComplete="postal-code" className={inputClass} value={form.pincode} onChange={set("pincode")} />
      </Field>
      <Field label="City *" error={errors.city}>
        <input autoComplete="address-level2" className={inputClass} value={form.city} onChange={set("city")} />
      </Field>
      <Field label="State *" error={errors.state} className="sm:col-span-2">
        <select autoComplete="address-level1" className={inputClass} value={form.state} onChange={set("state")}>
          <option value="">Select state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <label className="sm:col-span-2 flex items-center gap-2 text-[14px] text-[#5A4F46]">
        <input type="checkbox" checked={form.isDefault} onChange={set("isDefault")} className="accent-[#751E29]" />
        Use as my default delivery address
      </label>
      {error && (
        <div className="sm:col-span-2">
          <Notice tone="error">{error}</Notice>
        </div>
      )}
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" disabled={busy} className={primaryButtonClass}>
          {busy ? "Saving…" : "Save address"}
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Addresses() {
  const { customer, refresh } = useCustomer();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [error, setError] = useState("");
  if (!customer) return null;

  const addresses = [...(customer.addresses ?? [])].sort(
    (a, b) => Number(b.is_default_shipping) - Number(a.is_default_shipping)
  );

  const save = async (form: FormState, id?: string) => {
    const body = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: `+91${normalizePhone(form.phone)}`,
      address_1: form.address1.trim(),
      address_2: form.address2.trim(),
      city: form.city.trim(),
      province: form.state,
      postal_code: form.pincode,
      country_code: "in",
      is_default_shipping: form.isDefault,
      is_default_billing: form.isDefault,
    };
    if (id) await medusa.store.customer.updateAddress(id, body);
    else await medusa.store.customer.createAddress(body);
    await refresh();
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this address?")) return;
    setError("");
    try {
      await medusa.store.customer.deleteAddress(id);
      await refresh();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const makeDefault = async (id: string) => {
    setError("");
    try {
      await medusa.store.customer.updateAddress(id, { is_default_shipping: true, is_default_billing: true });
      await refresh();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle title="Addresses" subtitle="Your default address is filled in at checkout." />
        {editing === null && (
          <button onClick={() => setEditing("new")} className={secondaryButtonClass}>
            + Add address
          </button>
        )}
      </div>

      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}

      {editing === "new" && (
        <Card className="mb-6">
          <h2 className="font-display text-[#7A1F2B] text-[18px] mb-4">New address</h2>
          <AddressForm
            initial={{
              ...EMPTY,
              firstName: customer.first_name ?? "",
              lastName: customer.last_name ?? "",
              phone: normalizePhone(customer.phone ?? ""),
              isDefault: addresses.length === 0,
            }}
            email={customer.email}
            onCancel={() => setEditing(null)}
            onSave={(f) => save(f)}
          />
        </Card>
      )}

      {addresses.length === 0 && editing !== "new" ? (
        <Card>
          <p className="text-[14px] text-[#8E8783]">No saved addresses yet. Addresses you add here are ready to use at checkout.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((a) =>
            editing === a.id ? (
              <Card key={a.id} className="md:col-span-2">
                <AddressForm initial={toForm(a)} email={customer.email} onCancel={() => setEditing(null)} onSave={(f) => save(f, a.id)} />
              </Card>
            ) : (
              <Card key={a.id} className="!p-5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-[#4A423C] text-[15px]">
                    {a.first_name} {a.last_name}
                  </p>
                  {a.is_default_shipping && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#EADAB8] text-[#78591A] px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-[14px] text-[#5A4F46] leading-relaxed flex-1">
                  <p>{a.address_1}{a.address_2 && `, ${a.address_2}`}</p>
                  <p>{a.city}, {a.province} – {a.postal_code}</p>
                  {a.phone && <p className="text-[#8E8783]">{a.phone}</p>}
                </div>
                <div className="flex gap-4 mt-4 text-[13px]">
                  <button onClick={() => setEditing(a.id)} className="text-[#751E29] hover:underline">Edit</button>
                  {!a.is_default_shipping && (
                    <button onClick={() => makeDefault(a.id)} className="text-[#751E29] hover:underline">Set as default</button>
                  )}
                  <button onClick={() => remove(a.id)} className="text-[#8E8783] hover:underline ml-auto">Delete</button>
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </>
  );
}

export default function AddressesPage() {
  return (
    <AccountShell>
      <Addresses />
    </AccountShell>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useCustomer } from "@/context/CustomerContext";

export const inputClass =
  "w-full rounded-lg border border-[#E5DCC8] bg-white px-4 py-3 text-[15px] text-[#4A3728] placeholder:text-[#B0A090] outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all duration-200";

export const primaryButtonClass =
  "h-[48px] px-8 rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:bg-[#5E1620] transition-colors disabled:opacity-60";

export const secondaryButtonClass =
  "h-[44px] px-6 rounded-full border border-[#751E29] text-[#751E29] text-[13px] font-semibold tracking-[0.05em] flex items-center justify-center gap-2 hover:bg-[#751E29]/5 transition-colors disabled:opacity-60";

export function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block">
        <span className="block text-[13px] font-medium text-[#5A4F46] mb-1.5">{label}</span>
        {children}
      </label>
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

export function Notice({ tone, children }: { tone: "error" | "success" | "info"; children: ReactNode }) {
  const styles = {
    error: "text-red-700 bg-red-50 border-red-200",
    success: "text-[#1F6B2A] bg-[#EEF7EE] border-[#BFE0C2]",
    info: "text-[#5A4F46] bg-[#FAF6EE] border-[#E6DED2]",
  }[tone];
  return <div className={`text-[13px] border rounded-lg px-4 py-3 ${styles}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`bg-white/70 border border-[#E6DED2] rounded-xl p-6 md:p-8 ${className}`}>{children}</section>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display font-medium text-[#7A1F2B] text-[28px] md:text-[32px] leading-tight">{title}</h1>
      {subtitle && <p className="text-[#8E8783] text-[14px] mt-1">{subtitle}</p>}
    </div>
  );
}

export function Loading({ label = "Loading…" }: { label?: string }) {
  return <div className="flex justify-center py-24 text-[#8E8783] text-[14px]">{label}</div>;
}

const NAV = [
  { href: "/account", label: "Profile" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

/** Signed-in area: side navigation plus a redirect to login for guests. */
export function AccountShell({ children }: { children: ReactNode }) {
  const { customer, loading, logout } = useCustomer();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !customer) {
      router.replace(`/account/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, customer, pathname, router]);

  if (loading || !customer) return <Loading />;

  const isActive = (href: string) => (href === "/account" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      <aside className="w-full md:w-[220px] shrink-0">
        <div className="mb-5">
          <p className="text-[12px] uppercase tracking-[0.15em] text-[#A79C91]">Namaste</p>
          <p className="font-display text-[#7A1F2B] text-[22px] leading-tight truncate">
            {customer.first_name || customer.email.split("@")[0]}
          </p>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto -mx-1 px-1 pb-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-[14px] transition-colors ${
                isActive(item.href)
                  ? "bg-[#751E29] text-[#FAF6EE]"
                  : "text-[#5A4F46] hover:bg-[#EFE8D8]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={async () => {
              await logout();
              router.replace("/");
            }}
            className="whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-[14px] text-[#8E8783] hover:bg-[#EFE8D8]"
          >
            Log out
          </button>
        </nav>
      </aside>
      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}

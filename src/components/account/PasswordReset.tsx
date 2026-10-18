"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { medusa } from "@/lib/medusa";
import { errorMessage } from "@/lib/account";
import { useCustomer } from "@/context/CustomerContext";
import { Field, inputClass, Notice, primaryButtonClass } from "./ui";

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[440px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display font-medium text-[#7A1F2B] text-[2rem] leading-tight mb-2">{title}</h1>
        <p className="text-[#8E8783] text-[14px]">{subtitle}</p>
      </div>
      <div className="bg-white/70 border border-[#E6DED2] rounded-xl p-6 md:p-8 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
    setBusy(true);
    setError("");
    try {
      await medusa.auth.resetPassword("customer", "emailpass", { identifier: email.trim().toLowerCase() });
      setSent(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell title="Forgot your password?" subtitle="Enter your email and we'll send you a link to set a new one.">
      {sent ? (
        <Notice tone="success">
          If an account exists for {email}, a reset link is on its way. It expires in 15 minutes, so check your inbox
          (and spam folder) soon.
        </Notice>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field label="Email">
            <input type="email" autoComplete="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          {error && <Notice tone="error">{error}</Notice>}
          <button type="submit" disabled={busy} className={`${primaryButtonClass} w-full`}>
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
      <Link href="/account/login" className="text-center text-[14px] text-[#751E29] hover:underline">
        Back to login
      </Link>
    </Shell>
  );
}

export function ResetPasswordForm({ token, email }: { token?: string; email?: string }) {
  const router = useRouter();
  const { login } = useCustomer();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!token || !email) {
    return (
      <Shell title="Link not valid" subtitle="This reset link is incomplete or has expired.">
        <Link href="/account/forgot-password" className={`${primaryButtonClass} w-full`}>
          Request a new link
        </Link>
      </Shell>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setBusy(true);
    setError("");
    try {
      await medusa.auth.updateProvider("customer", "emailpass", { email, password }, token);
      await login(email, password);
      router.replace("/account");
    } catch (err) {
      setError(
        /unauthorized|invalid|expired/i.test(errorMessage(err))
          ? "This reset link has expired. Please request a new one."
          : errorMessage(err)
      );
      setBusy(false);
    }
  };

  return (
    <Shell title="Set a new password" subtitle={`For ${email}`}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field label="New password (min. 8 characters)">
          <input type="password" autoComplete="new-password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field label="Confirm new password">
          <input type="password" autoComplete="new-password" className={inputClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </Field>
        {error && <Notice tone="error">{error}</Notice>}
        <button type="submit" disabled={busy} className={`${primaryButtonClass} w-full`}>
          {busy ? "Saving…" : "Save password"}
        </button>
      </form>
    </Shell>
  );
}

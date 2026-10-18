"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage, GOOGLE_LOGIN_ENABLED } from "@/lib/account";
import { normalizePhone } from "@/lib/checkout";
import { Field, inputClass, Loading, Notice, primaryButtonClass, secondaryButtonClass } from "./ui";

/** Only same-site paths are allowed as post-login destinations. */
export function safeNext(next?: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export default function AuthForm({ mode, next }: { mode: "login" | "register"; next?: string }) {
  const router = useRouter();
  const { customer, loading, login, register, startGoogleLogin } = useCustomer();
  const destination = safeNext(next);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && customer) router.replace(destination);
  }, [loading, customer, destination, router]);

  if (loading || customer) return <Loading />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
    if (mode === "register") {
      if (!firstName.trim()) return setError("Please enter your first name.");
      if (password.length < 8) return setError("Password must be at least 8 characters.");
      if (phone && !/^[6-9]\d{9}$/.test(normalizePhone(phone))) return setError("Enter a valid 10-digit mobile number.");
    }
    if (!password) return setError("Enter your password.");

    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register({
          email,
          password,
          firstName,
          lastName,
          phone: phone ? `+91${normalizePhone(phone)}` : undefined,
        });
      }
      router.replace(destination);
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      sessionStorage.setItem("vistaaram_login_next", destination);
      await startGoogleLogin();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  const otherHref = `${mode === "login" ? "/account/register" : "/account/login"}${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <div className="max-w-[440px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display font-medium text-[#7A1F2B] text-[2rem] leading-tight mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-[#8E8783] text-[14px]">
          {mode === "login"
            ? "Log in to see your orders, saved addresses and wishlist."
            : "Track orders, save addresses and check out faster."}
        </p>
      </div>

      <div className="bg-white/70 border border-[#E6DED2] rounded-xl p-6 md:p-8 flex flex-col gap-5">
        {GOOGLE_LOGIN_ENABLED && (
          <>
            <button type="button" onClick={handleGoogle} disabled={busy} className={`${secondaryButtonClass} w-full border-[#E5DCC8] text-[#4A423C]`}>
              <GoogleIcon /> Continue with Google
            </button>
            <div className="flex items-center gap-3 text-[12px] text-[#A79C91]">
              <span className="h-px flex-1 bg-[#E6DED2]" /> or use email <span className="h-px flex-1 bg-[#E6DED2]" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name *">
                <input autoComplete="given-name" className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Field>
              <Field label="Last name">
                <input autoComplete="family-name" className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Field>
            </div>
          )}
          <Field label="Email *">
            <input type="email" autoComplete="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          {mode === "register" && (
            <Field label="Mobile number">
              <input type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" />
            </Field>
          )}
          <Field label={mode === "register" ? "Password * (min. 8 characters)" : "Password *"}>
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          {mode === "login" && (
            <Link href="/account/forgot-password" className="self-end -mt-2 text-[13px] text-[#751E29] hover:underline">
              Forgot password?
            </Link>
          )}

          {error && <Notice tone="error">{error}</Notice>}

          <button type="submit" disabled={busy} className={`${primaryButtonClass} w-full`}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[#5A4F46]">
          {mode === "login" ? "New to Vistaaram? " : "Already have an account? "}
          <Link href={otherHref} className="text-[#751E29] font-medium hover:underline">
            {mode === "login" ? "Create an account" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

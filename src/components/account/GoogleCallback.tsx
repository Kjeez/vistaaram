"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage } from "@/lib/account";
import { safeNext } from "./AuthForm";
import { Loading, Notice } from "./ui";

export default function GoogleCallback() {
  const router = useRouter();
  const { completeGoogleLogin } = useCustomer();
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    // The OAuth code is single-use, so guard against React running the effect twice.
    if (started.current) return;
    started.current = true;

    const query = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    let next = "/account";
    try {
      next = safeNext(sessionStorage.getItem("vistaaram_login_next"));
      sessionStorage.removeItem("vistaaram_login_next");
    } catch {}

    completeGoogleLogin(query)
      .then(({ claimed }) => {
        router.replace(claimed > 0 && next === "/account" ? "/account/orders?linked=1" : next);
      })
      .catch((err) => setError(errorMessage(err, "Google sign-in could not be completed.")));
  }, [completeGoogleLogin, router]);

  if (error) {
    return (
      <div className="max-w-[440px] mx-auto flex flex-col gap-4 text-center">
        <Notice tone="error">{error}</Notice>
        <Link href="/account/login" className="text-[#751E29] hover:underline text-[14px]">
          Back to login
        </Link>
      </div>
    );
  }
  return <Loading label="Signing you in with Google…" />;
}

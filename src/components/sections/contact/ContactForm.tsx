"use client";

import { useState, useRef } from "react";
import { contactContent } from "@/data/content";
import {
  sendContactMessage,
  buildMailtoUrl,
  type ContactPayload,
} from "@/lib/sendContactMessage";

/* ── Validation ────────────────────────────── */

function validate(fields: ContactPayload) {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!/^\d{10}$/.test(fields.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

/* ── Shared input style ────────────────────── */

const inputClass =
  "w-full rounded-lg border border-[#E5DCC8] bg-white px-4 py-3 text-[15px] text-[#4A3728] placeholder:text-[#B0A090] outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all duration-200";

/* ── Error message ─────────────────────────── */

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-[#7A1F2B] text-[12px] font-medium">{msg}</p>
  );
}

/* ── Gold check icon ───────────────────────── */

function GoldCheck() {
  return (
    <div className="w-14 h-14 rounded-full bg-[#FEF9EE] border-2 border-[#C9A24B] flex items-center justify-center mx-auto mb-4">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

/* ── Main component ────────────────────────── */

export default function ContactForm() {
  const { title, subjectOptions, directEmail, cta } = contactContent.form;

  const [fields, setFields] = useState<ContactPayload>({
    name: "",
    phone: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check — silently succeed if bot filled it
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const mailto = buildMailtoUrl(fields);
    setMailtoUrl(mailto);
    sendContactMessage(fields);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-[#E6DED2] p-8 text-center flex flex-col items-center gap-3">
        <GoldCheck />
        <h3 className="font-display font-medium text-[#7A1F2B] text-[20px]">
          Message ready — we&apos;ve opened WhatsApp for you.
        </h3>
        <p className="text-[#6B6259] text-[14px]">
          Prefer email?{" "}
          <a
            href={mailtoUrl}
            className="text-[#C9A24B] underline font-medium"
          >
            Click here to send via email
          </a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-[#7A1F2B] text-[13px] underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E6DED2] p-8">
      <h2
        className="font-display font-medium text-[#7A1F2B] mb-6"
        style={{ fontSize: "22px" }}
      >
        {title}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
          autoComplete="off"
        />

        {/* Row 1: Name + Phone */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[13px] font-medium text-[#4A3728] mb-1.5">
              Your Name <span className="text-[#7A1F2B]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={inputClass}
            />
            <FieldError msg={errors.name} />
          </div>
          <div className="flex-1">
            <label className="block text-[13px] font-medium text-[#4A3728] mb-1.5">
              Phone Number <span className="text-[#7A1F2B]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
            <FieldError msg={errors.phone} />
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label className="block text-[13px] font-medium text-[#4A3728] mb-1.5">
            Email Address <span className="text-[#7A1F2B]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="yourname@example.com"
            className={inputClass}
          />
          <FieldError msg={errors.email} />
        </div>

        {/* Row 3: Subject */}
        <div>
          <label className="block text-[13px] font-medium text-[#4A3728] mb-1.5">
            Subject <span className="text-[#7A1F2B]">*</span>
          </label>
          <div className="relative">
            <select
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-10`}
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 4: Message */}
        <div>
          <label className="block text-[13px] font-medium text-[#4A3728] mb-1.5">
            Your Message <span className="text-[#7A1F2B]">*</span>
          </label>
          <textarea
            name="message"
            value={fields.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            rows={5}
            className={`${inputClass} resize-y`}
            style={{ minHeight: "120px" }}
          />
          <FieldError msg={errors.message} />
        </div>

        {/* Bottom row: email note + submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <p className="text-[#6B6259] text-[13px]">
            or reach us directly at{" "}
            <a
              href={`mailto:${directEmail}`}
              className="text-[#C9A24B] font-medium hover:underline"
            >
              {directEmail}
            </a>
          </p>
          <button
            type="submit"
            className="shrink-0 bg-[#7A1F2B] text-[#FAF6EE] text-[13px] font-semibold tracking-[0.08em] uppercase px-7 py-3 rounded-full hover:bg-[#5E1620] transition-all duration-200 shadow-[0_4px_14px_rgba(122,31,43,0.25)]"
          >
            {cta}
          </button>
        </div>
      </form>
    </div>
  );
}

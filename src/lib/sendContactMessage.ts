/**
 * sendContactMessage — frontend-only helper.
 * Builds a WhatsApp deep-link prefilled with the form data.
 * Swap the implementation here when a real API becomes available.
 */
export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function buildWhatsAppUrl(payload: ContactPayload): string {
  const { name, phone, subject, message } = payload;
  const text = encodeURIComponent(
    `\uD83D\uDE4F Vistaaram Contact\n\nName: ${name}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`
  );
  return `https://wa.me/917819058084?text=${text}`;
}

export function buildMailtoUrl(payload: ContactPayload): string {
  const { name, phone, subject, message } = payload;
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\n\n${message}`
  );
  return `mailto:contact@vistaaram.in?subject=${encodeURIComponent(subject)}&body=${body}`;
}

export function sendContactMessage(payload: ContactPayload): void {
  const url = buildWhatsAppUrl(payload);
  window.open(url, "_blank", "noopener,noreferrer");
}

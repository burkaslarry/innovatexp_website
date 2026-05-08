/* F09: Floating WhatsApp CTA - Fixed wa.me link from env or fallback to bookme anchor. */
const defaultMessage =
  "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。";

export function FloatingWhatsAppButton() {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const href = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultMessage)}`
    : "/bookme#quotation-wizard";

  return (
    <a
      href={href}
      aria-label="WhatsApp InnovateXP or book a free consultation"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/80 transition hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 dark:ring-slate-900/80"
      target={rawNumber ? "_blank" : undefined}
      rel={rawNumber ? "noopener noreferrer" : undefined}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
        <path d="M16.02 3.2A12.75 12.75 0 0 0 5.1 22.54L3.6 28.8l6.4-1.44A12.75 12.75 0 1 0 16.02 3.2Zm0 2.34a10.41 10.41 0 0 1 8.84 15.92 10.43 10.43 0 0 1-13.9 3.7l-.46-.25-3.8.86.9-3.7-.3-.48A10.42 10.42 0 0 1 16.02 5.54Zm-4.06 4.74c-.22 0-.58.08-.88.42-.3.34-1.16 1.14-1.16 2.78s1.2 3.22 1.36 3.44c.16.22 2.32 3.72 5.72 5.06 2.84 1.12 3.42.9 4.04.84.62-.06 2-.82 2.28-1.62.28-.8.28-1.48.2-1.62-.08-.14-.3-.22-.64-.4-.34-.18-2-.98-2.3-1.1-.3-.12-.52-.18-.74.18-.22.34-.84 1.1-1.04 1.32-.2.22-.38.25-.72.08-.34-.18-1.42-.52-2.7-1.66-1-.88-1.68-1.96-1.88-2.3-.2-.34-.02-.52.15-.7.16-.16.34-.4.52-.6.18-.2.22-.34.34-.56.12-.22.06-.42-.03-.6-.08-.18-.74-1.78-1.02-2.44-.27-.64-.54-.56-.74-.57h-.76Z" />
      </svg>
    </a>
  );
}

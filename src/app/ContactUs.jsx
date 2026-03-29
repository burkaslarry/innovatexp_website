"use client";
import { useLanguage } from "./LanguageContext";
import { ContactForm } from "@/components/ContactForm";

export default function ContactUs() {
  const { t } = useLanguage();

  return (
    <div
      id="contact-us"
      className="scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/15 bg-brand-cream-warm px-6 py-10 shadow-card dark:border-slate-600 dark:bg-slate-900/90 md:px-10 md:py-12"
    >
      <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        {t("contact.title")}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-base text-slate-700 dark:text-slate-300">
        {t("contact.subtitle")}
      </p>
      <div className="mt-10">
        <ContactForm
          nameLabel={t("contact.form.name")}
          emailLabel={t("contact.form.email")}
          messageLabel={t("contact.form.content")}
          submitLabel={t("contact.form.submit")}
          successMessage={t("contact.form.success")}
          placeholder={t("contact.form.placeholder")}
          nameHint={t("contact.form.hint.name")}
          emailHint={t("contact.form.hint.email")}
          messageHint={t("contact.form.hint.message")}
        />
      </div>
    </div>
  );
}

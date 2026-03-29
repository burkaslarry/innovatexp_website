"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";

export interface ContactFormProps {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  placeholder?: string;
  nameHint?: string;
  emailHint?: string;
  messageHint?: string;
}

export function ContactForm({
  nameLabel,
  emailLabel,
  messageLabel,
  submitLabel,
  successMessage,
  placeholder = "",
  nameHint,
  emailHint,
  messageHint,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    message: "",
  });
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const { senderName, email, message } = formData;
    setValid(
      senderName.trim() !== "" && email.trim() !== "" && message.trim() !== ""
    );
  }, [formData]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(t);
  }, [success]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setSubmitError(null);
    const form = new FormData(e.currentTarget);
    form.append("subject", "Normal Inquiry - " + formData.senderName);
    const fields = Object.fromEntries(form) as Record<string, string>;

    try {
      const result = await submitToWeb3FormsContact(fields);
      if (result.success) {
        setSuccess(true);
        setFormData({ senderName: "", email: "", message: "" });
      } else {
        setSubmitError("Could not send. Please try again or email us directly.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputWrap =
    "group relative border-b-2 border-slate-300 pb-1 pt-6 transition-colors focus-within:border-brand-primary dark:border-slate-500";

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <CheckCircle2 className="h-16 w-16 text-emerald-500" aria-hidden />
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {successMessage}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <input type="hidden" name="from_name" value="Client" readOnly />

            <div className="space-y-1">
              <div className={inputWrap}>
                <label
                  htmlFor="senderName"
                  className="absolute left-0 top-2 text-sm font-medium text-slate-500 transition-all group-focus-within:text-brand-primary dark:text-slate-400 dark:group-focus-within:text-teal-300"
                >
                  {nameLabel}
                </label>
                <input
                  id="senderName"
                  name="senderName"
                  autoComplete="name"
                  value={formData.senderName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, senderName: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  required
                />
              </div>
              {nameHint ? (
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{nameHint}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <div className={inputWrap}>
                <label
                  htmlFor="email"
                  className="absolute left-0 top-2 text-sm font-medium text-slate-500 transition-all group-focus-within:text-brand-primary dark:text-slate-400 dark:group-focus-within:text-teal-300"
                >
                  {emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  required
                />
              </div>
              {emailHint ? (
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{emailHint}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <div className={inputWrap}>
                <label
                  htmlFor="message"
                  className="absolute left-0 top-2 text-sm font-medium text-slate-500 transition-all group-focus-within:text-brand-primary dark:text-slate-400 dark:group-focus-within:text-teal-300"
                >
                  {messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full resize-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  required
                />
              </div>
              {messageHint ? (
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{messageHint}</p>
              ) : null}
            </div>

            {submitError ? (
              <p className="pt-2 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
                {submitError}
              </p>
            ) : null}
            <div className="pt-6">
              <button
                type="submit"
                disabled={!valid || submitting}
                className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-brand-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:bg-brand-primary/40 disabled:shadow-none dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    …
                  </>
                ) : (
                  submitLabel
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

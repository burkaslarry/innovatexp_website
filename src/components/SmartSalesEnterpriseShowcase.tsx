"use client";

import {
  MessageSquareDashed,
  Languages,
  Filter,
  BarChart3,
  MapPin,
  RefreshCw,
  Calculator,
  BrainCircuit,
  Server,
} from "lucide-react";
import { useLanguage } from "@/app/LanguageContext";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-oxford/25 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:shadow-lg dark:backdrop-blur-md dark:hover:border-sky-500/40 dark:hover:shadow-sky-500/10";

const iconClass = "mb-4 h-8 w-8 text-oxford dark:text-teal-300";

type SmartSalesEnterpriseShowcaseProps = {
  onOpenGallery?: () => void;
};

export default function SmartSalesEnterpriseShowcase({
  onOpenGallery,
}: SmartSalesEnterpriseShowcaseProps) {
  const { t } = useLanguage();

  const uspIcons = [
    MessageSquareDashed,
    Languages,
    Filter,
    BarChart3,
    MapPin,
  ] as const;

  const addonIcons = [RefreshCw, Calculator, BrainCircuit, Server] as const;

  const addonKeys = [
    { title: "addon.luma.title", desc: "addon.luma.desc" },
    { title: "addon.commission.title", desc: "addon.commission.desc" },
    { title: "addon.ai_predict.title", desc: "addon.ai_predict.desc" },
    { title: "addon.architecture.title", desc: "addon.architecture.desc" },
  ] as const;

  return (
    <section className="w-full bg-slate-100 py-16 px-4 dark:bg-black md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-16">
        <div>
          <div className="mb-10 text-center">
            {onOpenGallery ? (
              <button
                type="button"
                onClick={onOpenGallery}
                aria-label="Open SmartSales CRM screenshot gallery"
                className="mb-4 text-center text-2xl font-bold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 dark:text-white md:text-3xl"
              >
                {t("crm.main.title")}
              </button>
            ) : (
              <h3 className="mb-4 text-center text-2xl font-bold text-brand-primary dark:text-white md:text-3xl">
                {t("crm.main.title")}
              </h3>
            )}
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
              {t("crm.main.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {uspIcons.map((Icon, i) => {
              const n = i + 1;
              return (
                <div key={n} className={cardClass}>
                  <Icon className={iconClass} strokeWidth={1.75} aria-hidden />
                  <h3 className="text-lg font-semibold text-oxford dark:text-white">
                    {t(`crm.usp.${n}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {t(`crm.usp.${n}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-10 text-center">
            <h3 className="mb-4 text-center text-2xl font-bold text-brand-primary dark:text-white md:text-3xl">
              {t("addon.title")}
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
              {t("addon.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {addonKeys.map((k, i) => {
              const Icon = addonIcons[i];
              return (
                <div key={k.title} className={cardClass}>
                  <Icon className={iconClass} strokeWidth={1.75} aria-hidden />
                  <h3 className="text-lg font-semibold text-oxford dark:text-white">
                    {t(k.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {t(k.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

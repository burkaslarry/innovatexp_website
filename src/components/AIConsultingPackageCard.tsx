import type { LucideIcon } from "lucide-react";

type AIConsultingPackageCardProps = {
  icon: LucideIcon;
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

export function AIConsultingPackageCard({
  icon: Icon,
  title,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
}: AIConsultingPackageCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-md dark:border-gray-600 dark:bg-gray-700">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-teal-300">
        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-3 font-semibold text-brand-primary dark:text-teal-300">{price}</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
      <ul className="mb-5 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start text-sm">
            <span className="mr-2 text-brand-primary dark:text-teal-300">✓</span>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={ctaHref}
        className="mt-auto block rounded-full bg-brand-primary py-3 text-center font-bold text-white transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
      >
        {ctaLabel}
      </a>
    </div>
  );
}

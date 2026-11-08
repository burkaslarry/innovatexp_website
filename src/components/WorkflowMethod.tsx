import { getSiteExperience } from "@/content/site-experience";
import type { AppLocale } from "@/lib/i18n-routing";

export function WorkflowMethod({ locale }: { locale: AppLocale }) {
  const c = getSiteExperience(locale);
  return (
    <div>
      <h2 className="max-w-3xl text-3xl font-normal leading-snug md:text-4xl">{c.methodTitle}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8">{c.methodIntro}</p>
      <ol className="mt-10 divide-y divide-[#c8bba9] border-y border-[#c8bba9]">
        {c.steps.map((step, index) => (
          <li key={step.title} className="grid gap-6 py-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <h3 className="text-2xl font-normal"><span className="mr-4 font-sans text-sm text-[#6f5436]">0{index + 1}</span>{step.title}</h3>
            <dl className="space-y-5">
              {[[c.input, step.input], [c.output, step.output], [c.decision, step.decision]].map(([label, body]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-5">
                  <dt className="text-sm font-semibold text-[#6f5436]">{label}</dt>
                  <dd className="text-base leading-7">{body}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

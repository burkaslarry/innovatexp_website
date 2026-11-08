import Link from "next/link";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { getSiteExperience } from "@/content/site-experience";
import { withLocale, type AppLocale } from "@/lib/i18n-routing";

export function SolutionPreview({ locale }: { locale: AppLocale }) {
  const c = getSiteExperience(locale);
  return (
    <div>
      <h2 className="max-w-3xl text-3xl font-normal leading-snug md:text-4xl">{c.solutionsTitle}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8" data-geo-answer>{c.solutionsIntro}</p>
      <div className="mt-8 divide-y divide-[#c8bba9] border-y border-[#c8bba9]">
        {c.solutions.map((solution) => (
          <details key={solution.name} className="group py-5">
            <summary className="min-h-11 cursor-pointer py-2 text-xl leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:text-2xl">
              <span className="ml-2">{solution.problem}</span><span className="ml-3 inline-block font-sans text-sm text-[#6f5436]">{solution.name}</span>
            </summary>
            <div className="mt-5 grid gap-5 pb-3 pl-6 md:grid-cols-2 md:gap-10">
              <p className="text-lg leading-8">{solution.workflow}</p>
              <div><h3 className="text-sm font-semibold text-[#6f5436]">{c.scope}</h3><p className="mt-2 leading-8">{solution.boundary}</p><Link href={withLocale(locale, solution.href)} className="mt-4 inline-flex min-h-11 items-center border-b border-[#8b6b43] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{c.explore} →</Link>
                {solution.name === "EventXP" || solution.name === "SmartSales" ? <div className="mt-4"><AddToInquiryButton itemId={solution.name === "EventXP" ? "eventXpTrial" : "smartSalesTrial"} fullWidth={false} /></div> : null}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

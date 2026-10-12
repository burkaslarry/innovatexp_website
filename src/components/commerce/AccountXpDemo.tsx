import Link from "next/link";
import type { AppLocale } from "@/lib/i18n-routing";
import { PRICING, formatHkd } from "@/content/pricing";

export function AccountXpDemo({ locale }: { locale: AppLocale }) {
  const zh = locale.startsWith("zh");
  return <section id="accounting-tools-demo" className="my-12 scroll-mt-24 border-y border-[#c8bba9] py-8">
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8b6b43]">AccountXP · {zh ? "先示範，再確認需求" : "Demo before a scoped pilot"}</p>
    <h2 className="mt-4 text-3xl">{zh ? "從收據上載，到核對分類及報告。" : "From receipt upload to reviewed categories and reports."}</h2>
    <div className="mt-7 grid gap-8 lg:grid-cols-2">
      <div><video controls playsInline preload="metadata" className="aspect-video w-full bg-[#251f19]" aria-label={zh ? "AccountXP 操作示範" : "AccountXP workflow demonstration"}><source src="/videos/accountxp.mp4" type="video/mp4" /><track kind="descriptions" srcLang={zh ? "zh" : "en"} label={zh ? "流程說明" : "Workflow guide"} src={`/videos/accountxp.${zh ? "zh" : "en"}.vtt`} />{zh ? "瀏覽器未支援影片，請查看下方流程說明。" : "Video unavailable. Read the workflow guide below."}</video><p className="mt-2 text-sm">{zh ? "約 73 秒示範；流程說明見右側。" : "About 73 seconds; workflow guide alongside."}</p></div>
      <div className="space-y-4 leading-8"><p><strong>{zh ? "之前：" : "Before: "}</strong>{zh ? "收據、分類及報告依賴重複輸入與人手交接。" : "Receipt capture, categorisation and reports rely on repeated entry and handoffs."}</p><p><strong>{zh ? "之後：" : "After: "}</strong>{zh ? "集中上載收據，AI 建議分類，再由負責人核對、修正及匯出報告。" : "Upload receipts together, review AI-suggested categories, correct exceptions and export reports."}</p><p>{zh ? "AI 分類仍需人工核對，不取代會計或稅務判斷。" : "AI classification requires human review and does not replace accounting or tax judgement."}</p><p>{zh ? "Pilot 驗收：用已同意的匿名收據樣本，確認擷取欄位、分類修正、重複記錄處理及報告格式。先確認工具、資料權限及使用量。" : "Pilot acceptance: agree anonymised samples, extracted fields, correction handling, duplicate detection and report format. Confirm tools, data permissions and usage volume first."}</p><p>{formatHkd(PRICING.quickCash.accountXpExperience, locale)} · {zh ? "Pilot 設定及首月使用；之後月費按已確認方案。" : "Pilot setup and first month; later monthly fees follow the agreed plan."}</p><Link href={`/${locale}/bookme?interest=accountxp`} className="inline-flex min-h-11 items-center border-b border-[#8b6b43] font-semibold">{zh ? "預約 AccountXP 示範及範圍確認" : "Book an AccountXP demo and scope review"}</Link></div>
    </div>
  </section>;
}

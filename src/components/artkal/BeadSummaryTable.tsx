"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { formatShoppingList } from "@/lib/artkal/palette";
import type { ColorUsage } from "@/types/artkal";

type BeadSummaryTableProps = {
  usage: ColorUsage[];
  totalBeads: number;
  zh: boolean;
  onHoverCode?: (code: string | null) => void;
};

export function BeadSummaryTable({ usage, totalBeads, zh, onHoverCode }: BeadSummaryTableProps) {
  const [copied, setCopied] = useState(false);

  async function copyList() {
    const text = formatShoppingList(usage, zh ? "zh" : "en");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (usage.length === 0) {
    return (
      <p className="text-sm text-[color:var(--text-secondary)]">
        {zh ? "生成圖紙後會顯示每色所需粒數。" : "Bead counts appear after you generate a pattern."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-[color:var(--text-secondary)]">
          {zh ? `合共 ${totalBeads} 粒 · ${usage.length} 色` : `${totalBeads} beads · ${usage.length} colors`}
        </p>
        <button
          type="button"
          onClick={() => void copyList()}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--border-medium)] px-4 text-sm font-semibold text-[color:var(--heading-foreground)] hover:border-brand-primary"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? (zh ? "已複製" : "Copied") : zh ? "複製購物清單" : "Copy shopping list"}
        </button>
      </div>
      <div className="max-h-[420px] overflow-auto rounded-xl border border-[color:var(--border-light)]">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-[color:var(--bg-secondary)] text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">
            <tr>
              <th className="w-14 px-3 py-2">{zh ? "色" : "Color"}</th>
              <th className="px-3 py-2">{zh ? "色號" : "Code"}</th>
              <th className="px-3 py-2">{zh ? "名稱" : "Name"}</th>
              <th className="px-3 py-2 text-right">{zh ? "數量" : "Qty"}</th>
            </tr>
          </thead>
          <tbody>
            {usage.map(({ color, count }) => (
              <tr
                key={color.code}
                className="border-t border-[color:var(--border-light)] hover:bg-brand-primary/5"
                onMouseEnter={() => onHoverCode?.(color.code)}
                onMouseLeave={() => onHoverCode?.(null)}
              >
                <td className="px-3 py-2">
                  <span
                    className="inline-block h-6 w-6 rounded-md border border-black/10"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="font-bold text-[color:var(--heading-foreground)]">{color.code}</div>
                  <div className="font-mono text-xs text-[color:var(--text-secondary)]">{color.hex}</div>
                </td>
                <td className="px-3 py-2 text-[color:var(--text-secondary)]">
                  {color.zhName} / {color.name}
                </td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold">
                  {count} {zh ? "粒" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

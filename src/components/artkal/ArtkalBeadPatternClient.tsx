"use client";

import dynamic from "next/dynamic";

const ArtkalBeadPatternApp = dynamic(
  () => import("@/components/artkal/ArtkalBeadPatternApp").then((mod) => mod.ArtkalBeadPatternApp),
  {
    ssr: false,
    loading: () => (
      <div className="ixp-card min-h-[420px] p-6 text-sm text-[color:var(--text-secondary)]">
        載入拼豆圖紙生成器… / Loading bead pattern generator…
      </div>
    ),
  },
);

export function ArtkalBeadPatternClient({ zh }: { zh: boolean }) {
  return <ArtkalBeadPatternApp zh={zh} />;
}

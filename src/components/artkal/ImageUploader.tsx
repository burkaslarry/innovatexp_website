"use client";

import { useCallback, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";

type ImageUploaderProps = {
  file: File | null;
  onFile: (file: File | null) => void;
  zh: boolean;
};

const ACCEPT = "image/jpeg,image/png,image/jpg";

export function ImageUploader({ file, onFile, zh }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyFile = useCallback(
    (next: File | null) => {
      if (!next) {
        setError(null);
        onFile(null);
        return;
      }
      if (!/^image\/(jpeg|png|jpg)$/i.test(next.type) && !/\.(jpe?g|png)$/i.test(next.name)) {
        setError(zh ? "只接受 JPG 或 PNG。" : "Please upload a JPG or PNG image.");
        return;
      }
      setError(null);
      onFile(next);
    },
    [onFile, zh],
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[color:var(--heading-foreground)]">
        {zh ? "上傳圖片" : "Upload image"}
      </label>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            document.getElementById("artkal-file-input")?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          applyFile(event.dataTransfer.files[0] ?? null);
        }}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${
          dragOver
            ? "border-brand-primary bg-brand-primary/10"
            : "border-[color:var(--border-medium)] bg-[color:var(--card-bg)]"
        }`}
        onClick={() => document.getElementById("artkal-file-input")?.click()}
      >
        <input
          id="artkal-file-input"
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(event) => applyFile(event.target.files?.[0] ?? null)}
        />
        {file ? <ImageIcon className="mb-2 h-8 w-8 text-brand-primary" aria-hidden /> : <Upload className="mb-2 h-8 w-8 text-brand-primary" aria-hidden />}
        <p className="text-sm font-semibold text-[color:var(--heading-foreground)]">
          {file ? file.name : zh ? "拖放 JPG／PNG，或點擊選檔" : "Drop a JPG/PNG, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
          {zh ? "圖片會在瀏覽器內像素化，不會上傳伺服器。" : "Processed in your browser. Nothing is uploaded to a server."}
        </p>
      </div>
      <button
        type="button"
        className="text-sm font-semibold text-brand-primary underline-offset-2 hover:underline"
        onClick={async () => {
          const response = await fetch("/ai-consul.png");
          const blob = await response.blob();
          const type = blob.type.startsWith("image/") ? blob.type : "image/png";
          applyFile(new File([blob], "sample.png", { type }));
        }}
      >
        {zh ? "載入示範圖" : "Load sample image"}
      </button>
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}

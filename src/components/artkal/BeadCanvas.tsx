"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { drawBeadPattern } from "@/utils/canvasRenderer";
import type { BeadPattern } from "@/types/artkal";

type BeadCanvasProps = {
  pattern: BeadPattern | null;
  showGrid: boolean;
  highlightCode: string | null;
  onHoverCode: (code: string | null) => void;
  zh: boolean;
};

export function BeadCanvas({ pattern, showGrid, highlightCode, onHoverCode, zh }: BeadCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !pattern) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = wrap.clientWidth;
    const cssH = Math.max(360, wrap.clientWidth * 0.72);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const base = Math.min((cssW - 24) / pattern.width, (cssH - 24) / pattern.height);
    const cellSize = Math.max(2, base * zoom);
    const contentW = pattern.width * cellSize;
    const contentH = pattern.height * cellSize;
    const offsetX = (cssW - contentW) / 2 + pan.x;
    const offsetY = (cssH - contentH) / 2 + pan.y;

    drawBeadPattern(ctx, pattern, {
      offsetX,
      offsetY,
      cellSize,
      showGrid,
      showCodes: cellSize >= 18,
      highlightCode,
    });
  }, [highlightCode, pan.x, pan.y, pattern, showGrid, zoom]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(() => redraw());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      setZoom((z) => Math.min(8, Math.max(0.4, Number((z * factor).toFixed(3)))));
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, []);

  function hitTest(clientX: number, clientY: number): string | null {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !pattern) return null;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width;
    const cssH = rect.height;
    const base = Math.min((cssW - 24) / pattern.width, (cssH - 24) / pattern.height);
    const cellSize = Math.max(2, base * zoom);
    const contentW = pattern.width * cellSize;
    const contentH = pattern.height * cellSize;
    const offsetX = (cssW - contentW) / 2 + pan.x;
    const offsetY = (cssH - contentH) / 2 + pan.y;
    const x = Math.floor((clientX - rect.left - offsetX) / cellSize);
    const y = Math.floor((clientY - rect.top - offsetY) / cellSize);
    if (x < 0 || y < 0 || x >= pattern.width || y >= pattern.height) return null;
    return pattern.cells[y]?.[x] ?? null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-[color:var(--text-secondary)]">
          {zh
            ? "滾輪縮放、拖曳平移。放大後顯示色號。懸停會高亮同一色。"
            : "Scroll to zoom, drag to pan. Codes appear when zoomed in. Hover highlights a color."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[color:var(--border-medium)] px-3 text-sm font-semibold"
            onClick={() => setZoom((z) => Math.max(0.4, Number((z / 1.2).toFixed(3))))}
          >
            <ZoomOut className="h-4 w-4" aria-hidden />
            {zh ? "縮小" : "Zoom out"}
          </button>
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[color:var(--border-medium)] px-3 text-sm font-semibold"
            onClick={() => setZoom((z) => Math.min(8, Number((z * 1.2).toFixed(3))))}
          >
            <ZoomIn className="h-4 w-4" aria-hidden />
            {zh ? "放大" : "Zoom in"}
          </button>
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[color:var(--border-medium)] px-3 text-sm font-semibold"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {zh ? "重設" : "Reset"}
          </button>
        </div>
      </div>
      <div ref={wrapRef} className="overflow-hidden rounded-2xl border border-[color:var(--border-light)] bg-[#f4f1ea]">
        <canvas
          ref={canvasRef}
          className="block h-auto w-full touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => {
            dragRef.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (drag) {
              setPan({
                x: drag.panX + (event.clientX - drag.x),
                y: drag.panY + (event.clientY - drag.y),
              });
              return;
            }
            onHoverCode(hitTest(event.clientX, event.clientY));
          }}
          onPointerUp={(event) => {
            dragRef.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerLeave={() => {
            if (!dragRef.current) onHoverCode(null);
          }}
        />
      </div>
    </div>
  );
}

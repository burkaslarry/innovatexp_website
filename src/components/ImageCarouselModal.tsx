"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageCarouselModalProps = {
  open: boolean;
  slides: Slide[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ImageCarouselModal({
  open,
  slides,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageCarouselModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open || slides.length === 0) return null;

  const slide = slides[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/20 bg-black">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>

        <div className="mt-3 text-center text-sm font-medium text-white/90">
          {slide.caption || slide.alt}
        </div>

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type Slide } from "@/data/course";
import { SlideContent } from "@/components/slides/ContentBlockRenderer";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

/* ─── Props ─────────────────────────────────────────────────────────────── */

interface PresentationViewerProps {
  slides: Slide[];
  moduleTitle: string;
  moduleLabel: string;
  initialSlide?: number;
  onClose: () => void;
}

/* ─── PresentationViewer ────────────────────────────────────────────────── */

export function PresentationViewer({
  slides,
  moduleTitle,
  moduleLabel,
  initialSlide = 0,
  onClose,
}: PresentationViewerProps) {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [fadingOut, setFadingOut] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeIndex];
  const progress = ((activeIndex + 1) / slides.length) * 100;

  // SSR-safe reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const FADE_DURATION = prefersReducedMotion ? 0 : 120;

  /* ── Navigation ────────────────────────────────────────────────────── */

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length || index === activeIndex) return;
      setFadingOut(true);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        setActiveIndex(index);
        setFadingOut(false);
        setTimeout(() => headingRef.current?.focus(), 20);
      }, FADE_DURATION);
    },
    [activeIndex, slides.length, FADE_DURATION]
  );

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    if (activeIndex < slides.length - 1) goTo(activeIndex + 1);
  }, [activeIndex, slides.length, goTo]);

  /* ── Keyboard navigation ───────────────────────────────────────────── */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(slides.length - 1);
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev, goTo, slides.length]);

  /* ── Scroll lock ───────────────────────────────────────────────────── */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Focus on mount ────────────────────────────────────────────────── */

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  /* ── Cleanup fade timer ────────────────────────────────────────────── */

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  /* ── Focus trap ────────────────────────────────────────────────────── */

  const handleFocusTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  /* ── Icon button classes (reused from SlideViewer) ─────────────────── */

  const iconBtnClass =
    "h-11 w-11 md:h-9 md:w-9 rounded-[6px] border border-[#2e2e2e] text-[#a0a0a0] hover:border-[#454545] hover:text-[#ededed] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center";

  /* ── Render ────────────────────────────────────────────────────────── */

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Presentation mode — ${moduleLabel}: ${moduleTitle}`}
      className="fixed inset-0 z-[60] bg-[#080808] flex flex-col"
      onKeyDown={handleFocusTrap}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#454545] shrink-0">
            {moduleLabel}
          </span>
          <span className="text-[#2e2e2e] shrink-0" aria-hidden="true">
            /
          </span>
          <span className="text-[13px] text-[#878787] truncate">
            {moduleTitle}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-xs text-[#454545] tracking-wider uppercase hidden sm:inline">
            Slide {activeIndex + 1} of {slides.length}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className={iconBtnClass}
            aria-label="Exit presentation mode"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────── */}
      <div
        className="h-px bg-[#1f1f1f] overflow-hidden shrink-0"
        role="progressbar"
        aria-valuenow={activeIndex + 1}
        aria-valuemin={1}
        aria-valuemax={slides.length}
        aria-label="Slide progress"
      >
        <div
          className="h-full bg-[#de3163] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-16 py-8 md:py-12"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="max-w-[900px] mx-auto relative transition-opacity duration-150"
          style={{ opacity: fadingOut ? 0 : 1 }}
        >
          {/* Ordinal watermark */}
          <span
            className="absolute -top-4 right-0 font-mono font-bold text-[200px] md:text-[280px] leading-none text-white select-none pointer-events-none"
            style={{ opacity: 0.03 }}
            aria-hidden="true"
          >
            {String(activeSlide.number).padStart(2, "0")}
          </span>

          {/* Slide headline */}
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold tracking-[-0.03em] leading-[1.15] text-[#ededed] whitespace-pre-line relative z-10 focus-visible:outline-none"
          >
            {activeSlide.headline}
          </h2>

          {/* Slide body — rich content blocks or simple text */}
          <SlideContent slide={activeSlide} />
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 border-t border-[#1f1f1f] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={iconBtnClass}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === slides.length - 1}
            className={iconBtnClass}
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="font-mono text-xs text-[#454545] ml-1 sm:hidden">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Keyboard hint — desktop only */}
        <span
          className="font-mono text-[11px] text-[#454545] hidden lg:inline"
          aria-hidden="true"
        >
          ← → navigate · Esc close
        </span>
      </div>
    </div>
  );
}

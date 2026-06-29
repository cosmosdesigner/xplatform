"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Container } from "@/components/layout/Container";
import {
  courseModules,
  type CourseModule,
  type Slide,
} from "@/data/course";
import { cn } from "@/lib/utils";
import { SlideContent } from "@/components/slides/ContentBlockRenderer";
import { PresentationViewer } from "@/components/presentation/PresentationViewer";
import {
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
} from "lucide-react";

/* ─── SlideViewer ───────────────────────────────────────────────────────── */
function SlideViewer({
  slides,
  moduleId,
}: {
  slides: Slide[];
  moduleId: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listId = useId();
  const viewerId = useId();
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fadingOut, setFadingOut] = useState(false);

  const activeSlide = slides[activeIndex];

  const goTo = (index: number) => {
    // Fade out current content, swap, fade in
    setFadingOut(true);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      setActiveIndex(index);
      setFadingOut(false);
      // Move focus to slide heading after swap
      setTimeout(() => headingRef.current?.focus(), 20);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const goPrev = () => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex < slides.length - 1) goTo(activeIndex + 1);
  };

  // Roving tabindex: arrow keys update state (which re-renders tabIndex correctly)
  const handleSlideKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown" && index < slides.length - 1) {
      e.preventDefault();
      goTo(index + 1);
    }
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:items-start gap-0">
      {/* Slide list */}
      <div
        className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#2e2e2e]"
        id={listId}
        role="list"
        aria-label={`Slides — ${slides.length} total`}
      >
        {slides.map((slide, i) => (
          <div key={slide.number} role="listitem">
            <button
              onClick={() => goTo(i)}
              onKeyDown={(e) => handleSlideKeyDown(e, i)}
              tabIndex={i === activeIndex ? 0 : -1}
              aria-current={i === activeIndex ? "true" : undefined}
              aria-controls={viewerId}
              className={cn(
                "w-full flex items-start gap-3 px-5 py-3.5 text-left transition-all duration-150 group border-l-2",
                i === activeIndex
                  ? "bg-[#1a1a1a] border-l-[#de3163] text-[#ededed]"
                  : "border-l-transparent text-[#a0a0a0] hover:bg-[#111] hover:text-[#ededed] hover:border-l-[#2e2e2e]"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] mt-0.5 shrink-0 w-5",
                  i === activeIndex ? "text-[#de3163]" : "text-[#454545]"
                )}
                aria-hidden="true"
              >
                {String(slide.number).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-[1.5] font-medium">
                {slide.title}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Slide content */}
      <div
        id={viewerId}
        role="region"
        aria-label="Slide viewer"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="p-6 md:p-10 lg:p-12 min-h-[400px] flex flex-col transition-opacity duration-150"
          style={{ opacity: fadingOut ? 0 : 1 }}
        >
          {/* Ordinal anchor */}
          <span
            className="absolute top-6 right-8 font-mono font-bold text-[140px] leading-none text-white select-none pointer-events-none"
            style={{ opacity: 0.03 }}
            aria-hidden="true"
          >
            {String(activeSlide.number).padStart(2, "0")}
          </span>

          {/* Slide number + progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-[#454545] tracking-wider uppercase">
              Slide {activeIndex + 1} of {slides.length}
            </span>
            <div className="h-px flex-1 mx-4 bg-[#1f1f1f] overflow-hidden">
              <div
                className="h-full bg-[#de3163] transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / slides.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Slide headline */}
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="text-[26px] md:text-[32px] font-semibold tracking-[-0.025em] leading-[1.2] text-[#ededed] whitespace-pre-line relative z-10 focus:outline-none"
          >
            {activeSlide.headline}
          </h3>

          {/* Slide body — rich content blocks or simple text */}
          <SlideContent slide={activeSlide} />

          {/* Slide nav */}
          <div className="mt-auto pt-8 flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="h-9 w-9 rounded-[6px] border border-[#2e2e2e] text-[#a0a0a0] hover:border-[#454545] hover:text-[#ededed] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={goNext}
              disabled={activeIndex === slides.length - 1}
              className="h-9 w-9 rounded-[6px] border border-[#2e2e2e] text-[#a0a0a0] hover:border-[#454545] hover:text-[#ededed] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="font-mono text-xs text-[#454545] ml-1">
              {activeIndex + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ModuleCard ────────────────────────────────────────────────────────── */
function ModuleCard({
  module,
  isOpen,
  onToggle,
}: {
  module: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const triggerId = useId();
  const [presenting, setPresenting] = useState(false);
  const presentBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <article
      className={cn(
        "rounded-[6px] border overflow-hidden transition-[border-color,background-color,box-shadow] duration-150",
        isOpen
          ? "border-[#454545] bg-[#0c0c0c]"
          : "border-[#2e2e2e] bg-[#0f0f0f] hover:border-[#454545] hover:bg-[#111]"
      )}
      style={
        isOpen
          ? {
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 0 60px -20px rgba(222,49,99,0.15)",
            }
          : undefined
      }
    >
      {/* Module header */}
      <div className="w-full flex items-start gap-5 p-6 md:p-8">
        {/* Module number */}
        <span
          className="font-mono text-[11px] tracking-widest text-[#454545] mt-1 shrink-0 uppercase"
          aria-hidden="true"
        >
          {String(module.id).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          {/* Accordion trigger — title area */}
          <button
            id={triggerId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            className="w-full text-left group"
          >
            {/* Label */}
            <span className="font-mono text-[11px] tracking-widest text-[#454545] uppercase">
              {module.label}
            </span>

            {/* Title */}
            <h3 className="mt-1 text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#ededed] leading-[1.3]">
              {module.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-[14px] text-[#878787] leading-[1.6]">
              {module.description}
            </p>
          </button>

          {/* Badge row — outside the accordion trigger */}
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#454545] border border-[#2e2e2e] rounded-full px-2.5 py-0.5">
              {module.slides.length} slides
            </span>
            {isOpen && (
              <span className="font-mono text-[11px] text-[#de3163]">
                Open
              </span>
            )}
            {/* Present CTA */}
            <button
              ref={presentBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                setPresenting(true);
              }}
              className="h-11 md:h-7 px-2.5 rounded-[6px] border border-[#2e2e2e] text-[#a0a0a0] hover:border-[#454545] hover:text-[#ededed] transition-colors duration-150 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase ml-auto"
              aria-label={`Present ${module.title}`}
            >
              <Maximize2 className="h-3 w-3" aria-hidden="true" />
              Present
            </button>
          </div>
        </div>

        {/* Chevron — triggers accordion */}
        <button
          onClick={onToggle}
          className="mt-1 shrink-0 p-1 -m-1 text-[#454545] hover:text-[#878787] transition-colors duration-150"
          aria-label={isOpen ? "Collapse module" : "Expand module"}
          tabIndex={-1}
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Accordion panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn("accordion-grid", isOpen && "open")}
      >
        <div className="accordion-inner">
          <div className="border-t border-[#2e2e2e]">
            {/* Key message */}
            <div className="px-6 md:px-8 py-5 bg-[#0a0a0a] border-b border-[#2e2e2e]">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#454545] mb-1">
                Key message
              </p>
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] italic">
                &ldquo;{module.keyMessage}&rdquo;
              </p>
            </div>

            {/* Slide viewer */}
            <div className="relative">
              <SlideViewer slides={module.slides} moduleId={module.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Presentation mode overlay */}
      {presenting && (
        <PresentationViewer
          slides={module.slides}
          moduleTitle={module.title}
          moduleLabel={module.label}
          onClose={() => {
            setPresenting(false);
            // Return focus to the Present button
            setTimeout(() => presentBtnRef.current?.focus(), 20);
          }}
        />
      )}
    </article>
  );
}

/* ─── ModuleSection ─────────────────────────────────────────────────────── */
export function ModuleSection({ modules }: { modules?: CourseModule[] } = {}) {
  const data = modules ?? courseModules;
  const [openModule, setOpenModule] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleModule = (id: number) => {
    setOpenModule((prev) => (prev === id ? null : id));
  };

  return (
    <section id="modules" aria-label="Course Modules" className="py-20 md:py-28">
      <Container>
        {/* Section header */}
        <div ref={sectionRef} className="reveal mb-12 md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
            Curriculum
          </p>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
            {data.length} modules.
            <br />
            <span className="text-[#878787]">One clear operating model.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#878787] max-w-[520px] leading-[1.7]">
            Each module builds on the previous. Start from the first
            and work your way through.
          </p>
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-4">
          {data.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isOpen={openModule === module.id}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

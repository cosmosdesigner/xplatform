"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Container } from "@/components/layout/Container";
import { allFrameworks, type Framework, type FrameworkItem } from "@/data/course";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Lightbulb,
  Shield,
  BookOpen,
  FlaskConical,
  ChevronDown,
} from "lucide-react";

/* ─── Variant config ────────────────────────────────────────────────────── */

const variantConfig = {
  warning: {
    icon: AlertTriangle,
    accent: "text-amber-400/90",
    border: "border-l-amber-500/50",
    bg: "bg-amber-500/5",
    numberColor: "text-amber-400/60",
  },
  insight: {
    icon: Lightbulb,
    accent: "text-[#de3163]",
    border: "border-l-[#de3163]/50",
    bg: "bg-[#de3163]/5",
    numberColor: "text-[#de3163]/60",
  },
  rule: {
    icon: Shield,
    accent: "text-emerald-400/90",
    border: "border-l-emerald-500/50",
    bg: "bg-emerald-500/5",
    numberColor: "text-emerald-400/60",
  },
  example: {
    icon: BookOpen,
    accent: "text-purple-400/90",
    border: "border-l-purple-500/50",
    bg: "bg-purple-500/5",
    numberColor: "text-purple-400/60",
  },
  exercise: {
    icon: FlaskConical,
    accent: "text-cyan-400/90",
    border: "border-l-cyan-500/50",
    bg: "bg-cyan-500/5",
    numberColor: "text-cyan-400/60",
  },
} as const;

/* ─── FrameworkCard ──────────────────────────────────────────────────────── */

function FrameworkCard({ framework }: { framework: Framework }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerId = useId();
  const firstVariant = framework.items[0]?.variant ?? "insight";
  const config = variantConfig[firstVariant];

  return (
    <div
      className={cn(
        "rounded-[6px] border overflow-hidden transition-[border-color,background-color] duration-150",
        isOpen
          ? "border-[#454545] bg-[#0c0c0c]"
          : "border-[#2e2e2e] bg-[#0f0f0f] hover:border-[#454545] hover:bg-[#111]"
      )}
    >
      {/* Header */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-5 p-6 md:p-8 text-left group"
      >
        {/* Icon */}
        <span
          className={cn(
            "mt-1 shrink-0 h-8 w-8 rounded-[6px] flex items-center justify-center",
            config.bg
          )}
          aria-hidden="true"
        >
          <config.icon className={cn("h-4 w-4", config.accent)} />
        </span>

        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#ededed] leading-[1.3]">
            {framework.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-[14px] text-[#878787] leading-[1.6]">
            {framework.tagline}
          </p>

          {/* Item count */}
          <span className="mt-2 inline-block font-mono text-[11px] text-[#454545] border border-[#2e2e2e] rounded-full px-2.5 py-0.5">
            {framework.items.length} items
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#454545] shrink-0 mt-1 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Panel */}
      <div
        id={panelId}
        aria-labelledby={triggerId}
        className={cn("accordion-grid", isOpen && "open")}
      >
        <div className="accordion-inner">
          <div className="border-t border-[#2e2e2e]">
            {/* Description */}
            <div className="px-6 md:px-8 py-5 bg-[#0a0a0a] border-b border-[#2e2e2e]">
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] max-w-[65ch]">
                {framework.description}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-[#1f1f1f]">
              {framework.items.map((item) => {
                const itemConfig = variantConfig[item.variant];
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "px-6 md:px-8 py-5 flex items-start gap-5 border-l-2",
                      itemConfig.border
                    )}
                  >
                    {/* Number */}
                    <span
                      className={cn(
                        "font-mono text-[28px] md:text-[36px] font-bold leading-none mt-0.5 shrink-0 w-12 text-right select-none",
                        itemConfig.numberColor
                      )}
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>

                    <div className="min-w-0">
                      {/* Label + title */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={cn(
                            "font-mono text-[11px] tracking-widest uppercase font-medium",
                            itemConfig.accent
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      <h4 className="text-[16px] md:text-[17px] font-semibold text-[#ededed] tracking-[-0.01em] leading-[1.3]">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="mt-2 text-[14px] text-[#878787] leading-[1.7] max-w-[60ch]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="px-6 md:px-8 py-5 bg-[#0a0a0a] border-t border-[#2e2e2e]">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#454545] mb-1">
                Key takeaway
              </p>
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] italic max-w-[65ch]">
                &ldquo;{framework.summary}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FrameworksSection ─────────────────────────────────────────────────── */

export function FrameworksSection() {
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

  return (
    <section
      id="frameworks"
      aria-label="Course Frameworks"
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
    >
      <Container>
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="mb-12 md:mb-16 max-w-[640px]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
              Frameworks & checklists
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
              Five frameworks.
              <br />
              <span className="text-[#878787]">One operating system.</span>
            </h2>
            <p className="mt-4 text-[16px] text-[#878787] leading-[1.7]">
              RALPH is the core operating loop. The other four frameworks
              support it — diagnose failures, calibrate autonomy, build
              project intelligence, and review every diff.
            </p>
          </div>

          {/* Framework cards */}
          <div className="flex flex-col gap-4">
            {allFrameworks.map((framework) => (
              <FrameworkCard key={framework.id} framework={framework} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

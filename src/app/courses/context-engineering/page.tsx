"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ModuleSection } from "@/components/sections/ModuleSection";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  contextModules,
  contextFaqItems,
  contextFrameworks,
} from "@/data/context-engineering";
import { ArrowDown, Brain } from "lucide-react";

/* ─── Frameworks Section (course-specific) ──────────────────────────────── */

function ContextFrameworksSection() {
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
      aria-label="Key Frameworks"
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
    >
      <Container>
        <div ref={sectionRef} className="reveal">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
            Key frameworks
          </p>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
            5 models.
            <br />
            <span className="text-[#878787]">One context architecture.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#878787] max-w-[520px] leading-[1.7]">
            Mental models that structure how you think about context for AI
            coding agents.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {contextFrameworks.map((fw) => (
              <div
                key={fw.id}
                className="rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-6"
              >
                <h3 className="text-[16px] font-semibold text-[#ededed] tracking-[-0.01em]">
                  {fw.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#878787] leading-[1.6]">
                  {fw.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {fw.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[13px] text-[#a0a0a0] leading-[1.6]"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#6366f1] shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function ContextHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () => {
    document
      .querySelector("#modules")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      aria-label="Course introduction"
    >
      {/* Radial glow — indigo accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(99,102,241,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container>
        <div
          ref={sectionRef}
          className="reveal relative z-10 flex flex-col items-center gap-6 py-32"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span
              className="h-px w-8 bg-[#6366f1]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#878787]">
              The Discipline That Replaced Prompt Engineering
            </span>
            <span
              className="h-px w-8 bg-[#6366f1]"
              aria-hidden="true"
            />
          </div>

          {/* Logo mark */}
          <div className="h-16 w-16 rounded-[12px] bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
            <Brain
              className="h-8 w-8 text-[#6366f1]"
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h1
            className="text-[#ededed] font-semibold leading-[0.95] tracking-[-0.04em] max-w-4xl"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Context Engineering
            <br />
            <span className="text-[#a0a0a0]">For Developers.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-[560px] text-[18px] md:text-[20px] text-[#a0a0a0] leading-[1.65] mt-2">
            The art and science of structuring what AI coding agents see.
            From AGENTS.md to enterprise context architectures
            — 4 modules, 26 slides, real-world patterns.
          </p>

          {/* Module badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {contextModules.map((mod) => (
              <span
                key={mod.id}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-[#2e2e2e] text-[#454545]"
              >
                {mod.label}: {mod.title.split(" ").slice(0, 3).join(" ")}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-2 text-[#454545]">
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">
                4
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase">
                Modules
              </span>
            </span>
            <span
              className="h-8 w-px bg-[#2e2e2e]"
              aria-hidden="true"
            />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">
                26
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase">
                Slides
              </span>
            </span>
            <span
              className="h-8 w-px bg-[#2e2e2e]"
              aria-hidden="true"
            />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">
                30+
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase">
                Patterns
              </span>
            </span>
          </div>

          {/* CTA */}
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              handleScrollDown();
            }}
            className="mt-4 h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2"
          >
            Start learning
          </a>
        </div>
      </Container>

      {/* Scroll hint */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 text-[#454545] hover:text-[#878787] transition-colors duration-200"
        aria-label="Scroll to modules"
      >
        <div
          className="h-10 w-px bg-gradient-to-b from-transparent to-[#2e2e2e]"
          aria-hidden="true"
        />
        <ArrowDown
          className="h-4 w-4 animate-bounce"
          aria-hidden="true"
        />
      </button>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ContextEngineeringCourse() {
  return (
    <>
      <ContextHero />
      <ModuleSection modules={contextModules} accent="#6366f1" />
      <ContextFrameworksSection />
      <FaqSection items={contextFaqItems} />
    </>
  );
}

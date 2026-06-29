"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ModuleSection } from "@/components/sections/ModuleSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { loomModules, loomFaqItems } from "@/data/loom";
import { ArrowDown, Workflow } from "lucide-react";

function LoomHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () => {
    document.querySelector("#modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden" aria-label="Course introduction">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(99,102,241,0.10) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <Container>
        <div ref={sectionRef} className="reveal relative z-10 flex flex-col items-center gap-6 py-32">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#6366f1]" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#878787]">Operational Model · XPlatform</span>
            <span className="h-px w-8 bg-[#6366f1]" aria-hidden="true" />
          </div>

          <div className="h-16 w-16 rounded-[12px] bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
            <Workflow className="h-8 w-8 text-[#6366f1]" aria-hidden="true" />
          </div>

          <h1 className="text-[#ededed] font-semibold leading-[0.95] tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
            Loom v2
            <br />
            <span className="text-[#a0a0a0]">How we deliver.</span>
          </h1>

          <p className="max-w-[520px] text-[18px] md:text-[20px] text-[#a0a0a0] leading-[1.65] mt-2">
            The 16-point operational model for continuous feature delivery.
            From batch cycles to flow-based execution with clear ownership
            and validation gates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {["Module 1 · The Why", "Module 2 · Before You Build", "Module 3 · During Dev", "Module 4 · When It Breaks", "Module 5 · Improvement"].map((badge) => (
              <span key={badge} className="font-mono text-[11px] tracking-wider uppercase px-3 py-1 rounded-full border border-[#2e2e2e] text-[#454545]">{badge}</span>
            ))}
          </div>

          <div className="flex items-center gap-8 mt-4 text-[#454545]">
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">16</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Points</span>
            </span>
            <span className="h-8 w-px bg-[#2e2e2e]" aria-hidden="true" />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">5</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Modules</span>
            </span>
            <span className="h-8 w-px bg-[#2e2e2e]" aria-hidden="true" />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">4</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Environments</span>
            </span>
          </div>

          <button onClick={handleScrollDown} className="mt-6 h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2">
            Start learning
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <button onClick={handleScrollDown} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#454545] hover:text-[#878787] transition-colors duration-150" aria-label="Scroll to modules">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-[#2e2e2e]" aria-hidden="true" />
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}

export default function LoomV2Course() {
  return (
    <>
      <LoomHero />
      <ModuleSection modules={loomModules} accent="#6366f1" />
      <FaqSection items={loomFaqItems} />
    </>
  );
}

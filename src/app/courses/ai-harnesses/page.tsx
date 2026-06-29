"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ModuleSection } from "@/components/sections/ModuleSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { harnessModules, harnessFaqItems, harnessFrameworks } from "@/data/harnesses";
import { ArrowDown, Terminal } from "lucide-react";

/* ─── Frameworks Section ────────────────────────────────────────────────── */

function HarnessFrameworksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="frameworks" aria-label="Key Frameworks" className="py-20 md:py-28 border-t border-[#2e2e2e]">
      <Container>
        <div ref={sectionRef} className="reveal">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">Key frameworks</p>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
            3 models.
            <br />
            <span className="text-[#878787]">Compare, configure, onboard.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {harnessFrameworks.map((fw) => (
              <div key={fw.id} className="rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-6">
                <h3 className="text-[16px] font-semibold text-[#ededed] tracking-[-0.01em]">{fw.title}</h3>
                <p className="mt-2 text-[13px] text-[#878787] leading-[1.6]">{fw.description}</p>
                <ul className="mt-4 space-y-2">
                  {fw.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#a0a0a0] leading-[1.6]">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#10b981] shrink-0" aria-hidden="true" />
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

function HarnessHero() {
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
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(16,185,129,0.10) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <Container>
        <div ref={sectionRef} className="reveal relative z-10 flex flex-col items-center gap-6 py-32">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#10b981]" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#878787]">The Practical Companion</span>
            <span className="h-px w-8 bg-[#10b981]" aria-hidden="true" />
          </div>

          <div className="h-16 w-16 rounded-[12px] bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
            <Terminal className="h-8 w-8 text-[#10b981]" aria-hidden="true" />
          </div>

          <h1 className="text-[#ededed] font-semibold leading-[0.95] tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
            AI Coding Harnesses
            <br />
            <span className="text-[#a0a0a0]">Set Up Right.</span>
          </h1>

          <p className="max-w-[560px] text-[18px] md:text-[20px] text-[#a0a0a0] leading-[1.65] mt-2">
            Install, configure, and master your AI coding harness.
            Hooks, plugins, parallel workflows, token optimization,
            and enterprise setup — the practical skills that
            make agents productive.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {harnessModules.map((mod) => (
              <span key={mod.id} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-[#2e2e2e] text-[#454545]">
                {mod.label}: {mod.title.split(" ").slice(0, 3).join(" ")}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8 mt-2 text-[#454545]">
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">5</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Modules</span>
            </span>
            <span className="h-8 w-px bg-[#2e2e2e]" aria-hidden="true" />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">32</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Slides</span>
            </span>
            <span className="h-8 w-px bg-[#2e2e2e]" aria-hidden="true" />
            <span className="flex flex-col items-center gap-1">
              <span className="font-mono text-[24px] font-bold text-[#ededed]">3</span>
              <span className="text-[11px] font-mono tracking-wider uppercase">Harnesses</span>
            </span>
          </div>

          <a href="#modules" onClick={(e) => { e.preventDefault(); handleScrollDown(); }} className="mt-4 h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2">
            Get started
          </a>
        </div>
      </Container>

      <button onClick={handleScrollDown} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 text-[#454545] hover:text-[#878787] transition-colors duration-200" aria-label="Scroll to modules">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-[#2e2e2e]" aria-hidden="true" />
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function HarnessCourse() {
  return (
    <>
      <HarnessHero />
      <ModuleSection modules={harnessModules} accent="#10b981" />
      <HarnessFrameworksSection />
      <FaqSection items={harnessFaqItems} />
    </>
  );
}

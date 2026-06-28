"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ralphFramework } from "@/data/course";

export function RalphSection() {
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

  // Pre-compute index to avoid O(n²) lookup inside render
  const cards = ralphFramework.map((item, index) => ({ ...item, index }));

  return (
    <section
      id="ralph"
      aria-label="RALPH Framework"
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
    >
      <Container>
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="mb-12 md:mb-16 max-w-[640px]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
              Operating model
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
              The RALPH framework
            </h2>
            <p className="mt-4 text-[16px] text-[#878787] leading-[1.7]">
              A memorable operating loop for every task you give an AI coding
              agent. Use it for bug fixes, new features, refactors, and
              migrations.
            </p>
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            role="list"
          >
            {cards.map((item) => (
              <article
                key={item.letter}
                role="listitem"
                className="relative overflow-hidden rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-6 hover:border-[#454545] hover:bg-[#111] transition-all duration-150 group"
              >
                {/* Big letter background */}
                <span
                  className="absolute -top-2 -right-2 font-mono font-bold text-[80px] leading-none text-white select-none pointer-events-none"
                  style={{ opacity: 0.04 }}
                  aria-hidden="true"
                >
                  {item.letter}
                </span>

                {/* Step number */}
                <span
                  className="font-mono text-[11px] text-[#454545] tracking-widest"
                  aria-hidden="true"
                >
                  {String(item.index + 1).padStart(2, "0")}
                </span>

                {/* Letter */}
                <div className="mt-3 mb-2">
                  <span className="text-[48px] font-bold font-mono text-[#ededed] leading-none">
                    {item.letter}
                  </span>
                </div>

                {/* Word */}
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#de3163] mb-2">
                  {item.word}
                </p>

                {/* Description */}
                <p className="text-[13px] text-[#878787] leading-[1.65] group-hover:text-[#a0a0a0] transition-colors duration-150">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {/* Workflow summary */}
          <div className="mt-10 flex flex-wrap items-center gap-2 text-[13px] text-[#454545]">
            {ralphFramework.map((item, i) => (
              <span key={item.letter} className="flex items-center gap-2">
                <span className="font-mono font-semibold text-[#a0a0a0]">
                  {item.letter}
                </span>
                <span>{item.word}</span>
                {i < ralphFramework.length - 1 && (
                  <span className="text-[#2e2e2e] mx-1" aria-hidden="true">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

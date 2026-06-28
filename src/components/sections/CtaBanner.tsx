"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <section
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
      aria-label="Course call to action"
    >
      <Container>
        <div
          ref={ref}
          className="reveal rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(222,49,99,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
                Start now
              </p>
              <h2 className="text-[24px] md:text-[32px] font-semibold tracking-[-0.025em] text-[#ededed] leading-[1.2]">
                Understand → Plan → Change → Validate
              </h2>
              <p className="mt-3 text-[15px] text-[#878787] max-w-[440px] leading-[1.65]">
                The workflow that turns an AI coding agent into a reliable
                development partner. Three modules. One clear model.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => {
                  document
                    .querySelector("#modules")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              className="h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2"
            >
              Go to the curriculum
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

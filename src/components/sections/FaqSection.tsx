"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Container } from "@/components/layout/Container";
import { faqItems, type FaqItem } from "@/data/course";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = useId();
  const triggerId = useId();

  return (
    <div className="border-b border-[#2e2e2e]">
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span
          className={cn(
            "text-[15px] md:text-[16px] font-medium leading-[1.5] transition-colors duration-150",
            isOpen ? "text-[#ededed]" : "text-[#a0a0a0] group-hover:text-[#ededed]"
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "shrink-0 h-5 w-5 flex items-center justify-center rounded-full border transition-all duration-150",
            isOpen
              ? "border-[#454545] text-[#ededed]"
              : "border-[#2e2e2e] text-[#454545] group-hover:border-[#454545] group-hover:text-[#a0a0a0]"
          )}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="h-3 w-3" />
          ) : (
            <Plus className="h-3 w-3" />
          )}
        </span>
      </button>

      <div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        className={cn("accordion-grid", isOpen && "open")}
      >
        <div className="accordion-inner">
          <p className="pb-5 text-[14px] md:text-[15px] text-[#878787] leading-[1.75] max-w-[70ch]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ items }: { items?: FaqItem[] } = {}) {
  const data = items ?? faqItems;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
    >
      <Container>
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="mb-12 max-w-[640px]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
              FAQ
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
              Common questions
            </h2>
          </div>

          {/* FAQ list */}
          <div className="border-t border-[#2e2e2e]">
            {data.map((item, i) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

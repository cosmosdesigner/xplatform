"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Container } from "@/components/layout/Container";
import {
  enterpriseTopics,
  promptLibrary,
  failurePatterns,
  type ResourceCard,
  type PromptTemplate,
  type FailurePattern,
} from "@/data/course";
import { cn } from "@/lib/utils";
import {
  Shield,
  Server,
  Users,
  BarChart3,
  Terminal,
  AlertTriangle,
  ChevronDown,
  Copy,
  Check,
  Lightbulb,
} from "lucide-react";

/* ─── Icon map ──────────────────────────────────────────────────────────── */

const iconMap = {
  shield: Shield,
  server: Server,
  users: Users,
  chart: BarChart3,
  terminal: Terminal,
  alert: AlertTriangle,
} as const;

const calloutStyles = {
  warning: { border: "border-l-amber-500/60", bg: "bg-amber-500/5", title: "text-amber-400/90" },
  insight: { border: "border-l-[#de3163]/60", bg: "bg-[#de3163]/5", title: "text-[#e8607e]" },
  rule: { border: "border-l-emerald-500/60", bg: "bg-emerald-500/5", title: "text-emerald-400/90" },
} as const;

/* ─── Enterprise Topic Card ─────────────────────────────────────────────── */

function TopicCard({ topic }: { topic: ResourceCard }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerId = useId();
  const Icon = iconMap[topic.icon];

  return (
    <div
      className={cn(
        "rounded-[6px] border overflow-hidden transition-[border-color,background-color] duration-150",
        isOpen
          ? "border-[#454545] bg-[#0c0c0c]"
          : "border-[#2e2e2e] bg-[#0f0f0f] hover:border-[#454545] hover:bg-[#111]"
      )}
    >
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-5 p-6 md:p-8 text-left group"
      >
        <span className="mt-1 shrink-0 h-8 w-8 rounded-[6px] bg-[#de3163]/5 flex items-center justify-center" aria-hidden="true">
          <Icon className="h-4 w-4 text-[#de3163]" />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#ededed] leading-[1.3]">
            {topic.title}
          </h3>
          <p className="mt-1 text-[14px] text-[#878787] leading-[1.6]">
            {topic.description}
          </p>
        </div>
        <ChevronDown
          className={cn("h-5 w-5 text-[#454545] shrink-0 mt-1 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
          aria-hidden="true"
        />
      </button>

      <div id={panelId} aria-labelledby={triggerId} className={cn("accordion-grid", isOpen && "open")}>
        <div className="accordion-inner">
          <div className="border-t border-[#2e2e2e] divide-y divide-[#1f1f1f]">
            {topic.items.map((item) => (
              <div key={item.label} className="px-6 md:px-8 py-4 flex items-start gap-4">
                <span className="font-mono text-[11px] text-[#de3163]/60 tracking-widest uppercase mt-0.5 shrink-0 w-auto font-medium">
                  {item.label}
                </span>
                <p className="text-[14px] text-[#878787] leading-[1.65] max-w-[60ch]">
                  {item.detail}
                </p>
              </div>
            ))}
            {topic.callout && (
              <div className={cn("mx-6 md:mx-8 my-5 rounded-[6px] border-l-2 p-4", calloutStyles[topic.callout.variant].border, calloutStyles[topic.callout.variant].bg)}>
                <p className={cn("font-mono text-[11px] tracking-widest uppercase font-medium mb-1", calloutStyles[topic.callout.variant].title)}>
                  {topic.callout.title}
                </p>
                <p className="text-[14px] text-[#a0a0a0] leading-[1.7]">{topic.callout.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Prompt Card ───────────────────────────────────────────────────────── */

function PromptCard({ prompt }: { prompt: PromptTemplate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-5 hover:border-[#454545] hover:bg-[#111] transition-[border-color,background-color] duration-150 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#de3163]/60 font-medium">
            {prompt.category}
          </span>
          <h4 className="mt-0.5 text-[15px] font-semibold text-[#ededed] tracking-[-0.01em] leading-[1.3]">
            {prompt.title}
          </h4>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 h-7 w-7 rounded-[6px] border border-[#2e2e2e] text-[#454545] hover:border-[#454545] hover:text-[#a0a0a0] transition-colors duration-150 flex items-center justify-center"
          aria-label={copied ? "Copied" : "Copy prompt"}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
      <pre className="rounded-[6px] bg-[#0a0a0a] border border-[#1f1f1f] p-3 overflow-x-auto flex-1">
        <code className="font-mono text-[12px] text-[#a0a0a0] leading-[1.7] whitespace-pre-wrap">{prompt.prompt}</code>
      </pre>
      <p className="mt-3 text-[12px] text-[#454545] leading-[1.6] italic">{prompt.notes}</p>
    </div>
  );
}

/* ─── Failure Pattern Row ───────────────────────────────────────────────── */

const severityStyles = {
  critical: { badge: "bg-red-500/10 text-red-400 border-red-500/30", dot: "bg-red-400" },
  major: { badge: "bg-amber-500/10 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
  minor: { badge: "bg-[#454545]/20 text-[#878787] border-[#2e2e2e]", dot: "bg-[#878787]" },
} as const;

function FailureRow({ pattern }: { pattern: FailurePattern }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerId = useId();
  const style = severityStyles[pattern.severity];

  return (
    <div className="border-b border-[#1f1f1f]">
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-4 px-1 text-left group"
      >
        <span className={cn("h-2 w-2 rounded-full shrink-0", style.dot)} aria-hidden="true" />
        <span className={cn("font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0", style.badge)}>
          {pattern.severity}
        </span>
        <span className={cn("text-[15px] font-medium leading-[1.4] flex-1 transition-colors duration-150", isOpen ? "text-[#ededed]" : "text-[#a0a0a0] group-hover:text-[#ededed]")}>
          {pattern.title}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-[#454545] shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")} aria-hidden="true" />
      </button>

      <div id={panelId} aria-labelledby={triggerId} className={cn("accordion-grid", isOpen && "open")}>
        <div className="accordion-inner">
          <div className="pl-10 pr-1 pb-5 space-y-3">
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#454545] mb-1">What happens</p>
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] max-w-[65ch]">{pattern.what}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#454545] mb-1">Why it happens</p>
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] max-w-[65ch]">{pattern.why}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-emerald-400/70 mb-1">How to prevent it</p>
              <p className="text-[14px] text-[#a0a0a0] leading-[1.65] max-w-[65ch]">{pattern.fix}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Resources Section ─────────────────────────────────────────────────── */

export function ResourcesSection() {
  const [activeTab, setActiveTab] = useState<"enterprise" | "prompts" | "failures">("enterprise");
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

  const tabs = [
    { id: "enterprise" as const, label: "Enterprise", count: enterpriseTopics.length },
    { id: "prompts" as const, label: "Prompt library", count: promptLibrary.length },
    { id: "failures" as const, label: "Failure patterns", count: failurePatterns.length },
  ];

  return (
    <section id="resources" aria-label="Resources" className="py-20 md:py-28 border-t border-[#2e2e2e]">
      <Container>
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="mb-10 md:mb-14 max-w-[640px]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
              Resources
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
              Enterprise playbook
            </h2>
            <p className="mt-4 text-[16px] text-[#878787] leading-[1.7]">
              Enterprise topics, copy-pasteable prompts, and a gallery of
              real failure patterns — everything you need beyond the modules.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-8 border-b border-[#2e2e2e] overflow-x-auto" role="tablist" aria-label="Resource categories">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-3 text-[13px] font-medium transition-colors duration-150 border-b-2 shrink-0",
                  activeTab === tab.id
                    ? "text-[#ededed] border-[#de3163]"
                    : "text-[#878787] border-transparent hover:text-[#a0a0a0]"
                )}
              >
                {tab.label}
                <span className="ml-2 font-mono text-[10px] text-[#454545]">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Tab panels */}
          {activeTab === "enterprise" && (
            <div className="flex flex-col gap-4" role="tabpanel" aria-label="Enterprise topics">
              {enterpriseTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}

          {activeTab === "prompts" && (
            <div role="tabpanel" aria-label="Prompt library">
              <p className="mb-6 text-[14px] text-[#878787] flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#454545]" aria-hidden="true" />
                Click the copy button to copy any prompt. Replace the [bracketed] placeholders with your specifics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promptLibrary.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "failures" && (
            <div role="tabpanel" aria-label="Failure patterns">
              <p className="mb-6 text-[14px] text-[#878787]">
                Real failure patterns from AI-assisted development. Each one describes what happens, why, and how to prevent it.
              </p>
              <div className="border-t border-[#2e2e2e]">
                {failurePatterns.map((pattern) => (
                  <FailureRow key={pattern.id} pattern={pattern} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

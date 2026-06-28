"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import {
  Bot,
  Key,
  Server,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Server,
    title: "Choose and install the harness",
    description:
      "Pick your AI coding agent. Install it in your development environment and verify it runs.",
    tools: [
      {
        name: "Claude Code",
        detail: "npm install -g @anthropic-ai/claude-code",
        needsApiKey: true,
      },
      {
        name: "OpenCode",
        detail: "npm install -g opencode",
        needsApiKey: true,
      },
      {
        name: "Codex",
        detail: "npm install -g @openai/codex",
        needsApiKey: true,
      },
      {
        name: "Atomica",
        detail: "Internal harness — provided by your organisation",
        needsApiKey: false,
      },
    ],
  },
  {
    number: "02",
    icon: Key,
    title: "Get access to the modelaccess API",
    description:
      "Request access to the enterprise model gateway. This is the API that routes requests to the LLM providers (Claude, GPT, Gemini) through the organisation's approved endpoint.",
    details: [
      "Contact your platform team or GenAI team to request access",
      "You will receive a base URL (e.g. modelaccess.arq-xp-genai.qa.mbcp.cloud)",
      "Access is required for Claude Code, OpenCode, and Codex",
      "Atomica connects to models internally — no separate access needed",
    ],
  },
  {
    number: "03",
    icon: Key,
    title: "Obtain your API key",
    description:
      "Each developer needs a personal API key to authenticate with the modelaccess gateway. This key is used by your harness to send requests to the LLM.",
    details: [
      "Request your key from the platform team or self-service portal",
      "The key format is typically: genai-sk-... (a long alphanumeric string)",
      "Configure it as an environment variable — never commit it to code",
      "Atomica handles authentication internally — no personal key needed",
    ],
    warning:
      "Never store API keys in AGENTS.md, source code, or version control. Use environment variables or your OS keychain.",
  },
];

function ToolBadge({
  name,
  needsApiKey,
}: {
  name: string;
  needsApiKey: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full border",
        needsApiKey
          ? "border-[#2e2e2e] text-[#878787]"
          : "border-emerald-500/30 text-emerald-400/80"
      )}
    >
      {!needsApiKey && (
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      )}
      {name}
    </span>
  );
}

export function PrerequisitesSection() {
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
      id="prerequisites"
      aria-label="Prerequisites"
      className="py-20 md:py-28 border-t border-[#2e2e2e]"
    >
      <Container>
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="mb-12 md:mb-16 max-w-[640px]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
              Before you start
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
              Prerequisites
            </h2>
            <p className="mt-4 text-[16px] text-[#878787] leading-[1.7]">
              This is an enterprise environment. You need three things
              before you can start working with an AI coding agent.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="rounded-[6px] border border-[#2e2e2e] bg-[#0f0f0f] p-6 md:p-8 hover:border-[#454545] hover:bg-[#111] transition-[border-color,background-color] duration-150"
                >
                  <div className="flex items-start gap-5">
                    {/* Number + icon */}
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <span
                        className="font-mono text-[11px] text-[#454545] tracking-widest"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div className="h-10 w-10 rounded-[6px] bg-[#de3163]/5 flex items-center justify-center">
                        <Icon
                          className="h-5 w-5 text-[#de3163]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Title */}
                      <h3 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#ededed] leading-[1.3]">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-[14px] text-[#878787] leading-[1.65] max-w-[60ch]">
                        {step.description}
                      </p>

                      {/* Tool install commands (step 1 only) */}
                      {"tools" in step && step.tools && (
                        <div className="mt-4 space-y-2">
                          {step.tools.map((tool) => (
                            <div
                              key={tool.name}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                            >
                              <ToolBadge
                                name={tool.name}
                                needsApiKey={tool.needsApiKey}
                              />
                              <code className="font-mono text-[12px] text-[#454545] leading-[1.5]">
                                {tool.detail}
                              </code>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Detail bullets (steps 2 & 3) */}
                      {"details" in step && step.details && (
                        <ul className="mt-4 space-y-1.5">
                          {step.details.map((detail, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-[13px] text-[#a0a0a0] leading-[1.65]"
                            >
                              <ArrowRight
                                className="h-3.5 w-3.5 text-[#454545] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Warning (step 3) */}
                      {"warning" in step && step.warning && (
                        <div className="mt-4 rounded-[6px] border-l-2 border-l-amber-500/60 bg-amber-500/5 p-4">
                          <p className="text-[13px] text-[#a0a0a0] leading-[1.65]">
                            <span className="font-mono text-[11px] tracking-widest uppercase text-amber-400/90 font-medium">
                              Security
                            </span>
                            <br />
                            {step.warning}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atomica note */}
          <div className="mt-8 flex items-start gap-3 rounded-[6px] border border-emerald-500/20 bg-emerald-500/5 p-5">
            <Bot
              className="h-5 w-5 text-emerald-400/80 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-[14px] text-[#ededed] font-medium">
                Using Atomica?
              </p>
              <p className="mt-1 text-[13px] text-[#878787] leading-[1.65] max-w-[55ch]">
                Atomica is the internal AI harness. It handles model access
                and authentication automatically — you do not need a
                separate API key or modelaccess gateway configuration.
                Contact your team lead for Atomica onboarding.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

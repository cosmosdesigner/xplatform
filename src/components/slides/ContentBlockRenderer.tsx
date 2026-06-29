"use client";

import { cn } from "@/lib/utils";
import { type ContentBlock, type Slide } from "@/data/course";
import {
  AlertTriangle,
  Lightbulb,
  Shield,
  BookOpen,
  FlaskConical,
} from "lucide-react";

/* ─── Callout Config ────────────────────────────────────────────────────── */

export const calloutConfig = {
  warning: {
    icon: AlertTriangle,
    border: "border-l-amber-500/60",
    bg: "bg-amber-500/5",
    title: "text-amber-400/90",
  },
  insight: {
    icon: Lightbulb,
    border: "border-l-[#de3163]/60",
    bg: "bg-[#de3163]/5",
    title: "text-[#e8607e]",
  },
  rule: {
    icon: Shield,
    border: "border-l-emerald-500/60",
    bg: "bg-emerald-500/5",
    title: "text-emerald-400/90",
  },
  example: {
    icon: BookOpen,
    border: "border-l-purple-500/60",
    bg: "bg-purple-500/5",
    title: "text-purple-400/90",
  },
  exercise: {
    icon: FlaskConical,
    border: "border-l-cyan-500/60",
    bg: "bg-cyan-500/5",
    title: "text-cyan-400/90",
  },
} as const;

/* ─── Default accent ────────────────────────────────────────────────────── */

const DEFAULT_ACCENT = "#de3163";
const DEFAULT_ACCENT_LIGHT = "#e8607e";

/* ─── Content Block Renderer ────────────────────────────────────────────── */

export function ContentBlockRenderer({
  block,
  accent,
}: {
  block: ContentBlock;
  accent?: string;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[15px] md:text-[16px] text-[#a0a0a0] leading-[1.75] max-w-[65ch]">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h4 className="text-[17px] md:text-[18px] font-semibold text-[#ededed] tracking-[-0.01em] mt-2">
          {block.text}
        </h4>
      );

    case "bullets":
      return (
        <ul className="space-y-2 max-w-[65ch]">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#a0a0a0] leading-[1.7]"
            >
              <span
                className="mt-2 h-1.5 w-1.5 rounded-full bg-[#454545] shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          className="border-l-2 pl-5 py-1 max-w-[60ch]"
          style={{ borderColor: `${accent ?? DEFAULT_ACCENT}66` }}
        >
          <p className="text-[16px] md:text-[17px] text-[#ededed] leading-[1.7] font-medium whitespace-pre-line italic">
            {block.text}
          </p>
          {block.attribution && (
            <cite className="mt-2 block text-[13px] text-[#454545] font-mono not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "code":
      return (
        <div className="max-w-[65ch]">
          {block.caption && (
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#454545] mb-2">
              {block.caption}
            </p>
          )}
          <pre className="rounded-[6px] border border-[#2e2e2e] bg-[#0a0a0a] p-4 overflow-x-auto">
            <code className="font-mono text-[13px] text-[#a0a0a0] leading-[1.75] whitespace-pre-wrap">
              {block.code}
            </code>
          </pre>
        </div>
      );

    case "comparison":
      return (
        <div className="max-w-[65ch] overflow-x-auto">
          <table className="w-full text-[13px] md:text-[14px] border-collapse">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="text-left font-mono text-[11px] tracking-widest uppercase text-[#454545] pb-3 pr-6 border-b border-[#2e2e2e]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([left, right], i) => (
                <tr key={i} className="border-b border-[#1f1f1f]">
                  <td className="py-3 pr-6 text-[#a0a0a0] leading-[1.6] align-top">
                    {left}
                  </td>
                  <td className="py-3 text-[#a0a0a0] leading-[1.6] align-top">
                    {right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const config = calloutConfig[block.variant];
      const Icon = config.icon;
      const isInsight = block.variant === "insight";
      const accentColor = accent ?? DEFAULT_ACCENT;
      const accentLight = accent ? `${accent}cc` : DEFAULT_ACCENT_LIGHT;
      return (
        <div
          className={cn(
            "rounded-[6px] border-l-2 p-4 md:p-5 max-w-[65ch]",
            !isInsight && config.border,
            !isInsight && config.bg
          )}
          style={
            isInsight
              ? {
                  borderColor: `${accentColor}99`,
                  backgroundColor: `${accentColor}0d`,
                }
              : undefined
          }
        >
          {block.title && (
            <div className="flex items-center gap-2 mb-2">
              <Icon
                className={cn("h-4 w-4 shrink-0", !isInsight && config.title)}
                style={isInsight ? { color: accentLight } : undefined}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-mono text-[11px] tracking-widest uppercase font-medium",
                  !isInsight && config.title
                )}
                style={isInsight ? { color: accentLight } : undefined}
              >
                {block.title}
              </span>
            </div>
          )}
          <p className="text-[14px] md:text-[15px] text-[#a0a0a0] leading-[1.7] whitespace-pre-line">
            {block.text}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

/* ─── Slide Content ─────────────────────────────────────────────────────── */

export function SlideContent({
  slide,
  accent,
}: {
  slide: Slide;
  accent?: string;
}) {
  // Rich content blocks take precedence over simple body
  if (slide.sections && slide.sections.length > 0) {
    return (
      <div className="mt-5 space-y-5 relative z-10">
        {slide.sections.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} accent={accent} />
        ))}
      </div>
    );
  }

  // Fallback to simple body for backwards compatibility
  if (slide.body) {
    return (
      <p className="mt-5 text-[15px] md:text-[16px] text-[#a0a0a0] leading-[1.75] max-w-[65ch] relative z-10">
        {slide.body}
      </p>
    );
  }

  return null;
}

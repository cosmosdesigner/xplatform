# AGENTS.md — course-site

## What this project is

XPlatform Academy — a multi-course learning platform built with Next.js. Static site, no backend, no API routes, no database.

## Stack

- Next.js 16.2.9
- React 19.2.4
- TypeScript 5 (strict mode)
- Tailwind CSS v4 (CSS-based config via `@import "tailwindcss"` + `@theme inline` in globals.css, no tailwind.config.js)
- TanStack Query ^5.101.2
- lucide-react ^1.21.0
- clsx ^2.1.1 + tailwind-merge ^3.6.0

## Commands

```
npm run dev    — start dev server
npm run build  — production build (must pass with zero errors)
npm run start  — serve production build
npm run lint   — run eslint
```

## Architecture

```
src/
├── app/                          — App Router pages and layouts
│   ├── page.tsx                  — Homepage
│   ├── layout.tsx                — Root layout (fonts, providers, skip-link)
│   ├── globals.css               — Design tokens, animations, reduced-motion
│   └── courses/
│       ├── ai-agents/            — AI Coding Agents course (page + layout)
│       ├── ai-harnesses/         — AI Coding Harnesses course (page + layout)
│       ├── context-engineering/  — Context Engineering course (page + layout)
│       ├── loom-v2/              — Loom v2 course (page + layout)
│       └── mcp-development/      — Building MCP Servers course (page + layout)
├── components/
│   ├── layout/                   — Container, Nav, LoomNav, ContextNav, McpNav, HarnessNav, Footer
│   ├── presentation/             — PresentationViewer (full-screen slide viewer)
│   ├── sections/                 — HeroSection, ModuleSection, FaqSection, ResourcesSection, PrerequisitesSection, RalphSection, FrameworksSection, CtaBanner
│   └── slides/                   — ContentBlockRenderer (shared rendering for slides)
├── data/                         — Static course data (no API calls)
│   ├── catalog.ts                — Course catalog (5 courses)
│   ├── course.ts                 — AI Coding Agents data
│   ├── context-engineering.ts    — Context Engineering data
│   ├── harnesses.ts              — AI Coding Harnesses data
│   ├── loom.ts                   — Loom v2 data
│   └── mcp-servers.ts            — Building MCP Servers data
├── lib/
│   └── utils.ts                  — cn() helper (clsx + tailwind-merge)
└── providers/
    └── QueryProvider.tsx         — TanStack Query provider
```

## Design tokens (from globals.css :root)

- Backgrounds: #080808 (base), #0f0f0f (surface), #111111 (raised), #0c0c0c (inset)
- Borders: #2e2e2e (subtle), #1f1f1f (muted), #454545 (hover)
- Text: #ededed (primary), #a0a0a0 (secondary), #878787 (muted), #454545 (dim)
- Accent: #de3163 (cerise — homepage only)
- Focus ring: #e8607e
- Fonts: Geist Sans (--font-sans), Geist Mono (--font-mono), Playfair Display (--font-serif)

## Per-course accent colours

Each course has its own accent colour passed via the `accent` prop:

- AI Coding Agents: #de3163 (cerise)
- AI Coding Harnesses: #10b981 (emerald)
- Context Engineering: #6366f1 (indigo)
- Building MCP Servers: #06b6d4 (cyan)
- Loom v2: #6366f1 (indigo)

## Conventions

- Use `cn()` from `src/lib/utils.ts` for all className merging
- All decorative icons must have `aria-hidden="true"`
- Dark theme only — no light mode
- Do not add npm dependencies without asking
- Do not edit files outside the current task scope
- Slide content uses 7 block types: paragraph, bullets, quote, code, comparison, callout (5 variants), subheading
- Callout variants: warning, insight, rule, example, exercise
- Bonus modules: detected by `module.label.toLowerCase().includes("bonus")` — get accent glow + star icon + accent top bar

## Routes

```
/                              — Homepage (luxury editorial hero)
/courses/ai-agents             — AI Coding Agents (5 modules)
/courses/ai-harnesses          — AI Coding Harnesses (5 modules)
/courses/context-engineering   — Context Engineering (4 modules)
/courses/loom-v2               — Loom v2 (5 modules, status: coming-soon)
/courses/mcp-development       — Building MCP Servers (5 modules)
```

## Key patterns

- Each course has its own layout file with a course-specific nav component
- ModuleSection, FaqSection, and ContentBlockRenderer are shared across all courses
- PresentationViewer is a full-screen overlay triggered by a "Present" button on each module
- Presentation mode uses CSS `zoom: 1.45` to scale slide content
- The homepage hero is a luxury editorial layout with transparent nav, Playfair Display serif, and course quick-nav panel

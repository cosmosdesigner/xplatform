export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: "available" | "coming-soon";
  modules: number;
  exercises: number;
  frameworks: number;
  duration: string;
  tags: string[];
  href: string;
  accent: string;
}

export const courses: Course[] = [
  {
    id: "loom-v2",
    slug: "loom-v2",
    title: "Loom v2",
    subtitle: "How We Deliver.",
    description:
      "The 16-point operational model for continuous feature delivery. From batch cycles to flow-based execution with clear ownership, validation gates, and independent deployments. Start here — this is how every XPlatform team works.",
    status: "available",
    modules: 5,
    exercises: 0,
    frameworks: 16,
    duration: "4-6 hours",
    tags: [
      "Operational Model",
      "Continuous Delivery",
      "Ownership",
      "Validation Gates",
      "XPlatform",
    ],
    href: "/courses/loom-v2",
    accent: "#6366f1",
  },
  {
    id: "ai-agents",
    slug: "ai-agents",
    title: "AI Coding Agents",
    subtitle: "Done Right.",
    description:
      "The mental model, the daily workflow, and the project conventions that turn an AI agent into a reliable development partner. Four modules from theory to building a real application.",
    status: "available",
    modules: 4,
    exercises: 20,
    frameworks: 5,
    duration: "8-12 hours",
    tags: [
      "Claude Code",
      "OpenCode",
      "Codex",
      "Atomica",
      "RALPH",
      "Enterprise",
    ],
    href: "/courses/ai-agents",
    accent: "#de3163",
  },
  {
    id: "prompt-engineering",
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    subtitle: "For Developers.",
    description:
      "Beyond basic prompts. Learn structured prompting techniques, chain-of-thought reasoning, few-shot patterns, and how to write prompts that produce reliable, reproducible results in professional contexts.",
    status: "coming-soon",
    modules: 3,
    exercises: 15,
    frameworks: 3,
    duration: "6-8 hours",
    tags: ["Structured prompts", "Chain-of-thought", "Few-shot", "Enterprise"],
    href: "/courses/prompt-engineering",
    accent: "#6366f1",
  },
  {
    id: "mcp-development",
    slug: "mcp-development",
    title: "Building MCP Servers",
    subtitle: "Connect Everything.",
    description:
      "Design and build Model Context Protocol servers that connect AI agents to your enterprise systems — Azure DevOps, internal APIs, databases, and proprietary tools.",
    status: "coming-soon",
    modules: 4,
    exercises: 12,
    frameworks: 2,
    duration: "10-14 hours",
    tags: ["MCP", "TypeScript", "Azure DevOps", "APIs", "Enterprise"],
    href: "/courses/mcp-development",
    accent: "#06b6d4",
  },
  {
    id: "ai-testing",
    slug: "ai-testing",
    title: "AI-Assisted Testing",
    subtitle: "Test Smarter.",
    description:
      "Use AI agents to write better tests faster. Test strategy, generating meaningful test cases, mutation testing, visual regression, accessibility audits, and maintaining test quality at scale.",
    status: "coming-soon",
    modules: 3,
    exercises: 18,
    frameworks: 2,
    duration: "6-8 hours",
    tags: ["Vitest", "Playwright", "Testing Library", "Accessibility"],
    href: "/courses/ai-testing",
    accent: "#10b981",
  },
];

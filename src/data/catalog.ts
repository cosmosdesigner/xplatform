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
    id: "context-engineering",
    slug: "context-engineering",
    title: "Context Engineering",
    subtitle: "For Developers.",
    description:
      "The discipline that replaced prompt engineering. Learn to structure AGENTS.md files, build context registries, design skill systems, manage context windows, and architect enterprise-grade context systems that make AI coding agents reliable at scale.",
    status: "available",
    modules: 4,
    exercises: 6,
    frameworks: 7,
    duration: "6-8 hours",
    tags: ["Context Stack", "AGENTS.md", "Skills", "MCP", "Enterprise"],
    href: "/courses/context-engineering",
    accent: "#6366f1",
  },
  {
    id: "mcp-development",
    slug: "mcp-development",
    title: "Building MCP Servers",
    subtitle: "Connect Everything.",
    description:
      "Design and build Model Context Protocol servers that connect AI agents to your enterprise systems — Azure DevOps, internal APIs, databases, and proprietary tools. From your first stdio server to enterprise-grade remote deployments with governance.",
    status: "available",
    modules: 5,
    exercises: 10,
    frameworks: 3,
    duration: "10-14 hours",
    tags: ["MCP", "TypeScript", "Azure DevOps", "APIs", "Enterprise"],
    href: "/courses/mcp-development",
    accent: "#06b6d4",
  },
  {
    id: "ai-harnesses",
    slug: "ai-harnesses",
    title: "AI Coding Harnesses",
    subtitle: "Set Up Right.",
    description:
      "The practical companion to AI Coding Agents. Install, configure, and master your AI coding harness — hooks, plugins, parallel workflows, token optimization, permission modes, and editor integration. Claude Code, OpenCode, Cursor, and beyond.",
    status: "available",
    modules: 5,
    exercises: 8,
    frameworks: 3,
    duration: "4-6 hours",
    tags: ["Claude Code", "OpenCode", "Cursor", "Hooks", "Plugins"],
    href: "/courses/ai-harnesses",
    accent: "#10b981",
  },
];

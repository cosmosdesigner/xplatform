import type { Slide, CourseModule, ContentBlock } from "./course";

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 1 — The Context Window as Architecture
   ═══════════════════════════════════════════════════════════════════════════ */

const module1Slides: Slide[] = [
  {
    number: 1,
    title: "From prompts to context",
    headline: "Prompt engineering\nis dead.\nContext engineering\nis what matters.",
    sections: [
      {
        type: "paragraph",
        text: "In mid-2025, Shopify CEO Tobi Lutke and Andrej Karpathy both endorsed the same idea: the term 'prompt engineering' no longer describes what practitioners actually do. The real skill is context engineering — the art and science of providing all the context for a task to be plausibly solvable by the LLM.",
      },
      {
        type: "quote",
        text: "People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. In every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step.",
        attribution: "Andrej Karpathy",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The shift",
        text: "Prompt engineering = crafting clever sentences.\nContext engineering = structuring the information environment the agent operates within.\n\nOne is about how you ask. The other is about what the agent sees.",
      },
      {
        type: "paragraph",
        text: "This course teaches context engineering for AI coding agents — not chatbots, not completion tools, but autonomous agents that read your codebase, run commands, and ship code. The context you provide determines whether the agent produces reliable, production-quality work or hallucinated nonsense.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "What is the context window?",
    headline: "The context window\nis the agent's\nentire world.",
    sections: [
      {
        type: "paragraph",
        text: "The context window holds everything the agent knows during a session: your conversation, every file it reads, every command output, every tool result. It is finite, measured in tokens, and performance degrades as it fills.",
      },
      {
        type: "subheading",
        text: "What fills the context window",
      },
      {
        type: "bullets",
        items: [
          "System instructions (AGENTS.md, skills, operating contracts) — loaded at session start",
          "Conversation history — every message you send and every response",
          "File reads — every source file the agent opens, in full",
          "Command output — terminal results, build logs, test output",
          "Tool results — MCP responses, API calls, search results",
          "Agent's own reasoning — internal chain-of-thought tokens",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The fundamental constraint",
        text: "A single debugging session can consume tens of thousands of tokens. When the context window is getting full, the agent starts 'forgetting' earlier instructions. The context window is the most important resource to manage.",
      },
      {
        type: "paragraph",
        text: "Context engineering is the discipline of deciding what goes into this finite space, in what order, at what priority. Every token you waste on irrelevant information is a token the agent can't use for the actual task.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Layering project context",
    headline: "Multiple layers.\nFrom 30 minutes\nto permanent.",
    sections: [
      {
        type: "paragraph",
        text: "Context engineering is not one technique — it involves complementary layers, each with different persistence and scope. The layers build on each other. Skip one and the layers above it become unreliable.",
      },
      {
        type: "comparison",
        headers: ["Layer", "What it provides"],
        rows: [
          ["AGENTS.md", "Project identity — stack, commands, architecture, conventions. Loaded every session. Start here."],
          ["Project Rules", "Constraints — closed vocabularies, state machines, naming conventions. Enforced by every agent."],
          ["Skills", "Reusable task recipes — loaded on demand when the task type matches. Based on Anthropic's skills system."],
          ["Operating Contracts", "Hard rules that never bend. Written once, enforced always."],
          ["Continuous Learning", "Patterns from successes and failures — MEMORY.md files, session learnings. Based on Claude Code's auto memory system."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Start simple",
        text: "AGENTS.md is the foundation — it takes minimal effort and has the biggest impact. Start there and add skills, rules, contracts only when you hit specific, recurring problems. Don't over-engineer your context stack.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Static vs. dynamic context",
    headline: "Files that exist\nbefore the session\nvs. information\nretrieved during it.",
    sections: [
      {
        type: "comparison",
        headers: ["Static context", "Dynamic context"],
        rows: [
          ["AGENTS.md, .cursorrules, rules files", "MCP tool results, file reads, terminal output"],
          ["Exists before the session starts", "Retrieved during the session on demand"],
          ["Same for every session on the same project", "Different depending on the task"],
          ["Loaded automatically at startup", "Loaded when the agent decides it needs it"],
          ["Token cost is predictable and fixed", "Token cost varies — can explode if uncontrolled"],
          ["You control it completely", "You influence it (via skills, instructions) but the agent decides"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The design principle",
        text: "Move as much context as possible from dynamic to static. Every piece of information that the agent has to 'discover' at runtime is a piece that might not be discovered, might be wrong, or might consume tokens discovering.\n\nIf the agent always needs to know your test runner, put it in AGENTS.md — don't make it read package.json every time.",
      },
      {
        type: "paragraph",
        text: "The best context architectures have a strong static foundation (AGENTS.md, rules, skills) with targeted dynamic resolution (MCP for live data, file reads for current code state).",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Context priority architecture",
    headline: "When sources\ndisagree,\nwho wins?",
    sections: [
      {
        type: "paragraph",
        text: "In any non-trivial project, the agent will encounter conflicting information: the AGENTS.md says one thing, the actual code does another, and a Wiki page says something else. A context priority architecture defines which source wins.",
      },
      {
        type: "subheading",
        text: "The 4-layer priority model",
      },
      {
        type: "comparison",
        headers: ["Priority", "Source"],
        rows: [
          ["1 (highest)", "Feature-specific lifecycle context — the current task's requirements and decisions"],
          ["2", "Functional project context — business rules, domain logic from documentation"],
          ["3", "Technical project context — architecture patterns, API conventions from documentation"],
          ["4 (lowest)", "Repository implementation context — the actual code files"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The conflict trap",
        text: "When the agent encounters a conflict between sources, it should NEVER silently resolve it. The correct response is to report the conflict with both sources identified and let the human decide. Agents that guess cause subtle, hard-to-find bugs.",
      },
      {
        type: "paragraph",
        text: "A well-designed context system makes conflicts visible. An AGENTS.md rule that says 'always use Vitest' combined with a package.json that has Jest installed is a conflict — the agent should flag it, not assume.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "The read-before-write principle",
    headline: "Never modify\nwhat you\nhaven't read.",
    sections: [
      {
        type: "paragraph",
        text: "Read-before-write is a fundamental safety pattern in AI agent systems. Anthropic's Claude Code best practices emphasise 'explore first, then plan, then code.' In our own workspace, it appears in every agent definition, every command procedure, and every MCP rule.",
      },
      {
        type: "subheading",
        text: "What read-before-write means in practice",
      },
      {
        type: "bullets",
        items: [
          "Before editing a file — read the current content, understand the patterns in use",
          "Before writing to a Wiki page — read the current page state, detect conflicts",
          "Before updating a Work Item — read current state, tags, and revision",
          "Before committing — read the full diff, verify it matches intent",
          "Before creating a PR — read the target branch, check for conflicts",
        ],
      },
      {
        type: "code",
        caption: "MCP read-before-write procedure",
        code: "Before any MCP write, the agent MUST:\n1. Identify intended operation, target, fields, links, tags\n2. Read current remote content, state, links, and revision\n3. Compare current content to command context\n4. Detect conflicts, stale reads, duplicates, invalid states\n5. Use patch-style updates with before, after, reason, evidence\n6. Return 'conflict', 'blocked', or 'failed' when preconditions fail",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Why this matters",
        text: "An agent that writes without reading will overwrite human changes, create duplicate entries, and produce code that conflicts with existing patterns. Read-before-write is not a best practice — it is a hard safety requirement.",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "The formal definition",
    headline: "A system,\nnot a string.",
    sections: [
      {
        type: "paragraph",
        text: "Phil Schmid of Hugging Face distils context engineering into a single sentence: 'The discipline of designing and building dynamic systems that provide the right information and tools, in the right format, at the right time, to give an LLM everything it needs to accomplish a task.'",
      },
      {
        type: "subheading",
        text: "Four properties of context engineering",
      },
      {
        type: "bullets",
        items: [
          "It's a SYSTEM, not a string — the final prompt is assembled programmatically from multiple sources at runtime, not typed by a human",
          "It's DYNAMIC — different context is loaded depending on the task, the state, and the moment. A frontend task loads different context than a backend task",
          "It's about the RIGHT information at the RIGHT time — not all information, not no information, but precisely what the agent needs for this specific step",
          "FORMAT MATTERS — how you present information affects comprehension. Summaries beat raw dumps. Structured data beats prose. Section headers beat walls of text",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The cheap demo vs. the magical agent",
        text: "A 'cheap demo' agent sees only the user's message and nothing else. Its code works but the output is generic and unhelpful.\n\nA 'magical' agent has rich context loaded before the LLM call: your calendar, your past interactions, your project's conventions, your design system, your test runner. The magic isn't a smarter model — it's better context.",
      },
      {
        type: "paragraph",
        text: "As Addy Osmani writes in his O'Reilly Radar article on context engineering: 'If prompt engineering was about coming up with a magical sentence, context engineering is about constructing an entire information environment so the AI can solve the problem reliably.' (oreilly.com/radar/context-engineering)",
      },
    ] as ContentBlock[],
  },
  {
    number: 8,
    title: "How contexts fail",
    headline: "Four ways\nyour context\nwill break.",
    sections: [
      {
        type: "paragraph",
        text: "Drew Breunig documented four specific failure modes that occur when context windows grow. Understanding these is essential because longer contexts do not automatically produce better results — they create new failure modes that are especially dangerous for agents.",
      },
      {
        type: "comparison",
        headers: ["Failure mode", "What happens"],
        rows: [
          ["Context Poisoning", "A hallucination or error makes it into the context (e.g., a scratchpad, a summary) and is repeatedly referenced. The agent develops nonsensical strategies pursuing goals that cannot be met."],
          ["Context Distraction", "As context grows beyond ~100k tokens, the agent favours repeating past actions from its extensive history rather than synthesising novel plans. It leans on what it sees instead of what it knows."],
          ["Context Confusion", "Superfluous information (irrelevant tool definitions, unrelated documents) is used by the model to generate low-quality responses. Every model performs worse when given more than one tool."],
          ["Context Clash", "Information gathered in stages conflicts with itself. Early incorrect attempts remain in context and influence the final answer. Drew Breunig notes that models perform significantly worse when information is gathered incrementally versus all at once."],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The million-token trap",
        text: "Frontier models support up to 1 million tokens, but Drew Breunig documents that agent performance degrades well before the window is full. He cites the Gemini 2.5 technical report showing agents favour repeating past actions over synthesising novel plans as context grows, and a Databricks study showing accuracy drops at extended context lengths. Bigger windows are not automatically better windows.",
      },
      {
        type: "paragraph",
        text: "These failures hit agents hardest because agents operate in exactly the scenarios where contexts balloon: gathering information from multiple sources, making sequential tool calls, engaging in multi-turn reasoning, and accumulating extensive histories.",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 2 — Building the Foundation Layer
   ═══════════════════════════════════════════════════════════════════════════ */

const module2Slides: Slide[] = [
  {
    number: 1,
    title: "AGENTS.md deep dive",
    headline: "The single file\nthat changes\neverything.",
    sections: [
      {
        type: "paragraph",
        text: "AGENTS.md (or CLAUDE.md, .cursorrules) is a special file read by the AI agent at the start of every conversation. It provides persistent context the agent cannot infer from code alone. Anthropic's docs say: 'CLAUDE.md is a markdown file you add to your project root that Claude Code reads at the start of every session. Use it to set coding standards, architecture decisions, preferred libraries, and review checklists.'",
      },
      {
        type: "subheading",
        text: "What to include",
      },
      {
        type: "comparison",
        headers: ["Include", "Exclude"],
        rows: [
          ["Commands the agent can't guess (npm run tsc:strict)", "Anything the agent can figure out by reading code"],
          ["Code style rules that differ from defaults", "Standard language conventions the agent already knows"],
          ["Testing instructions and preferred test runners", "Detailed API documentation (link to docs instead)"],
          ["Repository etiquette (branch naming, PR conventions)", "Information that changes frequently"],
          ["Architecture decisions specific to your project", "Long explanations or tutorials"],
          ["Developer environment quirks (required env vars)", "File-by-file descriptions of the codebase"],
          ["Common gotchas or non-obvious behaviors", "Self-evident practices like 'write clean code'"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The pruning test",
        text: "For each line in your AGENTS.md, ask: 'Would removing this cause the agent to make mistakes?' If not, cut it. Bloated AGENTS.md files cause the agent to ignore your actual instructions.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Anatomy of a production AGENTS.md",
    headline: "What the best\nteams include.",
    sections: [
      {
        type: "paragraph",
        text: "Examining AGENTS.md files from production repositories in our own workspace, a clear structural pattern emerges. The best files share three properties: they are specific (exact versions, not just framework names), verifiable (each rule can be checked in a diff), and actionable (the agent knows exactly what to do differently). Anthropic's docs reinforce this: 'For each line, ask: Would removing this cause Claude to make mistakes? If not, cut it.'",
      },
      {
        type: "code",
        caption: "Production AGENTS.md structure",
        code: "## Stack\nReact 19 / TypeScript 5.9 strict / Tailwind CSS v4\nVitest 4 + Testing Library / lucide-react\n\n## Commands\nnpm run dev — start dev server\nnpm run build — production build (must pass)\nnpm run tsc — typecheck (zero errors required)\nnpm run test — run all tests\n\n## Architecture\nsrc/app/ — App Router pages and layouts\nsrc/components/layout/ — Container, Nav, Footer\nsrc/components/sections/ — page-level sections\nsrc/data/ — static data files\nsrc/lib/ — utilities (cn() helper)\n\n## Conventions\n- Use cn() from src/lib/utils.ts for all className merging\n- All decorative elements must have aria-hidden='true'\n- Dark theme only — no light mode\n- Do not add npm dependencies without asking\n- Do not edit files outside the current task scope\n\n## Definition of Done\n- npm run build passes with zero errors\n- No TypeScript errors\n- Accessibility: all interactive elements keyboard-accessible",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Rule precedence",
        text: "When rules conflict, the most mature AGENTS.md files define explicit precedence:\n\n1. Security, legal, regulatory requirements\n2. AGENTS.md rules\n3. Repository configuration (package.json, tsconfig)\n4. Established patterns in the codebase\n5. General best practices",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "The instruction hierarchy",
    headline: "Global.\nProject.\nTask.",
    sections: [
      {
        type: "paragraph",
        text: "Context isn't just one file — it's a hierarchy of files at different scopes, each overriding the previous for their domain. Understanding this hierarchy is essential for knowing where to put each piece of context.",
      },
      {
        type: "comparison",
        headers: ["Scope", "Where it lives"],
        rows: [
          ["Global (all projects)", "~/.config/opencode/ or ~/.claude/ — universal preferences, code style, never-do rules"],
          ["Project (this repo)", "AGENTS.md in repo root — 80% of value. Stack, commands, architecture, conventions"],
          ["Subdirectory (this module)", "AGENTS.md in child directories — loaded when agent reads files in that directory"],
          ["Task (this prompt)", "Inline in your message — one-off constraints for this specific task"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Where to focus",
        text: "The project-level AGENTS.md is where most teams should focus. Global settings handle personal preferences. Task-level instructions handle edge cases. But the project AGENTS.md is what makes the agent understand your codebase.",
      },
      {
        type: "paragraph",
        text: "Check your AGENTS.md into git. It's a team artifact, not a personal config file. When teammates contribute rules from their experience, the whole team benefits. The file compounds in value over time.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Project rules as context",
    headline: "Constraints\nare information.",
    sections: [
      {
        type: "paragraph",
        text: "Rules files define the boundaries within which agents operate. But they're not just restrictions — they are context. A rule that says 'only use these 26 tags' tells the agent more than a paragraph explaining your tagging philosophy.",
      },
      {
        type: "subheading",
        text: "Closed vocabularies",
      },
      {
        type: "paragraph",
        text: "A closed vocabulary is a fixed set of valid values. Tags, states, branch prefixes, component names — anything that has a canonical list. When the agent knows the complete set, it can't invent values that don't exist.",
      },
      {
        type: "code",
        caption: "Example: canonical tag set",
        code: "## Valid tags (use only these)\nneeds-context, needs-refinement, needs-validation\nready, in-progress, blocked, done\nfrontend, backend, infra, docs\nsecurity, performance, accessibility\n\n## Invalid (never use)\nAd hoc tags, free-form labels, abbreviations",
      },
      {
        type: "callout",
        variant: "rule",
        title: "State machines as context",
        text: "Lifecycle states (New → Ready → In Progress → Done) form a state machine. Define the valid transitions explicitly. An agent that knows the state machine will never try to move a Work Item from 'New' to 'Done' directly — it knows the required intermediate steps.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Skills: on-demand procedural context",
    headline: "Load instructions\nonly when the\ntask matches.",
    sections: [
      {
        type: "paragraph",
        text: "Skills are focused instruction files loaded when the agent starts a specific task type. Unlike AGENTS.md (which loads every session), skills load on demand — keeping the context window clean for tasks that don't need them.",
      },
      {
        type: "subheading",
        text: "Skill anatomy",
      },
      {
        type: "code",
        caption: "SKILL.md structure",
        code: "---\nname: react-component\ndescription: Procedure for creating React components\n---\n\n## When to use\nCreating or modifying React components in this repo.\n\n## Procedure\n1. Read the component's current file (if it exists)\n2. Read at least one sibling component for conventions\n3. Check docs/design-system.md for DS primitives\n4. Implement following the patterns found\n5. Run typecheck and fix errors\n\n## Anti-patterns\n- <div> for layout containers — use <View>\n- interface for Props — use type Props\n- Direct DS imports — use project wrappers\n\n## Checklist\n- [ ] TypeScript compiles\n- [ ] Follows sibling component patterns\n- [ ] Accessibility attributes present",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Skills vs. AGENTS.md",
        text: "AGENTS.md = context the agent always needs (stack, commands, architecture).\nSkills = context the agent needs for a specific task type.\n\nIf it applies to every task, put it in AGENTS.md. If it applies to one type of task (writing tests, creating components, reviewing PRs), make it a skill.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Anti-patterns as context",
    headline: "Encoding what\nNOT to do\nis as valuable\nas what to do.",
    sections: [
      {
        type: "paragraph",
        text: "Most context files tell the agent what to do. The most effective ones also tell it what NOT to do. Anti-patterns are especially powerful because they prevent the agent from falling into common traps that look correct but aren't for your project.",
      },
      {
        type: "code",
        caption: "Anti-patterns from a production skill file",
        code: "## Forbidden patterns\n- <Box>, <Pressable>, <Touchable> — removed from DS; never use\n- onClick on <View> — use onPress\n- interface for Props — use type Props\n- Direct <Typography> import — use <Text> wrapper\n- bg-[var(--var)] syntax — Tailwind v4 uses bg-(--var)\n- External UI libraries (Radix, Headless UI) — not approved\n- New CSS custom properties — use existing token set",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The drift problem",
        text: "Without explicit anti-patterns, agents will use general best practices that may conflict with your project's specific choices. Every framework has multiple valid approaches — your anti-patterns tell the agent which valid approaches are wrong for this codebase.",
      },
      {
        type: "paragraph",
        text: "Anti-patterns are especially important for design system compliance, API conventions, and state management patterns — areas where the 'correct' approach varies between projects.",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Exercise: write an AGENTS.md",
    headline: "Your turn.\nBuild the foundation.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Write an AGENTS.md for your project",
        text: "Open your real project. Create (or improve) an AGENTS.md file.\n\nInclude:\n1. Stack — exact frameworks, versions, and key libraries\n2. Commands — dev, build, test, lint, typecheck\n3. Architecture — folder structure with what lives where\n4. Conventions — 5-10 rules specific to your project\n5. Anti-patterns — 3-5 things the agent should never do\n6. Definition of Done — what 'finished' means\n\nEvaluation criteria:\n- Is every rule specific enough to verify in a diff?\n- Would removing any rule cause the agent to make mistakes?\n- Is anything included that the agent could figure out on its own?\n\nTime: 30 minutes",
      },
    ] as ContentBlock[],
  },
  {
    number: 8,
    title: "Verification as context",
    headline: "Give the agent\na check it can run.\nThat changes\neverything.",
    sections: [
      {
        type: "paragraph",
        text: "Anthropic's best practices for Claude Code emphasise giving the agent a way to verify its own work. Their docs say: 'Give Claude a check it can run: tests, a build, a screenshot to compare. It's the difference between a session you watch and one you walk away from.' Without a check, 'looks done' is the only signal.",
      },
      {
        type: "comparison",
        headers: ["Without verification context", "With verification context"],
        rows: [
          ["'Implement a function that validates emails'", "'Write validateEmail. Test cases: user@example.com → true, invalid → false. Run the tests after implementing.'"],
          ["'Make the dashboard look better'", "'Implement this design. Take a screenshot and compare it to the original. List differences and fix them.'"],
          ["'The build is failing'", "'The build fails with this error: [paste]. Fix it and verify the build succeeds. Address root cause, don't suppress.'"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Verification is context",
        text: "The test command, the build command, the lint command — these are context. They tell the agent what 'done' means. Put them in your AGENTS.md. The agent can't verify what it doesn't know how to check.",
      },
    ] as ContentBlock[],
  },
  {
    number: 9,
    title: "Format and structure matter",
    headline: "How you present\ninformation\nis as important\nas what you include.",
    sections: [
      {
        type: "paragraph",
        text: "It's not just what you include in the context — it's how you present it. A huge blob of unstructured text will confuse the model, while a well-organised input guides it. The 12-Factor Agents project (github.com/humanlayer/12-factor-agents) demonstrated that custom context formats can achieve significantly better token efficiency than standard message arrays.",
      },
      {
        type: "subheading",
        text: "Formatting principles",
      },
      {
        type: "bullets",
        items: [
          "Use section headers to separate context types ('Relevant code:', 'Error log:', 'User request:')",
          "Use structured formats (markdown tables, JSON, YAML) when data has clear structure",
          "Summarise long texts — a concise summary beats a raw dump of 1000 lines",
          "Show only relevant portions — the last 5 error lines, not 100 lines of stack trace",
          "Use XML-style tags for custom context formats: <slack_message>...</slack_message>",
          "Prefix reference material clearly: 'Here is the relevant documentation:' in quotes",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Information density",
        text: "The 12-Factor Agents project (github.com/humanlayer/12-factor-agents) advocates for custom context formats using XML tags and YAML instead of standard chat message arrays. The principle: higher information density per token means more room for actual reasoning.",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 3 — Dynamic Context & Tool Integration
   ═══════════════════════════════════════════════════════════════════════════ */

const module3Slides: Slide[] = [
  {
    number: 1,
    title: "MCP: the context bridge",
    headline: "The protocol\nthat connects\nagents to\nyour systems.",
    sections: [
      {
        type: "paragraph",
        text: "Model Context Protocol (MCP) is a standardised protocol that lets AI coding agents call external tools — query Azure DevOps work items, read Wiki pages, check CI build status, fetch design tokens, inspect database schemas, or interact with any system that exposes an MCP server.",
      },
      {
        type: "subheading",
        text: "MCP as dynamic context",
      },
      {
        type: "paragraph",
        text: "Static context (AGENTS.md, skills) tells the agent what's always true. MCP provides context that's true right now — the current state of a work item, the latest build result, the actual database schema. This is dynamic context: information that can't be pre-written because it changes.",
      },
      {
        type: "bullets",
        items: [
          "Azure DevOps — query work items, read Wiki pages, manage PRs, check pipeline status",
          "Figma — fetch design tokens, component properties, style values",
          "Database — inspect schemas, check migrations, validate data models",
          "Sentry/monitoring — read error logs, track deployment health",
          "Custom APIs — any internal system with an MCP adapter",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "MCP security",
        text: "MCP authentication tokens and API keys must never be stored in project files, AGENTS.md, or version control. Use environment variables or your OS credential store. If a token appears in a commit, rotate it immediately.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Context registries",
    headline: "Pointer files\nthat tell agents\nwhere to find\nknowledge.",
    sections: [
      {
        type: "paragraph",
        text: "A context registry is a file that maps knowledge domains to their sources. Instead of hardcoding URLs in agent instructions, you maintain a single registry that agents consult at runtime to resolve where external knowledge lives.",
      },
      {
        type: "code",
        caption: "Example context registry",
        code: "# Context Registry\n\n## Functional Context\n| Area                  | Source                    | Used By                       |\n|-----------------------|---------------------------|-------------------------------|\n| Business Rules        | Wiki: /Business/Rules     | /discover, /validate, /plan   |\n| Domain Glossary       | Wiki: /Business/Glossary  | /discover, /validate          |\n\n## Technical Context\n| Area                  | Source                    | Used By                       |\n|-----------------------|---------------------------|-------------------------------|\n| Frontend Architecture | Wiki: /Tech/Frontend      | /plan, /implement, /review    |\n| API Conventions       | Wiki: /Tech/API           | /plan, /implement             |\n| Security Policies     | Wiki: /Tech/Security      | /implement, /review           |",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Registry rules",
        text: "Sources MUST point to persistent documentation (Wiki, docs, repos).\nSources MUST NOT point to ephemeral resources (Slack messages, emails, local files).\nHardcoding URLs in agent instructions is prohibited — always resolve from the registry.\nAdding a source requires a PR (it's a team decision).",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Domain filtering",
    headline: "Load only\nwhat's relevant.\nIgnore the rest.",
    sections: [
      {
        type: "paragraph",
        text: "The context window is finite. Loading everything from every source guarantees you'll run out of space before the agent starts working. Domain filtering is the discipline of loading only the context relevant to the current task type.",
      },
      {
        type: "comparison",
        headers: ["Task type", "Load this context"],
        rows: [
          ["Feature discovery", "Functional context only — business rules, domain glossary"],
          ["Planning / story slicing", "Functional + technical — requirements AND architecture"],
          ["Frontend implementation", "Technical frontend — component patterns, design system, routing"],
          ["Backend implementation", "Technical backend — API conventions, data models, security"],
          ["Code review", "Functional + technical — verify implementation matches requirements"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The loading rule",
        text: "A frontend implementation task should never load backend API documentation. A feature discovery task should never load component patterns. Match the context to the task domain — loading irrelevant context is worse than loading nothing, because it pushes relevant context out of the window.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Context staleness",
    headline: "Context that was\ntrue 6 months ago\nmight not be\ntrue now.",
    sections: [
      {
        type: "paragraph",
        text: "Dynamic context has a freshness problem. Wiki pages get updated, APIs change, architecture evolves. Context that was accurate when you loaded it might be stale by the time the agent uses it. A robust context system includes staleness detection.",
      },
      {
        type: "subheading",
        text: "Staleness detection patterns",
      },
      {
        type: "bullets",
        items: [
          "Timestamp tracking — record when context was last loaded, warn after 30 days",
          "Unreachable source detection — if the Wiki page returns 404, flag as needs-context",
          "Re-read triggers — if implementation spans multiple days, reload context on day 2",
          "Version comparison — compare loaded revision against current revision",
          "Human confirmation — for critical decisions, ask 'Is this still accurate?' before proceeding",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The stale context trap",
        text: "An agent that uses stale architectural context will implement features using patterns the team has already moved away from. The code will work but won't match the current codebase style — creating maintenance burden and confusing reviewers.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Subagents as context isolation",
    headline: "Explore without\npolluting\nyour context.",
    sections: [
      {
        type: "paragraph",
        text: "When an agent investigates a codebase, it reads lots of files — each one consuming context window tokens. If the investigation is exploratory (you're not sure what you'll find), those tokens are potentially wasted. Subagents solve this by running in separate context windows.",
      },
      {
        type: "subheading",
        text: "The subagent pattern",
      },
      {
        type: "code",
        caption: "Using subagents for investigation",
        code: "// Your main session stays clean\n\"Use a subagent to investigate how our auth system\nhandles token refresh, and whether we have any\nexisting OAuth utilities I should reuse.\"\n\n// The subagent:\n// - Explores the codebase in its own context\n// - Reads 20+ files without filling YOUR context\n// - Reports back a summary (just the findings)\n// - Your main context gets the summary, not all the files",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Writer/Reviewer pattern",
        text: "Have one agent implement the feature (Session A). Then have a fresh agent review the diff (Session B). The reviewer has clean context — it's not biased toward code it just wrote. The review is more honest and catches things the writer missed.",
      },
      {
        type: "paragraph",
        text: "Subagents are one of the most powerful context management tools available. Use them for investigation, verification, and adversarial review. Your main session stays focused on implementation with a clean context window.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Context window management",
    headline: "Aggressive\ncontext hygiene\nis not optional.",
    sections: [
      {
        type: "paragraph",
        text: "The context window is your fundamental constraint. Managing it isn't a nice-to-have — it's what separates productive sessions from ones where the agent degrades into nonsense after 30 minutes.",
      },
      {
        type: "subheading",
        text: "Practical management techniques",
      },
      {
        type: "bullets",
        items: [
          "/clear between unrelated tasks — don't let context from task A pollute task B",
          "/compact with focus instructions — '/compact Focus on the API changes' preserves what matters",
          "Start new sessions for new features — a fresh context always outperforms a cluttered one",
          "After 2 failed corrections, /clear and rewrite — accumulated failures poison the context",
          "Use subagents for exploration — keep investigation context separate from implementation",
          "Scope investigations narrowly — 'read src/auth/' not 'explore the codebase'",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The kitchen sink anti-pattern",
        text: "You start with one task, ask something unrelated, then go back. The context is now full of irrelevant information. After the tenth correction you're not reviewing anymore, you're clicking through. /clear between unrelated tasks. Always.",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Exercise: design a context registry",
    headline: "Your turn.\nMap your\nknowledge sources.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Create a context registry for your project",
        text: "Map your project's external knowledge sources into a context registry.\n\n1. List every source of truth: Wiki pages, Confluence, README files, ADO boards, design system docs, API specs\n2. Classify each source as Functional or Technical\n3. For each source, identify which task types need it (discovery, planning, implementation, review)\n4. Write the registry in markdown table format\n5. Add staleness rules: how often should each source be re-checked?\n\nEvaluation criteria:\n- Are all sources persistent (not Slack/email)?\n- Is each source mapped to specific task types (not 'all')?\n- Could a new team member use this registry to find any project knowledge?\n\nTime: 20 minutes",
      },
    ] as ContentBlock[],
  },
  {
    number: 8,
    title: "The four operations",
    headline: "Write. Select.\nCompress. Isolate.",
    sections: [
      {
        type: "paragraph",
        text: "LangChain's research identifies four fundamental operations of context engineering. Every technique you'll encounter — from AGENTS.md to subagents to auto-compact — maps to one of these four operations on the context window.",
      },
      {
        type: "comparison",
        headers: ["Operation", "What it means"],
        rows: [
          ["Write", "Save context OUTSIDE the window for later use — scratchpads, MEMORY.md files, state objects, notes-to-self. The agent creates context it can retrieve later."],
          ["Select", "Pull context INTO the window — RAG retrieval, memory lookup, file reads, MCP tool calls. Choosing what to load from external sources."],
          ["Compress", "Retain only the tokens that matter — summarisation, trimming old messages, post-processing tool output. Keeping the window lean."],
          ["Isolate", "Split context across boundaries — subagents with separate windows, sandboxed environments, state schemas that hide fields from the LLM until needed."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The taxonomy in practice",
        text: "AGENTS.md is a Write (you wrote it) + Select (loaded at session start).\nSubagents are Isolate (separate context) + Compress (report back a summary).\n/compact is Compress (summarise and trim).\nMCP is Select (pull in dynamic data).\n\nEvery context technique is a combination of these four operations.",
      },
    ] as ContentBlock[],
  },
  {
    number: 9,
    title: "Scratchpads and memory",
    headline: "Short-term notes.\nLong-term patterns.\nThe agent remembers.",
    sections: [
      {
        type: "paragraph",
        text: "When humans solve complex tasks, we take notes. Agents are gaining the same capability through scratchpads (within-session notes) and memory systems (cross-session learning). These are Write operations — saving context outside the window for later retrieval.",
      },
      {
        type: "subheading",
        text: "Scratchpads (short-term, within a session)",
      },
      {
        type: "bullets",
        items: [
          "Anthropic's multi-agent researcher saves its plan to a scratchpad because context may be truncated at 200k tokens",
          "Can be a tool call that writes to a file, or a field in the agent's state object",
          "Useful for multi-step plans, intermediate findings, and decisions that need to survive compaction",
        ],
      },
      {
        type: "subheading",
        text: "Memory (long-term, across sessions)",
      },
      {
        type: "bullets",
        items: [
          "MEMORY.md files — persistent learnings stored per project, loaded in future sessions",
          "Claude Code, Cursor, and Windsurf all have built-in memory systems",
          "Three memory types: episodic (past examples), procedural (how-to instructions), semantic (facts and relationships)",
          "The feedback rule: if you correct the agent twice for the same mistake, write it to memory — don't keep correcting",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Memory selection is hard",
        text: "Simon Willison shared an example where ChatGPT fetched his location from memories and unexpectedly injected it into an image request. Selecting the RIGHT memory for the RIGHT task is a challenge. Not all stored context should be loaded — relevance filtering is essential.",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 4 — Enterprise Context Systems
   ═══════════════════════════════════════════════════════════════════════════ */

const module4Slides: Slide[] = [
  {
    number: 1,
    title: "Specialist agent decomposition",
    headline: "One agent\nis not enough.\nScope them.",
    sections: [
      {
        type: "paragraph",
        text: "A single general-purpose agent trying to discover features, plan stories, implement code, and review PRs will be mediocre at all of them. Specialist agent decomposition creates multiple agents, each scoped to a lifecycle phase with its own context, tools, and responsibilities.",
      },
      {
        type: "comparison",
        headers: ["Agent", "Scope"],
        rows: [
          ["Discovery agent", "Capture feature intent from stakeholders — loads functional context only"],
          ["Planning agent", "Convert features into stories — loads functional + technical context"],
          ["Architecture agent", "Technical design assessment — loads technical context deeply"],
          ["Delivery agent", "Implementation — loads technical context for the relevant domain"],
          ["Review agent", "Code review — loads both functional and technical context fresh"],
        ],
      },
      {
        type: "subheading",
        text: "The Required Reads pattern",
      },
      {
        type: "paragraph",
        text: "Every specialist agent has an explicit 'Required Reads' section — a list of 10-14 files it MUST read before generating output. This ensures the agent always has the right context loaded, and prevents it from acting on incomplete information.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why this works",
        text: "Role boundaries prevent context bleed. The discovery agent never needs to know your component patterns. The delivery agent never needs to know your stakeholder requirements. Each agent gets a clean, focused context window with only what it needs.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Governed commands",
    headline: "Commands as\noperating\nprocedures.",
    sections: [
      {
        type: "paragraph",
        text: "In an enterprise context system, each command isn't just a prompt — it's a complete operating procedure that prescribes inputs, required reads, steps, allowed updates, safety rules, and output schema. The agent follows the procedure deterministically.",
      },
      {
        type: "code",
        caption: "Governed command structure",
        code: "## /implement-us\n\n### Purpose\nGuide implementation of a User Story.\n\n### Agent: delivery-agent\n\n### Required Reads (14 files)\n- feature-flow/rules/branching.md\n- feature-flow/rules/dod.md\n- feature-flow/rules/traceability.md\n- feature-flow/templates/implementation-template.md\n- feature-flow/schemas/command-result.schema.md\n- feature-flow/context/context-registry.md\n- ...\n\n### Project Context Loading\n- When: at the start of implementation\n- What: technical context (frontend or backend)\n- How: use /load-context with domain filtering\n- Record: include sources in implementation evidence\n\n### Steps\n1. Read the User Story Work Item\n2. Load project context for the relevant domain\n3. Create the wip/ branch\n4. Implement following architecture patterns\n5. Run verification (typecheck, lint, tests)\n6. Commit with traceability\n\n### Safety Rules\n- MUST NOT modify files outside the story scope\n- MUST NOT commit secrets or API keys\n- MUST return 'blocked' when evidence is missing",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Fail closed",
        text: "Governed commands MUST fail closed. Missing evidence → blocked. Authority conflicts → conflict. External system failures → failed. The agent never guesses when it doesn't have enough context.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Source-of-truth architecture",
    headline: "When Wiki,\nWork Items, and\ncode disagree\n— who's right?",
    sections: [
      {
        type: "paragraph",
        text: "Enterprise projects store information across multiple systems: Wiki pages, work item boards, PRs, CI pipelines, and the repository itself. Without an explicit ownership matrix, agents will pick whichever source they find first — which may be wrong.",
      },
      {
        type: "comparison",
        headers: ["Domain", "Authoritative source"],
        rows: [
          ["Feature narrative, decisions, evidence", "Azure DevOps Wiki"],
          ["State, tags, assignment", "Azure DevOps Work Items"],
          ["Code review, CI evidence", "Pull Requests and CI"],
          ["Deployment evidence", "CI and deployment systems"],
          ["Operating rules and governance", "Repository files (AGENTS.md, rules/)"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Conflict resolution",
        text: "When Wiki and Work Item disagree, the authoritative source for that field type wins. If ownership is unclear → return status: conflict with both sources identified for human resolution. Agents MUST NOT guess which source is correct.",
      },
      {
        type: "paragraph",
        text: "The source-of-truth matrix is context itself. When the agent knows that Wiki owns the narrative but Work Items own the state, it knows where to read and where to write for each type of information.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Output schema contracts",
    headline: "Every output\ntells you\nwhat to do next.",
    sections: [
      {
        type: "paragraph",
        text: "In an enterprise context system, every command produces output in the same deterministic shape. This isn't just for consistency — it creates a chain where each output tells the human (and the next agent) exactly what to do next.",
      },
      {
        type: "code",
        caption: "Universal command result schema",
        code: "{\n  command: \"/implement-us\",\n  status: \"succeeded\" | \"blocked\" | \"conflict\" | \"failed\",\n  target: \"US-1234\",\n  summary: \"Implemented the login flow with OAuth support\",\n  artifacts: [\n    { type: \"branch\", value: \"wip/1234-oauth-login\" },\n    { type: \"commit\", value: \"abc123\" }\n  ],\n  traceability: [\n    { from: \"US-1234\", to: \"FEAT-42\", type: \"parent\" }\n  ],\n  conflicts: [],\n  next_actions: [\n    \"/review US-1234\",\n    \"[human] Verify OAuth callback in staging\"\n  ]\n}",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The next_actions chain",
        text: "next_actions must include the next command as a copy-pasteable invocation (e.g., '/review US-1234'). Human actions are prefixed [human]. This creates a deterministic chain — the human never has to remember what comes next.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Continuous learning",
    headline: "The system\ngets smarter\nfrom every session.",
    sections: [
      {
        type: "paragraph",
        text: "Context engineering isn't a one-time setup. The best systems include a feedback loop where patterns from successful sessions are captured and fed back into the context stack — making future sessions more reliable.",
      },
      {
        type: "subheading",
        text: "Learning mechanisms",
      },
      {
        type: "bullets",
        items: [
          "MEMORY.md files — persistent session learnings stored per project",
          "AGENTS.md updates — when a correction happens twice, add it as a rule",
          "Skill refinement — when a skill's procedure misses a step, update the skill",
          "Anti-pattern capture — when the agent makes a project-specific mistake, encode it as an anti-pattern",
          "Rule evolution — when a rule is too vague, make it more specific; when it's too restrictive, relax it",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The feedback rule",
        text: "If you correct the agent more than twice for the same mistake, the problem is in your context, not in the agent. Add a rule. Update a skill. Encode the anti-pattern. Don't keep correcting — fix the source.",
      },
      {
        type: "paragraph",
        text: "The best teams treat their context stack like code: they version it, review changes, and iterate based on real-world outcomes. AGENTS.md should be in git, skills should have changelogs, and rules should be pruned when they're no longer relevant.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Exercise: design a context system",
    headline: "Your turn.\nArchitect the\nfull system.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Capstone: Design a complete context system",
        text: "Sketch a complete context architecture for your team. This is the capstone exercise — it combines everything from the course.\n\nDesign:\n1. AGENTS.md — what goes in the foundation file\n2. Skills (2-3) — what task-specific procedures would you create?\n3. Rules (3-5) — what closed vocabularies and state machines exist in your project?\n4. Context Registry — where does external knowledge live? Map it.\n5. Agent Decomposition — if you had multiple agents, how would you scope them?\n6. Source-of-Truth Matrix — which system owns which type of information?\n7. Output Contract — what should every agent output include?\n8. Learning Loop — how will the system get smarter over time?\n\nPresent your design to a colleague and get feedback.\n\nTime: 45 minutes",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Context compression techniques",
    headline: "Retain only\nthe tokens\nthat matter.",
    sections: [
      {
        type: "paragraph",
        text: "As agent conversations span hundreds of turns with token-heavy tool calls, compression becomes essential. Compression is about retaining the signal while discarding the noise — keeping the context window effective without losing critical information.",
      },
      {
        type: "subheading",
        text: "Compression strategies",
      },
      {
        type: "comparison",
        headers: ["Strategy", "When to use"],
        rows: [
          ["Auto-compact (summarise full trajectory)", "Claude Code runs this at 95% window capacity — summarises the entire conversation, preserving key decisions and code changes"],
          ["/compact with focus instructions", "Manual trigger: '/compact Focus on the API changes' — tells the summariser what to preserve"],
          ["Tool output post-processing", "Summarise heavy tool outputs (search results, file listings) before they enter context. A 1000-line search result becomes a 20-line summary"],
          ["Trimming old messages", "Remove older messages from the conversation list using heuristic rules (keep last N turns, or keep only messages with tool calls)"],
          ["Hierarchical summarisation", "Summarise in layers: first summarise each section, then summarise the summaries. Anthropic uses this for monitoring computer use agents"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The compression trap",
        text: "Summarisation can lose critical details. LangChain's research notes that Cognition uses a fine-tuned model for context compression, 'which underscores how much work can go into this step.' If specific events or decisions must be captured, instruct the compressor: 'When compacting, always preserve the full list of modified files and test commands.'",
      },
    ] as ContentBlock[],
  },
  {
    number: 8,
    title: "Own your context window",
    headline: "The context window\nis your primary\ninterface with\nthe LLM.",
    sections: [
      {
        type: "paragraph",
        text: "The 12-Factor Agents project makes a powerful argument: you don't have to use standard message-based formats for conveying context to an LLM. At any given point, your input to an LLM agent is 'here's what happened so far — what's the next step?' How you structure that input matters enormously.",
      },
      {
        type: "code",
        caption: "Custom context format (XML-style, more token-efficient)",
        code: "<slack_message>\n    From: @alex\n    Channel: #deployments\n    Text: Can you deploy the backend?\n</slack_message>\n\n<list_git_tags_result>\n    tags:\n      - name: \"v1.2.3\"\n        commit: \"abc123\"\n      - name: \"v1.2.2\"\n        commit: \"def456\"\n</list_git_tags_result>\n\nWhat's the next step?",
      },
      {
        type: "subheading",
        text: "Benefits of owning your context format",
      },
      {
        type: "bullets",
        items: [
          "Information density — structure information to maximise the LLM's understanding per token",
          "Error handling — include error information in formats that help the LLM recover, then hide resolved errors",
          "Safety — control what gets passed to the LLM, filtering sensitive data",
          "Flexibility — adapt the format as you learn what works best",
          "Token efficiency — custom formats consistently use fewer tokens than standard message arrays",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The principle",
        text: "Context includes: prompts, instructions, RAG documents, history, tool calls, and memory. Taking control of how you structure and present information can dramatically improve your agent's performance. The context window is your primary interface with the LLM — treat it like you would treat any critical API.",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FRAMEWORKS
   ═══════════════════════════════════════════════════════════════════════════ */

export const contextFrameworks = [
  {
    id: "context-layers",
    title: "Context Layering",
    description: "Structure agent context from foundation (AGENTS.md) to advanced (skills, contracts, memory). Based on patterns from Anthropic's CLAUDE.md docs and real-world production repos.",
    items: [
      "AGENTS.md — project identity (30 min investment, loaded every session)",
      "Project Rules — constraints as context (enforced always)",
      "Skills — on-demand task recipes (loaded per task type, from Anthropic's skills system)",
      "Operating Contracts — hard rules that never bend",
      "Continuous Learning — patterns from sessions (MEMORY.md, from Claude Code's auto memory)",
    ],
  },
  {
    id: "read-before-write",
    title: "Read Before Write",
    description: "The single most repeated safety invariant in enterprise AI systems.",
    items: [
      "Before editing: read current content and understand patterns",
      "Before writing to external systems: read current state and revision",
      "Before committing: read the full diff and verify intent",
      "Before creating PRs: read the target branch for conflicts",
      "When in doubt: read more, not less",
    ],
  },

  {
    id: "fail-closed",
    title: "Fail Closed",
    description: "When evidence is missing or uncertain, stop — don't guess.",
    items: [
      "Missing evidence → status: blocked",
      "Authority conflicts → status: conflict (both sources reported)",
      "External system failures → status: failed",
      "Stale context (>30 days) → warning + re-read trigger",
      "Never silently resolve — always surface for human decision",
    ],
  },
  {
    id: "context-failures",
    title: "Context Failure Modes",
    description: "Four ways contexts break, named by Drew Breunig.",
    items: [
      "Context Poisoning — hallucination enters context, is repeatedly referenced, causes cascading errors",
      "Context Distraction — agent favours repeating past actions over synthesising new plans (>100k tokens)",
      "Context Confusion — irrelevant tools/documents get used to generate low-quality responses",
      "Context Clash — information gathered in stages contradicts itself, causing 39% accuracy drops",
    ],
  },
  {
    id: "four-operations",
    title: "Write / Select / Compress / Isolate",
    description: "LangChain's four fundamental operations on the context window.",
    items: [
      "Write — save context outside the window (scratchpads, MEMORY.md, state objects)",
      "Select — pull context into the window (RAG, memory lookup, file reads, MCP calls)",
      "Compress — retain only what matters (summarise, trim, post-process tool output)",
      "Isolate — split context across boundaries (subagents, sandboxes, state schemas)",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export const contextFaqItems = [
  {
    question: "How is context engineering different from prompt engineering?",
    answer: "Prompt engineering focuses on crafting the right words in a message. Context engineering focuses on structuring the information environment the agent operates within — the files it reads, the tools it has, the rules it follows, and the knowledge it can access. Prompt engineering is about the question; context engineering is about what the agent knows when answering.",
  },
  {
    question: "Do I need to complete the AI Coding Agents course first?",
    answer: "It's strongly recommended. The AI Agents course teaches the mental model, the Ralph technique, and project context layering (AGENTS.md, skills, rules) in Module 3. This course goes deeper into each layer and adds enterprise patterns that build on those concepts.",
  },
  {
    question: "What's the minimum I need to get started?",
    answer: "An AGENTS.md file in your project root. That's Layer 1 of the Context Stack and provides 80% of the value. You can add skills, rules, and registries later as you hit specific problems.",
  },
  {
    question: "How long should AGENTS.md be?",
    answer: "As short as possible while still being complete. If the agent already does something correctly without the instruction, remove it. Bloated files cause the agent to ignore your actual instructions. Most good AGENTS.md files are 50-150 lines.",
  },
  {
    question: "Should I use AGENTS.md or CLAUDE.md or .cursorrules?",
    answer: "They serve the same purpose. AGENTS.md is the most tool-agnostic name. Claude Code reads CLAUDE.md, Cursor reads .cursorrules, OpenCode reads AGENTS.md. Some teams maintain multiple files that import from a shared source. The concepts in this course apply regardless of the filename.",
  },
  {
    question: "How do I know if my context is working?",
    answer: "Track how often you correct the agent. If you're correcting the same mistake twice, the context is missing or unclear. If the agent consistently follows your patterns without correction, the context is working. The frequency of corrections is your primary feedback signal.",
  },
  {
    question: "What about security? Can context files leak secrets?",
    answer: "Context files should NEVER contain secrets, API keys, tokens, or credentials. They describe how the project works, not how to authenticate. MCP configuration should use environment variables. If a secret appears in any context file, rotate it immediately.",
  },
  {
    question: "How does this apply to teams, not just individuals?",
    answer: "Check AGENTS.md into git — it's a team artifact. Skills, rules, and registries should be reviewed and maintained like code. When a teammate discovers a pattern or anti-pattern, they contribute it to the shared context. The system compounds in value as the team contributes.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

export const contextModules: CourseModule[] = [
  {
    id: 1,
    slug: "context-window",
    label: "Module 1",
    title: "The Context Window as Architecture",
    description:
      "Understand the fundamental constraint — the context window — and the 5-layer Context Stack that structures everything an AI agent sees.",
    keyMessage:
      "The agent is not forgetful — it never had memory. The fix is not better prompts. The fix is to put the context in files.",
    slides: module1Slides,
  },
  {
    id: 2,
    slug: "foundation-layer",
    label: "Module 2",
    title: "Building the Foundation Layer",
    description:
      "Write effective AGENTS.md files, design project rules, create on-demand skills, and encode anti-patterns as context.",
    keyMessage:
      "Put context in files, not prompts. Every piece of knowledge that lives in a file is a piece that works in every session, for every team member, forever.",
    slides: module2Slides,
  },
  {
    id: 3,
    slug: "dynamic-context",
    label: "Module 3",
    title: "Dynamic Context & Tool Integration",
    description:
      "Connect agents to external systems with MCP, design context registries, implement domain filtering, and manage the context window aggressively.",
    keyMessage:
      "The art and science of filling the context window with just the right information for the next step — not too much, not too little, and always fresh.",
    slides: module3Slides,
  },
  {
    id: 4,
    slug: "enterprise-systems",
    label: "Module 4",
    title: "Enterprise Context Systems",
    description:
      "Scale from one developer's AGENTS.md to a team-wide context architecture with specialist agents, governed commands, and continuous learning.",
    keyMessage:
      "Context engineering at enterprise scale is not more rules — it is a system of interacting layers where each layer makes the next one more reliable.",
    slides: module4Slides,
  },
];

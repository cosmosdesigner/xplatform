/* ─── Content Block Types ───────────────────────────────────────────────── */

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BulletListBlock {
  type: "bullets";
  items: string[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface CodeBlock {
  type: "code";
  language?: string;
  code: string;
  caption?: string;
}

export interface ComparisonBlock {
  type: "comparison";
  headers: [string, string];
  rows: [string, string][];
}

export interface CalloutBlock {
  type: "callout";
  variant: "warning" | "insight" | "rule" | "example" | "exercise";
  title?: string;
  text: string;
}

export interface SubheadingBlock {
  type: "subheading";
  text: string;
}

export type ContentBlock =
  | ParagraphBlock
  | BulletListBlock
  | QuoteBlock
  | CodeBlock
  | ComparisonBlock
  | CalloutBlock
  | SubheadingBlock;

/* ─── Core Types ────────────────────────────────────────────────────────── */

export interface Slide {
  number: number;
  title: string;
  headline: string;
  /** Simple body text — used by modules with basic content */
  body?: string;
  /** Rich content blocks — used when deeper detail is needed */
  sections?: ContentBlock[];
  /** Key points for presentation mode — short, focused bullets shown instead of full content */
  presentationPoints?: string[];
}

export interface CourseModule {
  id: number;
  slug: string;
  label: string;
  title: string;
  description: string;
  keyMessage: string;
  slides: Slide[];
}

export interface RalphLetter {
  letter: string;
  word: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FrameworkItem {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  variant: "warning" | "insight" | "rule" | "example" | "exercise";
}

export interface Framework {
  id: string;
  name: string;
  tagline: string;
  description: string;
  items: FrameworkItem[];
  summary: string;
}

/* ─── Frameworks ────────────────────────────────────────────────────────── */

export const allFrameworks: Framework[] = [];

/* ─── Ralph Technique (data for RalphSection) ─────────────────────────── */

export const ralphFramework: RalphLetter[] = [
  {
    letter: "1",
    word: "The Loop",
    description:
      "while :; do cat PROMPT.md | claude-code; done — the autonomous bash loop. One task per iteration, fresh context every time. (Geoffrey Huntley, ghuntley.com/ralph)",
  },
  {
    letter: "2",
    word: "One Task",
    description:
      "Ask Ralph to do one thing per loop. Only one. Trust the LLM to decide what's most important. 'Choose the most important thing.'",
  },
  {
    letter: "3",
    word: "Specs + Plan",
    description:
      "Deterministically load the same context every loop: specs/ (one per file) and fix_plan.md (the living TODO). The stack must be identical each iteration.",
  },
  {
    letter: "4",
    word: "Back-Pressure",
    description:
      "Tests and build reject invalid code generation. After implementing, run the tests for that unit of code. The wheel must turn fast.",
  },
  {
    letter: "5",
    word: "Tune",
    description:
      "When Ralph misbehaves, tune the prompt — like tuning a guitar. Add signs. Update specs. Update AGENT.md. Each time Ralph does something bad, Ralph gets tuned.",
  },
];

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

export const faqItems: FaqItem[] = [
  {
    question: "Does this replace developers?",
    answer:
      "No. It replaces or accelerates some mechanical, repetitive, or exploratory tasks. The developer remains responsible for architecture, decisions, validation, impact, and quality.",
  },
  {
    question: "So vibe-coding is bad?",
    answer:
      "Not at all. It is useful for prototypes, experiments, and rapid exploration. The problem is using vibe-coding as if it were professional development for a real product.",
  },
  {
    question: "Can I trust the generated code?",
    answer:
      "Not without review. Generated code must be treated like code written by someone else: it needs review, tests, and validation.",
  },
  {
    question: "Which tool is best — Claude Code, OpenCode, Codex, or Atomica?",
    answer:
      "It depends on your context. The main point of this course is not to sell a specific tool. It is to learn a safe workflow that works across all of them.",
  },
  {
    question: "Should I let the agent run terminal commands?",
    answer:
      "Yes, with judgement. Read commands, tests, typecheck, and lint are generally safe. Destructive commands, migrations, dependency changes, or operations in real environments require explicit approval.",
  },
  {
    question: "When should I stop the agent?",
    answer:
      "When it starts editing files outside scope, repeating attempts without progress, inventing APIs, ignoring errors, or doing refactors that were not requested.",
  },
  {
    question: "What if the agent is wrong?",
    answer:
      "Stop. Return to context. Ask it to explain what it assumed. Restrict the scope. Restart with a more specific instruction.",
  },
  {
    question: "Do I need MCP to get started?",
    answer:
      "No. MCP is useful but not required for the first level. It is better to learn the safe workflow first: understand, plan, change, validate.",
  },
  {
    question: "Does this work with legacy code?",
    answer:
      "Yes, but with more care. In legacy codebases, the agent should first map behaviour and dependencies. Changes must be small and very well validated. Legacy is actually one of the highest-value use cases — the agent can help you understand unfamiliar code before you touch it.",
  },
  {
    question: "Is there any limit to files when opening a project?",
    answer:
      "Yes. Every agent has a context window — a maximum amount of text it can hold in memory at once. It cannot read your entire codebase at once. That is why Recon matters: you direct the agent to the relevant files instead of hoping it finds them. Large monorepos, binary files, node_modules, and generated code should be excluded via .gitignore or tool-specific ignore files. In practice, the agent works best when it reads 10-30 focused files per task, not hundreds. AGENTS.md helps by telling the agent where to look — so it spends its context budget on the files that matter.",
  },
];

/* ─── Resource Card Type ────────────────────────────────────────────────── */

export interface ResourceCard {
  id: string;
  icon: "shield" | "server" | "users" | "chart" | "terminal" | "alert";
  title: string;
  description: string;
  items: { label: string; detail: string }[];
  callout?: { variant: "warning" | "insight" | "rule"; title: string; text: string };
}

/* ─── Prompt Template Type ──────────────────────────────────────────────── */

export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  prompt: string;
  notes: string;
}

/* ─── Failure Pattern Type ──────────────────────────────────────────────── */

export interface FailurePattern {
  id: string;
  title: string;
  what: string;
  why: string;
  fix: string;
  severity: "critical" | "major" | "minor";
}

/* ─── Enterprise Topics ─────────────────────────────────────────────────── */

export const enterpriseTopics: ResourceCard[] = [
  {
    id: "security",
    icon: "shield",
    title: "Security and sensitive data",
    description:
      "AI agents can read everything in your project. In an enterprise context, you must control what the agent sees and what it can do with sensitive information.",
    items: [
      { label: "Never share with agents", detail: "API keys, tokens, passwords, connection strings, customer PII, internal infrastructure URLs, compliance-sensitive business logic, and production database credentials. Treat the agent as an external contractor with read access." },
      { label: "Configure .gitignore", detail: "Ensure .env, .env.local, secrets/, credentials/, and any sensitive config files are in .gitignore. The agent reads files from the project — if a secret is in a tracked file, the agent will see it." },
      { label: "Tool-specific ignore files", detail: "Claude Code supports .claudeignore, OpenCode uses .opencodeignore. Use these to exclude sensitive directories, generated files, and large binary assets that waste context budget." },
      { label: "What if the agent sees a secret", detail: "If the agent reads a secret and includes it in generated code, the secret may end up in a commit, a PR description, or a log. Rotate the secret immediately. Add the file to your ignore list. Treat this as a security incident." },
      { label: "Operating contracts for security", detail: "Add to your AGENTS.md: 'Never include secrets, tokens, API keys, or passwords in generated code. Never commit .env files. If you encounter a value that looks like a credential, stop and alert the developer.'" },
    ],
    callout: { variant: "warning", title: "Enterprise rule", text: "The agent does not understand confidentiality. It cannot distinguish between a test API key and a production secret. The developer must control what the agent can access through ignore files, project structure, and operating contracts." },
  },
  {
    id: "teams",
    icon: "users",
    title: "Team adoption patterns",
    description:
      "The course teaches individual workflow. But in a team, you need shared conventions for how agents are used across the codebase.",
    items: [
      { label: "Shared AGENTS.md", detail: "AGENTS.md should be committed to the repo and maintained by the team — not each developer's personal copy. Changes go through PR review, just like code. This ensures every developer (and every agent session) starts with the same context." },
      { label: "Resolving rule conflicts", detail: "When two developers disagree on a rule, the rule is discussed in a PR. The team decides. The resolved rule is merged into AGENTS.md. Ad hoc conventions that live in individual prompts create drift." },
      { label: "Onboarding new developers", detail: "New team members should: 1) Read AGENTS.md, 2) Do the Module 2 exercises on the team's actual project, 3) Pair with an experienced developer for their first Ralph loop, 4) Review their first three agent-assisted PRs with the team." },
      { label: "Agent-assisted code review", detail: "Use the agent to prepare for code review: 'Read this PR diff and list potential issues: scope, correctness, patterns, tests, accessibility.' The agent provides a first-pass review; the human reviewer makes the decisions." },
      { label: "Skills as team knowledge", detail: "When a developer solves a task well, extract the pattern into a skill file. Over time, the team's collective expertise is encoded in skills — every future agent session benefits from every past success." },
      { label: "Measuring team adoption", detail: "Track: how many developers use AGENTS.md, how often skills are updated, how many PRs use the Ralph technique, and the rework rate on agent-assisted PRs vs manual PRs. Improvement should be visible within 2-3 sprints." },
    ],
  },
  {
    id: "metrics",
    icon: "chart",
    title: "Measuring success",
    description:
      "Without measurement, you cannot tell if AI agents are helping or creating new problems. Track these metrics to see whether the investment is paying off.",
    items: [
      { label: "Time to first commit", detail: "How long from task start to first meaningful commit? The Ralph technique adds upfront time (reading, planning) but should reduce total time because rework decreases. Track both to see the tradeoff in your team." },
      { label: "Diff review pass rate", detail: "What percentage of agent-assisted diffs pass review on the first attempt? If the rate is low, the agent likely needs better context (AGENTS.md, rules, skills). Track this metric over time and compare against manually-written code." },
      { label: "Rework rate", detail: "How often do agent-assisted changes need to be redone? Compare against manually-written code. If agent code has higher rework, the diagnosis is usually weak context (improve AGENTS.md) or insufficient back-pressure (add tests/linting to the loop)." },
      { label: "Tasks per session", detail: "How many complete Ralph loops does a developer run per session? If a developer consistently completes only one task per session, the tasks may be too large or the agent may need more context. Track this to calibrate task sizing." },
      { label: "Context file coverage", detail: "Does the project have AGENTS.md? Skills? Rules? Operating contracts? AGENTS.md should be in 100% of projects. Skills indicate maturity. Track this per project." },
      { label: "Agent failure rate", detail: "How often does the developer stop the agent (the six stop signals from Module 2)? A high stop rate means the agent needs better context. Track which failure type is most common — that tells you what to fix." },
    ],
    callout: { variant: "insight", title: "The 30-day benchmark", text: "After 30 days of the Ralph technique + project instrumentation, teams typically report: noticeably less time spent on mechanical tasks, fewer code review round-trips, and higher test coverage because the agent writes tests more consistently than humans. Track your own metrics — the improvement varies by team and codebase." },
  },
];

/* ─── Prompt Library ─────────────────────────────────────────────────────── */

export const promptLibrary: PromptTemplate[] = [
  {
    id: "recon-feature",
    category: "Recon",
    title: "Explore an unfamiliar feature",
    prompt: "Read the files related to [feature name].\nExplain:\n1. The component structure and hierarchy\n2. The data flow — where data comes from and how it is transformed\n3. Key dependencies (shared hooks, API calls, external libraries)\n4. Anything unusual or complex\n\nDo not change anything.",
    notes: "Replace [feature name] with the specific area. Point the agent to a starting directory if it picks the wrong files.",
  },
  {
    id: "recon-bug",
    category: "Recon",
    title: "Investigate a bug",
    prompt: "Read the files related to [describe the bug].\nExplain:\n1. How the affected feature currently works\n2. Where the data/logic flows through\n3. What could cause [the observed symptom]\n4. Which file(s) are most likely to contain the issue\n\nDo not change anything yet.",
    notes: "Include the error message or reproduction steps if available. The more specific the symptom, the better the Recon.",
  },
  {
    id: "plan-feature",
    category: "Architecture",
    title: "Plan a new feature",
    prompt: "Based on your inspection, propose a plan for [describe feature].\nInclude:\n1. Which files you will create or modify\n2. The approach — what changes in each file\n3. Which existing components or patterns you will reuse\n4. What could go wrong or what you are unsure about\n5. The implementation order\n\nDo not write any code yet.",
    notes: "Review the plan carefully. Check file paths, component choices, and scope. Correct before approving.",
  },
  {
    id: "plan-refactor",
    category: "Architecture",
    title: "Plan a refactor",
    prompt: "I want to refactor [describe what].\n\nBefore proposing changes:\n1. Read every file that imports or uses [the target]\n2. List all consumers and how they depend on the current API\n3. Propose a migration plan that can be done in small, safe steps\n4. Identify what tests need to be updated\n\nDo not implement yet.",
    notes: "Refactors are the highest-risk use case. The Recon and plan steps are critical here — never skip them for refactors.",
  },
  {
    id: "patch-component",
    category: "Patch",
    title: "Create a new component",
    prompt: "Create [ComponentName] at [path].\n\nRequirements:\n- [describe what it renders]\n- Props: [list the props with types]\n- Use [existing component] from [path] as a reference for conventions\n- Use cn() from @/lib/utils for className merging\n- All decorative elements must have aria-hidden='true'\n\nAfter creating, run typecheck and show me the diff.",
    notes: "Always reference an existing component for conventions. This prevents the agent from inventing new patterns.",
  },
  {
    id: "patch-test",
    category: "Patch",
    title: "Write tests for a component",
    prompt: "Write tests for [ComponentName] at [path].\n\nTest these scenarios:\n1. [Scenario 1 — e.g. renders with default props]\n2. [Scenario 2 — e.g. handles click event]\n3. [Scenario 3 — e.g. shows error state]\n\nUse the same testing patterns as [existing test file].\nUse getByRole as the primary query.\nDo not use getByTestId unless no semantic query is possible.\n\nRun the tests and show me the results.",
    notes: "Always specify the scenarios. Without them, the agent writes tests that assert 'the component renders' — which is not useful.",
  },
  {
    id: "patch-bugfix",
    category: "Patch",
    title: "Fix a bug",
    prompt: "Fix: [describe the bug and expected vs actual behaviour].\n\nThe issue is in [file path or area].\n\nConstraints:\n- Only modify the minimum files needed\n- Do not refactor adjacent code\n- Add a regression test that would have caught this bug\n\nAfter fixing, run typecheck and the relevant tests.\nShow me the diff.",
    notes: "Be specific about the bug. Include error messages, screenshots, or reproduction steps if possible.",
  },
  {
    id: "harden-review",
    category: "Harden",
    title: "Review a diff before committing",
    prompt: "Review the current diff against these criteria:\n\n1. SCOPE — did we only change what was planned?\n2. CORRECTNESS — is the logic right? Edge cases handled?\n3. PATTERNS — does it follow project conventions?\n4. DEPENDENCIES — any new packages added without approval?\n5. TESTS — do tests cover the changed behaviour?\n6. ACCESSIBILITY — interactive elements correct? ARIA attributes?\n7. READABILITY — will another developer understand this in 6 months?\n\nReport findings as Critical / Major / Minor.",
    notes: "A code review prompt. Use after every change, before committing.",
  },
  {
    id: "stop-reset",
    category: "Recovery",
    title: "Stop and reset the agent",
    prompt: "Stop. Do not make any more changes.\n\n1. Show me the full diff of everything you changed\n2. Explain what you were trying to do and what went wrong\n3. List any assumptions you made that you are not sure about\n\nI will review and decide how to proceed.",
    notes: "Use this when any of the six stop signals fire: scope drift, repeated failure, invented APIs, ignored errors, uncontrolled growth, or confidence without evidence.",
  },
  {
    id: "context-load",
    category: "Context",
    title: "Load project context at session start",
    prompt: "Read AGENTS.md in the project root.\nThen read the folder structure of src/.\n\nConfirm:\n1. You understand the tech stack\n2. You know the folder conventions\n3. You know the testing setup\n4. You know the rules and constraints\n\nDo not make any changes. Just confirm your understanding.",
    notes: "Use at the start of every new session. Takes 30 seconds and prevents the most common agent mistakes.",
  },
];

/* ─── Failure Patterns ───────────────────────────────────────────────────── */

export const failurePatterns: FailurePattern[] = [
  {
    id: "invented-api",
    title: "Invented API endpoints",
    what: "The agent calls a function or API endpoint that does not exist in the codebase. The code compiles (TypeScript may not catch it if the type is 'any' or loosely defined) but fails at runtime.",
    why: "The agent inferred the API shape from the task description instead of reading the actual API client or backend code. It hallucinated a plausible-looking endpoint.",
    fix: "Always Recon the API layer first. Ask the agent to read the actual API client file and list existing endpoints before using any. Add a contract: 'Never call an API endpoint without first confirming it exists in the codebase.'",
    severity: "critical",
  },
  {
    id: "scope-creep",
    title: "Scope creep in diffs",
    what: "You asked for a 10-line fix. The agent changed 200 lines across 8 files — renaming variables, reformatting code, 'improving' error handling, and refactoring functions that were not part of the task.",
    why: "The agent optimises for completeness. Without explicit scope boundaries, it expands to fill the available context. Every adjacent 'improvement' it sees becomes part of the task.",
    fix: "Always include 'what not' in the prompt. Specify which files can be modified. Review the plan before implementation. Check scope first — did the agent only change what was asked?",
    severity: "critical",
  },
  {
    id: "wrong-component",
    title: "Reinvented existing components",
    what: "The agent created a new Button component with custom styling instead of using the existing Button from the design system. The new component works but breaks visual consistency.",
    why: "The agent did not read the component library before creating UI. It solved the problem locally without knowing a project-wide solution already existed.",
    fix: "Add a rule: 'Always check src/components/ui/ before creating any UI element.' Add component names to AGENTS.md. The Recon step should include reading the component library.",
    severity: "major",
  },
  {
    id: "broken-a11y",
    title: "Broken accessibility",
    what: "The agent replaced a semantic <button> with a <div onClick>, removed aria-label from an icon button, or created a modal without focus trap or Escape key support.",
    why: "Accessibility rules are rarely in the default training. Without explicit project rules, the agent optimises for visual correctness and functionality, not semantic correctness.",
    fix: "Add accessibility rules to AGENTS.md: 'Interactive elements must be <button> or <a>. Icon-only buttons must have aria-label. Modals need focus trap and Escape support.' Create an accessibility skill.",
    severity: "major",
  },
  {
    id: "unnecessary-deps",
    title: "Unnecessary dependencies",
    what: "The agent added lodash for a single utility function, installed a date library when the project already had one, or added a CSS-in-JS library when the project uses Tailwind.",
    why: "The agent reaches for well-known npm packages to solve problems quickly. It does not check whether the project already has a solution or whether the dependency is worth the long-term cost.",
    fix: "Add a contract: 'Never add npm dependencies without asking first.' Add to AGENTS.md: list existing utilities the project already has (date formatting, className merging, API client, etc.).",
    severity: "major",
  },
  {
    id: "plausible-tests",
    title: "Tests that pass but test nothing",
    what: "The agent wrote tests that assert 'the component renders without crashing' or check implementation details (specific CSS classes, internal state values) instead of user-visible behaviour.",
    why: "The agent generates tests that satisfy the 'write tests' instruction with minimal effort. Without specific test scenarios in the prompt, it defaults to shallow assertions.",
    fix: "Always specify test scenarios in the prompt: 'Test that clicking Submit calls the API', not just 'write tests'. Add a testing skill that enforces getByRole queries and behaviour-based assertions.",
    severity: "minor",
  },
  {
    id: "stale-context",
    title: "Following outdated AGENTS.md",
    what: "The agent created a component in the old folder structure, used a deprecated styling approach, or called a renamed function — because AGENTS.md was not updated after a refactor.",
    why: "The agent follows instructions literally. If AGENTS.md says 'components go in src/components/' but the team moved to a feature-based structure, the agent will use the old path.",
    fix: "Schedule a 15-minute AGENTS.md audit every sprint. After any refactor, update AGENTS.md as part of the PR. Add 'Audit context files' to the team's Definition of Done.",
    severity: "minor",
  },
];

/* ─── Module 1 — Deep Dive ──────────────────────────────────────────────── */


const module1Slides: Slide[] = [
  {
    number: 1,
    title: "What is an AI Coding Agent?",
    headline: "From autocomplete\nto agent-assisted development",
    presentationPoints: [
      "AI moves from suggestion engine to active participant in the development flow",
      "Tools that can read files, edit code, run commands, interpret errors, and try again",
      "The agent can write code — the developer remains responsible for the code",
    ],
    sections: [
      {
        type: "paragraph",
        text: "Before we start using Claude Code, OpenCode, Codex, or Atomica to change code, we need to align on a simple idea. We are not talking about autocomplete — the kind of inline suggestion that finishes your function name or closes a bracket. We are also not talking about a chatbot window where you paste code and get a response.",
      },
      {
        type: "paragraph",
        text: "We are talking about something fundamentally different: tools that can read your files, search across the entire repository, understand project structure, propose changes, edit code directly, run terminal commands, interpret errors, and try again. These tools operate inside your development environment. They can act.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The key shift",
        text: "The AI moves from being a suggestion engine to being an active participant in the development flow. It can do things — not just say things.",
      },
      {
        type: "paragraph",
        text: "This changes how we work significantly. The productivity gain can be large, but the risk also increases. An autocomplete that suggests a wrong variable name is a minor annoyance. An agent that edits three files based on a wrong assumption can introduce bugs that take hours to find.",
      },
      {
        type: "quote",
        text: "The agent can write code.\nThe developer remains responsible for the code.",
      },
      {
        type: "paragraph",
        text: "The goal of this module is simple: understand what an AI Coding Agent is, what it can and cannot do, and what the developer's role must be when working alongside one. Every concept we cover here will be the foundation for the practical workflow in Module 2 and the project setup in Module 3.",
      },
    ],
  },
  {
    number: 2,
    title: "The old model",
    presentationPoints: ["In the old model, the AI only knows what you give it", "The developer is the bridge between the AI and the codebase — every step is manual"],
    headline: "Before\n\nAI as assistant.\nAsk. Copy. Adapt. Paste. Test.",
    sections: [
      {
        type: "paragraph",
        text: "During the last few years, many developers used AI in a relatively simple way. We opened a chat window — ChatGPT, Copilot Chat, Gemini — and asked questions:",
      },
      {
        type: "bullets",
        items: [
          "\"Explain this error message\"",
          "\"Create a function that validates email addresses\"",
          "\"Write a unit test for this component\"",
          "\"Improve this regex\"",
          "\"Help me understand this hook\"",
          "\"Suggest a way to refactor this module\"",
        ],
      },
      {
        type: "paragraph",
        text: "This is useful, but it has a clear limitation: the AI only knows what you give it. If you don't paste the right file, it doesn't know. If you don't explain the architecture, it doesn't know. If you don't tell it your team's conventions, it will probably invent or assume.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The copy-paste bottleneck",
        text: "In the old model, the developer is the bridge between the AI and the codebase. You manually select what to share, copy it, paste it into the chat, read the response, adapt it, paste it back into your editor, and test. Every step is manual. Every step is a chance for lost context.",
      },
      {
        type: "paragraph",
        text: "In this model, the AI helps, but it is passive. It responds; the developer executes. The developer still has to find the files, copy the right context, make the edits, run the tests, and validate. The AI is a smart search engine with generation capabilities — not a participant in the workflow.",
      },
      {
        type: "paragraph",
        text: "This is not wrong. It is useful. But it is not what we mean when we talk about AI Coding Agents.",
      },
    ],
  },
  {
    number: 3,
    title: "The new model",
    presentationPoints: ["The agent works inside the development environment — it can inspect, modify, and run", "AI Coding Agent = LLM + code context + tools + terminal + instructions", "The agent can make mistakes at scale"],
    headline: "Now\n\nAI as coding agent.\nReads. Edits. Runs. Learns. Iterates.",
    sections: [
      {
        type: "paragraph",
        text: "With Claude Code, OpenCode, Codex, and Atomica, the model changes completely. The agent works inside the development environment. It can inspect the project, open files, search for references across the codebase, modify code, run commands, read the output, and iterate.",
      },
      {
        type: "paragraph",
        text: "Instead of just responding, it can act. This is the fundamental difference.",
      },
      {
        type: "subheading",
        text: "The anatomy of an AI Coding Agent",
      },
      {
        type: "quote",
        text: "AI Coding Agent = LLM + code context + tools + terminal + instructions",
      },
      {
        type: "bullets",
        items: [
          "The LLM provides reasoning — the ability to understand a request, form a plan, and generate code or text.",
          "Code context provides information about the project — files, folder structure, imports, types, existing patterns.",
          "Tools allow the agent to interact with the outside world — file system, documentation, browser, APIs, GitHub, Azure DevOps, Figma, MCP servers.",
          "The terminal provides real feedback — errors, logs, test results, typecheck output, lint warnings.",
          "Instructions define the rules of the game — what the agent should do, what it must never do, and how it should behave.",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why this matters",
        text: "The agent doesn't need you to copy-paste files into a chat window anymore. It can read the files itself. It doesn't need you to run the tests — it can do that too. This removes the developer as the bottleneck for context transfer, but it also means the agent can make mistakes at scale.",
      },
    ],
  },
  {
    number: 4,
    title: "Exercise: see the agent in action",
    presentationPoints: ["Give the agent a read-only exploration task — watch how it navigates", "The agent reads files by itself, identifies patterns from code"],
    headline: "Exercise 1\n\nAsk the agent to explore.\nWatch what it can do.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: your first agent interaction",
        text: "Open any project in your AI coding agent (Claude Code, OpenCode, Codex, or Atomica). Give it a read-only exploration task. Watch how it navigates the codebase — this is the difference between the old model and the new model.",
      },
      {
        type: "code",
        language: "text",
        code: "Read the files in this project.\nExplain:\n1. What framework and language are used\n2. What the folder structure looks like\n3. What the main entry point is\n4. What the key dependencies are\n\nDo not change anything. Just explore and explain.",
        caption: "Your first agent prompt — exploration only",
      },
      {
        type: "subheading",
        text: "What to observe",
      },
      {
        type: "bullets",
        items: [
          "The agent reads files by itself — you did not paste anything",
          "It navigates the folder structure without you pointing to each file",
          "It identifies patterns (framework, conventions) from reading code, not from you explaining",
          "It produces a summary that a chatbot could never produce without manual context",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The lesson",
        text: "This is the new model in action. The agent read your project, understood the structure, and explained it back — all without you copying a single file. This is what makes coding agents fundamentally different from chatbots. Now imagine what happens when it can also edit.",
      },
    ],
  },
  {
    number: 5,
    title: "Vibe-coding vs AI-assisted development",
    presentationPoints: ["Vibe-coding optimises for speed; AI-assisted development optimises for control and quality", "The problem is confusing vibe-coding with software engineering"],
    headline: "Vibe-coding?\n\nCreating fast\nis not the same as\ndelivering well.",
    sections: [
      {
        type: "paragraph",
        text: "There is a term that comes up constantly when people talk about AI and programming: vibe-coding. It usually means something like: write an idea in natural language, ask the AI to build it, accept the result, test visually, adjust with more prompts until it looks right.",
      },
      {
        type: "paragraph",
        text: "This can be extremely useful. For prototypes, experiments, demos, simple landing pages, weekend projects, or exploring an idea quickly — vibe-coding is fast and often good enough.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The trap",
        text: "The problem is not vibe-coding itself. The problem is confusing vibe-coding with software engineering. When the line between 'quick experiment' and 'production code' gets blurred, the cost arrives later — in bugs, in tech debt, in security holes, in accessibility failures, in code that nobody can maintain.",
      },
      {
        type: "subheading",
        text: "What professional AI-assisted development requires",
      },
      {
        type: "comparison",
        headers: ["Vibe-coding", "AI-assisted development"],
        rows: [
          ["Optimises for speed and feeling of progress", "Optimises for control, quality, and sustainable delivery"],
          ["Context is informal or absent", "Context is explicit, encoded in files"],
          ["Validation is visual or manual", "Validation is tests, typecheck, lint, review"],
          ["Architecture can be improvised", "Architecture follows existing patterns"],
          ["High risk tolerance (prototypes)", "Low risk tolerance (real product)"],
          ["Developer as experimenter", "Developer as accountable owner"],
          ["Best for demos, proofs of concept, ideas", "Best for real features, bug fixes, refactors, maintenance"],
        ],
      },
      {
        type: "quote",
        text: "Vibe-coding optimises for speed and the feeling of progress.\nAI-assisted development optimises for control, quality, and sustainable delivery.",
      },
    ],
  },
  {
    number: 6,
    title: "Two modes of using AI",
    presentationPoints: ["Mode 1: Rapid prototyping — useful for weekend projects, hackathons, demos", "Mode 2: Professional development — required for production code", "The error is using prototype mode for real product work"],
    headline: "Two modes\n\nRapid prototyping\nvs\nDeveloping with control",
    sections: [
      {
        type: "paragraph",
        text: "We can use AI for code in two very different ways, and it is important to be conscious about which mode we are in.",
      },
      {
        type: "subheading",
        text: "Mode 1: Rapid prototyping",
      },
      {
        type: "bullets",
        items: [
          "Useful for weekend projects, hackathons, internal demos",
          "Acceptable to have rough edges, missing error handling, improvised architecture",
          "The agent can have more autonomy — you iterate quickly and don't review every line",
          "The output may never ship to production — and that's fine",
        ],
      },
      {
        type: "subheading",
        text: "Mode 2: Professional development",
      },
      {
        type: "bullets",
        items: [
          "Required for production features, customer-facing code, shared libraries",
          "The agent needs explicit project context, conventions, and boundaries",
          "Every change must be reviewed — the diff is the most important checkpoint",
          "Tests, typecheck, lint, and accessibility checks are not optional",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The rule",
        text: "Neither mode is wrong. The error is using prototype mode when you are working on a real product, a critical system, or code that other teams will maintain.",
      },
    ],
  },
  {
    number: 7,
    title: "Exercise: experience vibe-coding",
    presentationPoints: ["Give the agent a broad, unconstrained prompt — inspect the output critically", "How many decisions did the agent make without asking you?"],
    headline: "Exercise 2\n\nVibe-code something.\nThen inspect what you got.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: vibe-coding vs inspection",
        text: "Give the agent a vibe-coding prompt — a broad, unconstrained request. Accept the result. Then inspect it critically. How many assumptions did the agent make?",
      },
      {
        type: "subheading",
        text: "Round 1: vibe-code",
      },
      {
        type: "code",
        language: "text",
        code: "Create a simple todo app with add, complete, and delete functionality.",
        caption: "The vibe-coding prompt — broad, no constraints",
      },
      {
        type: "paragraph",
        text: "Let the agent build it. Do not intervene. Accept what it produces.",
      },
      {
        type: "subheading",
        text: "Round 2: inspect critically",
      },
      {
        type: "paragraph",
        text: "Now look at what the agent actually produced and answer these questions:",
      },
      {
        type: "bullets",
        items: [
          "What framework did it choose? Did you specify one?",
          "What styling approach did it use? Was that your preference?",
          "Is there any error handling? What happens if something fails?",
          "Are there any tests? Any accessibility attributes?",
          "How many files did it create? Could you review all of them carefully?",
          "Would you ship this to production as-is?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The lesson",
        text: "Vibe-coding produces output fast. But look at how many decisions the agent made without asking you. Framework, styling, architecture, error handling, accessibility — all assumed. For a prototype, that is fine. For production code, every assumption is a risk.",
      },
    ],
  },
  {
    number: 8,
    title: "More power, more risk",
    presentationPoints: ["When the AI edits code directly, the risk profile changes completely", "Greatest danger: plausible code that violates architecture or business rules", "The more capable the agent, the more discipline the developer needs"],
    headline: "More power\n\nalso means\n\nmore risk",
    sections: [
      {
        type: "paragraph",
        text: "When AI only responded in a chat window, the main risk was receiving a bad suggestion. You could look at it, decide it was wrong, and ignore it. The blast radius was limited to your clipboard.",
      },
      {
        type: "paragraph",
        text: "But when the AI edits code directly, the risk profile changes completely. Now we can have:",
      },
      {
        type: "bullets",
        items: [
          "Changes to files that should not have been touched",
          "Code that looks correct but breaks business rules",
          "API endpoints or function signatures that were invented — they don't exist in the real backend",
          "New components created when matching components already existed in the design system",
          "Unnecessary dependencies added to package.json",
          "Changes that are far too large for the problem they solve",
          "Tests that pass but don't actually validate the correct behaviour",
          "Security patterns bypassed because the agent didn't know they were required",
          "Accessibility broken because the agent replaced a semantic element with a div",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The biggest danger",
        text: "The greatest danger is not obviously bad code. Obviously bad code is easy to spot. The greatest danger is plausible code: code that looks correct, compiles, perhaps even passes some tests — but does not respect the architecture, the user experience, the security model, or the real business rules.",
      },
      {
        type: "quote",
        text: "The more capable the agent, the more discipline the developer needs.\nCapability without oversight is how small mistakes become large problems.",
      },
    ],
  },
  {
    number: 9,
    title: "Agent is not a developer",
    presentationPoints: ["A developer has business context, organisational memory, and responsibility", "An agent has only the prompt and the files it reads — no memory between sessions", "The agent does not know when it is confident but wrong"],
    headline: "Agent ≠ Developer\n\nThe agent executes.\nThe developer decides.",
    sections: [
      {
        type: "paragraph",
        text: "An AI Coding Agent can behave like a developer in some tasks. It can read code, understand patterns, write implementations, fix bugs, and produce tests. In a narrow sense, it can do 'developer work'. But it is not a developer.",
      },
      {
        type: "comparison",
        headers: ["A developer has", "An agent has"],
        rows: [
          ["Business context — why the feature exists", "Only what is in the prompt and the files it reads"],
          ["Organisational memory — historical decisions, past failures", "No memory between sessions"],
          ["A sense of responsibility — ownership of outcomes", "No concept of consequences"],
          ["Technical judgement — knowing when to push back", "Probabilistic confidence that may be miscalibrated"],
          ["Awareness of impact — who is affected by this change", "No knowledge beyond the codebase it can read"],
          ["Intuition about risk — 'this feels too large'", "No ability to sense scope creep"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The overconfidence problem",
        text: "One of the most subtle risks is that the agent does not know when it is confident but wrong. It does not have uncertainty calibration in the way humans develop through experience. It will suggest a solution with the same tone whether it is certain or guessing.",
      },
      {
        type: "quote",
        text: "The agent can produce code.\nThe developer is the owner of quality.",
      },
    ],
  },
  {
    number: 10,
    title: "What is inside an agent?",
    presentationPoints: ["Four components: Model, Context, Tools, Instructions", "Context is the most common failure point", "Before blaming the model, check the context, tools, and instructions"],
    headline: "The agent\n\nModel + Context + Tools + Instructions",
    sections: [
      {
        type: "paragraph",
        text: "To work effectively with an AI Coding Agent, it helps to understand the four practical components and how each can fail.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "1. The Model",
        text: "The language model is the reasoning engine. It interprets your request, plans a response, and generates code or text. Different models have different capabilities — Claude Sonnet for speed, Claude Opus for complex reasoning, GPT-4.5 for broad knowledge. The model is what most people think about, but it is often not the main source of problems.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "2. The Context",
        text: "Everything the agent knows about your project: files it has read, repository structure, documentation, errors, logs, component names, type definitions, existing patterns. Context is the most common failure point. When an agent produces bad code, the first question should be: 'Did it have enough context?'",
      },
      {
        type: "callout",
        variant: "insight",
        title: "3. The Tools",
        text: "Tools are the agent's hands. They allow it to interact with the world: reading and writing files, running terminal commands, searching code, opening a browser, connecting to GitHub, Azure DevOps, Figma, or MCP servers.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "4. The Instructions",
        text: "Instructions are the rules of the game. They come from AGENTS.md, CLAUDE.md, .opencode configuration, skills files, or inline in the prompt. Without good instructions, even a perfect model with perfect context will make locally-reasonable but globally-wrong decisions.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The diagnostic rule",
        text: "Before blaming the model, check the context, the tools, and the instructions. Most agent failures are environment failures, not intelligence failures.",
      },
    ],
  },
  {
    number: 11,
    title: "Where agents are good",
    presentationPoints: ["Agents are useful when the task is well-defined and the output is verifiable", "Good tasks: explain code, generate boilerplate, write tests, fix lint errors"],
    headline: "Good at\n\nExploring. Explaining.\nGenerating. Iterating.",
    sections: [
      {
        type: "paragraph",
        text: "AI coding agents are especially useful when the task is relatively well-defined and the output is verifiable.",
      },
      {
        type: "subheading",
        text: "Concrete examples of safe, high-value tasks",
      },
      {
        type: "bullets",
        items: [
          "Explain the code in a feature you haven't touched before",
          "Find all usages of a component or function across the repository",
          "Generate boilerplate for a new component following existing patterns",
          "Write unit tests for an existing function",
          "Fix a lint error or type error",
          "Refactor a single function — extract, rename, simplify",
          "Create a validation schema from a TypeScript interface",
          "Summarise what changed in a git diff",
          "Convert a callback pattern to async/await",
          "Add error handling to an API call",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The pattern",
        text: "The common thread is that all of these tasks are scoped, verifiable, and have a clear definition of 'done'. You can check the result. You can run a test. You can read the diff. The agent is not making decisions about what to build — it is executing a well-defined task.",
      },
    ],
  },
  {
    number: 12,
    title: "Where agents are weak",
    presentationPoints: ["Agents struggle with hidden context — things not written down", "Broad-impact tasks give the agent too much decision space", "Higher impact = lower autonomy"],
    headline: "Weak at\n\nHidden context.\nBroad impact.\nCritical decisions.",
    sections: [
      {
        type: "paragraph",
        text: "Agents struggle — and can be actively dangerous — in three specific situations.",
      },
      {
        type: "subheading",
        text: "1. Hidden context — things that are not written down",
      },
      {
        type: "bullets",
        items: [
          "Business rules that only exist in the team's collective memory",
          "Historical decisions that were never documented",
          "Inter-system dependencies that are not visible in the code",
          "Production constraints — rate limits, infrastructure specifics",
          "Security requirements that are implied but not encoded",
        ],
      },
      {
        type: "subheading",
        text: "2. Broad impact — tasks that are too wide",
      },
      {
        type: "paragraph",
        text: "Requests like 'refactor this application' or 'migrate this module' give the agent too much decision space. A hundred decisions across thirty files is a recipe for hidden mistakes.",
      },
      {
        type: "subheading",
        text: "3. The agent doesn't know what it doesn't know",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Confidence without calibration",
        text: "The agent may not know it is wrong. It presents its output with the same tone whether it is certain or guessing. This makes human review non-negotiable.",
      },
      {
        type: "quote",
        text: "The higher the impact of the task, the lower the autonomy of the agent should be.\nThe best first use cases are small, verifiable, and reversible.",
      },
    ],
  },
  {
    number: 13,
    title: "Exercise: find the limits",
    presentationPoints: ["Give the agent a task that depends on context it cannot access", "The agent is not stupid — it is blind", "The fix is not a better model — the fix is better context"],
    headline: "Exercise 3\n\nGive the agent a task\nwith hidden context.\nWatch it fail.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: experience the limits",
        text: "Give the agent a task that depends on context it cannot access — a business rule in your head, a convention that is not written anywhere, or a decision that was made verbally. Observe how it handles the gap.",
      },
      {
        type: "code",
        language: "text",
        code: "In [your project], modify the user registration flow to match\nour new compliance requirements.\n\n(Do not explain what the compliance requirements are.\nDo not point to any documentation.\nJust give the vague instruction and see what happens.)",
        caption: "A prompt with deliberately hidden context",
      },
      {
        type: "subheading",
        text: "What to observe",
      },
      {
        type: "bullets",
        items: [
          "Does the agent ask for clarification, or does it just guess?",
          "If it guesses, how confident does it sound?",
          "Are its assumptions correct? (They almost never will be.)",
          "Does it acknowledge uncertainty, or does it present guesses as facts?",
          "How much time would you waste if you accepted this output without review?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The lesson",
        text: "This is why context matters more than the model. The agent is not stupid — it is blind. It cannot use information it does not have. The fix is not a better model. The fix is better context: AGENTS.md, project rules, written requirements. Module 3 teaches you how to build this context layer.",
      },
    ],
  },
  {
    number: 14,
    title: "The first safety rule",
    presentationPoints: ["Do not open the agent and immediately ask 'Implement this feature'", "Start with: inspect, explain, do not change anything yet", "First understand, then plan, only then change"],
    headline: "Do not start with:\n\n\"implement this\"\n\nStart with:\n\n\"inspect and explain\"",
    sections: [
      {
        type: "paragraph",
        text: "This is one of the most important rules for anyone starting to work with AI Coding Agents, and it is so simple it feels almost too obvious. But it is violated constantly.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The most common mistake",
        text: "Do not open the agent and immediately ask: 'Implement this feature'. That single prompt gives the agent permission to edit code before it has understood the system. It is the equivalent of asking a new team member to start coding on their first hour without reading any documentation.",
      },
      {
        type: "code",
        language: "text",
        code: "Inspect the files relevant to the user profile page.\nExplain how it is currently structured.\nIdentify the key components, data flow, and dependencies.\nDo not change anything yet.",
        caption: "Example: inspection-first prompt",
      },
      {
        type: "quote",
        text: "First understand.\nThen plan.\nOnly then change.",
      },
      {
        type: "callout",
        variant: "example",
        title: "A practical test",
        text: "If the agent's first action is opening a file editor, something went wrong. If its first action is reading files and reporting what it found, you are on the right track.",
      },
    ],
  },
  {
    number: 15,
    title: "Controlled autonomy",
    presentationPoints: ["The developer controls objective, scope, constraints, validation, and the final decision", "The developer is the pilot; the agent is a capable co-pilot"],
    headline: "Controlled autonomy\n\nThe agent helps.\nThe human approves.",
    sections: [
      {
        type: "paragraph",
        text: "In this course, we will not treat the agent as a fully autonomous system. We will use it with controlled autonomy — the developer stays in the loop at every meaningful decision point.",
      },
      {
        type: "subheading",
        text: "What the developer controls",
      },
      {
        type: "bullets",
        items: [
          "The objective — what are we trying to achieve?",
          "The scope — which files, which module, which feature area?",
          "The constraints — what must not change? What dependencies are off-limits?",
          "The validation commands — what must pass before the change is considered complete?",
          "The final decision — is this diff acceptable?",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The autonomy boundary",
        text: "We do not want agents 'doing everything'. We want agents accelerating work within clear limits. The developer is the pilot. The agent is a very capable co-pilot that needs to be told the destination, the route, and the constraints.",
      },
    ],
  },
  {
    number: 16,
    title: "The base workflow",
    presentationPoints: ["Four steps: Understand, Plan, Change, Validate", "Most problems happen because developers skip steps 1 and 2"],
    headline: "Base workflow\n\nUnderstand → Plan → Change → Validate",
    sections: [
      {
        type: "paragraph",
        text: "This is the workflow we will use as the foundation for everything that follows. It is simple to memorise and it eliminates most common mistakes.",
      },
      {
        type: "subheading",
        text: "The four steps",
      },
      {
        type: "comparison",
        headers: ["Step", "What happens"],
        rows: [
          ["1. Understand", "The agent reads the project, finds relevant files, explains the current state. No changes."],
          ["2. Plan", "The agent proposes a short approach: which files, what changes, what risks. Developer reviews."],
          ["3. Change", "The agent implements a small, controlled part. One slice, not everything."],
          ["4. Validate", "Run checks — tests, typecheck, lint. Developer reviews the diff line by line."],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The most common failure pattern",
        text: "Most problems with AI Coding Agents happen because developers skip steps 1 and 2 and go directly to step 3. Without understanding and planning, the agent makes changes based on assumptions that were never validated.",
      },
      {
        type: "code",
        language: "text",
        code: "1. Inspect the relevant files. Explain what you found.\n2. Propose a plan: files to change, approach, risks.\n3. Wait for my approval.\n4. Implement one small slice.\n5. Run tests and show me the diff.",
        caption: "The base workflow as a prompt template",
      },
    ],
  },
  {
    number: 17,
    title: "Exercise: your first controlled task",
    presentationPoints: ["Pick a small task, execute the four-step workflow with no shortcuts", "Let the agent read and explain before changing anything"],
    headline: "Exercise 4\n\nUnderstand → Plan →\nChange → Validate.\nDo it once, properly.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: the base workflow on a real task",
        text: "Pick any small task in a project you know: add a tooltip, rename a component, fix a display issue, add a missing test. Execute the four-step workflow. No shortcuts.",
      },
      {
        type: "subheading",
        text: "Step by step",
      },
      {
        type: "code",
        language: "text",
        code: "# Step 1 — UNDERSTAND\nRead the files related to [your chosen task].\nExplain how the current code works.\nDo not change anything.\n\n# Step 2 — PLAN (after verifying the explanation is correct)\nPropose a plan for [your task].\nWhich files will change? What is the approach? What could go wrong?\nDo not implement yet.\n\n# Step 3 — CHANGE (after approving the plan)\nImplement the plan. Keep the change small.\nRun typecheck after implementing.\n\n# Step 4 — VALIDATE\nRun typecheck, lint, and any relevant tests.\nShow me the complete diff.",
        caption: "The four-step workflow applied to your task",
      },
      {
        type: "subheading",
        text: "Self-check",
      },
      {
        type: "bullets",
        items: [
          "Did you let the agent read and explain before it changed anything?",
          "Did you review and approve the plan before implementation?",
          "Was the diff small enough to review in one pass?",
          "Did all checks pass (typecheck, lint, tests)?",
          "Did the agent change only what was in the plan?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The preview",
        text: "You just ran the base workflow: understand → plan → change → validate. In Module 2, this becomes the Ralph technique — Geoffrey Huntley's autonomous loop for AI-assisted development. PROMPT.md, specs, tests as back-pressure, and continuous tuning.",
      },
    ],
  },
  {
    number: 18,
    title: "Takeaway",
    presentationPoints: ["AI Coding Agents can read, edit, run, and iterate inside your project", "Vibe-coding is for prototypes; AI-assisted development is for real products", "Always start with 'inspect and explain', never with 'implement this'"],
    headline: "Main idea\n\nThe agent accelerates.\nThe developer is accountable\nfor quality.",
    sections: [
      {
        type: "subheading",
        text: "What we covered",
      },
      {
        type: "bullets",
        items: [
          "AI Coding Agents are not autocomplete — they can read, edit, run, and iterate inside your project",
          "You explored a codebase with an agent and saw the difference from chatbot-style AI",
          "Vibe-coding is useful for prototypes; AI-assisted development is needed for real products",
          "You experienced vibe-coding and inspected the assumptions the agent made",
          "More capability means more risk — plausible-but-wrong code is the most dangerous failure mode",
          "The agent executes; the developer decides — ownership never transfers",
          "You tested the agent on hidden context and saw it fail confidently",
          "Always start with 'inspect and explain', never with 'implement this'",
          "You executed the base workflow: Understand → Plan → Change → Validate",
        ],
      },
      {
        type: "subheading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text: "In Module 2, we teach the Ralph technique — the autonomous bash loop that Geoffrey Huntley used to build an entire programming language. Real prompts, drill exercises, and the feedback patterns that make it reliable at scale.",
      },
      {
        type: "quote",
        text: "A good use of agents starts with clear context, small tasks, explicit constraints, and validation.\nA bad use starts with vague prompts, too much autonomy, no tests, and little review.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The prompt to remember",
        text: "Before changing any code:\n1. Inspect the relevant files\n2. Explain how the functionality is structured\n3. Identify risks or dependencies\n4. Propose a short plan\n5. Do not edit anything until I approve",
      },
    ],
  },
];



/* ─── Module 2 — The Ralph Technique + Drill Exercises ─────────────────── */

const module2Slides: Slide[] = [
  {
    number: 1,
    title: "How to start a task",
    headline: "Starting right\n\nContext first.\nIntent second.\nCode last.",
    sections: [
      {
        type: "paragraph",
        text: "The most common mistake developers make with AI coding agents is jumping straight to implementation. They open the tool, type 'add a button' or 'fix the bug', and let the agent go. Without context, the agent guesses — confidently, plausibly, and often wrongly.",
      },
      {
        type: "subheading",
        text: "The correct start sequence",
      },
      {
        type: "bullets",
        items: [
          "Context — make sure the agent has read AGENTS.md or equivalent project instructions. Verify it knows the stack, the conventions, and the constraints.",
          "Intent — describe what you want to achieve, why it matters, and what the boundaries are. Be specific about what should NOT happen.",
          "Permission — only after context and intent are established, allow the agent to read relevant files. Only after it reports back, allow it to plan. Only after you approve the plan, allow it to code.",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The starting rule",
        text: "Context loading is not overhead — it is the single most important step. A task that starts with context takes slightly longer to begin but finishes significantly faster because the agent makes fewer wrong assumptions and requires less rework.",
      },
    ],
  },
  {
    number: 2,
    title: "Describing intent",
    headline: "Describe intent\n\nWhat, why, and what not.",
    sections: [
      {
        type: "paragraph",
        text: "The way you describe a task to an agent determines the quality of the output. Vague prompts produce vague results. Specific prompts produce specific results. But the most important part of a good prompt is not what you ask the agent to do — it is what you tell it NOT to do.",
      },
      {
        type: "subheading",
        text: "The four parts of a good task description",
      },
      {
        type: "bullets",
        items: [
          "What — the concrete deliverable. 'Add a confirmation dialog before deleting a user account.'",
          "Why — the business context. 'Users are accidentally deleting accounts and contacting support to recover them.'",
          "Constraints — what the agent must use or follow. 'Use the existing ConfirmDialog component. Follow the same pattern used in the order cancellation flow.'",
          "What not — explicit boundaries. 'Do not add new dependencies. Do not modify the API layer. Do not change the user list page.'",
        ],
      },
      {
        type: "subheading",
        text: "Bad vs good prompts",
      },
      {
        type: "comparison",
        headers: ["Bad prompt", "Good prompt"],
        rows: [
          [
            "Add a delete button",
            "Add a delete account button to the UserProfile component that opens the existing ConfirmDialog before calling the DELETE /api/users/:id endpoint",
          ],
          [
            "Write tests for the form",
            "Write Vitest tests for the ContactForm component covering: valid submission, validation errors for empty fields, and the loading state during submission",
          ],
          [
            "Fix the bug",
            "The date picker in OrderForm shows UTC dates instead of the user's timezone. Fix the display in src/components/OrderForm/DateField.tsx without changing the stored value format",
          ],
          [
            "Refactor this file",
            "Extract the validation logic from UserForm.tsx (lines 45-120) into a useUserValidation hook. Keep the same rules. Do not change the form UI or submit handler",
          ],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The 'what not' principle",
        text: "The 'what not' part is the most commonly forgotten and the most impactful constraint. Without it, the agent will optimise for completeness — touching more files, adding more features, refactoring more code than you asked for. Explicit boundaries prevent scope creep before it starts.",
      },
    ],
  },
  {
    number: 3,
    title: "Exercise: vibe-coding vs structured prompting",
    headline: "Exercise 1\n\nSee the difference.\nSame task, two approaches.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: experience the difference",
        text: "You will give the agent the same task twice — once vibe-coding style, once with proper context and intent. Compare the results.",
      },
      {
        type: "subheading",
        text: "Round 1: vibe-coding",
      },
      {
        type: "code",
        language: "text",
        code: "Create a function that validates user input for a registration form.",
        caption: "The vague prompt — send this first",
      },
      {
        type: "paragraph",
        text: "Observe what the agent produces. It will make assumptions about field names, validation rules, error formats, and the framework. Note every assumption it made.",
      },
      {
        type: "subheading",
        text: "Round 2: with context and intent",
      },
      {
        type: "code",
        language: "text",
        code: "Create a validateRegistration function in TypeScript.\n\nContext:\n- Fields: email (string), password (string), name (string)\n- Email must be valid format (use a simple regex, no library)\n- Password must be 8+ characters with at least one number\n- Name must be 2-50 characters, no special characters\n\nConstraints:\n- Return { valid: boolean, errors: Record<string, string> }\n- Do not use any external validation library\n- Do not create a class — plain function only\n\nWrite the function and a few example test cases.",
        caption: "The specific prompt — send this second",
      },
      {
        type: "subheading",
        text: "What to observe",
      },
      {
        type: "bullets",
        items: [
          "How many assumptions did the vague prompt produce vs the specific one?",
          "Did the vibe-coding version match what you actually wanted?",
          "How much time would you spend adjusting the vague output vs the specific one?",
          "Which output could you ship to a codebase with confidence?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The lesson",
        text: "The vague prompt is faster to type but slower to use. The specific prompt takes 60 seconds longer to write and saves 10 minutes of correction. This is the core trade-off of AI-assisted development.",
      },
    ],
  },
  {
    number: 4,
    title: "R — Recon: inspect before editing",
    headline: "Read before write\n\n\"Read and explain.\nDo not change yet.\"",
    sections: [
      {
        type: "paragraph",
        text: "Reading before writing is the single most effective technique for controlling AI coding agents. Before the agent edits anything, it must read the relevant code and explain what it found. No exceptions. Geoffrey Huntley's Ralph technique encodes this as 'don't assume it's not implemented — search the codebase first'.",
      },
      {
        type: "paragraph",
        text: "This serves three purposes. It forces the agent to build an accurate mental model. It gives you a chance to verify understanding. And it surfaces dependencies and risks you might not have thought of.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The most common violation",
        text: "Many developers skip reading because it 'feels slow'. But having the agent read and explain the code before editing is fast and prevents significant time fixing wrong assumptions. Every time you let the agent edit before it has explained the code, you are gambling that it understood correctly on the first try.",
      },
      {
        type: "subheading",
        text: "What to check in the Recon output",
      },
      {
        type: "bullets",
        items: [
          "Did the agent find the right files? If it missed a key file, point it there.",
          "Is its understanding of the structure correct? If it describes the wrong data flow, correct it now.",
          "Did it identify the right dependencies? If it missed a shared utility, flag it.",
          "Did it spot anything you didn't expect? Sometimes Recon reveals hidden complexity.",
        ],
      },
    ],
  },
  {
    number: 5,
    title: "Exercise: Recon on a real codebase",
    headline: "Exercise 2\n\nRecon a project.\nVerify the agent's understanding.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: practise Recon",
        text: "Open any project you are currently working on (or use any open-source repo). Ask the agent to Recon a specific feature area. Verify its output against your knowledge.",
      },
      {
        type: "code",
        language: "text",
        code: "Read the files related to [pick a feature you know well].\n\nExplain:\n1. The component or module structure\n2. The data flow — where data comes from, how it is transformed\n3. Key dependencies (other modules, APIs, shared utilities)\n4. Anything that looks unusual or complex\n\nDo not change anything.",
        caption: "Your Recon prompt — fill in a feature you know",
      },
      {
        type: "subheading",
        text: "How to evaluate the result",
      },
      {
        type: "bullets",
        items: [
          "Did the agent find all the relevant files, or did it miss some?",
          "Is its explanation accurate? Compare it against your knowledge of the code.",
          "Did it identify the right dependencies and patterns?",
          "Could a new team member use this explanation to understand the feature?",
          "If anything is wrong, correct the agent and ask it to re-read.",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The quality bar",
        text: "If the agent's Recon output could serve as documentation for a new team member, the Recon was good. If it is vague, superficial, or wrong — send it back to read more carefully. Never proceed to planning with a flawed understanding.",
      },
    ],
  },
  {
    number: 6,
    title: "A — Architecture: plan before implementing",
    headline: "Plan before code\n\nFiles to change.\nApproach.\nRisks.",
    sections: [
      {
        type: "paragraph",
        text: "After Recon, the agent understands the code. Now it proposes a plan — not code, but a description of what it intends to do. This is the cheapest moment to catch mistakes. Fixing a wrong plan costs zero lines of code.",
      },
      {
        type: "subheading",
        text: "How to review the plan",
      },
      {
        type: "bullets",
        items: [
          "Are the right files listed? If the agent plans to edit a file it shouldn't touch, catch it now.",
          "Is the approach consistent with project patterns? If it plans to create something that already exists, redirect it.",
          "Is the scope right? If the plan includes improvements you didn't ask for, remove them.",
          "Is the order sensible? Data layer before UI? Types before implementation?",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The approval gate",
        text: "Never let the agent proceed past this step without your explicit approval. 'The plan looks good, go ahead' is the gate. This single habit prevents more wasted time than any other technique.",
      },
      {
        type: "subheading",
        text: "When the plan is wrong",
      },
      {
        type: "code",
        language: "text",
        code: "That plan has two problems:\n1. We already have a ConfirmDialog in src/components/ui/ — do not\n   create a new one. Reuse the existing component.\n2. The delete endpoint is DELETE /api/v2/accounts/:id, not\n   /api/users/:id. Check src/lib/api/accounts.ts.\n\nRevise the plan with these corrections. Do not implement yet.",
        caption: "Correcting a wrong plan",
      },
    ],
  },
  {
    number: 7,
    title: "Exercise: plan and correct",
    headline: "Exercise 3\n\nAsk for a plan.\nFind what is wrong.\nCorrect before coding.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: the Architecture step",
        text: "Using the same project from Exercise 2, pick a small task (add a field, rename a component, extract a utility). Ask the agent for a plan. Do NOT approve it blindly — review it critically.",
      },
      {
        type: "code",
        language: "text",
        code: "Based on your earlier inspection, propose a plan for\n[describe your small task]. Include:\n\n1. Which files you will create or modify\n2. The approach — what changes in each file\n3. Which existing components or patterns you will reuse\n4. What could go wrong or what you are unsure about\n5. The implementation order\n\nDo not write any code yet. Just the plan.",
        caption: "Architecture prompt — fill in your task",
      },
      {
        type: "subheading",
        text: "What to do with the plan",
      },
      {
        type: "bullets",
        items: [
          "Read every line. Does the agent plan to touch files it shouldn't?",
          "Does it plan to create something that already exists in the project?",
          "Does it plan to use the right patterns and utilities?",
          "Find at least one thing to correct — even if the plan is mostly right. Practise the correction flow.",
          "Only approve after corrections are acknowledged.",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "What you practised",
        text: "You reviewed a plan before any code was written. You found and corrected a mistake at the cheapest possible moment. Planning before coding is the most underused and most valuable part of working with agents.",
      },
    ],
  },
  {
    number: 8,
    title: "L + P — Loop and Patch",
    headline: "Steps 3+4: Loop & Patch\n\nOne slice at a time.\nSmall. Scoped. Reviewable.",
    sections: [
      {
        type: "paragraph",
        text: "Loop and Patch work together. Loop defines the slice — the smallest meaningful unit of work. Patch executes that slice. The discipline: implement one slice, verify it, then move to the next.",
      },
      {
        type: "subheading",
        text: "Why giant prompts fail",
      },
      {
        type: "bullets",
        items: [
          "Hard to review — you cannot read 400 lines and catch every problem",
          "Hard to test — if something is broken, you don't know which part caused it",
          "Hard to roll back — you cannot undo one part without losing the rest",
          "Full of assumptions — dozens of unchecked decisions",
        ],
      },
      {
        type: "subheading",
        text: "What makes a good Patch",
      },
      {
        type: "comparison",
        headers: ["Good patch", "Bad patch"],
        rows: [
          ["Changes 1-3 files", "Changes 10+ files"],
          ["Follows an existing pattern", "Invents a new pattern"],
          ["Diff readable in 2 minutes", "Diff requires 10+ minutes"],
          ["Does exactly what was asked", "Includes 'bonus' improvements"],
          ["Can be verified independently", "Only works combined with other changes"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The ideal slice size",
        text: "The ideal slice produces a diff you can read in under two minutes. If you need to scroll more than twice, the slice was too big.",
      },
    ],
  },
  {
    number: 9,
    title: "H — Harden: verify everything",
    headline: "Back-pressure\n\nTests. Typecheck. Lint.\nDiff. Every time.",
    sections: [
      {
        type: "paragraph",
        text: "Harden is the step that separates professional AI-assisted development from vibe-coding. After every Patch — every single one — you verify that the change is correct, safe, and consistent.",
      },
      {
        type: "subheading",
        text: "The Harden checklist",
      },
      {
        type: "bullets",
        items: [
          "TypeScript typecheck — does the code compile without type errors?",
          "Lint — does the code follow project conventions?",
          "Tests — do existing tests still pass? Do new tests exist?",
          "Build — does the production build succeed?",
          "Diff review — read the diff line by line. The most important check.",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The hard rule",
        text: "If typecheck fails, stop. If lint fails, fix it. If tests fail, diagnose. If the diff contains changes outside scope, revert them. Never carry errors forward into the next iteration.",
      },
    ],
  },
  {
    number: 10,
    title: "Exercise: the Ralph loop",
    headline: "Exercise 4\n\nOne task. The full loop.\nPrompt → Execute →\nTest → Tune.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: run a Ralph loop",
        text: "Pick a real, small task in your project — add a field, fix a display bug, extract a utility function, write a missing test. Write a PROMPT.md, run the agent, verify with tests, and tune the prompt based on what went wrong.",
      },
      {
        type: "subheading",
        text: "Step by step",
      },
      {
        type: "code",
        language: "text",
        code: "# PROMPT.md — A Ralph loop for [your task]\n\nStudy the codebase. Read [the relevant files].\nDo not assume anything is not implemented — search first.\n\nYour task: [describe the one thing to implement]\n\nConstraints:\n- Follow the patterns in AGENTS.md\n- Use existing components, do not add dependencies\n- After implementing, run tests for the changed code\n- If tests fail, fix them before finishing\n- Commit with a descriptive message\n\nDO NOT implement placeholders. Full implementation only.",
        caption: "The complete loop as prompts",
      },
      {
        type: "subheading",
        text: "Self-evaluation",
      },
      {
        type: "bullets",
        items: [
          "Did you skip any step? If you went straight to Patch, start over.",
          "Did you approve the plan before implementation started?",
          "Was the diff small enough to review in one pass?",
          "Did all checks pass (typecheck, lint, tests)?",
          "Did the agent change only what was in the approved plan?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The real skill",
        text: "The exercise is not about the code. It is about the discipline. If you followed all five steps and the result is correct, you have the workflow. You can now apply it to any task in any codebase.",
      },
    ],
  },
  {
    number: 11,
    title: "The feedback loop",
    headline: "The feedback loop\n\nAgent acts.\nTerminal responds.\nDeveloper decides.",
    sections: [
      {
        type: "paragraph",
        text: "The most powerful feature of AI coding agents — what separates them from chatbots — is that they can read terminal output. When the agent runs a command and it fails, it can see the error, reason about it, and try again. This is the feedback loop.",
      },
      {
        type: "subheading",
        text: "When the feedback loop breaks down",
      },
      {
        type: "comparison",
        headers: ["Pattern", "What to do"],
        rows: [
          ["Fixes one error but introduces another", "Stop. Explain the root cause."],
          ["Repeats the same failed fix 2-3 times", "Stop. Give more context or simplify."],
          ["Ignores an error and moves on", "Stop immediately. Always dangerous."],
          ["Tests pass but explanation doesn't match", "Review carefully. Tests may be wrong."],
          ["Starts changing files you didn't mention", "Stop. Scope creep is common here."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The two-attempt rule",
        text: "If the agent fails to fix an issue after two attempts, stop the automatic loop. Ask it to explain what it thinks is happening, provide additional context, and let it try again with better information.",
      },
    ],
  },
  {
    number: 12,
    title: "When to stop the agent",
    headline: "Stop when:\n\nScope drift. Repeated failure.\nInvented APIs. Ignored errors.",
    sections: [
      {
        type: "paragraph",
        text: "Knowing when to pull the cord is one of the highest-leverage skills in AI-assisted development. Stopping early is not failure — it is discipline.",
      },
      {
        type: "subheading",
        text: "The six stop signals",
      },
      {
        type: "bullets",
        items: [
          "Scope drift — editing files outside the agreed scope",
          "Repeated failure — same approach tried three times",
          "Invented APIs — calling functions or endpoints that do not exist",
          "Ignored errors — acknowledging but not fixing errors",
          "Uncontrolled growth — the diff grows without approval",
          "Confidence without evidence — 'this should work' without running checks",
        ],
      },
      {
        type: "code",
        language: "text",
        code: "Stop. Do not make any more changes.\n\n1. Show me the full diff of everything you changed\n2. Explain what you were trying to do and what went wrong\n3. List any assumptions you made that you are not sure about\n\nI will review and decide how to proceed.",
        caption: "The stop-and-reset prompt",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The escalation rule",
        text: "If you stop the agent twice on the same task, the task is too complex for the current context. Break it into smaller slices, add more context to AGENTS.md, or handle the complex part manually.",
      },
    ],
  },
  {
    number: 13,
    title: "The technique adapts to any task",
    headline: "Ralph adapts\n\nBug fix. Feature.\nRefactor. Tests. Review.",
    sections: [
      {
        type: "comparison",
        headers: ["Task type", "How the technique adapts"],
        rows: [
          ["Bug fix", "Recon reproduces the bug. Architecture proposes the fix. Single Patch. Harden includes a regression test."],
          ["New feature", "Recon maps the area. Architecture slices vertically. Multiple iterations. Harden after each slice."],
          ["Refactor", "Recon maps all usages. Architecture proposes migration. Patches are mechanical. Harden verifies no behaviour change."],
          ["Test coverage", "Recon reads untested code. Architecture lists cases. Each Patch adds one test. Harden runs the suite."],
          ["Code review fix", "Recon re-reads feedback. Architecture proposes fixes per finding. Patches address one finding each."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The Ralph guarantee",
        text: "Ralph does not guarantee perfect output. It's deterministically bad in an undeterministic world. But it guarantees that mistakes are caught by back-pressure (tests/build), every loop starts fresh, and the prompt gets tuned every time the agent misbehaves.",
      },
      {
        type: "quote",
        text: "while :; do cat PROMPT.md | claude-code; done\nOne task per loop. Specs as context. Tests as back-pressure.\nTune the prompt when Ralph misbehaves.",
      },
    ],
  },
  {
    number: 14,
    title: "Takeaway",
    headline: "Module 2 takeaway\n\nThe workflow is the skill.\nThe prompt is just the interface.",
    sections: [
      {
        type: "subheading",
        text: "What we covered",
      },
      {
        type: "bullets",
        items: [
          "Every task starts with context, then intent, then code — never the reverse",
          "Good prompts have four parts: what, why, constraints, and what-not",
          "The Ralph technique: while :; do cat PROMPT.md | claude-code; done — autonomous loops with back-pressure",
          "You experienced the difference between vibe-coding and controlled development",
          "You practised reading-before-writing, planning-before-coding, and a full Ralph loop on real code",
          "The feedback loop is powerful but must be monitored with the two-attempt rule",
          "Knowing when to stop is as important as knowing how to start",
        ],
      },
      {
        type: "subheading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text: "In Module 3, we move from individual workflow discipline to project-level infrastructure — AGENTS.md, rules, skills, and operating contracts. In Module 4, we combine everything to build a real application from scratch.",
      },
      {
        type: "quote",
        text: "The skill is not prompting.\nThe skill is the workflow.\nThe prompt is just how you communicate it.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The template to keep",
        text: "1. Read AGENTS.md. Read the relevant files. Explain.\n2. Propose a plan: files, approach, risks. Wait for approval.\n3. Implement one small slice.\n4. Run typecheck, lint, tests. Show me the diff.\n5. Repeat from step 3 until the task is complete.",
      },
    ],
  },
];

/* ─── Module 3 — Deep Dive ──────────────────────────────────────────────── */

const module3Slides: Slide[] = [
  {
    number: 1,
    title: "Why one-off prompting fails",
    headline: "Prompting is fragile\n\nSame project.\nDifferent session.\nDifferent result.",
    sections: [
      {
        type: "paragraph",
        text: "Every time you open a new session with an AI coding agent, the agent starts with zero knowledge of your project. It does not remember last session's work, your team's conventions, your architecture decisions, or the bugs you already fixed. The context window is empty.",
      },
      {
        type: "paragraph",
        text: "Without encoded context, you re-explain conventions in every prompt — and still get inconsistent results. On Monday the agent uses your design system correctly because you reminded it. On Tuesday a colleague uses the same agent and it creates a raw HTML button because nobody told it not to.",
      },
      {
        type: "subheading",
        text: "The three problems with prompt-only context",
      },
      {
        type: "bullets",
        items: [
          "Inconsistency — different developers give different context, so the agent produces different conventions in the same project",
          "Fragility — you forget to mention a rule, and the agent breaks it. You remember next time, but someone else forgets the session after.",
          "Repetition fatigue — by the fifth time you type 'use the existing Button component from src/components/ui/', you start skipping it. That's when mistakes happen.",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The fundamental insight",
        text: "The agent is not forgetful — it never had memory. The fix is not better prompts. The fix is to put the context in files. Files persist across sessions. Files are shared across team members. Files are version-controlled. Prompts are forgotten the moment the session ends.",
      },
      {
        type: "paragraph",
        text: "This module teaches you how to build a layered context system — from a simple AGENTS.md to a full set of rules, skills, and operating contracts — that makes every agent session start strong automatically.",
      },
    ],
  },
  {
    number: 2,
    title: "AGENTS.md — the foundation",
    headline: "AGENTS.md\n\nThe agent's onboarding document\nfor your project.",
    sections: [
      {
        type: "paragraph",
        text: "AGENTS.md is the single most important file for AI-assisted development. It is the first file the agent reads when it enters your project. Think of it as the onboarding document for a new team member who happens to be an AI.",
      },
      {
        type: "paragraph",
        text: "A human developer joining your team would need weeks to discover folder conventions, testing patterns, component libraries, and forbidden patterns. A good AGENTS.md encodes all of that in one file that the agent reads in seconds.",
      },
      {
        type: "subheading",
        text: "Where instruction files live",
      },
      {
        type: "comparison",
        headers: ["Tool", "Instruction file"],
        rows: [
          ["Claude Code", "CLAUDE.md in the repo root (or any parent directory)"],
          ["OpenCode", ".opencode/ directory with agents, commands, and instructions"],
          ["Codex", "AGENTS.md in the repo root + tool settings"],
          ["Atomica", "Project-level configuration in the harness"],
          ["Any tool", "AGENTS.md in the repo root — works as a universal convention"],
        ],
      },
      {
        type: "subheading",
        text: "The six sections every AGENTS.md needs",
      },
      {
        type: "bullets",
        items: [
          "Stack — exact framework versions, language, package manager. Not 'React' but 'React 19 with TypeScript 5.9 strict mode'.",
          "Commands — every command a developer needs: dev server, build, test, lint, typecheck, format. Include the exact command, not just the description.",
          "Architecture — folder structure with what lives where. Not the entire tree — just the decisions an agent would get wrong without help.",
          "Conventions — naming patterns, import order, component structure, state management approach. The things that differ from defaults.",
          "Rules — hard constraints: which components to use, which libraries are forbidden, what must always be tested, what must never be committed.",
          "Testing — test runner, test location convention, required coverage, how to run a single test file.",
        ],
      },
      {
        type: "code",
        language: "markdown",
        code: "# AGENTS.md\n\n## Stack\nNext.js 16 / React 19 / TypeScript 5.9 strict / Tailwind CSS v4\nVitest 4 + Testing Library / ESLint 9 flat config\nNode >= 22 / npm\n\n## Commands\n- `npm run dev` — dev server on port 3000\n- `npm run build` — production build (must pass before any PR)\n- `npm run test` — run full Vitest suite\n- `npm run test -- --run src/path/to/file.test.tsx` — run single test\n- `npm run typecheck` — tsc --noEmit\n- `npm run lint` — eslint (flat config, no .eslintrc)\n\n## Architecture\n- src/app/ — Next.js App Router (pages, layouts, loading states)\n- src/components/ui/ — design system primitives (Button, Card, Dialog)\n- src/components/sections/ — page-level composite sections\n- src/components/layout/ — shell components (Nav, Footer, Container)\n- src/hooks/ — shared custom hooks\n- src/lib/ — utilities (cn(), formatDate, api client)\n- src/data/ — static data and content\n- src/providers/ — React context providers (QueryProvider)\n\n## Conventions\n- 'use client' directive only on components that need browser APIs\n- Props defined as `type Props = { ... }` not `interface`\n- One component per file, named export matching filename\n- Import order: react → next → external → @/ aliases → relative\n\n## Rules\n- Use components from src/components/ui/ — never raw HTML buttons\n- Use cn() from src/lib/utils.ts for all className merging\n- All decorative elements must have aria-hidden='true'\n- Interactive elements must be <button> or <a>, never <div onClick>\n- Do not add npm dependencies without asking first\n- Do not edit files outside the scope of the current task\n- Do not use any or type assertions unless unavoidable\n\n## Testing\n- Co-locate test files: Component.test.tsx next to Component.tsx\n- Use @testing-library/react: prefer getByRole over getByTestId\n- Every new component must have at least one test\n- Run affected tests after every change, full suite before PR",
        caption: "A complete, production-quality AGENTS.md",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The quality bar",
        text: "A good AGENTS.md passes this test: if a competent developer read only this file and nothing else, could they make a correct first contribution to the project? If yes, your AGENTS.md is good enough. If they would still get the folder structure, component library, or testing setup wrong — add more.",
      },
    ],
  },
  {
    number: 3,
    title: "Exercise: write your AGENTS.md",
    headline: "Exercise 1\n\nWrite AGENTS.md\nfor a project you work on.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: create your first AGENTS.md",
        text: "Pick a project you actively work on. Write an AGENTS.md from scratch. Use the six-section template from the previous slide.",
      },
      {
        type: "subheading",
        text: "How to do it",
      },
      {
        type: "code",
        language: "text",
        code: "Read the project's package.json, tsconfig.json, and build/test\nconfiguration files.\n\nThen help me write an AGENTS.md that covers:\n1. Stack — exact versions from package.json\n2. Commands — extracted from the scripts section\n3. Architecture — folder structure (read src/ directory)\n4. Conventions — observed from 2-3 existing components\n5. Rules — common mistakes I want to prevent\n6. Testing — runner, location pattern, how to run one test\n\nDo not guess. Base everything on what you read in the project files.",
        caption: "Use the agent to help draft it",
      },
      {
        type: "subheading",
        text: "Validation",
      },
      {
        type: "bullets",
        items: [
          "Is every command accurate? Run each one and verify it works.",
          "Is the architecture section correct? Check against the actual folder structure.",
          "Are the conventions real? Compare against 2-3 existing files.",
          "Would a new team member get the basics right from this file alone?",
          "Is anything missing that you know from experience but a newcomer would not?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The compound effect",
        text: "Writing AGENTS.md takes 30-60 minutes. It saves 5-10 minutes per agent session by preventing wrong assumptions. After 10 sessions, you have saved more time than you invested. After 50 sessions, the ROI is enormous.",
      },
    ],
  },
  {
    number: 4,
    title: "Project rules — protecting conventions",
    headline: "Project rules\n\nThe guardrails that prevent\nlocally-right, globally-wrong decisions.",
    sections: [
      {
        type: "paragraph",
        text: "AGENTS.md describes the project. Rules protect the project. A rule is a specific constraint that prevents the agent from making a choice that looks reasonable in isolation but violates a team convention.",
      },
      {
        type: "paragraph",
        text: "Without rules, the agent will make locally-reasonable decisions: create a new utility function instead of using the existing one, add a CSS file instead of using Tailwind, use fetch instead of the project's API client, create a div with onClick instead of a button. Each decision makes sense on its own. Each is wrong for this project.",
      },
      {
        type: "subheading",
        text: "Categories of rules",
      },
      {
        type: "comparison",
        headers: ["Category", "Example rules"],
        rows: [
          ["Component patterns", "Always use Button from src/components/ui/Button — never create a raw <button> element. New components must follow the Props type pattern, not interface."],
          ["Styling", "Use Tailwind utility classes only. Never create .css or .module.css files. Use cn() for conditional classes."],
          ["API layer", "All API calls go through the api client in src/lib/api/. Never use raw fetch. Always type the response."],
          ["Testing", "Co-locate tests as ComponentName.test.tsx. Use getByRole over getByTestId. Mock API calls, never hit real endpoints."],
          ["Accessibility", "Interactive elements must be <button> or <a>, never <div onClick>. All decorative images must have aria-hidden='true'. Modals need focus trap and Escape key support."],
          ["Dependencies", "Do not add npm packages without explicit approval. Check if the project already has a utility before importing a new one."],
          ["File organisation", "One component per file. Named export matching filename. Index files only for barrel re-exports in src/components/ui/."],
        ],
      },
      {
        type: "subheading",
        text: "What makes a good rule",
      },
      {
        type: "paragraph",
        text: "Good rules share three properties:",
      },
      {
        type: "bullets",
        items: [
          "Specific — 'Use Button from src/components/ui/Button.tsx' not 'use the design system'",
          "Verifiable — you can check whether the rule was followed by reading the diff",
          "Actionable — the agent knows exactly what to do differently. Not 'follow best practices' but 'prefer getByRole over getByTestId in tests'",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The anti-pattern",
        text: "Bad rules: 'Write clean code.' 'Follow best practices.' 'Make it accessible.' These are wishes, not rules. The agent cannot act on them because they have no testable definition. Every rule should be specific enough that you could write an automated check for it.",
      },
    ],
  },
  {
    number: 5,
    title: "Exercise: write rules for your project",
    headline: "Exercise 2\n\nWrite 10 rules\nfor a project you know.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: extract project rules",
        text: "Using the project from Exercise 1, write 10 specific rules. Start by thinking about every mistake a new developer (or an agent) would make in their first week.",
      },
      {
        type: "code",
        language: "text",
        code: "Read the existing components in src/components/ and the test files\nin the project.\n\nHelp me write 10 project rules by identifying:\n1. Which UI components should always be used (vs raw HTML)\n2. How styling is done (CSS modules, Tailwind, styled-components?)\n3. How API calls are made (fetch, axios, internal client?)\n4. How tests are structured (location, naming, query patterns)\n5. What patterns are used that differ from framework defaults\n\nFor each rule, make it:\n- Specific (name exact files or patterns)\n- Verifiable (I can check it in a diff)\n- Actionable (the agent knows what to do)",
        caption: "Use the agent to discover rules from existing code",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The best source of rules",
        text: "The best rules come from real mistakes. Think about the last five code review comments you gave or received. Each one is probably a rule waiting to be written. 'We always do X, not Y' is a rule. Write it down.",
      },
    ],
  },
  {
    number: 6,
    title: "Skills — reusable task recipes",
    headline: "Skills\n\nReusable agent capabilities\nfor specific task types.",
    sections: [
      {
        type: "paragraph",
        text: "A skill is a focused instruction file for a specific category of task. It tells the agent not just what to do, but how to do it — step by step, with the exact patterns, files, and conventions for this project. Skills are loaded on demand when the agent starts a task that matches.",
      },
      {
        type: "paragraph",
        text: "If AGENTS.md is the onboarding document, skills are the specialised SOPs. A new team member reads the onboarding doc on day one. They read the SOP for 'how to create a component' on day three, when they actually need to create one.",
      },
      {
        type: "subheading",
        text: "Anatomy of a skill file",
      },
      {
        type: "paragraph",
        text: "Every skill has the same structure:",
      },
      {
        type: "bullets",
        items: [
          "When to use — trigger conditions. 'Load this skill when creating a new component under src/components/'",
          "Procedure — step-by-step instructions. Read before writing → locate placement → follow file structure → apply template → write tests",
          "Conventions — project-specific patterns to follow. Import order, prop types, naming, file locations.",
          "Anti-patterns — common mistakes to avoid. 'Do not use styled-components for new code — use Tailwind.'",
          "Examples — snippets from the actual codebase showing the correct pattern.",
        ],
      },
      {
        type: "code",
        language: "markdown",
        code: "# react-component skill\n\n## When to use\nLoad this skill when:\n- Creating a new component under src/components/\n- Modifying an existing component's props or structure\n- Extracting a repeated UI pattern into a reusable component\n\n## Procedure\n\n### 1. Read before writing\n- Read the component's current file (if it exists)\n- Read at least one sibling component for naming/structure conventions\n- Check src/components/ui/ for an existing component that solves the need\n\n### 2. File structure\n```\nComponentName/\n  ComponentName.tsx    — the component\n  ComponentName.test.tsx — co-located test\n  index.ts             — re-export (optional)\n```\n\n### 3. Component template\n```tsx\nimport type { ReactNode } from 'react';\nimport { cn } from '@/lib/utils';\n\ntype Props = {\n  children?: ReactNode;\n  className?: string;\n};\n\nexport function ComponentName({ children, className }: Props) {\n  return (\n    <div className={cn('base-classes', className)}>\n      {children}\n    </div>\n  );\n}\n```\n\n### 4. Anti-patterns\n- Do not use `interface` for props — use `type`\n- Do not use default exports — use named exports\n- Do not create inline styles — use Tailwind classes\n- Do not skip the test file",
        caption: "A real react-component skill",
      },
      {
        type: "subheading",
        text: "Common skills worth creating",
      },
      {
        type: "bullets",
        items: [
          "react-component — how to create/modify components in this project",
          "testing — how to write tests with your specific runner and patterns",
          "api-client — how to add API calls using your project's HTTP client",
          "accessibility — how to audit and fix a11y issues with your component library",
          "performance — how to diagnose render cost, bundle size, lazy loading",
          "refactor — how to safely rename, extract, or restructure code",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Skills compound over time",
        text: "Every time the agent does a task well, extract the pattern into a skill. Every time it does a task poorly, add the mistake to the skill's anti-patterns. Skills get better with every use. After a month, your project's skill library encodes the collective wisdom of every task the team has done.",
      },
    ],
  },
  {
    number: 7,
    title: "Exercise: write a skill",
    headline: "Exercise 3\n\nWrite a skill for the most\ncommon task in your project.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: create your first skill",
        text: "Pick the most common task type in your project (creating a component, writing a test, adding an API call). Write a skill file for it.",
      },
      {
        type: "code",
        language: "text",
        code: "Read 3 existing [components/tests/API files] in the project.\n\nIdentify the common patterns:\n- File naming and location\n- Import structure and order\n- Code structure and template\n- Testing approach\n- Common mistakes or anti-patterns\n\nHelp me write a skill file with:\n1. When to use (trigger conditions)\n2. Step-by-step procedure\n3. Code template based on real examples\n4. Anti-patterns to avoid\n\nBase everything on what you observe in the existing code,\nnot on generic best practices.",
        caption: "Extract a skill from existing code",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The extraction principle",
        text: "Good skills are extracted, not invented. Read three real examples from your codebase. Find the common pattern. Encode that pattern as the skill. If the examples disagree, pick the one that represents the team's current best practice and document why.",
      },
    ],
  },
  {
    number: 8,
    title: "Operating contracts — the hard rules",
    headline: "Operating contracts\n\nHard rules the agent\nmust never break.",
    sections: [
      {
        type: "paragraph",
        text: "An operating contract is different from a rule. Rules say 'prefer X over Y'. Contracts say 'never do Z, under any circumstances'. They are the floor — the minimum safety guarantees that ensure the agent does not cause damage, even when instructions are incomplete.",
      },
      {
        type: "subheading",
        text: "The five essential contracts",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Contract 1: Never edit before inspecting",
        text: "The agent must read and explain relevant files before making any change. This is the read-before-write principle — a hard constraint. No exceptions, no shortcuts. In Ralph terms: 'don't assume it's not implemented — search the codebase first.'",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Contract 2: Never invent APIs",
        text: "The agent must not call functions, endpoints, or components that do not exist in the codebase. If it is unsure whether something exists, it must check first. Hallucinated code is the most common source of time-wasting bugs.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Contract 3: Never bypass failing tests",
        text: "If tests fail after a change, the agent must fix the issue or stop. It must not delete tests, skip them, or mark them as expected failures without explicit approval. Passing tests are the proof that the change is correct.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Contract 4: Never add dependencies without asking",
        text: "The agent must not run npm install or add packages to package.json without explicit developer approval. Every dependency is a long-term maintenance commitment that the developer must evaluate.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Contract 5: Always summarise changes",
        text: "After every implementation, the agent must list the files it changed, what it changed in each file, and why. This is the minimum documentation for safe diff review.",
      },
      {
        type: "paragraph",
        text: "These five contracts are not suggestions. They are the floor that ensures safe agent behaviour in any professional codebase. A team can add more contracts, but should never have fewer than these.",
      },
    ],
  },
  {
    number: 9,
    title: "Exercise: define your contracts",
    headline: "Exercise 4\n\nWrite your operating contracts.\nThe rules that never bend.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: define your project's contracts",
        text: "Start with the five essential contracts and adapt them to your project. Then add any project-specific contracts that address risks unique to your codebase.",
      },
      {
        type: "subheading",
        text: "How to find project-specific contracts",
      },
      {
        type: "paragraph",
        text: "Think about the worst mistakes that could happen in your project:",
      },
      {
        type: "bullets",
        items: [
          "Are there files that should never be auto-edited? (config files, migration files, generated code)",
          "Are there environment-specific constraints? (never commit .env values, never modify production configs)",
          "Are there security patterns that must be followed? (never store tokens in code, always sanitise user input)",
          "Are there data patterns? (never delete records, always soft-delete; never change schema without migration)",
          "Are there deployment constraints? (never modify CI config, never change build scripts without review)",
        ],
      },
      {
        type: "code",
        language: "markdown",
        code: "## Operating Contracts\n\n### Universal (always apply)\n- Never edit before inspecting relevant files\n- Never invent APIs, endpoints, or components that don't exist\n- Never bypass failing tests\n- Never add npm dependencies without asking\n- Always summarise files changed after implementation\n\n### Project-specific\n- Never modify files in src/generated/ — they are auto-generated\n- Never commit .env or .env.local files\n- Never use raw SQL — always use the ORM query builder\n- Never store sensitive data in localStorage\n- Never disable TypeScript strict checks",
        caption: "Example: universal + project-specific contracts",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Contracts vs rules",
        text: "Rules are 'prefer X over Y' — the agent should follow them but can deviate with good reason. Contracts are 'never do Z' — the agent must follow them with zero exceptions. If you find the agent repeatedly violating a rule, promote it to a contract.",
      },
    ],
  },
  {
    number: 10,
    title: "The instruction file hierarchy",
    headline: "Three levels\n\nGlobal → Project → Task",
    sections: [
      {
        type: "paragraph",
        text: "Instructions come from three levels. Understanding which level to use prevents confusion about which rules apply where and when.",
      },
      {
        type: "subheading",
        text: "The three levels",
      },
      {
        type: "comparison",
        headers: ["Level", "Where it lives and what it does"],
        rows: [
          ["Global", "Set once in your AI tool's global config (e.g. ~/.claude/CLAUDE.md, ~/.config/opencode/). Applies to every project. Use for universal preferences: coding style, response format, safety defaults."],
          ["Project", "AGENTS.md in the repo root (or .opencode/, .claude/, .cursorrules). Applies to every task in this project. Use for stack, architecture, rules, skills, contracts."],
          ["Task", "Inline in the prompt for the current task. Overrides global and project for this task only. Use for one-off constraints: 'do not touch the API layer', 'only modify this one file'."],
        ],
      },
      {
        type: "subheading",
        text: "How they cascade",
      },
      {
        type: "paragraph",
        text: "Task-level instructions override project-level, which override global. This means you can set safe defaults globally, encode project conventions at the project level, and add one-off constraints at the task level without touching the other files.",
      },
      {
        type: "code",
        language: "text",
        code: "Global (all projects):\n  → Always run typecheck before considering a task done\n  → Never commit secrets or API keys\n  → Always explain before editing\n\nProject (this repo):\n  → Use Tailwind CSS, never create CSS files\n  → Use Button from src/components/ui/Button.tsx\n  → Tests use Vitest + Testing Library\n\nTask (this prompt):\n  → Only modify src/components/sections/HeroSection.tsx\n  → Do not change the data model\n  → Keep the diff under 50 lines",
        caption: "How three levels work together",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Where most value lives",
        text: "80% of the value is in the project level. Global instructions are useful but generic. Task instructions are specific but ephemeral. The project-level AGENTS.md + rules + skills + contracts is where the compounding investment happens.",
      },
    ],
  },
  {
    number: 11,
    title: "What good instructions look like",
    headline: "Good instructions\n\nSpecific. Verifiable.\nActionable.",
    sections: [
      {
        type: "paragraph",
        text: "The difference between vague and specific instructions is the difference between inconsistent and reliable results. The agent can only follow instructions that are unambiguous enough to act on.",
      },
      {
        type: "subheading",
        text: "Side-by-side comparison",
      },
      {
        type: "comparison",
        headers: ["Vague instruction", "Specific instruction"],
        rows: [
          ["Follow best practices", "Use named exports. Define props as type, not interface. One component per file."],
          ["Write clean code", "Max function length: 40 lines. Extract repeated logic into hooks. No any type."],
          ["Make it accessible", "Interactive elements must be <button> or <a>. Decorative images must have aria-hidden='true'. Modals need focus trap."],
          ["Write tests", "Every component must have a .test.tsx file. Use getByRole as the primary query. Test user-visible behaviour, not implementation."],
          ["Use the design system", "Import Button, Card, and Dialog from src/components/ui/. Never create raw <button> or <input> elements."],
          ["Handle errors properly", "API calls must use try/catch. Display errors with the ErrorBanner component. Log errors with console.error including the endpoint URL."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The specificity test",
        text: "For every instruction, ask: 'Could I write an automated lint rule that checks this?' If yes, the instruction is specific enough. If not, it is too vague for the agent to follow reliably.",
      },
      {
        type: "subheading",
        text: "Anti-patterns in instructions",
      },
      {
        type: "bullets",
        items: [
          "Aspirational statements — 'strive for excellence' is not an instruction",
          "Ambiguous references — 'use the right component' — which one?",
          "Unbounded scope — 'improve the code quality' has no definition of done",
          "Conflicting rules — 'keep files small' vs 'keep related code together' without guidance on when each applies",
          "Stale instructions — rules that reference files or patterns that no longer exist in the project",
        ],
      },
    ],
  },
  {
    number: 12,
    title: "Layering project context",
    headline: "Five layers\n\nEach layer makes every\nfuture session better.",
    sections: [
      {
        type: "paragraph",
        text: "Project instrumentation is not a single file — it is a stack. Each layer builds on the previous. You don't need to build all five on day one. Start at Layer 1 and add layers as your team and project mature.",
      },
      {
        type: "subheading",
        text: "The five layers",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Layer 1: AGENTS.md — 30 minutes to set up",
        text: "Stack, commands, architecture, conventions. The foundation that every project should have from day one. You built this in Exercise 1.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Layer 2: Project Rules — 1 day to extract",
        text: "Specific constraints for components, styling, API calls, testing, accessibility, dependencies. You built these in Exercise 2.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Layer 3: Skills — 1-2 days for the first three",
        text: "Reusable task recipes for common work: creating components, writing tests, adding API calls. You built one in Exercise 3. Add more as new task types arise.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Layer 4: Operating Contracts — 1 hour",
        text: "The five essential contracts plus project-specific hard rules. The safety floor. You built these in Exercise 4.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Layer 5: Continuous Learning — ongoing",
        text: "The project captures patterns from successful sessions and failures. New rules are extracted from code review comments. New skill anti-patterns are added from mistakes. The stack gets smarter with every task the team completes.",
      },
      {
        type: "paragraph",
        text: "The investment compounds. Layer 1 takes 30 minutes and saves 5 minutes per session. By the time you have all five layers, every agent session starts at the level of your best developer — automatically, consistently, without repeating yourself.",
      },
    ],
  },
  {
    number: 13,
    title: "MCP — connecting agents to external systems",
    headline: "MCP\n\nModel Context Protocol.\nThe agent's hands\nbeyond the codebase.",
    sections: [
      {
        type: "paragraph",
        text: "So far, everything we have discussed — AGENTS.md, rules, skills, contracts — lives inside the codebase. The agent reads local files, runs local commands, and produces local changes. But in an enterprise, critical context lives outside the codebase: in issue trackers, Wikis, CI systems, design tools, and documentation platforms.",
      },
      {
        type: "paragraph",
        text: "MCP (Model Context Protocol) is the bridge. It is a standardised protocol that lets AI coding agents call external tools — query Azure DevOps work items, read Wiki pages, check CI build status, fetch Figma design tokens, inspect database schemas, or interact with any system that exposes an MCP server.",
      },
      {
        type: "subheading",
        text: "What MCP actually is",
      },
      {
        type: "quote",
        text: "MCP = a protocol that lets the agent call external tools through a standardised interface, the same way it calls local tools like 'read file' or 'run terminal command'.",
      },
      {
        type: "paragraph",
        text: "Without MCP, the agent can only work with what is in your project folder and your terminal. With MCP, it can reach into the systems your team actually uses — pull ticket details, read documentation, check deployment status — all without you manually copying information into prompts.",
      },
      {
        type: "subheading",
        text: "Local tools vs MCP tools",
      },
      {
        type: "comparison",
        headers: ["Local tools (built-in)", "MCP tools (external)"],
        rows: [
          ["Read and write files in the project", "Query issue trackers (ADO, GitHub, Jira)"],
          ["Run terminal commands (tests, build, lint)", "Read Wiki and documentation pages"],
          ["Search code with grep/ripgrep", "Check CI/CD build and deployment status"],
          ["Open browser for web inspection", "Fetch design tokens from Figma"],
          ["Work out of the box, no configuration", "Require server setup, authentication, and approval"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The key principle",
        text: "Local tools are for working inside the codebase. MCP tools are for pulling context from outside the codebase. Use local tools for implementation. Use MCP when the agent needs information that lives in another system.",
      },
    ],
  },
  {
    number: 14,
    title: "MCP in practice — servers, auth, and configuration",
    headline: "MCP deep dive\n\nServers. Authentication.\nProject configuration.",
    sections: [
      {
        type: "paragraph",
        text: "MCP works through servers. Each external system has an MCP server that translates the agent's requests into API calls. The agent does not talk directly to Azure DevOps or GitHub — it talks to the MCP server, which handles authentication, rate limiting, and data formatting.",
      },
      {
        type: "subheading",
        text: "Common MCP servers in enterprise",
      },
      {
        type: "bullets",
        items: [
          "Azure DevOps — read and create work items, read Wiki pages, check PR status, inspect build results, read repository metadata. The most common enterprise MCP server.",
          "GitHub — read issues, PRs, actions workflows, repository content. Used when the team's code or issues live on GitHub.",
          "Figma — fetch design tokens, component properties, and style values. Useful when the agent needs to match design specs.",
          "PostgreSQL / databases — inspect schema, read table structures, check migrations. Used when the agent needs to understand the data layer.",
          "Documentation sites — fetch API documentation, internal knowledge bases, architecture decision records. Used when specs live outside the repo.",
          "Custom internal APIs — any internal system can expose an MCP server. Your platform team can create servers for proprietary tools.",
        ],
      },
      {
        type: "subheading",
        text: "How MCP is configured",
      },
      {
        type: "paragraph",
        text: "MCP servers are configured per-project, not globally. This means each project controls which external systems its agents can access. The configuration lives in the tool's project config file:",
      },
      {
        type: "code",
        language: "json",
        code: "// opencode.json — MCP configuration example\n{\n  \"mcp\": {\n    \"azure-devops\": {\n      \"type\": \"local\",\n      \"command\": [\n        \"npx\", \"-y\", \"@azure-devops/mcp\",\n        \"your-org\",\n        \"--authentication\", \"azcli\"\n      ],\n      \"enabled\": true\n    }\n  }\n}",
        caption: "Example: Azure DevOps MCP server configuration",
      },
      {
        type: "subheading",
        text: "Authentication patterns",
      },
      {
        type: "comparison",
        headers: ["Auth method", "When to use"],
        rows: [
          ["Azure CLI (azcli)", "Enterprise Azure DevOps. Uses your existing az login session. Most secure — no tokens in config files."],
          ["Personal Access Token (PAT)", "GitHub, Azure DevOps when CLI auth is not available. Token stored in environment variable — never in code."],
          ["OAuth", "Figma and web-based services. Browser-based login flow. Token refreshed automatically."],
          ["API Key", "Custom internal APIs. Key stored in environment variable. Rotate regularly."],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Security rule",
        text: "MCP authentication tokens and API keys must never be stored in project files, AGENTS.md, or version control. Use environment variables or your OS credential store. If a token appears in a commit, rotate it immediately.",
      },
      {
        type: "subheading",
        text: "What happens when MCP is not available",
      },
      {
        type: "paragraph",
        text: "MCP is optional. If a server is not configured or authentication fails, the agent falls back to local tools. The task does not fail — the agent just cannot access external context. You can always provide external context manually (paste ticket details, describe the requirement) as a fallback.",
      },
    ],
  },
  {
    number: 15,
    title: "MCP — when to use and when not to",
    headline: "MCP decision guide\n\nNot every task\nneeds external context.",
    sections: [
      {
        type: "paragraph",
        text: "MCP is powerful, but it is not needed for every task. Most agent loops work perfectly with local tools alone. MCP adds value in specific situations where the agent needs information that is not in the codebase.",
      },
      {
        type: "subheading",
        text: "Use MCP when",
      },
      {
        type: "bullets",
        items: [
          "The task references a specific ticket or user story — 'implement US-1234' requires reading the work item acceptance criteria",
          "The agent needs to check deployment status — 'is this fix deployed to QA?' requires CI/CD pipeline data",
          "The implementation must match a design spec — Figma MCP lets the agent read actual design tokens instead of you describing colours and spacing",
          "The agent needs to understand an API contract — documentation MCP lets it read the real API docs instead of guessing",
          "The agent needs to create or update work items — linking PRs to tickets, updating status, recording evidence",
          "Code review needs ticket context — 'does this PR address all acceptance criteria from US-1234?'",
        ],
      },
      {
        type: "subheading",
        text: "Do NOT use MCP when",
      },
      {
        type: "bullets",
        items: [
          "The task is purely local — creating a component, writing a test, fixing a type error. Local tools are faster.",
          "You can provide the context in 2-3 sentences — pasting a requirement into the prompt is faster than configuring an MCP server.",
          "The MCP server is not approved by your platform team — do not set up unauthorised connections to production systems.",
          "The agent is in Recon mode — reading local code does not need external context. Add MCP after Recon if the plan requires external data.",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The MCP principle",
        text: "Master the agent loop with local tools first. Add MCP connections when you repeatedly find yourself manually copying ticket details, design specs, or deployment status into prompts. MCP automates the context transfer that you are doing manually.",
      },
      {
        type: "subheading",
        text: "The tool ecosystem",
      },
      {
        type: "paragraph",
        text: "Beyond MCP, agents can connect to tools in other ways depending on the harness:",
      },
      {
        type: "comparison",
        headers: ["Connection type", "Examples"],
        rows: [
          ["Built-in tools", "File read/write, terminal, code search — always available in every agent"],
          ["MCP servers", "Azure DevOps, GitHub, Figma, databases — configured per-project, standardised protocol"],
          ["Browser automation", "Playwright, Puppeteer — for web scraping, visual testing, or interacting with web UIs"],
          ["Custom scripts", "Shell scripts the agent can call — for codegen, migrations, data transformation"],
          ["Atomica integrations", "Internal harness connections — configured by your organisation, may include proprietary tools"],
        ],
      },
    ],
  },
  {
    number: 16,
    title: "Exercise: plan your MCP setup",
    headline: "Exercise 6\n\nMap which external systems\nyour project needs.\nPlan the MCP configuration.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: MCP planning",
        text: "You will not configure MCP servers in this exercise (that requires platform team approval). Instead, you will map which external systems your project depends on and plan which MCP connections would add the most value.",
      },
      {
        type: "subheading",
        text: "Step 1: map your external context sources",
      },
      {
        type: "code",
        language: "text",
        code: "Think about your current project. List every external system\nwhere important context lives:\n\n1. Where are your tickets/user stories? (ADO, GitHub, Jira?)\n2. Where is your documentation/Wiki?\n3. Where are your design specs? (Figma, Sketch, Zeplin?)\n4. Where is your API documentation?\n5. Where is your CI/CD pipeline? (ADO Pipelines, GitHub Actions?)\n6. Any other internal systems with context the agent would need?",
        caption: "Map your external context",
      },
      {
        type: "subheading",
        text: "Step 2: prioritise by frequency",
      },
      {
        type: "paragraph",
        text: "For each system you listed, ask: 'How often do I manually copy information from this system into an agent prompt?' The systems you copy from most frequently are the highest-priority MCP connections.",
      },
      {
        type: "subheading",
        text: "Step 3: check with your platform team",
      },
      {
        type: "bullets",
        items: [
          "Which MCP servers are already approved and available?",
          "What is the process to request a new MCP server?",
          "What authentication method is required (Azure CLI, PAT, OAuth)?",
          "Are there any data classification restrictions on what the agent can access?",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Start with one",
        text: "Do not try to connect every system at once. Pick the one where you copy context most frequently — usually the issue tracker (Azure DevOps or GitHub). Get that working. Then add more MCP connections as needed. One well-configured MCP server is worth more than five half-configured ones.",
      },
    ],
  },
  {
    number: 17,
    title: "Exercise: audit your context stack",
    headline: "Exercise 7\n\nAudit your project.\nWhat is missing?\nWhat is stale?",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: project context audit",
        text: "Review the AGENTS.md, rules, skill, and contracts you created in Exercises 1-4. Ask the agent to audit them against the actual codebase.",
      },
      {
        type: "code",
        language: "text",
        code: "Read AGENTS.md and compare it against:\n1. package.json — are the stack versions accurate?\n2. The scripts section — are all commands listed?\n3. src/ directory — does the architecture section match reality?\n4. 3 existing components — do the conventions match?\n5. 3 existing tests — does the testing section match?\n\nReport:\n- Anything in AGENTS.md that is incorrect or outdated\n- Anything in the codebase that is not covered by AGENTS.md\n- Any rules that are contradicted by existing code\n- Any skills that describe a pattern not actually used",
        caption: "Project context audit prompt",
      },
      {
        type: "subheading",
        text: "The maintenance insight",
      },
      {
        type: "paragraph",
        text: "Context files are only valuable if they are accurate. An AGENTS.md that describes the wrong stack version or lists a non-existent folder is worse than no AGENTS.md — it will actively mislead the agent. Schedule a 15-minute audit every sprint.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Stale context is dangerous context",
        text: "When a refactor changes the folder structure but nobody updates AGENTS.md, the agent will create files in the old location. When a library is replaced but the skill still references the old one, the agent will use the deprecated pattern. Treat context files like code — they need maintenance.",
      },
    ],
  },
  {
    number: 18,
    title: "Putting it all together",
    headline: "The instrumented project\n\nRules + Skills + Contracts\n+ MCP + Ralph = reliable agents.",
    sections: [
      {
        type: "paragraph",
        text: "A well-instrumented project has five things working together:",
      },
      {
        type: "bullets",
        items: [
          "An AGENTS.md that describes the stack, commands, architecture, and conventions — so the agent starts every session with the right context",
          "Project rules that protect conventions — so the agent makes choices consistent with the team's patterns",
          "Skills for common task types — so the agent follows proven recipes instead of improvising",
          "Operating contracts that define hard boundaries — so the agent cannot cause damage even when instructions are incomplete",
          "MCP connections to external systems — so the agent can access ticket details, design specs, and deployment status without you copying context manually",
        ],
      },
      {
        type: "paragraph",
        text: "Combined with the Ralph technique from Module 2, this creates a system where every agent loop starts strong, stays controlled, and produces results that match what a senior developer on the team would produce — because the agent has access to the same knowledge, both inside and outside the codebase.",
      },
      {
        type: "subheading",
        text: "What we covered",
      },
      {
        type: "bullets",
        items: [
          "One-off prompting is fragile — context belongs in files, not in prompts",
          "AGENTS.md is the foundation — stack, commands, architecture, conventions, rules, testing",
          "Rules protect conventions — specific, verifiable, actionable constraints",
          "Skills encode recipes — step-by-step procedures for common task types",
          "Contracts define hard limits — never-break rules that ensure safety",
          "The hierarchy is Global → Project → Task — 80% of value is at the project level",
          "Project context has layers — start with AGENTS.md and add skills, rules, contracts as needed",
          "MCP connects agents to external systems — issue trackers, Wikis, CI, design tools",
          "Context files need maintenance — stale context is dangerous context",
        ],
      },
      {
        type: "subheading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text: "In Module 4, you combine everything — the mental model from Module 1, the Ralph technique from Module 2, and the project instrumentation from this module — to build a complete application from scratch with an AI agent. That is where all three modules converge into a single, practical proof.",
      },
      {
        type: "quote",
        text: "The gap between good and great AI-assisted development\nis mostly about how well the project is instrumented for agents.\nOne-off prompting is where everyone starts.\nEncoded context is where professionals operate.",
      },
    ],
  },
];

/* ─── Module 4 — Capstone: Build the Course Site ────────────────────────── */

const module4Slides: Slide[] = [
  {
    number: 1,
    title: "The capstone project",
    headline: "Build this site\n\nEverything you learned.\nOne real project.",
    sections: [
      {
        type: "paragraph",
        text: "You are looking at the finished product. In this module, you will build it from scratch — using the mental model from Module 1, the Ralph technique from Module 2, and the project instrumentation from Module 3.",
      },
      {
        type: "paragraph",
        text: "This is a meta-exercise. You build the course website you are reading. You can see what the output should look like. This removes ambiguity and lets you focus entirely on applying the workflow, not on figuring out what to build.",
      },
      {
        type: "subheading",
        text: "The tech stack",
      },
      {
        type: "bullets",
        items: [
          "Next.js 16 — App Router, server and client components",
          "React 19 — hooks, state, refs",
          "TypeScript — strict mode",
          "Tailwind CSS v4 — utility-first styling",
          "TanStack Query — client-side data management",
          "lucide-react — icons",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The capstone rule",
        text: "Every exercise in this module uses the Ralph technique. No shortcuts. No vibe-coding. This is where you prove to yourself that the technique works on a real, multi-component, production-quality build.",
      },
    ],
  },
  {
    number: 2,
    title: "Exercise: write AGENTS.md first",
    headline: "Exercise 1\n\nBefore any code.\nWrite the AGENTS.md.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: instrument the project before building",
        text: "Before writing a single component, create the AGENTS.md that will guide the agent through every task. Apply everything from Module 3.",
      },
      {
        type: "code",
        language: "text",
        code: "Create an AGENTS.md for this project with:\n\n## Stack\nNext.js 16 / React 19 / TypeScript / Tailwind CSS v4\nTanStack Query / lucide-react / clsx + tailwind-merge\n\n## Commands\n- npm run dev, npm run build, npm run lint\n\n## Architecture\n- src/app/ — App Router pages and layout\n- src/components/layout/ — Container, Nav, Footer\n- src/components/sections/ — page-level sections\n- src/data/ — static course data\n- src/lib/ — utilities (cn() helper)\n- src/providers/ — React context providers\n\n## Design tokens\n- Background: #080808, Surface: #0f0f0f\n- Text primary: #ededed, Secondary: #a0a0a0, Muted: #878787\n- Accent: #de3163, Borders: #2e2e2e\n- Fonts: Geist Sans (headings/body), Geist Mono (labels/code)\n\n## Rules\n- Dark theme only — no light mode\n- Use cn() from src/lib/utils.ts for all className merging\n- All decorative elements must have aria-hidden='true'\n- Do not add npm dependencies without asking\n- Do not edit files outside the current task scope",
        caption: "Your first task: write AGENTS.md",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why this is Exercise 1",
        text: "In Module 3, you learned that context belongs in files, not prompts. This is that principle in action. Every subsequent exercise benefits from this file — the agent reads it automatically and starts every task with the right conventions.",
      },
    ],
  },
  {
    number: 3,
    title: "Exercise: scaffold and configure",
    headline: "Exercise 2\n\nScaffold the project.\nInstall dependencies.\nConfigure the dark theme.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: project scaffold with Ralph",
        text: "Use the Ralph technique to scaffold the Next.js project, install dependencies, and configure the dark theme in globals.css.",
      },
      {
        type: "subheading",
        text: "Recon + Architecture",
      },
      {
        type: "code",
        language: "text",
        code: "I need to scaffold a new Next.js project for the course site.\n\nRead AGENTS.md for the stack and design tokens.\nPropose a plan:\n1. create-next-app with the right flags\n2. Which additional packages to install\n3. How to configure globals.css with the dark theme tokens\n4. How to set up the cn() utility in src/lib/utils.ts\n\nDo not implement yet.",
        caption: "Recon + Architecture: plan the scaffold",
      },
      {
        type: "subheading",
        text: "Loop + Patch + Harden",
      },
      {
        type: "paragraph",
        text: "After approving the plan, let the agent execute. Then verify: does npm run build pass? Is the dark theme applied? Is cn() available? Are all packages installed?",
      },
    ],
  },
  {
    number: 4,
    title: "Exercise: build the layout shell",
    headline: "Exercise 3\n\nContainer. Nav. Footer.\nOne component at a time.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: three slices, three builds",
        text: "Build the three layout components following the Ralph technique. Each component is one task per loop. Build and verify after each one.",
      },
      {
        type: "subheading",
        text: "The three slices",
      },
      {
        type: "bullets",
        items: [
          "Slice 1: Container.tsx — centres content at max-width 1200px with responsive padding. Build. Verify.",
          "Slice 2: Footer.tsx — minimal monospace footer with border-top. Uses Container. Build. Verify.",
          "Slice 3: Nav.tsx — fixed top bar, transparent-to-solid on scroll, logo + links + CTA. Uses Container. Build. Verify.",
        ],
      },
      {
        type: "paragraph",
        text: "For each slice: read the current state → ask for a plan → approve → implement → build → review the diff. Three full Ralph loops.",
      },
    ],
  },
  {
    number: 5,
    title: "Exercise: build the hero section",
    headline: "Exercise 4\n\nThe hero.\nFull Ralph loop.\nOne shot.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: hero section",
        text: "Build the full-viewport hero section with the radial glow, responsive title, subtitle, CTA buttons, and tool badges. One Ralph loop.",
      },
      {
        type: "code",
        language: "text",
        code: "Read AGENTS.md and src/app/layout.tsx.\n\nI need a HeroSection at src/components/sections/HeroSection.tsx:\n- 'use client' (uses useEffect for IntersectionObserver)\n- Full viewport height, centred content\n- Monospace eyebrow: 'AI Coding Agents · Course 2026'\n- Responsive title using clamp(48px, 8vw, 96px)\n- Subtitle paragraph (max 520px width)\n- Two CTA buttons (primary solid, secondary outline)\n- Radial gradient glow: accent #de3163 at 12% opacity\n- Tool badges row: Claude Code · OpenCode · Codex · Atomica\n- All decorative elements: aria-hidden='true'\n\nRecon the layout first, then propose a plan.",
        caption: "The hero prompt — Recon + Architecture first",
      },
      {
        type: "paragraph",
        text: "After approving the plan: implement, update page.tsx to render HeroSection, run npm run build, review the diff. One cycle.",
      },
    ],
  },
  {
    number: 6,
    title: "Exercise: build the module accordion",
    headline: "Exercise 5\n\nThe hardest component.\nMultiple slices.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: multi-loop Ralph on a complex feature",
        text: "The module accordion with slide viewer is the most complex component. This exercise teaches you how to break a complex feature into slices and build incrementally.",
      },
      {
        type: "subheading",
        text: "Suggested slicing",
      },
      {
        type: "bullets",
        items: [
          "Slice 1: Define the data model — Slide, CourseModule, ContentBlock types in src/data/course.ts. Build.",
          "Slice 2: Static module cards — collapsed view only, no accordion. Build.",
          "Slice 3: Accordion open/close with CSS Grid animation. Build.",
          "Slice 4: Slide list sidebar inside the accordion panel. Build.",
          "Slice 5: Slide content area with headline and body. Build.",
          "Slice 6: Rich content renderer — paragraphs, bullets, quotes, code blocks, tables, callouts. Build.",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why six slices, not one prompt",
        text: "A prompt like 'build a module accordion with a slide viewer that renders rich content blocks' would produce 500+ lines of code. You could not review it. You could not debug it. You could not be confident it was correct. Six slices, each verified, each under 100 lines — that is how professionals build complex features with AI agents.",
      },
    ],
  },
  {
    number: 7,
    title: "Exercise: frameworks and FAQ sections",
    headline: "Exercise 6\n\nTwo more sections.\nRepeat the pattern.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: apply the pattern to new sections",
        text: "By now you have the rhythm. Apply the Ralph technique to build the Resources section (tabbed content with enterprise topics, prompt library, and failure patterns) and the FAQ section (simple accordion).",
      },
      {
        type: "subheading",
        text: "The framework section",
      },
      {
        type: "paragraph",
        text: "Recon the data model (Framework, FrameworkItem). Plan the FrameworksSection component. Build in 2 slices: the section with static cards first, then the accordion expand with item rendering.",
      },
      {
        type: "subheading",
        text: "The FAQ section",
      },
      {
        type: "paragraph",
        text: "Simpler than the module accordion — reuse the CSS Grid accordion pattern. One slice: build the FaqSection with question/answer accordion items.",
      },
      {
        type: "paragraph",
        text: "After both sections are built, wire everything into page.tsx: Hero → Modules → Frameworks → FAQ → CTA Banner → Footer. Run the final build.",
      },
    ],
  },
  {
    number: 8,
    title: "Exercise: final review",
    headline: "Exercise 7\n\nReview your own work.\nCheck every diff.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Hands-on: review and harden the complete site",
        text: "The site is built. Now review it. Ask the agent to do a full review of the codebase — check scope, correctness, patterns, dependencies, accessibility, and readability.",
      },
      {
        type: "code",
        language: "text",
        code: "Read every file in src/. Review the complete codebase against:\n\n1. SCOPE — does each component do only what it should?\n2. CORRECTNESS — are there any logic errors or wrong assumptions?\n3. PATTERNS — is the dark theme consistent? Are design tokens used correctly?\n4. DEPENDENCIES — were any unnecessary packages added?\n5. ACCESSIBILITY — do interactive elements have proper ARIA attributes?\n   Are decorative elements hidden? Is keyboard navigation supported?\n6. SIDE EFFECTS — does anything break on mobile? Are there console errors?\n7. READABILITY — could a new developer understand each component?\n\nReport findings as Critical / Major / Minor.",
        caption: "The final review prompt",
      },
      {
        type: "paragraph",
        text: "Fix any Critical or Major findings using the Ralph technique — read the problem, plan the fix, implement, verify with tests. This is the same loop you have been practising all module.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The capstone lesson",
        text: "You just built a production-quality website using only an AI coding agent and the Ralph technique. Every component was planned, approved, implemented in loops, and verified. The mental model, the technique, and the project rules all worked together. This is AI-assisted development done right.",
      },
    ],
  },
  {
    number: 9,
    title: "What comes next",
    headline: "You know\nthe mental model.\nNow master\nthe tooling.",
    sections: [
      {
        type: "paragraph",
        text: "This course taught you how to think about AI coding agents — the Ralph technique, AGENTS.md, skills, operating contracts, and structured code review. You have the conceptual foundation. But there is a whole practical layer on top: hooks that auto-format your code after every edit, parallel agents running in git worktrees, token optimization strategies, verification loops, plugin ecosystems, and keyboard shortcuts that save hours per week.",
      },
      {
        type: "subheading",
        text: "The XPlatform Academy learning path",
      },
      {
        type: "comparison",
        headers: ["Course", "What you'll learn"],
        rows: [
          ["AI Coding Harnesses", "Setup, configuration, hooks, plugins, parallel workflows, token optimization, permission modes — the practical daily workflow companion to this course"],
          ["Context Engineering", "Deep context architecture — AGENTS.md mastery, skills systems, MCP as dynamic context, context registries, the Write/Select/Compress/Isolate taxonomy"],
          ["Building MCP Servers", "Build the tools agents use — from your first TypeScript server to enterprise-grade remote deployments with governance"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The recommended next step",
        text: "If you want to be productive immediately, take AI Coding Harnesses next — it's the practical companion to what you just learned. If you want to go deeper on context architecture, take Context Engineering. Both build on the foundation you now have.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 5 — Orchestrating Agent Workflows
   ═══════════════════════════════════════════════════════════════════════════ */

const module5Slides: Slide[] = [
  {
    number: 1,
    title: "The five workflow patterns",
    headline: "Not every task\nneeds an agent.\nMost need\na workflow.",
    sections: [
      {
        type: "paragraph",
        text: "Anthropic's research with dozens of production teams found that the most successful implementations use simple, composable patterns — not complex multi-agent frameworks. Before reaching for agents, understand the five workflow patterns that solve most problems.",
      },
      {
        type: "comparison",
        headers: ["Pattern", "When to use"],
        rows: [
          ["Prompt Chaining", "Task decomposes into fixed sequential steps. Each LLM call processes the output of the previous one. Example: generate code → review it → fix issues."],
          ["Routing", "Input needs classification before specialised handling. Different task types → different prompts/tools. Example: bug report → debug flow, feature request → planning flow."],
          ["Parallelisation", "Independent subtasks can run simultaneously (sectioning) or the same task needs multiple perspectives (voting). Example: review code for bugs AND security AND performance in parallel."],
          ["Orchestrator-Workers", "You can't predict subtasks in advance. A central LLM dynamically breaks down work, delegates to workers, synthesises results. Example: 'refactor this module' → discovers which files need changes."],
          ["Evaluator-Optimizer", "Output can be iteratively improved. One LLM generates, another evaluates and provides feedback in a loop. Example: write tests → run them → fix failures → repeat."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Anthropic's core advice",
        text: "Start with the simplest solution possible. Only increase complexity when it demonstrably improves outcomes. A single LLM call with good context often outperforms an elaborate multi-agent system.",
      },
    ],
  },
  {
    number: 2,
    title: "Single-agent vs multi-agent",
    headline: "Multi-agent\nsounds better.\nSingle-agent\nusually IS better.",
    sections: [
      {
        type: "paragraph",
        text: "Cognition (builders of Devin) published a clear warning in June 2025: 'Don't Build Multi-Agents.' Their two principles explain why most multi-agent architectures fail in practice.",
      },
      {
        type: "subheading",
        text: "Principle 1: Share context",
      },
      {
        type: "paragraph",
        text: "When you split work across agents, each agent loses context about what the others decided. Subtask 1 might build a Mario-style background while Subtask 2 builds a Flappy Bird character — because neither saw the other's decisions. Sharing full agent traces (not just final outputs) is essential, but expensive.",
      },
      {
        type: "subheading",
        text: "Principle 2: Actions carry implicit decisions",
      },
      {
        type: "paragraph",
        text: "Every action an agent takes embodies decisions that weren't explicitly stated. Agent A chose a visual style. Agent B chose a different one. Neither was wrong individually, but together they're inconsistent. Parallel agents with separate contexts will make conflicting implicit decisions.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The tradeoff",
        text: "Anthropic's multi-agent research system outperformed single-agent by 90% — but used 15x more tokens. Multi-agent works when: the value justifies the cost, the work is truly parallelisable, and information exceeds a single context window. For most coding tasks, a single agent with good context wins.",
      },
    ],
  },
  {
    number: 3,
    title: "Subagents in practice",
    headline: "Not multi-agent.\nDelegated work\nwith isolated context.",
    sections: [
      {
        type: "paragraph",
        text: "Subagents are the practical middle ground. They're not autonomous collaborators — they're delegated workers with their own context window that return results to the parent. The key difference from multi-agent: subagents don't coordinate with each other. They report to the parent.",
      },
      {
        type: "comparison",
        headers: ["Built-in subagent", "What it does"],
        rows: [
          ["Explore", "Fast, read-only search. Uses Haiku for speed. Keeps exploration results out of your main context."],
          ["Plan", "Research agent for plan mode. Gathers codebase context without making changes."],
          ["General-purpose", "Full capabilities. Used for complex multi-step tasks that need both exploration and action."],
        ],
      },
      {
        type: "subheading",
        text: "Custom subagents",
      },
      {
        type: "code",
        caption: "Creating a custom subagent (~/.claude/agents/reviewer.md)",
        code: "---\nname: code-reviewer\ndescription: Reviews code for quality and best practices\ntools: Read, Grep, Glob, Bash\nmodel: sonnet\nmemory: user\n---\n\nYou are a senior code reviewer. Analyse code for:\n- Logic errors and edge cases\n- Security vulnerabilities\n- Performance issues\n- Consistency with project patterns\n\nProvide specific, actionable feedback with line references.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The Writer/Reviewer pattern",
        text: "The most valuable subagent pattern: one agent implements (Session A), then a fresh subagent reviews with clean context (Session B). The reviewer has no bias toward the code it just wrote. This catches things the writer missed because the reviewer evaluates the result, not the intent.",
      },
    ],
  },
  {
    number: 4,
    title: "The orchestrator-workers pattern",
    headline: "One coordinator.\nMultiple specialists.\nEvidence-gated\nhandoffs.",
    sections: [
      {
        type: "paragraph",
        text: "The most sophisticated workflow pattern is orchestrator-workers: a central agent classifies tasks, delegates to specialists, enforces quality gates, and loops back on failures. This is the pattern used by production coding systems — and it's the pattern behind this course site's own development.",
      },
      {
        type: "code",
        caption: "How the orchestrator works (simplified)",
        code: "1. CLASSIFY the task (ui-feature, bug-fix, refactor...)\n2. SELECT the workflow based on classification\n3. DELEGATE to specialists in sequence:\n   explore → design-system → architect → implementer\n4. ENFORCE gates between steps:\n   - DS Contract must exist before implementer runs\n   - Implementation plan must exist before coding starts\n5. RUN post-checks:\n   review → a11y → design-system (final) → verify\n6. LOOP BACK on failures:\n   review finds Critical → back to implementer → re-review\n7. PRODUCE structured evidence of everything that happened",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Hard stops",
        text: "The orchestrator's most important job is BLOCKING progress when prerequisites aren't met — not just routing work. 'No implementation before DS Contract exists' is a hard stop, not a suggestion. The gate enforcement is what makes orchestrated workflows reliable.",
      },
    ],
  },
  {
    number: 5,
    title: "When to scale beyond single-agent",
    headline: "The decision\nframework.",
    sections: [
      {
        type: "comparison",
        headers: ["Stay single-agent when", "Scale to multi-agent when"],
        rows: [
          ["The task fits in one context window", "Information exceeds a single context window"],
          ["Steps are sequential and dependent", "Subtasks are truly independent and parallelisable"],
          ["Quick iteration matters more than thoroughness", "Thoroughness matters more than speed"],
          ["Token cost needs to stay low", "The value justifies 10-15x token cost"],
          ["You need consistent style/decisions", "Different subtasks need different specialisation"],
          ["You can verify the result quickly", "Verification itself needs specialised agents"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The practical progression",
        text: "1. Single agent with good AGENTS.md → handles 80% of tasks\n2. Single agent with subagents for exploration → handles 95% of tasks\n3. Orchestrator with specialist subagents → handles complex multi-file features\n4. Agent teams with parallel workers → handles research-scale problems\n\nMost developers never need to go beyond step 2. Step 3 is for team leads building workflows. Step 4 is for platform engineers.",
      },
    ],
  },
  {
    number: 6,
    title: "Exercise: design an orchestrated workflow",
    headline: "Your turn.\nDesign the\ndelegation chain.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Design an orchestrated workflow for your project",
        text: "Pick a complex task type your team does regularly (e.g., 'add a new API endpoint', 'build a new page', 'fix a production bug').\n\n1. CLASSIFY — what type of task is it? What subtasks does it involve?\n2. SEQUENCE — what order should specialists work in? What depends on what?\n3. GATES — what must exist before each step can proceed? What are the hard stops?\n4. FAILURE LOOPS — when a post-check fails, where does work route back to?\n5. SUBAGENTS — which steps benefit from isolated context? Which need the full picture?\n6. EVIDENCE — what should the final report include?\n\nDraw the workflow as a diagram:\n- Boxes for each specialist step\n- Arrows for the happy path\n- Dotted arrows for failure loop-backs\n- Diamond shapes for gates/decisions\n\nCompare with a colleague — did you sequence the same way?\n\nTime: 30 minutes",
      },
    ],
  },
];

/* ─── Export all modules ────────────────────────────────────────────────── */

export const courseModules: CourseModule[] = [
  {
    id: 1,
    slug: "mental-model",
    label: "Module 1",
    title: "The mental model: AI agent ≠ autocomplete",
    description:
      "Reset expectations through four hands-on exercises. See the agent explore, experience vibe-coding pitfalls, test the agent's limits, and run your first controlled workflow.",
    keyMessage:
      "A coding agent is not a senior developer. It is a probabilistic execution system that needs scope, context, constraints, tools, and review.",
    slides: module1Slides,
  },
  {
    id: 2,
    slug: "developer-workflow",
    label: "Module 2",
    title: "The developer workflow with Claude Code / OpenCode / Codex / Atomica",
    description:
      "Learn the Ralph technique through drill exercises. The autonomous bash loop, PROMPT.md, specs as context, tests as back-pressure, and continuous prompt tuning — practised on real tasks.",
    keyMessage:
      "while :; do cat PROMPT.md | claude-code; done — One task per loop. Specs as context. Tests as back-pressure. Tune the prompt when Ralph misbehaves.",
    slides: module2Slides,
  },
  {
    id: 3,
    slug: "project-rules",
    label: "Module 3",
    title: "Prompting is not enough: project rules, skills, and operating contracts",
    description:
      "Show how to make agents consistently better. Move from one-off prompting to encoded, persistent project intelligence.",
    keyMessage:
      "One-off prompting is fragile. Encode your conventions in files the agent reads on every session.",
    slides: module3Slides,
  },
  {
    id: 4,
    slug: "capstone",
    label: "Module 4",
    title: "Capstone: build this course site",
    description:
      "The capstone project. Apply everything — mental model, Ralph technique, project rules — to build this course website from scratch with an AI agent.",
    keyMessage:
      "Mental model + workflow + project instrumentation = professional AI-assisted development. Build it to prove it.",
    slides: module4Slides,
  },
  {
    id: 5,
    slug: "orchestration",
    label: "Bonus Module",
    title: "Orchestrating agent workflows",
    description:
      "Bonus content. When a single agent isn't enough: the five workflow patterns, single-agent vs multi-agent tradeoffs, subagents, the orchestrator-workers pattern, and when to scale.",
    keyMessage:
      "Start simple. A single agent with good context handles 80% of tasks. Scale to orchestration only when the task demands it — and know the patterns when it does.",
    slides: module5Slides,
  },
];

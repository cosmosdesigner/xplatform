import type { Slide, CourseModule, ContentBlock } from "./course";

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 1 — What Are AI Coding Harnesses?
   ═══════════════════════════════════════════════════════════════════════════ */

const module1Slides: Slide[] = [
  {
    number: 1,
    title: "From autocomplete to agents",
    headline: "Not a chatbot.\nNot autocomplete.\nAn agent.",
    sections: [
      {
        type: "paragraph",
        text: "The evolution happened fast. GitHub Copilot (2021) gave us inline completions — it predicted the next line. ChatGPT (2022) gave us conversations — you could ask questions. But in 2024-25, something fundamentally different emerged: agentic coding tools that read your entire codebase, run commands, make multi-file changes, and verify their own work.",
      },
      {
        type: "comparison",
        headers: ["Generation", "How it works"],
        rows: [
          ["Autocomplete (Copilot, 2021)", "Predicts the next line based on the current file. You write, it suggests. You accept or reject."],
          ["Chat (ChatGPT, 2022)", "You paste code, ask questions, get answers. Copy-paste workflow. No file access."],
          ["Agents (2024-25)", "Reads your codebase, plans multi-step changes, edits files, runs tests, commits code. You direct, it executes."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The key difference",
        text: "An agent has a loop: instruction → plan → tool call → observe result → decide next step → repeat. It can do multi-step work unattended. Autocomplete and chat are single-turn: you ask, it responds, done. This loop is what makes agents powerful — and what makes them dangerous without proper configuration.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "The three harnesses",
    headline: "Claude Code.\nOpenCode.\nCodex.",
    sections: [
      {
        type: "comparison",
        headers: ["Harness", "Identity"],
        rows: [
          ["Claude Code (Anthropic)", "Terminal-first, most powerful agentic features, 6 permission modes, skills/hooks/subagents, auto mode with AI safety classifier, managed enterprise settings. Available as CLI, VS Code extension, desktop app, and web."],
          ["OpenCode (open source)", "Open source (160K stars), 75+ model providers, LSP-enabled, multi-session, GitHub Copilot + ChatGPT Plus integration, instinct learning system, plugin architecture. Privacy-first — stores no code or context data."],
          ["Codex (OpenAI)", "Cloud-first sandboxed execution, AGENTS.md, integrated with OpenAI platform, optimised for o3/GPT models. Each task runs in an isolated environment with full terminal access."],
        ],
      },
      {
        type: "paragraph",
        text: "Other harnesses exist — Cursor (IDE-native), Windsurf (Codeium), Kiro (AWS) — and may be covered in future modules. This course focuses on the three terminal-first agentic harnesses that share the most architectural patterns.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Same principles, different wrappers",
        text: "All three use instruction files (CLAUDE.md / AGENTS.md), support MCP, have permission systems, and manage context windows. Learn one deeply, and the others are a configuration change away.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Terminal vs IDE vs Desktop vs Web",
    headline: "Four form factors.\nOne underlying engine.",
    sections: [
      {
        type: "comparison",
        headers: ["Form factor", "Best for"],
        rows: [
          ["Terminal (Claude Code CLI, OpenCode)", "Maximum power, unix composability, piping, scripting, CI/CD integration. 'cd your-project && claude'"],
          ["IDE Extension (Cursor, VS Code + Claude)", "Inline diffs, @ file mentions, visual context, integrated terminal. Best for developers who live in their editor."],
          ["Desktop App (Claude Desktop)", "Visual session management, multiple parallel sessions, scheduled tasks. Best for review and oversight."],
          ["Web/Mobile (claude.ai/code)", "No local setup, long-running tasks, check from your phone. Best for kicking off work and checking back."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "They connect",
        text: "Claude Code sessions aren't tied to a single surface. You can start a task in the terminal, hand it to the Desktop app for visual diff review, check progress on your phone via Remote Control, and pull it back to the terminal. Your CLAUDE.md, settings, and MCP servers work across all of them.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "What they all share",
    headline: "Instruction files.\nPermissions.\nMCP.\nContext management.",
    sections: [
      {
        type: "paragraph",
        text: "Despite their differences, every major harness converges on the same core concepts. Learning these once gives you transferable skills across all tools.",
      },
      {
        type: "bullets",
        items: [
          "Instruction files — CLAUDE.md (Claude Code), AGENTS.md (OpenCode, Codex). Different names, same purpose: persistent project context loaded every session.",
          "Permission systems — control what the agent can do: read-only, edit files, run commands, full autonomy. Every harness has some form of this.",
          "MCP support — Model Context Protocol for connecting to external systems. Supported by Claude Code, OpenCode, and a growing ecosystem.",
          "Context management — the context window is finite. Every harness has /compact, /clear, or equivalent. Managing it is your job.",
          "Tool execution — agents call tools (file edit, bash, MCP) in a loop. Understanding the tool loop is understanding the agent.",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The universal configuration file",
        text: "AGENTS.md is the most tool-agnostic name. Claude Code reads CLAUDE.md, OpenCode and Codex read AGENTS.md. Some teams maintain both files importing from a shared source. The ECC project (223K GitHub stars) maintains config for 7+ harnesses from a single repo.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Enterprise considerations",
    headline: "Model gateway.\nAPI keys.\nManaged settings.\nCompliance.",
    sections: [
      {
        type: "paragraph",
        text: "In enterprise environments, AI coding agents don't connect directly to model providers. There are additional layers: model gateways/proxies, API key management, data residency requirements, audit trails, and IT-managed settings that restrict what agents can do.",
      },
      {
        type: "subheading",
        text: "The enterprise model gateway",
      },
      {
        type: "paragraph",
        text: "Instead of connecting directly to Anthropic or OpenAI, all model traffic goes through a corporate gateway — a single URL that routes to multiple model backends. This gives the organisation control over model access, usage tracking, and compliance.",
      },
      {
        type: "code",
        caption: "Enterprise gateway pattern",
        code: "Developer's machine\n  → AI Coding Agent (Claude Code / OpenCode)\n    → Corporate Model Gateway (modelaccess.company.cloud/v1)\n      → Claude, GPT, Gemini backends\n\nBenefits:\n  • Single authentication point (corporate API key)\n  • Usage tracking and cost allocation\n  • Data residency compliance\n  • Model access control (restrict which models)\n  • No direct provider access needed",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Security first",
        text: "API keys and tokens must NEVER be stored in code, config files checked into git, AGENTS.md, or any version-controlled location. Use environment variables. If a key appears in a commit, rotate it immediately.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Exercise: inventory your setup",
    headline: "Your turn.\nWhat do you\nhave today?",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Audit your current AI coding setup",
        text: "Before you configure anything, document what you have.\n\n1. Which harness(es) are installed? (claude, opencode, cursor, codex, none?)\n2. What model access do you have? (direct API key, enterprise gateway, none?)\n3. Do you have an AGENTS.md / CLAUDE.md / .cursorrules file? What's in it?\n4. Are any MCP servers configured? Which ones?\n5. What permission mode are you using? (default? auto? don't know?)\n6. How do you manage your context window? (/compact? /clear? don't know?)\n\nScore yourself 0-6 (one point per question you can answer confidently).\n0-2: This course will transform your workflow.\n3-4: You'll fill important gaps.\n5-6: You'll optimise what you already have.\n\nTime: 10 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 2 — Installation & Configuration
   ═══════════════════════════════════════════════════════════════════════════ */

const module2Slides: Slide[] = [
  {
    number: 1,
    title: "Installing your harness",
    headline: "From zero\nto running\nin 5 minutes.",
    sections: [
      {
        type: "code",
        caption: "Install the three harnesses",
        code: "# Claude Code (Anthropic — terminal + IDE + desktop + web)\ncurl -fsSL https://claude.ai/install.sh | bash   # macOS/Linux\nirm https://claude.ai/install.ps1 | iex            # Windows PowerShell\n\n# OpenCode (open source, multi-provider)\ncurl -fsSL https://opencode.ai/install | bash\n# or: npm install -g opencode\n\n# Codex (OpenAI — cloud-sandboxed execution)\nnpm install -g @openai/codex\n# Requires OpenAI API key or enterprise gateway",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Prerequisites",
        text: "All terminal harnesses need Node.js 16+ and Git. Claude Code on Windows recommends Git for Windows for the Bash tool. Verify: node --version, git --version. If either is missing, install before proceeding.",
      },
      {
        type: "paragraph",
        text: "After installing, start your first session: cd your-project && claude (or opencode). You'll be prompted to log in on first use. That's it — you're running an AI coding agent.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Configuration scopes",
    headline: "Global.\nProject.\nLocal.\nManaged.",
    sections: [
      {
        type: "paragraph",
        text: "Every harness has a configuration hierarchy — settings at different scopes that override each other. Understanding this hierarchy is essential for knowing where to put each piece of configuration.",
      },
      {
        type: "comparison",
        headers: ["Scope", "What it controls"],
        rows: [
          ["Managed (IT-deployed)", "Organisation-wide policies that can't be overridden. Security rules, model restrictions, MCP allowlists. Deployed by IT via MDM, registry, or managed-settings.json."],
          ["User (~/.claude/ or ~/.config/opencode/)", "Personal preferences across all projects. API keys, default model, plugins, personal MCP servers. Not shared with team."],
          ["Project (.claude/ or opencode.json or .codex/)", "Team-shared settings for this repo. Permissions, hooks, MCP servers, agent definitions. Committed to git."],
          ["Local (.claude/settings.local.json)", "Your personal overrides for this repo only. Testing configurations, machine-specific settings. Gitignored."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Priority order",
        text: "Managed (highest) → Command line args → Local → Project → User (lowest). When the same setting appears in multiple scopes, the higher-priority scope wins. Permission rules merge across scopes rather than override.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Connecting to your enterprise gateway",
    headline: "One URL.\nMultiple backends.\nCorporate auth.",
    sections: [
      {
        type: "code",
        caption: "Enterprise gateway config for all 3 harnesses",
        code: "# Claude Code — environment variables\nexport ANTHROPIC_BASE_URL=\"https://modelaccess.company.cloud/v1\"\nexport ANTHROPIC_API_KEY=\"your-enterprise-key\"\n\n# OpenCode — opencode.jsonc provider block\n{\n  \"provider\": {\n    \"enterprise\": {\n      \"npm\": \"@ai-sdk/openai-compatible\",\n      \"options\": {\n        \"baseURL\": \"https://modelaccess.company.cloud/v1\",\n        \"apiKey\": \"${env:GENAI_API_KEY}\"\n      },\n      \"models\": {\n        \"claude-sonnet-4-6\": { \"name\": \"claude-sonnet-4.6\" }\n      }\n    }\n  },\n  \"disabled_providers\": [\"anthropic\", \"openai\"]\n}\n\n# Codex — environment variables\nexport OPENAI_API_KEY=\"your-enterprise-key\"\nexport OPENAI_BASE_URL=\"https://modelaccess.company.cloud/v1\"",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Disabling direct providers",
        text: "In enterprise, you should disable direct provider access and route everything through the gateway. This ensures usage tracking, compliance, and cost control. OpenCode: disabled_providers array. Claude Code: configure the base URL.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Your first AGENTS.md",
    headline: "30 minutes.\n80% of the value.\nWrite it now.",
    sections: [
      {
        type: "code",
        caption: "A production-ready AGENTS.md in 5 sections",
        code: "## Stack\nNext.js 16 / React 19 / TypeScript 5.9 strict\nTailwind CSS v4 / Vitest + Testing Library\n\n## Commands\nnpm run dev — start dev server\nnpm run build — production build (must pass)\nnpm run tsc — typecheck (zero errors)\nnpm run test — run all tests\n\n## Architecture\nsrc/app/ — App Router pages and layouts\nsrc/components/ — reusable components\nsrc/data/ — static data files\nsrc/lib/ — utilities\n\n## Conventions\n- Use cn() from src/lib/utils.ts for className merging\n- All decorative icons must have aria-hidden='true'\n- Do not add npm dependencies without asking\n- Do not edit files outside the current task scope\n\n## Anti-patterns (never do these)\n- <div onClick> — use <button> for interactive elements\n- New CSS files — use Tailwind\n- console.log in production code",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The naming convention",
        text: "AGENTS.md (OpenCode, Codex) = CLAUDE.md (Claude Code). Same purpose, different filenames. Many teams create both — a 2-line CLAUDE.md that imports AGENTS.md: '@AGENTS.md'. Check it into git — it's a team artifact that compounds in value as teammates contribute patterns.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Exercise: install and configure",
    headline: "Your turn.\nGet running.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Install and configure your harness",
        text: "Complete the full setup for your chosen harness.\n\n1. Install the harness (Claude Code, OpenCode, or Codex)\n2. Configure enterprise gateway (or direct API key if not enterprise)\n3. Verify: cd your-project && claude (or opencode, or codex) — can it read files? Run commands?\n4. Create an AGENTS.md with: Stack, Commands, Architecture, Conventions, Anti-patterns\n5. If using Claude Code, also create a CLAUDE.md with: @AGENTS.md\n6. Test: ask the agent to read your AGENTS.md and summarise what it learned\n\nSmoke test — ask:\n- 'What is this project?' (should answer from code, not guess)\n- 'Run the tests' (should use the command from AGENTS.md)\n- 'What framework are we using?' (should answer from AGENTS.md, not guess)\n\nTime: 30 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 3 — Permission Modes & Safety
   ═══════════════════════════════════════════════════════════════════════════ */

const module3Slides: Slide[] = [
  {
    number: 1,
    title: "Why permissions matter",
    headline: "The agent can\nrun any command.\nEdit any file.\nPush to git.",
    sections: [
      {
        type: "paragraph",
        text: "An AI coding agent has access to your terminal. It can run rm -rf, push to main, install malicious packages, or leak secrets — all autonomously if you let it. Permission modes are the guardrails that prevent disaster while still letting the agent be productive.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Real risks",
        text: "Without permissions:\n- The agent could overwrite .git/ and corrupt your repo\n- It could push directly to main without review\n- It could install packages with known vulnerabilities\n- It could read .env files and include secrets in generated code\n- It could run destructive commands (DROP TABLE, rm -rf /)\n\nPermission modes exist because these aren't hypothetical — they happen.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Claude Code permission modes",
    headline: "Six modes.\nFrom full control\nto full autonomy.",
    sections: [
      {
        type: "comparison",
        headers: ["Mode", "What it allows"],
        rows: [
          ["default", "Reads only run without asking. Every file edit and command prompts for approval. Best for getting started."],
          ["acceptEdits", "Reads + file edits + common filesystem commands (mkdir, touch, mv, cp) run without asking. Review via git diff after."],
          ["plan", "Read-only research mode. Claude explores and proposes changes but doesn't edit files. Use before implementing."],
          ["auto", "Everything runs with background AI safety checks. A classifier blocks scope escalation, unknown infrastructure, and hostile content. Best for long tasks."],
          ["dontAsk", "Only pre-approved tools can execute. Everything else is denied (not prompted). Best for CI/CD pipelines."],
          ["bypassPermissions", "Everything runs. No checks. Use ONLY in isolated containers/VMs. Never on your host machine."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Switch mid-session",
        text: "Press Shift+Tab to cycle modes: default → acceptEdits → plan. Start in plan mode to explore, switch to acceptEdits when you're ready to implement. Use /plan prefix for a single prompt in plan mode without switching.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Permission rules and protected paths",
    headline: "Fine-grained control.\nAllow, ask, deny.",
    sections: [
      {
        type: "code",
        caption: "Permission rules in settings.json (Claude Code) or opencode.json",
        code: "// Claude Code: .claude/settings.json\n{\n  \"permissions\": {\n    \"allow\": [\n      \"Bash(npm run lint)\",\n      \"Bash(npm run test *)\",\n      \"Read(~/.zshrc)\"\n    ],\n    \"deny\": [\n      \"Bash(curl *)\",\n      \"Read(./.env)\",\n      \"Read(./.env.*)\",\n      \"Read(./secrets/**)\"\n    ]\n  }\n}\n\n// OpenCode: opencode.json\n{\n  \"permission\": {\n    \"bash\": {\n      \"npm run tsc\": \"allow\",\n      \"npm run test\": \"allow\",\n      \"git push *\": \"ask\",\n      \"*\": \"ask\"\n    }\n  }\n}",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Protected paths",
        text: "Some paths are NEVER auto-approved in any mode (except bypassPermissions): .git/, .claude/, .bashrc, .zshrc, shell configs, .npmrc. This prevents the agent from corrupting git history, overwriting its own config, or modifying your shell environment.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "The autonomy ladder",
    headline: "Match the mode\nto the task.",
    sections: [
      {
        type: "comparison",
        headers: ["Level", "When to use"],
        rows: [
          ["L1: Plan mode (read only)", "Exploring unfamiliar code, understanding architecture, researching before implementing. 'What does this auth system do?'"],
          ["L2: Default (approve everything)", "First time doing a task type, sensitive production code, security-critical changes. Review every action."],
          ["L3: AcceptEdits (auto-approve edits)", "Iterating on code you're actively reviewing. You trust the direction, want to review via git diff after."],
          ["L4: Auto (AI safety checks)", "Long tasks, reducing prompt fatigue. You trust the general direction. The classifier catches scope escalation."],
          ["L5: BypassPermissions (no checks)", "Inside isolated containers, CI environments, dev containers. NEVER on your host machine."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The practical pattern",
        text: "Most experienced developers use this workflow:\n1. Start in plan mode — explore, understand, plan\n2. Review the plan, approve it\n3. Switch to acceptEdits or auto — let the agent implement\n4. Review the diff before committing\n\nThis gives you control where it matters (the plan) and speed where it doesn't (the implementation).",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "When things go wrong",
    headline: "Escape. Rewind.\nUndo. Clear.",
    sections: [
      {
        type: "bullets",
        items: [
          "Escape — stop the agent mid-action. Context is preserved, you can redirect.",
          "Escape + Escape (or /rewind) — open the rewind menu. Restore conversation, code, or both to any previous checkpoint.",
          "'Undo that' — have the agent revert its changes.",
          "/clear — reset context between unrelated tasks. Long sessions with irrelevant context reduce performance.",
          "/compact — summarise and trim the conversation. Use when context is getting full but you're not done.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The kitchen sink anti-pattern",
        text: "You start with one task, ask something unrelated, then go back. Context is full of irrelevant information. After the tenth correction you're not reviewing anymore, you're clicking through. Fix: /clear between unrelated tasks. Always. After 2 failed corrections, /clear and rewrite a better initial prompt.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Exercise: configure permissions",
    headline: "Your turn.\nSet the guardrails.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Configure permissions for your project",
        text: "Write a permission configuration that matches your project's safety requirements.\n\n1. List 5 commands that should run without asking (test, lint, typecheck, etc.)\n2. List 3 commands that should always ask (git push, npm install, deploy)\n3. List 3 paths that should never be read (.env, secrets/, credentials/)\n4. Add these rules to your settings.json or opencode.json\n5. Test: try running a denied command — does it block? Try an allowed command — does it run?\n6. Practice the recovery flow: Escape mid-action, /rewind to restore, /clear to reset\n\nTime: 20 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 4 — Hooks, Plugins & Productivity
   ═══════════════════════════════════════════════════════════════════════════ */

const module4Slides: Slide[] = [
  {
    number: 1,
    title: "Hooks: automate the repetitive",
    headline: "Auto-format\nafter every edit.\nType-check\nafter every change.",
    sections: [
      {
        type: "paragraph",
        text: "Hooks are trigger-based automations that fire on specific events in the agent's lifecycle. Unlike instructions in AGENTS.md (which are advisory), hooks are deterministic — they run every time, with zero exceptions. This is the most impactful productivity feature most developers don't know about.",
      },
      {
        type: "comparison",
        headers: ["Hook type", "When it fires"],
        rows: [
          ["PreToolUse", "Before a tool executes — validate, remind, block. Example: remind about tmux before long commands."],
          ["PostToolUse", "After a tool finishes — format, check, feedback. Example: run prettier after every file edit."],
          ["UserPromptSubmit", "When you send a message — preprocess, validate."],
          ["Stop", "When the agent finishes responding — summarise, check for issues."],
          ["PreCompact", "Before context compaction — preserve critical information."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The killer hooks",
        text: "These three hooks transform your workflow:\n1. PostToolUse: run prettier after every .ts/.tsx edit — code is always formatted\n2. PostToolUse: run tsc --noEmit after every .ts edit — type errors caught immediately\n3. Stop: check all modified files for console.log — never commit debug code",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Writing hooks",
    headline: "JSON config.\nShell commands.\nPattern matching.",
    sections: [
      {
        type: "code",
        caption: "Practical hooks in .claude/settings.json",
        code: "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"tool == 'Edit' && tool_input.file_path matches '\\\\.(ts|tsx)$'\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npx prettier --write $TOOL_INPUT_FILE_PATH 2>/dev/null\"\n          }\n        ]\n      }\n    ],\n    \"Stop\": [\n      {\n        \"matcher\": \"*\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"git diff --cached --name-only | xargs grep -l 'console\\\\.log' 2>/dev/null && echo '[Hook] console.log detected in staged files' >&2 || true\"\n          }\n        ]\n      }\n    ]\n  }\n}",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Hooks vs AGENTS.md rules",
        text: "AGENTS.md: 'Please run prettier after editing files' — the agent might forget.\nHook: runs prettier after every edit — guaranteed, every time.\n\nUse AGENTS.md for guidelines. Use hooks for requirements that must happen with zero exceptions.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Parallel workflows",
    headline: "Multiple agents.\nSimultaneous work.\nNo conflicts.",
    sections: [
      {
        type: "subheading",
        text: "Git worktrees for parallel agents",
      },
      {
        type: "code",
        caption: "Run separate agents on separate checkouts",
        code: "# Create a worktree for each parallel task\ngit worktree add ../feature-auth feature/auth\ngit worktree add ../feature-dashboard feature/dashboard\n\n# In terminal 1:\ncd ../feature-auth && claude\n\n# In terminal 2:\ncd ../feature-dashboard && claude\n\n# Each agent works independently — no file conflicts\n# When done, merge each worktree's branch normally",
      },
      {
        type: "subheading",
        text: "Other parallelization patterns",
      },
      {
        type: "bullets",
        items: [
          "/fork — fork a conversation to do non-overlapping tasks without queuing messages",
          "Background agents — kick off a task and check back when it's done (Claude Desktop, Web)",
          "Writer/Reviewer — one agent implements, a fresh agent reviews with clean context (no bias)",
          "Subagent delegation — the main agent spawns scoped sub-tasks with separate context windows",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why worktrees beat branches",
        text: "With branches, switching requires stashing or committing work-in-progress. With worktrees, each checkout is a separate directory — two agents can edit the same repo simultaneously without any coordination. This is the single biggest productivity multiplier for experienced users.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Token optimization",
    headline: "Your 200K window\nmight only be 70K\nwith too many tools.",
    sections: [
      {
        type: "paragraph",
        text: "The context window is your most precious resource. Every MCP server you enable, every file the agent reads, every tool definition — they all consume tokens. The ECC project (223K stars) found that having 20+ MCPs enabled can reduce your effective context from 200K to 70K.",
      },
      {
        type: "subheading",
        text: "Optimization strategies",
      },
      {
        type: "bullets",
        items: [
          "Disable unused MCP servers — have 20-30 configured, keep under 10 enabled, under 80 tools active",
          "Disable unused plugins — each plugin adds tool definitions that consume context",
          "/clear between unrelated tasks — don't let context from task A pollute task B",
          "/compact with focus — '/compact Focus on the API changes' preserves what matters",
          "Scope investigations — 'read src/auth/' not 'explore the entire codebase'",
          "Use subagents for exploration — they burn their own context, not yours",
          "Start new sessions for new features — fresh context always outperforms cluttered context",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The degradation curve",
        text: "LLM performance doesn't degrade linearly — it falls off a cliff. At 50% context, everything works fine. At 80%, subtle mistakes start. At 95%, the agent starts ignoring instructions and repeating actions. Auto-compact triggers at 95% — but by then, quality has already degraded. Manage proactively.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Keyboard shortcuts and daily flow",
    headline: "The shortcuts\nthat save\nhours per week.",
    sections: [
      {
        type: "comparison",
        headers: ["Shortcut", "What it does"],
        rows: [
          ["Shift+Tab", "Cycle permission modes: default → acceptEdits → plan → (auto)"],
          ["Escape", "Stop the agent mid-action. Context preserved."],
          ["Escape + Escape", "Open rewind menu. Restore conversation, code, or both."],
          ["Tab", "Toggle thinking display (show/hide chain-of-thought)"],
          ["Ctrl+G", "Open the proposed plan in your text editor for direct editing"],
          ["!", "Quick bash command prefix — run a command without the agent"],
          ["@", "Reference a file by name — search and attach"],
          ["/", "Slash commands — /clear, /compact, /rewind, /plan, /fork"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The pro workflow",
        text: "1. Start task in plan mode (Shift+Tab to plan)\n2. Review plan, edit with Ctrl+G if needed\n3. Approve → switch to acceptEdits (Shift+Tab)\n4. Let agent work — Tab to watch thinking if curious\n5. If wrong direction: Escape, redirect\n6. If total mess: Escape+Escape, rewind to checkpoint\n7. When done: review with git diff, commit",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Exercise: configure hooks and parallelise",
    headline: "Your turn.\nAutomate and\nmultiply.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Set up hooks and try parallel workflows",
        text: "Part 1 — Hooks (15 minutes):\n1. Add a PostToolUse hook that runs your formatter after every file edit\n2. Add a Stop hook that checks for console.log in modified files\n3. Test: ask the agent to edit a file — does the formatter run? Does the console.log check fire?\n\nPart 2 — Parallel workflows (15 minutes):\n1. Create a git worktree: git worktree add ../test-worktree HEAD\n2. Open two terminal windows, one in your main project, one in the worktree\n3. Start an agent in each window\n4. Give each a different, non-overlapping task\n5. Observe: they work simultaneously without conflicts\n6. Clean up: git worktree remove ../test-worktree\n\nTime: 30 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 5 — Team Setup & Daily Practice
   ═══════════════════════════════════════════════════════════════════════════ */

const module5Slides: Slide[] = [
  {
    number: 1,
    title: "Team-shared configuration",
    headline: "What goes in git.\nWhat stays personal.",
    sections: [
      {
        type: "comparison",
        headers: ["Check into git (team)", "Keep personal (local)"],
        rows: [
          ["AGENTS.md / CLAUDE.md / .cursorrules", "API keys and tokens (env vars)"],
          [".claude/settings.json (permissions, hooks)", ".claude/settings.local.json (personal overrides)"],
          ["opencode.json (agents, permissions)", "~/.config/opencode/opencode.jsonc (global)"],
          [".mcp.json (project MCP servers)", "~/.claude.json (personal MCP servers)"],
          [".claude/agents/ (subagent definitions)", "Machine-specific paths and configs"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The check-it-in principle",
        text: "If a setting makes the agent behave correctly for the project, check it into git. When a new team member clones the repo, they get the correct agent behaviour automatically. Personal preferences (model choice, editor settings) stay in local/user config.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "MCP server connection",
    headline: "Connect to\nyour enterprise\nsystems.",
    sections: [
      {
        type: "code",
        caption: "Connecting to Azure DevOps via MCP",
        code: "// .mcp.json (project-level, checked into git)\n{\n  \"mcpServers\": {\n    \"azure-devops\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@azure-devops/mcp\", \"your-org\", \"--authentication\", \"azcli\"],\n      \"environment\": {\n        \"PERSONAL_ACCESS_TOKEN\": \"${env:ADO_PAT}\"\n      }\n    }\n  }\n}\n\n// Other useful MCP servers:\n// @modelcontextprotocol/server-github — GitHub integration\n// @modelcontextprotocol/server-filesystem — file system access\n// @supabase/mcp-server-supabase — database access\n// @modelcontextprotocol/server-memory — persistent memory",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Context window cost of MCPs",
        text: "Each MCP server adds tool definitions to your context. 10 servers with 8 tools each = 80 tool definitions consuming thousands of tokens. Configure many, enable few. Use /mcp to check which are active.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Managed settings for IT",
    headline: "Enterprise control\nwithout touching\nindividual machines.",
    sections: [
      {
        type: "paragraph",
        text: "For enterprise deployment, Claude Code supports managed settings that IT can deploy organisation-wide. These settings can't be overridden by users or projects — they're security policies enforced at the platform level.",
      },
      {
        type: "bullets",
        items: [
          "Model restrictions — limit which models users can select (availableModels + enforceAvailableModels)",
          "MCP allowlists — restrict which MCP servers can be configured (allowedMcpServers)",
          "Permission policies — enforce deny rules organisation-wide (permissions.deny)",
          "Plugin restrictions — control marketplace access (strictKnownMarketplaces, blockedMarketplaces)",
          "Auto mode control — enable or disable auto mode org-wide (disableAutoMode)",
          "Organisation CLAUDE.md — inject instructions into every session (claudeMd in managed settings)",
          "Company announcements — display messages at startup (companyAnnouncements)",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Deployment mechanisms",
        text: "Managed settings can be deployed via: server-managed settings (Claude.ai admin console), macOS MDM (Jamf/Kandji), Windows Group Policy/Intune, or file-based (managed-settings.json in system directories). All use the same JSON format.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "The first-day checklist",
    headline: "10 steps.\nNew team member\nto productive.",
    sections: [
      {
        type: "subheading",
        text: "The onboarding checklist",
      },
      {
        type: "bullets",
        items: [
          "1. Install your harness (Claude Code, OpenCode, or Cursor)",
          "2. Get your API key or enterprise gateway URL from the platform team",
          "3. Configure the gateway connection — verify the agent can call models",
          "4. Clone a project repo — AGENTS.md and .claude/settings.json should already exist",
          "5. Set your permission mode — start with default, upgrade to acceptEdits after a few sessions",
          "6. Connect MCP servers — Azure DevOps, GitHub, or whatever your team uses",
          "7. Verify with a smoke test — 'What is this project? Run the tests. What framework are we using?'",
          "8. Read the AGENTS.md — understand the project's conventions and anti-patterns",
          "9. Read the operating contract (if one exists) — understand what the agent should and shouldn't do",
          "10. Run your first real task — pick something small, use plan mode first, then implement",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The 30-minute guarantee",
        text: "If a new team member can't go from zero to their first agent-assisted commit in 30 minutes, your team's configuration isn't good enough. Fix the config, not the person.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Exercise: onboard a colleague",
    headline: "Your turn.\nTeach someone else.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Capstone: Onboard a colleague using the first-day checklist",
        text: "Pair up with a colleague who hasn't used an AI coding agent (or has a minimal setup).\n\n1. Walk them through the first-day checklist — all 10 steps\n2. Time it — can they reach their first agent-assisted commit in 30 minutes?\n3. Document every gap: unclear instructions, missing config, confusing steps\n4. Fix the gaps in your team's AGENTS.md, settings.json, or documentation\n5. Run the checklist again with a different colleague — is it faster?\n\nThe best test of your configuration is whether someone else can use it without help.\n\nTime: 45 minutes (including the walkthrough with your colleague)",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FRAMEWORKS
   ═══════════════════════════════════════════════════════════════════════════ */

export const harnessFrameworks = [
  {
    id: "harness-comparison",
    title: "Harness Comparison Matrix",
    description: "Feature-by-feature comparison of the three core AI coding harnesses.",
    items: [
      "Claude Code — terminal-first, 6 permission modes, skills/hooks/subagents, auto mode AI classifier, managed enterprise settings, VS Code/Desktop/Web",
      "OpenCode — open source (160K stars), 75+ model providers, LSP-enabled, multi-session, instinct learning, plugin system, privacy-first",
      "Codex — cloud-first sandboxed execution, AGENTS.md, OpenAI platform integration, isolated environments, optimised for o3/GPT models",
    ],
  },
  {
    id: "autonomy-ladder",
    title: "The Autonomy Ladder",
    description: "Match permission modes to task complexity and risk.",
    items: [
      "L1 Plan Mode — read-only research and exploration. No edits. Use for unfamiliar code.",
      "L2 Default — approve every action manually. Use for first-time tasks and sensitive code.",
      "L3 AcceptEdits — auto-approve file edits, prompt for commands. Use for iterative development.",
      "L4 Auto Mode — AI classifier checks actions. Use for long tasks with trusted direction.",
      "L5 BypassPermissions — no checks. Use ONLY in isolated containers/VMs. Never on host.",
    ],
  },
  {
    id: "first-day-checklist",
    title: "First-Day Checklist",
    description: "10 steps from zero to first agent-assisted commit in 30 minutes.",
    items: [
      "1. Install harness → 2. Get API key/gateway → 3. Configure connection → 4. Clone project",
      "5. Set permission mode → 6. Connect MCP servers → 7. Smoke test → 8. Read AGENTS.md",
      "9. Read operating contract → 10. Run first real task",
      "If a new team member can't reach their first commit in 30 minutes, fix the config, not the person.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export const harnessFaqItems = [
  {
    question: "Which harness should I start with?",
    answer: "If you want the most agentic features and enterprise support: Claude Code. If you want open source and multi-model flexibility: OpenCode. If you want cloud-sandboxed execution with OpenAI models: Codex. There's no wrong answer — the concepts transfer between harnesses.",
  },
  {
    question: "Can I use multiple harnesses on the same project?",
    answer: "Yes. AGENTS.md works for OpenCode and Codex, CLAUDE.md works for Claude Code. Many teams maintain both — a CLAUDE.md that imports AGENTS.md via '@AGENTS.md'. The ECC project (223K stars) maintains config for 7+ harnesses in a single repo.",
  },
  {
    question: "What's the difference between AGENTS.md and CLAUDE.md?",
    answer: "Same purpose, different filenames. AGENTS.md is read by OpenCode and Codex. CLAUDE.md is read by Claude Code. They all provide persistent project context loaded at session start. Most teams maintain AGENTS.md as the source and a CLAUDE.md that imports it.",
  },
  {
    question: "How does the enterprise gateway work?",
    answer: "Instead of connecting directly to Anthropic/OpenAI, the harness connects to a corporate URL that proxies requests to model backends. This gives the org control over: which models are available, usage tracking, cost allocation, data residency, and compliance. Configure it via the base URL setting.",
  },
  {
    question: "Do I need a paid subscription?",
    answer: "Claude Code requires a Claude subscription or Anthropic Console account. OpenCode is free with included models, or use your own API keys. Codex requires an OpenAI account. Enterprise gateways may provide access without individual subscriptions.",
  },
  {
    question: "Can I use my GitHub Copilot subscription?",
    answer: "OpenCode supports logging in with GitHub to use your Copilot account. Claude Code and Cursor have their own subscription models. Check your harness documentation for supported authentication methods.",
  },
  {
    question: "Is my code sent to external servers?",
    answer: "When the agent reads files or runs commands, the content is sent to the model provider (or your enterprise gateway) as context. OpenCode explicitly states it does not store any code or context data. Check your org's data residency policies and use the enterprise gateway for compliance.",
  },
  {
    question: "What are hooks and why should I care?",
    answer: "Hooks are automated actions that fire on agent events — auto-format after edits, type-check after changes, check for console.logs before stopping. Unlike AGENTS.md rules (which are advisory), hooks are guaranteed to run every time. They're the single biggest daily productivity improvement.",
  },
  {
    question: "How do I manage the context window?",
    answer: "Disable unused MCP servers and plugins (biggest impact). Use /clear between unrelated tasks. Use /compact when context is full but you're not done. Start fresh sessions for new features. Use subagents for exploration (they burn their own context). The ECC project recommends: 20-30 MCPs configured, under 10 enabled.",
  },
  {
    question: "Can IT control what the agent can do?",
    answer: "Yes. Claude Code supports managed settings deployed via MDM, Group Policy, Intune, or managed-settings.json. IT can restrict models, MCP servers, plugins, permission modes, and inject organisation-wide instructions. These settings can't be overridden by users.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

export const harnessModules: CourseModule[] = [
  {
    id: 1,
    slug: "what-are-harnesses",
    label: "Module 1",
    title: "What Are AI Coding Harnesses?",
    description:
      "The evolution from autocomplete to agents, the landscape of harnesses, form factors, and what they all share.",
    keyMessage:
      "Not a chatbot. Not autocomplete. An agent that reads your codebase, runs commands, and ships code. The harness is how you control it.",
    slides: module1Slides,
  },
  {
    id: 2,
    slug: "installation",
    label: "Module 2",
    title: "Installation & Configuration",
    description:
      "Install your harness, connect to your enterprise gateway, write your first AGENTS.md, and verify everything works.",
    keyMessage:
      "AGENTS.md provides 80% of the value with 30 minutes of work. Write it now.",
    slides: module2Slides,
  },
  {
    id: 3,
    slug: "permissions",
    label: "Module 3",
    title: "Permission Modes & Safety",
    description:
      "Six permission modes, fine-grained rules, protected paths, the autonomy ladder, and recovery when things go wrong.",
    keyMessage:
      "The agent can run any command and edit any file. Permission modes are the guardrails that prevent disaster while keeping you productive.",
    slides: module3Slides,
  },
  {
    id: 4,
    slug: "productivity",
    label: "Module 4",
    title: "Hooks, Plugins & Productivity",
    description:
      "Hooks that auto-format code, parallel workflows with git worktrees, token optimization, and keyboard shortcuts.",
    keyMessage:
      "Hooks are the single biggest daily productivity improvement. Auto-format after every edit, type-check after every change, guaranteed every time.",
    slides: module4Slides,
  },
  {
    id: 5,
    slug: "team-setup",
    label: "Module 5",
    title: "Team Setup & Daily Practice",
    description:
      "Team-shared configuration, MCP connections, managed settings for IT, and the 10-step first-day checklist.",
    keyMessage:
      "If a new team member can't go from zero to their first agent-assisted commit in 30 minutes, fix the config, not the person.",
    slides: module5Slides,
  },
];

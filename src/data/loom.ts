import type { Slide, CourseModule, FaqItem } from "./course";

/* ─── Loom v2 FAQ ───────────────────────────────────────────────────────── */

export const loomFaqItems: FaqItem[] = [
  {
    question: "What if a feature is too big for 5 days?",
    answer:
      "Split it into smaller features. If it truly cannot be split, the TL documents the exception and assumes the risk. But 90% of the time, it can be split — the team just needs to slice more aggressively.",
  },
  {
    question: "What if DEV environment is not available?",
    answer:
      "Developers continue working locally on their branch. The TL arbitrates access to DEV when there is contention. DEV is exclusive — only one feature branch at a time.",
  },
  {
    question: "What if the owner becomes unavailable mid-sprint?",
    answer:
      "The TL assumes ownership. Ownership does not change without a TL decision. The original owner resumes when available.",
  },
  {
    question: "What changes in the daily standup?",
    answer:
      "The board is the base. Each member reports on their US: current state, blockers, next step. The focus shifts from 'what did I do' to 'what is moving to production'.",
  },
  {
    question: "How does tech debt enter the workflow?",
    answer:
      "As a User Story under the permanent 'Tech Debt' feature in ADO. Any developer can create items. Tech debt is tackled when developers are idle between features or blocked on their current work.",
  },
  {
    question: "How do purely technical backend tasks work?",
    answer:
      "They enter the unified backlog as User Stories with PO/BA approval and a reserved budget. They follow the same branching, ownership, and validation rules as product features.",
  },
  {
    question: "Can we deploy on Fridays?",
    answer:
      "No. The only exception is critical production hotfixes, which still follow the full deployment pipeline (DEV → INT → QA → PROD) with mandatory code review.",
  },
  {
    question: "How does Loom v2 work with AI coding agents?",
    answer:
      "Point 16 (Agent Workflow) defines the model: one agent per scope, explicit handoffs with a fixed template, disjoint scopes for parallelism, and separate review. The feature owner maintains final responsibility.",
  },
];

/* ─── Module 1: The Why ─────────────────────────────────────────────────── */

const loomModule1: Slide[] = [
  {
    number: 1,
    title: "The problem we are solving",
    headline: "Before Loom v2\n\nWe worked 3 weeks.\nWe delivered little to production.",
    sections: [
      {
        type: "paragraph",
        text: "The current model has a structural problem: work is organised in 3-week cycles, but the cycle acts as a delivery batch. Everything starts at the beginning, little finishes by the end. Features carry over to the next cycle. Validation accumulates at the end. Problems are discovered late, when they are expensive to fix.",
      },
      {
        type: "subheading",
        text: "The symptoms",
      },
      {
        type: "bullets",
        items: [
          "Chronic carry-over — User Stories pass from cycle to cycle without reaching production",
          "High WIP (work in progress) — many things in flight, few complete",
          "Late validation — testing and QA piled up at the end of the cycle",
          "Low predictability — nobody knows what will actually ship this week",
          "Context-switching cost — developers juggle multiple half-done features",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The root cause",
        text: "The focus is on starting work, not finishing work. Starting a feature feels productive. But only finishing it — validated, merged, in production — delivers value. Loom v2 inverts this: finishing always beats starting.",
      },
    ],
  },
  {
    number: 2,
    title: "The old model vs Loom v2",
    headline: "What changes\n\nFrom batch delivery\nto continuous flow.",
    sections: [
      {
        type: "comparison",
        headers: ["Old model", "Loom v2"],
        rows: [
          ["Batch delivery at end of cycle", "Continuous, feature by feature"],
          ["High WIP — everything in progress", "Limited WIP — finish before starting"],
          ["Problems discovered at the end", "Problems discovered early"],
          ["Low predictability", "High predictability"],
          ["Cycle = delivery package", "Cycle = control container"],
        ],
      },
      {
        type: "paragraph",
        text: "The 3-week cycle does not disappear. But its purpose changes. It stops being a 'delivery package' and becomes a control container: it organises the backlog, aligns the team, and limits work in progress. Features are delivered when they are ready — not when the cycle ends.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The golden rule",
        text: "Finishing one User Story is worth more than starting three. The focus is always: what can we get to production this week?",
      },
    ],
  },
  {
    number: 3,
    title: "The 8 principles",
    headline: "Eight principles\n\nThe foundation of\neverything that follows.",
    sections: [
      {
        type: "comparison",
        headers: ["Principle", "In practice"],
        rows: [
          ["Continuous flow per feature", "Each feature: READY → BUILD → INTEGRATION → VALIDATE → PROD"],
          ["Cycle = control container", "The cycle organises — it does not determine when to deliver"],
          ["Small features", "Aggressive vertical slicing — 2-5 US, ≤ 5 days total to production"],
          ["Clear ownership", "One owner per feature, responsible end to end"],
          ["Early integration", "Frequent merges, short-lived branches, fast feedback"],
          ["Continuous validation", "Explicit gates per environment — validation is not accumulated"],
          ["Independent delivery", "Each feature ships when ready, without depending on other features"],
          ["Finish > Start", "The focus is production, not new work"],
        ],
      },
      {
        type: "quote",
        text: "Loom v2 is not a tool change.\nIt is a mindset change.",
      },
    ],
  },
  {
    number: 4,
    title: "The 16 points overview",
    headline: "16 points\n\nCovering the entire\nlifecycle of work.",
    sections: [
      {
        type: "subheading",
        text: "Before you build",
      },
      {
        type: "bullets",
        items: [
          "1. Definition of Ready — when is a feature/US ready for work?",
          "2. Slicing Strategy — how to cut features into deliverable pieces",
          "3. Prioritisation Criteria — what to do first",
          "4. Dependency Management — identify and track dependencies",
        ],
      },
      {
        type: "subheading",
        text: "During development",
      },
      {
        type: "bullets",
        items: [
          "5. Branching Strategy — branches, PRs, merges",
          "6. Ownership Strategy — one owner per feature/US",
          "7. Environment Policy — DEV → INT → QA → PROD",
          "8. Validation Policy — gates between environments",
          "9. US & Feature View — the board as source of truth",
        ],
      },
      {
        type: "subheading",
        text: "When things go wrong",
      },
      {
        type: "bullets",
        items: [
          "10. Blocked Work Policy — escalation in 24h",
          "11. Emergency Policy — hotfixes in production",
          "12. Tech Debt Policy — when and how to address it",
          "13. Engineering Tasks — reserved budget for backend work",
        ],
      },
      {
        type: "subheading",
        text: "Continuous improvement",
      },
      {
        type: "bullets",
        items: [
          "14. Versioning Policy — semantic versioning, git tags",
          "15. Agent Workflow — parallel work with delimited scopes",
          "16. Onboarding — how new members learn the model",
        ],
      },
    ],
  },
  {
    number: 5,
    title: "The feature lifecycle",
    headline: "End to end\n\nREADY → BUILD →\nINTEGRATION → VALIDATE → PROD",
    sections: [
      {
        type: "code",
        language: "text",
        code: "READY ──► BUILD ──► INTEGRATION ──► VALIDATE ──► PROD\n\nDEV          INT           QA          PROD\n(developer)  (dev+team)    (BA+QA)     (PO approves)",
        caption: "The feature flow",
      },
      {
        type: "paragraph",
        text: "Each feature moves through this pipeline independently. It does not wait for other features. It does not wait for the cycle to end. When it passes all validation gates, it goes to production.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The key insight",
        text: "The cycle is a container — 3 weeks to organise the backlog and limit WIP. But delivery happens continuously within the cycle. A feature that is ready on day 5 does not wait until day 15 to ship.",
      },
    ],
  },
];

/* ─── Module 2: Before You Build ────────────────────────────────────────── */

const loomModule2: Slide[] = [
  {
    number: 1,
    title: "Definition of Ready",
    headline: "Point 1: DoR\n\nA feature only enters BUILD\nwhen it meets all criteria.",
    sections: [
      {
        type: "subheading",
        text: "Feature DoR — 8 mandatory criteria",
      },
      {
        type: "comparison",
        headers: ["Criterion", "Why it matters"],
        rows: [
          ["Clear business value", "Without purpose, we don't deliver"],
          ["Acceptance criteria defined", "Without AC, there is no objective validation"],
          ["Decomposed into 2-5 US", "Forces complexity analysis"],
          ["Total estimate ≤ 5 days", "If longer, split into smaller features"],
          ["Dependencies identified", "Catches forgotten dependencies"],
          ["Technical risks documented", "Attacks hidden complexity"],
          ["Mockups available (if applicable)", "Prevents rework from visual ambiguity"],
          ["Owner assigned", "Without an owner, nobody is responsible"],
        ],
      },
      {
        type: "subheading",
        text: "User Story DoR",
      },
      {
        type: "bullets",
        items: [
          "Format: 'As [persona], I want [action], so that [benefit]'",
          "Own acceptance criteria — testable and specific",
          "Estimate ≤ 1.5 days",
          "Vertical slice — testable end to end across all layers",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The hard rule",
        text: "A US that does not meet the DoR does not enter the sprint. The TL can accept documented exceptions, but assumes the risk. The DoR is reviewed quarterly by the team.",
      },
    ],
  },
  {
    number: 2,
    title: "Slicing Strategy",
    headline: "Point 2: Slicing\n\nVertical slices.\nEach deployable independently.",
    sections: [
      {
        type: "paragraph",
        text: "Features must be cut into vertical slices — each slice crosses all layers (UI, API, data) and is independently testable. A slice that only creates a database table is not valid. A slice that delivers a visible, testable behaviour is.",
      },
      {
        type: "subheading",
        text: "Slicing techniques",
      },
      {
        type: "comparison",
        headers: ["Technique", "When to use"],
        rows: [
          ["By CRUD operation", "Entity management features"],
          ["By persona/role", "Features with different behaviour per profile"],
          ["By business rule variation", "Features with multiple scenarios/conditions"],
          ["Happy path first", "Start with the main scenario, handle edge cases later"],
          ["By platform/channel", "Multi-channel features"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Anti-pattern",
        text: "Slices cannot be purely technical. 'Create database table' or 'Add API endpoint' without a corresponding UI or user-visible behaviour is not a valid slice. Each slice must deliver testable value.",
      },
    ],
  },
  {
    number: 3,
    title: "Prioritisation and Dependencies",
    headline: "Points 3+4\n\nWhat to do first.\nWhat depends on what.",
    sections: [
      {
        type: "subheading",
        text: "Prioritisation factors",
      },
      {
        type: "comparison",
        headers: ["Factor", "Description"],
        rows: [
          ["Business value", "Impact for the user/business"],
          ["Urgency", "External deadlines, stakeholder commitments"],
          ["Dependencies", "US that unblocks other US has priority"],
          ["Technical risk", "High-risk US should be tackled early"],
          ["Director directives", "Strategic priorities that override"],
        ],
      },
      {
        type: "subheading",
        text: "Dependency management",
      },
      {
        type: "bullets",
        items: [
          "Dependencies are identified during refinement and recorded in the ADO work item",
          "Each dependency has an owner and is tracked with escalation up to 24h",
          "Types: external (other teams) and infrastructure",
          "Dependencies discovered during development indicate insufficient refinement",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Prioritisation rule",
        text: "The backlog is always ordered. The team pulls from the top. Urgent requests mid-iteration do not interrupt — they move up in the ranking to be next. The PO has the final decision but must justify it to the team.",
      },
    ],
  },
];

/* ─── Module 3: During Development ──────────────────────────────────────── */

const loomModule3: Slide[] = [
  {
    number: 1,
    title: "Branching Strategy",
    headline: "Point 5: Branching\n\nFeature branches.\nwip/ per US.\nCR on every merge.",
    sections: [
      {
        type: "code",
        language: "text",
        code: "main ────────────────────────────────── (always deployable)\n  └── feature/FEAT-123 ────────────────\n        ├── wip/US-456-login ──► merge (CR ✅) ─►┐\n        └── wip/US-457-error ──► merge (CR ✅) ─►┘\n                                                  └──► PR ──► main",
        caption: "Branch structure",
      },
      {
        type: "bullets",
        items: [
          "Branch always born from main — never from another feature",
          "Owner keeps branch updated daily (rebase/merge from main)",
          "Code review mandatory on every merge (wip → feature and feature → main)",
          "No deployment on Fridays (except critical hotfixes)",
          "Branch deleted automatically after merge",
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Naming convention",
        text: "Feature branches: feature/FEAT-<id>\nWork branches: wip/<US-id>-<short-description>\nHotfix branches: hotfix/<id>-<description>",
      },
    ],
  },
  {
    number: 2,
    title: "Ownership Strategy",
    headline: "Point 6: Ownership\n\nOne owner per feature.\nOne owner per US.\nEnd to end.",
    sections: [
      {
        type: "paragraph",
        text: "The owner is also a developer — they have all standard developer responsibilities plus additional ones. Ownership is assigned during planning/refinement and does not change during the sprint except by TL decision.",
      },
      {
        type: "comparison",
        headers: ["Responsibility", "Developer vs Owner"],
        rows: [
          ["Implement and test", "Both"],
          ["Code review", "Both"],
          ["Feature coherence (all US converge)", "Owner only"],
          ["Coordinate with BA for QA validation", "Owner only"],
          ["Validate in QA with BA/QA", "Owner only"],
          ["Merge to main after QA validation", "Owner only"],
          ["Add version tag in ADO after PROD deploy", "Owner only"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Key principle",
        text: "The owner can ask for help, but responsibility remains theirs. If the owner becomes unavailable, the TL assumes ownership. The owner does not delegate — they coordinate.",
      },
    ],
  },
  {
    number: 3,
    title: "Environments and Gates",
    headline: "Points 7+8\n\nDEV → INT → QA → PROD\nWith explicit gates.",
    sections: [
      {
        type: "comparison",
        headers: ["Environment", "Purpose and rules"],
        rows: [
          ["DEV", "Developer testing. Feature branch deployed. EXCLUSIVE — only one feature at a time. TL arbitrates."],
          ["INT", "Integration testing. Main branch (via PR merge). Developer + team validate."],
          ["QA", "Functional validation. BA + QA validate against acceptance criteria. Manual promotion from INT."],
          ["PROD", "Production. PO/BA must explicitly approve. No Friday deployments."],
        ],
      },
      {
        type: "subheading",
        text: "Validation gates",
      },
      {
        type: "comparison",
        headers: ["Gate", "Who validates and criteria"],
        rows: [
          ["DEV → INT", "Developer owner: unit tests pass, functionality implemented, CR approved"],
          ["INT → QA", "Developer + TL: integration OK, no regressions, feature complete"],
          ["QA → PROD", "Owner + BA + QA + PO: acceptance criteria validated, owner validates in QA, PO approves"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The gate rule",
        text: "No environment promotion without meeting all gate criteria. Bugs found in QA are fixed by the owner and re-validated. The PO/BA has veto power on the PROD gate.",
      },
    ],
  },
  {
    number: 4,
    title: "The Board",
    headline: "Point 9: Board\n\nThe board is the\nsource of truth.",
    sections: [
      {
        type: "paragraph",
        text: "The board uses Feature as the grouping unit and User Story as the work unit. It is managed in Azure DevOps Boards and is the single source of truth for work status.",
      },
      {
        type: "subheading",
        text: "US workflow states",
      },
      {
        type: "comparison",
        headers: ["State", "Meaning"],
        rows: [
          ["New", "US created, not started"],
          ["Active", "In active development"],
          ["Resolved", "Development complete, ready for validation"],
          ["Closed", "Validated and accepted"],
        ],
      },
      {
        type: "bullets",
        items: [
          "The owner keeps the US state updated on the board",
          "A Feature is only 'Done' when ALL its US are 'Done'",
          "The daily standup uses the board as the base — each member reports on their US",
        ],
      },
    ],
  },
];

/* ─── Module 4: When Things Go Wrong ────────────────────────────────────── */

const loomModule4: Slide[] = [
  {
    number: 1,
    title: "Blocked Work Policy",
    headline: "Point 10: Blocked\n\nCommunicate immediately.\nEscalate in 24 hours.",
    sections: [
      {
        type: "paragraph",
        text: "When work is blocked, the owner moves the US to 'Blocked' on the board immediately — do not wait for the daily standup. If the block is not resolved within 24 hours, the owner and TL escalate together.",
      },
      {
        type: "comparison",
        headers: ["Block type", "Action"],
        rows: [
          ["External team dependency", "TL contacts the other team"],
          ["Environment/infrastructure down", "Report to infra team"],
          ["Pending stakeholder decision", "Contact directly; escalate if no response"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The blocked developer rule",
        text: "A blocked developer picks up another US from the same feature, or tackles tech debt (Point 12). Never sit idle. The blocked US stays in the sprint but the delivery expectation is adjusted.",
      },
    ],
  },
  {
    number: 2,
    title: "Emergency Policy",
    headline: "Point 11: Emergencies\n\nCritical production bugs only.\nPO or Director declares.",
    sections: [
      {
        type: "code",
        language: "text",
        code: "PO/Director declares emergency\n  → TL assigns developer\n    → Branch: hotfix/<id>-<description>\n      → Fix implemented\n        → PR + CR mandatory\n          → Merge to main\n            → Deploy: DEV → INT → QA → PROD",
        caption: "Emergency flow",
      },
      {
        type: "bullets",
        items: [
          "Code review remains mandatory — even in emergencies",
          "The 'no Friday deploy' rule holds — even for emergencies",
          "No SLA formal and no mandatory post-mortem",
          "The hotfix does not skip environments — full pipeline always",
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Tech Debt and Engineering Tasks",
    headline: "Points 12+13\n\nTech debt when idle.\nEngineering tasks with budget.",
    sections: [
      {
        type: "paragraph",
        text: "Tech debt and engineering tasks are both valid work, but they enter the workflow differently and have different triggers.",
      },
      {
        type: "comparison",
        headers: ["Aspect", "Tech Debt (Point 12) vs Engineering BE (Point 13)"],
        rows: [
          ["What it is", "Remediate existing problems vs Build/improve technical capabilities"],
          ["When to do it", "When developers are idle vs Reserved budget in sprint capacity"],
          ["PO/BA approval", "Not needed vs Required (with technical justification)"],
          ["Validation", "Developer + TL vs TL only"],
          ["How it enters", "Any developer creates US under 'Tech Debt' feature vs Enters unified backlog"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Protection against neglect",
        text: "Engineering tasks have a reserved budget to prevent perpetual postponement. Tech debt is tackled opportunistically — when developers are between features or blocked. Security-related debt escalates to the emergency flow.",
      },
    ],
  },
];

/* ─── Module 5: Continuous Improvement ──────────────────────────────────── */

const loomModule5: Slide[] = [
  {
    number: 1,
    title: "Versioning Policy",
    headline: "Point 14: Versions\n\nSemantic Versioning.\nGit tags. ADO tags.",
    sections: [
      {
        type: "comparison",
        headers: ["Component", "When it increments"],
        rows: [
          ["MAJOR", "Breaking changes — alterations that break compatibility"],
          ["MINOR", "New feature delivered to PROD"],
          ["PATCH", "Bugfix / hotfix in PROD"],
        ],
      },
      {
        type: "code",
        language: "text",
        code: "Feature merged → Deploy INT → Validate QA\n  → Deploy PROD (PO/BA approves)\n    → Git tag: v2.11.0 (created by pipeline)\n    → ADO tag: '2.11.0' (added by owner/BA)\n    → Version published",
        caption: "Versioning flow",
      },
      {
        type: "bullets",
        items: [
          "Rollback = revert the merge + redeploy the previous version (previous tag)",
          "INT/QA environments run head of main (ahead of PROD)",
          "No changelog — traceability via ADO tags",
          "The revert generates a new PATCH tag",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Agent Workflow",
    headline: "Point 15: Agents\n\nOne agent per scope.\nExplicit handoffs.\nSeparate review.",
    sections: [
      {
        type: "paragraph",
        text: "AI coding agents work in parallel with developers, but with strict scope boundaries. The feature owner maintains final responsibility. Each agent receives a delimited scope and must not exceed it.",
      },
      {
        type: "code",
        language: "text",
        code: "Goal:\nScope:\nBranch:\nFiles in scope:\nAcceptance criteria:\nKnown blockers:\nExpected output:\nStop condition:",
        caption: "Agent handoff template",
      },
      {
        type: "comparison",
        headers: ["Loom v2 point", "Relation to agents"],
        rows: [
          ["Branching (Point 5)", "Branches and PRs remain the integration mechanism"],
          ["Ownership (Point 6)", "The feature owner maintains final responsibility"],
          ["Slicing (Point 2)", "Slicing defines the scopes that can be assigned to agents"],
          ["Blocked Work (Point 10)", "Blocks follow the same escalation process"],
          ["Validation (Point 8)", "Validation passes through the normal gates"],
          ["Versioning (Point 14)", "Merge/release follows the versioning policy"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "The agent rule",
        text: "If there is file overlap between two agent scopes, the owner arbitrates the order. The agent's output must include: files changed, risks identified, and tests run. Review is always separate from implementation.",
      },
    ],
  },
  {
    number: 3,
    title: "Onboarding",
    headline: "Point 16: Onboarding\n\nStructured.\nDays to autonomy.\nDocs replace tribal knowledge.",
    sections: [
      {
        type: "paragraph",
        text: "New team members go through structured onboarding with the Loom v2 documents as the foundation. The goal: autonomy in days, not weeks. The documents eliminate the dependency on tribal knowledge.",
      },
      {
        type: "subheading",
        text: "Onboarding checklist",
      },
      {
        type: "bullets",
        items: [
          "1. Read this course — all 5 modules",
          "2. Read Points 1 (DoR), 5 (Branching), and 6 (Ownership) in detail",
          "3. Shadow the owner of an active feature during the first days",
          "4. Ask questions to the TL or any team member",
          "5. Technical onboarding (stack, architecture) is separate from model onboarding",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The onboarding principle",
        text: "The Loom v2 documents make onboarding self-serve. A new member can understand the operational model by reading the docs — they do not need weeks of shadowing to learn 'how things work here'. The docs are the single source of truth for the model.",
      },
    ],
  },
  {
    number: 4,
    title: "What changes now",
    headline: "Starting today\n\nFive actions.\nImmediate.",
    sections: [
      {
        type: "comparison",
        headers: ["Action", "Who and when"],
        rows: [
          ["Apply DoR in the next refinement", "BA + TL — next refinement session"],
          ["Create feature branches for active US", "Developers — this week"],
          ["Assign owners to all sprint US", "TL — this week"],
          ["Move blocked work to the Blocked column", "Owners — immediately"],
          ["Validate in QA with developer owner present", "Owner + BA — next validation"],
        ],
      },
      {
        type: "quote",
        text: "Finishing one User Story is worth more\nthan starting three.",
      },
    ],
  },
];

/* ─── Export all Loom modules ───────────────────────────────────────────── */

export const loomModules: CourseModule[] = [
  {
    id: 1,
    slug: "the-why",
    label: "Module 1",
    title: "The Why — from batch delivery to continuous flow",
    description:
      "Understand the problem Loom v2 solves, the 8 principles, and the 16-point model that covers the entire lifecycle of work.",
    keyMessage:
      "Finishing one User Story is worth more than starting three. The focus is production, not new work.",
    slides: loomModule1,
  },
  {
    id: 2,
    slug: "before-you-build",
    label: "Module 2",
    title: "Before you build — DoR, Slicing, Prioritisation",
    description:
      "The preparation phase. Definition of Ready, vertical slicing techniques, prioritisation criteria, and dependency management.",
    keyMessage:
      "A feature only enters BUILD when it meets all DoR criteria. Slices must be vertical, testable, and deliverable independently.",
    slides: loomModule2,
  },
  {
    id: 3,
    slug: "during-development",
    label: "Module 3",
    title: "During development — Branching, Ownership, Environments, Validation",
    description:
      "The execution phase. How branches work, who owns what, environment pipeline, validation gates, and board management.",
    keyMessage:
      "One owner per feature. CR on every merge. No environment promotion without meeting gate criteria.",
    slides: loomModule3,
  },
  {
    id: 4,
    slug: "when-things-go-wrong",
    label: "Module 4",
    title: "When things go wrong — Blocked work, Emergencies, Tech debt",
    description:
      "What to do when work is blocked, production has a critical bug, or tech debt needs attention.",
    keyMessage:
      "Blocked work is escalated in 24h. A blocked developer tackles tech debt. Hotfixes never skip environments.",
    slides: loomModule4,
  },
  {
    id: 5,
    slug: "continuous-improvement",
    label: "Module 5",
    title: "Continuous improvement — Versioning, Agents, Onboarding",
    description:
      "Versioning policy, AI agent workflow integration, and structured onboarding for new team members.",
    keyMessage:
      "Semantic versioning on every PROD deploy. Agents work with delimited scopes and explicit handoffs. Docs replace tribal knowledge.",
    slides: loomModule5,
  },
];

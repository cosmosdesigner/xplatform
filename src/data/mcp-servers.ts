import type { Slide, CourseModule, ContentBlock } from "./course";

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 1 — Understanding MCP
   ═══════════════════════════════════════════════════════════════════════════ */

const module1Slides: Slide[] = [
  {
    number: 1,
    title: "What is MCP and why it exists",
    headline: "USB-C\nfor AI\napplications.",
    sections: [
      {
        type: "paragraph",
        text: "MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. Just as USB-C provides a standardised way to connect electronic devices, MCP provides a standardised way to connect AI applications to data sources, tools, and workflows.",
      },
      {
        type: "subheading",
        text: "The problem MCP solves",
      },
      {
        type: "paragraph",
        text: "Before MCP, every AI application had to build custom integrations for every external system. Want to connect Claude to Azure DevOps? Write a custom integration. Want to add Figma? Another custom integration. Each one is different, brittle, and maintained separately. MCP standardises this: build one server per system, and every MCP-compatible AI application can use it.",
      },
      {
        type: "bullets",
        items: [
          "Claude, ChatGPT, VS Code Copilot, Cursor, and many others all support MCP",
          "Build once, integrate everywhere — one server works with all compatible clients",
          "Open protocol with SDKs for TypeScript, Python, Java, Kotlin, and C#",
          "Supported by Anthropic, OpenAI, Microsoft, and a growing ecosystem",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why this matters for enterprise",
        text: "Teams have dozens of external systems: GitHub repos, project boards, internal APIs, databases, design tools, CI pipelines. MCP means you can expose any of them to AI agents through a standard protocol — without building custom integrations per agent tool.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Architecture: Host, Client, Server",
    headline: "Three participants.\nOne protocol.",
    sections: [
      {
        type: "paragraph",
        text: "MCP follows a client-server architecture where an MCP host (the AI application) creates MCP clients that connect to MCP servers. Each client maintains a dedicated connection to one server.",
      },
      {
        type: "comparison",
        headers: ["Participant", "Role"],
        rows: [
          ["MCP Host", "The AI application (Claude Code, VS Code, Cursor) that coordinates one or more MCP clients"],
          ["MCP Client", "A component within the host that maintains a connection to one MCP server. The host creates one client per server."],
          ["MCP Server", "A program that provides context to clients — exposes tools, resources, and prompts. Can be local (subprocess) or remote (HTTP)."],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Key distinction",
        text: "'MCP server' refers to the program that serves context data, regardless of where it runs. A server can be a local subprocess on your machine (stdio transport) or a remote HTTP service. The @modelcontextprotocol/server-github server, for example, runs as a local subprocess spawned by npx.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "The three primitives",
    headline: "Tools.\nResources.\nPrompts.",
    sections: [
      {
        type: "paragraph",
        text: "MCP defines three core primitives that servers can expose. Each has a different interaction model and serves a different purpose. Understanding which primitive to use for what is the key design decision when building an MCP server.",
      },
      {
        type: "comparison",
        headers: ["Primitive", "How it works"],
        rows: [
          ["Tools", "Model-controlled. Executable functions the LLM can invoke to perform actions — API calls, database queries, file operations. The LLM decides when to call them based on context and user intent."],
          ["Resources", "Application-controlled. Data sources that provide context — file contents, database schemas, API responses. The host application decides when to load them, not the model."],
          ["Prompts", "User-controlled. Reusable message templates that structure interactions — code review prompts, analysis templates. The user explicitly selects them (e.g., slash commands)."],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "The design principle",
        text: "Use tools when the LLM should decide (querying an API based on user intent). Use resources when the application should decide (loading a database schema for context). Use prompts when the user should decide (choosing a code review template).",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "How LLMs use MCP tools",
    headline: "Discover.\nSelect.\nInvoke.\nProcess.",
    sections: [
      {
        type: "paragraph",
        text: "When an AI application connects to an MCP server, the lifecycle follows four phases. Understanding this lifecycle is essential for building servers that work well with LLMs.",
      },
      {
        type: "code",
        caption: "1. Discovery — the client lists available tools",
        code: "// Client sends:\n{ \"method\": \"tools/list\" }\n\n// Server responds with tool metadata:\n{\n  \"tools\": [{\n    \"name\": \"get_post\",\n    \"description\": \"Get a blog post by ID from JSONPlaceholder\",\n    \"inputSchema\": {\n      \"type\": \"object\",\n      \"properties\": {\n        \"id\": { \"type\": \"number\", \"description\": \"Post ID (1-100)\" }\n      },\n      \"required\": [\"id\"]\n    }\n  }]\n}",
      },
      {
        type: "paragraph",
        text: "The LLM reads the tool names, descriptions, and schemas. It uses this information to decide which tool to call and with what arguments. This is why good descriptions are critical — they are the LLM's only information about what a tool does.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Trust and safety",
        text: "There should ALWAYS be a human in the loop with the ability to deny tool invocations. Applications should provide UI that shows which tools are exposed, insert visual indicators when tools are called, and present confirmation prompts for sensitive operations.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Transports: stdio vs Streamable HTTP",
    headline: "Local subprocess\nor remote service.\nYou choose.",
    sections: [
      {
        type: "comparison",
        headers: ["stdio transport", "Streamable HTTP transport"],
        rows: [
          ["Client launches server as a subprocess", "Server runs independently, handles multiple clients"],
          ["Communication via stdin/stdout", "Communication via HTTP POST + Server-Sent Events"],
          ["No network overhead, fastest option", "Supports remote deployment and scaling"],
          ["One client per server instance", "Many clients per server instance"],
          ["Server must not write to stdout (except MCP messages)", "Standard logging is fine"],
          ["Best for: dev tools, local integrations", "Best for: shared services, cloud deployment"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Start with stdio",
        text: "Always start with stdio transport. It's simpler, faster, and works with every MCP client. Move to Streamable HTTP only when you need remote access, multiple clients, or cloud deployment. The protocol is the same — only the transport layer changes.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "JSON-RPC 2.0 under the hood",
    headline: "The wire\nprotocol.",
    sections: [
      {
        type: "paragraph",
        text: "MCP uses JSON-RPC 2.0 as its message format. Every interaction — tool calls, resource reads, prompt gets — is a JSON-RPC request/response pair. You rarely write raw JSON-RPC (the SDK handles it), but understanding the format helps with debugging.",
      },
      {
        type: "code",
        caption: "A complete tool call exchange",
        code: "// Request (client → server)\n{\n  \"jsonrpc\": \"2.0\",\n  \"id\": 3,\n  \"method\": \"tools/call\",\n  \"params\": {\n    \"name\": \"get_weather\",\n    \"arguments\": { \"location\": \"San Francisco\" }\n  }\n}\n\n// Response (server → client)\n{\n  \"jsonrpc\": \"2.0\",\n  \"id\": 3,\n  \"result\": {\n    \"content\": [{\n      \"type\": \"text\",\n      \"text\": \"68°F, partly cloudy, winds 8 mph\"\n    }]\n  }\n}",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Capability negotiation",
        text: "During initialisation, client and server exchange capabilities — which primitives they support, whether they emit change notifications, etc. This handshake ensures both sides know what the other can do before any real work begins.",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Exercise: inspect an MCP server",
    headline: "Your turn.\nSee MCP\nin action.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Explore an existing MCP server",
        text: "Use the MCP Inspector (https://github.com/modelcontextprotocol/inspector) to inspect a running MCP server.\n\n1. Install: npx @modelcontextprotocol/inspector\n2. Connect to a server (try the filesystem server: npx -y @modelcontextprotocol/server-filesystem /tmp)\n3. List available tools — what tools does it expose?\n4. List resources — what data can you access?\n5. Call a tool — try reading a file\n6. Observe the JSON-RPC messages in the inspector\n\nQuestions to answer:\n- How many tools does the server expose?\n- What are the input schemas? Are the descriptions helpful for an LLM?\n- What happens when you call a tool with invalid arguments?\n\nTime: 20 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 2 — Building Your First MCP Server
   ═══════════════════════════════════════════════════════════════════════════ */

const module2Slides: Slide[] = [
  {
    number: 1,
    title: "Project setup with TypeScript SDK",
    headline: "From zero\nto MCP server\nin 5 minutes.",
    sections: [
      {
        type: "code",
        caption: "Setting up a TypeScript MCP server project",
        code: "# Create project\nmkdir my-mcp-server && cd my-mcp-server\nnpm init -y\n\n# Install MCP SDK and Zod for schema validation\nnpm install @modelcontextprotocol/sdk zod@3\nnpm install -D @types/node typescript\n\n# Create source directory\nmkdir src && touch src/index.ts\n\n# Add to package.json:\n# \"type\": \"module\"\n# \"scripts\": { \"build\": \"tsc\" }\n# \"bin\": { \"my-server\": \"./build/index.js\" }",
      },
      {
        type: "code",
        caption: "Minimal server (src/index.ts)",
        code: "import { McpServer } from \"@modelcontextprotocol/sdk/server/mcp.js\";\nimport { StdioServerTransport } from \"@modelcontextprotocol/sdk/server/stdio.js\";\n\nconst server = new McpServer({\n  name: \"my-server\",\n  version: \"1.0.0\",\n});\n\n// Register tools here...\n\nasync function main() {\n  const transport = new StdioServerTransport();\n  await server.connect(transport);\n  console.error(\"MCP server running on stdio\");\n}\n\nmain().catch(console.error);",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Critical: never use console.log()",
        text: "For stdio servers, NEVER write to stdout with console.log(). It corrupts the JSON-RPC messages and breaks the server. Use console.error() for logging — it writes to stderr, which is safe.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Defining tools with Zod schemas",
    headline: "Type-safe tools\nwith automatic\nschema generation.",
    sections: [
      {
        type: "code",
        caption: "Registering a tool with Zod schema validation",
        code: "import { z } from \"zod\";\n\nserver.registerTool(\n  \"get_post\",\n  {\n    description: \"Get a blog post by ID from JSONPlaceholder. Returns title, body, and author userId.\",\n    inputSchema: {\n      id: z.number().min(1).max(100)\n        .describe(\"The post ID (1-100)\"),\n    },\n  },\n  async ({ id }) => {\n    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);\n    if (!res.ok) return { content: [{ type: \"text\", text: `Post ${id} not found` }], isError: true };\n    const post = await res.json();\n    return {\n      content: [{\n        type: \"text\",\n        text: `Post ${id}: ${post.title}\\n\\n${post.body}`,\n      }],\n    };\n  }\n);",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The description is everything",
        text: "The tool name, description, and parameter descriptions are the ONLY information the LLM has to decide whether and how to use your tool. Write them for the model, not for humans. Be specific: 'Get a blog post by ID from JSONPlaceholder' is better than 'Get post'. Include examples and ranges in descriptions: 'Post ID (1-100)'.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Implementing tool handlers",
    headline: "The handler\nis where the\nreal work happens.",
    sections: [
      {
        type: "paragraph",
        text: "Tool handlers are async functions that receive validated arguments and return content. They can make API calls, query databases, read files, or perform any operation. The handler must always return a result with a content array.",
      },
      {
        type: "code",
        caption: "A complete tool handler with error handling",
        code: "server.registerTool(\n  \"search_posts\",\n  {\n    description: \"Search blog posts by user ID. Returns up to 10 posts. Use get_post for full details.\",\n    inputSchema: {\n      userId: z.number().min(1).max(10)\n        .describe(\"Author's user ID (1-10)\"),\n    },\n  },\n  async ({ userId }) => {\n    try {\n      const res = await fetch(\n        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`\n      );\n      if (!res.ok) {\n        return {\n          content: [{ type: \"text\", text: `Failed to search posts: ${res.status}` }],\n          isError: true,\n        };\n      }\n      const posts = await res.json();\n      const summary = posts.map((p: any) => `#${p.id}: ${p.title}`).join(\"\\n\");\n      return {\n        content: [{\n          type: \"text\",\n          text: `${posts.length} posts by user ${userId}:\\n${summary}`,\n        }],\n      };\n    } catch (error: any) {\n      return {\n        content: [{ type: \"text\", text: `Error: ${error.message}` }],\n        isError: true,\n      };\n    }\n  }\n);",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Always handle errors gracefully",
        text: "Return isError: true for tool execution errors (API failures, invalid data). The LLM can read the error message and decide whether to retry, try a different approach, or report to the user. Never let unhandled exceptions crash the server.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Tool output types",
    headline: "Text, images,\nresources,\nstructured data.",
    sections: [
      {
        type: "paragraph",
        text: "Tool results return a content array that can contain multiple items of different types. This enables rich responses that combine text explanations with structured data, images, or links to resources.",
      },
      {
        type: "comparison",
        headers: ["Content type", "When to use"],
        rows: [
          ["text", "Most common — plain text results, formatted output, error messages"],
          ["image", "Screenshots, charts, diagrams — base64 encoded with MIME type"],
          ["resource_link", "Reference to a resource the client can fetch later (e.g., file path, URL)"],
          ["resource (embedded)", "Inline resource content — useful for returning file contents directly"],
          ["structuredContent", "JSON objects with an outputSchema — enables strict validation by clients"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Structured output with outputSchema",
        text: "If your tool returns structured data, define an outputSchema. This tells the LLM exactly what fields to expect and enables client-side validation. For backwards compatibility, also include the JSON as a text content block.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Adding resources",
    headline: "Expose data\nfor context,\nnot for action.",
    sections: [
      {
        type: "paragraph",
        text: "Resources provide contextual data that AI applications can use to enrich the LLM's understanding. Unlike tools (which perform actions), resources are passive data sources — file contents, database schemas, configuration files.",
      },
      {
        type: "code",
        caption: "Exposing API metadata as a resource",
        code: "server.resource(\n  \"api-info\",\n  \"info://jsonplaceholder\",\n  {\n    description: \"Available endpoints and data ranges for JSONPlaceholder API\",\n    mimeType: \"application/json\",\n  },\n  async (uri) => ({\n    contents: [{\n      uri: uri.href,\n      mimeType: \"application/json\",\n      text: JSON.stringify({\n        baseUrl: \"https://jsonplaceholder.typicode.com\",\n        endpoints: [\n          { path: \"/posts\", count: 100, description: \"Blog posts\" },\n          { path: \"/comments\", count: 500, description: \"Post comments\" },\n          { path: \"/users\", count: 10, description: \"User profiles\" },\n          { path: \"/todos\", count: 200, description: \"TODO items\" },\n        ],\n      }, null, 2),\n    }],\n  })\n);",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Resources vs tools",
        text: "Use a resource when the data is static context (a schema, a config file, documentation). Use a tool when the data requires dynamic input (querying a specific record, searching with parameters). If the LLM needs to choose WHAT to fetch, it's a tool. If the application preloads it for context, it's a resource.",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Adding prompts",
    headline: "Reusable templates\nfor common tasks.",
    sections: [
      {
        type: "paragraph",
        text: "Prompts are pre-written templates that help users accomplish specific tasks. They're exposed as slash commands or menu items in the AI application. Users explicitly select them — the LLM doesn't choose prompts on its own.",
      },
      {
        type: "code",
        caption: "A code review prompt template",
        code: "server.prompt(\n  \"code-review\",\n  {\n    description: \"Review code for quality, security, and best practices\",\n    arguments: [\n      {\n        name: \"code\",\n        description: \"The code to review\",\n        required: true,\n      },\n      {\n        name: \"language\",\n        description: \"Programming language (e.g., TypeScript, Python)\",\n        required: false,\n      },\n    ],\n  },\n  async ({ code, language }) => ({\n    messages: [\n      {\n        role: \"user\",\n        content: {\n          type: \"text\",\n          text: `Review this ${language ?? \"\"} code for bugs, security issues, and improvements:\\n\\n${code}`,\n        },\n      },\n    ],\n  })\n);",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Testing with MCP Inspector",
    headline: "Debug before\nyou deploy.",
    sections: [
      {
        type: "paragraph",
        text: "The MCP Inspector is a developer tool that lets you connect to any MCP server, list its capabilities, call tools, read resources, and see the raw JSON-RPC messages. Use it to verify your server works correctly before connecting it to an AI application.",
      },
      {
        type: "code",
        caption: "Connecting to Claude Desktop",
        code: "// claude_desktop_config.json (or opencode.json)\n{\n  \"mcpServers\": {\n    \"my-server\": {\n      \"command\": \"node\",\n      \"args\": [\"/absolute/path/to/build/index.js\"]\n    }\n  }\n}\n\n// Common pitfalls:\n// 1. Path must be ABSOLUTE, not relative\n// 2. Run 'npm run build' first! The .ts file won't work directly\n// 3. Use double backslashes on Windows: C:\\\\path\\\\to\\\\server\n// 4. Restart the AI application after changing config",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The #1 debugging mistake",
        text: "Forgetting to build (npm run build) after making changes. The config points to the compiled .js file, not your .ts source. Every change requires a rebuild and an application restart.",
      },
    ] as ContentBlock[],
  },
  {
    number: 8,
    title: "Exercise: build your first MCP server",
    headline: "Your turn.\nBuild it.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Build a JSONPlaceholder MCP server",
        text: "Build an MCP server that wraps the free JSONPlaceholder API (https://jsonplaceholder.typicode.com).\n\nTools to implement:\n1. get_post — get a blog post by ID (1-100)\n2. search_posts — list posts by user ID (1-10)\n3. get_comments — get comments for a post by post ID\n4. get_user — get user profile by ID (1-10)\n\nResources to implement:\n1. An 'api-info' resource listing all available endpoints and data ranges\n\nPrompt to implement:\n1. A 'summarise-user' prompt that takes a user ID and asks the LLM to fetch their posts and summarise their writing style\n\nRequirements:\n- Use TypeScript SDK (@modelcontextprotocol/sdk) with Zod schemas\n- Handle errors gracefully (isError: true for invalid IDs, 404s)\n- Write tool descriptions that help the LLM choose correctly\n- Test with MCP Inspector (npx @modelcontextprotocol/inspector)\n\nNo API key needed — JSONPlaceholder is free and public.\n\nTime: 45 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 3 — Real-World MCP Patterns
   ═══════════════════════════════════════════════════════════════════════════ */

const module3Slides: Slide[] = [
  {
    number: 1,
    title: "Real-world MCP: GitHub server case study",
    headline: "A real production\nMCP server\nused by thousands.",
    sections: [
      {
        type: "paragraph",
        text: "The @modelcontextprotocol/server-github is a real production MCP server used by thousands of developers. It exposes tools for managing repositories, issues, pull requests, branches, and files. Understanding its design patterns teaches you how to build production-grade MCP servers.",
      },
      {
        type: "comparison",
        headers: ["Capability", "What it exposes"],
        rows: [
          ["Repositories", "Search repos, get repo details, list contents, read files"],
          ["Issues", "Create, read, update, list, comment, label, assign"],
          ["Pull Requests", "Create, read, merge, list reviews, request reviewers"],
          ["Branches", "Create, list, get protection rules"],
          ["Files", "Read, create, update file contents via the Contents API"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Tool naming convention",
        text: "The GitHub MCP server prefixes tools descriptively (e.g., search_repositories, create_issue, get_file_contents). This namespacing prevents collisions when multiple MCP servers are connected. Follow this pattern: prefix your tools with your server name or domain.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Authentication patterns",
    headline: "Secure by default.\nNo credentials\nin code.",
    sections: [
      {
        type: "comparison",
        headers: ["Method", "When to use"],
        rows: [
          ["Personal Access Token (PAT)", "GitHub — generate in Settings > Developer Settings > Personal access tokens. Store in environment variable, never in config files."],
          ["CLI authentication", "GitHub CLI ('gh auth login') — uses your existing session. Most secure for GitHub."],
          ["OAuth 2.0", "Figma, Google services, web APIs. Use the OAuth flow, store refresh tokens securely."],
          ["API Key", "Custom internal APIs, simple services. Environment variable only."],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The security rule",
        text: "MCP authentication tokens and API keys must NEVER be stored in project files, AGENTS.md, config files checked into git, or any version-controlled location. Use environment variables or your OS credential store. If a token appears in a commit, rotate it immediately.",
      },
      {
        type: "code",
        caption: "Reading credentials from environment",
        code: "// In your MCP server:\nconst token = process.env.API_TOKEN;\nif (!token) {\n  throw new Error(\"API_TOKEN environment variable is required\");\n}\n\n// In opencode.json / claude_desktop_config.json:\n{\n  \"mcpServers\": {\n    \"my-server\": {\n      \"command\": \"node\",\n      \"args\": [\"./build/index.js\"],\n      \"environment\": {\n        \"API_TOKEN\": \"${env:API_TOKEN}\"  // Reference env var, don't hardcode\n      }\n    }\n  }\n}",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Read-before-write safety",
    headline: "The 6-step\nwrite precondition.",
    sections: [
      {
        type: "paragraph",
        text: "In enterprise MCP servers, every write operation must follow a strict read-before-write protocol. This prevents overwriting human changes, creating duplicates, and producing data that conflicts with the current system state.",
      },
      {
        type: "code",
        caption: "The enterprise write precondition",
        code: "Before any MCP write, the server MUST:\n\n1. IDENTIFY — the operation, target artifact, fields, and links\n2. READ — current remote content, state, links, and revision\n3. COMPARE — current content against the intended update\n4. DETECT — conflicts: stale revisions, duplicates, invalid states\n5. PATCH — use narrow field updates, not full-document replacement\n6. FAIL — return 'conflict' or 'blocked' when preconditions fail",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Patch, don't replace",
        text: "Always use narrow, field-level updates. If you need to update the labels on an issue, read the current labels, compute the diff, and patch only the labels. Never send a full issue replacement — you'll overwrite changes made by other contributors between your read and write.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Designing tool descriptions",
    headline: "The description\nis the LLM's\nonly information.",
    sections: [
      {
        type: "paragraph",
        text: "When an LLM receives a list of available tools, it reads the name, description, and input schema to decide which tool to call. Poorly described tools lead to wrong tool selection, incorrect arguments, and failed operations. Good descriptions are the single most important factor in tool usability.",
      },
      {
        type: "comparison",
        headers: ["Bad description", "Good description"],
        rows: [
          ["'Get item'", "'Get a blog post by its numeric ID (1-100). Returns title, body text, and author userId.'"],
          ["'Search'", "'Search posts by author userId (1-10). Returns up to 10 matching posts with ID and title. Use get_post for full body text.'"],
          ["'Get details'", "'Get all comments on a post by post ID. Returns commenter name, email, and comment body. Use search_posts first to find post IDs.'"],
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Description checklist",
        text: "Every tool description should answer:\n1. What does this tool DO? (action verb + target)\n2. What does it RETURN? (what the LLM will see)\n3. What are the CONSTRAINTS? (limits, formats, required context)\n4. How does it RELATE to other tools? (use X for Y, then Z for details)",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Error handling patterns",
    headline: "Two error types.\nDon't confuse them.",
    sections: [
      {
        type: "comparison",
        headers: ["Protocol errors", "Tool execution errors"],
        rows: [
          ["JSON-RPC error in the response", "isError: true in the tool result"],
          ["Unknown tool, invalid arguments, server crash", "API failure, invalid input data, business logic error"],
          ["Client handles: logs, retries, reports", "LLM handles: reads message, decides next action"],
          ["HTTP-style codes: -32602 (invalid params)", "Your message: 'Work item 999 not found'"],
        ],
      },
      {
        type: "callout",
        variant: "rule",
        title: "Tool errors should help the LLM recover",
        text: "When a tool fails, the error message should tell the LLM what went wrong AND what to do about it. Bad: 'Error 404'. Good: 'Post 999 not found. Valid IDs are 1-100. Use search_posts to find posts by a specific author.'",
      },
    ] as ContentBlock[],
  },
  {
    number: 6,
    title: "Notifications and dynamic tools",
    headline: "Tools can change.\nThe client\nneeds to know.",
    sections: [
      {
        type: "paragraph",
        text: "MCP supports real-time notifications. When your server's available tools change — new tools added, existing tools modified, tools temporarily unavailable — you can notify connected clients so they refresh their tool list.",
      },
      {
        type: "code",
        caption: "Declaring and sending notifications",
        code: "// During initialisation, declare capability:\n{\n  \"capabilities\": {\n    \"tools\": { \"listChanged\": true }\n  }\n}\n\n// When tools change, send notification:\n{\n  \"jsonrpc\": \"2.0\",\n  \"method\": \"notifications/tools/list_changed\"\n}\n\n// Client receives notification → calls tools/list again\n// → gets updated tool list → LLM sees new capabilities",
      },
      {
        type: "callout",
        variant: "insight",
        title: "When to use notifications",
        text: "Use tool change notifications when your server's capabilities depend on external state — e.g., database tables that can be created/dropped, API endpoints that come and go, or tools that are only available during certain hours.",
      },
    ] as ContentBlock[],
  },
  {
    number: 7,
    title: "Exercise: build an internal API server",
    headline: "Your turn.\nConnect to\na real API.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Build a GitHub MCP server (public API)",
        text: "Build an MCP server that wraps the GitHub public REST API (no auth needed for read-only).\n\nTools to implement:\n1. search_repos — search GitHub repos by keyword (GET /search/repositories?q=...)\n2. get_repo — get repo details by owner/name (GET /repos/{owner}/{repo})\n3. list_issues — list open issues for a repo (GET /repos/{owner}/{repo}/issues)\n\nResource to implement:\n1. An 'api-info' resource listing available endpoints and rate limits\n\nDesign decisions to make:\n- How do you handle pagination? (tool parameter vs automatic)\n- How do you format the response? (JSON vs human-readable summary)\n- What do you do when the rate limit is hit? (GitHub allows 60 req/hour without auth)\n\nRequirements:\n- Error handling with helpful messages (isError: true)\n- Tool descriptions that help the LLM choose correctly\n- Test with MCP Inspector, then connect to your AI coding agent\n\nBonus: Add optional GITHUB_TOKEN env var for authenticated access (5,000 req/hour).\n\nTime: 60 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 4 — Streamable HTTP & Remote Deployment
   ═══════════════════════════════════════════════════════════════════════════ */

const module4Slides: Slide[] = [
  {
    number: 1,
    title: "Streamable HTTP transport",
    headline: "From local\nsubprocess\nto remote service.",
    sections: [
      {
        type: "paragraph",
        text: "When you need your MCP server to be accessible remotely — shared across team members, deployed to cloud infrastructure, or serving multiple clients simultaneously — you switch from stdio to the Streamable HTTP transport. The protocol stays the same; only the transport layer changes.",
      },
      {
        type: "subheading",
        text: "How it works",
      },
      {
        type: "bullets",
        items: [
          "Server exposes a single HTTP endpoint (e.g., https://example.com/mcp)",
          "Client sends JSON-RPC messages as HTTP POST requests to this endpoint",
          "Server can respond with a single JSON object OR open an SSE stream for multiple messages",
          "Client can also GET the endpoint to open a persistent SSE stream for server-initiated messages",
          "Session management via Mcp-Session-Id header tracks client state",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Security requirements for remote servers",
        text: "When implementing Streamable HTTP:\n1. Validate the Origin header on ALL incoming connections (prevents DNS rebinding)\n2. Bind only to localhost when running locally (not 0.0.0.0)\n3. Implement proper authentication for all connections\n4. Use HTTPS in production — never expose MCP over plain HTTP",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Session management",
    headline: "Stateful connections\nacross HTTP.",
    sections: [
      {
        type: "paragraph",
        text: "HTTP is stateless, but MCP sessions are stateful. The Streamable HTTP transport bridges this gap with session IDs. The server assigns a session ID during initialisation, and the client includes it in all subsequent requests.",
      },
      {
        type: "code",
        caption: "Session lifecycle",
        code: "// 1. Client sends InitializeRequest (no session ID)\nPOST /mcp\n{ \"method\": \"initialize\", \"params\": { ... } }\n\n// 2. Server responds with session ID in header\nHTTP 200\nMcp-Session-Id: 1868a90c-...\n{ \"result\": { \"capabilities\": { ... } } }\n\n// 3. All subsequent requests include the session ID\nPOST /mcp\nMcp-Session-Id: 1868a90c-...\n{ \"method\": \"tools/call\", \"params\": { ... } }\n\n// 4. Client terminates session when done\nDELETE /mcp\nMcp-Session-Id: 1868a90c-...",
      },
      {
        type: "callout",
        variant: "rule",
        title: "Session ID security",
        text: "Session IDs should be globally unique and cryptographically secure (UUID v4 or JWT). They must only contain visible ASCII characters. If a client sends a request with an expired or unknown session ID, respond with HTTP 404 — the client will start a new session.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Resumability",
    headline: "Connections break.\nMessages shouldn't\nbe lost.",
    sections: [
      {
        type: "paragraph",
        text: "Network connections drop. Mobile devices switch networks. Servers restart. The Streamable HTTP transport supports resumability so messages aren't lost when connections break.",
      },
      {
        type: "subheading",
        text: "How resumability works",
      },
      {
        type: "bullets",
        items: [
          "Server attaches an 'id' field to each SSE event (globally unique within the session)",
          "When a connection drops, the client reconnects with GET and includes a Last-Event-ID header",
          "Server replays messages that would have been sent after the last received event",
          "Messages from other streams are NOT replayed — resumability is per-stream",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "When to implement resumability",
        text: "Resumability is optional but recommended for production servers that handle long-running operations. If your tools complete in milliseconds, simple retry logic may be sufficient. If your tools involve multi-step workflows or long computations, implement resumability.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "Deploying to the cloud",
    headline: "Container it.\nDeploy it.\nScale it.",
    sections: [
      {
        type: "paragraph",
        text: "A remote MCP server is just an HTTP server. You can deploy it anywhere you deploy web services: Azure App Service, AWS Lambda, Docker containers, Kubernetes. The server handles MCP protocol; the infrastructure handles scaling and availability.",
      },
      {
        type: "code",
        caption: "Dockerfile for an MCP server",
        code: "FROM node:20-slim\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY build/ ./build/\nEXPOSE 3000\n\n# Environment variables for auth (injected at runtime)\nENV API_TOKEN=\"\"\nENV MCP_PORT=\"3000\"\n\nCMD [\"node\", \"build/index.js\"]",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Environment configuration",
        text: "Never bake credentials into Docker images. Pass them via environment variables at runtime. Use Azure Key Vault, AWS Secrets Manager, or Kubernetes secrets for production credential management.",
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Exercise: add HTTP transport",
    headline: "Your turn.\nGo remote.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Exercise: Convert your server to Streamable HTTP",
        text: "Take the MCP server you built in Module 2 or 3 and add Streamable HTTP transport alongside stdio.\n\n1. Add an HTTP server (Express, Fastify, or built-in http module)\n2. Implement the /mcp endpoint that accepts POST and GET\n3. Handle session management (generate session ID on initialize)\n4. Return JSON for simple responses, SSE for streaming\n5. Add Origin header validation\n6. Test with MCP Inspector using the HTTP URL\n\nBonus challenges:\n- Support both stdio and HTTP transport (detect from args)\n- Add basic Bearer token authentication\n- Implement CORS headers for browser-based clients\n\nTime: 45 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 5 — Enterprise MCP Governance
   ═══════════════════════════════════════════════════════════════════════════ */

const module5Slides: Slide[] = [
  {
    number: 1,
    title: "The governance model",
    headline: "MCP at scale\nrequires rules.",
    sections: [
      {
        type: "paragraph",
        text: "When MCP goes from one developer's experiment to a team-wide tool, governance becomes essential. Without rules, agents will overwrite each other's changes, create duplicate artifacts, and make unauthorized modifications. Enterprise MCP governance defines what agents can do, when, and with what safeguards.",
      },
      {
        type: "subheading",
        text: "The mandatory dependency model",
      },
      {
        type: "paragraph",
        text: "In enterprise systems, MCP is not optional. If a command needs MCP data and MCP is unavailable, the command fails — it does not degrade gracefully with guesses. This is the fail-closed principle applied to tool access.",
      },
      {
        type: "callout",
        variant: "rule",
        title: "The three failure responses",
        text: "When an MCP operation fails, the system must return one of:\n- status: failed — MCP is down or unreachable, with the full intended operation for manual execution\n- status: blocked — preconditions not met (missing evidence, wrong state), with what's needed\n- status: conflict — data conflicts detected between sources, with both sources for human resolution\n\nNever return success when MCP failed. Never silently skip an MCP operation.",
      },
    ] as ContentBlock[],
  },
  {
    number: 2,
    title: "Operation intent abstraction",
    headline: "Describe what\nyou want to do,\nnot how to call it.",
    sections: [
      {
        type: "paragraph",
        text: "Governance rules describe operations as portable intents — 'issue.add_labels', 'repo.create_branch' — not as specific tool names. This decouples governance from the MCP server implementation, so you can switch servers without rewriting rules.",
      },
      {
        type: "code",
        caption: "Operation intent envelope",
        code: "operation:\n  intended_operation: issue.add_labels\n  target:\n    platform: github\n    owner: my-org\n    repo: my-project\n    artifact_type: Issue\n    artifact_id: 42\n  source_of_truth: GitHub Issues\n  required_reads:\n    - current labels\n    - current assignees\n  conflict_checks:\n    - stale state\n    - invalid label (not in allowed set)\n  failure_status: failed",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Why intent matters",
        text: "If your governance rule says 'call github_add_labels_to_issue', you're locked to that server's API. If it says 'issue.add_labels', any MCP server that can manage issue labels satisfies the intent. This is the difference between coupling to implementation and coupling to capability.",
      },
    ] as ContentBlock[],
  },
  {
    number: 3,
    title: "Source-of-truth mapping",
    headline: "Who owns\nwhat data?",
    sections: [
      {
        type: "paragraph",
        text: "Projects store the same information in multiple places — README docs, issues, PRs, project boards, and the repository itself. Without an explicit ownership map, agents will read from the wrong source or write to the wrong target.",
      },
      {
        type: "comparison",
        headers: ["Data domain", "Authoritative source"],
        rows: [
          ["Feature requirements, decisions", "GitHub Issues / Discussions"],
          ["Task state, labels, assignment", "GitHub Issues / Project boards"],
          ["Code review findings, approvals", "Pull Requests"],
          ["Build results, deployment status", "GitHub Actions (read-only)"],
          ["Operating rules, conventions, governance", "Repository files (AGENTS.md, rules/)"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The conflict rule",
        text: "When an issue description and a PR comment disagree on the same requirement, the authoritative source for that field type wins. If ownership is unclear, return status: conflict with both sources identified — let the human decide. Agents MUST NOT guess which source is correct.",
      },
    ] as ContentBlock[],
  },
  {
    number: 4,
    title: "The MCP server security checklist",
    headline: "Ship secure.\nEvery time.",
    sections: [
      {
        type: "subheading",
        text: "Server-side requirements",
      },
      {
        type: "bullets",
        items: [
          "Validate ALL tool inputs — never trust client-provided data",
          "Implement access controls — not every user should access every tool",
          "Rate limit tool invocations — prevent abuse and runaway agents",
          "Sanitise tool outputs — don't leak internal errors, stack traces, or credentials",
          "Log all tool usage for audit — who called what, when, with what arguments",
          "Never store credentials in code, config files, or tool outputs",
        ],
      },
      {
        type: "subheading",
        text: "Client-side expectations",
      },
      {
        type: "bullets",
        items: [
          "Show tool inputs to users BEFORE calling the server (prevents data exfiltration)",
          "Prompt for confirmation on sensitive operations (delete, update, deploy)",
          "Validate tool results before passing to LLM",
          "Implement timeouts for tool calls (prevent hanging connections)",
        ],
      },
    ] as ContentBlock[],
  },
  {
    number: 5,
    title: "Exercise: design a governance contract",
    headline: "Your turn.\nWrite the rules.",
    sections: [
      {
        type: "callout",
        variant: "exercise",
        title: "Capstone: Design an MCP governance contract",
        text: "Write an MCP governance contract for an MCP server your team would build.\n\n1. Choose a target system (internal API, database, CI/CD, design tool)\n2. Define the tools it would expose (3-5 tools)\n3. Map source-of-truth ownership — what does this system own vs. what does it read?\n4. Write the write preconditions — what must be checked before each write operation?\n5. Define the failure contract — what does the agent do when MCP is unavailable?\n6. Write the security rules — auth method, rate limits, audit requirements\n7. Create the operation intent envelopes for each tool\n\nPresent your governance contract to a colleague and walk through a failure scenario.\n\nTime: 45 minutes",
      },
    ] as ContentBlock[],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FRAMEWORKS
   ═══════════════════════════════════════════════════════════════════════════ */

export const mcpFrameworks = [
  {
    id: "mcp-architecture",
    title: "MCP Architecture Model",
    description: "The three participants, three primitives, and two transports of MCP.",
    items: [
      "Host — the AI application (Claude, VS Code, Cursor) that coordinates clients",
      "Client — maintains a dedicated connection to one server (one client per server)",
      "Server — exposes tools, resources, and prompts (local subprocess or remote HTTP)",
      "Tools (model-controlled) — actions the LLM invokes based on context and intent",
      "Resources (app-controlled) — passive data the application loads for context",
      "Prompts (user-controlled) — templates the user explicitly selects",
      "stdio transport — local subprocess, stdin/stdout, fastest, one client",
      "Streamable HTTP — remote service, POST + SSE, scalable, many clients",
    ],
  },
  {
    id: "write-precondition",
    title: "Write Precondition Checklist",
    description: "The 6-step safety protocol before any MCP write operation.",
    items: [
      "1. IDENTIFY — operation, target artifact, fields, links, tags",
      "2. READ — current remote content, state, links, and revision",
      "3. COMPARE — current content against intended update",
      "4. DETECT — stale revisions, duplicates, invalid states, wrong tags",
      "5. PATCH — narrow field updates, never full-document replacement",
      "6. FAIL — return conflict/blocked when preconditions fail",
    ],
  },
  {
    id: "tool-description-design",
    title: "Tool Description Design",
    description: "How to write tool descriptions that help LLMs choose correctly.",
    items: [
      "Name: verb_noun format (get_post, search_repos, list_issues)",
      "Description: what it DOES + what it RETURNS + CONSTRAINTS + RELATIONS",
      "Parameters: descriptive names, .describe() with examples, explicit types",
      "Error messages: what went wrong + what to do about it",
      "Namespace: prefix with server name (github_, slack_, jira_)",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export const mcpFaqItems = [
  {
    question: "What languages can I build MCP servers in?",
    answer: "Official SDKs exist for TypeScript, Python, Java, Kotlin, and C#. The protocol is language-agnostic (JSON-RPC 2.0 over stdio or HTTP), so you can implement it in any language that can read stdin/write stdout or serve HTTP.",
  },
  {
    question: "stdio vs Streamable HTTP: which should I use?",
    answer: "Start with stdio. It's simpler, faster, and works with every MCP client. Move to Streamable HTTP only when you need remote access (team-shared server), multiple simultaneous clients, or cloud deployment. You can support both transports in the same server.",
  },
  {
    question: "How does authentication work?",
    answer: "For stdio servers, credentials come from environment variables passed by the host application. For HTTP servers, use standard HTTP authentication (Bearer tokens, API keys, OAuth). Never store credentials in code or config files checked into git.",
  },
  {
    question: "Can MCP servers call other MCP servers?",
    answer: "Not directly through the protocol. An MCP server is a provider, not a consumer. However, your server's tool handlers can make any API calls they need — including calling services that happen to also have MCP servers. The MCP protocol is for host-to-server communication.",
  },
  {
    question: "What's the difference between tools and resources?",
    answer: "Tools are model-controlled actions — the LLM decides when to call them based on user intent. Resources are application-controlled data — the host application decides when to load them for context. Use tools for dynamic queries (search, create, update). Use resources for static context (schemas, documentation, configuration).",
  },
  {
    question: "How do I debug an MCP server?",
    answer: "Use the MCP Inspector (npx @modelcontextprotocol/inspector) to connect, list tools, call tools, and see raw JSON-RPC messages. For stdio servers, log to stderr (console.error) not stdout. Common issues: forgetting to rebuild after changes, using relative paths in config, and accidentally writing to stdout.",
  },
  {
    question: "How do I handle rate limiting?",
    answer: "Implement rate limiting in your tool handlers — track invocations per client/session and return an error when limits are exceeded. For HTTP transport, use standard HTTP 429 responses. Consider separate limits for read operations (higher) and write operations (lower).",
  },
  {
    question: "Can I use MCP without Claude?",
    answer: "Absolutely. MCP is supported by ChatGPT, VS Code Copilot, Cursor, Windsurf, and many other AI applications. The protocol is application-agnostic — any MCP-compatible client can connect to any MCP server.",
  },
  {
    question: "Do I need the AI Agents course first?",
    answer: "Recommended but not required. The AI Agents course teaches how agents consume tools (the consumer perspective). This course teaches how to build the tools they consume (the producer perspective). Understanding both sides makes you more effective at either.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

export const mcpModules: CourseModule[] = [
  {
    id: 1,
    slug: "understanding-mcp",
    label: "Module 1",
    title: "Understanding MCP",
    description:
      "The protocol, architecture, primitives, and transports — everything you need to know before building.",
    keyMessage:
      "Think of MCP like USB-C for AI applications. Build once, integrate everywhere.",
    slides: module1Slides,
  },
  {
    id: 2,
    slug: "first-server",
    label: "Module 2",
    title: "Building Your First MCP Server",
    description:
      "From project setup to a working server with tools, resources, prompts, and testing.",
    keyMessage:
      "A working MCP server is 50 lines of TypeScript. The hard part is designing good tools, not writing the plumbing.",
    slides: module2Slides,
  },
  {
    id: 3,
    slug: "real-world-patterns",
    label: "Module 3",
    title: "Real-World MCP Patterns",
    description:
      "Authentication, error handling, read-before-write safety, and tool description design for production servers.",
    keyMessage:
      "The tool description is the LLM's only information about what your server does. Write it for the model, not for humans.",
    slides: module3Slides,
  },
  {
    id: 4,
    slug: "remote-deployment",
    label: "Module 4",
    title: "Streamable HTTP & Remote Deployment",
    description:
      "Moving from local subprocess to remote HTTP service with sessions, resumability, and cloud deployment.",
    keyMessage:
      "The protocol stays the same — only the transport changes. Start with stdio, upgrade to HTTP when you need remote access.",
    slides: module4Slides,
  },
  {
    id: 5,
    slug: "enterprise-governance",
    label: "Module 5",
    title: "Enterprise MCP Governance",
    description:
      "Operation intent abstraction, source-of-truth mapping, failure contracts, and security checklists for MCP at scale.",
    keyMessage:
      "Enterprise MCP is not more servers — it is rules that ensure agents use servers safely, predictably, and traceably.",
    slides: module5Slides,
  },
];

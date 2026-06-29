import type { Metadata } from "next";
import { McpNav } from "@/components/layout/McpNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Building MCP Servers",
  description:
    "Design and build Model Context Protocol servers that connect AI agents to your enterprise systems — Azure DevOps, internal APIs, databases, and proprietary tools.",
};

export default function McpDevelopmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <McpNav />
      {children}
      <Footer />
    </>
  );
}

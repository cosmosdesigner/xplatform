import type { Metadata } from "next";
import { HarnessNav } from "@/components/layout/HarnessNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Coding Harnesses — Set Up Right",
  description:
    "Install, configure, and master your AI coding harness. Hooks, plugins, parallel workflows, token optimization, permission modes, and enterprise setup for Claude Code, OpenCode, Cursor, and beyond.",
};

export default function HarnessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HarnessNav />
      {children}
      <Footer />
    </>
  );
}

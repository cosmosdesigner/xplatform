import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Coding Agents — Done Right",
  description:
    "Four modules covering the mental model, the developer workflow, project conventions, and a capstone project. Featuring Claude Code, OpenCode, Codex, and Atomica.",
  keywords: [
    "AI coding agents",
    "Claude Code",
    "OpenCode",
    "Codex",
    "Atomica",
    "AI-assisted development",
    "RALPH framework",
  ],
  openGraph: {
    title: "AI Coding Agents — Done Right",
    description:
      "Four modules. One clear operating model. Mental model, workflow, project rules, and a capstone build.",
    type: "website",
  },
};

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

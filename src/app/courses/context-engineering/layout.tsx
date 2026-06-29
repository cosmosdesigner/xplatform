import type { Metadata } from "next";
import { ContextNav } from "@/components/layout/ContextNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Context Engineering for Developers",
  description:
    "The discipline that replaced prompt engineering. Learn to structure AGENTS.md files, build context registries, design skill systems, and architect enterprise-grade context systems for AI coding agents.",
};

export default function ContextEngineeringLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ContextNav />
      {children}
      <Footer />
    </>
  );
}

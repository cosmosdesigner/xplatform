import type { Metadata } from "next";
import { LoomNav } from "@/components/layout/LoomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Loom v2 — Operational Development Model",
  description:
    "The 16-point operational model for continuous feature delivery. From batch cycles to flow-based execution with clear ownership, validation gates, and independent deployments.",
};

export default function LoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoomNav />
      {children}
      <Footer />
    </>
  );
}

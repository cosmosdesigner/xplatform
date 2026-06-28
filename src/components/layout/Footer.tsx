import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[#2e2e2e] py-10 mt-24">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#454545] tracking-wider uppercase">
            AI Coding Agents · 2026
          </p>
          <p className="text-xs text-[#454545]">
            Built with Next.js · Tailwind CSS · TanStack Query
          </p>
        </div>
      </Container>
    </footer>
  );
}

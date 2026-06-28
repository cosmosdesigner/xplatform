"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { Workflow, GraduationCap, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Modules", href: "#modules" },
  { label: "FAQ", href: "#faq" },
];

export function LoomNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) firstMenuLinkRef.current?.focus();
    else hamburgerRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled ? "bg-[#080808]/95 border-b border-[#2e2e2e] backdrop-blur-md" : "bg-transparent"
        )}
        aria-label="Site navigation"
      >
        <Container>
          <div className="flex h-14 items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-1.5 text-[#454545] hover:text-[#878787] transition-colors duration-150" aria-label="Back to XPlatform Academy">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-widest uppercase hidden sm:inline">Academy</span>
              </a>
              <span className="text-[#2e2e2e] hidden sm:inline" aria-hidden="true">/</span>
              <a href="#" className="flex items-center gap-1.5 text-[#ededed] font-semibold text-sm tracking-tight" aria-label="Loom v2 Course — top">
                <Workflow className="h-4 w-4 text-[#6366f1]" aria-hidden="true" />
                <span className="font-mono text-xs text-[#878787] tracking-widest uppercase">Loom v2</span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm text-[#a0a0a0] hover:text-[#ededed] transition-colors duration-150">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="#modules" onClick={(e) => handleNavClick(e, "#modules")} className="h-9 px-4 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center">
                Start learning
              </a>
            </div>

            <button ref={hamburgerRef} className="md:hidden p-2 text-[#a0a0a0] hover:text-[#ededed] transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="loom-mobile-menu" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </nav>

      {mobileOpen && (
        <div id="loom-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-40 bg-[#080808]/98 flex flex-col pt-14" onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const focusable = e.currentTarget.querySelectorAll<HTMLElement>("a, button");
          const first = focusable[0]; const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }}>
          <Container>
            <div className="flex flex-col gap-1 py-8">
              {navLinks.map((link, i) => (
                <a key={link.href} ref={i === 0 ? firstMenuLinkRef : undefined} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="py-4 text-lg text-[#a0a0a0] hover:text-[#ededed] transition-colors border-b border-[#2e2e2e]">
                  {link.label}
                </a>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

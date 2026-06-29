"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { courses, type Course } from "@/data/catalog";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Layers,
  FlaskConical,
  Clock,
  Lock,
} from "lucide-react";

/* ─── Hero Nav (transparent, editorial) ────────────────────────────────── */

function HeroNav() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16"
      aria-label="Site navigation"
    >
      <div className="flex h-20 items-center justify-between">
        {/* Logo monogram */}
        <a
          href="/"
          className="flex items-center gap-2.5"
          aria-label="XPlatform Academy — home"
        >
          <GraduationCap
            className="h-5 w-5 text-white/80"
            aria-hidden="true"
          />
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-light hidden sm:inline">
            XPA
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#courses"
            onClick={(e) => handleNavClick(e, "#courses")}
            className="text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            Courses
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            About
          </a>
          <Link
            href="/courses/ai-agents"
            className="text-[11px] tracking-[0.2em] uppercase bg-white text-[#080808] px-5 py-2 rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Homepage Footer ───────────────────────────────────────────────────── */

function HomeFooter() {
  return (
    <footer className="border-t border-[#2e2e2e] py-10 mt-24">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#454545] tracking-wider uppercase">
            XPlatform Academy · 2026
          </p>
          <p className="text-xs text-[#454545]">
            Enterprise AI training platform
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* ─── Course Card ───────────────────────────────────────────────────────── */

function CourseCard({ course }: { course: Course }) {
  const isAvailable = course.status === "available";

  const content = (
    <article
      className={cn(
        "rounded-[6px] border overflow-hidden transition-[border-color,background-color,box-shadow] duration-200 group relative h-full flex flex-col",
        isAvailable
          ? "border-[#2e2e2e] bg-[#0f0f0f] hover:border-[#454545] hover:bg-[#111] cursor-pointer"
          : "border-[#1f1f1f] bg-[#0a0a0a] opacity-60 cursor-default"
      )}
    >
      {/* Accent top bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: isAvailable ? course.accent : "#2e2e2e" }}
        aria-hidden="true"
      />

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border",
              isAvailable
                ? "border-emerald-500/30 text-emerald-400/80"
                : "border-[#2e2e2e] text-[#454545]"
            )}
          >
            {isAvailable ? "Available" : "Coming soon"}
          </span>
          {!isAvailable && (
            <Lock
              className="h-4 w-4 text-[#2e2e2e]"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.025em] text-[#ededed] leading-[1.15]">
          {course.title}
          <br />
          <span
            style={{ color: isAvailable ? course.accent : "#454545" }}
          >
            {course.subtitle}
          </span>
        </h3>

        {/* Description */}
        <p className="mt-3 text-[14px] text-[#878787] leading-[1.65] max-w-[50ch]">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-[#454545]">
          <span className="flex items-center gap-1.5 text-[12px]">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            {course.modules} modules
          </span>
          <span className="flex items-center gap-1.5 text-[12px]">
            <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
            {course.exercises} exercises
          </span>
          <span className="flex items-center gap-1.5 text-[12px]">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {course.duration}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-[#1f1f1f] text-[#454545]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {isAvailable && (
          <div className="mt-auto pt-6 flex items-center gap-2 text-[13px] font-medium text-[#ededed] group-hover:gap-3 transition-all duration-200">
            Start course
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </article>
  );

  if (isAvailable) {
    return (
      <Link href={course.href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

/* ─── Homepage ──────────────────────────────────────────────────────────── */

export default function HomePage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollToCourses = () => {
    document
      .querySelector("#courses")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const availableCourses = courses.filter((c) => c.status === "available");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full-viewport, luxury editorial layout
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        aria-label="Welcome"
      >
        {/* Background — dark gradient overlay for cinematic depth */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(222,49,99,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        <HeroNav />

        {/* Hero content — split layout on desktop */}
        <div className="flex-1 flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-28 md:pt-32 pb-10">
          {/* ── Upper: Headline ──────────────────────────────────────── */}
          <div className="max-w-[1400px] w-full mx-auto">
            <h1
              className="text-white font-bold uppercase leading-[0.88] tracking-[0.06em]"
              style={{ fontSize: "clamp(48px, 10vw, 160px)" }}
            >
              XPlatform
              <br />
              Academy
            </h1>
          </div>

          {/* ── Lower: Content + Course list ─────────────────────────── */}
          <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-20 mt-auto">
            {/* Left: supporting text + CTA */}
            <div className="flex flex-col gap-8 max-w-[480px]">
              {/* Serif supporting text */}
              <p className="font-serif text-[20px] md:text-[24px] text-white/60 leading-[1.5] italic">
                Enterprise courses for AI&#8209;assisted development.
                Built for the way you already work.
              </p>

              {/* CTA row */}
              <div className="flex items-center gap-5 flex-wrap">
                {/* Dark pill button with arrow */}
                <button
                  onClick={handleScrollToCourses}
                  className="h-12 pl-6 pr-2 rounded-full bg-white/10 border border-white/10 text-white text-[11px] tracking-[0.2em] uppercase hover:bg-white/15 transition-colors duration-200 inline-flex items-center gap-4 group"
                >
                  Explore courses
                  <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#080808]"
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Trust badge */}
                <div className="flex items-center gap-3 text-white/30">
                  <span className="h-px w-6 bg-white/20" aria-hidden="true" />
                  <span className="text-[11px] tracking-[0.15em] uppercase">
                    {courses.length} courses · {availableCourses.length} available
                  </span>
                </div>
              </div>
            </div>

            {/* Right: course list panel */}
            <nav
              aria-label="Available courses"
              className="w-full lg:w-[340px] shrink-0"
            >
              {availableCourses.map((course, i) => (
                <Link
                  key={course.id}
                  href={course.href}
                  className={cn(
                    "flex items-center justify-between py-5 group transition-colors duration-200",
                    i > 0 && "border-t border-white/10"
                  )}
                >
                  <div>
                    <p className="text-[14px] text-white/80 group-hover:text-white transition-colors duration-200">
                      {course.title}
                    </p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-white/30 mt-1">
                      {course.modules} modules · {course.duration}
                    </p>
                  </div>
                  <span className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/40 group-hover:text-white group-hover:border-white/40 transition-all duration-200">
                    <ArrowUpRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Bottom: scroll indicator ─────────────────────────────── */}
          <div className="max-w-[1400px] w-full mx-auto mt-10 flex justify-center">
            <button
              onClick={handleScrollToCourses}
              className="text-[10px] tracking-[0.3em] uppercase text-white/25 hover:text-white/50 transition-colors duration-200"
              aria-label="Scroll to course catalog"
            >
              Scroll to discover
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COURSE CATALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="courses"
        className="py-20 md:py-28 border-t border-[#2e2e2e]"
        aria-label="Course catalog"
      >
        <Container>
          <div ref={gridRef} className="reveal">
            {/* Section header */}
            <div className="mb-12 md:mb-16">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#454545] mb-3">
                Course catalog
              </p>
              <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#ededed] leading-[1.15]">
                Choose your path.
              </h2>
              <p className="mt-4 text-[16px] text-[#878787] max-w-[520px] leading-[1.7]">
                Each course is designed for enterprise developers.
                Practical, hands-on, and built around real workflows
                — not toy examples.
              </p>
            </div>

            {/* Course cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="py-20 md:py-28 border-t border-[#2e2e2e]"
      >
        <Container>
          <div className="flex flex-col items-center text-center gap-6">
            <BookOpen
              className="h-8 w-8 text-[#454545]"
              aria-hidden="true"
            />
            <h2 className="text-[24px] md:text-[32px] font-semibold tracking-[-0.025em] text-[#ededed] leading-[1.2]">
              More courses coming soon.
            </h2>
            <p className="max-w-[440px] text-[15px] text-[#878787] leading-[1.65]">
              We are building a complete training programme for
              enterprise AI-assisted development. Start with AI Coding
              Agents — the foundation for everything that follows.
            </p>
            <Link
              href="/courses/loom-v2"
              className="mt-2 h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2"
            >
              Start with Loom v2
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <HomeFooter />
    </>
  );
}

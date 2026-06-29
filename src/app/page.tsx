"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { courses, type Course } from "@/data/catalog";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowDown,
  BookOpen,
  GraduationCap,
  Layers,
  FlaskConical,
  Clock,
  Lock,
} from "lucide-react";

/* ─── Homepage Nav ──────────────────────────────────────────────────────── */

function HomeNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 border-b border-[#2e2e2e] backdrop-blur-md"
      aria-label="Site navigation"
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-8">
          <a
            href="/"
            className="flex items-center gap-2 text-[#ededed] font-semibold text-sm tracking-tight"
            aria-label="XPlatform Academy — home"
          >
            <GraduationCap
              className="h-4 w-4 text-[#de3163]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-[#878787] tracking-widest uppercase">
              XPlatform Academy
            </span>
          </a>

          <span className="font-mono text-[10px] tracking-widest uppercase text-[#454545]">
            Enterprise AI Training
          </span>
        </div>
      </Container>
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
  const heroRef = useRef<HTMLDivElement>(null);
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
    if (heroRef.current) observer.observe(heroRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollToCourses = () => {
    document
      .querySelector("#courses")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <HomeNav />

      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
        aria-label="Welcome"
      >
        {/* Dual radial glows */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 30% 20%, rgba(99,102,241,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 70% 30%, rgba(222,49,99,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container>
          <div
            ref={heroRef}
            className="reveal relative z-10 flex flex-col items-center text-center gap-6 pt-28 pb-12"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#de3163]" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#878787]">
                Enterprise AI Training
              </span>
              <span className="h-px w-8 bg-[#de3163]" aria-hidden="true" />
            </div>

            {/* Title — two-tone */}
            <h1
              className="font-semibold leading-[0.95] tracking-[-0.04em] max-w-3xl"
              style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
            >
              <span className="text-[#ededed]">XPlatform</span>
              <br />
              <span className="text-[#a0a0a0]">Academy</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-[480px] text-[18px] md:text-[20px] text-[#a0a0a0] leading-[1.65] mt-1">
              Enterprise courses for AI-assisted development.
              Built for the way you already work.
            </p>

            {/* CTA */}
            <button
              onClick={handleScrollToCourses}
              className="mt-2 h-11 px-6 rounded-[6px] bg-[#ededed] text-[#080808] text-sm font-medium hover:bg-[#d4d4d4] transition-colors duration-150 inline-flex items-center gap-2"
            >
              Start learning
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Gradient divider */}
          <div
            className="h-px w-full max-w-[600px] mx-auto my-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #de3163, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Course strip */}
          <nav
            aria-label="Course quick navigation"
            className="relative z-10 pb-16"
          >
            <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-2 px-2 md:justify-center md:overflow-x-visible md:snap-none">
              {courses.map((course) => {
                const isAvailable = course.status === "available";
                const tile = (
                  <div
                    className={cn(
                      "snap-start shrink-0 w-[180px] md:w-[200px] rounded-[6px] border overflow-hidden transition-[border-color,background-color] duration-150 group",
                      isAvailable
                        ? "border-[#2e2e2e] bg-[#0f0f0f] hover:bg-[#111] cursor-pointer"
                        : "border-[#1f1f1f] bg-[#0a0a0a] opacity-50 cursor-default border-dashed"
                    )}
                  >
                    {/* Accent top bar */}
                    <div
                      className="h-1 w-full"
                      style={{
                        backgroundColor: isAvailable
                          ? course.accent
                          : "#2e2e2e",
                      }}
                      aria-hidden="true"
                    />

                    <div className="p-4">
                      {/* Course title */}
                      <p className="text-[14px] font-semibold text-[#ededed] leading-[1.3] tracking-[-0.01em]">
                        {course.title}
                      </p>

                      {/* Module count */}
                      <p className="mt-2 font-mono text-[11px] text-[#454545] tracking-wider uppercase">
                        {course.modules} modules
                      </p>

                      {/* Status */}
                      <span
                        className={cn(
                          "mt-3 inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border",
                          isAvailable
                            ? "border-emerald-500/30 text-emerald-400/80"
                            : "border-[#2e2e2e] text-[#454545]"
                        )}
                      >
                        {isAvailable ? "Available" : "Coming soon"}
                      </span>
                    </div>
                  </div>
                );

                if (isAvailable) {
                  return (
                    <Link
                      key={course.id}
                      href={course.href}
                      className="snap-start shrink-0"
                    >
                      {tile}
                    </Link>
                  );
                }

                return (
                  <div key={course.id} aria-disabled="true">
                    {tile}
                  </div>
                );
              })}
            </div>
          </nav>
        </Container>

        {/* Scroll hint */}
        <button
          onClick={handleScrollToCourses}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 text-[#454545] hover:text-[#878787] transition-colors duration-200"
          aria-label="Scroll to course catalog"
        >
          <div
            className="h-10 w-px bg-gradient-to-b from-transparent to-[#2e2e2e]"
            aria-hidden="true"
          />
          <ArrowDown
            className="h-4 w-4 animate-bounce"
            aria-hidden="true"
          />
        </button>
      </section>

      {/* Course grid */}
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

      {/* Bottom section */}
      <section className="py-20 md:py-28 border-t border-[#2e2e2e]">
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

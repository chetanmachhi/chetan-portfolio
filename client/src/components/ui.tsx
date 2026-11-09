/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isHomePath } from "../profile";

/*
 * Shared pieces for the section designs. Everything here is built to stay off the main thread:
 * reveals are a CSS transition on opacity/transform toggled once by an IntersectionObserver
 * (no per-frame JS), and there are no blur filters.
 */

/** Fades/slides its content in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-from={from}
      className={`reveal ${shown ? "is-shown" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** "01 — About" style header used by every new section. */
export function SectionHeader({
  index,
  label,
  title,
  accent,
  subtitle,
  center = false,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-cyan-400/80 ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="text-slate-500">{index}</span>
        <span className="h-px w-10 bg-linear-to-r from-cyan-400/70 to-transparent" />
        {label}
      </div>
      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400">{accent}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg text-slate-400 max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}

/** Base card look for the new designs: see-through so the stars show behind it. */
export const card = "rounded-2xl border border-white/10 bg-slate-950/45";

/** Window-style title bar (three dots + mono path). */
export function WindowBar({ path, right }: { path: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
      </div>
      <span className="truncate font-mono text-[11px] text-slate-500">{path}</span>
      {right && <div className="ml-auto shrink-0">{right}</div>}
    </div>
  );
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Smooth-scroll to a section id (with navbar offset), or go home first if on another page. */
export function scrollToSection(id: string, navigate: (to: string) => void, pathname: string, homePath = "/") {
  if (!isHomePath(pathname)) {
    navigate(`${homePath}#${id}`);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
}

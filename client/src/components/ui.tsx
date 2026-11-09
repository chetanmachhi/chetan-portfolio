/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

/**
 * Mobile swipe deck: an endlessly looping carousel with native scroll-snap.
 *
 * The cards are rendered three times ([copy A][real][copy B]); you always start in the
 * middle copy, so there's a card peeking in on BOTH sides, even on the first one. When a
 * swipe settles in an outer copy, we jump (instantly, invisibly — the content is identical)
 * back to the same card in the middle copy, so you can keep swiping forever either way.
 * Swiping reports the centred card via onIndexChange; changing `index` from outside (tab
 * chip, dot) glides to it. ‹ › arrows sit beside the dots.
 */
export function SwipeDeck({
  index,
  onIndexChange,
  label,
  children,
}: {
  index: number;
  onIndexChange: (i: number) => void;
  label: string;
  children: ReactNode[];
}) {
  const n = children.length;
  const loop = n > 1;
  const slides = loop ? [...children, ...children, ...children] : children;
  const ref = useRef<HTMLDivElement>(null);
  const [phys, setPhys] = useState(loop ? n + index : index); // centred slide (physical)
  const physRef = useRef(phys);
  const indexRef = useRef(index);
  const cbRef = useRef(onIndexChange);
  const targetRef = useRef<number | null>(null); // set while gliding to a chosen slide

  useEffect(() => {
    indexRef.current = index;
    cbRef.current = onIndexChange;
  });

  const offsetFor = (i: number) => {
    const el = ref.current!;
    const ch = el.children[i] as HTMLElement;
    return ch.offsetLeft - (el.clientWidth - ch.offsetWidth) / 2;
  };
  const setPhysical = (i: number) => {
    physRef.current = i;
    setPhys(i);
  };
  const glideTo = (i: number) => {
    targetRef.current = i;
    ref.current?.scrollTo({ left: offsetFor(i), behavior: "smooth" });
  };

  // Start centred on the current card in the middle copy; re-centre on resize.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const centre = () => {
      el.scrollLeft = offsetFor(physRef.current);
    };
    centre();
    window.addEventListener("resize", centre);
    return () => window.removeEventListener("resize", centre);
  }, []);

  // Swipe -> active card; when the swipe settles in an outer copy, jump to the middle copy.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let settle: ReturnType<typeof setTimeout>;

    const nearest = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const ch = c as HTMLElement;
        const d = Math.abs(ch.offsetLeft + ch.offsetWidth / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    };

    const onSettle = () => {
      const best = nearest();
      targetRef.current = null;
      if (loop && (best < n || best >= 2 * n)) {
        const mirror = (best % n) + n;
        el.classList.add("deck-jump"); // no fade/scale transition during the invisible jump
        el.scrollLeft = offsetFor(mirror);
        setPhysical(mirror);
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("deck-jump")));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const best = nearest();
        if (best !== physRef.current) setPhysical(best);
        const logical = best % n;
        if (targetRef.current === null && logical !== indexRef.current) cbRef.current(logical);
      });
      clearTimeout(settle);
      settle = setTimeout(onSettle, 140);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [n, loop]);

  // Index changed from outside (chip / dot): glide to the closest copy of that card.
  useEffect(() => {
    if (index === physRef.current % n) return;
    const options = loop ? [index, index + n, index + 2 * n] : [index];
    const target = options.reduce((a, b) => (Math.abs(b - physRef.current) < Math.abs(a - physRef.current) ? b : a));
    glideTo(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const step = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(slides.length - 1, physRef.current + dir));
    glideTo(next);
    cbRef.current(next % n);
  };

  // Side arrows: in the peek gutters, near the top of the cards so they're on screen as soon
  // as the card is (dead-centre would be off-screen on tall cards).
  const arrow =
    "absolute top-[min(50%,7rem)] z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-950/85 text-slate-200 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.9)] transition-colors active:bg-cyan-400/20 active:text-white";

  return (
    <div>
      <div className="relative -mx-6">
      <button onClick={() => step(-1)} aria-label="Previous" className={`${arrow} left-1`}>
        <ChevronLeft size={18} />
      </button>
      <button onClick={() => step(1)} aria-label="Next" className={`${arrow} right-1`}>
        <ChevronRight size={18} />
      </button>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className="relative flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-[7%] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&.deck-jump>*]:transition-none"
      >
        {slides.map((child, i) => (
          <div
            key={i}
            aria-hidden={i !== phys}
            className={`w-[86%] shrink-0 snap-center transition-[opacity,transform] duration-300 ${
              i === phys ? "opacity-100" : "scale-[0.96] opacity-40"
            }`}
          >
            {child}
          </div>
        ))}
      </div>
      </div>

      {/* Position dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {children.map((_, i) => (
          <button
            key={i}
            aria-label={`Show item ${i + 1}`}
            onClick={() => onIndexChange(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-cyan-400" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

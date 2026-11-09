import { useRef, useState } from "react";
import { SKILLS } from "../constants";
import { useProfile } from "../profile";
import { useActiveInView } from "../hooks/useActiveInView";
import { Reveal, SectionHeader, card } from "./ui";

/*
 * SKILLS — an endless strip of core tools (CSS marquee, compositor-only, pauses on hover
 * and whenever it's off-screen) and a category explorer: pick a category, its tools appear
 * as tiles. Replaces the auto-playing 3D carousel.
 */

export default function Skills() {
  const { kind, skillCategories } = useProfile();
  const [picked, setPicked] = useState({ kind, cat: 0 });
  // Back to the first category whenever the site version changes
  const cat = picked.kind === kind ? picked.cat : 0;
  const setCat = (i: number) => setPicked({ kind, cat: i });
  const stripRef = useRef<HTMLDivElement>(null);
  const stripActive = useActiveInView(stripRef);
  const selected = skillCategories[cat] ?? skillCategories[0];

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          index="02"
          label="Skills"
          title="Technical"
          accent="arsenal"
          subtitle="The tools I reach for to ship web, mobile and backend systems."
        />
      </div>

      {/* Marquee strip */}
      <Reveal className="mt-12">
        <div ref={stripRef} className={`group relative overflow-hidden border-y border-white/5 bg-slate-950/30 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${stripActive ? "" : "anim-paused"}`}>
          <div
            className="flex w-max gap-3 anim-motion group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee 40s linear infinite" }}
          >
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <div
                key={i}
                aria-hidden={i >= SKILLS.length}
                className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5"
              >
                <s.icon className={`text-xl ${s.color}`} />
                <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Category explorer */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
            {/* Category list (horizontal scroll on mobile) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              {skillCategories.map((c, i) => {
                const isActive = i === cat;
                return (
                  <button
                    key={c.title}
                    onClick={() => setCat(i)}
                    className={`group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                        : "border-white/10 bg-slate-950/40 text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <c.icon size={18} className={isActive ? "text-cyan-300" : "text-slate-500 group-hover:text-slate-300"} />
                    <span className="text-sm font-semibold whitespace-nowrap">{c.title}</span>
                    <span className="ml-auto pl-3 font-mono text-[11px] text-slate-500">{String(c.skills.length).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected category */}
            <div className={`${card} p-6 md:p-8`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-white">{selected.title}</h3>
                <span className="font-mono text-xs text-slate-500">
                  {selected.skills.length} skills
                </span>
              </div>
              <div key={cat} className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {selected.skills.map((s, i) => (
                  <div
                    key={s.name}
                    className="fade-up group flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-3 py-5 text-center transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/5"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {s.icon && <s.icon className={`text-3xl ${s.color} transition-transform duration-300 group-hover:scale-110`} />}
                    <span className="text-sm font-semibold text-slate-200">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

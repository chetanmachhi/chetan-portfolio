import { useState } from "react";
import { Briefcase, CalendarClock, MapPin } from "lucide-react";
import { useProfile } from "../profile";
import { Reveal, SectionHeader, WindowBar, card, slugify } from "./ui";

/*
 * EXPERIENCE — compact "mission log": roles are tabs (left, or a scroll row on mobile),
 * the selected role opens in one detail panel. Much shorter than three big stacked cards.
 */

export default function Experience() {
  const [sel, setSel] = useState(0);
  const { experiences } = useProfile();
  const job = experiences[sel];
  const isCurrent = /present/i.test(job.period);

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="03" label="Experience" title="Professional" accent="journey" />

        <Reveal className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            {/* Role tabs */}
            <div role="tablist" aria-label="Roles" className="relative flex lg:flex-col lg:self-start gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              {/* timeline rail (desktop) */}
              <div className="pointer-events-none absolute left-[27px] top-6 bottom-6 hidden w-px bg-linear-to-b from-cyan-400/40 via-white/10 to-transparent lg:block" />
              {experiences.map((e, i) => {
                const isActive = i === sel;
                return (
                  <button
                    key={e.company}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSel(i)}
                    className={`relative flex shrink-0 items-start gap-4 rounded-2xl border p-4 text-left transition-colors w-64 lg:w-auto ${
                      isActive ? "border-cyan-400/40 bg-cyan-400/7" : "border-white/10 bg-slate-950/40 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${
                        isActive ? "border-cyan-300 bg-cyan-400 text-slate-950" : "border-white/20 bg-slate-950 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-bold ${isActive ? "text-white" : "text-slate-300"}`}>{e.company}</span>
                      <span className="block truncate text-sm text-slate-400">{e.role}</span>
                      <span className="mt-1 block font-mono text-[11px] text-slate-500">{e.period}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div role="tabpanel" className={`${card} overflow-hidden`}>
              <WindowBar
                path={`~/experience/${slugify(job.company)}.log`}
                right={
                  isCurrent ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> CURRENT
                    </span>
                  ) : null
                }
              />
              <div key={sel} className="fade-up p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">{job.role}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
                        <Briefcase size={14} /> {job.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin size={14} /> {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-1.5 font-mono text-xs text-slate-300">
                    <CalendarClock size={13} className="text-cyan-400" /> {job.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {job.description.map((point, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-xs text-cyan-400/70">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-slate-300 leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {job.tech.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 font-mono text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

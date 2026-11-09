import { useState } from "react";
import { Briefcase, CalendarClock, MapPin } from "lucide-react";
import { useProfile, type Profile } from "../profile";
import { Reveal, SectionHeader, SwipeDeck, WindowBar, card, slugify } from "./ui";

/*
 * EXPERIENCE — compact "mission log".
 *  - Desktop: roles as tabs on the left, the selected role in one detail panel.
 *  - Mobile/tablet: three small tab chips on top, and the roles as swipeable cards below
 *    (neighbours peek in so it's obvious you can swipe; tapping a chip glides to it).
 */

type Job = Profile["experiences"][number];

function JobCard({ job, animate }: { job: Job; animate?: boolean }) {
  const isCurrent = /present/i.test(job.period);
  return (
    <div className={`${card} overflow-hidden`}>
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
      <div className={`${animate ? "fade-up " : ""}p-5 md:p-8`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-3xl font-extrabold text-white">{job.role}</h3>
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

        <ul className="mt-5 md:mt-6 space-y-3">
          {job.description.map((point, i) => (
            <li key={i} className="flex gap-3 md:gap-4">
              <span className="mt-0.5 font-mono text-xs text-cyan-400/70">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 md:mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          {job.tech.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 font-mono text-[11px] md:text-xs text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [sel, setSel] = useState(0);
  const { experiences } = useProfile();
  const job = experiences[sel];

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="03" label="Experience" title="Professional" accent="journey" />

        {/* Desktop */}
        <Reveal className="mt-12 hidden lg:block">
          <div className="grid grid-cols-[300px_1fr] gap-4">
            <div role="tablist" aria-label="Roles" className="relative flex flex-col self-start gap-2">
              {/* timeline rail */}
              <div className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-px bg-linear-to-b from-cyan-400/40 via-white/10 to-transparent" />
              {experiences.map((e, i) => {
                const isActive = i === sel;
                return (
                  <button
                    key={e.company}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSel(i)}
                    className={`relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
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
            <div role="tabpanel" key={sel}>
              <JobCard job={job} animate />
            </div>
          </div>
        </Reveal>

        {/* Mobile / tablet: chips + swipe deck */}
        <Reveal className="mt-10 lg:hidden">
          <div role="tablist" aria-label="Roles" className="grid grid-cols-3 gap-2">
            {experiences.map((e, i) => {
              const isActive = i === sel;
              return (
                <button
                  key={e.company}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSel(i)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${
                    isActive ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-slate-950/40 text-slate-400"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? "text-cyan-300" : "text-slate-500"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs font-semibold leading-tight">{e.company}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <SwipeDeck index={sel} onIndexChange={setSel} label="Roles — swipe to switch">
              {experiences.map((e) => (
                <JobCard key={e.company} job={e} />
              ))}
            </SwipeDeck>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

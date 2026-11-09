import { Briefcase, Clock, FlaskConical, GraduationCap, MapPin, Sparkles, Terminal } from "lucide-react";
import { useProfile } from "../profile";
import { Reveal, SectionHeader, card } from "./ui";

/*
 * ABOUT — a bento grid: the bio as a terminal-style "whoami" card, with education,
 * current role, location and quick numbers as smaller tiles around it.
 */


export default function About() {
  const { about, focus, experiences } = useProfile();
  const current = experiences[0];

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="01" label="About" title="A bit about" accent="me" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bio */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <div className={`${card} h-full overflow-hidden`}>
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-xs text-slate-500">
                <Terminal size={14} className="text-cyan-400" /> ~/chetan $ whoami
              </div>
              <div className="p-6 md:p-8">
                <p className="text-base md:text-lg leading-relaxed text-slate-300">{about}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {focus.map((f) => (
                    <span key={f} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-semibold text-cyan-200">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Education: MCA */}
          <Reveal delay={80}>
            <div className={`${card} h-full p-6 transition-colors hover:border-blue-400/40`}>
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-300">
                  <GraduationCap size={20} />
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> IN PROGRESS
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Master of Computer Applications</h3>
              <p className="mt-1 text-sm text-blue-300">Sigma University</p>
              <p className="mt-3 font-mono text-xs text-slate-500">2025 — Present</p>
            </div>
          </Reveal>

          {/* Education: BSc */}
          <Reveal delay={140}>
            <div className={`${card} h-full p-6 transition-colors hover:border-emerald-400/40`}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300">
                <FlaskConical size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">BSc Chemistry</h3>
              <p className="mt-1 text-sm text-emerald-300">Shri Govind Guru University</p>
              <p className="mt-3 font-mono text-xs text-slate-500">2018 — 2021</p>
            </div>
          </Reveal>

          {/* Current role */}
          <Reveal delay={60}>
            <div className={`${card} h-full p-6`}>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                <Briefcase size={13} className="text-violet-300" /> Currently
              </p>
              <p className="mt-3 text-lg font-bold text-white">{current.role}</p>
              <p className="text-sm text-violet-300">@ {current.company}</p>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal delay={120}>
            <div className={`${card} h-full p-6`}>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                <MapPin size={13} className="text-cyan-300" /> Based in
              </p>
              <p className="mt-3 text-lg font-bold text-white">Vadodara, Gujarat</p>
              <p className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock size={13} /> India · IST (UTC+5:30)
              </p>
            </div>
          </Reveal>

          {/* Open to */}
          <Reveal delay={180}>
            <div className={`${card} h-full p-6`}>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                <Sparkles size={13} className="text-emerald-300" /> Open to
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-3 py-1.5 text-sm font-semibold text-emerald-200">
                  Full-time roles
                </span>
                <span className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 px-3 py-1.5 text-sm font-semibold text-cyan-200">
                  Freelance projects
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

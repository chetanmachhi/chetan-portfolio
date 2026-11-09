import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "../constants";
import { Reveal, SectionHeader } from "./ui";

/*
 * CERTIFICATIONS — "boarding pass" credentials: a coloured stub with the issuer's mark and
 * year, a perforated divider, and the course on the right. The whole ticket links to the
 * credential.
 */

export default function Certifications() {
  const issuers = [...new Set(CERTIFICATIONS.map((c) => c.issuer))];

  return (
    <section id="certifications" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader index="04" label="Certifications" title="Verified" accent="credentials" />
          <Reveal>
            <p className="font-mono text-xs text-slate-500">
              {CERTIFICATIONS.length} credentials · {issuers.join(" · ")}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.link} delay={(i % 2) * 80}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
              >
                {/* Stub */}
                <div className={`relative flex w-24 md:w-28 shrink-0 flex-col items-center justify-center gap-2 bg-linear-to-b ${c.color} p-4`}>
                  <div className="absolute inset-0 bg-slate-950/55" />
                  <c.icon className="relative text-3xl text-white" />
                  <span className="relative font-mono text-xs font-bold text-white/90">{c.year}</span>
                </div>

                {/* Perforation */}
                <div className="relative w-0 border-l border-dashed border-white/15" />

                {/* Body */}
                <div className="flex min-w-0 grow flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-widest ${c.text_color}`}>{c.issuer}</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-300/80">
                      <ShieldCheck size={12} /> VERIFIED
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-white">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{c.description}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-cyan-300">
                    View credential
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

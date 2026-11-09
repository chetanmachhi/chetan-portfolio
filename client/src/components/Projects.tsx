import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { useProfile } from "../profile";
import { Reveal, SectionHeader, WindowBar, slugify } from "./ui";

/*
 * PROJECTS — each project is a small "app window". The first one is featured (wide, all
 * highlights); the rest show their top two highlights. Internal links open the case-study
 * page, external ones open the live site.
 */

type Project = (typeof PROJECTS)[number] & { link?: string };

function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  const isInternal = p.link?.startsWith("/");
  const isExternal = p.link?.startsWith("http");
  const highlights = featured ? p.highlights : p.highlights.slice(0, 2);

  const body = (
    <>
      <WindowBar
        path={`~/projects/${slugify(p.title).slice(0, 28)}`}
        right={
          p.link ? (
            <span className="flex items-center gap-1 font-mono text-[10px] text-cyan-300">
              {isInternal ? "CASE STUDY" : "LIVE"} <ArrowUpRight size={12} />
            </span>
          ) : null
        }
      />
      <div className={`flex grow flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <span className="font-mono text-[11px] uppercase tracking-widest text-violet-300/90">{p.category}</span>
        <h3 className={`mt-2 font-extrabold text-white transition-colors group-hover:text-cyan-200 ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {p.title}
        </h3>
        <p className="mt-3 text-slate-400 leading-relaxed">{p.description}</p>

        <ul className={`mt-5 space-y-2.5 ${featured ? "md:columns-2 md:gap-8" : ""}`}>
          {highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-slate-300 break-inside-avoid">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {p.tech.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/3 px-2 py-0.5 font-mono text-[11px] text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan-400/40";

  if (isInternal) return <Link to={p.link!} className={cls}>{body}</Link>;
  if (isExternal)
    return (
      <a href={p.link} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  return <div className={cls}>{body}</div>;
}

export default function Projects() {
  const { projects } = useProfile();
  const [featured, ...rest] = projects as Project[];

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          index="05"
          label="Projects"
          title="Featured"
          accent="systems"
          subtitle="Products and tools I've designed, built and shipped — from quick-commerce to telecom automation."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Reveal className="md:col-span-2">
            <ProjectCard p={featured} featured />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

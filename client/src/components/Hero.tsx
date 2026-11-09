import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CERTIFICATIONS, PERSONAL_INFO, PROJECTS } from "../constants";
import { useActiveInView } from "../hooks/useActiveInView";
import { Reveal } from "./ui";
import HeroVisual from "./HeroVisual";
import { useProfile } from "../profile";

/*
 * HERO — terminal-style greeting, intro, CTAs and stats on the left; the round photo with
 * floating icons on the right. Animations pause whenever the hero is off-screen.
 */

const SOCIALS = [
  { icon: FaGithub, href: PERSONAL_INFO.github, label: "GitHub" },
  { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/chetan_25_03?igsh=OG8xdDhtMmVtZjkw", label: "Instagram" },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
];

function RoleLine({ active, roles }: { active: boolean; roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setI((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, [active, roles.length]);
  return (
    <p className="mt-4 font-mono text-lg md:text-2xl text-slate-300">
      <span className="text-cyan-400">$</span> role --current{" "}
      <span key={i} className="fade-up inline-block font-bold text-white">
        {roles[i % roles.length]}
      </span>
      <span className="ml-1 inline-block h-5 w-2.5 translate-y-0.5 bg-cyan-400 anim-motion" style={{ animation: "blink 1s steps(1) infinite" }} />
    </p>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const active = useActiveInView(ref);
  const { kind, roles, tagline, resume } = useProfile();
  const [first, ...rest] = PERSONAL_INFO.name.split(" ");

  const stats = [
    { value: "2+", label: "Years building" },
    { value: `${PROJECTS.length}`, label: "Projects built" },
    { value: `${CERTIFICATIONS.length}`, label: "Certifications" },
  ];

  return (
    <section id="home" ref={ref} className={`relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden ${active ? "" : "anim-paused"}`}>
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center relative z-10">
        {/* LEFT */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <Reveal delay={80}>
            <p className="font-mono text-sm text-cyan-400/80">&gt; hello world, I'm</p>
            <h1 className="mt-2 text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
              {first}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400">{rest.join(" ")}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <RoleLine key={kind} active={active} roles={roles} />
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-lg text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {tagline}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#contact"
                className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-bold text-white shadow-[0_8px_30px_-8px_rgba(6,182,212,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Let's talk <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={resume.file}
                download={resume.downloadName}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/40 px-6 py-3.5 font-bold text-white transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
              >
                Download CV <FileText size={17} />
              </a>
              <div className="flex items-center gap-1 sm:ml-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-10 grid grid-cols-3 max-w-md mx-auto lg:mx-0 divide-x divide-white/10 rounded-2xl border border-white/10 bg-slate-950/40">
              {stats.map((s) => (
                <div key={s.label} className="px-3 py-4 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl md:text-3xl font-black text-white">{s.value}</dd>
                  <dd className="mt-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-slate-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* RIGHT: round photo with floating icons */}
        <HeroVisual className="order-1 lg:order-2" />
      </div>
    </section>
  );
}

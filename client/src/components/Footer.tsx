import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { PERSONAL_INFO } from "../constants";
import { scrollToSection } from "./ui";
import { useProfile } from "../profile";

/* FOOTER — name and tagline, quick links, socials, and a back-to-top button. */

const LINKS = ["About", "Skills", "Experience", "Certifications", "Projects", "Contact"];
const SOCIALS = [
  { icon: FaGithub, href: PERSONAL_INFO.github, label: "GitHub" },
  { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/chetan_25_03?igsh=OG8xdDhtMmVtZjkw", label: "Instagram" },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
];

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { role, homePath } = useProfile();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-linear-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_auto] gap-10 items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-black text-slate-950">
              CM
            </span>
            <div>
              <p className="font-bold text-white">{PERSONAL_INFO.name}</p>
              <p className="font-mono text-xs text-slate-500">{role} · Vadodara, IN</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Building scalable web, mobile and backend systems — always learning, always shipping.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(l.toLowerCase(), navigate, pathname, homePath);
              }}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex md:flex-col items-center md:items-end gap-4">
          <div className="flex gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-auto md:ml-0 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="max-w-6xl mx-auto px-6 py-5 font-mono text-[11px] tracking-wider text-slate-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()} · ENGINEERED WITH REACT & TAILWIND
        </p>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "./ui";
import { isHomePath, useProfile } from "../profile";

/*
 * NAVBAR — a floating "dock" pill centred at the top. The link for the section you're
 * reading lights up (scroll-spy via IntersectionObserver: no scroll listeners doing work).
 */

const LINKS = ["About", "Skills", "Experience", "Certifications", "Projects", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { resume, homePath } = useProfile();

  // Scroll-spy: whichever section crosses the middle band of the screen is "active".
  useEffect(() => {
    if (!isHomePath(pathname)) return;
    const ids = ["home", ...LINKS.map((l) => l.toLowerCase())];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id, navigate, pathname, homePath);
  };

  return (
    <header className="fixed inset-x-0 top-3 md:top-5 z-50 flex justify-center px-3">
      <nav className="relative flex w-full max-w-4xl items-center gap-1 rounded-full border border-white/10 bg-slate-950/80 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => go("home")}
          aria-label="Back to top"
          className="group flex h-10 items-center gap-2 rounded-full pl-1.5 pr-3 hover:bg-white/5"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-xs font-black text-slate-950">
            CM
          </span>
          <span className="hidden sm:block text-sm font-bold text-white">Chetan</span>
        </button>

        <div className="mx-auto hidden lg:flex items-center">
          {LINKS.map((l) => {
            const id = l.toLowerCase();
            const isActive = active === id;
            return (
              <a
                key={l}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                  isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {l}
                <span
                  className={`absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <a
          href={resume.file}
          download={resume.downloadName}
          className="ml-auto lg:ml-0 hidden sm:flex h-10 items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-4 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
        >
          Resume <FileText size={15} />
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="ml-auto sm:ml-1 lg:hidden grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/5"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {open && (
          <div className="fade-up absolute inset-x-0 top-[calc(100%+8px)] rounded-3xl border border-white/10 bg-slate-950/95 p-2 lg:hidden">
            {LINKS.map((l, i) => {
              const id = l.toLowerCase();
              return (
                <a
                  key={l}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(id);
                  }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold ${
                    active === id ? "bg-white/10 text-white" : "text-slate-300"
                  }`}
                >
                  {l}
                  <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                </a>
              );
            })}
            <a
              href={resume.file}
              download={resume.downloadName}
              className="mt-1 flex sm:hidden items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white"
            >
              Resume <FileText size={16} />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

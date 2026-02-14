import { FaHeart } from "react-icons/fa";
import { PERSONAL_INFO } from "../constants";

export default function Footer() {
  return (
    <footer className="relative py-8 bg-transparent overflow-hidden border-t border-slate-800/50">
      {/* Background Glow (Bottom Center) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-12.5 left-1/2 -translate-x-1/2 w-75 h-25 bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Top Glowing Divider Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-slate-800/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_cyan]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
        {/* "Made With" Text - Brightened */}
        <p className="text-slate-300 flex items-center gap-2 mb-2 font-medium tracking-wide text-sm">
          Engineered with
          <FaHeart className="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          using <span className="text-white font-semibold">React</span> &{" "}
          <span className="text-white font-semibold">Tailwind</span>
        </p>

        {/* Copyright - Brightened */}
        <p className="text-slate-200 text-xs font-mono uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
        </p>
      </div>
    </footer>
  );
}

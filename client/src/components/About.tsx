import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  FlaskConical,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { PERSONAL_INFO } from "../constants";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Local Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-75 md:w-125 h-75 md:h-125 bg-blue-600/20 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none mix-blend-screen will-change-transform backface-hidden" />
      <div className="absolute bottom-1/4 right-0 w-75 md:w-125 h-75 md:h-125 bg-cyan-600/10 rounded-full blur-[120px] translate-x-1/2 pointer-events-none mix-blend-screen will-change-transform backface-hidden" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: BIO */}
          <div className="space-y-8 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative will-change-transform backface-hidden"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <BookOpen size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                    Me
                  </span>
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative group will-change-transform backface-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl">
                <Sparkles className="absolute top-6 right-6 text-yellow-300 opacity-50 md:opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 pointer-events-none" />

                <p className="text-lg text-slate-300 leading-loose font-light pr-8 md:pr-12">
                  {PERSONAL_INFO.about}
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TIMELINE */}
          <div className="space-y-8 relative pt-4">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-cyan-500 to-transparent will-change-transform" />

            {/* CARD 1: MCA */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="relative pl-16 md:pl-24 group will-change-transform backface-hidden"
            >
              <div className="absolute left-8 top-8 -translate-x-1/2 z-10 bg-black rounded-full">
                <div className="w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 relative flex items-center justify-center group-hover:border-cyan-400 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="relative p-1 rounded-2xl bg-linear-to-br from-white/10 to-white/0 overflow-hidden group-hover:from-blue-500/50 group-hover:to-cyan-500/50 transition-colors duration-500">
                <div className="relative p-5 md:p-6 rounded-xl bg-slate-950/40 backdrop-blur-md h-full hover:bg-slate-900/90 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Master of Computer Applications
                      </h3>
                      <p className="text-blue-400 font-medium mt-1">
                        Sigma University
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Code size={20} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 w-fit border border-blue-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wide text-blue-200">
                      2025 - Present
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: BSc */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="relative pl-16 md:pl-24 group will-change-transform backface-hidden"
            >
              <div className="absolute left-8 top-8 -translate-x-1/2 z-10 bg-black rounded-full">
                <div className="w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 relative flex items-center justify-center group-hover:border-emerald-400 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="relative p-1 rounded-2xl bg-linear-to-br from-white/10 to-white/0 overflow-hidden group-hover:from-emerald-500/50 group-hover:to-teal-500/50 transition-colors duration-500">
                <div className="relative p-5 md:p-6 rounded-xl bg-slate-950/40 backdrop-blur-md h-full hover:bg-slate-900/90 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        BSc Chemistry
                      </h3>
                      <p className="text-emerald-400 font-medium mt-1">
                        Shri Govind Guru University
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <FlaskConical size={20} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 w-fit border border-emerald-500/20">
                    <GraduationCap size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold tracking-wide text-emerald-200">
                      2018 - 2021
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Briefcase, CalendarClock, MapPin } from "lucide-react";
import { EXPERIENCES } from "../constants";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-transparent">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
              Journey
            </span>
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
        </motion.div>

        <div className="relative flex flex-col gap-12">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-slate-800">
            <div className="absolute inset-0 bg-linear-to-b from-cyan-500 via-purple-500 to-transparent opacity-40" />
          </div>

          {EXPERIENCES.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative pl-16 md:pl-24 w-full"
            >
              <div className="absolute left-2.5 md:left-6 top-10 w-4 h-4 bg-slate-900 border-2 border-cyan-400 rounded-full z-20 shadow-lg shadow-cyan-400">
                <div className="absolute inset-0 bg-cyan-400 animate-ping opacity-50 rounded-full" />
              </div>

              <motion.div
                initial="initial"
                whileHover="hover"
                className="relative w-full group"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-xl overflow-hidden z-0"
                  style={{
                    willChange: "transform, border-color",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0,0,0)",
                  }}
                >
                  <motion.div
                    variants={{
                      initial: { top: "-100%" },
                      hover: {
                        top: ["-100%", "200%"],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "linear",
                        },
                      },
                    }}
                    className="absolute left-0 right-0 h-10 bg-linear-to-b from-transparent via-cyan-400/30 to-transparent pointer-events-none z-10 shadow-lg shadow-cyan-400/20"
                    style={{ transform: "translate3d(0,0,0)" }}
                  />

                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-xl" />
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                  {/* Right side – 4 particles, wider spacing */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`right-${i}`}
                      className="absolute right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
                      style={{
                        top: `${20 + i * 25}%`,
                        transform: "translate3d(0,0,0)",
                      }}
                      variants={{
                        initial: { x: 0, opacity: 0 },
                        hover: {
                          x: [0, 0, 150],
                          opacity: [0, 0, 1, 0],
                          transition: {
                            duration: 1.5,
                            times: [0, 0.6, 0.65, 0.9],
                            repeat: Infinity,
                            repeatDelay: 2,
                            delay: i * 0.05,
                          },
                        },
                      }}
                    />
                  ))}

                  {/* Left side – 4 particles, wider spacing */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`left-${i}`}
                      className="absolute left-0 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400"
                      style={{
                        top: `${20 + i * 25}%`,
                        transform: "translate3d(0,0,0)",
                      }}
                      variants={{
                        initial: { x: 0, opacity: 0 },
                        hover: {
                          x: [0, 0, -150],
                          opacity: [0, 0, 1, 0],
                          transition: {
                            duration: 1.5,
                            times: [0, 0.6, 0.65, 0.9],
                            repeat: Infinity,
                            repeatDelay: 2,
                            delay: i * 0.05,
                          },
                        },
                      }}
                    />
                  ))}
                </div>

                {/* Content Container */}
                <div className="p-6 md:p-10 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-white/10 pb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-2 font-bold text-lg text-slate-200">
                          <Briefcase size={18} className="text-purple-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-400 font-medium">
                          <MapPin size={14} /> {job.location}
                        </span>
                      </div>
                    </div>

                    <div className="self-start flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-400/20 whitespace-nowrap">
                      <CalendarClock size={16} />
                      <span className="font-mono font-bold text-sm tracking-wide">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {job.description.map((point, i) => (
                      <div
                        key={i}
                        className="flex gap-4 items-start group/line"
                      >
                        <div className="mt-2.5 min-w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]" />
                        <p className="text-slate-100 text-base md:text-lg leading-relaxed font-medium group-hover/line:text-white transition-colors">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 text-xs font-bold font-mono rounded bg-slate-800 text-cyan-100 border border-slate-700 group-hover:border-cyan-500/30 transition-colors"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

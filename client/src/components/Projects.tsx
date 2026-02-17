import { motion } from "framer-motion";
import { FolderGit2, Layers, Zap, Terminal } from "lucide-react";
import { PROJECTS } from "../constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-transparent overflow-hidden contain-paint"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
              Systems
            </span>
          </h2>
          <div className="h-1 w-24 bg-linear-to-r from-blue-500 to-purple-600 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full flex flex-col bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 group-hover:-translate-y-2 will-change-transform backface-hidden">
                <div className="h-1 w-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors shadow-lg">
                      <FolderGit2 size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-xs font-bold font-mono text-slate-300">
                      {project.category}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-200 text-base leading-relaxed font-medium border-l-2 border-slate-700 pl-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-8 grow">
                    <h4 className="flex items-center gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">
                      <Layers size={12} /> Key Implementations
                    </h4>
                    <ul className="space-y-3">
                      {project.highlights.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm group/item">
                          <Zap
                            size={14}
                            className="text-blue-400 mt-1 shrink-0"
                          />
                          <span className="text-slate-200 font-medium leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-xs font-bold font-mono text-blue-100 transition-colors"
                        >
                          <Terminal size={10} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

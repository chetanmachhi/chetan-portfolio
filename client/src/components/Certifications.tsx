import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { CERTIFICATIONS } from "../constants";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 bg-transparent overflow-hidden"
    >
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Certifications
            </span>
          </h2>
          <div className="h-1 w-24 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="relative h-full flex flex-col rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:-translate-y-2 overflow-hidden">
                {/* HUD Corner Brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-slate-700 group-hover:border-cyan-400 rounded-tl-lg transition-colors z-20" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-slate-700 group-hover:border-cyan-400 rounded-tr-lg transition-colors z-20" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-slate-700 group-hover:border-cyan-400 rounded-bl-lg transition-colors z-20" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-slate-700 group-hover:border-cyan-400 rounded-br-lg transition-colors z-20" />

                {/* Massive Background Icon (Watermark) */}
                <cert.icon className="absolute -right-8 -top-8 text-9xl text-slate-800/50 group-hover:text-cyan-500/10 transition-colors duration-500 rotate-12 z-0" />

                <div className="p-8 flex flex-col h-full relative z-10">
                  {/* HEADER: COMPANY NAME */}
                  <div className="mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 group-hover:from-cyan-300 group-hover:to-blue-400 uppercase tracking-tighter transition-all duration-300">
                      {cert.issuer}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                        VERIFIED
                      </span>
                      <span className="text-lg text-slate-1000 font-mono">
                        // {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grow">
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-100 transition-colors">
                      {cert.name}
                    </h4>

                    <p className="text-sm text-slate-200 leading-relaxed mb-8 font-medium border-l-2 border-slate-800 pl-4 group-hover:border-cyan-500/50 transition-colors">
                      {cert.description}
                    </p>
                  </div>

                  {/* Footer: Tech Button */}
                  <div className="mt-auto">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full py-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-center overflow-hidden group/btn transition-all"
                    >
                      {/* Button Scanline Effect */}
                      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />

                      <span className="relative flex items-center justify-center gap-2 text-sm font-bold text-slate-300 group-hover/btn:text-white uppercase tracking-wide">
                        <Award size={16} className="text-cyan-500" />
                        View Credential
                      </span>
                    </a>
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

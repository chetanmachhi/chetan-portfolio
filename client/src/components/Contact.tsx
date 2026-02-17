import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { PERSONAL_INFO } from "../constants";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-5 bg-transparent overflow-hidden contain-paint"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 rounded-full blur-[120px]"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl will-change-transform backface-hidden"
        >
          {/* Top Glow Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-50" />

          <div className="p-8 md:p-12 text-center">
            {/* Icon Header */}
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-800/50 mb-8 border border-white/5 shadow-lg">
              <Send size={32} className="text-cyan-400" />
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Connect
              </span>
            </h2>

            {/* Description & Freelance CTA */}
            <div className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed space-y-4">
              <p>
                Whether you have a opportunities, question, a project idea, or
                just want to say hi, my inbox is always open!
              </p>
              <p className="text-cyan-400 font-medium tracking-wide">
                Have a freelance project? Just hit me up via Instagram or Email.
              </p>
            </div>

            {/* Contact Grid (Email & Phone) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Email Card */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group relative flex items-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 will-change-transform"
              >
                <div className="p-4 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Email Me
                  </h3>
                  <p className="text-white font-mono text-sm md:text-base">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <div className="group relative flex items-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-1 will-change-transform">
                <div className="p-4 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Call Me
                  </h3>
                  <p className="text-white font-mono text-sm md:text-base">
                    {PERSONAL_INFO.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
              >
                <FaGithub
                  size={24}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-slate-900/80 border border-slate-700 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
              >
                <FaLinkedin
                  size={24}
                  className="text-slate-400 group-hover:text-blue-400 transition-colors"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/chetan_25_03?igsh=OG8xdDhtMmVtZjkw"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-slate-900/80 border border-slate-700 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
              >
                <FaInstagram
                  size={24}
                  className="text-slate-400 group-hover:text-pink-400 transition-colors"
                />
              </a>
            </div>

            {/* Location Footer */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-3 text-slate-200 text-base font-medium">
              <MapPin size={18} className="text-cyan-400" />
              <span className="tracking-wide">Based in Vadodara, Gujarat</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

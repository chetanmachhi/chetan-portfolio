import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SKILLS, SKILL_CATEGORIES } from "../constants";

export default function Skills() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % SKILLS.length);
  };

  const prevStep = () => {
    setIndex((prev) => (prev - 1 + SKILLS.length) % SKILLS.length);
  };

  const getCardStyle = (itemIndex: number) => {
    const total = SKILLS.length;
    let distance = (itemIndex - index + total) % total;
    if (distance > total / 2) distance -= total;

    if (distance === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 10, rotateY: 0 };
    } else if (Math.abs(distance) === 1) {
      return {
        x: distance * 300,
        scale: 0.9,
        opacity: 0.8,
        zIndex: 5,
        rotateY: distance * -15,
      };
    } else if (Math.abs(distance) === 2) {
      return {
        x: distance * 250,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 1,
        rotateY: distance * -30,
      };
    } else {
      return { x: 0, scale: 0, opacity: 0, zIndex: 0, rotateY: 0 };
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[95vw] xl:max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Arsenal
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Mastering the tools that build the future.
          </p>
        </div>

        <div className="relative w-full h-80 flex items-center justify-center perspective-1000 mb-8">
          {SKILLS.map((skill, i) => {
            const style = getCardStyle(i);
            const xOffset = isMobile ? style.x * 0.4 : style.x;
            const isActive = style.opacity === 1;

            return (
              <motion.div
                key={i}
                className="absolute w-64 h-80 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-6 cursor-pointer"
                animate={{
                  x: xOffset,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  rotateY: style.rotateY,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => setIndex(i)}
                whileHover={{
                  borderColor: "rgba(6,182,212,0.5)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.2)",
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-b from-cyan-500/10 to-transparent rounded-3xl pointer-events-none" />
                )}
                <div
                  className={`p-5 rounded-full bg-black/40 border border-white/5 ${isActive ? "scale-110 shadow-lg shadow-cyan-500/20" : ""} transition-all duration-500`}
                >
                  <skill.icon
                    className={`text-6xl ${skill.color} filter drop-shadow-lg`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {skill.name}
                </h3>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-8 mb-8 z-50">
          <button
            onClick={prevStep}
            className="p-3 rounded-full bg-slate-900/50 border border-slate-700 text-white hover:bg-cyan-500 transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextStep}
            className="p-3 rounded-full bg-slate-900/50 border border-slate-700 text-white hover:bg-cyan-500 transition-all active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full mb-16">
          {SKILLS.map((skill, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 min-w-30 ${
                index === i
                  ? "bg-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105 z-10"
                  : "bg-slate-900/40 border-slate-700 hover:border-slate-500"
              }`}
            >
              {index !== i && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0_340deg,cyan_360deg)] animate-[spin_2s_linear_infinite]" />
                  <div className="absolute inset-px bg-slate-900 rounded-lg" />
                </div>
              )}
              <div className="relative z-10 flex items-center gap-2 w-full justify-center">
                <skill.icon
                  className={`text-lg ${skill.color} filter drop-shadow-md`}
                />
                <span
                  className={`text-xs font-medium whitespace-nowrap ${index === i ? "text-white" : "text-slate-200"}`}
                >
                  {skill.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:text-white group-hover:bg-linear-to-br group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-300 shadow-lg">
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="relative overflow-hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0_340deg,cyan_360deg)] animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-px bg-slate-900 rounded-lg" />
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      {s.icon && <s.icon className={`text-sm ${s.color}`} />}
                      <span className="text-sm font-bold text-slate-200 group-hover:text-white">
                        {s.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

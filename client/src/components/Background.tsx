import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [hordeKey, setHordeKey] = useState(0);
  const [hordeConfig, setHordeConfig] = useState({
    angle: 0,
    startY: 50,
    count: 3,
  });

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      xStart: Math.random() * 100,
      xEnd: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 15 + 25,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.15,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const startY = Math.random() * 100;
      const angle =
        startY > 50 ? -Math.random() * 10 - 5 : Math.random() * 10 + 5;

      setHordeConfig({
        angle,
        startY,
        count: Math.floor(Math.random() * 8) + 3,
      });
      setHordeKey((prev) => prev + 1);
    }, 22000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-950">
      {/* Inject Keyframes for the Particle Animation */}
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-120vh) translateX(var(--drift));
            opacity: 0;
          }
        }
      `}</style>

      {/* Background Gradients & Noise */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-blue-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

      {/* Floating Particles */}
      {particles.map((p, i) => {
        const drift = p.xEnd - p.xStart;
        return (
          <div
            key={`b-${i}`}
            className="absolute rounded-full bg-slate-500 blur-[1px]"
            style={
              {
                left: `${p.xStart}vw`,
                top: "105vh", // Start slightly below screen
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `particleFloat ${p.duration}s linear infinite`,
                animationDelay: `-${Math.random() * 20}s`, // Randomize start time
                "--drift": `${drift}vw`,
                "--opacity": p.opacity,
              } as any
            }
          />
        );
      })}

      {/* Shooting Comets */}
      <AnimatePresence mode="wait">
        {[...Array(hordeConfig.count)].map((_, i) => (
          <Comet key={`${hordeKey}-${i}`} config={hordeConfig} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Comet({ config, index }: { config: any; index: number }) {
  const delay = index * 0.5;
  const duration = 20;

  return (
    <div
      className="absolute z-0"
      style={{
        left: "-20vw",
        top: `${config.startY + index * 5}vh`,
        transform: `rotate(${config.angle}deg)`,
        transformOrigin: "left center",
        width: "150vw",
        height: "2px",
        pointerEvents: "none",
      }}
    >
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: "100%",
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: duration,
          delay: delay,
          ease: "linear",
          times: [0, 0.05, 0.9, 1],
        }}
        className="relative h-full"
      >
        {/* Comet Tail */}
        <div
          className="absolute left-0 right-0 h-full bg-linear-to-r from-transparent via-blue-600 to-white blur-[1px]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, transparent 10%, black 90%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, transparent 10%, black 90%)",
          }}
        />

        {/* Comet Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="w-0.75 h-0.75 bg-white rounded-full shadow-[0_0_8px_#fff,0_0_15px_#60a5fa]" />
        </div>
      </motion.div>
    </div>
  );
}

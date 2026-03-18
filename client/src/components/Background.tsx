import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [hordeKey, setHordeKey] = useState(0);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = [...Array(1500)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHordeKey((prev) => prev + 1);
    }, 12000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030712] overflow-hidden">
      <style>{`
        @keyframes skyRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div className="absolute inset-0 bg-linear-to-b from-[#0a0f25] via-[#030712] to-[#020617]" />

      <div 
        className="absolute top-[50%] left-[50%]"
        style={{
          width: '200vmax',
          height: '200vmax',
          animation: 'skyRotate 240s linear infinite'
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          key={hordeKey}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 60}vw`,
            top: `${10 + Math.random() * 30}vh`,
            transform: `rotate(${25 + Math.random() * 20}deg)`,
          }}
        >
          <motion.div
            className="relative w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
            initial={{ x: 0, scale: 0, opacity: 0 }}
            animate={{
              x: "30vw",
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              ease: "linear",
            }}
          >
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-blue-100 to-white"
              style={{
                width: "80px",
                height: "1.5px",
                transformOrigin: "right center",
                transform: "translateX(-100%)",
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
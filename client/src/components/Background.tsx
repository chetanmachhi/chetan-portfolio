import { motion } from "framer-motion";

export default function Background() {
  // Define particles with randomized "sway" and rise
  const particles = [...Array(25)].map(() => ({
    xStart: Math.random() * 100, // Start position %
    xEnd: Math.random() * 100, // End position %
    yStart: 110, // Start below screen
    size: Math.random() * 8 + 2, // 2px to 10px
    duration: Math.random() * 15 + 15, // Slow, majestic movement
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Space / Ocean Gradient Base */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950" />

      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400 blur-[1px]"
          initial={{
            x: `${p.xStart}vw`,
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh", // Float to top
            x: [`${p.xStart}vw`, `${(p.xStart + p.xEnd) / 2}vw`, `${p.xEnd}vw`], // Sway
            opacity: [0, p.opacity, 0], // Fade in/out
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
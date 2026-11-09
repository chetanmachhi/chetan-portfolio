import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Code, Database, Terminal, X } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { PERSONAL_INFO } from "../constants";
import { useProfile } from "../profile";
import profileImg from "../assets/chetan-photo.jpeg";

/*
 * Hero visual: round profile photo with a glowing ring, a slow spinning orbit
 * line, and three floating icon cards that dodge the cursor. Click the photo for the profile
 * card.
 */

interface FloatingIconProps {
  Icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  initialX: number;
  initialY: number;
  delay: number;
}

const FloatingIcon = ({ Icon, color, bg, border, initialX, initialY, delay }: FloatingIconProps) => {
  const controls = useAnimation();
  // Idle bobbing is a CSS animation on the wrapper (runs on the GPU compositor, no JS per frame).
  // framer-motion only runs while the icon is dodging the cursor.
  const [floatDuration] = useState(() => 5 + Math.random() * 2);

  const handleHover = () => {
    const escapeX = (Math.random() - 0.5) * 250;
    const escapeY = (Math.random() - 0.5) * 250;

    controls
      .start({
        x: escapeX,
        y: escapeY,
        scale: 1.1,
        transition: { duration: 0.3, ease: "backOut" },
      })
      .then(() =>
        controls.start({
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 2.5, ease: "easeInOut" },
        })
      );
  };

  return (
    <div
      className="hero-float absolute z-50"
      style={{
        left: `calc(50% + ${initialX}px)`,
        top: `calc(50% + ${initialY}px)`,
        marginLeft: "-32px",
        marginTop: "-32px",
        animationDuration: `${floatDuration * 2}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <motion.div
        className={`p-4 rounded-2xl ${bg} ${border} border shadow-xl backdrop-blur-md cursor-pointer`}
        animate={controls}
        onMouseEnter={handleHover}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className={`w-7 h-7 ${color}`} />
      </motion.div>
    </div>
  );
};

export default function HeroVisual({ className = "" }: { className?: string }) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { roles } = useProfile();

  return (
    <>
      <motion.div
        className={`flex justify-center lg:justify-end perspective-1000 ${className}`}
        initial={{ opacity: 0, transform: "scale(0.8)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center scale-[0.6] xs:scale-[0.7] md:scale-100">
          {/* Pulsing glow: radial gradient instead of blur-3xl (a GPU blur every frame) */}
          <div
            className="absolute -inset-10 rounded-full animate-pulse"
            style={{ background: "radial-gradient(circle, rgba(8,145,178,0.30) 0%, rgba(37,99,235,0.22) 40%, rgba(37,99,235,0) 70%)" }}
          />

          <div
            className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"
            style={{ transform: "translateZ(-50px)" }}
          />

          <FloatingIcon Icon={Code} color="text-cyan-400" bg="bg-cyan-950/50" border="border-cyan-500/30" initialX={0} initialY={-190} delay={0} />
          <FloatingIcon Icon={Database} color="text-blue-400" bg="bg-blue-950/50" border="border-blue-500/30" initialX={180} initialY={120} delay={1.5} />
          <FloatingIcon Icon={Terminal} color="text-emerald-400" bg="bg-emerald-950/50" border="border-emerald-500/30" initialX={-180} initialY={120} delay={3} />

          <div
            className="absolute inset-[18%] rounded-full bg-slate-900 p-2 cursor-pointer group shadow-2xl z-10"
            onClick={() => setIsProfileExpanded(true)}
            style={{
              transform: "translateZ(30px)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-full animate-spin-slow opacity-60 group-hover:opacity-100 blur-lg transition-opacity duration-500" />

            <div className="absolute inset-1 rounded-full overflow-hidden border-[3px] border-slate-800 bg-slate-900">
              <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={profileImg}
                alt="Chetan Machhi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400";
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portalled to <body> so no transformed parent can trap the fixed overlay */}
      {createPortal(
        <AnimatePresence>
          {isProfileExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-lg p-6"
              onClick={() => setIsProfileExpanded(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] border border-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsProfileExpanded(false)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-slate-300 hover:text-white hover:bg-red-500/80 transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>

                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <img src={profileImg} alt="Chetan Machhi Full" className="w-full h-full object-cover" />
                </div>

                <div className="p-8 -mt-20 relative z-20">
                  <h3 className="text-4xl font-bold text-white mb-2">{PERSONAL_INFO.name}</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                      {roles[0]}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                      {roles[1]}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Passionate about building scalable systems and intuitive user interfaces. Always learning, always coding.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

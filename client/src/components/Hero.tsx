import React, { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import {
  Mail,
  Code,
  Database,
  Terminal,
  X,
  ArrowRight,
  FileText,
} from "lucide-react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { PERSONAL_INFO } from "../constants";
import profileImg from "../assets/rengoku.jpeg";
import resumeFile from "../assets/chetan-resume-2026.pdf";

interface FloatingIconProps {
  Icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  initialX: number;
  initialY: number;
  delay: number;
}

const FloatingIcon = ({
  Icon,
  color,
  bg,
  border,
  initialX,
  initialY,
  delay,
}: FloatingIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -15, 0, 15, 0],
      x: [0, 10, 0, -10, 0],
      transition: {
        duration: 5 + Math.random() * 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      },
    });
  }, [controls, delay]);

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
      .then(() => {
        controls.start({
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 2.5,
            ease: "easeInOut",
            onComplete: () => {
              controls.start({
                y: [0, -15, 0, 15, 0],
                x: [0, 10, 0, -10, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              });
            },
          },
        });
      });
  };

  return (
    <motion.div
      className={`absolute p-4 rounded-2xl ${bg} ${border} border shadow-xl backdrop-blur-md z-50 cursor-pointer`}
      style={{
        left: `calc(50% + ${initialX}px)`,
        top: `calc(50% + ${initialY}px)`,
        marginLeft: "-32px",
        marginTop: "-32px",
        transformStyle: "preserve-3d",
        z: 100,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
      }}
      animate={controls}
      onMouseEnter={handleHover}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className={`w-7 h-7 ${color}`} />
    </motion.div>
  );
};

export default function Hero() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) / width);
    y.set((clientY - top - height / 2) / height);
  }

  const [textIndex, setTextIndex] = useState(0);
  const roles = [
    "Full Stack Developer",
    "Backend Architect",
    "System Automator",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-10 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-800/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 space-y-8 text-center lg:text-left"
        >
          <div className="space-y-2 relative">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              <span className="block text-slate-300 text-4xl lg:text-5xl mb-2 font-bold">
                Hello, I'm
              </span>
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text animate-gradient-x bg-size-[200%_auto]">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <div className="h-12 overflow-hidden flex justify-center lg:justify-start pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl lg:text-3xl font-bold text-slate-400"
                >
                  {roles[textIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
          >
            A passionate{" "}
            <strong className="text-cyan-400 font-medium">
              Full Stack Developer
            </strong>{" "}
            crafting seamless digital experiences. I blend
            <strong className="text-blue-400 font-medium ml-1">
              architectural precision
            </strong>{" "}
            with
            <strong className="text-emerald-400 font-medium ml-1">
              creative automation
            </strong>{" "}
            to build scalable solutions that live on the web and mobile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
          >
            {/* Primary Contact Button */}
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center gap-2"
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2">
                Contact Me{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>

            <a
              href={resumeFile}
              download="Chetan_Machhi_Resume.pdf"
              className="group relative px-8 py-4 bg-slate-900/50 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 border border-white/10 hover:border-cyan-500/50 shadow-lg flex items-center gap-2"
            >
              <span className="relative flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                Resume <FileText size={18} />
              </span>
            </a>
          </motion.div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-6">
            {[
              {
                icon: FaGithub,
                href: PERSONAL_INFO.github,
                color: "hover:text-white",
              },
              {
                icon: FaLinkedin,
                href: PERSONAL_INFO.linkedin,
                color: "hover:text-blue-400",
              },
              {
                icon: FaInstagram,
                href: "https://www.instagram.com/chetan_25_03?igsh=OG8xdDhtMmVtZjkw",
                color: "hover:text-pink-400",
              },
              {
                icon: Mail,
                href: `mailto:${PERSONAL_INFO.email}`,
                color: "hover:text-cyan-400",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-400 ${social.color} hover:scale-110 transition-all duration-300 p-2`}
              >
                <social.icon size={26} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0)",
            }}
            className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center scale-[0.6] xs:scale-[0.7] md:scale-100"
          >
            {/* Background Glows */}
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />

            <div
              className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"
              style={{ transform: "translateZ(-50px)" }}
            />

            {/* FLOATING ICONS */}
            <FloatingIcon
              Icon={Code}
              color="text-cyan-400"
              bg="bg-cyan-950/50"
              border="border-cyan-500/30"
              initialX={0}
              initialY={-190}
              delay={0}
            />

            <FloatingIcon
              Icon={Database}
              color="text-blue-400"
              bg="bg-blue-950/50"
              border="border-blue-500/30"
              initialX={180}
              initialY={120}
              delay={1.5}
            />

            <FloatingIcon
              Icon={Terminal}
              color="text-emerald-400"
              bg="bg-emerald-950/50"
              border="border-emerald-500/30"
              initialX={-180}
              initialY={120}
              delay={3}
            />

            {/* Profile Picture */}
            <div
              className="absolute inset-[18%] rounded-full bg-slate-900 p-2 cursor-pointer group shadow-2xl z-10"
              onClick={() => setIsProfileExpanded(true)}
              style={{
                transform: "translateZ(30px)",
                willChange: "transform",
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
          </motion.div>
        </motion.div>
      </div>

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
                <img
                  src={profileImg}
                  alt="Chetan Machhi Full"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 -mt-20 relative z-20">
                <h3 className="text-4xl font-bold text-white mb-2">
                  {PERSONAL_INFO.name}
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                    Full Stack Developer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                    Backend Automator
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Passionate about building scalable systems and intuitive user
                  interfaces. Always learning, always coding.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

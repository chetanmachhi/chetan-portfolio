import { useState, useEffect, useRef } from "react";
import { Menu, X, FileText, Sparkles, ArrowRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import resumeFile from "../assets/chetan-resume-2026.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = ref.current!.getBoundingClientRect();
      const relX = (e.clientX - left - width / 2) * 0.3;
      const relY = (e.clientY - top - height / 2) * 0.3;
      x.set(relX);
      y.set(relY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
      >
        {children}
      </motion.div>
    );
  };

  // Added "Certifications" to the list
  const navs = [
    "Home",
    "About",
    "Skills",
    "Experience",
    "Certifications",
    "Projects",
    "Contact",
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <MagneticWrapper>
            <div
              className="relative group w-14 h-14 cursor-pointer"
              style={{ perspective: "500px" }}
              onClick={(e) => handleScrollTo(e as any, "home")} // Scroll to top on logo click
            >
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-xl rotate-6 scale-90 opacity-60 blur-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:opacity-100"></div>
              <div className="absolute inset-0 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center z-10 shadow-2xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:-rotate-3">
                <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                <span className="text-xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-200">
                  CM
                </span>
              </div>
            </div>
          </MagneticWrapper>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navs.map((item) => (
              <MagneticWrapper key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScrollTo(e, item.toLowerCase())}
                  className="group relative px-4 py-2 block"
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden border border-white/10">
                    <div className="absolute inset-[-250%] bg-[conic-gradient(from_0deg,transparent_20%,#3b82f6_50%,transparent_80%)] animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute inset-px bg-slate-950/90 backdrop-blur-md rounded-xl"></div>
                  </div>
                  <span className="relative z-10 text-sm font-bold text-slate-300 group-hover:text-white transition-colors duration-200 uppercase tracking-wide">
                    {item}
                  </span>
                </a>
              </MagneticWrapper>
            ))}

            <MagneticWrapper>
              <a
                href={resumeFile}
                download="Chetan_Machhi_Resume.pdf"
                className="relative overflow-hidden ml-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg group flex items-center gap-2"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/30 to-transparent z-20"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Resume <FileText size={18} />
                </span>
                <span className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Sparkles
                    size={12}
                    className="text-yellow-300 animate-pulse"
                  />
                </span>
              </a>
            </MagneticWrapper>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-3 bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 text-white active:scale-95 transition-transform duration-100"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-24 z-40 px-6 lg:hidden"
          >
            <div className="bg-slate-950/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {navs.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleScrollTo(e, item.toLowerCase())}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between text-lg font-bold text-slate-300 hover:text-white hover:bg-white/5 p-4 rounded-xl transition-all duration-200"
                  >
                    {item}
                    <ArrowRight size={16} className="opacity-50" />
                  </motion.a>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="#resume"
                  className="mt-4 w-full py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-center flex justify-center items-center gap-2"
                >
                  Resume <FileText size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

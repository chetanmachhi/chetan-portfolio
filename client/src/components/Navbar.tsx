import { useState, useEffect, useRef } from "react";
import { Menu, X, FileText, ArrowRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Add these
import resumeFile from "../assets/chetan-resume-2026-Feb.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SMART SCROLL LOGIC
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // 1. If we're not on home, navigate to home with the hash
      navigate(`/#${id}`);
      setIsOpen(false);
      return;
    }

    // 2. If we ARE on home, do the smooth scroll logic
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
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
        style={{
          x: springX,
          y: springY,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    );
  };

  const navs = ["Home", "About", "Skills", "Experience", "Certifications", "Projects", "Contact"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? "py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "py-4 md:py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <MagneticWrapper>
            <div
              className="relative group w-12 h-12 md:w-14 md:h-14 cursor-pointer"
              style={{ perspective: "500px" }}
              onClick={(e) => handleScrollTo(e as any, "home")}
            >
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-xl rotate-6 scale-90 opacity-60 blur-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center z-10 shadow-2xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:-rotate-3">
                <span className="text-lg md:text-xl font-black text-white tracking-tight">CM</span>
              </div>
            </div>
          </MagneticWrapper>

          <div className="hidden lg:flex items-center gap-6">
            {navs.map((item) => (
              <MagneticWrapper key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScrollTo(e, item.toLowerCase())}
                  className="group relative px-4 py-2 block"
                >
                  <span className="relative z-10 text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wide">
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
                Resume <FileText size={18} />
              </a>
            </MagneticWrapper>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-3 bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 z-40 px-6 lg:hidden ${scrolled ? "top-20" : "top-24"}`}
          >
            <div className="bg-slate-950/95 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
              <div className="flex flex-col space-y-2">
                {navs.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleScrollTo(e, item.toLowerCase())}
                    className="flex items-center justify-between text-lg font-bold text-slate-300 p-4 rounded-xl hover:bg-white/5"
                  >
                    {item}
                    <ArrowRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
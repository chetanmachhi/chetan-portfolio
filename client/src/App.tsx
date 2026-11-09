import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Certifications from "./components/Certifications";
import Blinkit from "./pages/Blinkit";
import { ProfileProvider, isHomePath } from "./profile";

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (isHomePath(pathname) && hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }, 100);
      }
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const home = (
  <>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Certifications />
    <Projects />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <ProfileProvider>
      <div className="min-h-screen font-sans selection:bg-cyan-500/30 text-white relative overflow-x-hidden bg-transparent">
        <Background />
        <ScrollHandler />
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={home} />
            {/* /presales, /pre-sales, … → same page, Pre-Sales content (see profile.tsx) */}
            <Route path="/:variant" element={home} />
            <Route path="/projects/blinkit" element={<Blinkit />} />
          </Routes>
        </main>

        <Footer />
      </div>
      </ProfileProvider>
    </Router>
  );
}

export default App;

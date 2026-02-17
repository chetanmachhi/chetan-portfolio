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

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 text-white relative">
      {/* Global Background Layer */}
      {/* <Background /> */}

      {/* <Navbar /> */}

      {/* Main Content - z-10 ensures it sits ON TOP of the background */}
      <main className="relative z-10">
        {
        // <Hero />
        // <About />
        <Skills />
        // <Experience />
        // <Certifications />
        // <Projects />
        // <Contact />
         }
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;

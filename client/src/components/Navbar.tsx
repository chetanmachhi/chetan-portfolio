import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navs = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Chetan.dev
          </span>
          <div className="hidden md:flex space-x-8">
            {navs.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white hover:scale-105 transition-all text-sm font-medium">
                {item}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          {navs.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
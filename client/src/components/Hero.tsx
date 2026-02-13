import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import profileImg from '../assets/react.svg';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full">
            Available for hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
              {PERSONAL_INFO.name}
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
            {PERSONAL_INFO.role} building scalable web applications and seamless digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href={PERSONAL_INFO.linkedin} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/25">
              <FaLinkedin size={20} /> LinkedIn
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-700">
              <FaGithub size={20} /> GitHub
            </a>
             <a href="mailto:chetanmachhi6@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-700">
              <Mail size={20} /> Email
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50" />
            <img 
              src={profileImg} 
              alt="Chetan Machhi" 
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-slate-900 shadow-2xl z-10"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400" }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
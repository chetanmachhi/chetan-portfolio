import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={index} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="h-2 bg-linear-to-r from-blue-500 to-purple-500" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs font-medium px-2 py-1 bg-slate-800 text-blue-300 rounded border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                    <Github size={16} /> Code
                  </button>
                  <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                    <ExternalLink size={16} /> Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
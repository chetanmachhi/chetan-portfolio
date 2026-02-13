import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '../constants';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          <span className="border-b-4 border-blue-500 pb-2">Work Experience</span>
        </h2>
        
        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 hidden md:block" />

          {EXPERIENCE.map((job, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 -translate-x-1/2 mt-1.5 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

              <div className="md:w-1/2" />
              
              <div className="md:w-1/2 pl-12 md:pl-0">
                <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Briefcase size={16} />
                    <span className="text-sm font-semibold tracking-wide">{job.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                  <h4 className="text-lg text-slate-300 mb-4">{job.company}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { BookOpen } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <BookOpen className="text-blue-400" />
            About Me
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {PERSONAL_INFO.about}
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
              <h3 className="font-bold text-blue-400 mb-2">Education</h3>
              <p className="text-white">MCA (Pursuing)</p>
              <p className="text-slate-400 text-sm">Sigma University | 2025 - 2027</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
              <h3 className="font-bold text-blue-400 mb-2">Previous</h3>
              <p className="text-white">BSc Chemistry</p>
              <p className="text-slate-400 text-sm">Shri Govind Guru University | 2018 - 2021</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
        <p className="text-slate-400 mb-12">
          Currently looking for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center justify-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors text-slate-300">
            <Mail className="text-blue-400" />
            {PERSONAL_INFO.email}
          </a>
          <div className="flex items-center justify-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700 text-slate-300">
            <Phone className="text-emerald-400" />
            {PERSONAL_INFO.phone}
          </div>
        </div>
      </div>
    </section>
  );
}
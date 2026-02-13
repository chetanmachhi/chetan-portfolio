import { SKILLS } from '../constants';

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300">
              <skill.icon className={`text-5xl ${skill.color}`} />
              <span className="font-semibold text-slate-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
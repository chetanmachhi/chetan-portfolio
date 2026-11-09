import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "../constants";
import { Reveal, SectionHeader, WindowBar, card } from "./ui";

/*
 * CONTACT — split layout: the pitch on the left, a "transmission console" on the right
 * with one-click copy for the email and every channel as a row.
 */

const CHANNELS = [
  { icon: FaLinkedin, label: "LinkedIn", value: "in/chetan-machhi", href: PERSONAL_INFO.linkedin, color: "text-blue-400" },
  { icon: FaGithub, label: "GitHub", value: "@chetanmachhi", href: PERSONAL_INFO.github, color: "text-white" },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@chetan_25_03",
    href: "https://www.instagram.com/chetan_25_03?igsh=OG8xdDhtMmVtZjkw",
    color: "text-pink-400",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader index="06" label="Contact" title="Let's build" accent="something." />
          <Reveal delay={80}>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
              Whether you have an opportunity, a question, a project idea, or just want to say hi — my inbox is always open.
            </p>
            <p className="mt-3 font-semibold text-cyan-300">Have a freelance project? Reach out on Instagram or email.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Mail size={18} /> Send an email
              </a>
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-cyan-400" /> Based in Vadodara, Gujarat
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} from="right">
          <div className={`${card} overflow-hidden`}>
            <WindowBar path="~/contact/transmission.sh" />
            <div className="divide-y divide-white/5">
              {/* Email with copy */}
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Mail size={20} />
                </span>
                <div className="min-w-0 grow">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="block truncate font-semibold text-white hover:text-cyan-200">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    copied ? "border-emerald-400/40 text-emerald-300" : "border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Phone */}
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 px-5 py-4 hover:bg-white/2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <Phone size={20} />
                </span>
                <div className="grow">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Phone</p>
                  <p className="font-semibold text-white">{PERSONAL_INFO.phone}</p>
                </div>
                <ArrowUpRight size={18} className="text-slate-500 transition-colors group-hover:text-white" />
              </a>

              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-white/2"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5">
                    <c.icon size={20} className={c.color} />
                  </span>
                  <div className="grow">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{c.label}</p>
                    <p className="font-semibold text-white">{c.value}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-500 transition-colors group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

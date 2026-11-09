import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Bike,
  Store,
  Download,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Layers,
  Github,
  Smartphone,
  Monitor,
  MapPin,
  PackageCheck,
  Timer,
} from "lucide-react";
import { BLINKIT } from "../constants";
import { useProfile } from "../profile";


const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="group/copy flex w-full items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-left transition-colors hover:border-cyan-500/50"
      aria-label={`Copy ${label}`}
    >
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <span className="block truncate font-mono text-sm text-slate-100">{value}</span>
      </span>
      {copied ? (
        <Check size={16} className="shrink-0 text-emerald-400" />
      ) : (
        <Copy size={16} className="shrink-0 text-slate-500 group-hover/copy:text-cyan-400" />
      )}
    </button>
  );
}

const APPS = [
  {
    key: "customer",
    title: "Customer App",
    platform: "Android APK",
    icon: ShoppingBag,
    accent: "from-amber-400 to-yellow-500",
    text: "text-amber-300",
    description: "Browse the catalog, add to cart, apply coupons, check out and track the order live.",
    action: { label: "Download APK", href: BLINKIT.customerApkUrl, icon: Download },
    creds: [
      { label: "Phone", value: "Any 10-digit number" },
      { label: "OTP", value: "123456" },
    ],
  },
  {
    key: "store",
    title: "Store Panel",
    platform: "Web app",
    icon: Store,
    accent: "from-emerald-400 to-green-600",
    text: "text-emerald-300",
    description: "Accept orders on the live board, pack them, assign riders, manage catalog, coupons and analytics.",
    action: { label: "Open store panel", href: BLINKIT.storePanelUrl, icon: ExternalLink },
    creds: [
      { label: "Email", value: "staff@blinkit.com" },
      { label: "Password", value: "Staff@123456" },
    ],
  },
  {
    key: "delivery",
    title: "Delivery Partner App",
    platform: "Android APK",
    icon: Bike,
    accent: "from-cyan-400 to-blue-600",
    text: "text-cyan-300",
    description: "Go online, accept an order, navigate with Google Maps, mark it picked up and delivered.",
    action: { label: "Download APK", href: BLINKIT.deliveryApkUrl, icon: Download },
    creds: [
      { label: "Phone", value: "9000000001" },
      { label: "Password", value: "Rider@123" },
    ],
  },
];

const FLOW = [
  { icon: ShoppingBag, title: "Order placed", text: "Customer checks out. Stock is reserved atomically so two buyers can't take the last item." },
  { icon: Store, title: "Store accepts", text: "The order appears on the store's live board with a sound alert; staff accept and pack it." },
  { icon: Bike, title: "Rider accepts", text: "Online riders see it instantly. The first to accept wins via a conditional update, never two." },
  { icon: MapPin, title: "Pickup & navigate", text: "Rider opens Google Maps for the store, then the customer, straight from the app." },
  { icon: PackageCheck, title: "Delivered", text: "Rider marks it delivered; cash-on-delivery is settled and every screen updates." },
];

const MODULES = [
  { name: "customer", path: "/api", consumer: "Customer app", icon: Smartphone },
  { name: "store", path: "/api/v1/store", consumer: "Store panel", icon: Monitor },
  { name: "delivery", path: "/api/v1/delivery", consumer: "Rider app", icon: Bike },
];

const HIGHLIGHTS = [
  "Modular monolith: three domain modules plus a shared layer in one deployable service. Each module also runs standalone, so it can be split into a microservice by moving one folder.",
  "Race-safe workflows: stock reservation with $gte guards and rollback, and rider assignment through conditional findOneAndUpdate so concurrent taps resolve to exactly one winner.",
  "Store live board profiled with Chrome traces: removed paint-heavy shadows, added content-visibility and memoised cards, taking janky frames from 55% to 0% at 4x CPU throttle.",
  "IST-aware analytics (store-local day boundaries), hourly 'Today' view, theme-aware charts, CSV export.",
  "Role-based store access (owner vs staff permission matrix), JWT auth with refresh rotation, Zod-validated APIs.",
  "Rider app with in-app toasts and confirmation sheets, polling-based live lists, and Google Maps two-wheeler navigation hand-off without any maps SDK.",
];

const STACK = {
  Mobile: ["React Native 0.88", "TypeScript", "React Navigation", "TanStack Query", "Zustand"],
  Web: ["React", "Vite", "Tailwind CSS", "Radix UI", "Recharts"],
  Backend: ["Node.js", "Express", "MongoDB", "Mongoose", "Zod", "JWT"],
  Infra: ["Render", "Vercel", "MongoDB Atlas", "Docker (local DB)"],
};

export default function Blinkit() {
  const { homePath } = useProfile();
  return (
    <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 pb-20 pt-28 sm:px-6 md:pt-32">
      {/* Header */}
      <motion.header {...fade} className="space-y-8 border-b border-white/10 pb-10">
        <Link to={`${homePath}#projects`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-300">
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="rounded-2xl border border-amber-400/60 bg-amber-400/10 p-4 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.2)]">
              <Timer size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                Blinkit{" "}
                <span className="bg-linear-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">Clone</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-slate-300 md:text-lg">
                A complete 10-minute grocery delivery platform: a customer app, a delivery partner app and a store
                admin panel, running on one modular Node.js backend. All three are live, so you can try the full order
                flow yourself.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={BLINKIT.storePanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-colors hover:bg-blue-500"
            >
              <ExternalLink size={16} /> Open store panel
            </a>
            <a
              href={BLINKIT.repos.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5"
            >
              <Github size={16} /> Source
            </a>
          </div>
        </div>
      </motion.header>

      {/* Try it */}
      <section className="space-y-8">
        <motion.h2 {...fade} className="text-2xl font-extrabold text-white md:text-4xl">
          Try it{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">live</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {APPS.map((app, i) => (
            <motion.div
              key={app.key}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80"
            >
              <div className={`h-1 w-full bg-linear-to-r ${app.accent}`} />
              <div className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                      <app.icon size={22} className={app.text} />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">{app.title}</h3>
                      <span className="font-mono text-xs text-slate-400">{app.platform}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium leading-relaxed text-slate-300">{app.description}</p>

                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Demo login</span>
                  {app.creds.map((c) => (
                    <CopyValue key={c.label} label={c.label} value={c.value} />
                  ))}
                </div>

                <a
                  href={app.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10"
                >
                  <app.action.icon size={16} /> {app.action.label}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p {...fade} className="text-sm text-slate-400">
          Tip: install both APKs, place an order in the customer app, accept it in the store panel, then accept and
          deliver it from the rider app. Android may ask you to allow installs from your browser.
        </motion.p>
      </section>

      {/* Flow */}
      <section className="space-y-8">
        <motion.h2 {...fade} className="text-2xl font-extrabold text-white md:text-4xl">
          How an order{" "}
          <span className="bg-linear-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">moves</span>
        </motion.h2>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {FLOW.map((step, i) => (
            <motion.li
              key={step.title}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 font-mono text-xs font-bold text-cyan-300">
                  {i + 1}
                </span>
                <step.icon size={18} className="text-slate-300" />
              </div>
              <h3 className="mb-2 font-extrabold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Architecture + highlights */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div {...fade} className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-white">
            <Layers size={20} className="text-cyan-400" /> Architecture
          </h2>
          <div className="space-y-3">
            {MODULES.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="flex w-36 shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
                  <m.icon size={14} className="text-cyan-400" /> {m.consumer}
                </div>
                <div className="h-px flex-1 bg-linear-to-r from-cyan-500/60 to-purple-500/60" />
                <div className="w-44 shrink-0 rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-2">
                  <div className="text-xs font-extrabold text-purple-200">{m.name} module</div>
                  <div className="font-mono text-[11px] text-slate-400">{m.path}</div>
                </div>
              </div>
            ))}
            <div className="mt-4 rounded-xl border border-dashed border-slate-700 p-4 text-center">
              <div className="text-sm font-extrabold text-white">shared/</div>
              <div className="mt-1 text-xs text-slate-400">
                Mongoose models · auth & validation middleware · stock and rider-assignment services
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-300">
                one Express process · one port · MongoDB Atlas
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fade} className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-white">
            <Zap size={20} className="text-blue-400" /> Engineering highlights
          </h2>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex gap-3 text-sm">
                <Zap size={14} className="mt-1 shrink-0 text-blue-400" />
                <span className="font-medium leading-relaxed text-slate-200">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Stack + repos */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div {...fade} className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 md:p-8 lg:col-span-2">
          <h2 className="mb-6 text-xl font-extrabold text-white">Tech stack</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Object.entries(STACK).map(([group, items]) => (
              <div key={group}>
                <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-blue-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade} className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-white">
            <Github size={20} /> Source code
          </h2>
          <div className="space-y-2">
            {[
              ["Backend (modular monolith)", BLINKIT.repos.backend],
              ["Customer app", BLINKIT.repos.customerApp],
              ["Delivery partner app", BLINKIT.repos.deliveryApp],
              ["Store panel", BLINKIT.repos.storeWeb],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-white"
              >
                {label}
                <ExternalLink size={14} className="text-slate-500" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

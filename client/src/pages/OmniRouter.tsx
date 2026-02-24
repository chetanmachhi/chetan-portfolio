import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, ShieldAlert, Activity, Send } from "lucide-react";
import { OMNI_ROUTER_BRAIN_URL, WORKER_PORTS } from "../constants";

export default function OmniRouter() {
    const [loadCount, setLoadCount] = useState(5);
    const [isSending, setIsSending] = useState(false);

    const sendTestLoad = async () => {
        setIsSending(true);
        // Fire off multiple requests without waiting (matching your shell script logic)
        for (let i = 0; i < loadCount; i++) {
            fetch(`${OMNI_ROUTER_BRAIN_URL}/execute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ test: true }),
            }).catch(err => console.error("Request failed", err));
        }
        setTimeout(() => setIsSending(false), 1000);
    };

    return (
        <section className="pt-32 pb-16 px-4 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="p-3 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold">OmniRouter Control</h1>
                        <p className="text-slate-400 font-mono">Status: Connected to Redis Cluster</p>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Zap className="text-yellow-400" size={20} /> Load Generator
                        </h3>
                        <p className="text-sm text-slate-400 mb-6">Fire concurrent requests to test the scoring engine.</p>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={loadCount}
                                onChange={(e) => setLoadCount(Number(e.target.value))}
                                className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 w-24 text-center"
                            />
                            <button
                                onClick={sendTestLoad}
                                disabled={isSending}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                            >
                                <Send size={18} /> {isSending ? "Firing..." : "Blast Load"}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <ShieldAlert className="text-red-400" size={20} /> Failure Simulation
                        </h3>
                        <p className="text-sm text-slate-400">
                            To test the **Auto-Retry** logic, stop a worker process in your terminal, then click "Blast Load" to see the Brain switch to the healthy node instantly.
                        </p>
                    </div>
                </div>

                {/* Worker Status Overview */}
                <div className="bg-slate-950/80 border border-blue-500/20 rounded-2xl overflow-hidden">
                    <div className="bg-blue-500/10 px-6 py-4 border-b border-blue-500/20 flex justify-between">
                        <span className="font-bold flex items-center gap-2"><Terminal size={16} /> Active Pool</span>
                        <span className="text-xs font-mono text-blue-400">Live Scores in Terminal</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {WORKER_PORTS.map(port => (
                            <div key={port} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center gap-2">
                                <span className="text-2xl font-black text-white">{port}</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Registered
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
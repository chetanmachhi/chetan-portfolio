import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Zap,
    Plus,
    Trash2,
    Activity,
    RefreshCcw,
    ArrowLeft,
    Server,
    Loader2,
    AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { DISPATCH_API, MUSCLE_URL } from "../constants";

export default function OmniRouter() {
    const [workers, setWorkers] = useState<Record<string, string>>({});
    const [selectedPort, setSelectedPort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpawning, setIsSpawning] = useState(false);
    const [isFiring, setIsFiring] = useState(false);
    const [lastSynced, setLastSynced] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fullRange = ["4001", "4002", "4003", "4004", "4005", "4006", "4007", "4008", "4009", "4010"];
    const activePorts = Object.keys(workers);
    const availablePorts = fullRange.filter(p => !activePorts.includes(p));

    const triggerError = (msg: string) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(null), 4000);
    };

    const syncFromBrain = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${DISPATCH_API}/active-workers`);
            if (res.ok) {
                const data = await res.json();
                setWorkers(data);
                setLastSynced(new Date().toLocaleTimeString());
            } else {
                triggerError("BRAIN_NODE_UNREACHABLE");
            }
        } catch (e) {
            triggerError("DISPATCH_API_OFFLINE");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        syncFromBrain();
    }, []);

    useEffect(() => {
        if (availablePorts.length > 0 && !availablePorts.includes(selectedPort)) {
            setSelectedPort(availablePorts[0]);
        }
    }, [workers, availablePorts, selectedPort]);

    const handleSpawn = async () => {
        if (!selectedPort) return;
        setIsSpawning(true);
        try {
            const res = await fetch(`${MUSCLE_URL}/spawn/${selectedPort}`, {
                method: 'POST'
            });
            if (res.ok) {
                setWorkers(prev => ({ ...prev, [selectedPort]: "Booting..." }));
                setTimeout(syncFromBrain, 1200);
            } else {
                triggerError("SPAWN_SEQUENCE_INTERRUPTED");
            }
        } catch (e) {
            triggerError("MANAGER_PROTOCOL_FAILURE");
        } finally {
            setIsSpawning(false);
        }
    };

    const handleKill = async (port: string) => {
        try {
            const res = await fetch(`${MUSCLE_URL}/kill/${port}`, {
                method: 'POST'
            });
            if (res.ok) {
                setWorkers(prev => {
                    const newWorkers = { ...prev };
                    delete newWorkers[port];
                    return newWorkers;
                });
                syncFromBrain();
            } else {
                triggerError("TERMINATION_FAILED");
            }
        } catch (e) {
            triggerError("KILL_SIGNAL_LOST");
        }
    };

    const blastLoad = async () => {
        setIsFiring(true);
        try {
            const requests = Array.from({ length: 5 }).map(() =>
                fetch(`${DISPATCH_API}/execute`, {
                    method: 'POST',
                    body: JSON.stringify({ task: "Stress Test" }),
                    headers: { 'Content-Type': 'application/json' }
                })
            );
            await Promise.allSettled(requests);
        } catch (e) {
            triggerError("BLAST_SEQUENCE_CRITICAL");
        } finally {
            setIsFiring(false);
            setTimeout(syncFromBrain, 1000);
        }
    };

    return (
        <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto space-y-10 relative z-10">

            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-10 left-1/2 -translate-x-1/2 z-100 pointer-events-none"
                    >
                        <div className="bg-red-950/60 backdrop-blur-2xl border border-red-500/50 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                            <div className="p-2 bg-red-500 rounded-lg animate-pulse">
                                <AlertTriangle className="text-white" size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">System Alert</span>
                                <span className="text-white font-mono font-bold text-sm tracking-tighter">{errorMessage}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-6 relative z-10">
                <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                </Link>

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                            <Activity className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Load Control System</h1>
                            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                                Main Router: {DISPATCH_API} | Servers: {MUSCLE_URL}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-3">
                                {lastSynced && (
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                                        Last Verified: {lastSynced}
                                    </span>
                                )}
                                <button
                                    onClick={syncFromBrain}
                                    disabled={isLoading}
                                    className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isLoading ? 'text-blue-400 cursor-not-allowed' : 'text-slate-400'}`}
                                >
                                    <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 bg-white/5 p-2 rounded-xl border border-white/10 shadow-inner">
                            <select
                                value={selectedPort}
                                onChange={e => setSelectedPort(e.target.value)}
                                disabled={isSpawning}
                                className="bg-transparent px-3 font-mono text-blue-400 focus:outline-none appearance-none cursor-pointer disabled:opacity-50"
                            >
                                {availablePorts.length > 0 ? (
                                    availablePorts.map(p => (
                                        <option key={p} value={p} className="bg-slate-900 text-white">
                                            {p}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled className="bg-transparent text-slate-500">Full</option>
                                )}
                            </select>
                            <button
                                onClick={handleSpawn}
                                disabled={availablePorts.length === 0 || isSpawning}
                                className="bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:opacity-50 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
                            >
                                {isSpawning ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Plus size={18} />
                                )}
                                <span>{isSpawning ? "Spawning..." : "Spawn"}</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                <div className="lg:col-span-1 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6 text-white overflow-hidden relative group">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Zap className="text-yellow-400" size={18} /> Load Test
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Distribute tasks across the cluster to monitor dynamic scoring.</p>
                    <button
                        onClick={blastLoad}
                        disabled={isFiring || Object.keys(workers).length === 0}
                        className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isFiring ? <Loader2 className="animate-spin" size={20} /> : null}
                        {isFiring ? "SEQUENCING..." : "BLAST LOAD"}
                    </button>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {Object.entries(workers).map(([port, score]) => (
                            <motion.div
                                key={port}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:border-blue-500/50 hover:bg-white/10 transition-all relative overflow-hidden text-white"
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                                        <Server size={20} />
                                    </div>
                                    <button
                                        onClick={() => handleKill(port)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="space-y-1 relative z-10">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Node</div>
                                    <div className="text-2xl font-black text-white tracking-tight">Port {port}</div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-white relative z-10">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold">Health Score</span>
                                        <span className="text-lg font-mono font-bold text-blue-400">{score}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                        <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">Healthy</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {Object.keys(workers).length === 0 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-16 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-slate-600 gap-4 bg-white/5"
                        >
                            <Terminal size={40} className="opacity-20 text-white" />
                            <div className="text-center">
                                <p className="font-medium text-slate-300">Node Cluster Empty</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Initialize workers via Redis pool</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
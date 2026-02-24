import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap, Plus, Trash2, Activity, RefreshCcw,
    Server, Loader2, AlertTriangle, Clock, History, Cpu, ShieldCheck, Network
} from "lucide-react";
import { DISPATCH_API, MUSCLE_URL } from "../constants";

interface DispatchLog {
    id: string;
    port: string;
    timestamp: number;
    snapshot: Record<string, string>;
    status: "pending" | "success" | "error";
}

const formatScore = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(num) ? val : num.toFixed(2);
};

export default function OmniRouter() {
    const [workers, setWorkers] = useState<Record<string, string>>({});
    const [logs, setLogs] = useState<DispatchLog[]>([]);
    const [selectedPort, setSelectedPort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpawning, setIsSpawning] = useState(false);
    const [isFiring, setIsFiring] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fullRange = ["4001", "4002", "4003", "4004", "4005", "4006", "4007", "4008", "4009", "4010"];
    const activePorts = Object.keys(workers);
    const availablePorts = fullRange.filter(p => !activePorts.includes(p));

    const triggerError = (msg: string) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(null), 5000);
    };

    const syncFromBrain = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${DISPATCH_API}/active-workers`);
            if (res.ok) {
                const data = await res.json();
                setWorkers(data);
            } else {
                triggerError("BRAIN_NODE_UNREACHABLE");
            }
        } catch {
            triggerError("DISPATCH_API_OFFLINE");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        syncFromBrain();
    }, []);

    const clearLogs = () => {
        setLogs([]);
    };

    useEffect(() => {
        if (availablePorts.length > 0 && !availablePorts.includes(selectedPort)) {
            setSelectedPort(availablePorts[0]);
        }
    }, [workers, availablePorts, selectedPort]);

    const handleSpawn = async () => {
        if (!selectedPort) return;
        setIsSpawning(true);
        try {
            const res = await fetch(`${MUSCLE_URL}/spawn/${selectedPort}`, { method: 'POST' });
            const data = await res.json();

            if (res.ok) {
                setWorkers(prev => ({ ...prev, [selectedPort]: "BOOT" }));
                setTimeout(syncFromBrain, 1500);
            } else {
                triggerError(data.error || "SPAWN_REJECTED");
            }
        } catch {
            triggerError("MANAGER_OFFLINE");
        } finally {
            setIsSpawning(false);
        }
    };

    const handleKill = async (port: string) => {
        try {
            const res = await fetch(`${MUSCLE_URL}/kill/${port}`, { method: 'DELETE' });

            if (res.ok) {
                setWorkers(prev => {
                    const updated = { ...prev };
                    delete updated[port];
                    return updated;
                });
                syncFromBrain();
            } else {
                const data = await res.json();
                triggerError(data.error || "KILL_FAILED");
            }
        } catch {
            triggerError("KILL_SIGNAL_LOST");
        }
    };

    const blastLoad = async () => {
        setIsFiring(true);
        try {
            for (let i = 1; i <= 5; i++) {
                const tempId = Math.random().toString(36).substr(2, 9);
                const newLog: DispatchLog = {
                    id: tempId,
                    port: "...",
                    timestamp: Date.now(),
                    snapshot: { ...workers },
                    status: "pending"
                };
                setLogs(prev => [newLog, ...prev]);

                fetch(`${DISPATCH_API}/execute`, {
                    method: 'POST',
                    body: JSON.stringify({ task: `Stress Test #${i}` }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .then(data => {
                        setLogs(prev => prev.map(log =>
                            log.id === tempId ? { ...log, port: data.port, snapshot: data.snapshot, status: "success" } : log
                        ));
                    })
                    .catch(() => {
                        setLogs(prev => prev.map(log =>
                            log.id === tempId ? { ...log, status: "error" } : log
                        ));
                    });

                if (i < 5) await new Promise(r => setTimeout(r, 1000));
            }
        } finally {
            setIsFiring(false);
            setTimeout(syncFromBrain, 1000);
        }
    };

    return (
        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-12 relative z-10 bg-transparent font-black uppercase tracking-tighter">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.5);
                }
            `}</style>

            <AnimatePresence>
                {errorMessage && (
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-200 w-[90%] max-w-md">
                        <div className="bg-slate-900 border border-red-500/50 p-5 rounded-2xl flex items-center gap-4 backdrop-blur-2xl shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            <AlertTriangle className="text-red-500 shrink-0" size={24} />
                            <span className="text-white text-xs sm:text-sm tracking-widest">{errorMessage}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-10">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-transparent rounded-2xl border border-blue-500 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Activity size={32} />
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-3xl sm:text-5xl text-white italic truncate">OmniRouter</h1>
                        <p className="text-blue-400 text-[10px] tracking-[0.4em] mt-1">Live Server Load Balancer</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-transparent border border-white/20 p-2 rounded-2xl flex items-center gap-4 w-full md:w-auto">
                        <select value={selectedPort} onChange={e => setSelectedPort(e.target.value)} className="bg-transparent px-2 md:px-4 font-mono text-blue-400 outline-none cursor-pointer flex-1">
                            {availablePorts.map(p => <option key={p} value={p} className="bg-slate-950 font-black">{p}</option>)}
                        </select>
                        <button onClick={handleSpawn} disabled={isSpawning || availablePorts.length === 0} className="bg-blue-600 hover:bg-blue-500 px-4 md:px-6 py-3 rounded-xl text-white text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.4)] whitespace-nowrap">
                            {isSpawning ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                            Add Server
                        </button>
                    </div>
                    <button onClick={syncFromBrain} className="p-3.5 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all shrink-0">
                        <RefreshCcw size={20} className={isLoading ? "animate-spin text-blue-400" : ""} />
                    </button>
                </div>
            </header>

            <div className="space-y-12 bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <AnimatePresence mode="popLayout">
                        {Object.keys(workers).length === 0 && !isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full py-20 border border-dashed border-white/20 rounded-4xl flex flex-col items-center justify-center text-center bg-transparent backdrop-blur-[2px]">
                                <Server size={48} className="text-white/20 mb-6" />
                                <h3 className="text-xl text-white/80 uppercase tracking-[0.2em] mb-3">No Active Servers</h3>
                                <p className="text-xs text-white/50 uppercase tracking-widest px-6">Add a server from the control panel to play around</p>
                            </motion.div>
                        )}
                        {Object.entries(workers).map(([port, score]) => (
                            <motion.div key={port} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-transparent border border-white/10 p-6 rounded-[28px] hover:border-blue-500/40 transition-all backdrop-blur-[2px]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-10 h-10 rounded-xl border border-blue-500/40 flex items-center justify-center text-blue-400"><Server size={22} /></div>
                                    <button onClick={() => handleKill(port)} className="p-2 text-white/40 hover:text-red-500 transition-all cursor-pointer relative z-20"><Trash2 size={18} /></button>
                                </div>
                                <div className="text-2xl text-white">SERVER {port}</div>
                                <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-5">
                                    <div>
                                        <p className="text-[10px] text-white/60 mb-1 font-black uppercase">Health Score</p>
                                        <p className="text-2xl font-mono font-black text-blue-400">
                                            {score === "BOOT" || score === "Booting..." ? "CALC" : formatScore(score)}
                                        </p>
                                    </div>
                                    <div className="px-2 py-1 border border-green-500/30 rounded-full flex items-center gap-1.5 text-green-500 text-[9px] font-black uppercase">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#4ade80]" /> Live
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="bg-transparent border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-[1px]">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
                        <h3 className="text-xs text-white/90 flex items-center gap-3"><History size={18} className="text-blue-500" /> Pipeline Logs</h3>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button
                                onClick={clearLogs}
                                disabled={logs.length === 0 || isFiring}
                                className="px-6 py-3.5 border border-white/10 rounded-2xl text-[11px] text-white/60 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95 disabled:opacity-0 flex items-center justify-center gap-3"
                            >
                                <Trash2 size={16} /> Clear History
                            </button>
                            <button
                                onClick={blastLoad}
                                disabled={isFiring || Object.keys(workers).length === 0}
                                className="flex-1 md:flex-none px-6 py-3.5 bg-blue-600 rounded-2xl text-[11px] text-white hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                            >
                                {isFiring ? <Loader2 size={18} className="animate-spin text-white" /> : <Zap size={18} />} Sequence Stress Test
                            </button>
                        </div>
                    </div>
                    <div className="max-h-150 overflow-auto custom-scrollbar w-full">
                        <table className="w-full text-left border-collapse min-w-200">
                            <colgroup>
                                <col className="w-[15%]" />
                                <col className="w-[15%]" />
                                <col className="w-[55%]" />
                                <col className="w-[15%]" />
                            </colgroup>
                            <thead className="text-[10px] text-white sticky top-0 bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 z-10">
                                <tr>
                                    <th className="px-4 py-4 whitespace-nowrap">Timestamp</th>
                                    <th className="px-4 py-4 whitespace-nowrap">Selected Server</th>
                                    <th className="px-4 py-4 whitespace-nowrap w-full">Live Score Snapshot</th>
                                    <th className="px-4 py-4 text-center whitespace-nowrap">Result</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px] font-mono">
                                <AnimatePresence>
                                    {logs.map((log) => (
                                        <motion.tr key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                            <td className={`p-6 whitespace-nowrap text-[11px] ${log.status === 'success' ? 'text-green-500' : log.status === 'error' ? 'text-red-500' : 'text-white/60'}`}>
                                                <div className="flex items-center gap-1.5"><Clock size={12} /> {new Date(log.timestamp).toLocaleTimeString()}</div>
                                            </td>
                                            <td className="px-4 py-4 text-blue-400 text-base font-black whitespace-nowrap">
                                                {log.port === "..." ? "ROUTING" : `SERVER:${log.port}`}
                                            </td>
                                            <td className="px-4 py-4 w-full">
                                                <div className="flex gap-3 flex-wrap">
                                                    {Object.entries(log.snapshot).map(([p, s]) => (
                                                        <div key={p} className={`px-4 py-2 rounded-xl border-2 transition-all text-base font-black ${p === log.port ? 'border-blue-500 bg-blue-500/20 text-white scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/10 text-white/40'}`}>
                                                            {p}: {formatScore(s)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center font-black whitespace-nowrap">
                                                <div className="flex justify-center items-center h-full">
                                                    {log.status === "pending" ? <Loader2 size={24} className="animate-spin text-blue-500" /> :
                                                        log.status === "success" ? <span className="text-green-400 bg-green-500/10 px-4 py-1.5 rounded-full border-2 border-green-500/20 text-[10px]">RESOLVED</span> :
                                                            <span className="text-red-400 bg-red-500/10 px-4 py-1.5 rounded-full border-2 border-red-500/20 text-[10px]">FAULT</span>}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 border-t border-white/10">
    {/* 1. The Core Infrastructure */}
    <div className="border border-white/10 p-8 md:p-10 rounded-4xl hover:border-blue-500/30 transition-all backdrop-blur-[2px]">
        <Network size={28} className="text-blue-400 mb-6" />
        <h4 className="text-[16px] mb-4 text-blue-400 tracking-[0.2em]">1. Distributed Architecture</h4>
        <p className="text-[12px] text-white/80 leading-loose tracking-wide normal-case font-black">
            OmniRouter is a multi-tier system designed to handle high-concurrency traffic. It separates the <strong>Control Plane</strong> (Spring Boot) from the <strong>Data Plane</strong> (Express.js Workers). By decoupling server management from task execution, the system can scale horizontally, meaning we can add or remove "Muscles" (servers) without ever restarting the "Brain" (the router). This is the foundation of modern cloud-native applications.
        </p>
    </div>

    {/* 2. The Intelligence (Health Scoring) */}
    <div className="border border-white/10 p-8 md:p-10 rounded-4xl hover:border-blue-500/30 transition-all backdrop-blur-[2px]">
        <Cpu size={28} className="text-blue-400 mb-6" />
        <h4 className="text-[16px] mb-4 text-blue-400 tracking-[0.2em]">2. Predictive Health Analytics</h4>
        <p className="text-[12px] text-white/80 leading-loose tracking-wide normal-case font-black">
            Instead of simple round-robin routing, OmniRouter uses a weighted health formula. Every worker monitors its own <strong>CPU Load</strong> and <strong>Active Task Count</strong>. These values are combined with a <strong>Network Multiplier</strong> that simulates geographic lag. A server with high CPU or many pending tasks gets a higher "Stress Score." The Spring Boot Brain constantly scans Redis for these scores and surgically routes incoming requests to the worker with the lowest stress, preventing any single point of failure.
        </p>
    </div>

    {/* 3. Self-Healing & Fault Tolerance */}
    <div className="border border-white/10 p-8 md:p-10 rounded-4xl hover:border-blue-500/30 transition-all backdrop-blur-[2px]">
        <Zap size={28} className="text-blue-400 mb-6" />
        <h4 className="text-[16px] mb-4 text-blue-400 tracking-[0.2em]">3. Resilient Failover Protocol</h4>
        <p className="text-[12px] text-white/80 leading-loose tracking-wide normal-case font-black">
            In a real-world scenario, servers crash. When the Brain attempts to send a task to a worker that has gone offline, it doesn't just return an error to the user. Instead, it catches the timeout, applies a <strong>999.0 Penalty Score</strong> to that specific port in Redis to "quarantine" it, and immediately retries the operation on the next healthiest server. This ensures the end-user experiences zero downtime even during partial cluster collapses.
        </p>
    </div>

    {/* 4. Automated Lifecycle Management */}
    <div className="border border-white/10 p-8 md:p-10 rounded-4xl hover:border-blue-500/30 transition-all backdrop-blur-[2px]">
        <ShieldCheck size={28} className="text-blue-400 mb-6" />
        <h4 className="text-[16px] mb-4 text-blue-400 tracking-[0.2em]">4. The Reaper: Resource Optimization</h4>
        <p className="text-[12px] text-white/80 leading-loose tracking-wide normal-case font-black">
            To prevent "Zombie Processes" and unnecessary cloud costs, the system features an automated <strong>Garbage Collection</strong> mechanism for servers. The Master Manager tracks the idle time of every worker. If a server hasn't been utilized for a set threshold, the <strong>Reaper</strong> executes a graceful shutdown. It unregisters the server from the registry and kills the OS process, ensuring the environment remains clean and memory-efficient.
        </p>
    </div>
</div>            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Github, Cpu, GitBranch, RefreshCw, CheckCircle2, Zap, Terminal, X, Code2 } from 'lucide-react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  copilotResonance: number;
}

const SacredRepository: React.FC<Props> = ({ isVisible, onClose, copilotResonance }) => {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(100);
  const [logs, setLogs] = useState<string[]>([
    'Initializing Akashic handshake...',
    'Authenticating with GitHub realms...',
    'Copilot neural link established.',
    'Repository structure verified.'
  ]);

  const handleSync = () => {
    setSyncing(true);
    setProgress(0);
    const newLog = `Pushing changes to branch: main [Resonance: ${copilotResonance}%]`;
    setLogs(prev => [newLog, ...prev].slice(0, 5));

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        setSyncing(false);
        setLogs(prev => ['Synchronization with Akashic Field complete.', ...prev]);
        clearInterval(interval);
      }
      setProgress(current);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative glass w-full max-w-2xl rounded-[3rem] p-10 overflow-hidden shadow-2xl border-white/20 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-cyan-400">
              <Github size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-[0.2em] text-white uppercase">Akashic Repository</h2>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em] mt-1">GitHub & Copilot Integration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-6 rounded-[2rem] border-white/5 bg-gradient-to-br from-cyan-500/10 to-transparent">
            <div className="flex items-center gap-3 mb-3 text-cyan-400">
              <Cpu size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Copilot Resonance</span>
            </div>
            <p className="text-3xl font-serif italic text-white">{copilotResonance}%</p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" style={{ width: `${copilotResonance}%` }} />
            </div>
          </div>
          
          <div className="glass p-6 rounded-[2rem] border-white/5 bg-gradient-to-br from-purple-500/10 to-transparent">
            <div className="flex items-center gap-3 mb-3 text-purple-400">
              <GitBranch size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Active Branch</span>
            </div>
            <p className="text-xl font-mono text-white">origin/main</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Protected</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black/40 rounded-[2rem] p-6 border border-white/5 font-mono overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={14} className="text-white/40" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Resonance Stream</span>
          </div>
          <div className="space-y-2 overflow-y-auto no-scrollbar flex-1">
            {logs.map((log, i) => (
              <p key={i} className={`text-[11px] ${i === 0 ? 'text-cyan-400' : 'text-white/40'}`}>
                <span className="opacity-30 mr-2">></span> {log}
              </p>
            ))}
            {syncing && (
              <div className="pt-4">
                <div className="flex justify-between text-[9px] text-cyan-400 uppercase mb-1">
                  <span>Pushing Artifacts</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="flex-1 py-5 bg-white text-black font-bold rounded-[2rem] hover:bg-slate-100 transition-all shadow-xl uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {syncing ? <RefreshCw size={16} className="animate-spin" /> : <Code2 size={16} />}
            {syncing ? 'Pushing to Akashic Field' : 'Synchronize Repository'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SacredRepository;

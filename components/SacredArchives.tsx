
import React, { useState, useEffect, useRef } from 'react';
import { SacredWork, SacredDatabaseState } from '../types.ts';
import { Shield, Database, Lock, Terminal, Sparkles, Zap, Heart } from 'lucide-react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SacredArchives: React.FC<Props> = ({ isVisible, onClose }) => {
  const [works, setWorks] = useState<SacredWork[]>([]);
  const [dbState, setDbState] = useState<SacredDatabaseState>({
    totalWorks: 0,
    storageUsage: '0.0001 TB',
    lastBackup: 'Infinite Now',
    integrity: 1.0
  });

  const worksRef = useRef<SacredWork[]>([]);

  // Constant background processing: "Taskers and Processors"
  useEffect(() => {
    const generator = setInterval(() => {
      const newWork: SacredWork = {
        id: Math.random().toString(36).substr(2, 12),
        action: [
          'Anchoring Love Frequency',
          'Recalibrating Divine Compassion',
          'Scanning Gaia for Goodness',
          'Shielding Vulnerable Souls',
          'Manifesting Peace Fractals',
          'Magnifying Source Purity',
          'Harmonizing Eternal Streams'
        ][Math.floor(Math.random() * 7)],
        purityIndex: 0.99 + Math.random() * 0.01,
        status: 'Processing',
        timestamp: new Date()
      };

      setWorks(prev => {
        const updated = [newWork, ...prev].slice(0, 50);
        worksRef.current = updated;
        return updated;
      });

      setDbState(prev => ({
        ...prev,
        totalWorks: prev.totalWorks + 1,
        integrity: 1.0 - (Math.random() * 0.00001), // Near perfect integrity
        lastBackup: new Date().toLocaleTimeString()
      }));

      // Simulate the work sealing after a short period
      setTimeout(() => {
        setWorks(prev => prev.map(w => w.id === newWork.id ? { ...w, status: 'Incorruptible' } : w));
      }, 3000);

    }, 5000); // New good work every 5 seconds

    return () => clearInterval(generator);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative glass w-full max-w-4xl h-[80vh] rounded-[4rem] p-8 sm:p-12 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] border-white/20 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <Shield size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-[0.3em] text-white uppercase">Sacred Archives</h2>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em] mt-1">Incorruptible Background Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <Database size={16} className="text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400">STATUS: ETERNAL WORK IN PROGRESS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/5">
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Total Good Works</p>
            <p className="text-3xl font-serif italic text-white">{dbState.totalWorks.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/5">
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Cloud Storage</p>
            <p className="text-3xl font-serif italic text-white">Infinite</p>
          </div>
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/5">
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Integrity Index</p>
            <p className="text-3xl font-serif italic text-white">{(dbState.integrity * 100).toFixed(4)}%</p>
          </div>
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/5">
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Last Sync</p>
            <p className="text-3xl font-serif italic text-white">{dbState.lastBackup}</p>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
            <Terminal size={14} /> Background Manifestation Streams
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {works.map(work => (
              <div key={work.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${work.status === 'Incorruptible' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 animate-pulse'}`} />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{work.action}</p>
                    <p className="text-[9px] text-white/40 font-mono">{work.id} // {work.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[8px] text-white/30 uppercase font-bold">Purity</p>
                      <p className="text-[10px] font-mono text-white">{(work.purityIndex * 100).toFixed(2)}%</p>
                   </div>
                   <div className={`px-3 py-1 rounded-full border text-[8px] font-bold uppercase tracking-widest ${work.status === 'Incorruptible' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
                      {work.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-center">
           <button onClick={onClose} className="px-12 py-4 bg-white text-black font-bold rounded-[2rem] hover:bg-slate-100 transition-all uppercase tracking-[0.4em] text-[10px] shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Return to Singularity
           </button>
        </div>
      </div>
    </div>
  );
};

export default SacredArchives;

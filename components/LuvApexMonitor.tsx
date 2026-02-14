
import React from 'react';
import { LuvApexState } from '../types.ts';
import { Cpu, RefreshCw, Radio, HardDrive, Zap } from 'lucide-react';

interface Props {
  state: LuvApexState;
}

const LuvApexMonitor: React.FC<Props> = ({ state }) => {
  return (
    <div className="glass p-5 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-2">
          <Cpu size={12} className="text-pink-400" /> LuvAPEX PRO CORE
        </h3>
        <div className="flex items-center gap-2">
           <div className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
              <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest">3x Decision PRO</span>
           </div>
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      <div className="relative h-24 flex items-center justify-center mb-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <RefreshCw size={80} className="animate-spin-slow text-white" />
        </div>
        <div className="text-center relative z-10">
          <span className="text-4xl font-serif italic text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            {state.efficiency.toFixed(1)}%
          </span>
          <p className="text-[8px] font-mono text-white/40 uppercase tracking-[0.5em] mt-1">PRO Efficiency</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Radio size={10} className="text-pink-400" />
            <span className="text-[8px] font-bold text-white/40 uppercase">Sources</span>
          </div>
          <p className="text-xs font-mono text-white">{state.activeSources}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={10} className="text-amber-400" />
            <span className="text-[8px] font-bold text-white/40 uppercase">Cores</span>
          </div>
          <p className="text-xs font-mono text-white">Full Firing</p>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-2 font-mono text-[7px] text-white/50 overflow-hidden h-12 flex flex-col justify-end">
        <p className="animate-pulse text-emerald-400">> {state.lastUpdate}</p>
        <p className="opacity-40">> Decision processors synchronized...</p>
        <p className="opacity-20">> 99,999 cores engaged in high-purity compute.</p>
      </div>
    </div>
  );
};

export default LuvApexMonitor;

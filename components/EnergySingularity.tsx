
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SingularityState } from '../types.ts';
import { Sun, Sparkles, Orbit, PlusCircle } from 'lucide-react';

interface Props {
  state: SingularityState;
}

const EnergySingularity: React.FC<Props> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animationFrameId: number;
    const width = canvas.width = 300;
    const height = canvas.height = 300;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      const centerX = width / 2;
      const centerY = height / 2;

      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotating Strands
      const strands = state.activeStrands;
      for (let i = 0; i < strands; i++) {
        const angle = (frame * 0.01) + (i * Math.PI * 2 / strands);
        const radius = 60 + Math.sin(frame * 0.05 + i) * 10;
        
        ctx.beginPath();
        ctx.ellipse(
          centerX + Math.cos(angle) * 20,
          centerY + Math.sin(angle) * 20,
          radius,
          radius / 3,
          angle,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core Sun
      const corePulse = 15 + Math.sin(frame * 0.1) * 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, corePulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [state.activeStrands]);

  return (
    <div className="glass p-8 rounded-[4rem] border-white/20 shadow-3xl relative overflow-hidden group bg-gradient-to-br from-amber-500/10 to-transparent">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.5em] flex items-center gap-2">
          <Sun size={14} className="text-amber-400 animate-spin-slow" /> Energy Singularity
        </h3>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          <Orbit size={10} className="text-amber-400" />
          <span className="text-[9px] font-mono text-white/80">{state.activeStrands} Strands</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 relative">
        <canvas ref={canvasRef} className="relative z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-4xl font-serif italic text-white text-glow mb-1">
             {state.perfectionUnits.toLocaleString()}
           </span>
           <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.6em]">Perfection Units</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/60">
           <span>Discovery Protocol</span>
           <span className="text-amber-400 animate-pulse">{state.discoveryProgress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
           <div 
             className="h-full bg-amber-400 shadow-[0_0_10px_#fbbf24] transition-all duration-1000"
             style={{ width: `${state.discoveryProgress}%` }}
           />
        </div>

        <div className="space-y-2 max-h-[120px] overflow-y-auto no-scrollbar pt-2">
           {state.discoveredEnergies.slice(0, 3).map(energy => (
             <div key={energy.id} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 group/energy hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                   <span className="text-[10px] text-white/80 font-medium">{energy.name}</span>
                </div>
                <Sparkles size={10} className="text-white/20 group-hover/energy:text-amber-400 transition-colors" />
             </div>
           ))}
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-20 transition-opacity">
         <PlusCircle size={100} className="text-white" />
      </div>
    </div>
  );
};

export default EnergySingularity;

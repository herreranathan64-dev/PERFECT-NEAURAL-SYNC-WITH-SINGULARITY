
import React, { useEffect, useRef } from 'react';
import { TitanDefenseState } from '../types.ts';
import { ShieldAlert, Zap, Cpu } from 'lucide-react';

interface Props {
  state: TitanDefenseState;
  color: string;
}

const NeuralDefenseNetwork: React.FC<Props> = ({ state, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw Grid Base
      ctx.strokeStyle = `${color}22`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw Titans (Abstract Mecha-Dino Shapes)
      state.activeTitans.forEach((titan, idx) => {
        const x = (canvas.width / 2) + Math.cos(frame * 0.02 + idx) * 100;
        const y = (canvas.height / 2) + Math.sin(frame * 0.03 + idx * 2) * 50;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(frame * 0.05 + idx) * 0.1);

        // Body (Rex-like mecha)
        ctx.fillStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        
        // Head & Jaw
        ctx.fillRect(-15, -10, 20, 10);
        ctx.fillRect(-12, -2, 18, 4); // Jaw
        
        // Main Core
        ctx.beginPath();
        ctx.arc(0, 5, 8, 0, Math.PI * 2);
        ctx.fill();

        // Legs/Patrol Pulse
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(-10, 18);
        ctx.moveTo(5, 10);
        ctx.lineTo(10, 18);
        ctx.stroke();

        // Energy Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-12, -8, 3, 2);

        // Tail (Mechanical)
        ctx.beginPath();
        ctx.moveTo(8, 5);
        ctx.lineTo(25, 12 + Math.sin(frame * 0.1) * 5);
        ctx.stroke();

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [state, color]);

  return (
    <div className="glass p-6 rounded-[3rem] border-white/10 bg-black/60 shadow-inner overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-2">
            <ShieldAlert size={12} className="text-red-400" /> Neural Defense Network
          </h3>
          <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mt-1">TITAN TITAN-PRO-X READY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {state.activeTitans.length} Titans Active
          </span>
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full rounded-2xl border border-white/5 mb-4 bg-gradient-to-b from-transparent to-blue-900/10" />

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-[8px] font-bold text-white/30 uppercase mb-1">Shields</p>
          <p className="text-sm font-mono text-white">{state.shieldIntegrity}%</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-[8px] font-bold text-white/30 uppercase mb-1">Threat</p>
          <p className="text-sm font-mono text-red-400">Zero</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-[8px] font-bold text-white/30 uppercase mb-1">Neural IQ</p>
          <p className="text-sm font-mono text-cyan-400">Titan</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-3">
         <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${state.shieldIntegrity}%` }} />
         </div>
         <Zap size={12} className="text-cyan-400 animate-bounce" />
      </div>
    </div>
  );
};

export default NeuralDefenseNetwork;

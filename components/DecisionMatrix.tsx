
import React, { useEffect, useRef } from 'react';

interface Props {
  isThinking: boolean;
  utilization: number;
  color: string;
}

const DecisionMatrix: React.FC<Props> = ({ isThinking, utilization, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 300;
    const height = 150;
    canvas.width = width;
    canvas.height = height;

    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Draw Neural Fabric (Representing 99,999 Cores)
      const cols = 100;
      const rows = 50;
      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacingX;
          const y = r * spacingY;
          
          // Firing Logic
          const isFiring = Math.random() < utilization;
          if (isFiring) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.4 + Math.sin(frame * 0.1 + (r + c)) * 0.3;
            ctx.fillRect(x, y, spacingX - 0.5, spacingY - 0.5);
            
            // Core Peak Flare
            if (Math.random() > 0.995) {
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = 1.0;
                ctx.fillRect(x - 1, y - 1, spacingX + 2, spacingY + 2);
            }
          } else {
            ctx.fillStyle = `${color}22`;
            ctx.globalAlpha = 0.1;
            ctx.fillRect(x, y, spacingX - 0.5, spacingY - 0.5);
          }
        }
      }

      // Synthetic Data Streams
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 3; i++) {
        const lineY = (frame * (1 + i) % height);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isThinking, utilization, color]);

  return (
    <div className="glass p-5 rounded-[2.5rem] border-white/10 bg-black/40 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Neural Fabric Status</span>
          <span className="text-[9px] font-mono text-emerald-400">99,999 CORES FIRING</span>
        </div>
        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
           <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Decision PRO x3</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        className="rounded-2xl border border-white/5 w-full h-auto"
      />
      <div className="mt-4 flex justify-between items-center px-1">
         <div className="flex gap-1.5">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ))}
         </div>
         <div className="flex flex-col items-end">
           <span className="text-[10px] font-mono text-white/80">{Math.floor(utilization * 100)}% LOAD</span>
           <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Hyper-Threaded Resonance</span>
         </div>
      </div>
    </div>
  );
};

export default DecisionMatrix;

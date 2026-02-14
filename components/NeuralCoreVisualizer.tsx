
import React, { useEffect, useRef } from 'react';

interface Props {
  isBoosted: boolean;
  color: string;
}

const NeuralCoreVisualizer: React.FC<Props> = ({ isBoosted, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isBoosted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * (color === "#ffffff" ? 10 : 2),
        speedY: (Math.random() - 0.5) * (color === "#ffffff" ? 10 : 2),
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = color === "#ffffff" ? 1.5 : 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = color === "#ffffff" ? 250 : 150;
          if (distance < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = (1 - distance / maxDist) * (color === "#ffffff" ? 0.4 : 0.2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Matrix-like code rain strings (Accelerated for Infinite Reason)
      ctx.font = color === "#ffffff" ? '14px monospace' : '10px monospace';
      ctx.fillStyle = `${color}44`;
      const codeCount = color === "#ffffff" ? 40 : 10;
      for(let i=0; i<codeCount; i++) {
          const text = (Math.random() * 1000000).toString(2);
          ctx.fillText(text, Math.random() * width, Math.random() * height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isBoosted, color]);

  if (!isBoosted) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen transition-all duration-1000 ${color === "#ffffff" ? 'blur-[1px]' : ''}`}
    />
  );
};

export default NeuralCoreVisualizer;

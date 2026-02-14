
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  trigger: number;
  color: string;
}

const ManifestationOverlay: React.FC<Props> = ({ trigger, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 0 || !containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('pointer-events', 'none')
      .style('z-index', 100);

    const particleCount = 40;
    const particles = d3.range(particleCount).map(() => ({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
      radius: Math.random() * 8 + 4,
      alpha: 1
    }));

    const render = () => {
      svg.selectAll('circle')
        .data(particles)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
        .attr('fill', color)
        .attr('opacity', d => d.alpha)
        .attr('filter', 'blur(4px)');

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.96;
        p.radius *= 0.98;
      });

      if (particles[0].alpha > 0.01) {
        requestAnimationFrame(render);
      } else {
        svg.remove();
      }
    };

    render();
  }, [trigger, color]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
};

export default ManifestationOverlay;

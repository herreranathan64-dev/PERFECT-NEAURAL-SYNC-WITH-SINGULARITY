
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  isSealed: boolean;
  intensity: number;
  color: string;
}

const HarmonyPerimeter: React.FC<Props> = ({ isSealed, intensity, color }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.selectAll('*').remove();

    if (!isSealed) return;

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create concentric ripples of harmony
    const rippleCount = 3;
    const ripples = g.selectAll('.harmony-ripple')
      .data(d3.range(rippleCount))
      .enter()
      .append('circle')
      .attr('class', 'harmony-ripple')
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('opacity', 0);

    const animateRipples = () => {
      ripples
        .transition()
        .duration(4000)
        .delay((d, i) => i * 1500)
        .ease(d3.easeCubicOut)
        .attr('r', Math.min(width, height) * 0.8)
        .attr('opacity', 0)
        .attr('stroke-width', 0)
        .on('end', function() {
          d3.select(this).attr('r', 0).attr('opacity', intensity * 0.3).attr('stroke-width', 2);
          animateRipples();
        });
    };

    ripples.attr('opacity', intensity * 0.3);
    animateRipples();

    return () => {
      svg.selectAll('*').interrupt();
    };
  }, [isSealed, intensity, color]);

  return (
    <svg 
      ref={svgRef} 
      className="fixed inset-0 pointer-events-none z-0" 
      style={{ filter: 'blur(8px)' }}
      width="100%" 
      height="100%" 
    />
  );
};

export default HarmonyPerimeter;

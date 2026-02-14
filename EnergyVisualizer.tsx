
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  color: string;
}

const EnergyVisualizer: React.FC<Props> = ({ color }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;

    svg.selectAll('*').remove();

    const nodes = d3.range(20).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 2,
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.r + 2))
      .on('tick', () => {
        svg.selectAll('circle')
          .data(nodes)
          .join('circle')
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y)
          .attr('r', (d: any) => d.r)
          .attr('fill', color)
          .attr('opacity', 0.6)
          .attr('filter', 'blur(2px)');
      });

    return () => simulation.stop();
  }, [color]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <svg ref={svgRef} width="400" height="400" className="animate-pulse" />
    </div>
  );
};

export default EnergyVisualizer;

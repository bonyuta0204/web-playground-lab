import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

interface DataItem {
  label: string;
  value: number;
}

const D3BarChart = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  
  const sampleData = useMemo<DataItem[]>(() => [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 18 },
    { label: 'F', value: 12 },
    { label: 'G', value: 30 },
  ], []);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set scales
    const x = d3
      .scaleBand()
      .domain(sampleData.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sampleData, (d) => d.value) || 0])
      .nice()
      .range([height, 0]);

    // Add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '12px');

    // Add y-axis
    svg
      .append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('font-size', '12px');

    // Add bars
    svg
      .selectAll('.bar')
      .data(sampleData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', '#4f46e5')
      .on('mouseover', function (_, d) {
        d3.select(this).attr('fill', '#818cf8');
        
        // Show tooltip
        svg
          .append('text')
          .attr('class', 'tooltip')
          .attr('x', (x(d.label) || 0) + x.bandwidth() / 2)
          .attr('y', y(d.value) - 5)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .text(d.value);
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#4f46e5');
        svg.selectAll('.tooltip').remove();
      });

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text('D3.js Bar Chart Example');
  }, [sampleData]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">D3.js Bar Chart</h1>
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <svg ref={chartRef}></svg>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About this demo</h2>
        <p>
          This demo showcases a simple bar chart created with D3.js. D3 (Data-Driven Documents) is a
          JavaScript library for producing dynamic, interactive data visualizations in web browsers.
        </p>
        <p className="mt-2">
          The chart above demonstrates basic D3 concepts including scales, axes, and interactive
          elements. Hover over the bars to see the exact values and a color change effect.
        </p>
      </div>
    </div>
  );
};

export default D3BarChart;

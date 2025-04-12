import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  visited: boolean;
}

interface Edge {
  source: number;
  target: number;
}

const DFSVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds between steps
  const [resetTrigger, setResetTrigger] = useState(0);

  // Create a sample graph
  const nodes = useMemo<Node[]>(() => [
    { id: 0, x: 100, y: 100, visited: false },
    { id: 1, x: 200, y: 50, visited: false },
    { id: 2, x: 300, y: 100, visited: false },
    { id: 3, x: 250, y: 200, visited: false },
    { id: 4, x: 150, y: 200, visited: false },
    { id: 5, x: 350, y: 250, visited: false },
    { id: 6, x: 400, y: 150, visited: false },
  ], []);

  const edges = useMemo<Edge[]>(() => [
    { source: 0, target: 1 },
    { source: 0, target: 4 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 2, target: 6 },
    { source: 3, target: 4 },
    { source: 3, target: 5 },
    { source: 5, target: 6 },
  ], []);

  // Create adjacency list
  const adjacencyList = useMemo(() => {
    const list = nodes.map(() => [] as number[]);
    edges.forEach((edge) => {
      list[edge.source].push(edge.target);
      list[edge.target].push(edge.source); // Undirected graph
    });
    return list;
  }, [nodes, edges]);

  const drawGraph = useCallback((context: CanvasRenderingContext2D) => {
    // Clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Draw edges
    context.strokeStyle = '#888';
    context.lineWidth = 2;
    edges.forEach((edge) => {
      const source = nodes[edge.source];
      const target = nodes[edge.target];
      context.beginPath();
      context.moveTo(source.x, source.y);
      context.lineTo(target.x, target.y);
      context.stroke();
    });

    // Draw nodes
    nodes.forEach((node) => {
      context.beginPath();
      context.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      context.fillStyle = node.visited ? '#4f46e5' : '#fff';
      context.fill();
      context.strokeStyle = '#333';
      context.stroke();

      // Add node label
      context.fillStyle = node.visited ? '#fff' : '#333';
      context.font = '16px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(node.id.toString(), node.x, node.y);
    });
  }, [nodes, edges]);

  const resetGraph = () => {
    nodes.forEach((node) => {
      node.visited = false;
    });
    setResetTrigger((prev) => prev + 1);
  };

  const runDFS = async (startNodeId: number) => {
    if (isRunning) return;
    
    resetGraph();
    setIsRunning(true);
    
    const visited = new Set<number>();
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    if (!context) {
      setIsRunning(false);
      return;
    }

    const dfs = async (nodeId: number) => {
      if (visited.has(nodeId)) return;
      
      // Mark as visited
      visited.add(nodeId);
      nodes[nodeId].visited = true;
      drawGraph(context);
      
      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, speed));
      
      // Visit neighbors
      for (const neighbor of adjacencyList[nodeId]) {
        if (!visited.has(neighbor)) {
          await dfs(neighbor);
        }
      }
    };

    await dfs(startNodeId);
    setIsRunning(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    if (context) {
      drawGraph(context);
    }
  }, [resetTrigger, drawGraph]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">DFS Algorithm Visualization</h1>
      
      <div className="mb-4 flex space-x-4 items-center">
        <button
          onClick={() => runDFS(0)}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${isRunning ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
        >
          Start DFS from Node 0
        </button>
        
        <button
          onClick={resetGraph}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${isRunning ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white`}
        >
          Reset
        </button>
        
        <div className="flex items-center">
          <label htmlFor="speed" className="mr-2">Speed:</label>
          <input
            id="speed"
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={isRunning}
            className="w-32"
          />
          <span className="ml-2">{speed}ms</span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={300}
          className="border border-gray-300 rounded"
        ></canvas>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About this demo</h2>
        <p>
          This visualization demonstrates the Depth-First Search (DFS) algorithm on a graph. DFS is a graph traversal
          algorithm that explores as far as possible along each branch before backtracking.
        </p>
        <p className="mt-2">
          In this demo, nodes turn blue as they are visited. The algorithm starts from Node 0 and
          explores the graph by going as deep as possible before backtracking.
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">How DFS Works</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Start at a selected node (Node 0 in this demo)</li>
          <li>Mark the current node as visited</li>
          <li>Recursively visit all unvisited neighbors</li>
          <li>Backtrack when all neighbors have been visited</li>
        </ol>
      </div>
    </div>
  );
};

export default DFSVisualization;

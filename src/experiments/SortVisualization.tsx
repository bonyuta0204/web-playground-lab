import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type SortSteps = number[][];

// Bubble sort algorithm implementation
const generateBubbleSortSteps = (arr: number[]): SortSteps => {
  const steps: SortSteps = [];
  const tempArray = [...arr];

  // Add initial state
  steps.push([...tempArray]);

  for (let i = 0; i < tempArray.length; i++) {
    for (let j = 0; j < tempArray.length - i - 1; j++) {
      if (tempArray[j] > tempArray[j + 1]) {
        // Swap elements
        const temp = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = temp;

        // Add this step to our steps array
        steps.push([...tempArray]);
      }
    }
  }

  return steps;
};

// generate random array
const buildRandomArray = (size: number) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

const SortVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sortSteps, setSortSteps] = useState<SortSteps>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortingSpeed, setSortingSpeed] = useState<number>(200); // milliseconds

  // Start the sorting visualization
  const startSorting = () => {
    console.log("Starting sorting visualization");
    const steps = generateBubbleSortSteps(buildRandomArray(50));
    setSortSteps(steps);
    setCurrentStepIndex(0);
    setIsSorting(true);
  };

  // Reset the visualization
  const resetVisualization = () => {
    setIsSorting(false);
    setCurrentStepIndex(-1);
  };

  // Move to the next step manually
  const nextStep = () => {
    if (currentStepIndex < sortSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsSorting(false); // End of sorting
    }
  };

  // Move to the previous step manually
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Auto-play effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isSorting && currentStepIndex < sortSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, sortingSpeed);
    } else if (currentStepIndex === sortSteps.length - 1) {
      setIsSorting(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSorting, currentStepIndex, sortSteps, sortingSpeed]);

  // D3 visualization effect
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const currentArray =
      currentStepIndex >= 0 ? sortSteps[currentStepIndex] : [];
    const maxValue = Math.max(...currentArray, 1); // Ensure a minimum scale even with all zeros

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(currentArray.length))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([innerHeight, 0]);

    // Color scale
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, maxValue])
      .range(["#69b3a2", "#3498db"]);

    // Draw bars
    g.selectAll(".bar")
      .data(currentArray)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(i) as number)
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d))
      .attr("fill", (d) => colorScale(d))
      .attr("rx", 4) // Rounded corners
      .attr("ry", 4)
      .transition() // Add transition for smooth animation
      .duration(sortingSpeed * 0.8);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .tickFormat(() => "")
      );
  }, [sortSteps, currentStepIndex, sortingSpeed]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Sort Visualization</h1>
      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">バブルソートの可視化</h2>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
          <svg ref={svgRef} className="w-full"></svg>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={startSorting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            disabled={isSorting}
          >
            ソート開始
          </button>

          <button
            onClick={resetVisualization}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            リセット
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            disabled={currentStepIndex <= 0 || isSorting}
          >
            前のステップ
          </button>

          <button
            onClick={() => setIsSorting(!isSorting)}
            className={`px-4 py-2 ${
              isSorting
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded transition`}
            disabled={
              currentStepIndex < 0 || currentStepIndex >= sortSteps.length - 1
            }
          >
            {isSorting ? "一時停止" : "再生"}
          </button>

          <button
            onClick={nextStep}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            disabled={currentStepIndex >= sortSteps.length - 1 || isSorting}
          >
            次のステップ
          </button>
        </div>

        <div className="w-full max-w-md">
          <label
            htmlFor="speed"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            速度: {sortingSpeed}ms
          </label>
          <input
            type="range"
            id="speed"
            min="10"
            max="500"
            step="10"
            value={sortingSpeed}
            onChange={(e) => setSortingSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mt-4 text-sm text-gray-600">
          ステップ: {currentStepIndex >= 0 ? currentStepIndex + 1 : 0} /{" "}
          {sortSteps.length}
        </div>
      </div>
    </div>
  );
};

export default SortVisualization;

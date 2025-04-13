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

// Selection sort algorithm implementation
const generateSelectionSortSteps = (arr: number[]): SortSteps => {
  const steps: SortSteps = [];
  const tempArray = [...arr];

  // Add initial state
  steps.push([...tempArray]);

  for (let i = 0; i < tempArray.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < tempArray.length; j++) {
      if (tempArray[j] < tempArray[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap elements
      const temp = tempArray[i];
      tempArray[i] = tempArray[minIndex];
      tempArray[minIndex] = temp;

      // Add this step to our steps array
      steps.push([...tempArray]);
    }
  }

  return steps;
};

// Insertion sort algorithm implementation
const generateInsertionSortSteps = (arr: number[]): SortSteps => {
  const steps: SortSteps = [];
  const tempArray = [...arr];

  // Add initial state
  steps.push([...tempArray]);

  for (let i = 1; i < tempArray.length; i++) {
    const key = tempArray[i];
    let j = i - 1;

    while (j >= 0 && tempArray[j] > key) {
      tempArray[j + 1] = tempArray[j];
      j--;

      // Add intermediate step
      steps.push([...tempArray]);
    }

    tempArray[j + 1] = key;

    // Add this step to our steps array if we haven't already
    if (j + 1 !== i) {
      steps.push([...tempArray]);
    }
  }

  return steps;
};

// Quick sort algorithm implementation
const generateQuickSortSteps = (arr: number[]): SortSteps => {
  const steps: SortSteps = [];
  const tempArray = [...arr];

  // Add initial state
  steps.push([...tempArray]);

  const quickSort = (array: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(array, low, high);
      quickSort(array, low, pivotIndex - 1);
      quickSort(array, pivotIndex + 1, high);
    }
  };

  const partition = (array: number[], low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] <= pivot) {
        i++;
        // Swap elements
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        // Add this step to our steps array
        steps.push([...array]);
      }
    }

    // Swap pivot element
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    // Add this step to our steps array
    steps.push([...array]);

    return i + 1;
  };

  quickSort(tempArray, 0, tempArray.length - 1);
  return steps;
};

// Define sorting algorithm type
type SortAlgorithm = {
  name: string;
  function: (arr: number[]) => SortSteps;
  description: string;
};

// Define available sorting algorithms
const sortingAlgorithms: SortAlgorithm[] = [
  {
    name: "バブルソート",
    function: generateBubbleSortSteps,
    description:
      "隣接する要素を比較し、順序が正しくない場合は入れ替える単純なアルゴリズム",
  },
  {
    name: "選択ソート",
    function: generateSelectionSortSteps,
    description:
      "未ソート部分から最小の要素を選択し、ソート済み部分の末尾に配置するアルゴリズム",
  },
  {
    name: "挿入ソート",
    function: generateInsertionSortSteps,
    description:
      "ソート済み部分に新しい要素を適切な位置に挿入していくアルゴリズム",
  },
  {
    name: "クイックソート",
    function: generateQuickSortSteps,
    description: "分割統治法を用いた高速なソートアルゴリズム",
  },
];

// generate random array
const buildRandomArray = (size: number) => {
  const elements = Array.from<number>({ length: size }).fill(0);
  for (let i = 1; i < elements.length; i++) {
    elements[i] = elements[i - 1] + 1;
  }
  // shuffle array
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};

const SortVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sortSteps, setSortSteps] = useState<SortSteps>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortingSpeed, setSortingSpeed] = useState<number>(200); // milliseconds
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number>(0); // Default to bubble sort
  const [arraySize, setArraySize] = useState<number>(50); // Default array size

  // Start the sorting visualization
  const startSorting = () => {
    console.log("Starting sorting visualization");
    const steps = sortingAlgorithms[selectedAlgorithm].function(
      buildRandomArray(arraySize)
    );
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

    const xValues = d3.range(currentArray.length);

    // Set up scales
    const xScale = d3
      .scaleBand<number>()
      .domain(xValues)
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
        <h2 className="text-2xl font-bold mb-4">
          {sortingAlgorithms[selectedAlgorithm].name}の可視化
        </h2>

        <div className="w-full mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">アルゴリズム選択</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortingAlgorithms.map((algorithm, index) => (
                <div
                  key={index}
                  onClick={() => !isSorting && setSelectedAlgorithm(index)}
                  className={`p-3 rounded-md cursor-pointer transition ${
                    selectedAlgorithm === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } ${isSorting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-bold">{algorithm.name}</div>
                  <div className="text-sm">{algorithm.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">
              配列サイズ: {arraySize}
            </h3>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={arraySize}
              onChange={(e) =>
                !isSorting && setArraySize(parseInt(e.target.value))
              }
              disabled={isSorting}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                isSorting ? "opacity-50" : ""
              }`}
            />
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
          <svg ref={svgRef} className="w-full"></svg>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={startSorting}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
              isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
            className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition ${
              currentStepIndex <= 0 || isSorting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
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
            } text-white rounded transition ${
              currentStepIndex < 0 || currentStepIndex >= sortSteps.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              currentStepIndex < 0 || currentStepIndex >= sortSteps.length - 1
            }
          >
            {isSorting ? "一時停止" : "再生"}
          </button>

          <button
            onClick={nextStep}
            className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition ${
              currentStepIndex >= sortSteps.length - 1 || isSorting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
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

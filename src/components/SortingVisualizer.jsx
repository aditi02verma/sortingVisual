import { useState } from "react";
import Ball from "./Ball";
import Controls from "./Controls";

const SortingVisualizer = ({ selectedAlgorithm, speed }) => {
  const [array, setArray] = useState([10, 3, 8, 15, 6]);
  const [steps, setSteps] = useState({ swaps: 0, comparisons: 0 });
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);

  const incrementSwaps = () => {
    setSteps((prev) => ({ ...prev, swaps: prev.swaps + 1 }));
  };

  const incrementComparisons = () => {
    setSteps((prev) => ({ ...prev, comparisons: prev.comparisons + 1 }));
  };

  const maxArrayValue = Math.max(...array);
  const minSize = 30; // Minimum size for the smallest value
  const maxSize = 60; // Maximum size for the largest value

  const algorithmInfo = {
    bubble: {
      theory:
        "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      complexity: "Time Complexity: O(n^2), Space Complexity: O(1)",
    },
    insertion: {
      theory:
        "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.",
      complexity: "Time Complexity: O(n^2), Space Complexity: O(1)",
    },
    selection: {
      theory:
        "Selection Sort is an in-place comparison sorting algorithm. It has an O(n^2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.",
      complexity: "Time Complexity: O(n^2), Space Complexity: O(1)",
    },
  };

  const sortFunctions = {
    bubble: async () => {
      let arr = [...array];
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          incrementComparisons();
          setActiveIndices([j, j + 1]);
          if (arr[j] > arr[j + 1]) {
            incrementSwaps();
            setSwappingIndices([j, j + 1]);
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, speed));
            setSwappingIndices([]);
          }
        }
      }
      setActiveIndices([]);
    },
    insertion: async () => {
      let arr = [...array];
      let n = arr.length;
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        setActiveIndices([i]);
        while (j >= 0 && arr[j] > key) {
          incrementComparisons();
          setSwappingIndices([j, j + 1]);
          arr[j + 1] = arr[j];
          j = j - 1;
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, speed));
          setSwappingIndices([]);
        }
        arr[j + 1] = key;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      setActiveIndices([]);
    },
    selection: async () => {
      let arr = [...array];
      let n = arr.length;
      for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
          incrementComparisons();
          setActiveIndices([i, j]);
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        if (minIndex !== i) {
          incrementSwaps();
          setSwappingIndices([i, minIndex]);
          [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, speed));
          setSwappingIndices([]);
        }
      }
      setActiveIndices([]);
    },
  };

  const handleSort = () => {
    sortFunctions[selectedAlgorithm]();
  };

  const resetArray = () => {
    const newArray = Array.from(
      { length: 5 },
      () => Math.floor(Math.random() * 20) + 1
    );
    setArray(newArray);
    setSteps({ swaps: 0, comparisons: 0 });
    setActiveIndices([]);
    setSwappingIndices([]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div
            className="card mb-4"
            style={{ height: "400px", backgroundColor: "#FFEDFA" }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div
                className="d-flex justify-content-center align-items-end flex-wrap gap-3 mt-4"
                style={{ height: "100px" }}
              >
                {array.map((value, index) => {
                  const size =
                    (value / maxArrayValue) * (maxSize - minSize) + minSize;
                  return (
                    <Ball
                      key={index}
                      value={value}
                      isActive={activeIndices.includes(index)}
                      isSwapping={swappingIndices.includes(index)}
                      size={size}
                    />
                  );
                })}
              </div>
              <Controls onReset={resetArray} />
              <div className="mt-3">
                <p>Swaps: {steps.swaps}</p>
                <p>Comparisons: {steps.comparisons}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card mb-4"
            style={{ height: "400px", backgroundColor: "#FFEDFA" }}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title" style={{ color: "#DE3163" }}>
                {selectedAlgorithm.charAt(0).toUpperCase() +
                  selectedAlgorithm.slice(1)}{" "}
                Sort
              </h5>
              <p className="card-text">
                {algorithmInfo[selectedAlgorithm].theory}
              </p>
              <p className="card-text">
                {algorithmInfo[selectedAlgorithm].complexity}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        id="sortButton"
        style={{ display: "none" }}
        onClick={handleSort}
      ></button>
    </div>
  );
};

export default SortingVisualizer;

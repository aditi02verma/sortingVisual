import { useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(500);

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#FFEDFA" }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#CCDF92" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: "#000000" }}>
            Sorting Visualizer
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <select
                  className="form-select me-2"
                  value={selectedAlgorithm}
                  onChange={handleAlgorithmChange}
                  style={{ backgroundColor: "#E195AB", color: "#000000" }}
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="selection">Selection Sort</option>
                  {/* Add more sorting algorithms here as needed */}
                </select>
              </li>
              <li className="nav-item me-3">
                <select
                  className="form-select me-2"
                  value={speed}
                  onChange={handleSpeedChange}
                  style={{ backgroundColor: "#E195AB", color: "#000000" }}
                >
                  <option value="100">Fast</option>
                  <option value="500">Medium</option>
                  <option value="1000">Slow</option>
                </select>
              </li>
              <li className="nav-item">
                <button
                  className="btn"
                  style={{ backgroundColor: "#DE3163", color: "#000000" }}
                  onClick={() => document.getElementById("sortButton").click()}
                >
                  Sort
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5 flex-grow-1">
        <SortingVisualizer
          selectedAlgorithm={selectedAlgorithm}
          speed={speed}
        />
      </div>
      <footer
        className="text-center py-2 mt-auto"
        style={{ backgroundColor: "#CCDF92", color: "#000000" }}
      >
        <div className="container">
          <p className="mb-0">
            Made by Aditi Verma | Email:{" "}
            <a
              href="mailto:aditiverma1000s@gmail.com"
              style={{ color: "#000000" }}
            >
              aditiverma1000s@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

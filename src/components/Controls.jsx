import { useState } from "react";

const Controls = ({ onReset }) => {
  return (
    <div className="controls">
      <button className="btn btn-danger me-2" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;

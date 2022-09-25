import { React, useCallback } from "react";
import "./App.css";
import DropDown from "./DropDown/DropDown";

const sampleOptions = new Map([
  [1, "Option 1"],
  [2, "Option 2"],
  [3, "Option 3"],
  [4, "Option 4"],
  [5, "Option 5"],
  [6, "Option 6"],
  [7, "Option 7"],
  [8, "Option 8"],
  [9, "Option 9"],
  [10, "Option 10"],
  [11, "Option 11"],
  [12, "Option 12"],
  [13, "Option 13"],
  [14, "Option 14"],
  [15, "Option 15"],
  [16, "Option 16"],
]);

function App() {
  const handleSubmit = useCallback((keys) => {
    console.log(keys);
  }, []);
  return (
    <div className="App">
      <DropDown options={sampleOptions} onDismiss={handleSubmit} />
      <DropDown
        options={sampleOptions}
        multipleSelect={true}
        onDismiss={handleSubmit}
      />
    </div>
  );
}

export default App;

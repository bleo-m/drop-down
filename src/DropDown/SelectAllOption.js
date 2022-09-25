import React from "react";
import "./DropDown.css";

/**
 * Special version of a DropDownOption. When clicked, all of the options are selected / deselected.
 *
 * @param {() => void} onSelect Callback fired when the "Select All" or "Deselect All" option is clicked
 * @param {boolean} allAreSelected Is true when all options are currently selected.
 * @returns
 */
const SelectAllOption = ({ onSelect, allAreSelected }) => {
  return (
    <div
      className="drop-down-option"
      onClick={() => {
        onSelect(allAreSelected);
      }}
    >
      {allAreSelected ? "Deselect All" : "Select All"}
    </div>
  );
};

export default SelectAllOption;

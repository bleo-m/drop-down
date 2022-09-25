import React from "react";
import "./DropDown.css";

/**
 * An option for the drop down menu. Styling varies for hover and selected states.
 * @param {any} option_key the key for the corresponding option
 * @param {Map<number, string>} options Maps numbers to strings, representing all the options available for the drop down menu.
 * @param {() => void} onSelect Callback fired when an option is selected
 * @param {() => void} onRemove Callback fired when an option is de-selected
 * @param {boolean} isSelected Whether this option is currently selected or not
 */
const DropDownOption = ({
  option_key,
  options,
  onSelect,
  onRemove,
  isSelected,
}) => {
  return (
    <div
      className={
        isSelected ? "drop-down-option drop-down-selected" : "drop-down-option"
      }
      onClick={() => {
        if (isSelected) {
          onRemove(option_key);
        } else {
          onSelect(option_key);
        }
      }}
    >
      {options?.get(option_key)}
    </div>
  );
};

export default DropDownOption;

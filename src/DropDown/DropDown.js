import { React, useState, useEffect, useRef } from "react";
import DropDownOption from "./DropDownOption";
import SelectAllOption from "./SelectAllOption";
import "./DropDown.css";

/**
 * A drop down menu that displays a variety of different text options for a user to select.
 * Supports a single selected option or multiple selected options.
 *
 * @param {Map<number, string>} options Maps numbers to strings, representing all the options available for the drop down menu.
 * @param {boolean} multipleSelect Boolean set to 'true' if the drop down menu should allow for multiple selected options.
 * @param {(Array<String>) => void} onDismiss Callback fired when the menu is closed.
 */
const DropDown = ({ options, multipleSelect, onDismiss }) => {
  const dropDownRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSelectedKeys, setCurrentSelectedKeys] = useState(new Set());

  /**
   * Callback function for when an option is selected from the dropdown menu.
   * Changes behavior depending on whether multipleSelect is enabled.
   * @param {any} option_key the key corresponding to the option that was selected on the drop down menu
   */
  const handleSelect = (option_key) => {
    if (multipleSelect) {
      setCurrentSelectedKeys(new Set([...currentSelectedKeys, option_key]));
    } else {
      setCurrentSelectedKeys(new Set([option_key]));
    }
  };

  /**
   * Callback function for when "Select All" or "Deselect All" option is pressed
   * @param {boolean} allAreSelected
   */
  const handleSelectAll = (allAreSelected) => {
    if (allAreSelected) {
      setCurrentSelectedKeys(new Set()); // deselect all
    } else {
      setCurrentSelectedKeys(new Set([...options.keys()])); //select all
    }
  };

  /**
   * Callback function for when an option is de-selected from the dropdown menu.
   * @param {any} option_key the key corresponding to the option that was selected on the drop down menu
   */
  const handleRemove = (option_key) => {
    currentSelectedKeys.delete(option_key);
    setCurrentSelectedKeys(new Set(currentSelectedKeys));
  };

  // checks to see if user clicks outside of the drop down menu in order to close and submit it
  useEffect(() => {
    const ifClickedOutside = (event) => {
      if (
        isExpanded &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
        onDismiss(currentSelectedKeys);
      }
    };
    document.addEventListener("mousedown", ifClickedOutside);
    return () => {
      // clean-up step
      document.removeEventListener("mousedown", ifClickedOutside);
    };
  }, [isExpanded, currentSelectedKeys, onDismiss]);

  // create sub components for all the options in the drop down menu
  const option_keys = [...options.keys()]; // handle every option as their respective key for increased performance
  const menuOptions = option_keys.map((key, index) => {
    const isSelected = currentSelectedKeys.has(key);
    return (
      <DropDownOption
        option_key={key}
        options={options}
        onSelect={handleSelect}
        onRemove={handleRemove}
        isSelected={isSelected}
        key={`${index}-${key}`}
      />
    );
  });

  // indicate to users that they can select multiple items if multipleSelection is enabled
  let placeHolderText = multipleSelect ? "Select Option(s)" : "Select Option";
  let currentSelection = "";
  // Convert current selected keys back into human-readable values and make them into a list
  for (const key of currentSelectedKeys.values()) {
    // if multipleSelection is enabled, add a comma in between the different options
    currentSelection += `${options.get(key)}${multipleSelect ? ", " : ""}`;
  }

  return (
    <div className="drop-down-container" ref={dropDownRef}>
      <button
        className="drop-down-selection"
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        {currentSelectedKeys.size > 0 ? currentSelection : placeHolderText}
      </button>
      {isExpanded && (
        <div className="drop-down-menu">
          {multipleSelect && (
            <SelectAllOption
              onSelect={handleSelectAll}
              allAreSelected={currentSelectedKeys.size === options.size}
            />
          )}
          {menuOptions}
        </div>
      )}
    </div>
  );
};

export default DropDown;

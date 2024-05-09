import { useState } from "react";
import { vehicleModels } from "../constant";
import "./Practice.css";
import Practice2 from "./Practice2";

function PhoneNumberInput() {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  // Handle input changes
  const handleInput = (event) => {
    const value = event.target.value;
    // Check if the input is a number and does not exceed 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
      const filtered = vehicleModels.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  // Handle clicking on an option
  const handleOptionClick = (option) => {
    setInputValue(option.label);
    setFilteredOptions([]);
  };

  return (
    <>
      <div className="mt-5">
        <input
          type="text"
          className="border mb-5"
          value={inputValue}
          onInput={handleInput}
          placeholder="Enter up to 4 digits..."
        />
        {inputValue && (
          <ul className="options-list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Practice2 />
    </>
  );
}

export default PhoneNumberInput;

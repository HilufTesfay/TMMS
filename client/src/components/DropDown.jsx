import { useState } from "react";
import PropTypes from "prop-types";

const DropDown = ({ options, placeholder, id, name, onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    onChange(value); // Ensure parent component expects a value, not an event
  };

  return (
    <select
      name={name}
      id={id}
      value={selectedOption}
      onChange={handleOptionChange}
      className="form-select  flex justify-center"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string, // Added validation for id
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  placeholder: "Select an option",
};

export default DropDown;

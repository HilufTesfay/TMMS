import PropTypes from "prop-types";
const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="flex justify-center gap-2 input">
      {Icon && <Icon className="text-gray-500 text-2xl" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="focus:outline-none"
      />
    </div>
  );
};

export default Input;
Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  icon: "",
};

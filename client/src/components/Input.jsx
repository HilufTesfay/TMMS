import PropTypes from "prop-types";
const Input = ({
  type = "text",
  placeholder = "",
  value,
  icon: Icon,
  onChange,
  id,
  name,
  styles,
}) => {
  return (
    <div className="flex justify-center gap-2 input bg-white w-72">
      {Icon && <Icon className="text-gray-500 text-2xl" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className="focus:outline-none bg-inherit w-full"
        style={styles}
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
  styles: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  icon: "",
};

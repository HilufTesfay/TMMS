import PropTypes from "prop-types";
const Button = ({ text, styles, onClick, type }) => {
  return (
    <div className="w-72">
      <button
        onClick={onClick}
        style={styles}
        className="button w-full"
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

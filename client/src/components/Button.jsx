import PropTypes from "prop-types";
const Button = ({ text, styles, onClick, type }) => {
  return (
    <button onClick={onClick} style={styles} className="button" type={type}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

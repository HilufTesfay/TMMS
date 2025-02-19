import PropTypes from "prop-types";
const Card = ({ total, bgColor, color, title }) => {
  return (
    <div
      className={`w-72 h-40 bg-${bgColor}  
      rounded-md shadow-md pl-16 py-5 flex-col hover:bg-gray-100 hover:shadow-lg
      hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer
       justify-center items-center text-gray-400 font-bold`}
    >
      <h1 className="p-2">{title}</h1>
      <h1
        className={`font-extrabold text-${color} text-3xl px-6 py-4 ml-2 h-20 w-20 rounded-full bg-blue-500`}
      >
        {total}
      </h1>
    </div>
  );
};
export default Card;
Card.propTypes = {
  total: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

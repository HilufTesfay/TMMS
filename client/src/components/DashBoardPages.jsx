import PropTypes from "prop-types";
const Pages = ({ text, icon: Icon }) => {
  return (
    <div
      className="w-60 flex bg-slate-50 justify-center items-center text-gray-700
     hover:text-white font-bold py-2 pl-10 rounded hover:bg-blue-500 text-sm gap-2"
    >
      {Icon && <Icon size={32} />}
      <h1 className="  w-60 m-auto">{text}</h1>
    </div>
  );
};

export default Pages;

Pages.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="w-full flex justify-center items-center gap-2 bg-main border border-gray-500 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
      <input
        type="text"
        placeholder="Search"
        className="w-80 h-full p-2 focus:outline-none"
      />
      <FaSearch size={30} className="text-gray-500 cursor-pointer" />
    </div>
  );
};

export default Search;

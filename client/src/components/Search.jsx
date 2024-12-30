import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="w-full flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        className="rounded-lg border border-gray-500 p-2 w-80 h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch size={30} className="text-gray-500 cursor-pointer" />
    </div>
  );
};

export default Search;

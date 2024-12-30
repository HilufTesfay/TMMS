import { FaBars } from "react-icons/fa";
import { Search } from "../components";

const Navbar = () => {
  return (
    <header className="flex gap-6 justify-start items-center ">
      <FaBars size={30} className=" hover:cursor-pointer text-gray-500" />
      <Search />
    </header>
  );
};

export default Navbar;

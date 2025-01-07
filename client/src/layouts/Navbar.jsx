import { FaBars } from "react-icons/fa";
import { Search } from "../components";

const Navbar = () => {
  return (
    <header className="flex gap-10 justify-between items-center ">
      <FaBars size={40} className=" hover:cursor-pointer text-gray-500 m" />
      <Search />
    </header>
  );
};

export default Navbar;

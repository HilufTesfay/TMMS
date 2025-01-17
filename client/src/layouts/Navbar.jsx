import { Search, FaIcon } from "../components";
import { ActiveMenuProvider } from "../context";
const Navbar = () => {
  return (
    <header className="flex gap-10 justify-between items-center ">
      <ActiveMenuProvider>
        <FaIcon />
      </ActiveMenuProvider>
      <Search />
    </header>
  );
};

export default Navbar;

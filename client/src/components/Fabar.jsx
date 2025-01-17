import { FaBars } from "react-icons/fa";
import { useActiveMenu } from "../context";

const FaIcon = () => {
  const { toggle } = useActiveMenu();

  return (
    <div
      onClick={() => {
        toggle;
      }}
    >
      <FaBars size={40} className="hover:cursor-pointer text-gray-500" />
    </div>
  );
};

export default FaIcon;

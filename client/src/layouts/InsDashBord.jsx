import { logo } from "../assets";
import { Link } from "react-router-dom";
import { DashBordPages } from "../components";
import { MdClass } from "react-icons/md";
import { AiOutlineBook } from "react-icons/ai";
const InsDashBord = () => {
  return (
    <div
      className="fixed w-72 h-screen sidebar bg-green-500 flex gap-4 flex-col justify-center"
      style={{ zIndex: "100" }}
    >
      <div className="flex justify-start  mt-4 ml-4 border-y-2 border-blue-500 p-4 fixed top-0">
        <Link to="/instructor" className="flex font-bold">
          <img src={logo} alt="" height={40} width={40} />
          Instructor-Dashboard
        </Link>
      </div>
      <Link to="/instructor/rooms">
        <DashBordPages text="Rooms" icon={MdClass} />
      </Link>
      <Link to="/instructor/booking">
        <DashBordPages n text="Bookings" icon={AiOutlineBook} />
      </Link>
    </div>
  );
};
export default InsDashBord;

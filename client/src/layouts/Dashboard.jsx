import { logo } from "../assets";
import { Link } from "react-router-dom";
import { DashBordPages, NotificationIcon } from "../components";
import { FaChalkboardTeacher, FaUserPlus } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineBook } from "react-icons/ai";
const Dashboard = () => {
  return (
    <div className="w-full h-full relative flex flex-col items-center gap-6">
      <div className="flex justify-start  mt-4 ml-4 border-y-2 border-blue-500 p-4">
        <Link to="/" className="flex font-bold">
          <img src={logo} alt="" height={40} width={40} />
          Admin-Dashboard
        </Link>
      </div>
      <div className="w-full">
        <span className="ml-7">Pages</span>
        <div className="flex flex-col justify-center gap-2 items-center ml-10 mr-10 ">
          <Link to="register">
            <DashBordPages text="Register" icon={FaUserPlus} />
          </Link>
          <Link to="users">
            <DashBordPages text="Instructors" icon={FaChalkboardTeacher} />
          </Link>
          <Link to="classes">
            <DashBordPages text="Rooms" icon={MdClass} />
          </Link>
          <Link to="equipments">
            <DashBordPages text="Teaching material" icon={AiOutlineBook} />
          </Link>
          <Link to="equipments">
            <DashBordPages text="Report" icon={HiOutlineDocumentReport} />
          </Link>
          <Link to="bookings">
            <DashBordPages text="Boookings" icon={MdClass} />
          </Link>
          <Link to="bookings">
            <DashBordPages text="notification" icon={NotificationIcon} />
          </Link>
        </div>
        <span className="ml-7">Tools</span>
      </div>
    </div>
  );
};

export default Dashboard;

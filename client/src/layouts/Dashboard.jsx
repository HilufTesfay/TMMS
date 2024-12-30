import { logo } from "../assets";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="w-full h-full relative">
      <div className="flex justify-start absolute mt-4 ml-4">
        <Link to="/" className="flex font-bold">
          <img src={logo} alt="" height={40} width={40} />
          Admin-Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

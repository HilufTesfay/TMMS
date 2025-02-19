import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useActiveMenu } from "../context/ActiveMenuContext";
import Dashboard from "./Dashboard";
import ProfileIcon from "../components/ProfileIcon";
import { FiSettings } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { authService } from "../services";

const MainLayout = () => {
  const { userRole } = useAuth();
  const { activeMenu } = useActiveMenu();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userRole === "instructor") {
      navigate("/instructor");
    }
  }, [userRole, navigate]);

  if (userRole === "admin") {
    return (
      <div className="flex relative ">
        {/* Sidebar */}
        {activeMenu ? (
          <div
            className="fixed w-72 h-screen sidebar bg-main"
            style={{ zIndex: "100" }}
          >
            <Dashboard />
          </div>
        ) : (
          <div className="w-0 overflow-hidden">
            <Dashboard />
          </div>
        )}

        {/* Navbar and Profile */}
        <div
          className="fixed ml-72  w-72 h-24 mt-2 right-0 top-4 flex justify-end"
          style={{ zIndex: "1000" }}
        >
          <div>
            <ProfileIcon name={authService.getName()} />
          </div>
        </div>

        {/* Settings Button */}
        <div className="fixed right-4 bottom-4 bg-light-gray">
          <button className="text-3xl">
            <FiSettings className="text-gray-500 text-3xl" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex justify-center h-screen ml-ml-74 mt-28 w-full bg-main">
          <Outlet />
        </div>
      </div>
    );
  }

  return null; // Render nothing if the user role is not 'admin' or 'instructor'
};

export default MainLayout;

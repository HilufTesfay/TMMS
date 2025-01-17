import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { ProfileIcon } from "../components";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Outlet } from "react-router-dom";
import { useActiveMenu } from "../context";
import "../App.css";

function AppLayout() {
  const { activeMenu } = useActiveMenu();
  console.log("activeMenu", activeMenu);
  return (
    <div className="flex relative">
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
      <div className="fixed ml-ml-74 mr-2 w-full h-24 mt-2 flex justify-center items-center gap-10">
        <Navbar />
        <ProfileIcon />
      </div>

      {/* Settings Button */}
      <div className="fixed right-4 bottom-4 bg-light-gray">
        <TooltipComponent position="TopCenter" content="Settings">
          <button className="text-3xl">
            <FiSettings className="text-gray-500 text-3xl" />
          </button>
        </TooltipComponent>
      </div>

      {/* Main Content */}
      <div className="flex justify-center h-screen ml-ml-74 mt-28 w-full bg-main">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;

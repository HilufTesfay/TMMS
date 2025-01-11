import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard, Navbar } from "./layouts";
import { ProfileIcon } from "./components";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import { Login } from "./pages";
function App() {
  const aciveMenu = true;
  return (
    <Router>
      <div className="flex relative  ">
        {/* side bar*/}
        {aciveMenu ? (
          <div
            className="fixed  w-72 h-screen sidebar bg-main"
            style={{ zIndex: "100" }}
          >
            <Dashboard />
          </div>
        ) : (
          <div className="w-0">
            <Dashboard />
          </div>
        )}

        {/*nav links */}
        <div className="fixed  ml-ml-74 mr-2 w-full h-24  mt-2  flex justify-center items-center gap-10 ">
          <Navbar />

          <ProfileIcon />
        </div>
        <div className="fixed right-4 bottom-4 bg-light-gray ">
          <TooltipComponent position="TopCenter" content="settinng">
            <button className="text-3xl">
              <FiSettings className="text-gray-500 text-3xl" />
            </button>
          </TooltipComponent>
        </div>
        {/**main content */}
        <div className=" flex justify-center h-screen ml-ml-74 mt-28 w-full bg-main">
          {/*routes */}
          <Routes></Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

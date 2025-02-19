import { useNavigate } from "react-router-dom";
import { authService } from "../services";
const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authService.logOut();
    navigate("/login");
  };
  return (
    <div
      className="flex flex-col 
     justify-center h-full bg-slate-200 shadow-sm rounded-lg fixed top-16 right-0 w-56 p-4 to-zinc-100  "
    >
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleLogout}
      >
        sign out
      </button>
    </div>
  );
};

export default Profile;

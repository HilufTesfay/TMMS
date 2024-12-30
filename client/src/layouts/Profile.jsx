import { ProfileIcon } from "../components";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
const Profile = () => {
  const [activeProfile, setActiveProfile] = useState(false);
  const toggle = () => {
    setActiveProfile(!activeProfile);
  };
  return (
    <div className="flex flex-col ">
      <ProfileIcon />
      <button>logOut</button>
      <FiSettings />
    </div>
  );
};

export default Profile;

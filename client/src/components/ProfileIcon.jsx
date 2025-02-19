import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import PropTypes from "prop-types";
import { Profile } from "../pages";
const ProfileIcon = ({ name }) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="flex flex-col items-center ">
      <BsPersonCircle
        size={40}
        className="hover:cursor-pointer border border-blue-500 rounded-full p-1 bg-blue-500 text-white"
        onClick={openModal}
      />
      <span className="text-gray-500 text-sm">{name}</span>
      {isOpen && <Profile />}
    </div>
  );
};

ProfileIcon.propTypes = {
  name: PropTypes.string,
};

export default ProfileIcon;

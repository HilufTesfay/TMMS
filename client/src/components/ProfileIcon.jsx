import { BsPersonCircle } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
const ProfileIcon = () => {
  return (
    <TooltipComponent position="top" content="profile">
      <BsPersonCircle
        size={40}
        className="text-gray-500 hover:cursor-pointer"
      />
    </TooltipComponent>
  );
};

export default ProfileIcon;

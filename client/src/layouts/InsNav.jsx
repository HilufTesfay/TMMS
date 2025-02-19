import { ProfileIcon, NotificationIcon } from "../components";
import { authService } from "../services";
const InsNav = () => {
  return (
    <div className="flex relative justify-end navbar p-4 h-28 w-full gap-6 items-center">
      <NotificationIcon />
      <ProfileIcon name={authService.getName()} />
    </div>
  );
};
export default InsNav;

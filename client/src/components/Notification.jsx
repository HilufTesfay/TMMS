import { FaBell } from "react-icons/fa";
import { bookingService } from "../services";
function NotificationIcon() {
  return (
    <div className="relative inline-block hover:cursor-pointer hover:text-white">
      <FaBell className="text-blue-500" size={24} />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full">
        {bookingService.getBookings().totalBookings}
      </span>
    </div>
  );
}

export default NotificationIcon;

import { Link } from "react-router-dom";
import { analyticService } from "../services";
import { Card } from "../components";
import { useEffect, useState } from "react";
const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticService.getAnalytics();
        setAnalytics(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8 mt-20">
      <div className="flex gap-10">
        <Link to="/users">
          <Card
            title="Total Instructors"
            total={analytics.totalUsers}
            bgColor="light-gray"
            color="white"
          />
        </Link>
        <Link to="/classes">
          <Card
            title="Total Rooms"
            total={analytics.totalClassRooms}
            bgColor="light-gray"
            color="white"
          />
        </Link>
      </div>
      <div className="flex gap-10">
        <Link to="/equipments">
          <Card
            title="Total Material"
            total={analytics.totalEquipments}
            bgColor="light-gray"
            color="white"
          />
        </Link>
        <Link to="/bookings">
          <Card
            title="Total Bookings"
            total={analytics.totalBookings}
            bgColor="light-gray"
            color="white"
          />
        </Link>
      </div>
    </div>
  );
};
export default Analytics;

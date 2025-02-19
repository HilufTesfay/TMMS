import { InsDashBord, InsNav } from "../layouts";
import { Routes, Route } from "react-router-dom";
import { Rooms } from "../pages";
import { RoomCard } from "../components";
import { bookingService } from "../services";
import { useEffect, useState } from "react";
//import Test from "../pages/Test";
const Instructor = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  useEffect(() => {
    const room = bookingService.getBookedRoom();
    console.log("booked rooom", room.building);
    setRoomNumber(room.room);
    setBlockNumber(room.building);
  }, []);

  return (
    <div className="flex relative gap-20 w-full">
      <div className="w-72 h-screen sidebar bg-green-500 flex gap-4 flex-col justify-center mt-2">
        <InsDashBord />
      </div>
      <div className="w-full h-screen bg-gray-100 flex flex-col mt-2 ">
        <div className="flex relative justify-end navbar p-4 h-28 w-full  gap-6 items-center bg-white">
          <InsNav />
        </div>
        <div className="ml-10 mt-4 w-full h-full">
          <Routes>
            <Route path="/" element={<h1> well come</h1>} />
            <Route path="/rooms" element={<Rooms />} />
            <Route
              path="/booking"
              element={
                <RoomCard
                  roomNumber={roomNumber}
                  blockNumber={blockNumber}
                  equipments={["projector", "remote"]}
                />
              }
            />
            {/* Add more instructor-specific routes here */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Instructor;

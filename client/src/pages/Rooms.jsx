import { InsTable, EquipCard } from "../components";
import { useEffect, useState, useRef } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { classRoomService, bookingService, authService } from "../services";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const equipCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        equipCardRef.current &&
        !equipCardRef.current.contains(event.target)
      ) {
        setSelectedRoom(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewClick = () => {
    const equipmentData = [{ type: "Projector", status: "Good" }];
    // const key = concatenateNumber(room.blockNumber, room.roomNumber);
    // console.log(key);
    // const rooms = classRoomService.getRooms();
    setSelectedRoom(equipmentData);
    // console.log("equipments", rooms[key].equipments);
  };

  const handleBookRoom = async (room) => {
    if (room.isTaken === true) {
      console.log("");
    } else {
      const roomData = {};
      roomData.instructor = authService.getUserId();
      roomData.building = room.blockNumber;
      roomData.room = room.roomNumber;
      try {
        const room = await bookingService.bookRoom(roomData);
        console.log("booked:", room);
      } catch (error) {
        console.log(error);
      }
    }

    setRooms((prevRooms) =>
      prevRooms.map((r) =>
        r.roomNumber === room.roomNumber ? { ...r, isBooked: !r.isBooked } : r
      )
    );
    setSnackbar({
      open: true,
      message: `Room ${room.roomNumber} ${
        !room.isBooked ? "booked" : "unbooked"
      } successfully.`,
    });
  };

  const columns = [
    {
      header: "Block",
      accessorKey: "blockNumber",
      muiTableHeadCellProps: { style: { color: "blue" } },
    },
    {
      accessorKey: "roomNumber",
      header: "Room",
      muiTableHeadCellProps: { style: { color: "blue" } },
    },
    {
      header: "Equipments",
      accessorKey: "equipments",
      Cell: ({ row }) => (
        <Button variant="contained" onClick={() => handleViewClick()}>
          View More
        </Button>
      ),
    },
    {
      header: "Book Room",
      accessorKey: "isTaken",
      muiTableHeadCellProps: { style: { color: "blue" } },
      Cell: ({ row }) => (
        <Button
          variant={row.original.isTaken ? "outlined" : "contained"}
          onClick={() => handleBookRoom(row.original)}
        >
          {row.original.isBooked ? "Booked" : "Book Now"}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await classRoomService.getAvailableRooms();
        setRooms(rooms);
        console.log("stored data", classRoomService.getRooms());
      } catch (error) {
        console.log(error);
        setError("Room fetching error");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) {
    return <div>data loading.......</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <div>
      {selectedRoom && (
        <div
          ref={equipCardRef}
          style={{
            position: "relative",
            zIndex: 100,
            marginBottom: "20px",
            left: 320,
          }}
        >
          <EquipCard equipment={selectedRoom} />
        </div>
      )}
      <InsTable columns={columns} data={rooms} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Rooms;

import { classRoomService } from "../services";
import { Table } from "../components";
import { useEffect, useState } from "react";
import { EquipCard } from "../components";
const Classes = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Track the selected room
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchedRooms = await classRoomService.getClassRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.log("Fetching error:", error);
        setError("Failed to fetch classroom data.");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleButtonClick = (room) => {
    setSelectedRoom(room); // Set the clicked room's data
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".equipment-card")) {
      setSelectedRoom(null); // Hide card if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const columns = [
    {
      accessorKey: "blockNumber",
      header: "Block",
      size: 180,
      muiTableHeadCellProps: { sx: { color: "blue" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "roomNumber",
      header: "Room",
      size: 180,
      muiTableHeadCellProps: { sx: { color: "blue" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
    },
    {
      accessorKey: "isTaken",
      header: "Status",
      size: 180,
      muiTableHeadCellProps: { sx: { color: "blue" } },
      Cell: ({ row }) => (
        <button
          onClick={() => handleButtonClick(row.original)}
          className={`px-4 py-2 font-bold text-white rounded ${
            row.original.isTaken === "Available"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-red-500 hover:bg-red-700"
          }`}
        >
          {row.original.isTaken}
        </button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading classroom data...</div>;
  }
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold mb-4">Classroom Status</h1>
      <Table columns={columns} data={rooms} />
      {selectedRoom && <EquipCard />}
    </div>
  );
};

export default Classes;

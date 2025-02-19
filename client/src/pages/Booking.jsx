import { Table } from "../components";
import { useEffect, useState } from "react";
import { bookingService } from "../services";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const BlueCheckbox = styled(Checkbox)({
  color: "blue",
  "&.Mui-checked": {
    color: "blue",
  },
  "& .MuiSvgIcon-root": {
    fill: "blue",
  },
});
const columns = [
  {
    accessorKey: "instructor",
    header: "Instructor",
    muiTableHeadCellProps: { sx: { color: "blue" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "building",
    header: "Building",
    muiTableHeadCellProps: { sx: { color: "blue" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "room",
    header: "Room",
    muiTableHeadCellProps: { sx: { color: "blue" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "date",
    header: "Date",
    muiTableHeadCellProps: { sx: { color: "blue" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "aprroval",
    header: "Approval",
    muiTableHeadCellProps: { sx: { color: "red" } },
    Cell: ({ row }) => <BlueCheckbox />,
  },
];
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bookingService.getBookings();
        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <Table data={bookings} columns={columns} />;
};

export default Booking;

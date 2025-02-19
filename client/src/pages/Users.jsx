import { useEffect, useState } from "react";
import { Table } from "../components";
import { userService } from "../services";
const columns = [
  {
    accessorKey: "userId",
    header: "ID",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },

  {
    accessorKey: "email",
    header: "Email",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    // eslint-disable-next-line react/prop-types
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "phoneNumber",
    header: "phone",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "college",
    header: "college",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "department",
    header: "department",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "employmentType",
    header: "emp-type",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "record",
    header: "record",
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
];

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getUsers();
        console.log("recived", users);
        setData(users.users);
      } catch (err) {
        console.log(err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading user data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-bold mb-4 ml-14">User List</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Users;

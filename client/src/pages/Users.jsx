import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getUsers } from "../services";

const columns = [
  { Header: "ID", accessor: "userId" },
  { Header: "Name", accessor: "firstName" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "Email", accessor: "email" },
  { Header: "Phone Number", accessor: "phoneNumber" },
  { Header: "College", accessor: "college" },
  { Header: "Department", accessor: "department" },
  { Header: "Employee Type", accessor: "employmentType" },
  { Header: "Role", accessor: "role" },
];

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        console.log(users);
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

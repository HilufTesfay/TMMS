import { equipService } from "../services";
import { Table } from "../components";
import { useEffect, useState } from "react";
const columns = [
  {
    accessorKey: "id",
    header: "ID",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  },
  {
    accessorKey: "condition",
    header: "Condition",
    size: 180,
    muiTableHeadCellProps: { sx: { color: "green" } },
    Cell: ({ row }) => {
      return (
        <button
          className={`px-4 py-2 font-bold text-white rounded ${
            row.original.condition === "poor"
              ? "bg-red-500 hover:bg-red-700"
              : "bg-green-500"
          }`}
        >
          {row.original.condition}
        </button>
      );
    },
  },
];
const Equipments = () => {
  const [data, setData] = useState([]);
  const [error, setErrors] = useState("");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchEquip = async () => {
      try {
        const data = await equipService.getEquipmens();
        setData(data);
      } catch (error) {
        console.log(error);
        setErrors("feching error");
      } finally {
        setloading(false);
      }
    };
    fetchEquip();
  }, []);
  if (loading) {
    return <div>loading....</div>;
  }
  if (error) return <div className="text-red-500">{error}</div>;
  return <Table columns={columns} data={data} />;
};

export default Equipments;

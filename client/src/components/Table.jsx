import PropTypes from "prop-types";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { userService } from "../services";
export default function Table({ data, columns }) {
  const table = useMaterialReactTable({
    data,
    columns,
    enableRowNumbers: true,
    enableEditing: true,
    editDisplayMode: "row",
    onEditingRowSave: ({ table, values }) => {
      console.log(values);
      console.log(values.userId);
      //validate data
      userService
        .updateUser(values)
        .then((respons) => {
          console.log("user updated successfully", respons);
        })
        .catch((error) => {
          console.log(error);
        });
      table.setEditingRow(null); //exit editing mode
    },
  });
  return <MaterialReactTable table={table} />;
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessorKey: PropTypes.string.isRequired,
    })
  ).isRequired,
};

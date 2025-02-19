import PropTypes from "prop-types";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
const InsTable = ({ data, columns }) => {
  const table = useMaterialReactTable({
    data,
    columns,
    enableRowNumbers: true,
  });
  return <MaterialReactTable table={table} />;
};

export default InsTable;
InsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessorKey: PropTypes.string.isRequired,
    })
  ).isRequired,
};

import PropTypes from "prop-types";
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="table-auto border-collapse border border-gray-300 w-full"
    >
      {/* Table Header */}
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="border border-gray-300 px-4 py-2 bg-gray-100"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* Table Body */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id} // Use column ID for unique key
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;

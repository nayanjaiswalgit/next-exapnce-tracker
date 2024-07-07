import React from "react";

interface Column {
  title: string;
  key: string;
  dataIndex: string;
  render?: (data: any) => React.ReactNode;
  className: "string"
}

interface Props {
  columns: Column[];
  dataSource: any[];
}

const Table: React.FC<Props> = ({ columns, dataSource }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-md ">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-4  bg-gray-200 py-2 text-left text-sm font-semibold text-black uppercase tracking-wider "
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 ">
        {dataSource.map((row, rowIndex) => (
          <tr key={rowIndex} className=" mb-3 ">
            {columns.map((column) => (
              <td
                key={`${rowIndex}-${column.key}`}
                className={`${column?.className ? column.className : "px-4 py-2 text-sm text-gray-700 font-medium " }  `}
              >
                {console.log(column)}
                {column.render
                  ? column.render(row[column.dataIndex], row)
                  : row[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data }) {
// Create a state
const [filterInput, setFilterInput] = useState("");

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, 
    setFilter // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
      {
    columns,
    data
  },
  useFilters,
  useSortBy// This plugin Hook will help to sort our table columns
  );

//   const handleFilterChangeL = e => {
//     const value = e.target.value || undefined;
//     // setFilter("name", value);
//     // setFilter("occupation", value);
//     setFilter("location", value);
//     setFilterInput(value);
//   };
//   const handleFilterChangeN = e => {
//       const value = e.target.value || undefined;
//       setFilter("name", value);
//     //   setFilter("occupation", value);
//       // setFilter("location", value);
//       setFilterInput(value);
//     };
                              const handleFilterChangeO = e => {
                                const value = e.target.value || undefined;
                                // setFilter("name", value);
                                setFilter("occupation", value);
                                // setFilter("location", value);
                                setFilterInput(value);
                              };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
 return (
    <>
      <input
        value={filterInput}
        onChange={
            // handleFilterChangeL,
            // handleFilterChangeN,
            handleFilterChangeO
        }
        placeholder={"Search name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
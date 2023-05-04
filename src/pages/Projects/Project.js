import React, { useState } from "react";
import DataTable from "react-data-table-component";

const data = [
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 4, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 5, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 6, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 7, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 8, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 9, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 10, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },

  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  { id: 1, name: "John Smith", age: 30, email: "john.smith@example.com" },
  { id: 2, name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" }

];

const columns = [
  { name: "ID", selector: "id", sortable: true },
  { name: "Name", selector: "name", sortable: true },
  { name: "Age", selector: "age", sortable: true },
  { name: "Email", selector: "email" },
  { name: "Email", selector: "email" },
  { name: "Email", selector: "email" },
  { name: "Email", selector: "email" },
  { name: "Email", selector: "email" },
];

const MyDataTable = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
<div style={{position:'absolute' , top:'80px' , left:'250px' , width:'80%'}}>

    <DataTable
    style={{width:'100%' , background:'red'}}
      title="Users"
      columns={columns}
      data={filteredData}
      pagination={true}
      paginationResetDefaultPage={resetPaginationToggle}
      onChangePage={() => setResetPaginationToggle(!resetPaginationToggle)}
      noDataComponent="No matching records found"
      onClearFilters={handleClear}
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      }
    />
    </div>
  );
};

export default MyDataTable;







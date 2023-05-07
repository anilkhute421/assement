import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";


const columns = [
  { name: "ID", selector: "id", sortable: true },
  { name: "Name", selector: "name", sortable: false },
  { name: "Age/Sex", selector:  `agegender`, sortable: false },
  { name: "Mobile", selector: "phone_number" },
  { name: "Address", selector: "address" },
  { name: "Govt ID", selector: "idno" },
  { name: "Guardian Details", selector: "gardian_name" },
  { name: "Nationality", selector: "nationality" },
];

const MyDataTable = () => {

  const [userData , setUserdata] = useState([]); 

  const user_register = process.env.REACT_APP_API_KEY+'/api/v1/user_details'


  const getData = async() => {
    try {
      const response = await axios.get(user_register);
      setUserdata(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getData();
  },[])
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = userData.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
<div style={{position:'absolute' , top:'100px' , left:'250px' , width:'80%'}}>

    <DataTable
    style={{width:'100%' , background:'red'}}
      title="Users Details"
      columns={columns}
      data={filteredData}
      pagination={true}
      loading={true}
      loadingComponent={'Loading....'}
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







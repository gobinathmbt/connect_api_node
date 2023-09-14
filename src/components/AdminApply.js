import React, { useEffect, useState, useContext } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TextField,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Button,
} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DeleteIcon from '@mui/icons-material/Delete';
import DatabaseContext from '../DataBaseConfig/Config';

const AdminApply = () => {
  const { selectedDatabase } = useContext(DatabaseContext);
  const mysqlApplyUrl = 'http://localhost:3002/MysqlApplyNow';
  const mongoApplyUrl = 'http://localhost:3002/ApplyNow';
  const ApplyUrl = selectedDatabase === 'mysql' ? mysqlApplyUrl : mongoApplyUrl;



  const mysqlDeleteApplyUrl = 'http://localhost:3002/MysqlApplyNowAll';
  const mongoDeleteApplyUrl = 'http://localhost:3002/ApplyNowAll';
  const DeleteApplyUrl = selectedDatabase === 'mysql' ? mysqlDeleteApplyUrl : mongoDeleteApplyUrl;






  const [applyData, setApplyData] = useState([]);
  const [selectedApply, setSelectedApply] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Function to fetch data from the server
  const fetchApplyData = async () => {
    try {
      const response = await axios.get(ApplyUrl);
      const data = response.data;
      // Automatically assign an ID to each apply
      const ApplysWithID = data.map((apply, index) => ({ ...apply, id: index + 1 }));
      setApplyData(ApplysWithID);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchApplyData(); // Fetch data from the server when the component mounts
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this apply?");
    if (confirmDelete) {
      try {
        await axios.delete(`${ApplyUrl}/${id}`);
        setApplyData((prevEnquiries) => prevEnquiries.filter(apply => apply._id !== id));
      } catch (error) {
        console.error('Error deleting apply:', error);
        // Handle error here
      }
    }
  };

  const handleOpenModal = (apply) => {
    setSelectedApply(apply);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApply(null);
    setOpenModal(false);
  };

  const handleDeleteAll = async () => {
    const confirmDeleteAll = window.confirm("Are you sure you want to delete all data?");
    if (confirmDeleteAll) {
      try {
        // Make an API call to delete all data from the server
        await axios.delete(DeleteApplyUrl);
        // Update the local state to remove all data
        setApplyData([]);
      } catch (error) {
        console.error('Error deleting all data:', error);
        // Handle error here
      }
    }
  };


  // Function to handle exporting table data to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataToDisplay);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Apply Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const excelUrl = URL.createObjectURL(excelData);

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'apply_data.xlsx';
    link.click();
  };



  // Step 1: Add state variables for the search query and filtered data
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Step 3: Filtering function based on degree and specialization
  const filterData = (query) => {
    const filtered = applyData.filter(
      (apply) =>
        apply.degree.toLowerCase().includes(query.toLowerCase()) ||
        apply.specialization.toLowerCase().includes(query.toLowerCase()) ||
        apply.yearOfPassing.toString().includes(query) ||
        apply.percentageOfMarks.toString().includes(query)
    );
    setFilteredData(filtered);
  };

  // Step 2: Input field for the search box
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchApplyData();
    // Step 3 (cont.): Call the filterData function whenever the searchQuery changes
    filterData(searchQuery);
  }, [searchQuery]);

  // Step 4: Use the filteredData for displaying table rows
  const dataToDisplay = searchQuery ? filteredData : applyData;





  return (
    <>


      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleExportToExcel}
        >
          Export Data
        </Button>

        <Button
          variant="outlined"
          color="error" // Choose a color that suits your design
          onClick={handleDeleteAll}
          style={{ marginLeft: "30px" }}
        >
          Delete All Data
        </Button>
    
          <TextField
            type="text"
            placeholder="Search by degree or specialization"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            style={{ marginLeft: "30px"}}
            color='secondary'
       
          />
 
      </div>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Year of Passing</TableCell>
              <TableCell>Mark %</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay.map((apply) => (
              <TableRow key={apply.id}>
                <TableCell>{apply.id}</TableCell>
                <TableCell>{apply.fullName}</TableCell>
                <TableCell>{apply.email}</TableCell>
                <TableCell>{apply.mobileNumber}</TableCell>
                <TableCell>{apply.degree}</TableCell>
                <TableCell>{apply.specialization}</TableCell>
                <TableCell>{apply.yearOfPassing}</TableCell>
                <TableCell>{apply.percentageOfMarks}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleOpenModal(apply)}
                  >
                    View address
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(apply._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                {/* Display more data fields as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="modal-container">
          {selectedApply && (
            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
              <p>{selectedApply.address}</p>
            </div>
          )}
        </div>
      </Modal>



    </>
  );
};

export default AdminApply;

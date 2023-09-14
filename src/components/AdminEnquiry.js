import React, { useEffect, useState, useContext } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
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




const EnquiryTable = () => {

    const { selectedDatabase } = useContext(DatabaseContext);


    const mysqlEnquiryUrl = 'http://localhost:3002/MysqlEnquiry';
    const mongoEnquiryUrl = 'http://localhost:3002/Enquiry';
    const EnquiryUrl = selectedDatabase === 'mysql' ? mysqlEnquiryUrl : mongoEnquiryUrl;



    const mysqlDeleteEnquiryUrl= 'http://localhost:3002/MysqlEnquiryAll';
    const mongoDeleteEnquiryUrl = 'http://localhost:3002/EnquiryAll';
    const DeleteEnquiryUrl = selectedDatabase === 'mysql' ? mysqlDeleteEnquiryUrl : mongoDeleteEnquiryUrl;
  



    const [enquiryData, setenquiryData] = useState([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [openModal, setOpenModal] = useState(false);



    // Function to fetch data from the server
    const fetchEnquiryData = async () => {
        try {
            const response = await axios.get(EnquiryUrl);
            const data = response.data;
            // Automatically assign an ID to each course
            const EnquirysWithID = data.map((enquiry, index) => ({ ...enquiry, id: index + 1 }));
            setenquiryData(EnquirysWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchEnquiryData(); // Fetch data from the server when the component mounts
    }, []);
    

    //   // Function to fetch data from the server
    //   const fetchEnquiryData = async () => {
    //     try {
    //         const response = await axios.get(EnquiryUrl);
    //         const data = response.data;
    //         const sortedEnquiryData = sortBy(data, 'createdAt').reverse();
    //         const sortedEnquiryDataWithID = sortedEnquiryData.map((enquiry, index) => ({ ...enquiry, id: index + 1 }));
       
    //         setenquiryData(sortedEnquiryDataWithID);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchEnquiryData(); // Fetch data from the server when the component mounts
    // }, []);




    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
        if (confirmDelete) {
            try {
                await axios.delete(`${EnquiryUrl}/${id}`);
                setenquiryData((prevCourses) => prevCourses.filter(enquiry => enquiry._id !== id));
            } catch (error) {
                console.error('Error deleting enquiry:', error);
                // Handle error here
            }
        }
    };



    const handleOpenModal = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedEnquiry(null);
        setOpenModal(false);
    };




    const handleDeleteAll = async () => {
        const confirmDeleteAll = window.confirm("Are you sure you want to delete all data?");
        if (confirmDeleteAll) {
          try {
            // Make an API call to delete all data from the server
            await axios.delete(DeleteEnquiryUrl);
            // Update the local state to remove all data
            setenquiryData([]);
          } catch (error) {
            console.error('Error deleting all data:', error);
            // Handle error here
          }
        }
      };
  





    // Function to handle exporting table data to Excel
    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(enquiryData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiry Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const excelUrl = URL.createObjectURL(excelData);

        const link = document.createElement('a');
        link.href = excelUrl;
        link.download = 'enquiry_data.xlsx';
        link.click();
    };


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

            </div>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Enquiry</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enquiryData.map((enquiry) => (
                            <TableRow key={enquiry.id}>
                                <TableCell>{enquiry.id}</TableCell>
                                <TableCell>{enquiry.fullName}</TableCell>
                                <TableCell>{enquiry.email}</TableCell>
                                <TableCell>{enquiry.mobileNumber}</TableCell>
                                <TableCell>{enquiry.course}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleOpenModal(enquiry)}
                                    >
                                        View Enquiry
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => handleDelete(enquiry._id)}
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
                    {selectedEnquiry && (
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                            <p>{selectedEnquiry.enquiry}</p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default EnquiryTable;

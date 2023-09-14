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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DatabaseContext from '../DataBaseConfig/Config';

const AdminJoinus = () => {
    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlJoinUsUrl = 'http://localhost:3002/MysqlJoinUsData';
    const mongoJoinUsUrl = 'http://localhost:3002/JoinUsData';
    const JoinUsUrl = selectedDatabase === 'mysql' ? mysqlJoinUsUrl : mongoJoinUsUrl;

    const mysqlDeleteJoinUsUrl = 'http://localhost:3002/MysqlJoinUsAll';
    const mongoDeleteJoinUsUrl = 'http://localhost:3002/JoinUsAll';
    const DeleteJoinUsUrl = selectedDatabase === 'mysql' ? mysqlDeleteJoinUsUrl : mongoDeleteJoinUsUrl;

    const [joinusData, setJoinUsData] = useState([]);
    const [selectedJoinUsDetails, setSelectedJoinUsDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchJoinUsData = async () => {
        try {
            const response = await axios.get(JoinUsUrl);
            const data = response.data;
            const JoinUssWithID = data.map((joinus, index) => ({ ...joinus, id: index + 1 }));
            setJoinUsData(JoinUssWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchJoinUsData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this joinus?');
        if (confirmDelete) {
            try {
                await axios.delete(`${JoinUsUrl}/${id}`);
                setJoinUsData((prevEnquiries) => prevEnquiries.filter(joinus => joinus._id !== id));
            } catch (error) {
                console.error('Error deleting joinus:', error);
            }
        }
    };

    const handleOpenResume = (resumePath) => {
        const fullResumeUrl = `http://localhost:3002/${resumePath}`;
        window.open(fullResumeUrl, '_blank');
    };

    const handleCloseModal = () => {
        setSelectedJoinUsDetails(null);
        setOpenModal(false);
    };

    const handleViewDetails = (joinus) => {
        setSelectedJoinUsDetails(joinus);
        setOpenModal(true);
    };

    const handleDeleteAll = async () => {
        const confirmDeleteAll = window.confirm("Are you sure you want to delete all data?");
        if (confirmDeleteAll) {
            try {
                await axios.delete(DeleteJoinUsUrl);
                setJoinUsData([]);
            } catch (error) {
                console.error('Error deleting all data:', error);
            }
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(joinusData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'JoinUs Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const excelUrl = URL.createObjectURL(excelData);

        const link = document.createElement('a');
        link.href = excelUrl;
        link.download = 'joinus_data.xlsx';
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
                    color="error"
                    onClick={handleDeleteAll}
                    style={{ marginLeft: '30px' }}
                >
                    Delete All Data
                </Button>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Salary Requirement</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {joinusData.map((joinus) => (
                            <TableRow key={joinus.id}>
                                <TableCell>{joinus.id}</TableCell>
                                <TableCell>{joinus.fullName}</TableCell>
                                <TableCell>{joinus.email}</TableCell>
                                <TableCell>{joinus.phoneNumber}</TableCell>
                                <TableCell>{joinus.position}</TableCell>
                                <TableCell>{joinus.salaryRequirement}Rs</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenResume(joinus.resumePath)}
                                    >
                                        <VisibilityIcon /> View Resume
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleViewDetails(joinus)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => handleDelete(joinus._id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
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
                    {selectedJoinUsDetails && (
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                            <p>Full Name: {selectedJoinUsDetails.fullName}</p>
                            <p>Email: {selectedJoinUsDetails.email}</p>
                            <p>phoneNumber: {selectedJoinUsDetails.phoneNumber}</p>
                            <p>position: {selectedJoinUsDetails.position}</p>
                            <p>salaryRequirement: {selectedJoinUsDetails.salaryRequirement} Rs</p>
                            <p>startDate: {selectedJoinUsDetails.startDate}</p>
                            <p>relocate: {selectedJoinUsDetails.relocate}</p>
                            <p>lastCompany: {selectedJoinUsDetails.lastCompany}</p>
                            <p>address: {selectedJoinUsDetails.address}</p>
                            <p>additionalInformation: {selectedJoinUsDetails.additionalInformation}</p>
                            <p>website: {selectedJoinUsDetails.website}</p>
                            {/* Add other fields here */}
                        </div>

                    )}
                </div>
            </Modal>
        </>
    );
};

export default AdminJoinus;

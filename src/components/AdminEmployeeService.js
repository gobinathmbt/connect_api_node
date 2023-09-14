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
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DeleteIcon from '@mui/icons-material/Delete';
import DatabaseContext from '../DataBaseConfig/Config';

const AdminEmployeeService = () => {
    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlEmployeeUrl = 'http://localhost:3002/MysqlServiceEmployeeData';
    const mongoEmployeeUrl = 'http://localhost:3002/ServiceEmployeeData';
    const EmployeeUrl = selectedDatabase === 'mysql' ? mysqlEmployeeUrl : mongoEmployeeUrl;

    const mysqlDeleteEmployeeUrl = 'http://localhost:3002/MysqlServiceEmployeeDataAll';
    const mongoDeleteEmployeeUrl = 'http://localhost:3002/ServiceEmployeeDataAll';
    const DeleteEmployeeUrl = selectedDatabase === 'mysql' ? mysqlDeleteEmployeeUrl : mongoDeleteEmployeeUrl;

    const [employeeData, setemployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(EmployeeUrl);
            const data = response.data;
            const EmployeesWithID = data.map((employee, index) => ({ ...employee, id: index + 1 }));
            setemployeeData(EmployeesWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`${EmployeeUrl}/${id}`);
                setemployeeData((prevEnquiries) => prevEnquiries.filter((employee) => employee._id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setOpenModal(false);
    };

    const handleDeleteAll = async () => {
        const confirmDeleteAll = window.confirm('Are you sure you want to delete all data?');
        if (confirmDeleteAll) {
            try {
                await axios.delete(DeleteEmployeeUrl);
                setemployeeData([]);
            } catch (error) {
                console.error('Error deleting all data:', error);
            }
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(employeeData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const excelUrl = URL.createObjectURL(excelData);

        const link = document.createElement('a');
        link.href = excelUrl;
        link.download = 'employee_data.xlsx';
        link.click();
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Button variant="outlined" color="secondary" onClick={handleExportToExcel}>
                    Export Data
                </Button>

                <Button variant="outlined" color="error" onClick={handleDeleteAll} style={{ marginLeft: '30px' }}>
                    Delete All Data
                </Button>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Company Name </TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>T&C</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeData.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.employeeId}</TableCell>
                                <TableCell>{employee.employeeName}</TableCell>
                                <TableCell>{employee.employeeEmail}</TableCell>
                                <TableCell>{employee.companyName}</TableCell>
                                <TableCell>{employee.phoneNumber}</TableCell>
                                <TableCell>
                                    {employee.subscribeToNewsletter ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                                </TableCell>
                                <TableCell>
                                    {employee.agreeToTerms ? (
                                        <CheckCircle style={{ color: 'green' }} />
                                    ) : (
                                        <Cancel style={{ color: 'red' }} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(employee)}>
                                        View All
                                    </Button>
                                    <Button variant="text" color="error" onClick={() => handleDelete(employee._id)}>
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
                    {selectedEmployee && (
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Employee Id:</TableCell>
                                        <TableCell>{selectedEmployee.employeeId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name:</TableCell>
                                        <TableCell>{selectedEmployee.employeeName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email:</TableCell>
                                        <TableCell>{selectedEmployee.employeeEmail}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Company Name:</TableCell>
                                        <TableCell>{selectedEmployee.companyName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Phone Number:</TableCell>
                                        <TableCell>{selectedEmployee.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Enquiry Details:</TableCell>
                                        <TableCell>{selectedEmployee.enquiryDetails}</TableCell>
                                    </TableRow>
                                    {/* Add more TableRows for other fields from selectedEmployee as needed */}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AdminEmployeeService;

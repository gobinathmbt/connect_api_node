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

const AdminStudentService = () => {
    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlStudentUrl = 'http://localhost:3002/MysqlServiceStudentData';
    const mongoStudentUrl = 'http://localhost:3002/ServiceStudentData';
    const StudentUrl = selectedDatabase === 'mysql' ? mysqlStudentUrl : mongoStudentUrl;

    const mysqlDeleteStudentUrl = 'http://localhost:3002/MysqlServiceStudentDataAll';
    const mongoDeleteStudentUrl = 'http://localhost:3002/ServiceStudentDataAll';
    const DeleteStudentUrl = selectedDatabase === 'mysql' ? mysqlDeleteStudentUrl : mongoDeleteStudentUrl;

    const [studentData, setstudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(StudentUrl);
            const data = response.data;
            const StudentsWithID = data.map((student, index) => ({ ...student, id: index + 1 }));
            setstudentData(StudentsWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (confirmDelete) {
            try {
                await axios.delete(`${StudentUrl}/${id}`);
                setstudentData((prevEnquiries) => prevEnquiries.filter((student) => student._id !== id));
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setOpenModal(false);
    };

    const handleDeleteAll = async () => {
        const confirmDeleteAll = window.confirm('Are you sure you want to delete all data?');
        if (confirmDeleteAll) {
            try {
                await axios.delete(DeleteStudentUrl);
                setstudentData([]);
            } catch (error) {
                console.error('Error deleting all data:', error);
            }
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(studentData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const excelUrl = URL.createObjectURL(excelData);

        const link = document.createElement('a');
        link.href = excelUrl;
        link.download = 'student_data.xlsx';
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
                            <TableCell>Student Name</TableCell>
                            <TableCell> Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Current Education </TableCell>
                            <TableCell>Work Experience</TableCell>
                            <TableCell>T&C</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.phoneNumber}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.currentEducationLevel}</TableCell>
                                <TableCell>{student.workExperience}</TableCell>
                                <TableCell>
                                    {student.subscribeToNewsletter ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                                </TableCell>
                                <TableCell>
                                    {student.agreeToTerms ? (
                                        <CheckCircle style={{ color: 'green' }} />
                                    ) : (
                                        <Cancel style={{ color: 'red' }} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(student)}>
                                        View All
                                    </Button>
                                    <Button variant="text" color="error" onClick={() => handleDelete(student._id)}>
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
                    {selectedStudent && (
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Student Name:</TableCell>
                                        <TableCell>{selectedStudent.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Phone Number:</TableCell>
                                        <TableCell>{selectedStudent.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email:</TableCell>
                                        <TableCell>{selectedStudent.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Education Level:</TableCell>
                                        <TableCell>{selectedStudent.currentEducationLevel}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Area Of Intrest:</TableCell>
                                        <TableCell>{selectedStudent.areaOfInterest}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Work Experience:</TableCell>
                                        <TableCell>{selectedStudent.workExperience}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Additional Informations:</TableCell>
                                        <TableCell>{selectedStudent.additionalInformation}</TableCell>
                                    </TableRow>
                                    {/* Add more TableRows for other fields from selectedStudent as needed */}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AdminStudentService;

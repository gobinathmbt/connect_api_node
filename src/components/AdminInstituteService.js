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

const AdminInstituteService = () => {
  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlInstituteUrl = 'http://localhost:3002/MysqlServiceInstituteData';
  const mongoInstituteUrl = 'http://localhost:3002/ServiceInstituteData';
  const InstituteUrl = selectedDatabase === 'mysql' ? mysqlInstituteUrl : mongoInstituteUrl;

  const mysqlDeleteInstituteUrl = 'http://localhost:3002/MysqlServiceInstituteDataAll';
  const mongoDeleteInstituteUrl = 'http://localhost:3002/ServiceInstituteDataAll';
  const DeleteInstituteUrl = selectedDatabase === 'mysql' ? mysqlDeleteInstituteUrl : mongoDeleteInstituteUrl;

  const [instituteData, setinstituteData] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchInstituteData = async () => {
    try {
      const response = await axios.get(InstituteUrl);
      const data = response.data;
      const InstitutesWithID = data.map((institute, index) => ({ ...institute, id: index + 1 }));
      setinstituteData(InstitutesWithID);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInstituteData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this institute?');
    if (confirmDelete) {
      try {
        await axios.delete(`${InstituteUrl}/${id}`);
        setinstituteData((prevEnquiries) => prevEnquiries.filter((institute) => institute._id !== id));
      } catch (error) {
        console.error('Error deleting institute:', error);
      }
    }
  };

  const handleOpenModal = (institute) => {
    setSelectedInstitute(institute);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedInstitute(null);
    setOpenModal(false);
  };

  const handleDeleteAll = async () => {
    const confirmDeleteAll = window.confirm('Are you sure you want to delete all data?');
    if (confirmDeleteAll) {
      try {
        await axios.delete(DeleteInstituteUrl);
        setinstituteData([]);
      } catch (error) {
        console.error('Error deleting all data:', error);
      }
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(instituteData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Institute Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const excelUrl = URL.createObjectURL(excelData);

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'institute_data.xlsx';
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
              <TableCell>Institute Name</TableCell>
              <TableCell> Person Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Newsletter</TableCell>
              <TableCell>T&C</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instituteData.map((institute) => (
              <TableRow key={institute.id}>
                <TableCell>{institute.id}</TableCell>
                <TableCell>{institute.institutionName}</TableCell>
                <TableCell>{institute.contactPerson}</TableCell>
                <TableCell>{institute.contactEmail}</TableCell>
                <TableCell>{institute.contactNumber}</TableCell>
                <TableCell>
                  {institute.subscribeToNewsletter ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                </TableCell>
                <TableCell>
                  {institute.agreeToTerms ? (
                    <CheckCircle style={{ color: 'green' }} />
                  ) : (
                    <Cancel style={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(institute)}>
                    View All
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDelete(institute._id)}>
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
        {selectedInstitute && (
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Institute Name:</TableCell>
                  <TableCell>{selectedInstitute.institutionName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Person Name:</TableCell>
                  <TableCell>{selectedInstitute.contactPerson}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email:</TableCell>
                  <TableCell>{selectedInstitute.contactEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Number:</TableCell>
                  <TableCell>{selectedInstitute.contactNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address:</TableCell>
                  <TableCell>{selectedInstitute.institutionAddress}</TableCell>
                </TableRow>

                <TableRow>
                      <TableCell>Service of Interest</TableCell>
                      <TableCell>
                        {selectedDatabase === 'mongodb'
                          ? selectedInstitute.services.join(', ')
                          : selectedInstitute.services}
                      </TableCell>
                    </TableRow>
                <TableRow>

                  <TableCell>Additional Requirments:</TableCell>
                  <TableCell>{selectedInstitute.additionalComments}</TableCell>
                </TableRow>
                {/* Add more TableRows for other fields from selectedInstitute as needed */}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Modal>
    </>
  );
};

export default AdminInstituteService;

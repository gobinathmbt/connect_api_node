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

const AdminCorporateService = () => {
  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlCorporateUrl = 'http://localhost:3002/MysqlServiceCorporateData';
  const mongoCorporateUrl = 'http://localhost:3002/ServiceCorporateData';
  const CorporateUrl = selectedDatabase === 'mysql' ? mysqlCorporateUrl : mongoCorporateUrl;

  const mysqlDeleteCorporateUrl = 'http://localhost:3002/MysqlServiceCorporateDataAll';
  const mongoDeleteCorporateUrl = 'http://localhost:3002/ServiceCorporateDataAll';
  const DeleteCorporateUrl = selectedDatabase === 'mysql' ? mysqlDeleteCorporateUrl : mongoDeleteCorporateUrl;

  const [corporateData, setcorporateData] = useState([]);
  const [selectedCorporate, setSelectedCorporate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchCorporateData = async () => {
    try {
      const response = await axios.get(CorporateUrl);
      const data = response.data;
      const CorporatesWithID = data.map((corporate, index) => ({ ...corporate, id: index + 1 }));
      setcorporateData(CorporatesWithID);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCorporateData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this corporate?');
    if (confirmDelete) {
      try {
        await axios.delete(`${CorporateUrl}/${id}`);
        setcorporateData((prevEnquiries) => prevEnquiries.filter((corporate) => corporate._id !== id));
      } catch (error) {
        console.error('Error deleting corporate:', error);
      }
    }
  };

  const handleOpenModal = (corporate) => {
    setSelectedCorporate(corporate);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCorporate(null);
    setOpenModal(false);
  };

  const handleDeleteAll = async () => {
    const confirmDeleteAll = window.confirm('Are you sure you want to delete all data?');
    if (confirmDeleteAll) {
      try {
        await axios.delete(DeleteCorporateUrl);
        setcorporateData([]);
      } catch (error) {
        console.error('Error deleting all data:', error);
      }
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(corporateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Corporate Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const excelUrl = URL.createObjectURL(excelData);

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'corporate_data.xlsx';
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
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Newsletter</TableCell>
              <TableCell>T&C</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {corporateData.map((corporate) => (
              <TableRow key={corporate.id}>
                <TableCell>{corporate.id}</TableCell>
                <TableCell>{corporate.companyName}</TableCell>
                <TableCell>{corporate.contactPersonName}</TableCell>
                <TableCell>{corporate.role}</TableCell>
                <TableCell>{corporate.email}</TableCell>
                <TableCell>
                  {corporate.subscribeToNewsletter ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                </TableCell>
                <TableCell>
                  {corporate.agreeToTerms ? (
                    <CheckCircle style={{ color: 'green' }} />
                  ) : (
                    <Cancel style={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(corporate)}>
                    View All
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDelete(corporate._id)}>
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
        {selectedCorporate && (
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Company Name:</TableCell>
                  <TableCell>{selectedCorporate.companyName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact Person Name:</TableCell>
                  <TableCell>{selectedCorporate.contactPersonName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role:</TableCell>
                  <TableCell>{selectedCorporate.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email:</TableCell>
                  <TableCell>{selectedCorporate.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number:</TableCell>
                  <TableCell>{selectedCorporate.phoneNumber}</TableCell>
                </TableRow>

                <TableRow>
                      <TableCell>Service of Interest</TableCell>
                      <TableCell>
                        {selectedDatabase === 'mongodb'
                          ? selectedCorporate.serviceOfInterest.join(', ')
                          : selectedCorporate.serviceOfInterest}
                      </TableCell>
                    </TableRow>
                <TableRow>

                  <TableCell>Additional Requirments:</TableCell>
                  <TableCell>{selectedCorporate.additionalComments}</TableCell>
                </TableRow>
                {/* Add more TableRows for other fields from selectedCorporate as needed */}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Modal>
    </>
  );
};

export default AdminCorporateService;

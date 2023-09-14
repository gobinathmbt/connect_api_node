import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const HomeBanner = () => {
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const fetchBannerUrl = async () => {
        try {
            const response = await axios.get('http://localhost:3002/SiteManagement');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBannerUrl();
    }, []);

    const validateImage = (file) => {
        if (!file) {
            return 'Image is required';
        }

        if (!['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(file.type)) {
            return 'Invalid file format';
        }

        const fileSize = file.size;
        if (fileSize < 5 * 1024 * 1024 || fileSize > 10 * 1024 * 1024) {
            return 'File size should be between 5MB and 10MB';
        }

        return null;
    };

    const handleAddImage = async () => {
        try {
            const validationError = validateImage(selectedFile);
            if (validationError) {
                console.error('Validation error:', validationError);
                return;
            }

            const formData = new FormData();
            formData.append('Image', selectedFile);

            await axios.post('http://localhost:3002/SiteManagement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchBannerUrl();
            setSelectedFile(null);
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditDialogOpen(true);
        setSelectedFile(null);
    };

    const handleEditDialogClose = () => {
        setEditingIndex(null);
        setEditDialogOpen(false);
        setSelectedFile(null);
    };

    const handleEditSubmit = async (values) => {
        try {
            const validationError = validateImage(selectedFile);
            if (validationError) {
                console.error('Validation error:', validationError);
                return;
            }

            const formData = new FormData();
            if (selectedFile) {
                formData.append('Image', selectedFile);
            }

            await axios.put(`http://localhost:3002/SiteManagement/${editingIndex}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchBannerUrl();
            setEditingIndex(null);
            setEditDialogOpen(false);
            setSelectedFile(null);
        } catch (error) {
            console.error('Error editing image:', error);
        }
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`http://localhost:3002/SiteManagement/${index}`);
            fetchBannerUrl();
            console.log(`Deleted item with index: ${index}`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Site Management
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '10px' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            handleFileChange(event);
                        }}
                    />
                    {selectedFile && (
                        <FormHelperText>
                            Selected File: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                        </FormHelperText>
                    )}
                    {selectedFile && (
                        <FormHelperText error>
                            {selectedFile.size >= 5 * 1024 * 1024 && selectedFile.size <= 10 * 1024 * 1024
                                ? 'File size is within the valid range'
                                : 'File size is not within the valid range (5MB - 10MB)'}
                        </FormHelperText>
                    )}
                </div>
                <div style={{ flex: '1' }}>
                    {editingIndex !== null ? (
                        <Button variant="contained" onClick={() => handleEdit(editingIndex)}>
                            Edit Image
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleAddImage}
                            disabled={!selectedFile || selectedFile.size < 5 * 1024 * 1024 || selectedFile.size > 10 * 1024 * 1024}
                        >
                            Add Image
                        </Button>
                    )}
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img src={`http://localhost:3002/${item}`} alt="Site" style={{ maxWidth: '100px' }} />
                                </TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Button variant="text" color="primary" onClick={() => handleEdit(index)}>
                                            <EditIcon />
                                        </Button>
                                        <Button variant="text" color="error" onClick={() => handleDelete(index)}>
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Image</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            newImageUrl: null,
                        }}
                        onSubmit={handleEditSubmit}
                    >
                        {({ isSubmitting, setFieldValue, errors, touched }) => (
                            <Form>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                    <div style={{ flex: '1', marginRight: '10px' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                handleFileChange(event);
                                                setFieldValue('newImageUrl', event.currentTarget.files[0]);
                                            }}
                                        />
                                        {touched.newImageUrl && errors.newImageUrl && (
                                            <FormHelperText error>{errors.newImageUrl}</FormHelperText>
                                        )}
                                        {selectedFile && (
                                            <FormHelperText>
                                                {selectedFile.size >= 5 * 1024 * 1024 && selectedFile.size <= 10 * 1024 * 1024
                                                    ? 'File size is within the valid range'
                                                    : 'File size is not within the valid range (5MB - 10MB)'}
                                            </FormHelperText>
                                        )}
                                    </div>
                                    <div style={{ flex: '1' }}>
                                        <Button variant="contained" type="submit" disabled={!selectedFile || isSubmitting}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                                <ErrorMessage name="newImageUrl" component="div" style={{ color: 'red' }} />
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default HomeBanner;

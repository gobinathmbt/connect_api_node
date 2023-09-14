import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import DatabaseContext from '../DataBaseConfig/Config';




const validationSchema = Yup.object().shape({
    categoryName: Yup.string()
        .required('category Name is required'),
});

const AdminCategory = () => {
    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlUrl = 'http://localhost:3002/MysqlCategory';
    const mongoUrl = 'http://localhost:3002/Category';
    const CategoryUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;


    const [category, setcategory] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);




    const handleAdd = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleEdit = (course) => {
        setEditingCategory(course);
    };

    const handleCancel = () => {
        setEditingCategory(null);
    };
    



    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(CategoryUrl);
            const data = response.data;
            // Automatically assign an ID to each course
            const categoryWithID = data.map((course, index) => ({ ...course, id: index + 1 }));
            setcategory(categoryWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchCategoryData();
    }, []);





    const handleSave = async (values) => {
        const newData = { ...values}
        console.log(newData)
        try {

            const response = await axios.put(`${CategoryUrl}/${editingCategory._id}`, newData, {
                headers: { 'Content-Type': 'multipart/form-data' }, 
            });
            const updatedCategory = response.data;
            setcategory((prevCategory) => prevCategory.map(course => course._id === updatedCategory._id ? updatedCategory : course));
            setEditingCategory(null);
        } catch (error) {
            console.error('Error updating course:', error);
            // Handle error here   
        }
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            try {
                await axios.delete(`${CategoryUrl}/${id}`);
                setcategory((prevCategory) => prevCategory.filter(course => course._id !== id));
            } catch (error) {
                console.error('Error deleting course:', error);

            }
        }
    };





    const handleAddDialogSave = async (values) => {

        try {
            const existingCategory = category;
            const maxId = existingCategory.reduce((max, course) => {
                const courseId = parseInt(course._id);
                return courseId > max ? courseId : max;
            }, 0);

            const newId = maxId + 1;
            const newData = { ...values, _id: newId };
            const response = await axios.post(CategoryUrl, newData);

            const newCategory = response.data;
            setcategory((prevCategory) =>
                [...prevCategory, newCategory]
            );
            setOpenAddDialog(false)
        } catch (error) {
            console.error('Error updating course:', error);
            // Handle error here
        }
    };






    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(category);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Category Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'category_data.xlsx';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>


            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Button variant="outlined" color="secondary" onClick={handleAdd}>
                    Add Category
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleExportToExcel} style={{ marginLeft: "10px" }}>
                    Export Data
                </Button>
            </div>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Render existing category */}
                        {category.map((course) => (
                            <TableRow key={course._id}>

                                {editingCategory && editingCategory._id === course._id ? (
                                    // Render the editing popup

                                    <Dialog open={true} onClose={handleCancel}>
                                        <DialogTitle style={{ textAlign: 'center' }}>
                                            Edit category
                                        </DialogTitle>
                                        <DialogContent>
                                            <Formik
                                                initialValues={{
                                                    categoryName: editingCategory.categoryName,
                                                }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSave}
                                            >
                                                {({ errors, touched }) => (
                                                    <Form>
                                                        <Field
                                                            name="categoryName"
                                                            as={TextField}
                                                            label="categoryName"
                                                            fullWidth
                                                            error={touched.categoryName && !!errors.categoryName}
                                                            helperText={touched.categoryName && errors.categoryName}
                                                            style={{ marginTop: '10px' }}
                                                        />

                                                        <DialogActions
                                                            style={{ display: 'block', textAlign: 'center' }}
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                type="submit"
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={handleCancel}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </DialogActions>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    // Render the view mode
                                    <>
                                        <TableCell>{course.id}</TableCell>
                                        <TableCell>{course.categoryName}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex' }}>
                                                <Button
                                                    variant="text"
                                                    color="primary"
                                                    onClick={() => handleEdit(course)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    variant="text"
                                                    color="error"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                    <DialogTitle style={{ textAlign: 'center' }}>Add Category</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{
                                categoryName: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddDialogSave}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="categoryName"
                                        as={TextField}
                                        label="categoryName"
                                        fullWidth
                                        error={touched.categoryName && !!errors.categoryName}
                                        helperText={touched.categoryName && errors.categoryName}
                                        style={{ marginTop: '10px' }}
                                    />


                                    <DialogActions style={{ display: 'block', textAlign: 'center' }}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleCloseAddDialog}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </TableContainer>
        </>
    );
};

export default AdminCategory;

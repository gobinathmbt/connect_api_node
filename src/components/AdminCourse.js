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
    Grid,
    InputLabel
} from '@mui/material';
import { MenuItem } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import DatabaseContext from '../DataBaseConfig/Config';


const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]+$/;


const validationSchema = Yup.object().shape({
    title: Yup.string()
        .matches(characterRegex, 'Only characters are allowed')
        .required('title is required'),
    category: Yup.string().required('Category is required'),
    rating: Yup.number().required('Rating is required'),
    level: Yup.string().required('Level is required'),
    shortDesc: Yup.string()
        .required('Short Description is required')
        .min(130, 'Short Description should be min 130 characters')
        .max(160, 'Short Description should not exceed 160 characters'),

    longDesc: Yup.string().required('Long Description is required')
        .min(800, 'Long Description should be min 800 characters')
        .max(1000, 'Long Description should not exceed  1000 characters'),
    duration: Yup.string()
        .matches(numberRegex, 'Only numbers are allowed')
        .required('Duration is required'),
    iconLibrary: Yup.string().required('Icon Library is required'),
    iconName: Yup.string().required('Icon Name is required'),
    courseImage: Yup.mixed()
        .required('courseImage is required')
        .test('fileFormat', 'Only image files are allowed', (value) => {
            return value && value.type && value.type.startsWith('image/');
        }),

    syllabus: Yup.mixed()
        .required('syllabus is required')
        .test('fileFormat', 'Only PDF files are allowed', (value) => {
            return value && value.type === 'application/pdf';
        }),
});

const AdminCourse = () => {
    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlUrl = 'http://localhost:3002/MysqlCourses';
    const mongoUrl = 'http://localhost:3002/Courses';
    const CoursesUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;


    const mysqlCategoryUrl = 'http://localhost:3002/MysqlCategory';
    const mongoCategoryUrl = 'http://localhost:3002/Category';
    const CategoryUrl = selectedDatabase === 'mysql' ? mysqlCategoryUrl : mongoCategoryUrl;


    const [courses, setcourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);



    const handleAdd = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
    };

    const handleCancel = () => {
        setEditingCourse(null);
    };




    const fetchCourseData = async () => {
        try {
            const response = await axios.get(CoursesUrl);
            const data = response.data;
            // Automatically assign an ID to each course
            const coursesWithID = data.map((course, index) => ({ ...course, id: index + 1 }));
            setcourses(coursesWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(CategoryUrl);
            const data = response.data;
            // Automatically assign an ID to each course
            const coursesWithID = data.map((course, index) => ({ ...course, id: index + 1 }));
            setCategories(coursesWithID);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchCourseData();
        fetchCategoryData();
    }, []);





    const handleSave = async (values) => {
        console.log(values)
        try {

            const response = await axios.put(`${CoursesUrl}/${editingCourse._id}`, values, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const updatedCourse = response.data;
            setcourses((prevCourses) => prevCourses.map(course => course._id === updatedCourse._id ? updatedCourse : course));
            setEditingCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
            // Handle error here   
        }
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            try {
                await axios.delete(`${CoursesUrl}/${id}`);
                setcourses((prevCourses) => prevCourses.filter(course => course._id !== id));
            } catch (error) {
                console.error('Error deleting course:', error);

            }
        }
    };





    const handleAddDialogSave = async (values) => {

        try {
            const existingCourses = courses;
            const maxId = existingCourses.reduce((max, course) => {
                const courseId = parseInt(course._id);
                return courseId > max ? courseId : max;
            }, 0);

            const newId = maxId + 1;
            const newData = { ...values, _id: newId };
            console.log(newData)
            const response = await axios.post(CoursesUrl, newData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newCourse = response.data;
            setcourses((prevCourses) =>
                [...prevCourses, newCourse]
            );
            setOpenAddDialog(false)
        } catch (error) {
            console.error('Error updating course:', error);
            // Handle error here
        }
    };






    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(courses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Courses Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'courses_data.xlsx';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>


            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Button variant="outlined" color="secondary" onClick={handleAdd}>
                    Add Course
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
                            <TableCell>Category</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Render existing courses */}
                        {courses.map((course) => (
                            <TableRow key={course._id}>

                                {editingCourse && editingCourse._id === course._id ? (
                                    // Render the editing popup

                                    <Dialog open={true} onClose={handleCancel}>
                                        <DialogTitle style={{ textAlign: 'center' }}>
                                            Edit Course
                                        </DialogTitle>

                                        <DialogContent>
                                            {/*Text fields for editing */}
                                            <Formik
                                                initialValues={{
                                                    title: editingCourse.title,
                                                    category: editingCourse.category,
                                                    rating: editingCourse.rating,
                                                    level: editingCourse.level,
                                                    shortDesc: editingCourse.shortDesc,
                                                    longDesc: editingCourse.longDesc,
                                                    longDesc: editingCourse.longDesc,
                                                    duration: editingCourse.duration,
                                                    iconLibrary: editingCourse.iconLibrary,
                                                    iconName: editingCourse.iconName,
                                                    courseImage: '',
                                                    syllabus: ''

                                                }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSave}
                                            >
                                                {({ errors, touched, setFieldValue }) => (
                                                    <Form>
                                                        <Field
                                                            name="title"
                                                            as={TextField}
                                                            label="Title"
                                                            fullWidth
                                                            error={touched.title && !!errors.title}
                                                            helperText={touched.title && errors.title}
                                                            style={{ marginTop: '10px' }}
                                                        />

                                                        <Field
                                                            name="category"
                                                            as={TextField}
                                                            label="Category"
                                                            fullWidth
                                                            select
                                                            error={touched.category && !!errors.category}
                                                            helperText={touched.category && errors.category}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            {categories.map((category) => (
                                                                <MenuItem key={category._id} value={category.categoryName}>
                                                                    {category.categoryName}
                                                                </MenuItem>
                                                            ))}
                                                        </Field>

                                                        <Field
                                                            name="rating"
                                                            as={TextField}
                                                            label="Star Rating"
                                                            fullWidth
                                                            select
                                                            error={touched.rating && !!errors.rating}
                                                            helperText={touched.rating && errors.rating}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            <MenuItem value="1">1</MenuItem>
                                                            <MenuItem value="2">2</MenuItem>
                                                            <MenuItem value="3">3</MenuItem>
                                                            <MenuItem value="4">4</MenuItem>
                                                            <MenuItem value="5">5</MenuItem>
                                                        </Field>

                                                        <Field
                                                            name="level"
                                                            as={TextField}
                                                            label="Level"
                                                            fullWidth
                                                            select
                                                            error={touched.level && !!errors.level}
                                                            helperText={touched.level && errors.level}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            <MenuItem value="Beginner">Beginner</MenuItem>
                                                            <MenuItem value="Intermediate">
                                                                Intermediate
                                                            </MenuItem>
                                                            <MenuItem value="Advanced">Advanced</MenuItem>
                                                        </Field>

                                                        <Field
                                                            name="shortDesc"
                                                            as={TextField}
                                                            label="Short Description"
                                                            fullWidth
                                                            error={touched.shortDesc && !!errors.shortDesc}
                                                            helperText={touched.shortDesc && errors.shortDesc}
                                                            style={{ marginTop: '10px' }}
                                                            multiline
                                                            rows={3}
                                                        />

                                                        <Field
                                                            name="longDesc"
                                                            as={TextField}
                                                            label="Long Description"
                                                            fullWidth
                                                            error={touched.longDesc && !!errors.longDesc}
                                                            helperText={touched.longDesc && errors.longDesc}
                                                            style={{ marginTop: '10px' }}
                                                            multiline
                                                            rows={4}
                                                        />

                                                        <Field
                                                            name="duration"
                                                            as={TextField}
                                                            label="Duration(Hrs)"
                                                            fullWidth
                                                            error={touched.duration && !!errors.duration}
                                                            helperText={touched.duration && errors.duration}
                                                            style={{ marginTop: '10px' }}

                                                        />
                                                        <Field
                                                            name="iconLibrary"
                                                            as={TextField}
                                                            label="Icon Library"
                                                            fullWidth
                                                            select
                                                            error={touched.iconLibrary && !!errors.iconLibrary}
                                                            helperText={touched.iconLibrary && errors.iconLibrary}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            <MenuItem value="fa">FontAwesome</MenuItem>
                                                            <MenuItem value="tb">Tabler Icons</MenuItem>
                                                            <MenuItem value="ri">Remix Icons</MenuItem>
                                                            <MenuItem value="bs">BootStrap Icons</MenuItem>
                                                            <MenuItem value="si">Simple Icons</MenuItem>
                                                            <MenuItem value="bi">Box Icons</MenuItem>
                                                        </Field>


                                                        <Field
                                                            name="iconName"
                                                            as={TextField}
                                                            label="Icon Name"
                                                            fullWidth
                                                            error={touched.iconName && !!errors.iconName}
                                                            helperText={touched.iconName && errors.iconName}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                        </Field>



                                                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                                                            <TextField
                                                                id="courseImage"
                                                                name="courseImage"
                                                                type="file"
                                                                label="Course Certification Image"
                                                                onChange={(event) => {
                                                                    const selectedImage = event.currentTarget.files[0];
                                                                    setFieldValue('courseImage', selectedImage);

                                                                    // Display the selected image preview
                                                                    if (selectedImage) {
                                                                        const reader = new FileReader();
                                                                        reader.onload = (e) => {
                                                                            const previewImage = document.getElementById('imagePreview');
                                                                            if (previewImage) {
                                                                                previewImage.src = e.target.result;
                                                                            }
                                                                        };
                                                                        reader.readAsDataURL(selectedImage);
                                                                    }
                                                                }}
                                                                error={touched.courseImage && !!errors.courseImage}
                                                                helperText={touched.courseImage && errors.courseImage}
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>

                                                        <div style={{ display: "flex", marginTop: "20px", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <div>
                                                                <h6>Image Preview</h6>
                                                                <img id="imagePreview" src="" alt="Course Certification" style={{ height: "100px" }} />
                                                            </div>

                                                            <div>
                                                                <h6>Current Image</h6>
                                                                <img
                                                                    src={`http://localhost:3002/${editingCourse.imagePath}`}
                                                                    alt={course.title}
                                                                    style={{ height: "100px" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                                                            <TextField
                                                                id="syllabus"
                                                                name="syllabus"
                                                                type="file"
                                                                label="Syllabus"
                                                                inputProps={{ accept: '.pdf' }}
                                                                onChange={(event) => {
                                                                    setFieldValue('syllabus', event.currentTarget.files[0]);
                                                                }}
                                                                error={touched.syllabus && !!errors.syllabus}
                                                                helperText={touched.syllabus && errors.syllabus}
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>

                                                        <div style={{ display: "flex", marginTop: "20px", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <h6>Current Syllabus</h6>
                                                            {editingCourse.syllabusPath && (
                                                                <a href={`http://localhost:3002/${editingCourse.syllabusPath}`} target="_blank" rel="noopener noreferrer">
                                                                    View Syllabus
                                                                </a>
                                                            )}
                                                        </div>



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
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>{course.rating}</TableCell>
                                        <TableCell>{course.level}</TableCell>
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
                    <DialogTitle style={{ textAlign: 'center' }}>Add Course</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{
                                title: '',
                                category: '',
                                rating: '',
                                level: '',
                                shortDesc: '',
                                longDesc: '',
                                duration: '',
                                iconLibrary: '',
                                iconName: '',
                                courseImage: '',
                                syllabus: '',

                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddDialogSave}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    <Field
                                        name="title"
                                        as={TextField}
                                        label="Title"
                                        fullWidth
                                        error={touched.title && !!errors.title}
                                        helperText={touched.title && errors.title}
                                        style={{ marginTop: '10px' }}
                                    />

                                    <Field
                                        name="category"
                                        as={TextField}
                                        label="Category"
                                        fullWidth
                                        select
                                        error={touched.category && !!errors.category}
                                        helperText={touched.category && errors.category}
                                        style={{ marginTop: '10px' }}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category._id} value={category.categoryName}>
                                                {category.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Field>

                                    <Field
                                        name="rating"
                                        as={TextField}
                                        label="Rating"
                                        fullWidth
                                        select
                                        error={touched.rating && !!errors.rating}
                                        helperText={touched.rating && errors.rating}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                    </Field>

                                    <Field
                                        name="level"
                                        as={TextField}
                                        label="Level"
                                        fullWidth
                                        select
                                        error={touched.level && !!errors.level}
                                        helperText={touched.level && errors.level}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <MenuItem value="Beginner">Beginner</MenuItem>
                                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                                        <MenuItem value="Advanced">Advanced</MenuItem>
                                    </Field>

                                    <Field
                                        name="shortDesc"
                                        as={TextField}
                                        label="Short Description"
                                        fullWidth
                                        error={touched.shortDesc && !!errors.shortDesc}
                                        helperText={touched.shortDesc && errors.shortDesc}
                                        style={{ marginTop: '10px' }}
                                        multiline
                                        rows={3}
                                    />

                                    <Field
                                        name="longDesc"
                                        as={TextField}
                                        label="Long Description"
                                        fullWidth
                                        error={touched.longDesc && !!errors.longDesc}
                                        helperText={touched.longDesc && errors.longDesc}
                                        style={{ marginTop: '10px' }}
                                        multiline
                                        rows={4}
                                    />


                                    <Field
                                        name="duration"
                                        as={TextField}
                                        label="Duration(Hrs)"
                                        fullWidth
                                        error={touched.duration && !!errors.duration}
                                        helperText={touched.duration && errors.duration}
                                        style={{ marginTop: '10px' }}

                                    />


                                    <Field
                                        name="iconLibrary"
                                        as={TextField}
                                        label="Icon Library"
                                        fullWidth
                                        select
                                        error={touched.iconLibrary && !!errors.iconLibrary}
                                        helperText={touched.iconLibrary && errors.iconLibrary}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <MenuItem value="fa">FontAwesome</MenuItem>
                                        <MenuItem value="tb">Tabler Icons</MenuItem>
                                        <MenuItem value="ri">Remix Icons</MenuItem>
                                        <MenuItem value="bs">BootStrap Icons</MenuItem>
                                        <MenuItem value="si">Simple Icons</MenuItem>
                                        <MenuItem value="bi">Box Icons</MenuItem>
                                    </Field>


                                    <Field
                                        name="iconName"
                                        as={TextField}
                                        label="Icon Name"
                                        fullWidth
                                        error={touched.iconName && !!errors.iconName}
                                        helperText={touched.iconName && errors.iconName}
                                        style={{ marginTop: '10px' }}
                                    >
                                    </Field>


                                    <Grid item xs={12} style={{ marginTop: '10px' }}>
                                        <TextField
                                            id="courseImage"
                                            name="courseImage"
                                            type="file"
                                            label="Course Certification Image"
                                            onChange={(event) => {
                                                setFieldValue('courseImage', event.currentTarget.files[0]);
                                            }}
                                            error={touched.courseImage && !!errors.courseImage}
                                            helperText={touched.courseImage && errors.courseImage}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: '10px' }}>
                                        <TextField
                                            id="syllabus"
                                            name="syllabus"
                                            type="file"
                                            label="Syllabus"
                                            inputProps={{ accept: '.pdf' }}
                                            onChange={(event) => {
                                                setFieldValue('syllabus', event.currentTarget.files[0]);
                                            }}
                                            error={touched.syllabus && !!errors.syllabus}
                                            helperText={touched.syllabus && errors.syllabus}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


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

export default AdminCourse;

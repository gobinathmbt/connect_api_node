import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApplyNow from '../Reusablecomponents/ApplyForm';
import { Modal, Box, TextField } from '@mui/material';
import { Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import DatabaseContext from '../DataBaseConfig/Config';
import DynamicIcon from './DynamicIcon';








const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]+$/;

const validationSchema = Yup.object({
    fullName: Yup.string()
        .matches(characterRegex, 'Only characters are allowed')
        .required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string()
        .matches(numberRegex, 'Only numbers are allowed')
        .matches(/^\d{10}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
    course: Yup.string().required('Course is required'),
    enquiry: Yup.string().required('Enquiry is required'),

});


const initialValues = {
    fullName: '',
    email: '',
    mobileNumber: '',
    course: '',
    enquiry: '',
};
const CourseSectionUI = () => {

    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlUrl = 'http://localhost:3002/MysqlCourses';
    const mongoUrl = 'http://localhost:3002/Courses';
    const CoursesUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;



    const mysqlEnquiryUrl = 'http://localhost:3002/MysqlEnquiry';
    const mongoEnquiryUrl = 'http://localhost:3002/Enquiry';
    const EnquiryUrl = selectedDatabase === 'mysql' ? mysqlEnquiryUrl : mongoEnquiryUrl;



    const mysqlCategoryUrl = 'http://localhost:3002/MysqlCategory';
    const mongoCategoryUrl = 'http://localhost:3002/Category';
    const CategoryUrl = selectedDatabase === 'mysql' ? mysqlCategoryUrl : mongoCategoryUrl;


    const [categories, setCategories] = useState([]);
    const [courses, setcourses] = useState([]);
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [openModal, setOpenModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseOptions, setCourseOptions] = useState([]);




    const cardStyle = {
        width: '330px',
        userSelect: 'none',
        height: 'fit-content',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        zIndex: '1',
        overflow: 'hidden',
        marginTop: '30px'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    };

    const h1Style = {
        fontSize: '20px',
        color: '#0a253f',
    };

    const pStyle = {
        fontSize: '12px',
        padding: '10px',
        color: '#4a4970',
    };

    const contentImageStyle = {
        padding: '7px 10px',
        fontSize: '40px',
        borderRadius: '50px',
        color: '#ffffff',
        backgroundColor: 'black',
    };

    const footerStyle = {
        padding: '10px 20px',
        alignItems: 'center',
        backgroundColor: '#F0F4F7',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '3px solid #025aa5',
    };

    const handleFilterChange = (event, category) => {
        setFilter(category);
    };

    const getRatingColor = (rating) => {
        if (rating >= 4.0) {
            return 'green';
        } else if (rating >= 3.0) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.category === filter);

    const handleOpenModal = (courseId) => {
        const selectedCourse = courses.find(course => course._id === courseId); // Modify this based on your course data structure
        if (selectedCourse) {
            formik.setValues({
                ...formik.values,
                course: selectedCourse.title // Assuming the course title is used for selection
            });
        }
        setOpenModal(true);
        setSelectedCourseId(courseId);
    };
    const handleCloseModal = () => {
        formik.resetForm();
        setOpenModal(false);
    };



    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            try {
                await formik.validateForm(); // Validate the form using Formik
                if (formik.isValid) {
                    navigate(`/course/${selectedCourseId}`);
                    window.scrollTo(0, 0);
                    const newEnquiryData = { ...formik.values };
                    console.log(newEnquiryData)
                    const response = await axios.post(EnquiryUrl, newEnquiryData); // Make the POST request to the server
                    const createdEnquiry = response.data;
                    console.log(createdEnquiry);
                    handleCloseModal();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    });



    // Function to fetch data from the server
    const fetchCourseData = async () => {
        try {
            const response = await axios.get(CoursesUrl);
            const data = response.data;
            setcourses(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(CategoryUrl);
            const data = response.data;
            // Automatically assign an ID to each category
            const categoriesWithID = data.map((category, index) => ({ ...category, id: index + 1 }));
            setCategories(categoriesWithID);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    useEffect(() => {
        fetchCourseData(); // Fetch data from the server when the component mounts
        fetchCategoryData();
    }, []);




    useEffect(() => {
        // Fetch course titles from JSON file
        const fetchCourseTitles = async () => {
            try {
                const response = await axios.get(CoursesUrl);
                const courses = response.data;
                setCourseOptions(courses.map((course) => course.title));
            } catch (error) {
                console.error('Error fetching course titles:', error);
            }
        };

        fetchCourseTitles();
    }, []);





    return (
        <section className="course-section spad pb-0" >
            <div className="course-warp">
                <div  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Tabs
                        value={filter}
                        onChange={handleFilterChange}
                        className="course-filter controls"
                        variant="scrollable"  // This enables horizontal scrolling
                        scrollButtons="auto"  // This will show scroll buttons when necessary
                        centered

                    >
                        <Tab
                            value="all"
                            label="All"
                            style={{ fontSize: "20px", textTransform: "capitalize", color: '#9c27b0' }}
                        />
                        {categories.map(category => (
                            <Tab
                                key={category.id}
                                value={category.categoryName}
                                label={category.categoryName}
                                style={{ fontSize: "20px", textTransform: "capitalize", color: '#9c27b0' }}
                            />
                        ))}
                    </Tabs>
                </div>

                <div className="row " style={{ marginLeft: '40px', marginRight: '50px' }}>
                    {filteredCourses.map(course => (
                        <div className={`mix col-lg-3 col-md-4 col-sm-6 `} key={course.id}>
                            <div className={` ${course.category}`}>
                                <div className="card" style={cardStyle}>
                                    <div className="card_header">
                                        <div style={headerStyle}>
                                            <div className="content">
                                                <h1 style={h1Style}>{course.level} Guide to {course.title}</h1>
                                            </div>

                                            <div className="content-image">
                                                <DynamicIcon library={course.iconLibrary} name={course.iconName} size={40} color="#a200be" />
                                            </div>

                                        </div>
                                        <p style={pStyle}>{course.shortDesc}</p>
                                    </div>
                                    <div className="card_info" style={{ marginTop: '-9px', fontSize: '12px', color: '#8a8892' }}>
                                        <div>
                                            <span>
                                                <Rating
                                                    name={`rating-${course.id}`}
                                                    value={course.rating}
                                                    precision={0.5}
                                                    readOnly
                                                    style={{ color: getRatingColor(course.rating) }}
                                                />
                                            </span>
                                        </div>
                                        <div>
                                            <span style={{ marginLeft: '5px' }}>{course.rating} Rating</span>
                                        </div>
                                    </div>
                                    <div className="card_footer" style={footerStyle}>
                                        <Button
                                            key={course.id}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleOpenModal(course._id)}
                                        >
                                            Read More
                                        </Button>
                                        <ApplyNow btnname="apply now" btnvar="outlined" btncolor="secondary" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className="modal-container" style={{ width: '40%' }}>
                    <form style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="fullName"
                                    name="fullName"
                                    label="Full Name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    label="Mobile Number"
                                    value={formik.values.mobileNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="course"
                                    name="course"
                                    label="Course"
                                    select
                                    value={formik.values.course}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.course && Boolean(formik.errors.course)}
                                    helperText={formik.touched.course && formik.errors.course}
                                    fullWidth
                                >
                                    <MenuItem value="">Select Course</MenuItem>
                                    {courseOptions.map((course, index) => (
                                        <MenuItem key={index} value={course}>
                                            {course}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="enquiry"
                                    name="enquiry"
                                    label="Enquiry"
                                    multiline
                                    rows={4}
                                    value={formik.values.enquiry}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.enquiry && Boolean(formik.errors.enquiry)}
                                    helperText={formik.touched.enquiry && formik.errors.enquiry}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
        </section>
    );
};

export default CourseSectionUI;




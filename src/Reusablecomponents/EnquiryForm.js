import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, MenuItem, Modal, Snackbar } from '@mui/material';
import { EnquiryFormDataContext } from '../components/Context';
import axios from 'axios';
import DatabaseContext from '../DataBaseConfig/Config';

// Regular expression patterns
const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[6-9]\d{9}$/;

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{3,}\.(co|com|in|com\.in|co\.in|org|net|edu|gov|mil|biz|info|name|museum|coop|aero|[A-Za-z]{2,4})$/;

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(characterRegex, 'Only characters are allowed')
    .required('Full Name is required'),
    email: Yup.string()
    .matches(emailRegex, 'Invalid email')
    .required('Email is required'),
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

const EnquiryForm = ({ btnname, btnvar, btncolor }) => {



  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlUrl = 'http://localhost:3002/MysqlCourses';
  const mongoUrl = 'http://localhost:3002/Courses';
  const CoursesUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;

  const mysqlEnquiryUrl = 'http://localhost:3002/MysqlEnquiry';
  const mongoEnquiryUrl = 'http://localhost:3002/Enquiry';
  const EnquiryUrl = selectedDatabase === 'mysql' ? mysqlEnquiryUrl : mongoEnquiryUrl;




  const [openModal, setOpenModal] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar
  const { isFormSubmitted, updateEnquiryFormData } = useContext(EnquiryFormDataContext);

  const handleOpenModal = () => {
    if (!isFormSubmitted) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    formik.resetForm(); // Reset the form values and errors
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };






  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const newEnquiryData = { ...values };
        console.log(newEnquiryData);
        const response = await axios.post(EnquiryUrl, newEnquiryData);
        const createdEnquiry = response.data;
        console.log('Newly created Enquiry:', createdEnquiry);
        updateEnquiryFormData(newEnquiryData);
        handleCloseModal();
        setShowSnackbar(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });





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
    <>
      <Button
        variant={btnvar}
        color={btncolor}
        onClick={handleOpenModal}
        style={{ fontWeight: '500' }}
        
      >
        {btnname}
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="modal-container" style={{ width: '40%' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
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
                <Button type="button" variant="contained" color="primary" onClick={formik.handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={7000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message="Thanks for the enquiry! We will get back to you soon."
      />
    </>
  );
};

export default EnquiryForm;

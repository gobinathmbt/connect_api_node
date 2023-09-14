import React, { useState, useContext,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, MenuItem, Modal ,Snackbar} from '@mui/material';

import DatabaseContext from '../DataBaseConfig/Config';
import axios from 'axios';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{3,}\.(co|com|in|com\.in|co\.in|org|net|edu|gov|mil|biz|info|name|museum|coop|aero|[A-Za-z]{2,4})$/;
const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[6-9]\d{9}$/;

const currentYear = new Date().getFullYear();
const startYear = 2000;
const yearRegex = new RegExp(`^(${startYear}|${Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).join('|')})$`);

const decimalRegex = /^(?:100(?:\.0{1,2})?|[1-9]?\d(?:\.\d{1,2})?)$/;

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
  degree: Yup.string().required('Degree is required'),
  specialization: Yup.string().required('Specialization is required'),
  yearOfPassing: Yup.string()
    .required('Year of Passing is required')
    .matches(yearRegex, 'Only year betwwen 2000 - current year'),
  percentageOfMarks: Yup.string()
    .required('Percentage of Marks is required')
    .matches(decimalRegex, 'Only decimal values between 1 and 100 are allowed'),
  address: Yup.string().required('Address is required'),
});


const initialValues = {
  fullName: '',
  email: '',
  mobileNumber: '',
  degree: '',
  specialization: '',
  yearOfPassing: '',
  percentageOfMarks: '',
  address: '',
};

const ApplyNow = ({ btnname, btnvar, btncolor }) => {
  const [openModal, setOpenModal] = useState(false);

  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlApplyUrl = 'http://localhost:3002/MysqlApplyNow';
  const mongoApplyUrl = 'http://localhost:3002/ApplyNow';
  const ApplyUrl = selectedDatabase === 'mysql' ? mysqlApplyUrl : mongoApplyUrl;





  const [openModalAlreadyApplied, setOpenModalAlreadyApplied] = useState(false);
  const [Email,SetEmail] = useState(false);
  const [Num,SetNum] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar
  const handleCloseModalAlreadyApplied = () => {
    setOpenModalAlreadyApplied(false);
  };


  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setOpenModal(false);
  };


  

  

  const fetchData = async () => {
    try {
      const response = await axios.get(ApplyUrl);
      const data = response.data;
      console.log(data);
      SetEmail(data.map((item) => item.email));
      SetNum(data.map((item) => item.mobileNumber));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    if (openModal) {
      fetchData();
    }
  }, [openModal]);
  




  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
    const FindEmail =Email;
    const FindNumber = Num;
    // console.log(FindEmail)
    // console.log(FindNumber)
        if (FindEmail.includes(values.email) || FindNumber.includes(values.mobileNumber)){
          setOpenModalAlreadyApplied(true);
        }

        else {
          const newApplyData = { ...values };
          const submitResponse = await axios.post(ApplyUrl, newApplyData);
          handleCloseModal();
          setShowSnackbar(true);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });


  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Button variant={btnvar} color={btncolor} onClick={handleOpenModal} style={{ fontWeight: '500' }}>
        {btnname}
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          className="modal-container"
          style={{
            width: '40%',
            marginTop: "60px",
            maxHeight: '70vh', // Set the maximum height of the modal container
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
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
              <Grid item xs={12}>
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
                  id="degree"
                  name="degree"
                  label="Degree"
                  select
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.degree && Boolean(formik.errors.degree)}
                  helperText={formik.touched.degree && formik.errors.degree}
                  fullWidth
                >
                  <MenuItem value="">Select Degree</MenuItem>
                  <MenuItem value="ug">UG</MenuItem>
                  <MenuItem value="pg">PG</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="specialization"
                  name="specialization"
                  label="Specialization"
                  value={formik.values.specialization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                  helperText={formik.touched.specialization && formik.errors.specialization}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="yearOfPassing"
                  name="yearOfPassing"
                  label="Year of Passing"
                  value={formik.values.yearOfPassing}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.yearOfPassing && Boolean(formik.errors.yearOfPassing)}
                  helperText={formik.touched.yearOfPassing && formik.errors.yearOfPassing}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="percentageOfMarks"
                  name="percentageOfMarks"
                  label="Percentage of Marks"
                  value={formik.values.percentageOfMarks}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.percentageOfMarks && Boolean(formik.errors.percentageOfMarks)}
                  helperText={formik.touched.percentageOfMarks && formik.errors.percentageOfMarks}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
      <Modal
        open={openModalAlreadyApplied}
        onClose={handleCloseModalAlreadyApplied}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          className="modal-container"
          style={{
            width: '40%',
            marginTop: '60px',
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
            <h2>Already Applied</h2>
            <p>The provided email ID  or Mobile Number has already been used to apply. Please try again with a different email ID  And Mobile number</p>
            <Button onClick={handleCloseModalAlreadyApplied} variant="contained" color="primary">
              OK
            </Button>
          </div>
        </div>
      </Modal>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={7000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message="Thanks for the Apply! We will get back to you soon."
      />

    </>
  );
};

export default ApplyNow;

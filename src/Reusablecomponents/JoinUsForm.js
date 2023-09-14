import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, MenuItem, Modal, Snackbar } from '@mui/material';
import axios from 'axios';
import DatabaseContext from '../DataBaseConfig/Config';
import { addDays, format } from 'date-fns';
const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]+$/;

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(characterRegex, 'Only characters are allowed')
    .required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(numberRegex, 'Only numbers are allowed')
    .matches(/^\d{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  position: Yup.string().required('Position is required'),
  salaryRequirement: Yup.string().required('Salary requirement is required'),
  startDate: Yup.date().required('Start date is required'),
  relocate: Yup.string().required('Relocate is required'),
  lastCompany: Yup.string().required('Last company is required'),
  address: Yup.string().required('Address is required'),
  additionalInformation: Yup.string().required('Additional information is required'),
  resume: Yup.mixed().required('Resume is required'),
  website: Yup.string().url('Invalid URL').optional(),
});

const initialValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  salaryRequirement: '',
  startDate: '',
  relocate: '',
  lastCompany: '',
  address: '',
  additionalInformation: '',
  resume: '',
  website: '',
};

const EnquiryForm = ({ btnname, btnvar, btncolor }) => {


  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlJoinUsUrl = 'http://localhost:3002/MysqlJoinUsData';
  const mongoJoinUsUrl = 'http://localhost:3002/JoinUsData';
  const JoinUsUrl = selectedDatabase === 'mysql' ? mysqlJoinUsUrl : mongoJoinUsUrl;



  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setOpenModal(false);
  };

  const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };




  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await axios.post(JoinUsUrl, values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setShowSnackbar(true);
        handleCloseModal();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [resumeError, setResumeError] = useState('');

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    if (files[0]) {
      const fileType = files[0].type;

      if (fileType !== 'application/pdf') {
        setResumeError('Invalid file type. Only PDF files are allowed.');
      } else if (files[0].size > 15 * 1024 * 1024) {
        setResumeError('File size should be less than 15MB.');
      } else {
        formik.setFieldValue(name, files[0]);
        setResumeError('');
      }
    }
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
            marginTop: '60px',
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
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
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                  id="position"
                  name="position"
                  label="Position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.position && Boolean(formik.errors.position)}
                  helperText={formik.touched.position && formik.errors.position}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="salaryRequirement"
                  name="salaryRequirement"
                  label="Salary Requirement"
                  value={formik.values.salaryRequirement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.salaryRequirement && Boolean(formik.errors.salaryRequirement)}
                  helperText={formik.touched.salaryRequirement && formik.errors.salaryRequirement}
                  fullWidth
                />
              </Grid>



              <Grid item xs={6}>
                <TextField
                  id="startDate"
                  name="startDate"
                  type="date"
                  label="Start Date" // Add the label
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: format(addDays(new Date(), 1), 'yyyy-MM-dd'), // Set minimum date to tomorrow
                  }}
                />
              </Grid>


              <Grid item xs={6}>
                <TextField
                  id="relocate"
                  name="relocate"
                  label="Willing to Relocate"
                  select
                  value={formik.values.relocate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.relocate && Boolean(formik.errors.relocate)}
                  helperText={formik.touched.relocate && formik.errors.relocate}
                  fullWidth
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="notSure">Not Sure</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lastCompany"
                  name="lastCompany"
                  label="Last Company Worked For"
                  value={formik.values.lastCompany}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastCompany && Boolean(formik.errors.lastCompany)}
                  helperText={formik.touched.lastCompany && formik.errors.lastCompany}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="website"
                  name="website"
                  label="Website Link (Optional)"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  id="additionalInformation"
                  name="additionalInformation"
                  label="Additional Information"
                  multiline
                  rows={3}
                  value={formik.values.additionalInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.additionalInformation && Boolean(formik.errors.additionalInformation)}
                  helperText={formik.touched.additionalInformation && formik.errors.additionalInformation}
                  fullWidth
                />
              </Grid>


              <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  style={{ display: 'none' }}
                />
                <label htmlFor="resume">
                  <Button variant="outlined" component="span">
                    Upload Resume
                  </Button>
                </label>
                {resumeError && <p style={{ color: 'red' }}>{resumeError}</p>}
                <Button type="button" variant="contained" color="primary" onClick={formik.handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
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













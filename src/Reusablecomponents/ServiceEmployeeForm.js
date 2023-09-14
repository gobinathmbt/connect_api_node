import React, { useState, useContext } from 'react';
import { Modal, Button, TextField, Checkbox, FormControlLabel, Grid, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import DatabaseContext from '../DataBaseConfig/Config';
import axios from 'axios';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  employeeId: Yup.string().required('Employee ID is required'),
  employeeName: Yup.string().required('Employee name is required'),
  employeeEmail: Yup.string().email('Invalid email address').required('Email is required'),
  companyName: Yup.string().required('Company name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  enquiryDetails: Yup.string().required('Inquiry details are required'),
  subscribeToNewsletter: Yup.boolean(),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const ServiceEmployeeForm = () => {




  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlEmployeeUrl = 'http://localhost:3002/MysqlServiceEmployeeData';
  const mongoEmployeeUrl = 'http://localhost:3002/ServiceEmployeeData';
  const EmployeeUrl = selectedDatabase === 'mysql' ? mysqlEmployeeUrl : mongoEmployeeUrl;


  const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };





  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm(); // Reset form values
  };



  const formik = useFormik({
    initialValues: {
      employeeId: '',
      employeeName: '',
      employeeEmail: '',
      companyName: '',
      phoneNumber: '',
      enquiryDetails: '',
      subscribeToNewsletter: false,
      agreeToTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send the form data to the corporate URL
        const response = await axios.post(EmployeeUrl, values);
        console.log('Form submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      setShowSnackbar(true);
      handleClose();
    },
  });

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleOpen}>
        Enquiry Now
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '20px',
            width: '40%',
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="employeeId"
                  name="employeeId"
                  label="Employee ID"
                  value={formik.values.employeeId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                  helperText={formik.touched.employeeId && formik.errors.employeeId}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="employeeName"
                  name="employeeName"
                  label="Employee Name"
                  value={formik.values.employeeName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                  helperText={formik.touched.employeeName && formik.errors.employeeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="employeeEmail"
                  name="employeeEmail"
                  label="Employee Email"
                  value={formik.values.employeeEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.employeeEmail && Boolean(formik.errors.employeeEmail)}
                  helperText={formik.touched.employeeEmail && formik.errors.employeeEmail}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="enquiryDetails"
                  name="enquiryDetails"
                  label="Enquiry Details"
                  multiline
                  rows={4}
                  value={formik.values.enquiryDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.enquiryDetails && Boolean(formik.errors.enquiryDetails)}
                  helperText={formik.touched.enquiryDetails && formik.errors.enquiryDetails}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="subscribeToNewsletter"
                      checked={formik.values.subscribeToNewsletter}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Subscribe to Newsletter"
                />
              </Grid>
              <Grid item xs={7}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeToTerms"
                      checked={formik.values.agreeToTerms}
                      onChange={formik.handleChange}
                    />
                  }
                  label="I agree to the Terms and Conditions"
                  className={formik.touched.agreeToTerms && formik.errors.agreeToTerms ? 'error' : ''}

                />
                {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                  <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.agreeToTerms}</div>
                )}
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="secondary">
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
    </div>
  );
};

export default ServiceEmployeeForm;

import React, { useState, useContext } from 'react';
import { Modal, Button, TextField, Checkbox, FormControlLabel, Grid, Select, MenuItem, InputLabel, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import DatabaseContext from '../DataBaseConfig/Config';
import axios from 'axios';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  currentEducationLevel: Yup.string().required('Current education level is required'),
  areaOfInterest: Yup.string().required('Area of interest is required'),
  workExperience: Yup.string().required('Work experience is required'),
  additionalInformation: Yup.string(),
  subscribeToNewsletter: Yup.boolean(),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const educationLevels = ['High School', 'Undergraduate', 'Postgraduate'];
const areasOfInterest = ['Upskilling', 'Higher Education'];
const workexperience = ['Fresher', '1+', '2+']

const ServiceStudentsForm = () => {




  const { selectedDatabase } = useContext(DatabaseContext);

  const mysqlStudentUrl = 'http://localhost:3002/MysqlServiceStudentData';
  const mongoStudentUrl = 'http://localhost:3002/ServiceStudentData';
  const StudentUrl = selectedDatabase === 'mysql' ? mysqlStudentUrl : mongoStudentUrl;


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
      name: '',
      phoneNumber: '',
      email: '',
      currentEducationLevel: '',
      areaOfInterest: '',
      workExperience: '',
      additionalInformation: '',
      subscribeToNewsletter: false,
      agreeToTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send the form data to the corporate URL
        const response = await axios.post(StudentUrl, values);
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <div className={formik.touched.currentEducationLevel && formik.errors.currentEducationLevel ? 'error' : ''} >Current Education Level</div>
                <Select
                  labelId="currentEducationLevelLabel"
                  id="currentEducationLevel"
                  name="currentEducationLevel"
                  value={formik.values.currentEducationLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.currentEducationLevel && Boolean(formik.errors.currentEducationLevel)}
                  fullWidth
                >
                  {educationLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.currentEducationLevel && formik.errors.currentEducationLevel && (
                  <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.currentEducationLevel}</div>
                )}
              </Grid>





              <Grid item xs={6}>
                <div className={formik.touched.areaOfInterest && formik.errors.areaOfInterest ? 'error' : ''}>Area of Interest</div>
                <Select
                  labelId="areaOfInterestLabel"
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formik.values.areaOfInterest}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.areaOfInterest && Boolean(formik.errors.areaOfInterest)}
                  fullWidth
                >
                  {areasOfInterest.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.areaOfInterest && formik.errors.areaOfInterest && (
                  <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.areaOfInterest}</div>
                )}
              </Grid>

              <Grid item xs={12}>
                <div className={formik.touched.workExperience && formik.errors.workExperience ? 'error' : ''}>Work Experience</div>
                <Select
                  labelId="workExperienceLabel"
                  id="workExperience"
                  name="workExperience"
                  value={formik.values.workExperience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.workExperience && Boolean(formik.errors.workExperience)}
                  fullWidth
                >
                  {workexperience.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.workExperience && formik.errors.workExperience && (
                  <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.areaOfInterest}</div>
                )}
              </Grid>




              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="workExperience"
                  name="workExperience"
                  label="Work Experience"
                  value={formik.values.workExperience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.workExperience && Boolean(formik.errors.workExperience)}
                  helperText={formik.touched.workExperience && formik.errors.workExperience}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="additionalInformation"
                  name="additionalInformation"
                  label="Additional Requirments"
                  multiline
                  rows={4}
                  value={formik.values.additionalInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
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

export default ServiceStudentsForm;

import React, { useState, useContext } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Grid, Snackbar } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DatabaseContext from '../DataBaseConfig/Config';
import axios from 'axios';

const validationSchema = Yup.object({
  companyName: Yup.string().required('Company/Organization name is required'),
  contactPersonName: Yup.string().required('Contact person name is required'),
  role: Yup.string().required('Role is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  serviceOfInterest: Yup.array().min(1, 'Please select at least one service'),
  additionalComments: Yup.string(),
  subscribeToNewsletter: Yup.boolean(),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const initialValues = {
  companyName: '',
  contactPersonName: '',
  role: '',
  email: '',
  phoneNumber: '',
  serviceOfInterest: [],
  additionalComments: '',
  subscribeToNewsletter: false,
  agreeToTerms: true,
};

const HireUs = () => {
  const { selectedDatabase } = useContext(DatabaseContext);
  const mysqlCorporateUrl = 'http://localhost:3002/MysqlServiceCorporateData';
  const mongoCorporateUrl = 'http://localhost:3002/ServiceCorporateData';
  const CorporateUrl = selectedDatabase === 'mysql' ? mysqlCorporateUrl : mongoCorporateUrl;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values,formik) => {
    try {
      // Send the form data to the corporate URL
      const response = await axios.post(CorporateUrl, values);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setShowSnackbar(true);
    formik.resetForm();
  };

  const handleReset = (formik) => {
    formik.resetForm();
  };


  return (
    <>
      <div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="companyName"
                    name="companyName"
                    label="Company/Organization Name"
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
                    id="contactPersonName"
                    name="contactPersonName"
                    label="Contact Person Name"
                    value={formik.values.contactPersonName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                    helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="role"
                    name="role"
                    label="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
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
                  <div>
                    <div className={formik.touched.serviceOfInterest && formik.errors.serviceOfInterest ? 'error' : ''}>
                      Service of Interest
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="serviceOfInterest"
                          value="htd"
                          checked={formik.values.serviceOfInterest.includes('htd')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue('serviceOfInterest', [...formik.values.serviceOfInterest, 'htd']);
                            } else {
                              formik.setFieldValue(
                                'serviceOfInterest',
                                formik.values.serviceOfInterest.filter((value) => value !== 'htd')
                              );
                            }
                          }}
                        />
                      }
                      label="HTD"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="serviceOfInterest"
                          value="hireFromUs"
                          checked={formik.values.serviceOfInterest.includes('hireFromUs')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue('serviceOfInterest', [...formik.values.serviceOfInterest, 'hireFromUs']);
                            } else {
                              formik.setFieldValue(
                                'serviceOfInterest',
                                formik.values.serviceOfInterest.filter((value) => value !== 'hireFromUs')
                              );
                            }
                          }}
                        />
                      }
                      label="Hire from Us"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="serviceOfInterest"
                          value="lateralTraining"
                          checked={formik.values.serviceOfInterest.includes('lateralTraining')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue('serviceOfInterest', [...formik.values.serviceOfInterest, 'lateralTraining']);
                            } else {
                              formik.setFieldValue(
                                'serviceOfInterest',
                                formik.values.serviceOfInterest.filter((value) => value !== 'lateralTraining')
                              );
                            }
                          }}
                        />
                      }
                      label="Lateral Training"
                    />

                  </div>

                  {formik.touched.serviceOfInterest && formik.errors.serviceOfInterest && (
                    <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.serviceOfInterest}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="additionalComments"
                    name="additionalComments"
                    label="Additional Requirments"
                    multiline
                    rows={4}
                    value={formik.values.additionalComments}
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
                        onBlur={formik.handleBlur}

                      />
                    }
                    label="I agree to the Terms and Conditions"
                    className={formik.touched.agreeToTerms && formik.errors.agreeToTerms ? 'error' : ''}

                  />
                  {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                    <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.agreeToTerms}</div>
                  )}
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center",paddingLeft:"30%" }}>
                  <Button type="submit" variant="contained" color="secondary">
                    Submit
                  </Button>

                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>

                  <Button type="button" variant="contained" color="secondary" onClick={() => handleReset(formik)}>
                    Reset
                  </Button>

                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={7000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message="Thanks for the enquiry! We will get back to you soon."
      />

    </>
  );
};

export default HireUs;





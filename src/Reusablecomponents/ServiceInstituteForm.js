import React, { useState, useContext } from 'react';
import { Button, Grid, Modal, TextField, Checkbox, FormControlLabel,Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DatabaseContext from '../DataBaseConfig/Config';
import axios from 'axios';

const validationSchema = yup.object({
    institutionName: yup.string().required('Institution Name is required'),
    contactPerson: yup.string().required('Contact Person is required'),
    contactEmail: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    contactNumber: yup.string().required('Contact Number is required'),
    institutionAddress: yup.string().required('Institution Address is required'),
    services: yup.array().min(1, 'At least one service must be selected'),
    additionalComments: yup.string(),
    subscribeToNewsletter: yup.boolean(),
    agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const ServiceInstituteForm = () => {


    const { selectedDatabase } = useContext(DatabaseContext);

    const mysqlInstituteUrl = 'http://localhost:3002/MysqlServiceInstituteData';
    const mongoInstituteUrl = 'http://localhost:3002/ServiceInstituteData';
    const InstituteUrl = selectedDatabase === 'mysql' ? mysqlInstituteUrl : mongoInstituteUrl;




    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.resetForm(); // Reset form values
        setOpen(false);
    };

    const [showSnackbar, setShowSnackbar] = useState(false); // State for showing/hiding the snackbar

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };


    const formik = useFormik({
        initialValues: {
            institutionName: '',
            contactPerson: '',
            contactEmail: '',
            contactNumber: '',
            institutionAddress: '',
            services: [],
            additionalComments: '',
            subscribeToNewsletter: false,
            agreeToTerms: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Send the form data to the corporate URL
                const response = await axios.post(InstituteUrl, values);
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

            <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '20px', width: '40%', maxHeight: '70vh', overflow: 'auto' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Institution Name"
                                    name="institutionName"
                                    value={formik.values.institutionName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.institutionName && formik.errors.institutionName}
                                    helperText={formik.touched.institutionName && formik.errors.institutionName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Name"
                                    name="contactPerson"
                                    value={formik.values.contactPerson}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.contactPerson && formik.errors.contactPerson}
                                    helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Contact Number"
                                    name="contactNumber"
                                    value={formik.values.contactNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.contactNumber && formik.errors.contactNumber}
                                    helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Contact Email"
                                    name="contactEmail"
                                    value={formik.values.contactEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.contactEmail && formik.errors.contactEmail}
                                    helperText={formik.touched.contactEmail && formik.errors.contactEmail}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    name="institutionAddress"
                                    value={formik.values.institutionAddress}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.institutionAddress && formik.errors.institutionAddress}
                                    helperText={formik.touched.institutionAddress && formik.errors.institutionAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className={formik.touched.services && formik.errors.services ? 'error' : ''}>
                                    Service of Interest
                                </div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="services"
                                            value="Train and Place"
                                            checked={formik.values.services.includes('Train and Place')}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Train and Place"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="services"
                                            value="Hire Train Deploy"
                                            checked={formik.values.services.includes('Hire Train Deploy')}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Hire Train Deploy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="services"
                                            value="Center of Excellence (COE)"
                                            checked={formik.values.services.includes('Center of Excellence (COE)')}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="COE"
                                />
                                {formik.touched.services && formik.errors.services && (
                                    <div style={{ color: '#d63b3b', fontSize: "0.75rem" }}>{formik.errors.services}</div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Additional Requirments"
                                    name="additionalComments"
                                    value={formik.values.additionalComments}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.additionalComments && formik.errors.additionalComments}
                                    helperText={formik.touched.additionalComments && formik.errors.additionalComments}
                                    fullWidth
                                    multiline
                                    rows={4}
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
                            <Grid item xs={12} style={{ textAlign: "center" }}>
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

export default ServiceInstituteForm;

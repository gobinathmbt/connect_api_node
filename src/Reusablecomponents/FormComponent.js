import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const characterRegex = /^[A-Za-z]+$/;
const numberRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{3,}\.(co|com|in|com\.in|co\.in|org|net|edu|gov|mil|biz|info|name|museum|coop|aero|[A-Za-z]{2,4})$/;


const validationSchema = Yup.object({
  name: Yup.string()
    .matches(characterRegex, 'Only characters are allowed')
    .required('Full Name is required'),
  phone: Yup.string()
    .matches(numberRegex, 'Only numbers are allowed')
    .matches(/^\d{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
    email: Yup.string()
    .matches(emailRegex, 'Invalid email')
    .required('Email is required'),
});

const Form = () => {
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // State for controlling the modal
  const formRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setErrors({});
        formik.resetForm(); // Reset the form values
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Perform further actions, such as submitting the form
      console.log(values);
      // Open the modal after form submission
      openModal();
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='container' style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '30px', width: '70%' }} ref={formRef}>
        <div style={{ paddingTop: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Reach Us</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            color='secondary'
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="normal"
            size='small'
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formik.values.phone}
            color='secondary'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
            margin="normal"
            size='small'
          />
          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            color='secondary'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            size='small'
            margin="normal"
          />
          <Button
            style={{ marginBottom: "30px", marginLeft: "30%" }}
            variant="outlined"
            color='secondary'
            type="submit"
          >
            Get Started
          </Button>
        </form>
      </div>
      
      <Modal open={modalOpen} onClose={closeModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h6" color="textSecondary" align="center">
            Service Under Construction
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center">
            We are working hard to bring you this service. Stay tuned!
          </Typography>
          <Button
            variant="outlined"
            color='secondary'
            style={{ marginTop: '10px' }}
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Form;

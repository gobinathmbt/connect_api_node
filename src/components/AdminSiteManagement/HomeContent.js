import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DatabaseContext from '../../DataBaseConfig/Config';

const validationSchema = Yup.object().shape({
  text: Yup.string().required('Text is required'),
  fontsize: Yup.number().positive('Font size must be positive').required('Font size is required'),
  fontcolour: Yup.string().required('Font color is required'),
});

const HomeContent = () => {
  const { selectedDatabase } = useContext(DatabaseContext);
  const mysqlUrl = 'http://localhost:3002/MysqlSiteManagement/Homecontent';
  const mongoUrl = 'http://localhost:3002/SiteManagement/Homecontent';
  const contentUrl = selectedDatabase === 'mysql' ? mysqlUrl : mongoUrl;

  const formik = useFormik({
    initialValues: {
      text: '',
      fontsize: '',
      fontcolour: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { text, fontsize, fontcolour } = values;
        await axios.post(contentUrl, { text, fontsize, fontcolour });
        fetchContent();
        resetForm();
      } catch (error) {
        console.error('Error adding content:', error);
      }
    },
  });

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchContent = async () => {
    try {
      const response = await axios.get(contentUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${contentUrl}/${index}`);
      setData((prevData) => prevData.filter((item, i) => i !== index));
      console.log(`Delete item with index: ${index}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (index) => {
    setSelectedItem({ ...data[index], index }); // Update the selectedItem with the corresponding data item and index.
  };

  const handleUpdate = async (index, updatedContent) => {
    try {
      await axios.put(`${contentUrl}/${index}`, updatedContent);
      setData((prevData) =>
        prevData.map((item, i) => (i === index ? { ...item, ...updatedContent } : item))
      );
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const EditModal = () => {
    const formikEdit = useFormik({
      initialValues: {
        text: selectedItem ? selectedItem.text : '', // Correctly set the initial values from the selected item.
        fontsize: selectedItem ? selectedItem.fontsize : '',
        fontcolour: selectedItem ? selectedItem.fontcolour : '',
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const { text, fontsize, fontcolour } = values;
          const updatedContent = { text, fontsize, fontcolour };
          await handleUpdate(selectedItem.index, updatedContent); // Pass the correct index here.
          resetForm();
        } catch (error) {
          console.error('Error editing content:', error);
        }
      },
    });

    return (
      <Modal open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <form onSubmit={formikEdit.handleSubmit}>
            <TextField
              type="text"
              name="text"
              label="Text"
              fullWidth
              value={formikEdit.values.text}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              error={formikEdit.touched.text && Boolean(formikEdit.errors.text)}
              helperText={formikEdit.touched.text && formikEdit.errors.text}
            />
            <TextField
              type="number"
              name="fontsize"
              label="Font Size"
              fullWidth
              value={formikEdit.values.fontsize}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              error={formikEdit.touched.fontsize && Boolean(formikEdit.errors.fontsize)}
              helperText={formikEdit.touched.fontsize && formikEdit.errors.fontsize}
              style={{marginTop:"20px"}}
            />
            <TextField
              type="text"
              name="fontcolour"
              label="Font Color"
              fullWidth
              value={formikEdit.values.fontcolour}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              error={formikEdit.touched.fontcolour && Boolean(formikEdit.errors.fontcolour)}
              helperText={formikEdit.touched.fontcolour && formikEdit.errors.fontcolour}
              style={{marginTop:"20px"}}
            />
            <Button variant="contained" type="submit" disabled={formikEdit.isSubmitting}>
              Save
            </Button>
          </form>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='col-sm-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
              Add Content
            </Button>
          </div>
          <div className='col-sm-8'>
            <TextField
              type="text"
              name="text"
              label="Text"
              fullWidth
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
            />
            <TextField
              type="number"
              name="fontsize"
              label="Font Size"
              fullWidth
              value={formik.values.fontsize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fontsize && Boolean(formik.errors.fontsize)}
              helperText={formik.touched.fontsize && formik.errors.fontsize}
              style={{marginTop:"20px"}}
            />
            <TextField
              type="text"
              name="fontcolour"
              label="Font Color"
              fullWidth
              value={formik.values.fontcolour}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fontcolour && Boolean(formik.errors.fontcolour)}
              helperText={formik.touched.fontcolour && formik.errors.fontcolour}
              style={{marginTop:"20px"}}
            />
          </div>
        </div>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Font Size</TableCell>
              <TableCell>Font Color</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.text}</TableCell>
                <TableCell>{item.fontsize}</TableCell>
                <TableCell>{item.fontcolour}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex' }}>
                    <Button variant="text" color="primary" onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </Button>
                    <Button variant="text" color="error" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditModal />
    </div>
  );
};

export default HomeContent;

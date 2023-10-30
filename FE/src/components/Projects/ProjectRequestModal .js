import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from "axios";
const ProjectRequestModal = ({ open, onClose, projectId, projectEmail, projectTitle }) => {
  const [requestStatus, setRequestStatus] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  console.log('pdfFile', pdfFile);

  const [values, setValues] = useState({
    projectTitle: projectTitle,
    projectId: projectId,
    projectEmail: projectEmail,
    firstName: '',
    secondName: '',
    email: '',
    contact: '',
    experience: '',
    skill: '',
    document: '',
  });
  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/upload/image`,
        formData
      );
  
      if (response.data.status) {
        setPdfFile(response.data.secureUrl);
  
       
        setValues({
          ...values,
          document: response.data.secureUrl,
        });
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Failed to upload document');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.error('An error occurred while uploading the document');
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the values state with the typed values
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/post/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success('Request submitted successfully', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3 seconds
        });
        // setRequestStatus('Request submitted successfully');

        onClose()
      } else {
        setRequestStatus('Failed to submit request');
      }
    } catch (error) {
      console.error('Error:', error);
      setRequestStatus('An error occurred');
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="div">
            Request Project
          </Typography>

          <TextField
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            label="Second Name"
            name="secondName"
            value={values.secondName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            label="Contact"
            name="contact"
            value={values.contact}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            label="Experience"
            name="experience"
            value={values.experience}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          <TextField
            label="Skill"
            name="skill"
            value={values.skill}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />

          {/* <TextField
          label="Document"
          name="document"
          value={values.document}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          size="small"
        /> */}
                        <label className="form-label"> Document</label>
          <input type="file" accept=".pdf,.doc,.docx" id="upload" hidden onChange={(e) => uploadImage(e)} />
          <label for="upload" className="fileupload">{loading ? "Loading" : "Choose file"} </label>



          <Button
          variant="contained"
          color="primary"
          startIcon={<CloseIcon />}
          onClick={onClose}
          sx={{ mt: -117, marginLeft: 35,backgroundColor: '#006747', color: 'white' }}
        >
         
        </Button>

          <Button
          style={{ backgroundColor: '#006747', color: 'white' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2,ml:10 }}
          >
            Submit Request
          </Button>

          {requestStatus && <Typography variant="body2" sx={{ mt: 2 }}>{requestStatus}</Typography>}
        </Box>
      </Modal>
    </>
  );
};

export default ProjectRequestModal;

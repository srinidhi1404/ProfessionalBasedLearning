import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "../../constant/constant";
const ProjectRequestModal = ({
  open,
  onClose,
  projectId,
  projectEmail,
  projectTitle,
}) => {
  console.log(projectEmail);
  const [requestStatus, setRequestStatus] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  console.log(pdfFile)
  const [messageApi, contextHolder] = message.useMessage();
  const [values, setValues] = useState({
    projectTitle: projectTitle,
    projectId: projectId,
    projectEmail: projectEmail,
    firstName: "",
    secondName: "",
    email: "",
    contact: "",
    experience: "",
    skill: "",
    document: "",
  });

  const validationRules = {
    firstName: [{ required: true, message: "First Name is required" }],
    secondName: [{ required: true, message: "Second Name is required" }],
    email: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Invalid email format" },
    ],
    contact: [
      { required: true, message: "Contact is required" },
      { pattern: /^[0-9]+$/, message: "Invalid contact number" },
    ],
    experience: [{ required: true, message: "Experience is required" }],
    skill: [{ required: true, message: "Skill is required" }],
  };

  const [errors, setErrors] = useState({});

  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await axios.post(
        `${BASE_URL}api/upload/image`,
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
        toast.error("Failed to upload document");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while uploading the document");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = (values, validationRules) => {
    const errors = {};

    for (const fieldName in validationRules) {
      const rules = validationRules[fieldName];
      for (const rule of rules) {
        if (rule.required && !values[fieldName]) {
          errors[fieldName] = rule.message || "Field is required";
          break;
        }

        if (
          rule.pattern &&
          values[fieldName] &&
          !rule.pattern.test(values[fieldName])
        ) {
          errors[fieldName] = rule.message || "Invalid format";
          break;
        }
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm(values, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${BASE_URL}api/post/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          messageApi.open({
            type: "success",
            content: "Request posted Sucessfully",
          });
          onClose();
        } else {
          setRequestStatus("Failed to submit request");
        }
      } catch (error) {
        setRequestStatus("An error occurred");
      }
    }
  };

  return (
    <>
       {contextHolder}
      <ToastContainer />
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-title" variant="h6" component="div">
              Request Project
            </Typography>
    
          </div>
          <TextField
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />

          <TextField
            label="Second Name"
            name="secondName"
            value={values.secondName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.secondName)}
            helperText={errors.secondName}
          />

          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            label="Contact"
            name="contact"
            value={values.contact}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.contact)}
            helperText={errors.contact}
          />

          <TextField
            label="Experience"
            name="experience"
            value={values.experience}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.experience)}
            helperText={errors.experience}
          />

          <TextField
            label="Skill"
            name="skill"
            value={values.skill}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={Boolean(errors.skill)}
            helperText={errors.skill}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="upload"
            hidden
            onChange={(e) => uploadImage(e)}
          />
          <label for="upload" className="fileuploadnew">
            {loading ? "Loading" : "Choose file"}{" "}
          </label>

          <Button
            style={{ backgroundColor: "#006747", color: "white" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "100%", margin: "15px 0px 0px 0px" }}
          >
            Submit Request
          </Button>

          {requestStatus && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {requestStatus}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProjectRequestModal;

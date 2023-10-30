// import './resetPassword.css';
import "./ForgotPassword.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "../validation";
import { fetchApi } from "../../Utils/Request";
import { message } from "antd";
import ResetPassword from "../ResetPassword/resetPassword";

const formDetails = {
  email: "",
};

const ForgotPasswordForm = ({
  show,
  handleShow,
  handleClose,
  showResetPassword,
  setShowResetPassword,
}) => {
  const [formData, setFormData] = useState({ ...formDetails });
  const [errors, setErrors] = useState({});
  console.log(errors, "ForgotPassword");
  const [messageApi, contextHolder] = message.useMessage();

  const [show1, setShow] = useState(false);
  const handleClose1 = (data) => {
    setShow(data);
  };
  const handleShow1 = () => {
    setShow(true);
  };

  const validationRules = {
    email: [
      {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        errorMessage: "Invalid email format",
      },
    ],
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name>>>>", name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);
    if (formData.email === "") {
      messageApi.open({
        type: "error",
        content: "Email is Required",
        style: {
          position: "absolute",
          right: 0,
          top: 10,
        },
      });
      handleClose();
    }
    console.log("clickable", newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("api call");
      let response = await fetchApi("/api/forgotpassword", formData, "POST");
      if (response.status === true) {

        messageApi.open({
          type: "success",
          content: response.message,
          style: {
            position: "absolute",
            right: 0,
            top: 10,
          },
          
        });
  
        setShowResetPassword(true);
        setTimeout(() => {
          handleShow1();
        }, 1000);
     
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
          style: {
            position: "absolute",
            right: 0,
            top: 10,
          },
        });
      }
      console.log("response data", response.status);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        marginRight="10px"
      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label for="usr" style={{ marginBottom: "10px" }}>
                Email Address
              </label>
              <input
                type="text"
                name="email"
                className="form-control rounded-pill"
                id="usr"
                placeholder="Enter Email"
                onChange={handleChange}
                value={formData.email}
                disabled={showResetPassword}
              />
              {!showResetPassword && (
                <>
                  <p style={{ marginTop: "10px" }}>
                    We'll send you a link to reset your password.
                  </p>
                  <Button
                    variant="primary rounded-pill "
                    style={{ marginRight: "330px" }}
                    type="submit"
                  >
                    Send reset link
                  </Button>
                </>
              )}
            </form>
            <div className="col"></div>
            {showResetPassword && (
              <ResetPassword
                handleClose1={handleClose1}
                handleShow1={handleShow1}
                show1={show1}
                email={formData.email}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPasswordForm;

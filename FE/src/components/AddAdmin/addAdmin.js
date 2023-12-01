import React, { useState } from "react";
import {  Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./addAdmin.css"
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validation";
import { fetchApi } from "../../Utils/Request";
import { message } from "antd";

const formDetails = {
    firstName: "",
    secondName: "",
    email: "",
    password: "",

};

const emailDetails = {
  email: "",
};

const validationRules = {
    
    firstName: [{ required: true, message: "First Name is Required" }],
    secondName: [{ required: true, message: "Last Name is Required" }],
    email: [
      {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        message: "Invalid email format",
      },
    ],
    
    password: [{ required: true, message: "Password is Required" }],
  };

const AddAdminForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [formData, setFormData] = useState({ ...formDetails });
  const [emailverify, setVerifyEmail] = useState({ ...emailDetails });
  const [errors, setErrors] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [password, setPassword] = useState("");
  console.log(password)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "email") {
      setVerifyEmail((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let response = await fetchApi("admin/signup", formData, "POST");
        if (response.status === true) {
          messageApi.open({
            type: "success",
            content: response.message,
          });
          
        } else {
          messageApi.open({
            type: "error",
            content: response.message,
          });
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "An error occurred while processing your request.",
        });
      }
    }
  };

  

  return (
    <>
      {contextHolder}
      <div className="signup-mycontainer">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="beforeForm">
            <h2 className="mb-15">Add New Admin</h2>
            <Form className="formSignup" onSubmit={handleSubmit} style={{height: "50"}}>
              <div className="form-signup-flex">
               <Form.Group className="formUsername" >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control style={{width:"100%" }}
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    className={`InputSignup ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </Form.Group>
                </div>
                <div className="form-signup-flex">
                <Form.Group className="formUsername">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="secondName"
                    placeholder="Enter Last Name"
                    className={`InputSignup ${
                      errors.secondName ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.secondName && (
                    <div className="invalid-feedback">{errors.secondName}</div>
                  )}
                </Form.Group>
                </div>
                <div className="form-signup-flex">
                <Form.Group className="formUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter Email Id"
                    className={`InputSignup ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </Form.Group>
              </div>
               
               
              <div className="form-signup-flex">
                <Form.Group controlId="formPassword" className="formUsername">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input">
                    <div>
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        className={`InputSignup ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    ></div>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </Form.Group>
                <Form.Group
                  controlId="formConfirmPassword"
                  className="formUsername"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="password-input">
                    <div>
                      <Form.Control
                        variant="rounded-pill"
                        type={passwordVisible1 ? "text" : "password"}
                        placeholder="Confirm password "
                        name="confirmPassword"
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </div>
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility1}
                    ></div>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </Form.Group>
              </div>
              <Button variant="primary" type="submit" className="signupButton">
                Submit
              </Button>
              <Button className="backTo" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddAdminForm;

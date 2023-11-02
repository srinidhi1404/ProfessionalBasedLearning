import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validation";
import { fetchApi } from "../../Utils/Request";
import { message } from "antd";

const formDetails = {
  firstName: "",
  secondName: "",
  email: "",
  contact: "",
  intro: "",
  education: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const emailDetails = {
  email: "",
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [formData, setFormData] = useState({ ...formDetails });
  const [emailverify, setVerifyEmail] = useState({ ...emailDetails });
  const [errors, setErrors] = useState({});
  const [verifyOtp, setVerifyOTP] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
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
    contact: [{ required: true, message: "Mobile Number is Required" }],
    intro: [{ required: true, message: "Intro is Required" }],
    education: [{ required: true, message: "Education is Required" }],
    password: [{ required: true, message: "Password is Required" }],
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
        let response = await fetchApi("/api/signup", formData, "POST");
        if (response.status === true) {
          messageApi.open({
            type: "success",
            content: response.message,
          });
          localStorage.setItem("userType", "guestUser");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
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

  const getVerifyOtp = async (e) => {
    e.preventDefault();
    let response = await fetchApi("/api/send/otp", emailverify, "POST");
    if (response.status === true) {
      setVerifyOTP(true);
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
  };

  return (
    <>
      {contextHolder}
      <div className="signup-mycontainer">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="beforeForm">
            <h2 className="mb-15">Create a new account</h2>
            <Form className="formSignup" onSubmit={handleSubmit}>
              <div className="form-signup-flex">
                <Form.Group className="formUsername">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
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
                <Form.Group
                  controlId="formMobileNumber"
                  className="formUsername"
                >
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact"
                    placeholder="Enter Mobile number"
                    className={`InputSignup ${
                      errors.contact ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <div className="invalid-feedback">{errors.contact}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="formIntro" className="formUsername">
                  <Form.Label>Intro</Form.Label>
                  <Form.Control
                    type="text"
                    name="intro"
                    placeholder="Enter your Intro"
                    className={`InputSignup ${
                      errors.intro ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.intro && (
                    <div className="invalid-feedback">{errors.intro}</div>
                  )}
                </Form.Group>
              </div>

              <Form.Group controlId="formEmail" className="formUsername">
                <Form.Label>Email</Form.Label>
                <div className="email-set">
                  <div>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className={`InputSignup ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="verify-email-btn">
                    <Button
                      onClick={(e) => getVerifyOtp(e)}
                      className="mybuttonBn"
                    >
                      Verify Email
                    </Button>
                  </div>
                </div>
                {verifyOtp ? (
                  <div className="form-group">
                    <label for="usr" style={{ marginBottom: "10px" }}>
                      Enter OTP
                    </label>
                    <Form.Control
                      onChange={handleChange}
                      name="otp"
                      type="number"
                    />
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group controlId="formEducation" className="formUsername">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  placeholder="Enter your Education"
                  className={`InputSignup ${
                    errors.education ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.education && (
                  <div className="invalid-feedback">{errors.education}</div>
                )}
              </Form.Group>
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
                Sign Up
              </Button>
              <Button className="backTo" onClick={() => navigate("/login")}>
                Back to Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignupForm;

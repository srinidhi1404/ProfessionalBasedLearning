import { React, useState } from "react";
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
  password: "",
  otp: "",
};

const emailDetails = {
  email: "",
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({ ...formDetails });
  const [emailverify, setVerifyEmail] = useState({ ...emailDetails });
  const [errors, setErrors] = useState({});
  console.log({ password, errors }, "SignupForm");
  const [verifyOtp, setVerifyOTP] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const validationRules = {
    email: [
      {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        errorMessage: "Invalid email format",
      },
    ],
    password: [{ required: true }],
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
    if (formData.firstName === "") {
      messageApi.open({
        type: "error",
        content: "First Name is Required",
      });
    }
    if (formData.lastName === "") {
      messageApi.open({
        type: "error",
        content: "Last Name is Required",
      });
    }
    if (formData.email === "") {
      messageApi.open({
        type: "error",
        content: "Email is Required",
      });
    }
    if (formData.password === "") {
      messageApi.open({
        type: "error",
        content: "Password is Required",
      });
    }

    // console.log("errors" ,newErrors);
    if (Object.keys(newErrors).length === 0) {
      let response = await fetchApi("/api/signup", formData, "POST");
      // console.log("response",response);
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
      <Container className="signup-container">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="beforeForm">
            <h2 className="mb-15">Create a new account</h2>
            <Form className="formSignup" onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="formUsername">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="InputSignup"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formUsername" className="formUsername">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="secondName"
                  placeholder="Enter Last Name"
                  className="InputSignup"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="formUsername">
                <Form.Label>Email</Form.Label>
                <div className="email-set">
                  <div>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="InputSignup"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="verify-email-btn">
                    <Button onClick={(e) => getVerifyOtp(e)}>
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

              <Form.Group controlId="formPassword" className="formUsername">
                <Form.Label>Password</Form.Label>
                <div className="password-input">
                  <div>
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      className="InputSignup"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className="eye-icon"
                    onClick={togglePasswordVisibility}
                  ></div>
                </div>

                {/* {passwordVisible ? null : <div className="strength-bar1"></div>} */}
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
                      className="InputSignup"
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </div>
                  <div
                    className="eye-icon"
                    onClick={togglePasswordVisibility1}
                  ></div>
                </div>

                {/* {passwordVisible1 ? null : <div className="strength-bar1"></div>} */}
              </Form.Group>
              <Button variant="primary " type="submit" className="signupButton">
                Sign Up
              </Button>
              <span className="backTo" onClick={() => navigate("/login")}>
                Back to Login
              </span>
            </Form>
          </Col>
        </Row>
        {/* <PasswordInput/> */}
      </Container>
    </>
  );
};

export default SignupForm;

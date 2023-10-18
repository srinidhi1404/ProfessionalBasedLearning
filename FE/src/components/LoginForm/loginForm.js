import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../ForgotPassword/forgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "antd";
import { fetchApi } from "../../Utils/Request";
import EyeIcon from ".././../asset/image/eye.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const formDetails = {
    email: localStorage.getItem("rememberedUsername") || "",
    password: localStorage.getItem("rememberedPassword") || "",
  };
  const [formData, setFormData] = useState({ ...formDetails });

  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const userType = localStorage.getItem("userType");
  const handleClose = () => {
    setShow(false);
    setShowResetPassword(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      navigate("/");
    }
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  ///-----------------------------guest login------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "guestUser") {
      let response = await fetchApi("/api/login", formData, "POST");

      if (response.status === true) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        navigate("/dashboard");

        localStorage.setItem("token", response.token);
        console.log(">>>>>>>>>token", response.token);
      } else {
        messageApi.open({
          type: "error",
          content: "Please Enter Correct Credential",
        });
      }
      console.log("response data", response.status);
    } else if (userType === "student") {
      let response = await fetchApi("/student/login", formData, "POST");

      if (response.status === true) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        navigate("/dashboard");

        localStorage.setItem("token", response.token);
        console.log(">>>>>>>>>token", response.token);
      } else {
        messageApi.open({
          type: "error",
          content: "Please Enter Correct Credential",
        });
      }
      console.log("response data", response.status);
    } else if (userType === "admin") {
      let response = await fetchApi("/admin/login", formData, "POST");

      if (response.status === true) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        navigate("/dashboard");

        localStorage.setItem("token", response.token);
        console.log(">>>>>>>>>token", response.token);
      } else {
        messageApi.open({
          type: "error",
          content: "Please Enter Correct Credential",
        });
      }
      console.log("response data", response.status);
    }
  };

  const handleRememberMeChange = (event) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      localStorage.setItem("rememberedUsername", formData.email);
      localStorage.setItem("rememberedPassword", formData.password);
    } else {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="mainDiv">
          <img
            src="https://projectbasedlearningexplorer.onrender.com/images/logo.png"
            alt="ggjaj"
          />

          <h3 className="font-weight-medium">
            Professional Based Learning Explorer
          </h3>
          <div className="formDiv1">
            <div className="shadow-4">
              <div className="formDiv2">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-outline">
                    <label className="form-label " for="form2Example1">
                      Username or Email
                    </label>
                    <input
                      type="email"
                      id="form2Example1"
                      className="form-control"
                      placeholder="Enter Username or Email"
                      value={formData.email}
                      name="email"
                      style={{ borderRadius: "20px" }}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="login-pass-wrap">
                    <div className="form-outline relative">
                      <label className="form-label" for="form2Example2">
                        Password
                      </label>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="form2Example2"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        style={{ borderRadius: "20px" }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        checked={rememberMe}
                      />
                      <div
                        className="absolute right-5 top-[42px]"
                        onClick={togglePasswordVisibility}
                      >
                        <img className="w-5" src={EyeIcon} alt="EyeIcon"></img>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col d-flex ">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="form2Example31"
                          style={{ marginTop: "18px" }}
                          onChange={handleRememberMeChange}
                        />
                        <label
                          className="form-check-label"
                          for="form2Example31"
                          style={{ marginTop: "15px" }}
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mb-3 "
                    id="logIn"
                  >
                    Log In
                  </button>
                </form>
                {userType === "guestUser" && (
                  <div>
                    <div className="col">
                      <p>
                        <span onClick={() => handleShow()} className="forpass">
                          Forgot Password?
                        </span>
                      </p>
                    </div>
                    <div className="text-center">
                      <p>
                        External User?{" "}
                        <span
                          onClick={() => navigate("/sign-up")}
                          className="register"
                        >
                          Register
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <ForgotPasswordForm
                  handleClose={handleClose}
                  handleShow={handleShow}
                  show={show}
                  showResetPassword={showResetPassword}
                  setShowResetPassword={setShowResetPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

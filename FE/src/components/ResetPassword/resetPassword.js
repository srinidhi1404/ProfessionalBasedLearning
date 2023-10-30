import "./resetPassword.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchApi } from "../../Utils/Request";
import OTPInput from "otp-input-react";
import { message } from "antd";

const ResetPassword = ({ show1, email, handleClose1 }) => {
  const formDetails = {
    newPassword: "",
    resetToken: "",
    email: email,
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({ ...formDetails });
  const [errors, setErrors] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  React.useEffect(() => {}, [errors, formData]);

  // const validationRules = {
  //   email: [
  //     {
  //       required: true,
  //       pattern: /\S+@\S+\.\S+/,
  //       errorMessage: "Invalid email format",
  //     },
  //   ],
  // };
  const handleChange = (e, name) => {
    if (name === "resetToken") {
      setFormData({ ["resetToken"]: e });
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validate = async () => {
    if (
      formData.resetToken.length === 6 &&
      formData.newPassword === confirmPassword &&
      confirmPassword
    ) {
      return true;
    } else if (formData.resetToken.length !== 6) {
      setErrors("Enter Otp Correctly");
      return false;
    } else if (formData.newPassword === confirmPassword) {
      setErrors("Password is not same");
      return false;
    } else if (formData.newPassword <= 3) {
      setErrors("Password should be greater than 5 words");
      return false;
    }
    return true;
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    let val = await validate();
    if (val) {
      setFormData({ ...formData, ["email"]: email });
      let payload = {
        newPassword: formData.newPassword,
        resetToken: formData.resetToken,
        email: email,
      };
      let response = await fetchApi("/api/resetpassword", payload, "POST");
      if (response.status === true) {
        messageApi.open({
          type: "success",
          content: response.message,
          style: { position: "absolute", top: "10", right: "0" },
        });
        handleClose1(true)
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
          style: { position: "absolute", top: "10", right: "0" },
        });
      }
    } else {
      setErrors("Please check all fields");
      messageApi.open({
        type: "error",
        content: "Please check all fields",
        style: { position: "absolute", top: "10", right: "0" },
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="my-3">
          <span className="text-2xl font-semibold">Reset Password</span>
        </div>
        <div className="form-group">
          <form onSubmit={(e) => handleSubmit1(e)}>
            <label for="usr" style={{ marginBottom: "10px" }}>
              Enter OTP
            </label>
            <OTPInput
              value={formData.resetToken}
              onChange={(e) => {
                handleChange(e, "resetToken");
              }}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              className="otp-input"
            />
            <label
              for="usr"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              Enter New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="form-control rounded-pill"
              id="usr"
              placeholder="Enter New Password"
              onChange={handleChange}
              value={formData.newPassword}
            />
            <label
              for="usr"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="ConfirmPassword"
              className="form-control rounded-pill"
              id="usr"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
            />
            <Button
              variant="primary rounded-pill "
              style={{ marginRight: "330px" }}
              className="mt-3"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </div>
        <div className="col"></div>
      </div>
      {/* <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        marginRight="10px"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit1(e)}>
              <label for="usr" style={{ marginBottom: "10px" }}>
                Enter OTP
              </label>
              <OTPInput
                value={formData.resetToken}
                onChange={(e) => {
                  handleChange(e, "resetToken");
                }}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
              />
              <label
                for="usr"
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                Enter New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className="form-control rounded-pill"
                id="usr"
                placeholder="Enter New Password"
                onChange={handleChange}
                value={formData.newPassword}
              />
              <label
                for="usr"
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="ConfirmPassword"
                className="form-control rounded-pill"
                id="usr"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
              <Button
                variant="primary rounded-pill "
                style={{ marginRight: "330px", marginTop: "10px" }}
                type="submit"
              >
                Reset Password
              </Button>
            </form>
          </div>
          <div className="col"></div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default ResetPassword;

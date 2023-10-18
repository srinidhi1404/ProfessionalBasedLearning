import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./projectForm.css";
import { fetchApi } from "../../Utils/Request";
import "./projectForm.css";
import Footer from "../Footer/footer";
import NavbarLogout from "../NavLogout/navLogout";
import axios from "axios";
import moment from "moment"; // Import Moment.js
import { message } from "antd";
let userType = localStorage.getItem("userType");
const formDetails = {
  projectTitle: "",
  projectDescription: "",
  startDate: "",
  endDate: "",
  contactNumber: "",
  projectSummary: "",
  document: "",
  projectType: "",
};

const ProjectForm = () => {
  const [formData, setFormData] = useState({ ...formDetails });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [fieldErrors, setFieldErrors] = useState({
    projectTitle: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    contactNumber: "",
    projectSummary: "",
    projectType: "",
  });

  const options = [
    { value: "", label: "Select" },
    { value: true, label: "Public" },
    { value: false, label: "Private" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "projectType" ? value === "true" : value,
    }));
    // Clear the error message for the corresponding field
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let u = await axios.post(
      `http://localhost:3000/api/upload/image`,
      formData
    );
    if (u.data.status) {
      setPdfFile(u.data.secureUrl);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    if (formData.projectTitle === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        projectTitle: "Project Title is Required",
      }));
      hasErrors = true;
    }

    if (formData.projectDescription === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        projectDescription: "projectDescription is Required",
      }));
      hasErrors = true;
    }
    if (formData.startDate === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        startDate: "Start Date is Required",
      }));
      hasErrors = true;
    }
    if (formData.endDate === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "End Date is Required",
      }));
      hasErrors = true;
    }
    if (formData.contactNumber === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: "Contact is Required",
      }));
      hasErrors = true;
    }
    if (formData.projectSummary === "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        projectSummary: "Project Summary is Required",
      }));
      hasErrors = true;
    }
    if (hasErrors) {
      // There are errors, do not proceed with form submission
      return;
    }
    let userType = localStorage.getItem("userType");
    let payload = { ...formData };
    payload.document = pdfFile;
    if (userType === "guestUser") {
      let response = await fetchApi("/api/add/project", payload, "POST");
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
    } else if (userType === "student") {
      let response = await fetchApi("/student/add/project", payload, "POST");
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  return (
    <>
      {contextHolder}
      <div className="projectFormDiv1">
        <div className="NavbarLogout">
          <NavbarLogout />
        </div>
        <div className="div2">
          <div className="div3">
            <h1>Post a New Project</h1>
            <form onSubmit={handleSubmit} className="projectform">
              <div className="form-outline1">
                <label className="form-label " for="form2Example1">
                  Project Title:
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  className={`form-control ${
                    fieldErrors.projectTitle && "is-invalid"
                  }`}
                  placeholder="Enter Project Title"
                  value={formData.projectTitle}
                  name="projectTitle"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {fieldErrors.projectTitle && (
                  <div className="invalid-feedback">
                    {fieldErrors.projectTitle}
                  </div>
                )}
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Project Description:
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className={`form-control ${
                    fieldErrors.projectDescription && "is-invalid"
                  }`}
                  name="projectDescription"
                  value={formData.projectDescription}
                  placeholder="Describe your project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {fieldErrors.projectDescription && (
                  <div className="invalid-feedback">
                    {fieldErrors.projectDescription}
                  </div>
                )}
              </div>
              <div className="form-outline1">
                <label className="form-label">Start Date</label>
                <div className="date-wrap">
                  <input
                    type={passwordVisible ? "date" : "text"}
                    id="form2Example2"
                    className={`form-control ${
                      fieldErrors.startDate && "is-invalid"
                    }`}
                    name="startDate"
                    onFocus={togglePasswordVisibility}
                    value={formData.startDate}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {passwordVisible ? (
                    <div className="custom-placeHolder">mm/dd/yyyy</div>
                  ) : moment(formData.startDate).format("MM/DD/YYYY") ===
                    "Invalid date" ? (
                    <div className="custom-placeHolder">mm/yy/yyyy</div>
                  ) : (
                    <div className="custom-placeHolder">
                      {moment(formData.startDate).format("MM/DD/YYYY")}
                    </div>
                  )}
                  {fieldErrors.startDate && (
                    <div className="invalid-feedback">
                      {fieldErrors.startDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-outline1">
                <label className="form-label">End Date</label>

                <div className="date-wrap">
                  <input
                    type={passwordVisible1 ? "date" : "text"}
                    id="form2Example2"
                    className={`form-control ${
                      fieldErrors.endDate && "is-invalid"
                    }`}
                    name="endDate"
                    onFocus={togglePasswordVisibility1}
                    value={formData.endDate}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {passwordVisible1 ? (
                    <div className="custom-placeHolder">mm/dd/yyyy</div>
                  ) : moment(formData.endDate).format("MM/DD/YYYY") ===
                    "Invalid date" ? (
                    <div className="custom-placeHolder">mm/yy/yyyy</div>
                  ) : (
                    <div className="custom-placeHolder">
                      {moment(formData.endDate).format("MM/DD/YYYY")}
                    </div>
                  )}
                  {fieldErrors.endDate && (
                    <div className="invalid-feedback">
                      {fieldErrors.endDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Contact Number
                </label>
                <div className="wrap-con">
                  <input
                    type="number"
                    id="form2Example2"
                    className={`form-control ${
                      fieldErrors.contactNumber && "is-invalid"
                    }`}
                    name="contactNumber"
                    value={formData.contactNumber}
                    placeholder="Enter Your Contact Number"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {fieldErrors.contactNumber && (
                    <div className="invalid-feedback">
                      {fieldErrors.contactNumber}
                    </div>
                  )}
                  {userType === "student" ? (
                    <div className="con-code">+1</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Project Summary
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className={`form-control ${
                    fieldErrors.projectSummary && "is-invalid"
                  }`}
                  name="projectSummary"
                  value={formData.projectSummary}
                  placeholder="Summarize Your Project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {fieldErrors.projectSummary && (
                  <div className="invalid-feedback">
                    {fieldErrors.projectSummary}
                  </div>
                )}
              </div>
              <div className="form-outline1">
                <label className="form-label">Project Type</label>
                <br />
                <select
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={formData.projectType}
                  name="projectType"
                  className={`form-control ${
                    fieldErrors.projectType && "is-invalid"
                  }`}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.projectType && (
                  <div className="invalid-feedback">
                    {fieldErrors.projectType}
                  </div>
                )}
              </div>
              <div className="form-outline1">
                <label className="form-label">Upload File</label>
                <br />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadImage(e)}
                />
                <label>
                  {" "}
                  <h4 style={{ color: "red" }}>{loading ? "loading" : ""}</h4>
                </label>
              </div>
              <button type="submit" className="btn btn-primary " id="LogIn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectForm;

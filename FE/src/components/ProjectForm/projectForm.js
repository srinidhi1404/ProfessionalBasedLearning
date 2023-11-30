<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
import React, { useState } from "react";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./projectForm.css";
import { fetchApi } from "../../Utils/Request";
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
import { useNavigate } from "react-router-dom";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import { BASE_URL } from "../../constant/constant";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
const formDetails = {
  projectTitle: "",
  projectDescription: "",
  startDate: "",
  endDate: "",
  contactNumber: "",
  projectSummary: "",
  document: "",
  projectType: "",
  keywords: [],
};

const keyWords = [
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Data Science", label: "Data Science" },
  { value: "Engineering", label: "Engineering" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Computer Vision", label: "Computer Vision" },
  { value: "Algorithms", label: "Algorithms" },
  { value: "Software Development", label: "Software Development" },
  { value: "Web Development", label: "Web Development" },
  { value: "Database Management", label: "Database Management" },
  { value: "Cybersecurity", label: "Cybersecurity" },
];

const ProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...formDetails });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgError, setImageError] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
  const [selectedOptions, setSelectedOptions] = useState([]);
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  const [messageApi, contextHolder] = message.useMessage();
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    projectTitle: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    contactNumber: "",
    projectSummary: "",
    projectType: "",
  });

<<<<<<< HEAD
<<<<<<< HEAD
  const location = useLocation();
  const { item } = location.state || {};
  console.log(item , "iuoghoi")
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  const options = [
    { value: true, label: "Public" },
    { value: false, label: "Private" },
  ];

<<<<<<< HEAD
<<<<<<< HEAD
  useEffect(() => {
    if (item) {
      setFormData({
        projectTitle: item.projectTitle || "",
        projectDescription: item.projectDescription || "",
        startDate: item.startDate
          ? moment(item.startDate).format("YYYY-MM-DD")
          : "",
        endDate: item.endDate
          ? moment(item.endDate).format("YYYY-MM-DD")
          : "",
        contactNumber: item.contactNumber || "",
        projectSummary: item.projectSummary || "",
        projectType: item.projectType.toString() || "",
        projectId: item.projectId || "",
        document : item.document
      });
      setFileName(item.document)
      const keywords = keyWords.filter((kw) =>
        item.keywords.includes(kw.value)
      );
      setSelectedOptions(keywords);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
=======
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961

    if (name === "keywords") {
      setFormData((prevData) => ({
        ...prevData,
        keywords: value,
      }));
    } else if (name === "projectType") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "projectType" ? value === "true" : value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
<<<<<<< HEAD
<<<<<<< HEAD

=======
  
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
  
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    if (name === "startDate") {
      setIsStartDateSelected(true);
    }
  };

  const validateEndDate = () => {
    if (!isStartDateSelected && formData.endDate) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "Please select a start date first.",
      }));
    } else {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "",
      }));
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const uploadFile = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let u = await axios.post(`${BASE_URL}api/upload/image`, formData);
=======
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let u = await axios.post(
      `${BASE_URL}api/upload/image`,
      formData
    );
<<<<<<< HEAD
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    if (u.data.status) {
      setImageError(false);
      setFileName(e.target.files[0].name);
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

    if (moment(formData.endDate).isBefore(moment(formData.startDate))) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "End Date cannot be earlier than Start Date",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    let userType = localStorage.getItem("userType");
    let payload = { ...formData };
<<<<<<< HEAD
<<<<<<< HEAD
    let obj = {keywords: selectedOptions.map((val)=>val.value)}
    let editPayload = {...formData ,...obj}
    payload.document = pdfFile;

    let response;

      if (item) {
        if (userType === "guestUser") {
          response = await fetchApi("api/edit/project", editPayload, "POST");
        } else if (userType === "student") {
          response = await fetchApi(
            "student/edit/project",
            payload,
            "POST"
          );
        }

        if (response.status === true) {
          messageApi.open({
            type: "success",
            content: response.message,
          });
  
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: response.message,
          });
        }
      }
      else {
        if (userType === "guestUser") {
          response = await fetchApi("api/add/project", payload, "POST");
        } else if (userType === "student") {
          response = await fetchApi(
            "/student/add/project",
            payload,
            "POST"
          );
        }
        if (response.status === true) {
          messageApi.open({
            type: "success",
            content: response.message,
          });
  
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: response.message,
          });
        }
      }


      
    
=======
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    payload.document = pdfFile;
    if (userType === "guestUser") {
      let response = await fetchApi("/api/add/project", payload, "POST");
      if (response.status === true) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
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
        navigate("/dashboard");
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
        });
      }
    }
<<<<<<< HEAD
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {contextHolder}
      <div className="projectFormDiv1">
        <div className="div2">
          <div className="div3">
<<<<<<< HEAD
<<<<<<< HEAD
            <h1>{item ? "Edit Project" : "Post a New Project"}</h1>
=======
            <h1>Post a New Project</h1>
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
            <h1>Post a New Project</h1>
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
            <form onSubmit={handleSubmit} className="projectform">
              <div className="form-outline1">
                <label className="form-label " for="form2Example1">
                  Project Title:
                </label>
                <input
                  type="text"
                  id="form2Example1"
<<<<<<< HEAD
<<<<<<< HEAD
                  className={`form-control ${fieldErrors.projectTitle && "is-invalid"
                    }`}
=======
                  className={`form-control ${
                    fieldErrors.projectTitle && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                  className={`form-control ${
                    fieldErrors.projectTitle && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
                <textarea
                  type="text"
                  id="form2Example2"
<<<<<<< HEAD
<<<<<<< HEAD
                  className={`form-control ${fieldErrors.projectDescription && "is-invalid"
                    }`}
=======
                  className={`form-control ${
                    fieldErrors.projectDescription && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                  className={`form-control ${
                    fieldErrors.projectDescription && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
<<<<<<< HEAD
<<<<<<< HEAD
                    className={`form-control ${fieldErrors.startDate && "is-invalid"
                      }`}
=======
                    className={`form-control ${
                      fieldErrors.startDate && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                    className={`form-control ${
                      fieldErrors.startDate && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                    name="startDate"
                    onFocus={togglePasswordVisibility}
                    value={formData.startDate}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    min={getCurrentDate()}
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
             
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
             
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
              <div className="form-outline1">
                <label className="form-label">End Date</label>
                <div className="date-wrap">
                  <input
                    type={passwordVisible1 ? "date" : "text"}
                    id="form2Example2"
<<<<<<< HEAD
<<<<<<< HEAD
                    className={`form-control ${fieldErrors.endDate && "is-invalid"
                      }`}
=======
                    className={`form-control ${
                      fieldErrors.endDate && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                    className={`form-control ${
                      fieldErrors.endDate && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                    name="endDate"
                    onFocus={togglePasswordVisibility1}
                    onBlur={validateEndDate}
                    value={formData.endDate}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    min={formData.startDate}
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
<<<<<<< HEAD
<<<<<<< HEAD
                    className={`form-control ${fieldErrors.contactNumber && "is-invalid"
                      }`}
=======
                    className={`form-control ${
                      fieldErrors.contactNumber && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                    className={`form-control ${
                      fieldErrors.contactNumber && "is-invalid"
                    }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
                </div>
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Project Summary
                </label>
                <input
                  type="text"
                  id="form2Example2"
<<<<<<< HEAD
<<<<<<< HEAD
                  className={`form-control ${fieldErrors.projectSummary && "is-invalid"
                    }`}
=======
                  className={`form-control ${
                    fieldErrors.projectSummary && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                  className={`form-control ${
                    fieldErrors.projectSummary && "is-invalid"
                  }`}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
<<<<<<< HEAD
<<<<<<< HEAD
                  className={`form-control ${fieldErrors.projectType && "is-invalid"
                    }`}
                >
                  {!item ? <option value="">Select</option> : ""}

=======
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                  className={`form-control ${
                    fieldErrors.projectType && "is-invalid"
                  }`}
                >
                  <option value="">Select</option>
<<<<<<< HEAD
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
                <label className="form-label" for="form2Example2">
                  Select Keywords
                </label>
                <Select
                  options={keyWords}
                  isMulti
<<<<<<< HEAD
<<<<<<< HEAD
                  value={selectedOptions}
                  isOptionDisabled={(option) => selectedOptions.length >= 5 && !selectedOptions.some((selected) => selected.value === option.value)}
                  onChange={(selectedOptions) => {
                    // Limit the number of selections to 5
                    const limitedSelection = selectedOptions.slice(0, 5);
                    setSelectedOptions(limitedSelection);

                    handleChange({
                      target: {
                        name: "keywords",
                        value: limitedSelection.map((option) => option.value),
=======
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                  onChange={(selectedOptions) => {
                    handleChange({
                      target: {
                        name: "keywords",
                        value: selectedOptions.map((option) => option.value),
<<<<<<< HEAD
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                      },
                    });
                  }}
                />
              </div>

              <div className="form-outline1">
                <label className="form-label">Upload File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="upload"
                  hidden
<<<<<<< HEAD
<<<<<<< HEAD
                  onChange={(e) => uploadFile(e)}
=======
                  onChange={(e) => uploadImage(e)}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                  onChange={(e) => uploadImage(e)}
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
                />
                <label for="upload" className="fileupload">
                  {loading ? "Loading" : "Choose file"}
                </label>{" "}
                <label className="form-label">{fileName}</label>
                {imgError ? (
                  <label className="doc-err">
                    Project Document is Required
                  </label>
                ) : null}
              </div>

              <button type="submit" className="btn btn-primary " id="LogIn">
<<<<<<< HEAD
<<<<<<< HEAD
                {
                  item ? "update" : "Submit"
                }

              </button>
            </form>


=======
                Submit
              </button>
            </form>
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
                Submit
              </button>
            </form>
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961

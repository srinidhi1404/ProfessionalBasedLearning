import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./projectForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchApi } from "../../Utils/Request";
import * as XLSX from "xlsx";
import Footer from "../Footer/footer";
import NavbarLogout from "../NavLogout/navLogout";

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
  const [errors, setErrors] = useState(false);
  const [items, setItems] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const options = [
    { value: "", label: "Select" },
    { value: true, label: "Public" },
    { value: false, label: "Private" },
  ];

  useEffect(() => {}, [pdfFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("event", e.target);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "projectType" ? value === "true" : value,
    }));
  };

  console.log("formdata", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.projectTitle == "") {
      notify1("projectTitle is Required");
      setErrors(true);
    }
    if (formData.projectDescription == "") {
      notify1("projectDescription is Required");
      setErrors(true);
    }
    if (formData.contactNumber == "") {
      notify1("contactNumber is Required");
      setErrors(true);
    }

    let userType = localStorage.getItem("userType");
    // console.log("userType",userType);
    if (errors != true) {
      if (userType == "guestUser") {
        let payload = { ...formData };
        payload.document = pdfFile;

        let response = await fetchApi("/api/add/project", payload, "POST");
        if (response.status === true) {
          notify(response.message);
        } else {
          notify1(response.message);
        }
      } else if (userType == "student") {
        let response = await fetchApi("/student/add/project", formData, "POST");
        if (response.status === true) {
          notify(response.message);
        } else {
          notify1(response.message);
        }
        console.log("response data", response.status);
      }
    }
  };

  // const handleFileUpload = async (e) => {
  //   let file = e.target.files[0];
  //   setPdfFile(URL.createObjectURL(file));
  //   setFormData({ ...formData, document: pdfFile });
  // };

  const handleFileUpload = async (e) => {
    let file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file); // Create the URL
  
    setPdfFile(fileUrl); // Set pdfFile with the URL
    setFormData((prevData) => ({ ...prevData, document: fileUrl })); // Set document in the form data
  };
  

  const notify = (msg) => {
    toast.success(msg);
  };

  const notify1 = (msg) => {
    toast.error(msg);
  };
  console.log("fileeeee>>>>", pdfFile);
  return (
    <>
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
                  className="form-control"
                  placeholder="Enter Project Title"
                  value={formData.projectTitle}
                  name="projectTitle"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Project Description:
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className="form-control"
                  name="projectDescription"
                  value={formData.projectDescription}
                  placeholder="Describe your project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label>Start Date</label>
                <input
                  type="date"
                  id="form2Example2"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  placeholder="Describe your project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label>End Date</label>

                <input
                  type="date"
                  id="form2Example2"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  placeholder="Describe your project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className="form-control"
                  name="contactNumber"
                  value={formData.contactNumber}
                  placeholder="Enter Your Contact Number"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label className="form-label" for="form2Example2">
                  Project Summary
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className="form-control"
                  name="projectSummary"
                  value={formData.projectSummary}
                  placeholder="Summarize Your Project"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-outline1">
                <label>Project Type</label>
                <br />
                <select
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={formData.projectType}
                  name="projectType"
                  className="form-control"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-outline1">
                <label>Upload File</label>
                <br />
                <input
                  type="file"
                  //  value={formData.document}
                  name="document"
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </div>
              <ToastContainer icon={false} />
              <button
                type="submit"
                className="btn btn-primary "
                id="LogIn"
              >
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

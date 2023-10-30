import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TablePagination from "@mui/material/TablePagination";
import StatusButton from "../StatusButton/statusButton";
import { fetchApi } from "../../Utils/Request";
import "./Request.css"; // Import your CSS file for styling
import Switch from "@mui/material/Switch";

const Request = () => {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectTitles, setProjectTitles] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(""); // Store the selected projectId
  const [toggleModel, setToggleModel] = useState(false); // Toggle state for the "Model" button
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const studentUrl = "http://localhost:3000/student/get/request";
  const guestUrl = "http://localhost:3000/api/get/request";

  useEffect(() => {
    GetPro();
  }, []); // Fetch project details when the component mounts

  useEffect(() => {
    if (projectTitles.length > 0) {
      setSelectedProjectId(projectTitles[0].projectId); // Select the first projectId by default
    }
  }, [projectTitles]); // Set the default projectId when projectTitles change

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDocumentDownload = (documentUrl) => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = documentUrl;
    link.setAttribute("download", "document.pdf"); // Set the desired file name
    link.style.display = "none";

    // Append the anchor to the body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the anchor
    document.body.removeChild(link);
  };

  const handleToggleModel = () => {
    setToggleModel((prevToggleModel) => !prevToggleModel); // Toggle the "Model" button state
  };

  const GetPro = async () => {
    let response = await fetchApi("/api/get/request", "", "GET");
    if (response.status) {
      setDetails(response?.data);
      const projectTitlesWithIds = [...new Set(response?.data.map((item) => ({ projectId: item.projectId, projectTitle: item.projectTitle })))]; // Get unique project titles with their corresponding project IDs
      setProjectTitles(projectTitlesWithIds);
    }
  };

  // Filter the details based on the selectedProjectId
  const filteredDetails = details.filter((item) => item.projectId === selectedProjectId);

  return (
    <div className="request-container">
      {/* Left Navigation Component */}
      <div className="left-navigation">
        <h2>Project Title</h2>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          {projectTitles.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {filteredDetails.length > 0 && (
          <div>
            <h3>Project Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Experience</th>
                  <th>Skill</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails.slice().map((item, index) => (
                  <tr key={index}>
                    <td>{item.projectTitle}</td>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.experience}</td>
                    <td>{item.skill}</td>
                    <td>pending</td>
                    <td>
                     approve
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={10} // You may need to update this count based on your actual data count
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;

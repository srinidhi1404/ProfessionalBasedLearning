import React from "react";
import { useLocation } from "react-router-dom";
import "./ViewProject.css";
import { fetchApi } from "../../Utils/Request";
import { useNavigate } from "react-router-dom";
const ViewAdminProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state.project;
  const acceptReject = async (arg) => {
    let payload = {
      projectId: project.projectId,
      status: arg,
    };
    let response = await fetchApi("admin/approve", payload, "POST");
    if (response.status) {
      setTimeout(() => {
        navigate("/project-list");
      }, 2000);
    }
  };

  return (
    <>
      <div className="view-project-prent">
        <div className="view-project-container">
          {project ? (
            <>
              <h1 style={{ color: "#006747" }}>{project.projectTitle}</h1>
              <p>
                <b>{project.projectDescription}</b>
              </p>
              <div className="project-text-wrap">
                <p>
                  <strong>Start Date:</strong> {project.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {project.endDate}
                </p>
              </div>

              <p>
                <strong>Project Type:</strong> {project.projectType}
              </p>
              <p>
                <strong>Contact Number:</strong> {project.contactNumber}
              </p>

              <p>
                <strong>Project Summary:</strong> {project.projectSummary}
              </p>

              <p>
                <strong>Document:</strong>{" "}
                <a
                  href={project.document}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Document
                </a>
              </p>
              <div className="project-text-wrap">
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Disable:</strong> {project.disable}
                </p>
                <p>
                  <strong>Flag:</strong> {project.flag}
                </p>
                <p>
                  <strong>User ID:</strong> {project.userId}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    rowGap: "22px",
                    gap: "55px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      acceptReject("ACCEPTED");
                    }}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      acceptReject("REJECTED");
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p style={{ color: "#006747" }}>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAdminProject;

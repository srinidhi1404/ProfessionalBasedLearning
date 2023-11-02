import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { BsFlagFill } from "react-icons/bs";
import "./ViewProject.css";
import ProjectRequestModal from "./ProjectRequestModal ";

const ViewProject = () => {
  const location = useLocation();
  let userEmail = localStorage.getItem("email");
  const [project, setProject] = useState(
    location.state ? location.state.project : null
  );
  const flagCheck = userEmail === project.email ? false : true;
  console.log(project, "123454");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showerrortoast, setshowerrortoast] = useState(false);
  const [showflagtoast, setshowflagtoast] = useState(false);
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");
  const state = userType || token;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const flagProject = (status) => {
    if (status) {
      setshowerrortoast(true);
      setTimeout(() => {
        setshowerrortoast(false);
      }, 2000);
    } else {
      const flagCommentData = {
        projectId: project.projectId,
        flag: true,
      };
      axios
        .post("http://localhost:3000/api/flag/project", flagCommentData)
        .then((response) => {
          if (response.status) {
            setshowflagtoast(true);
            setTimeout(() => {
              setshowflagtoast(false);
            }, 2000);
            setProject({ ...project, flag: true });
            console.log(project);
          } else {
            // setshowerrortoast(true);
            // setTimeout(() => {
            //   setshowerrortoast(false);
            // }, 2000);
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="view-project-prent">
      <div className="view-project-container">
        {project ? (
          <>
            <div className="flag-flex">
              {" "}
              <h1 style={{ color: "#006747" }}>{project.projectTitle}</h1>{" "}
              {state ? (
                <>
                  {flagCheck ? (
                    <span
                      className="flag"
                      onClick={() => flagProject(project.flag)}
                    >
                      <BsFlagFill
                        className="hover:text-red-600"
                        style={{
                          color: project.flag ? "red" : "grey",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
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
            </div>
          </>
        ) : (
          <p style={{ color: "#006747" }}>Loading...</p>
        )}

        {state ? (
          <>
            {flagCheck ? (
              <Button
                onClick={openModal}
                style={{ backgroundColor: "#006747", color: "white" }}
              >
                Request Project
              </Button>
            ) : null}
          </>
        ) : null}
        {showflagtoast ? (
          <div className="custom-success-message">
            Project flagged successfully
          </div>
        ) : (
          ""
        )}
        {showerrortoast ? (
          <div className="custom-error-message">Project already flagged</div>
        ) : (
          ""
        )}

        <ProjectRequestModal
          open={isModalOpen}
          onClose={closeModal}
          projectId={project.projectId}
          projectTitle={project.projectTitle}
          projectEmail={project.email}
        />
      </div>
    </div>
  );
};

export default ViewProject;

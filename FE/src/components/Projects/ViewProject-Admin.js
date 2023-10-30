import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import "./ViewProject.css";
import ProjectRequestModal from "./ProjectRequestModal ";
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
    let response = await fetchApi("/admin/approve", payload, "POST");
    if (response.status) {
      navigate("/project-list");
    }
  };

  return (
    <div className="view-project-container">
      {project ? (
        <>
          {/* <Avatar
            src={project.image}
            alt="Project Image"
            sx={{
              width: '100px',
              height: '100px',
             

           float:'right',
              cursor: 'pointer',
            }}
            // onClick={handleImageClick}
          /> */}
          <h1>{project.projectTitle}</h1>
          <p>
            <b>{project.projectDescription}</b>
          </p>
          <p>
            <strong>Start Date:</strong> {project.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {project.endDate}
          </p>
          <p>
            <strong>Contact Number:</strong> {project.contactNumber}
          </p>
          <p>
            <strong>Project Summary:</strong> {project.projectSummary}
          </p>
          <p>
            <strong>Project Type:</strong> {project.projectType}
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
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          {/* <p>
            <strong>Image:</strong> {project.image ? <img src={project.image} alt="Project Image" /> : 'No image available'}
          </p> */}
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
          {/* <h2>Comments:</h2>
          <ul>
            {project.comment.map((comment) => (
              <li key={comment.commentId}>
                <p>
                  <strong>
                    {comment.firstName} {comment.secondName}:
                  </strong>{' '}
                  {comment.commentText}
                </p>
              </li>
            ))}
          </ul> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewAdminProject;

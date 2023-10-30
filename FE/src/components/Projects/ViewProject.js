import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button,Avatar  } from '@mui/material';
import './ViewProject.css';
import ProjectRequestModal from './ProjectRequestModal '

const ViewProject = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [project, setProject] = useState(null);

  const projectId = location.state ? location.state.projectId : null;
  const projectEmail = location.state ? location.state.projectEmail : null;
  const projectTitle = location.state ? location.state.projectTitle : null;
  const userApi = 'http://localhost:3000/student/all/project';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(userApi, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        const filteredData = response.data.data.find(
          (item) => item.projectId === projectId
        );

        if (filteredData) {
          setProject(filteredData);
        } else {
          console.error(`No data found for projectId: ${projectId}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

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
            <strong>Document:</strong>{' '}
            <a href={project.document} target="_blank" rel="noopener noreferrer">
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

      <Button
        onClick={openModal}
        style={{ backgroundColor: '#006747', color: 'white' }}
      >
        Request Project
      </Button>

      <ProjectRequestModal
        open={isModalOpen}
        onClose={closeModal}
        projectId={projectId}
        projectTitle={projectTitle}
        projectEmail={projectEmail}
      />
    </div>
  );
};

export default ViewProject;

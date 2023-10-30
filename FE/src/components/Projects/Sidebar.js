import React from 'react';
import './Sidebar.css'
const Sidebar = () => {
  const projects = [
    { projectId: 1, projectTitle: 'Project 1' },
    { projectId: 2, projectTitle: 'Project 2' },
    { projectId: 3, projectTitle: 'Project 3' },
    // Add more project objects as needed
  ];

  return (
    <div className="sidebar">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.projectId}>{project.projectTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

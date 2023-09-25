import React from "react";
import Navbar from "../NavBar/navBar";
import Dashboard from "../Dashboard/dashboard";
import { useNavigate } from "react-router-dom";
import "./project.css";

const Projects = () => {
  return (
    <>
      <div className="navbarCss">
        <Navbar />
      </div>

      {/* <div className="projectDiv1">
        <input
          type="text"
          id="form2Example2"
          className="form-control"
          name="endDate"
          value={{}}
          placeholder="Describe your project"
          onChange={(e) => {
            {
            }
          }}
        />
      </div> */}
    </>
  );
};

export default Projects;

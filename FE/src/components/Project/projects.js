import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/navBar";
import Dashboard from "../Dashboard/dashboard";
import { useNavigate } from "react-router-dom";
import "./project.css";

import axios from "axios";

const Projects = () => {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const userApi = "http://localhost:3000/student/all/project";
  const guestApi = "http://localhost:3000/api/all/project";
  const [project, setProject] = useState([]);
  const userType = localStorage.getItem("userType");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (userType === "guestUser") {
      axios
        .get(guestApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          setProject(response.data.data);
          setFilteredData(response.data.data);
        })
        .catch((error) => {});
    } else if (userType === "student") {
      axios
        .get(userApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          setProject(response.data.data);
          setFilteredData(response.data.data);
        })
        .catch((error) => {});
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = project.filter((item) =>
      item.projectTitle.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filteredResults);
  };
  return (
    <>
      <div className="navbarCss">
        <Navbar />
      </div>
      <div className="newparent">
        <h1>Projects</h1>

        <div className="newsearch">
          <input
            type="text"
            placeholder="Search Project by name"
            value={searchQuery}
            onChange={handleSearch}
          ></input>
        </div>
        {filteredData?.map((item, index) => {
          return (
            <div className="newcard" key={index}>
              <h4>Project Title: {item.projectTitle} </h4>
              <h5>{item.projectDescription}</h5>
              <div class="newbutton">
                <div class="text">VIEW PROJECTS</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;

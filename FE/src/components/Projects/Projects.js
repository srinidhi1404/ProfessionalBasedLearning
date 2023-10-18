import React, { useState, useEffect } from "react";
import "./projects.css";
import axios from "axios";
import NavbarLogout from "../NavLogout/navLogout";

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
        <NavbarLogout />
      </div>
      <div className="newparent">
        <h1>Projects</h1>

        <div className="newsearch">
          <input
            type="text"
            placeholder="Search by project name"
            value={searchQuery}
            onChange={handleSearch}
          ></input>
        </div>
        {filteredData?.map((item, index) => {
          return (
            <div className="newcard" key={index}>
              <h5>Project Title: {item.projectTitle} </h5>
              <p>{item.projectDescription}</p>
              <div className="newbutton">
                <div className="text">VIEW PROJECTS</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;

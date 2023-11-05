import React, { useState, useEffect } from "react";
import "../Projects/projects.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import PublicNavbar from "./PublicNavbar";
import { BASE_URL } from "../../constant/constant";
const PublicProject = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViaW5qb2VAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiZWJpbiIsInNlY29uZE5hbWUiOiJqb2UiLCJpYXQiOjE2OTQ3NjA1NTd9.pkVVZVBUJjPYMTLHyjpPrPLLmDTCHXZnrumTjq-Iwy4";
  const [searchQuery, setSearchQuery] = useState("");
  const userApi = `${BASE_URL}admin/all/project`;
  const [project, setProject] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dataFromChild = ""
  const [mainLoader, setMainLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMainLoader(true);
    axios
      .get(userApi, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setProject(response.data.data);
        setFilteredData(response.data.data);
        setMainLoader(false);
      })
      .catch((error) => {
        setMainLoader(false);
      });
  }, [dataFromChild , userApi]);

  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   const filteredResults = project.filter((item) =>
  //     item.projectTitle.toLowerCase().includes(query.toLowerCase())
  //   );

  //   setFilteredData(filteredResults);
  // };


  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   const filteredResults = project.filter((item) => {
  //     const lowercaseKeywords = item.keywords.map(keyword => keyword.toLowerCase());
  //     return (
  //       item.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
  //       lowercaseKeywords.some(keyword => keyword.includes(query.toLowerCase()))
  //     );
  //   });
  
  //   setFilteredData(filteredResults);
  // };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredResults = project.filter((item) => {
      const lowercaseKeywords = item.keywords.join(' ').toLowerCase();
      return (
        item.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
        lowercaseKeywords.includes(query.toLowerCase())
      );
    });
  
    setFilteredData(filteredResults);
  };
  
  const onCLickSpecific = (item) => {
    navigate("/viewprojects", {
      state: {
        project: item,
      },
    });
  };

  return (
    <>
      {mainLoader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <PublicNavbar />
          <div className="newparent">
            <h1>Projects </h1>

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
                  <div className="newcardnew">
                    <div className="content-card">
                      <h5>Project Title: {item.projectTitle} </h5>
                      <p>{item.projectDescription}</p>
                    </div>
                  </div>
                  <div className="cmt-btn-wrap">
                    <div className="newbutton">
                      <div
                        className="text"
                        onClick={() => onCLickSpecific(item)}
                      >
                        VIEW PROJECT
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PublicProject;

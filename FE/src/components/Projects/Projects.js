/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./projects.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProjectComments from "../ProjectComments/ProjectComments";

const Projects = () => {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const userApi = "http://localhost:3000/student/all/project";
  const guestApi = "http://localhost:3000/api/all/project";
  const [project, setProject] = useState([]);
  const userType = localStorage.getItem("userType");
  const [filteredData, setFilteredData] = useState([]);
  const [dataFromChild, setDataFromChild] = useState("");
  const [state, setState] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const defaultImageLink =
    "data:image/jpeg;base64,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";
  const [showReplyInput, setShowReplyInput] = useState(
    new Array(filteredData?.length).fill(false)
  );

  const updateData = (data) => {
    setDataFromChild(data);
  };

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
  }, [dataFromChild]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = project.filter((item) =>
      item.projectTitle.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const onCLickSpecific = (item) => {
    console.log("item", item);

    navigate("/viewprojects", {
      state: {
        projectId: item.projectId,
        projectTitle: item.projectTitle,
        projectEmail: item.email,
      },
    });
  };

  const toggleReplies = (index) => {
    let updatedReplies = [...showReplyInput];
    updatedReplies[index] = !updatedReplies[index];
    setShowReplyInput(updatedReplies);
  };

  const handleImageClick = (projectId, userId, email) => {
    // Navigate to '/userdetails' and pass projectId, userId, and email as state
    navigate("/userdetails", {
      state: {
        projectId: projectId,
        userId: userId,
        email: email,
      },
    });
  };

  return (
    <>
      <div className="newparent">
        <h1>{`Projects - [${filteredData.length}]`}</h1>

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
                <div className="text" onClick={() => onCLickSpecific(item)}>
                  VIEW PROJECT
                </div>
              </div>
              {/* Circular image design */}
              {/* <div
                className="circular-image"
                onClick={() =>
                  handleImageClick(item.projectId, item.userId, item.email)
                }
              >
                <img
                  className="project-image"
                  src={item.image || defaultImageLink}
                  alt="Project Image"
                />
              </div> */}

              <ProjectComments
                state={state}
                setState={setState}
                showReplyInput={showReplyInput[index]}
                setShowReplyInput={setShowReplyInput}
                toggleRepliesnew={() => toggleReplies(index)}
                dummyComments={item.comment}
                sendDataToParent={updateData}
                projectId={item.projectId}
              />
              <div className="commentcount">
                {" "}
                {item.comment?.filter((b) => b.disable !== 1).length}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;

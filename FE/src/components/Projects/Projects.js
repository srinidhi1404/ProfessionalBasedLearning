import React, { useState, useEffect } from "react";
import "./projects.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import COMMentImg from "../../asset/image/coom.png";
import ProjectComments from "../ProjectComments/ProjectComments";
import defaultImageLink from "../../asset/image/newdummyprofile";
import Loader from "../Loader/Loader";
import { BASE_URL } from "../../constant/constant";
const Projects = () => {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const userApi = `${BASE_URL}student/all/project`;
  const guestApi = `${BASE_URL}api/all/project`;
  const [project, setProject] = useState([]);
  const userType = localStorage.getItem("userType");
  const [filteredData, setFilteredData] = useState([]);
  const [dataFromChild, setDataFromChild] = useState("");
  const [mainLoader, setMainLoader] = useState(false);
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  const initialLoad = true;
  const [showReplyInput, setShowReplyInput] = useState(
    new Array(filteredData?.length).fill(false)
  );

  const updateData = (data) => {
    setDataFromChild(data);
  };

  useEffect(() => {
    if (userType === "guestUser") {
      if (initialLoad) {
        setMainLoader(true);
      }
      axios
        .get(guestApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          let data = response.data.data.filter(
            (ele) => ele.status === "ACCEPTED" && ele.disable !== 1
          );
          setProject(data);
          setFilteredData(data);
          setMainLoader(false);
        })
        .catch((error) => {
          setMainLoader(false);
        });
    } else {
      setMainLoader(true);
      axios
        .get(userApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          let data = response.data.data.filter(
            (ele) => ele.status === "ACCEPTED" && ele.disable !== 1
          );
          setProject(data);
          setFilteredData(data);
          setMainLoader(false);
        })
        .catch((error) => {
          setMainLoader(false);
        });
    }
  }, [dataFromChild, initialLoad, guestApi, token, userApi, userType]);

  //   const handleSearch = (e) => {
  //     const query = e.target.value;
  //     setSearchQuery(query);
  // console.log(project.keywords , "filteredResults")
  //     const filteredResults = project.filter((item) =>
  //       item.projectTitle.toLowerCase().includes(query.toLowerCase())
  //     );

  //     setFilteredData(filteredResults);
  //   };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredResults = project.filter((item) => {
      const lowercaseKeywords = item.keywords.join(" ").toLowerCase();
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

  const toggleReplies = (index) => {
    let updatedReplies = [...showReplyInput];
    updatedReplies[index] = !updatedReplies[index];
    setShowReplyInput(updatedReplies);
  };

  const handleImageClick = (projectId, userId, email) => {
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
      {mainLoader && dataFromChild === "" ? (
        <div>
          <Loader />
        </div>
      ) : (
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
                <div className="newcardnew">
                  <div className="content-card">
                    <h5>Project Title: {item.projectTitle} </h5>
                    <p>{item.projectDescription}</p>
                  </div>

                  <div className="imag-card">
                    <div
                      className="circular-image"
                      onClick={() =>
                        handleImageClick(
                          item.projectId,
                          item.userId,
                          item.email
                        )
                      }
                    >
                      <img
                        className="project-image"
                        src={item.image || defaultImageLink}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="cmt-btn-wrap">
                  <div className="newbutton">
                    <div className="text" onClick={() => onCLickSpecific(item)}>
                      VIEW PROJECT
                    </div>
                  </div>
                  <div className="comment-count-wrap">
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
                      <img src={COMMentImg} alt=""></img>
                      <div className="cmt-con">
                        {item.comment?.filter((b) => b.disable !== 1).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Projects;

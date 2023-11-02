import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Request.css";
import { useLocation } from "react-router-dom";
import { BsFlagFill } from "react-icons/bs";
import defaultImageLink from "../../asset/image/defaultProfile.jpeg";
import Loader from "../Loader/Loader";
const UserDetails = () => {
  const location = useLocation();
  let userEmail = localStorage.getItem("email");
  const { projectId, userId, email } = location.state;
  const flagCheck = userEmail === email ? false : true;
  console.log(flagCheck);
  const [mainLoader, setMainLoader] = useState(false);
  const [showerrortoast, setshowerrortoast] = useState(false);
  const [showflagtoast, setshowflagtoast] = useState(false);
  const apiEndpoint = "http://localhost:3000/api/user/detail";
  const requestData = {
    userId: userId,
    email: email,
  };
  const handleImageClick = () => {
    document.getElementById("upload").click();
  };
  const flagUser = (status) => {
    if (status) {
      setshowerrortoast(true);
      setTimeout(() => {
        setshowerrortoast(false);
      }, 2000);
    } else {
      const flagCommentData = {
        userId: userData.id,
        email: userData.email,
        flag: true,
      };
      axios
        .post("http://localhost:3000/api/flag/user", flagCommentData)
        .then((response) => {
          if (response.status) {
            setshowflagtoast(true);
            setTimeout(() => {
              setshowflagtoast(false);
            }, 2000);
            setUserData({ ...userData, flag: true });
            console.log(userData);
          } else {
            // setshowerrortoast(true);
            // setTimeout(() => {
            //   setshowerrortoast(false);
            // }, 2000);
          }
        })
        .catch((error) => { });
    }
  };
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(null);
  console.log(userData, "userData")
  useEffect(() => {
    setMainLoader(true);
    axios
      .post(apiEndpoint, requestData)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data);
          // console.log(response.data.projectCount);
          setUserData(response.data.user);
          setMainLoader(false);
        }
      })
      .catch((error) => {
        setMainLoader(false);
      });
  }, [token]);
  const handleCall = () => {
    window.location.href = `tel:${userData.contact}`;
  };

  const handleMail = () => {
    window.location.href = `mailto:${userData?.email}`;
  };
  return (
    <>
      {mainLoader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="profileDiv1">
          <div className="userprofileBg">
          </div>
          <div className="profileDiv4">
            <div className="profile-con">
              <div className="dummyDiv"></div>
              <div className="profileDiv5" >
                <img src={userData?.image || defaultImageLink} alt="logo" />
              </div>
            </div>

            <div className="Profile-card">

              <div className="profileDiv6">
                {userData ? (
                  <>
                    <div className="flag-flexNew">
                      {" "}
                      <h2
                        className="AlignItems"
                        style={{ textAlign: "center", marginBottom: "10px" }}
                      >
                        {userData?.firstName}
                        {userData?.secondName}
                      </h2>{" "}
                      {flagCheck ? (
                        <span
                          className="flag "
                          onClick={() => flagUser(userData?.flag)}
                        >
                          <BsFlagFill
                            className="hover:text-red-600"
                            style={{
                              color: userData?.flag ? "red" : "grey",
                              cursor: "pointer",
                            }}
                          />
                        </span>
                      ) : null}
                    </div>

                    <div className="button-container">
                      {
                        userData?.contact ? <button className="styled-button" onClick={handleCall}>
                          <span className="call-icon">   {userData?.contact ? userData?.contact : ""}</span>

                        </button> : ""
                      }

                      <button className="styled-button" onClick={handleMail}>
                        <span className="mail-icon">Mail Me</span>
                      </button>
                    </div>
                    <div className="button-container">
                      <h3>{userData?.education ? userData?.education : ""}</h3>
                    </div>
                    <div className="button-containerNew">
                      <p>{userData?.intro ? userData?.intro : ""}</p>
                    </div>

                  </>
                ) : (
                  ""
                )}
                {showflagtoast ? (
                  <div className="custom-success-message">
                    User flagged successfully
                  </div>
                ) : (
                  ""
                )}
                {showerrortoast ? (
                  <div className="custom-error-message">User already flagged</div>
                ) : (
                  ""
                )}
              </div>
            </div>


            {/* {userData?.data?.projects.length > 0 ? (
        <div className="profileDiv7">
          <h2 className="mb-4">Project Posted</h2>
          <div className="profileDiv8">
            <Table
              data={
                userType === "student"
                  ? UserDetail.data?.projects
                  : GuestUserDetail.data?.projects
              }
            />
          </div>
        </div>
      ) : (
        <div className="text-center profileDiv7 my-3">
          <p className="text-xl font-semibold">No projects posted yet</p>
        </div>
      )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;

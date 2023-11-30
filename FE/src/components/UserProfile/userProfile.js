import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";
import Table from "../Table/table";
import Loader from "../Loader/Loader";
import defaultImageLink from "../../asset/image/defaultProfile.jpeg";
import { BASE_URL } from "../../constant/constant";
const UserProfile = () => {
  const userApi = `${BASE_URL}student/student-details`;
  const guestApi = `${BASE_URL}api/user-details`;
  const token = localStorage.getItem("token");
  const [GuestUserDetail, SetGuestUserDetail] = useState("");
  const [UserDetail, SetUserDetail] = useState("");
  const [ShowSave, setShowSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [mainLoader, setMainLoader] = useState(false);
  const [values, setValues] = useState({
    document: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const getDate = () => {
    if (userType === "guestUser") {
      setMainLoader(true);
      axios
        .get(guestApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          SetGuestUserDetail(response.data);
          setImage(response.data.data.user.image);
          setMainLoader(false);
        })
        .catch((error) => {
          setMainLoader(false);
        });
    } else if (userType === "student") {
      setMainLoader(true);
      axios
        .get(userApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          SetUserDetail(response.data);
          setImage(response.data.data.user.image);
          setMainLoader(false);
        })
        .catch((error) => {
          setMainLoader(false);
        });
    }
  };
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    const getDate = () => {
      if (userType === "guestUser") {
        setMainLoader(true);
        axios
          .get(guestApi, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            SetGuestUserDetail(response.data);
            setImage(response.data.data.user.image);
            setMainLoader(false);
          })
          .catch((error) => {
            setMainLoader(false);
          });
      } else if (userType === "student") {
        setMainLoader(true);
        axios
          .get(userApi, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            SetUserDetail(response.data);
            setImage(response.data.data.user.image);
            setMainLoader(false);
          })
          .catch((error) => {
            setMainLoader(false);
          });
      }
    };
    getDate()
  }, [guestApi , token , userApi , userType ] );


  const handlePicUploadGuest = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      const response = await axios.post(
        `${BASE_URL}api/add/image`,
        { image: selectedImage },
        config
      );

      if (response.data.status) {
        getDate();
        setShowSave(false)
      } else {
      }
    } catch (error) { }
  };

  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await axios.post(
        `${BASE_URL}api/upload/image`,
        formData
      );

      if (response.data.status) {
        setSelectedImage(response.data.url);
        setValues({
          ...values,
          document: response.data.secureUrl,
        });

        setLoading(false);
        setShowSave(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePicUpload = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      const response = await axios.post(
        `${BASE_URL}student/add/image`,
        { image: selectedImage },
        config
      );

      if (response.data.status) {
        getDate();

        // window.location.reload();
      }
    } catch (error) { }
  };
  const handleImageClick = () => {
    document.getElementById("upload").click();
  };
  const handleCall = () => {
    window.location.href = `tel:${userData.data?.user?.contact}`;
  };

  const handleMail = () => {
    window.location.href = `mailto:${userData.data?.user.email}`;
  };
  const userData =
    userType === "student"
      ? UserDetail
      : userType === "guestUser"
        ? GuestUserDetail
        : null;
<<<<<<< HEAD
<<<<<<< HEAD
       
=======
        console.log(userData.data?.user , "wefcwe") 
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
        console.log(userData.data?.user , "wefcwe") 
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  return (
    <>
      {mainLoader ? (
        <div>
          <Loader />{" "}
        </div>
      ) : (
        <div className="profileDiv1">
          <div className="userprofileBg">
          </div>
          <div className="profile-con">
            <div className="profileDiv5" onClick={handleImageClick}>
              {loading ? (
                <div className="imgloading">loading...</div>
              ) : (
                <img src={selectedImage || image || defaultImageLink} alt="logo" />
              )}
            </div>

            <div style={{ display: "flex" }}>
              <input
                type="file"
                accept="jpg"
                id="upload"
                hidden
                onChange={(e) => uploadImage(e)}
              />

              {userType === "guestUser" && ShowSave ? (
                <button className="fileupload" onClick={handlePicUploadGuest}>
                  Save
                </button>
              ) : userType === "student" && ShowSave ? (
                <button className="fileupload" onClick={handlePicUpload}>
                  Save
                </button>
              ) : (
                <div className="dummyDiv"></div>
              )}
            </div>
          </div>
          <div className="Profile-card">
            <div className="profileDiv6">
              {userData ? (
                <>
                  <h2
                    className="AlignItems"
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    {userData.data?.user.firstName}

                    {userData.data?.user.secondName}
                  </h2>
                  <div className="button-container">
                    {
                      userData.data?.user.contact ?   <button className="styled-button" onClick={handleCall}>
                      <span className="call-icon"> {userData.data?.user.contact}</span>
                      
                    </button> :""
                    }
                  
                    <button className="styled-button" onClick={handleMail}>
                      <span className="mail-icon">Mail Me</span>
                    </button>
                  </div>
                  <div className="button-container">
                    <h3>{userData.data?.user?.education}</h3>
                  </div>
                  <div className="button-containerNew">
                  <p>{userData.data?.user?.intro}</p>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="profileDiv4">


            {userData?.data?.projects.length > 0 ? (
              <div className="profileDiv7">
                <h2 className="project-posted-heading">Project Posted {userData.data?.projects?.length}</h2>
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;

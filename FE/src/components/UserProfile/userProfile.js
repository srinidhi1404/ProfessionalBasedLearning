import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";
import Table from "../Table/table";
import { Button } from "bootstrap";

const UserProfile = () => {
  const userApi = "http://localhost:3000/student/student-details";
  const guestApi = "http://localhost:3000/api/user-details";
  const token = localStorage.getItem("token");
  const [GuestUserDetail, SetGuestUserDetail] = useState("");
  const [UserDetail, SetUserDetail] = useState("");
  console.log("UserDetail", UserDetail);

  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  console.log("pdfFile", pdfFile);
  const [image, setImage] = useState("");
  const [values, setValues] = useState({
    document: "",
  });

  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (userType === "guestUser") {
      axios
        .get(guestApi, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("response.data", response.data);
          SetGuestUserDetail(response.data);
          setImage(response.data.data.projects[0].image);
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
          console.log("response.data", response.data.data.projects[0].image);
          SetUserDetail(response.data);
          setImage(response.data.data.projects[0].image);
        })
        .catch((error) => {});
    }
  }, []);

  const handleImageClick = () => {
    document.getElementById("upload").click(); // Trigger file input click when the image is clicked
  };

  const handlePicUpload = async () => {
    try {
      // Include your token in the headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      // Upload the image and get the URL
      const response = await axios.post(
        "http://localhost:3000/student/add/image",
        { image: pdfFile },
        config
      );

      if (response.data.status) {
        // Update your PDF state with the image URL
        setValues({
          ...values,
          document: response.data.url,
        });

        // Reload the page to see the changes
        window.location.reload();
      } else {
        // Handle the case when image upload fails
        // You can show an error message or take appropriate action
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/upload/image`,
        formData
      );

      if (response.data.status) {
        setPdfFile(response.data.url);

        setValues({
          ...values,
          document: response.data.secureUrl,
        });
        setLoading(false);
      } else {
        setLoading(false);
        // toast.error('Failed to   upload document');
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // toast.error('An error occurred while uploading the document');
    }
  };

  const userData =
    userType === "student"
      ? UserDetail
      : userType === "guestUser"
      ? GuestUserDetail
      : null;

  return (
    <>
      <div className="profileDiv1">
        <h1 className="profileDiv3">User Profile</h1>
        <div className="profileDiv4">
          {/* <div className="profileDiv5" onClick={handleImageClick}>
            <img
              src={image}
              alt="logo"
            />
          </div> */}
          {/* Rest of your code */}
          {/* <div style ={{display:"flex"}}>
          <input type="file" accept="jpg" id="upload" hidden onChange={(e) => uploadImage(e)} />
          <label for="upload" className="fileupload">{loading ? "Loading" : "Choose file"} </label>
          <button  className="fileupload" onClick={handlePicUpload}>Submit</button>
          </div> */}
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
                <div className="flex justify-center gap-4 flex-wrap my-5">
                  <div className="py-2 px-3 border rounded-full bg-slate-50">
                    <span>Education :</span>
                  </div>
                  <div className="py-2 px-3 border rounded-full bg-slate-50">
                    <span>Email: {userData.data?.user.email}</span>
                  </div>
                  <div className="py-2 px-3 border rounded-full bg-slate-50">
                    <span>
                      Projects Posted: {userData.data?.projects?.length}
                    </span>
                  </div>
                  <div className="py-2 px-3 border rounded-full bg-slate-50">
                    <span>Intro:</span>
                  </div>
                  <div className="py-2 px-3 border rounded-full bg-slate-50">
                    <span>Contact Details: </span>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {userData?.data?.projects.length > 0 ? (
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
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

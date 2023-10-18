import React, { useEffect, useState } from "react";
import NavbarLogout from "../NavLogout/navLogout";
import "./userProfile.css";
import axios from "axios";

import Table from "../Table/table";
import Footer from "../Footer/footer";

const UserProfile = () => {
  const userApi = "http://localhost:3000/student/student-details";
  const guestApi = "http://localhost:3000/api/user-details";
  const token = localStorage.getItem("token");
  const [GuestUserDetail, SetGuestUserDetail] = useState("");
  const [UserDetail, SetUserDetail] = useState("");

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
          SetGuestUserDetail(response.data);
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
          SetUserDetail(response.data);
        })
        .catch((error) => {});
    }
  }, []);

  //Removing unneccessary code by storing data conditionally
  const userData =
    userType === "student"
      ? UserDetail
      : userType === "guestUser"
      ? GuestUserDetail
      : null;

  return (
    <>
      <div className="profileDiv1">
        <div className="profileDiv2">
          <NavbarLogout />
        </div>
        <h1 className="profileDiv3">User Profile</h1>
        <div className="profileDiv4">
          <div className="profileDiv5">
            <img
              src="https://projectbasedlearningexplorer.onrender.com/images/logo.png"
              alt="logo"
            />
          </div>
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
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;

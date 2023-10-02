import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogout from "../NavLogout/navLogout";
import "./userProfile.css";
import axios from "axios";

import Table from "../Table/table";
import Footer from "../Footer/footer";

const UserProfile = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="profileDiv1">
        <div className="profileDiv2">
          <NavbarLogout />
        </div>
        <h1 className="profileDiv3">User Profile</h1>
        <div className="profileDiv4">
          <div className="profileDiv5">
            <img src="https://projectbasedlearningexplorer.onrender.com/images/logo.png  " />
          </div>
          <div className="profileDiv6">
            {userType == "student" ? (
              <>
                <h2 className="AlignItems">
                  {UserDetail.data?.user.firstName}{" "}
                  {UserDetail.data?.user.secondName}
                </h2>
                <p className="AlignItems">Education :</p>
                <p className="AlignItems">
                  Email: {UserDetail.data?.user.email}
                </p>
                <p className="AlignItems">
                  Projects Posted: {UserDetail.data?.projects?.length}
                </p>
                <p className="AlignItems">Intro:</p>
                <p className="AlignItems">Contact Details: </p>
              </>
            ) : userType == "guestUser" ? (
              <>
                {" "}
                <h2 className="AlignItems">
                  {GuestUserDetail.data?.user.firstName}{" "}
                  {GuestUserDetail.data?.user.secondName}
                </h2>
                <p className="AlignItems">Education :</p>
                <p className="AlignItems">
                  Email: {GuestUserDetail.data?.user.email}
                </p>
                <p className="AlignItems">
                  Projects Posted: {GuestUserDetail.data?.projects?.length}
                </p>
                <p className="AlignItems">Intro:</p>
                <p className="AlignItems">Contact Details: </p>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="profileDiv7">
            <h2>Project Posted</h2>
            <div className="profileDiv8">
              <Table
                data={
                  userType == "student"
                    ? UserDetail.data?.projects
                    : GuestUserDetail.data?.projects
                }
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;

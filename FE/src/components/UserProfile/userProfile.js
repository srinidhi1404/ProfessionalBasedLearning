import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogout from "../NavLogout/navLogout";
import "./userProfile.css";
import Table from "../Table/table";
import Footer from "../Footer/footer";

const UserProfile = () => {
  const navigate = useNavigate();
  const data = [
    { id: 1, Project_Title: "Project 1", Description: "Description of Project 1", Date_Posted:"2023-05-01"},
  ];

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
            <h2 className="AlignItems">User Name</h2>
            <p className="AlignItems">Email:</p>
            <p className="AlignItems">Projects Posted:</p>
            <p className="AlignItems">Intro:</p>
            <p className="AlignItems">Contact Details: 123-456-7890</p>
          </div>
          <div className="profileDiv7">
            <h2>Project Posted</h2>
            <div className="profileDiv8">
              <Table data={data} />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default UserProfile;

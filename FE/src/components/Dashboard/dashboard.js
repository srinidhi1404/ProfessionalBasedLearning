import React from "react";
import NavbarLogout from "../NavLogout/navLogout";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Footer from "../Footer/footer";
import UserProfile from "../UserProfile/userProfile"

const Dashboard = () => {
  const navigate = useNavigate();
  let details = [
    {
      heading: "User Profile",
      title: "User Details here",
      title2: (
        <div
          onClick={() => {
            navigate("/user-profile");
          }}
          class="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span class="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="relative"> GO TO User Details</span>
        </div>
      ),
    },
    {
      heading: "Post a project",
      title: "Post a details of the project",
      title2: (
        <div
          onClick={() => {
            navigate("/project-form");
          }}
          class="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span class="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="relative"> GO TO POST A NEW PROJECT</span>
        </div>
      )
    },
   
  ];

  return (
    <>
      <div>
        <div className="navbarCss">
          <NavbarLogout />
        </div>

        <div className="dashboardBody">
          <div>
            <h1>User Dashboard</h1>
          </div>
          <div className="mycard-con">
            {details.map((a, b) => {
              return (
                <div className="my-card">
                  <h5>{a.heading}</h5>
                  <h6>{a.title}</h6>

                  <div> {a.title2}</div>
                </div>
              );
            })}
          </div>
        </div>
       
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

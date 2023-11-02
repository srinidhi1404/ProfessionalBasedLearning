import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  let details = [
    {
      heading: "User Profile",
      title: "User Details here",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/user-profile");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To User Details</span>
        </div>
      ),
    },
    {
      heading: "Post a project",
      title: "Post a details of the project",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/project-form");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative">Post a New Project</span>
        </div>
      ),
    },
    {
      heading: "View Projects",
      title: "View Projects here",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
        
          onClick={() => {
            navigate("/projects");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Projects</span>
        </div>
      ),
    },
    {
      heading: "Approve or Reject Requests",
      title: "View Requests here",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/request");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Projects</span>
        </div>
      ),
    },
  ];
  let details2 = [
    {
      heading: "Projects",
      title: "Approve / Reject Projects",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/project-list");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Projects List</span>
        </div>
      ),
    },
    {
      heading: "Flag Comment",
      title: "Approve / Reject flag Comment",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/flagList");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Flag List</span>
        </div>
      ),
    },
    { 
      heading: "Flag Project",
      title: "Flag Project",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/flagProject");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Flag List</span>
        </div>
      ),
    },
    { 
      heading: "Flag User",
      title: "Approve / Reject Flag User",
      title2: (
        <div
        style={{
          backgroundColor: "#006747",
          color: "white"
        }}
          onClick={() => {
            navigate("/flagUser");
          }}
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-md font-small text-[#006747] cursor-pointer border-2 border-[#006747] rounded-md hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-[#006747] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
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
          <span className="relative"> Go To Flag List</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
 

        <div className="dashboardBody">
          <div>
            <h1>
              {`${
                userType === "admin"
                  ? "Admin "
                  : userType === "guestUser"
                  ? "Guest "
                  : "Student "
              }`}
              Dashboard
            </h1>
          </div>
          {userType !== "admin" ? (
            <div className="mycard-con">
              {details.map((a, b) => {
                return (
                  <div className="my-card">
                    <h5>{a.heading}</h5>
                    <p>{a.title}</p>
                    <div> {a.title2}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mycard-con">
              {details2.map((a, b) => {
                return (
                  <div className="my-card">
                    <h5>{a.heading}</h5>
                    <p>{a.title}</p>

                    <div> {a.title2}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

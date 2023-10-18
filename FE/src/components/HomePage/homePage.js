import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
const HomePage = () => {
  useEffect(() => {
    localStorage.removeItem("userType");
  }, []);

  const navigate = useNavigate();
  const Admin = () => {
    navigate("/login");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.setItem("userType", "admin");
  };
  const Student = () => {
    navigate("/login");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.setItem("userType", "student");
  };
  const Guest = () => {
    navigate("/login");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.setItem("userType", "guestUser");
  };

  return (
    <>
      <div className="maindiv1">
        <div className="container1">
          <Button className="button" onClick={Admin}>
            Admin Login
          </Button>
          <Button className="button" onClick={Student}>
            Student Login
          </Button>
          <Button className="button" onClick={Guest}>
            Guest login
          </Button>
        </div>
        {/* <LoginForm user={user} admin={admin} guestUser={guestUser}  /> */}
      </div>
    </>
  );
};

export default HomePage;

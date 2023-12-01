import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LionIMg from "../../asset/image/lionimg.webp"
import "./homepage.css";
import Footer from "../Footer/footer";
import PublicNavbar from "../PublicNavbar/PublicNavbar";
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
        <PublicNavbar/>
        <div className="loginbtncon">
          <div className="left_lion">
            <img src={LionIMg} alt=""></img>
        </div>
          <div className="right-btns">

            <div className="btns-wrap">
    
              <button className="mybtn btn-background-slide"  onClick={Admin} >ADMIN LOGIN</button>
              <button className="mybtn btn-background-slide"  onClick={Student}  >STUDENT LOGIN</button>
              <button className="mybtn btn-background-slide"  onClick={Guest} >GUEST LOGIN</button>
            </div>
          </div>
        </div>
<Footer/>
      

      </div>

    </>
  );
};

export default HomePage;

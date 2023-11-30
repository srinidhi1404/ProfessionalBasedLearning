import React from "react";
import "./PublicNav.css";
import { useNavigate, useLocation } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navFun = () => {
    navigate("/PublicProject");
  };

  return (
    <div className="total-wrap">
      <div className="LogoutDiv1">
        <div className="LogoutDiv2New">
          <div className="logo-flex">
            <div className="imageContainerNew">
              <img
                className="logoutNavImg"
                src="https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg"
                alt="logo"
              />
            </div>
            <div className="LogoutDiv3New">PROFESSIONAL BASED LEARNING</div>
          </div>
          {location.pathname === "/PublicProject" ? (
            <div className="exploreProjectButton">
              <button onClick={() => navigate("/")}>Home</button>
            </div>
          ) : (
            <div className="exploreProjectButton">
              <button onClick={navFun}>Explore Projects</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;

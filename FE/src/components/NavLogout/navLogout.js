import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./navLogout.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { message } from "antd";
import Footer from "../Footer/footer";

const NavbarLogout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    messageApi.open({
      type: "success",
      content: "You Are Logged Out Successfully",
    });
    navigate("/");
  };
  const Dashboard = () => {
    navigate("/dashboard");
  };

  const [state, setState] = React.useState(false);
  const drawerItems = [{ label: "Logout", handler: Logout }];
  if (!window.location.href.includes("dashboard")) {
    drawerItems.unshift({ label: "Dashboard", handler: Dashboard });
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className="close_drawer">
          <IoMdCloseCircleOutline
            className="hover:cursor-pointer"
            onClick={toggleDrawer(false)}
          />
        </div>
        {drawerItems.map((el) => (
          <ListItem key={el.label} disablePadding>
            <ListItemButton onClick={el.handler}>
              <div className="Logout_text">{el.label}</div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (

    < div className="total-wrap">
    <>
    {contextHolder}
      <div className="LogoutDiv1">
        <div className="LogoutDiv2">
          <div className="imageContainer" onClick={()=>{navigate("/dashboard")}}>
            <img
              className="logoutNavImg"
              src="https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg"
              alt="logo"
            />
          </div>
          <div className="LogoutDiv3">PROFESSIONAL BASED LEARNING</div>
        </div>
        <div className="LogoutDiv4" onClick={toggleDrawer(true)}>
          <img
            className="logoutNavImgRight"
            src="https://www.nwmissouri.edu/layout/v2022/images/svg/btn-menu.svg"
            alt="menu"
          />
        </div>
      </div>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>
      
    </>
    <>
    <Outlet/>
    </>
    <>
    <Footer/>
    </>
    </div>
  );
};

export default NavbarLogout;

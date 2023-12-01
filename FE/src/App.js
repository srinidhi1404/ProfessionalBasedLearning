import LoginForm from "./components/LoginForm/loginForm";
import SignupForm from "./components/SignUp/signUp";
import ForgotPasswordForm from "./components/ForgotPassword/forgotPassword";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword/resetPassword";
import HomePage from "./components/HomePage/homePage";
import Projects from "./components/Projects/Projects";
import Dashboard from "./components/Dashboard/dashboard";
import ProjectForm from "./components/ProjectForm/projectForm";
import UserProfile from "./components/UserProfile/userProfile";
import AdminProjectList from "./components/AdminProjectList/adminProjectList";
import FlagList from "./components/flagList/FlagList";
import FlagUser from "./components/flagUser/flagUser";
import FlagProject from "./components/flagProject/flagProject";
import Auth from "./components/Auth/Auth";
import NavbarLogout from "./components/NavLogout/navLogout";
import ViewProject from "./components/Projects/ViewProject";
import Request from "./components/Projects/Request";
import UserDetails from "./components/Projects/UserDetails";
import ViewAdminProject from "./components/Projects/ViewProject-Admin";
import PublicProject from "./components/PublicNavbar/PublicProject";
import AddAdminForm from "./components/AddAdmin/addAdmin";
import AddStudentForm from "./components/AddStudent/addStudent";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        
        <Route path="/addAdmin" element= {<AddAdminForm/>}/>
        <Route path="/addStudent" element = {<AddStudentForm/>}/>
        <Route path="/forgot-Password" element={<ForgotPasswordForm />} />
        <Route path="/reset-Password" element={<ResetPassword />} />
        <Route path="/PublicProject" element={<PublicProject />} />
        <Route element={<NavbarLogout />}>
          <Route
            path="/projects"
            element={
              <Auth>
                <Projects />
              </Auth>
            }
          />
          <Route
            path="/userdetails"
            element={
              <Auth>
                <UserDetails />
              </Auth>
            }
          />
          <Route path="/viewprojects" element={<ViewProject />} />
          <Route
            path="/viewproject-admin"
            element={
              <Auth>
                <ViewAdminProject />
              </Auth>
            }
          />
          <Route
            path="/request"
            element={
              <Auth>
                <Request />
              </Auth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/project-form"
            element={
              <Auth>
                <ProjectForm />
              </Auth>
            }
          />
          <Route
            path="/user-profile"
            element={
              <Auth>
                <UserProfile />
              </Auth>
            }
          />
          <Route
            path="/project-list"
            element={
              <Auth>
                <AdminProjectList />
              </Auth>
            }
          />
          <Route
            path="/flagList"
            element={
              <Auth>
                <FlagList />
              </Auth>
            }
          />
          <Route
            path="/flagUser"
            element={
              <Auth>
                <FlagUser />
              </Auth>
            }
          />
          <Route
            path="/flagProject"
            element={
              <Auth>
                <FlagProject />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

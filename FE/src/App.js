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
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/forgot-Password" element={<ForgotPasswordForm />} />
        <Route path="/reset-Password" element={<ResetPassword />} />
        <Route
          path="/projects"
          element={
            <Auth>
              <Projects />
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
      </Routes>
    </>
  );
}

export default App;

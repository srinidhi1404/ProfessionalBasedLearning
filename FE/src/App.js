import logo from './logo.svg';
// import './App.css';
import LoginForm from './components/LoginForm/loginForm';
import SignupForm from './components/SignUp/signUp';
import ForgotPasswordForm from './components/ForgotPassword/forgotPassword';
import { Routes,Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword/resetPassword';
import HomePage from './components/HomePage/homePage';
import Projects from './components/Project/projects';
import Dashboard from './components/Dashboard/dashboard';
import ProjectForm from './components/ProjectForm/projectForm';
import UserProfile from './components/UserProfile/userProfile';

function App() {

  return (
   <>
   
   <Routes>
   <Route path='/' element= {<HomePage/>}/>
   <Route path='/login' element= {<LoginForm/>}/>
   <Route path='/sign-up' element= {<SignupForm/>}/>
   <Route path='/forgot-Password' element= {<ForgotPasswordForm/>}/>
   <Route path='/reset-Password' element= {<ResetPassword/>}/>
   <Route path='/projects' element= {<Projects/>}/>
   <Route path='/dashboard' element= {<Dashboard/>}/>
   <Route path='/project-form' element= {<ProjectForm/>}/>
   <Route path='/user-profile' element= {<UserProfile/>}/>
   </Routes>

   </>
  );
}

export default App;

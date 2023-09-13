import logo from './logo.svg';
// import './App.css';
import LoginForm from './components/loginForm';
import SignupForm from './components/signUp';
import ForgotPasswordForm from './components/forgotPassword';
import { Routes,Route } from 'react-router-dom';
import ResetPassword from './components/resetPassword';

function App() {
  return (
   <>
   
   <Routes>
   <Route path='/' element= {<LoginForm/>}/>
   <Route path='/sign-up' element= {<SignupForm/>}/>
   <Route path='/forgot-Password' element= {<ForgotPasswordForm/>}/>
   <Route path='/reset-Password' element= {<ResetPassword/>}/>
   </Routes>

   </>
  );
}

export default App;

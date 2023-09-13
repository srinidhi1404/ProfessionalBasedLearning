import React, { useState,useEffect} from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from './forgotPassword';
import SignupForm from './signUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateForm } from './validation';
import { fetchApi } from '../Utils/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formDetails = {
  email: "",
  password: ""
}
const LoginForm = () => {
    const navigate = useNavigate()

   const [formData, setFormData] = useState({...formDetails});
   const [show, setShow] = useState(false);
   const [validationMessage, setValidationMessage] = useState('');
   const [errors ,setErrors] = useState({})
   const [rememberMe, setRememberMe] = useState(false);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationRules = {
    email: [{ required: true, pattern: /\S+@\S+\.\S+/, errorMessage: 'Invalid email format' }],
    password: [{ required: true }],
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


const handleLoginSuccess = (responseData) => {
};

const handleLoginError = (error) => {
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);

    if(formData.email==''){
      notify1("Email is Required")
    }
    if(formData.password==''){
      notify1("Password is Required")
    }
    console.log("vishnu>>>>>>",formData.email);
   if (Object.keys(newErrors).length === 0) {
   
      let response = await fetchApi('/api/login' ,formData, "POST")

      if(response.status==true){
      notify(response.message)
      }
      else{
        notify1(response.message)
      }
      console.log("response data",response.status);
    }
  };
  // const notify = (msg) => {
  //   toast(msg)};

  const notify = (msg) => {
    toast.success(msg)
    };

    const notify1 = (msg) => {
      toast.error(msg)
      };


    const handleRememberMeChange = (event) => {
      const isChecked = event.target.checked;
      setRememberMe(isChecked);
  
      if (isChecked) {
          localStorage.setItem('rememberedUsername', formData.email);
          localStorage.setItem('rememberedPassword', formData.password);
      } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
      }
  };
  return (
    <>
    <div  >
      <div  className='mainDiv'> 
       <img src="https://projectbasedlearningexplorer.onrender.com/images/logo.png" alt="ggjaj"  />
      
          <h3 className="font-weight-medium" >Professional Based Learning Explorer</h3>
    <div className='formDiv1' >
<div className='shadow-4' >
        <div className='formDiv2'>
        <form onSubmit={(e) => handleSubmit(e)} >
  <div className="form-outline">
  <label className="form-label " for="form2Example1" >Username or Email</label>
    <input type="email"
    id="form2Example1"
    className="form-control"
    placeholder='Enter Username or Email'
    value={formData.email}
    name="email"
    style={{borderRadius:'20px'}}
    onChange={(e) => {handleChange(e)}}
    />
  </div>
  <div className="form-outline">
    <label className="form-label" for="form2Example2">Password</label>
    <input type="password"
     id="form2Example2"
    className="form-control"
    name="password"
     value={formData.password}
     placeholder='Password'
     style={{borderRadius:'20px'}}
     onChange={(e) => {handleChange(e)}}
     checked={rememberMe}
     />
  </div>
  <div className="row mb-4">
    <div className="col d-flex ">
      <div className="form-check">
        <input className="form-check-input"
        type="checkbox"
        value=""
        id="form2Example31"
        style={{marginTop:'18px'}}
        onChange={handleRememberMeChange}
        />
        <label className="form-check-label"
        for="form2Example31"
        style={{marginTop:'15px'}}> Remember me </label>
      </div>
    </div>
  </div>
  <ToastContainer icon={false} />
  <button type="submit" className="btn btn-primary mb-3 " id='logIn' >Log In</button>
</form>
<div className="col" >
      <p> <a onClick={() => handleShow()}  className='forpass'>Forgot Password?</a></p>
    </div>
  <div className="text-center mt-12 ">
    <p >External User? <a onClick={() => navigate("/sign-up")} className='register'>Register</a></p>
  </div>
<ForgotPasswordForm handleClose={handleClose} handleShow={handleShow} show={show}  />
        </div>
  </div>
  </div>
  </div>
  </div>
  
    </>
  );
};

export default LoginForm;

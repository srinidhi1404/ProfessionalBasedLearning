// import './resetPassword.css'; 
import './ForgotPassword.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateForm } from '../validation';
import { fetchApi } from '../../Utils/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from '../ResetPassword/resetPassword';

const formDetails = {
  email: ""
}

const ForgotPasswordForm = ({show , handleShow , handleClose}) => {
  // const [email, setEmail] = useState({});
  const [formData, setFormData] = useState({...formDetails});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors ,setErrors] = useState({})
  const [validationMessage, setValidationMessage] = useState('');

  const [show1, setShow] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () =>{
    setShow(true)
    // handleClose()
  };
  
 
  const validationRules = {
    email: [{ required: true, pattern: /\S+@\S+\.\S+/, errorMessage: 'Invalid email format' }],
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name>>>>",name,value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);
    if(formData.email==''){
      notify1('Email is Required')
    }
    console.log("clickable",newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log("api call");
      let response = await fetchApi('/api/forgotpassword' ,formData, "POST")
      if(response.status==true){
      notify(response.message)
      setTimeout(() => {
       handleShow1()
      }, 1000);
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

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        marginRight="10px"

      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
            <label for="usr" style={{marginBottom:"10px"}}>Email Address</label>
             <input type="text" name='email' className="form-control rounded-pill" id="usr" placeholder='Enter Email' onChange={handleChange} value={formData.email}/>
             <p style={{marginTop:'10px'}}>We'll send you a link to reset your password.</p>
             <Button variant="primary rounded-pill " style={{marginRight:'330px' }} type='submit' >Send reset link</Button>
            </form>
            <div className="col" >
    </div>
    <ResetPassword handleClose1={handleClose1} handleShow1={handleShow1} show1={show1} email={formData.email}  />
        </div>
        </Modal.Body>
        <ToastContainer icon={false}/>
      </Modal>

</>
  );
};

export default ForgotPasswordForm;

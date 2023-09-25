import './resetPassword.css'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateForm } from '../validation';
import { fetchApi } from '../../Utils/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPInput, { ResendOTP } from "otp-input-react";


const ResetPassword = ({show1 , handleShow1 ,email,  handleClose1}) => {
  const formDetails = {
    newPassword: "",
    resetToken :"", 
    email: email
  }
  // const [email, setEmail] = useState({});
  const [formData, setFormData] = useState({...formDetails  });
  console.log("email" , email);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors ,setErrors] = useState()
  const [validationMessage, setValidationMessage] = useState('');
  const [confirmPassword , setConfirmPassword] = useState("")

  React.useEffect(() => {}, [errors ,formData])
 
  const validationRules = {
    email: [{ required: true, pattern: /\S+@\S+\.\S+/, errorMessage: 'Invalid email format' }],
  };
  const handleChange = (e, name) => {
    // console.log("event", e , name);
    if(name === 'resetToken'){
      setFormData({['resetToken'] : e})
    }else {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    

  };
  console.log("form data" , formData);

    const validate = async () => {
        if(formData.resetToken.length === 6 && formData.newPassword === confirmPassword && confirmPassword){
          return true;
        }
  else if(formData.resetToken.length !== 6){
    setErrors("Enter Otp Correctly")
    return false;
  }else if(formData.newPassword === confirmPassword){
    setErrors("Password is not same")
    return false;
  }else if( formData.newPassword <=3){
    setErrors("Password should be greater than 5 words")
    return false;
  }
  // setErrors("Please check all fields")
  return true;
    }

    const handleSubmit1 = async (e) => {
      e.preventDefault();
        let err  = await errors;
        let val = await validate();
        console.log("value" , val);
        if(val){
            setFormData({...formData ,
            ['email'] : email
            })
            let payload  = {
              newPassword: formData.newPassword,
              resetToken :formData.resetToken, 
              email: email
            }
            let response = await fetchApi('/api/resetpassword' ,payload, "POST")
          if(response.status==true){
            notify(response.message)
          }
          else{
            notify1(response.message)
          }
        }
        else {
          setErrors("Please check all fields")
          console.log("errors" , errors);
          notify1(errors)
        }
    }


    
  const notify = (msg) => {
    toast.success(msg)
    };

    const notify1 = (msg) => {
      toast.error(msg)
      };
  return (
    <>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        marginRight="10px"

      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
            <form onSubmit={(e) => handleSubmit1(e)}>
            <label for="usr" style={{marginBottom:"10px"}}>Enter OTP</label>
            <OTPInput
             value={formData.resetToken}
             onChange={(e) => {handleChange(e ,'resetToken')}}
             autoFocus
             OTPLength={6}
             otpType="number"
             disabled={false}
             
           />
             <label for="usr" style={{marginBottom:"10px",marginTop:'10px'}}>Enter New Password</label>
             <input type="password" name='newPassword' className="form-control rounded-pill" id="usr" placeholder='Enter New Password' onChange={handleChange} value={formData.newPassword}/>
             <label for="usr" style={{marginBottom:"10px",marginTop:'10px'}}>Confirm Password</label>
             <input type="password" name='ConfirmPassword' className="form-control rounded-pill" id="usr" placeholder='Confirm Password' onChange={(e) => {setConfirmPassword(e.target.value)}} value={confirmPassword}/>
             <Button variant="primary rounded-pill " style={{marginRight:'330px',marginTop:'10px' }} type='submit' >Reset Password</Button>
            </form>
            
        </div>
        <div className="col" >
    </div>

        </Modal.Body>
        <ToastContainer icon={false}/>
      </Modal>

</>
  );
};

export default ResetPassword;

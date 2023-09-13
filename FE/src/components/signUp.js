import {React,useState} from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // You can add custom styling here
import { useNavigate } from 'react-router-dom';
// import PasswordInput from './PasswordInput';
import { validateForm } from './validation';
import { fetchApi } from '../Utils/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formDetails =
{
  firstName: "",
  secondName: "",
  email: "",
  password:""
}

const SignupForm = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({...formDetails});
  const [errors ,setErrors] = useState({})

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const validationRules = {
    email: [{ required: true, pattern: /\S+@\S+\.\S+/, errorMessage: 'Invalid email format' }],
    password: [{ required: true }],
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);
    if(formData.firstName==''){
      notify1("First Name is Required")
    }
    if(formData.lastName==''){
      notify1("Last Name is Required")
    }
    if(formData.email==''){
      notify1("Email is Required")
    }
    if(formData.password==''){
      notify1("password is Required")
    }

    // console.log("errors" ,newErrors);
    if (Object.keys(newErrors).length === 0) {
    
      let response = await fetchApi('/api/signup' ,formData, "POST")
      // console.log("response",response);
      if(response.status==true){
        notify(response.message)
        }
        else{
          notify1(response.message)
        }
    }
  }
  const notify = (msg) => {
    toast.success(msg)
    };

    const notify1 = (msg) => {
      toast.error(msg)
      };
  return (
    <Container className="signup-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className='beforeForm'>
          <h2 className="mb-15">Create a new account</h2>
          <Form className='formSignup' onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className='formUsername'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='firstName' placeholder="Enter First Name" className='InputSignup' onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formUsername" className='formUsername'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='secondName' placeholder="Enter Last Name" className='InputSignup' onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formEmail" className='formUsername'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter Email"  className='InputSignup' onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formPassword" className='formUsername'>
              <Form.Label>Password</Form.Label>
              <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder="Password" name='password' className='InputSignup' onChange={handleChange}/>
              <span className="eye-icon" onClick={togglePasswordVisibility} ></span>
               {passwordVisible ? null : (
              <div className="strength-bar1">
             </div>
               )}
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className='formUsername'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control variant="rounded-pill"  type={passwordVisible1 ? 'text' : 'password'}
              placeholder="Confirm password " className='InputSignup'
              onChange={e => setPassword(e.target.value)} >
              </Form.Control>
              <span className="eye-icon1" onClick={togglePasswordVisibility1} ></span>
               {passwordVisible1 ? null : (
              <div className="strength-bar1">
             </div>
               )}
            </Form.Group>
            <Button variant="primary " type="submit" className='signupButton' >
              Sign Up
            </Button>
            <a href="" className='backTo'  onClick={() => navigate("/")}>Back to Login</a>
           
          </Form>
          <ToastContainer />
        </Col>
      </Row>
      {/* <PasswordInput/> */}
    </Container>
  );
};

export default SignupForm;

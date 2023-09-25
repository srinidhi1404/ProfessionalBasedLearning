import React from 'react';
import './navbar.css'; 
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  
  return (
 <div className='Nav'>
 <div className='div0'>
   <img className='' src='https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg' />
  <div className='NavTitle'>
  <p  className='navP'>
   PROFESSIONAL BASED LEARNING
   </p>
  </div>
  
   </div>
  <div className='navButton' onClick={()=>navigate('/dashboard')}>
  Go to dashboard
  </div>

 </div>
  );
};


export default Navbar;

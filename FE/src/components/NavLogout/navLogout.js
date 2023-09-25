import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './navLogout.css'
const NavbarLogout = () => {
  const navigate = useNavigate()
   const logout =()=>{
    localStorage.clear()
    notify('you Are Logged Out Successfully')
    navigate('/')
   }

   const notify = (msg) => {
    toast.success(msg)
    };
  
  return (
    <>
     <div className='LogoutDiv1'>
 <div className='LogoutDiv2'>
   <img className='logoutNavImg' src='https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg' />
  <div className='LogoutDiv3'>
  <p  className='navP'>
   PROFESSIONAL BASED LEARNING
   </p>
  </div>
  
   </div>
   <div className='LogoutDiv4' onClick={logout}>
  Log Out
  </div>


 </div>
      <ToastContainer icon={false} />
    </>

 
  );
};


export default NavbarLogout;

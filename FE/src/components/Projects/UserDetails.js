import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Request.css';
import { useLocation } from 'react-router-dom'; // Import useLocation

const UserDetails = () => {
  // Get the location object
  const location = useLocation();
  const { data } = location.state;

  // Extract data from the location state
  const { projectId, userId, email } = location.state;

  // Define the API endpoint and data
  const apiEndpoint = 'http://localhost:3000/api/user/project';
  const requestData = {
    userId: userId,
    email: email,
  };

  // Get the token from localStorage or wherever it's stored
  const token = localStorage.getItem('token'); // Replace with your actual method of getting the token

  // State to store the API response
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .post(apiEndpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
      .then((response) => {
        // Set the API response data to the state
        setUserData(response.data.data[0]);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }, [token]); // Include 'token' in the dependency array to re-fetch when token changes

  return (
    <>
      <h1>User Details</h1>
      <div className="request-container">
        {userData ? (
          <table className="main-content">
            <tbody>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>User ID</td>
                <td>{userData.userId}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>projectType</td>
                <td>{userData.projectType}</td>
              </tr>
              {/* Add more rows for other user data fields here */}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default UserDetails;

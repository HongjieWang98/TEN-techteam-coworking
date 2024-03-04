// ApplicationForm.js
import React from 'react';
// import { Link }  from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// Signup.js
import Signin from '../components/Signin';
import { Container } from 'react-bootstrap';
import Signup from '../components/Signup';
import { AuthProvider } from '../contexts/AuthContext';

const Profile = (props) => {
    return (
      <>
          <h1>Profile</h1>
  
        <AuthProvider>  
          <Container 
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "80vh"}}
          >
            
            <div id = "student-info">
            <img src = ""></img>
            <h3>Student Name</h3>
            <p>Student Email</p>
            <p>Student Phone</p>
            <p>Student Venmo</p>
            </div>

          </Container>
        </AuthProvider>  
          
          <Link to='/applicationform'>Click Here to go to CreateListing Component</Link>
  
      </>
    );
  };
  
  export default Profile;
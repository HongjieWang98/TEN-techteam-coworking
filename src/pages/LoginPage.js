// ApplicationForm.js
import React from 'react';
// import { Link }  from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// Signup.js
import Signin from '../components/Signin';
;

const LoginPage = (props) => {
  return (
    <>
        <h1>LoginPage</h1>
        <Signin/>
        
        <Link to='/applicationform'>Click Here to go to CreateListing Component</Link>

    </>
  );
};

export default LoginPage;

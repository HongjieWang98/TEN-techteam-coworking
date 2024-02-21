// ApplicationForm.js
import React from 'react';
// import { Link }  from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// Signup.js
import Signup from '../components/Signup';;

const LoginPage = (props) => {
  return (
    <>
        <h1>LoginPage</h1>
        <Signup/>
        
        <Link to='/applicationform'>Click Here to go to CreateListing Component</Link>

    </>
  );
};

export default LoginPage;

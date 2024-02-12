// ApplicationForm.js
import React from 'react';
// import { Link }  from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LoginPage = (props) => {
  return (
    <>
        <h1>Login Page</h1>
        <Link to='/applicationform'>Click Here to go to CreateListing Component</Link>

    </>
  );
};

export default LoginPage;

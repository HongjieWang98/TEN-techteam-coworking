import React from 'react';
import { Link } from 'react-router-dom';
import Signin from '../components/Signin';

function LoginPage() {
  return (
    <>
      <h1>LoginPage</h1>
      <Signin />

      <Link to="/applicationform">Click Here to go to CreateListing Component</Link>
    </>
  );
}

export default LoginPage;

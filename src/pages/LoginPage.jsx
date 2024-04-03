import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import { AuthProvider } from '../contexts/AuthContext';

function LoginPage() {
  return (
    <>
      <h1>LoginPage</h1>
      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '80vh' }}
        >
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Signin />
          </div>

          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Signup />
          </div>
        </Container>
      </AuthProvider>
      <Link to="/applicationform">Click Here to go to CreateListing Component</Link>
    </>
  );
}

export default LoginPage;

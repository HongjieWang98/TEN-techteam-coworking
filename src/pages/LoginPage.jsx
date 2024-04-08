import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signin from '../components/Signin';
import { AuthProvider } from '../contexts/AuthContext';

function LoginPage() {
  return (
    <>

      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '80vh' }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Signin />
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

export default LoginPage;

import React from 'react';
import { Container } from 'react-bootstrap';
import SignIn from '../components/Login/SignIn';

function LoginPage() {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <SignIn />
        </div>
      </Container>
    </>
  );
}

export default LoginPage;

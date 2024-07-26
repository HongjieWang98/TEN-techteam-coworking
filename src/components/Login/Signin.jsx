import React, { useRef } from 'react';
// import {Form, Button, Card} from 'react-bootstrap'
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase_config';
import { useAuthContext } from '../../contexts/AuthContext';
import { getUserById } from '../../api/user';

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate('/listing/buy');
    } catch (e) {
      alert('Failed to sign in');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Link to="/signup">
        <div className="w-100 text-center mt-2">Do not have an account? Sign up</div>
      </Link>
    </>
  );
}

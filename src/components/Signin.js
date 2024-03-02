import React, { useRef } from 'react';
// import {Form, Button, Card} from 'react-bootstrap'
import { Form, Button, Card } from 'react-bootstrap';

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form>
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
      <div className="w-100 text-center mt-2">Do not have an account? Sign up</div>
    </>
  );
}

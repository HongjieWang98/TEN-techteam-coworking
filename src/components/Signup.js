import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useRef} from 'react'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  function submitSignUp(e) {
    e.preventDefault();
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={submitSignUp}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Link to="/" className="w-100 text-center mt-2">
        Already have an account? Sign in
      </Link>
    </>
  );
};

export default SignUp;

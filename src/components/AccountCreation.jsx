import { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import FilterDropdown from './common/FilterDropdown';

function AccountCreation() {
  // @TODO Fetch the schools from the database
  // For now mock the data
  const schools = [
    'Tufts University',
    'Ohio State University',
    'Tower Hill School',
    'Wesleyan University'
  ];
  const [school, setSchool] = useState(schools[0]);
  const schoolEmailRef = useRef();
  const schoolEmailConfirmRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup } = useAuth();
  const [preferredContact, setPreferredContact] = useState({
    schoolEmail: false,
    secondaryEmail: false,
    phone: false
  });
  const secondaryEmailRef = useRef();
  const phoneRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState({
    cash: false,
    venmo: false
  });
  const venmoRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    // prevent the form from refreshing
    e.preventDefault();
    // do the validation checks

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
    }

    if (schoolEmailRef.current.value !== schoolEmailConfirmRef.current.value) {
      setError('Emails do not match');
    }

    if (
      !(preferredContact.schoolEmail || preferredContact.secondaryEmail || preferredContact.phone)
    ) {
      setError('No preferred contact method selected');
    }

    if (!(paymentMethod.cash || paymentMethod.venmo)) {
      setError('No preferred payment method selected');
    }

    try {
      // setError('');
      // set up a load state, so when signing up the user, we disabled the "Sign Up" botton below,
      // so they don't automatically keep clicking the button and create multiple of accounts at the same time
      setLoading(true);
      // await signup(schoolEmailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  const handlePreferredContact = (e) => {
    const { checked, name } = e.target;
    setPreferredContact({
      ...preferredContact,
      [name]: checked
    });
  };

  const handlePreferredPayment = (e) => {
    const { checked, name } = e.target;
    setPaymentMethod({
      ...paymentMethod,
      [name]: checked
    });
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group id="school-select">
            <Form.Label>What school do you attend?</Form.Label>
            <Form.Label className="muted">(Note: must match your school email address)</Form.Label>
            <FilterDropdown currElement={school} data={schools} callbackFunc={setSchool} />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>School Email Address</Form.Label>
            <Form.Control type="email" ref={schoolEmailRef} required />
          </Form.Group>
          <Form.Group id="email-confirm">
            <Form.Label>Confirm School Email Address</Form.Label>
            <Form.Control type="email" ref={schoolEmailConfirmRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Preferred Contact Method</Form.Label>
            <Form.Label className="muted">(from buyer and TEN)</Form.Label>
            <Form.Check
              type="checkbox"
              id="prefer-school-email"
              label="School email"
              name="schoolEmail"
              onChange={handlePreferredContact}
            />
            <Form.Check
              type="checkbox"
              id="prefer-secondary-email"
              label="Secondary email"
              name="secondaryEmail"
              onChange={handlePreferredContact}
            />
            <Form.Check
              type="checkbox"
              id="prefer-phone-number"
              label="Phone number (text)"
              name="phone"
              onChange={handlePreferredContact}
            />
          </Form.Group>
          {preferredContact.secondaryEmail && (
            <Form.Group id="secondary-email">
              <Form.Label>Secondary Email</Form.Label>
              <Form.Control type="email" ref={secondaryEmailRef} required />
            </Form.Group>
          )}
          {preferredContact.phone && (
            <Form.Group id="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="tel" ref={phoneRef} required />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Payment Methods Accepted</Form.Label>
            <Form.Check
              type="checkbox"
              id="cash"
              label="Cash"
              name="cash"
              onChange={handlePreferredPayment}
            />
            <Form.Check
              type="checkbox"
              id="venmo"
              label="Venmo"
              name="venmo"
              onChange={handlePreferredPayment}
            />
          </Form.Group>
          {paymentMethod.venmo && (
            <Form.Group id="venmo-username">
              <Form.Label>Venmo Username</Form.Label>
              <Form.Control type="text" ref={venmoRef} required />
            </Form.Group>
          )}
          <Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AccountCreation;

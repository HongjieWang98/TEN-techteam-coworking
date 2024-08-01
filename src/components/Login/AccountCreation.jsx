import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import FilterDropdown from '../common/FilterDropdown';
import { validateUser, postUser, getUserById } from '../../api/user';
import preferredContactEnum from '../../db-enums/preferred_contact';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOrganizations } from '../../api/organization';

export default function AccountCreation() {
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const schoolEmailRef = useRef();
  const schoolEmailConfirmRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [preferredContact, setPreferredContact] = useState('');
  const secondaryEmailRef = useRef(null);
  const phoneRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState({
    cash: false,
    venmo: false
  });
  const venmoRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  async function fetchData() {
    const organizations = await getOrganizations();
    setAvailableSchools(organizations);
    setSelectedSchool(organizations[0]);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    // prevent the form from refreshing
    e.preventDefault();

    try {
      setError('');
      // set up a load state, so when signing up the user, we disabled the "Sign Up" botton below,
      // so they don't automatically keep clicking the button and create multiple of accounts at the same time
      setLoading(true);

      const createdUserAccount = {
        organization_id: selectedSchool.id,
        contact_info: {
          school_email: schoolEmailRef.current.value.toLowerCase(),
          secondary_email: secondaryEmailRef?.current?.value.toLowerCase() ?? null,
          phone_number: phoneRef?.current?.value ?? null
        },
        preferred_contact_info: preferredContact,
        payment_method: {
          cash: paymentMethod.cash,
          venmo: paymentMethod.venmo
            ? {
                venmo_handle: venmoRef?.current?.value
              }
            : null
        }
      };

      await validateUser(createdUserAccount);
      await signUp(schoolEmailRef.current.value, passwordRef.current.value, createdUserAccount);
      navigate('/signup/success', { replace: true });
    } catch (backendError) {
      setError(backendError.message);
    } finally {
      setLoading(false);
    }
  }

  const handlePreferredContact = (e) => {
    const { value } = e.target;
    setPreferredContact(value);
  };

  const handlePreferredPayment = (e) => {
    const { checked, name } = e.target;
    setPaymentMethod({
      ...paymentMethod,
      [name]: checked
    });
  };

  let maybeAlert = null;
  if (error) {
    maybeAlert = <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {maybeAlert}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group id="school-select">
            <Form.Label>What school do you attend?</Form.Label>
            <Form.Label className="muted"> (Note: must match your school email address)</Form.Label>
            <FilterDropdown currElement={selectedSchool} data={availableSchools} callbackFunc={setSelectedSchool} />
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
              type="radio"
              id="prefer-school-email"
              label="School email"
              value={preferredContactEnum.SCHOOL_EMAIL}
              name="preferredContact"
              onChange={handlePreferredContact}
            />
            <Form.Check
              type="radio"
              id="prefer-secondary-email"
              label="Secondary email"
              value={preferredContactEnum.SECONDARY_EMAIL}
              name="preferredContact"
              onChange={handlePreferredContact}
            />
            <Form.Check
              type="radio"
              id="prefer-phone-number"
              label="Phone number (text)"
              value={preferredContactEnum.PHONE_NUMBER}
              name="preferredContact"
              onChange={handlePreferredContact}
            />
          </Form.Group>
          {preferredContact === preferredContactEnum.SECONDARY_EMAIL && (
            <Form.Group id="secondary-email">
              <Form.Label>Secondary Email</Form.Label>
              <Form.Control type="email" ref={secondaryEmailRef} required />
            </Form.Group>
          )}
          {preferredContact === preferredContactEnum.PHONE && (
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

import { useSellContext } from '../../contexts/SellContext';
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import './ConfirmationPage.css'
import { getExchangeLocationAndSchedule } from '../../api/organization';
import { useAuthContext } from '../../contexts/AuthContext';

function getDayName(index) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[index];
}

function NextSteps() {
  const [organizationData, setOrganizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {

    async function fetchData() {
      if (!currentUser || !currentUser.organization_id) {
        setError('User or organization ID is not available');
        setLoading(false);
        return;
      }
      
      try {
        const data = await getExchangeLocationAndSchedule(currentUser.organization_id);
        setOrganizationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  // Create a complete schedule with all days, including those without times
  const completeSchedule = [
    { day: 'Sun', start: '', end: '' },
    { day: 'Mon', start: '', end: '' },
    { day: 'Tue', start: '', end: '' },
    { day: 'Wed', start: '', end: '' },
    { day: 'Thu', start: '', end: '' },
    { day: 'Fri', start: '', end: '' },
    { day: 'Sat', start: '', end: '' }
  ];

  // Fill in the schedule with data from organizationData
  if (organizationData && organizationData.schedule) {
    organizationData.schedule.forEach((day, index) => {
      if (day && day.start && day.end) {
        completeSchedule[index] = {
          day: getDayName(index),
          start: day.start,
          end: day.end
        };
      }
    });
  }

  // Filter out days with missing times and format the schedule string
  const scheduleString = completeSchedule
    .filter(day => day.start && day.end) // Exclude days with missing times
    .map(day => `${day.day}: ${day.start} - ${day.end}`)
    .join('; ');

  return (
    <Col md={8} className="mb-4">
      <Container className="next-steps-container">
        <Row className="justify-content-center">
          <Col md={12} className="mb-4">
            <Card className="next-steps-card">
              <Card.Header as="h5">You will be contacted to set up an exchange!</Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>
                    When a buyer is interested in your textbook, we will email you and ask for you to accept or decline the buyer. If you decline the buyer, your textbook will be put back up for sale. If you accept them, you will be responsible for contacting them and coordinating a time to conduct the exchange. The textbook will be reserved for 1 week for a buyer.
                  </p>
                  <p>
                    Exchanges must occur at {organizationData?.exchange_location || '[Location not available]'} between the hours of {scheduleString || '[Schedule not available]'}. Please confirm the payment method to be used in advance, but the payment should be made in person during the exchange.
                  </p>
                  <p>
                    Once the exchange has occurred, please confirm the transaction in the “My account” tab. If textbooks are not confirmed within 1 week, they will be automatically put back on sale. If you need any help please email textbookexchangenetwork@gmail.com.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} className="mb-4">
            <Card className="next-steps-card">
              <Card.Header as="h5">Edit your listing</Card.Header>
              <Card.Body>
                <Card.Text>
                  To edit your listing, please delete this listing from "My account". Then create a new listing for the item you wish to sell with the updated information.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Col>
  );
}


// Export SellingNextSteps along with default export of ConfirmationPage
export default function ConfirmationPage() {
  const { listing } = useSellContext() || {};

  return (
    <Container className="confirmation-page-container mt-5">
      <Row>
      <h2 className="text-left mb-2">Your textbook is now for sale!</h2>
        <Col md={4} className="mb-4">
          <Card className="confirmation-card">
            <Card.Body className="confirmation-card-body">
              {listing && (
                <div className="listing-details">
                  <div className="listing-image">
                    <p>Images coming soon!</p>
                  </div>
                  <div className="listing-info">
                    <div><strong>Title:</strong> {listing.title}</div>
                    <div><strong>Class:</strong> {listing.department} {listing.courseNumber}</div>
                    <div><strong>Price:</strong> ${listing.price}</div>
                    <div><strong>ISBN:</strong> {listing.isbn}</div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <NextSteps />
      </Row>
    </Container>
  );
}
import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './BuySuccessPage.css';
import { getExchangeLocationAndSchedule } from '../../api/organization';
import { useAuthContext } from '../../contexts/AuthContext';

function getDayName(index) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[index];
}

function BuySuccessPage() {
  const location = useLocation();
  const { state } = location;
  const { bookReserve } = state || {}; // Extract bookReserve from state

  // Separate textbooks into reserved and failed
  const successfullyReserved = bookReserve?.filter((textbook) => textbook.reserved) || [];
  const failedToReserve = bookReserve?.filter((textbook) => !textbook.reserved) || [];

  const [organizationData, setOrganizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    //console.log("Current User object:", currentUser);  // Log the entire currentUser object
    //console.log("Organization ID:", currentUser?.organization_id);  // Log the organization_id if available

    async function fetchData() {
      /*if (!currentUser) {
        setError('User is not available');
        setLoading(false);
        return;
      }
      if (!currentUser.organization_id) {
        setError('Organization ID is not available');
        setLoading(false);
        return;
      } */
      
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
    <Container fluid className="p-4">
      <Col md={12} className="mb-4 d-flex flex-column align-items-center justify-content-center">
        <Container className="next-steps-container">
          <Row className="justify-content-center">
            <Col md={10} className="mb-4 d-flex flex-column align-items-center justify-content-center">
              <Card className="next-steps-card">
                <Card.Header as="h5">You will be contacted to set up an exchange!</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p>
                      The Seller has been notified that you are interested in their textbook! They will accept or decline
                      the request to purchase this textbook and you will be notified. If they accept, we will provide them
                      your contact information and they will reach out to you to organize an exchange. This should occur
                      within the next week.
                    </p>
                    <p>
                      Exchanges must occur at {organizationData?.exchange_location || 'Location not available'} between the hours of {scheduleString}. Please
                      confirm on the payment method used in advance, and make the payment in person during the exchange.
                      If doing an electronic payment, you must exchange handles with the seller.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={10} className="mb-4 d-flex flex-column align-items-center justify-content-center">
              <Card className="next-steps-card">
                <Card.Header as="h5">Cancel your reservation</Card.Header>
                <Card.Body>
                  <Card.Text>
                    If you wish to cancel, navigate to the “My account” page, click "View listing" and click "Cancel the reservation". This will cancel your
                    reservation and automatically put the book back up for sale.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={10} className="mb-4 d-flex flex-column align-items-center justify-content-center">
              <Card className="next-steps-card">
                <Card.Header as="h5">Don’t forget to confirm the transaction once its complete!</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Once the exchange has occurred, please confirm the transaction in the “My account” tab; if textbooks
                    are not exchanged and confirmed within 1 week, they will be automatically put back on sale.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>

      <Row className="mb-4 justify-content-center">
        <Col md={10}>
          <h2>Textbooks Successfully Reserved: </h2>

          <Table striped bordered hover responsive className="w-100">
            <thead>
              <tr>
                <th>Course</th>
                <th>Title</th>
                <th>Edition</th>
                <th>ISBN</th>
                <th>Price $</th>
              </tr>
            </thead>
            <tbody>
              {successfullyReserved.map((textbook) => (
                <tr key={textbook.id}>
                  <td>{textbook.title}</td>
                  <td>{textbook.courseAndDpmt}</td>
                  <td>{textbook.edition}</td>
                  <td>{textbook.isbn}</td>
                  <td>{textbook.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {failedToReserve.length > 0 && (
        <Row>
          <Col>
            <h4>
              An error occurred when attempting to reserve the following textbooks. These textbooks could have been
              reserved already or were unlisted before you could have reserved them.
            </h4>

            <Table striped bordered hover responsive="lg" className="w-100">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Edition</th>
                  <th>ISBN</th>
                  <th>Price $</th>
                </tr>
              </thead>
              <tbody>
                {failedToReserve.map((textbook) => (
                  <tr key={textbook.id}>
                    <td>{textbook.title}</td>
                    <td>{textbook.courseAndDpmt}</td>
                    <td>{textbook.edition}</td>
                    <td>{textbook.isbn}</td>
                    <td>{textbook.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuySuccessPage;

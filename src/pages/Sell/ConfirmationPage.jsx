import { useSellContext } from '../../contexts/SellContext';
import React, { useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import './ConfirmationPage.css'

function NextSteps() {
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
                    Exchanges must occur at [location of exchange] between the hours of [time of exchange]. Please confirm the payment method to be used in advance, but the payment should be made in person during the exchange.
                  </p>
                  <p>
                    Once the exchange has occurred, please confirm the transaction in the “My account” tab. If textbooks are not confirmed within 1 week, they will be automatically put back on sale.
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
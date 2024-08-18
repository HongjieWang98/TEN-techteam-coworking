import { Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import { buyerConfirmTransaction, buyerReservationCancel } from '../../api/textbook';
import { EventStatus } from '../../api/process_textbook';
import Listing from './Listing';

function BuyerListing({ listingData }) {
  const [textbookstatus, settextbookstatus] = useState(listingData.status);

  async function handleCancelReservation() {
    settextbookstatus(EventStatus.ACTIVE);
    buyerReservationCancel(listingData);
  }

  async function handleBuyerConfirmTransaction() {
    settextbookstatus(EventStatus.SOLD);
    buyerConfirmTransaction(listingData);
  }

  return (
    <Container className="page-container">
      <>
        <Listing listingData={listingData} />

        {/* Show accept and deny button only if textbook is reserved */}
        {textbookstatus === EventStatus.PENDING_CONFIRMATION && (
          <>
            <Col md={3}>
              <button type="button" onClick={handleCancelReservation} className="btn btn-primary w-20 mt-2 mx-auto">
                Cancel Reservation
              </button>
            </Col>
            <Col md={3}>
              <button
                type="button"
                onClick={handleBuyerConfirmTransaction}
                className="btn btn-primary w-20 mt-2 mx-auto">
                Confirm Transaction is Complete
              </button>
            </Col>
          </>
        )}
      </>
    </Container>
  );
}

export default BuyerListing;

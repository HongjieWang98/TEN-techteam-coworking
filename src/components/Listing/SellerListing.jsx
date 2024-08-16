import { Row, Col, Container } from 'react-bootstrap';
import { EventStatus } from '../../api/process_textbook';
import Listing from './Listing';
import {
  acceptBuyer,
  denyBuyer,
  listingRemove,
  sellerConfirmTransaction,
  sellerReservationCancel
} from '../../api/textbook';

function SellerListing({ listingData }) {
  // options include: active, removed, reserved, pending_confirmation, sold
  const textbookstatus = listingData.status;

  async function handleAcceptBuyer() {
    await acceptBuyer(listingData);
  }

  async function handleDenyBuyer() {
    await denyBuyer(listingData);
  }

  async function handleRemoveListing() {
    await listingRemove(listingData);
  }

  async function handleCancelReservation() {
    await sellerReservationCancel(listingData);
  }

  async function handleSellerConfirmTransaction() {
    await sellerConfirmTransaction(listingData);
  }

  return (
    <Container className="page-container">
      <>
        <Listing listingData={listingData} />

        <Row>
          {/* Show remove listing button only if textbook transaction has not been completed */}
          <Col md={3}>
            {textbookstatus !== EventStatus.SOLD && textbookstatus !== EventStatus.REMOVED && (
              <button type="button" onClick={handleRemoveListing} className="btn btn-secondary w-20 mt-2 mx-auto">
                Remove Listing
              </button>
            )}
          </Col>
          <Col md={3}></Col>

          {/* Show accept and deny button only if textbook is reserved */}
          {textbookstatus === EventStatus.RESERVED && (
            <>
              <Col md={3}>
                <button type="button" onClick={handleAcceptBuyer} className="btn btn-primary w-20 mt-2 mx-auto">
                  Accept Buyer
                </button>
              </Col>
              <Col md={3}>
                <button type="button" onClick={handleDenyBuyer} className="btn btn-primary w-20 mt-2 mx-auto">
                  Deny Buyer
                </button>
              </Col>
            </>
          )}

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
                  onClick={handleSellerConfirmTransaction}
                  className="btn btn-primary w-20 mt-2 mx-auto">
                  Confirm Transaction is Complete
                </button>
              </Col>
            </>
          )}
        </Row>

        {/* Show text only when textbook is reserved and the accept and deny button is visible */}
        {textbookstatus === EventStatus.RESERVED && (
          <>
            <Row className="info-row mt-4">
              <div>
                <b>Accept: </b> We will share your contact info with the Buyer. You will be responsible for reaching out
                to the buyer to set up an exchange.
              </div>
            </Row>
            <Row className="info-row">
              <div>
                <b>Deny:</b> We will put your item back on sale for another buyer to purchase.
              </div>
            </Row>
          </>
        )}
      </>
    </Container>
  );
}

export default SellerListing;

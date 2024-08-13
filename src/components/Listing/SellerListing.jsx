import { useEffect } from 'react';
import Listing from './Listing';
import { Button, Row, Col, Container } from 'react-bootstrap';

function SellerListing({ listingData }) {
    
  const textbookstatus = "reserved";
  //options include: listed, reserved, reservation_canceled, listing_removed, 
  //buyer_accepted, buyer_denied, seller_confirmed_transaction, 
  //buyer_confirmed_transaction

  const handleAcceptBuyer = () => {
    // TODO logic to accept the buyer
  };

  const handleDenyBuyer = () => {
    // TODO logic to deny the buyer
  };

  const handleRemoveListing = () => {
    // TODO logic to remove the listing
  };

  const handleCancelReservation = () => {
    // TODO logic to cancel a reservation
  };

  const sellerConfirmTransaction = () => {
    // TODO logic to confirm a transaction
  };

  return (
    <Container className="page-container">
    <>
      <Listing listingData={listingData} />

      <Row>
        {/* Show remove listing button only if textbook transaction has not been completed */}
        <Col md={3}>
          {textbookstatus !== "seller_confirmed_transaction" && textbookstatus !== "buyer_confirmed_transaction" && textbookstatus !== "listing_removed" && (
            <button type="button" onClick={handleRemoveListing} className="btn btn-secondary w-20 mt-2 mx-auto">
              Remove Listing
            </button>
          )}
        </Col>
        <Col md={3}></Col>

        {/* Show accept and deny button only if textbook is reserved */}
        {textbookstatus === "reserved" && (
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
        {textbookstatus === "buyer_accepted" && (
          <>
            <Col md={3}>
              <button type="button" onClick={handleCancelReservation} className="btn btn-primary w-20 mt-2 mx-auto">
                Cancel Reservation
              </button>
            </Col>
            <Col md={3}>
            <button type="button" onClick={sellerConfirmTransaction} className="btn btn-primary w-20 mt-2 mx-auto">
              Confirm Transaction is Complete
            </button>
            </Col>
          </>
        )}
      </Row>
      
      {/* Show text only when textbook is reserved and the accept and deny button is visible */}
      {textbookstatus === "reserved" && (
        <> 
          <Row className="info-row mt-4">
            <div><b>Accept: </b> We will share your contact info with the Buyer. You will be responsible for reaching out to the buyer to set up an exchange.</div>
          </Row>
          <Row className="info-row">
            <div><b>Deny:</b> We will put your item back on sale for another buyer to purchase.</div>
          </Row>
        </>
      )}

    </>
    </Container>
  );
}

export default SellerListing;

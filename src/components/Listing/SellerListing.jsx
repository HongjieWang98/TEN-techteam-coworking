import { useEffect } from 'react';
import Listing from './Listing';
import { Button, Row, Col, Container } from 'react-bootstrap';

function SellerListing({ listingData }) {
  let buyerExists = true;
  const canRemove = true;

  useEffect(() => {
    buyerExists = !!listingData.buyer;
    // canRemove = if status is 0,1,2
  });

  const handleAcceptBuyer = () => {
    // TODO logic to accept the buyer
  };

  const handleDenyBuyer = () => {
    // TODO logic to deny the buyer
  };

  const handleRemoveListing = () => {
    // TODO logic to remove the listing
  };

  return (
    <Container className="page-container">
    <>
      <Listing listingData={listingData} />

      <Row>

        {buyerExists && (
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

        <Col md={3}></Col>
        <Col md={3}>
          {canRemove && (
            <button type="button" onClick={handleRemoveListing} className="btn btn-secondary w-20 mt-2 mx-auto">
              Remove Listing
            </button>
          )}
        </Col>
      </Row>
      
      <Row className="info-row mt-4">
        <p> <b>Accept:</b> Share your contact info with the Buyer. You will be responsible for reaching out to the buyer to set up an exchange.</p>
      </Row>
      <Row className="info-row">
        <p> <b>Deny:</b> put your item back on sale for another buyer to purchase.</p>
      </Row>
    </>
    </Container>
  );
}

export default SellerListing;

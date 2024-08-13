import Listing from './Listing';

function BuyerListing({ listingData }) {

  const textbookstatus = "reserved";

  const handleCancelReservation = () => {
    // TODO logic to cancel a reservation
  };

  const buyerConfirmTransaction = () => {
    // TODO logic to confirm a transaction
  };

  return(
    <Container className="page-container">
    <>
      <Listing listingData={listingData} />

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

    </>
    </Container>
  );

}

export default BuyerListing;

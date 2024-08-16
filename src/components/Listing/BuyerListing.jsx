import { buyerConfirmTransaction, buyerReservationCancel } from '../../api/textbook';
import Listing from './Listing';

function BuyerListing({ listingData }) {
  const textbookstatus = listingData.status;

  const handleCancelReservation = () => {
    buyerReservationCancel(listingData);
  };

  const handleBuyerConfirmTransaction = () => {
    buyerConfirmTransaction(listingData);
  };

  return (
    <Container className="page-container">
      <>
        <Listing listingData={listingData} />

        {/* Show accept and deny button only if textbook is reserved */}
        {textbookstatus === 'pending_confirmation' && (
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

import { Col, Container, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { buyerConfirmTransaction, buyerReservationCancel, buyerReservationRequestCancel } from '../../api/textbook';
import { EventStatus } from '../../api/process_textbook';
import Listing from './Listing';

function BuyerListing({ listingData }) {
  const [textbookstatus, settextbookstatus] = useState(listingData.status);
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    message: '',
    functionOnConfirm: null
  });
  const [didConfirmation, setDidConfirmation] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDidConfirmation(false);
  };
  const handleShow = (action, actionFunction) => {
    setModalInfo({
      message: `Are you sure you want to ${action}?`,
      functionOnConfirm: actionFunction
    });
    setShow(true);
  };

  async function handleCancelReservationRequest() {
    try {
      await buyerReservationRequestCancel(listingData);
      settextbookstatus(EventStatus.ACTIVE);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The reservation request was successfully canceled!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in canceling your reservation request, the seller could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleCancelReservation() {
    try {
      await buyerReservationCancel(listingData);
      settextbookstatus(EventStatus.ACTIVE);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The reservation was successfully canceled!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in canceling your reservation, the seller could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleBuyerConfirmTransaction() {
    try {
      await buyerConfirmTransaction(listingData);
      settextbookstatus(EventStatus.SOLD);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The transaction was successfully confirmed!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in confirming your transaction, the seller could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  return (
    <Container className="page-container">
      <>
        <Listing listingData={listingData} />
        <Modal show={show} onHide={() => handleClose()} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalInfo.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            {!didConfirmation && (
              <Button variant="primary" onClick={() => modalInfo.functionOnConfirm()}>
                Confirm Action
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        {textbookstatus === EventStatus.RESERVED && (
          <Col md={3}>
            <button
              type="button"
              onClick={() => handleShow('cancel your reservation request', handleCancelReservationRequest)}
              className="btn btn-primary w-20 mt-2 mx-auto">
              Cancel Reservation Request
            </button>
          </Col>
        )}

        {/* Show confirmation button only when buyer has been accepted */}
        {textbookstatus === EventStatus.PENDING_CONFIRMATION && (
          <>
            <Col md={3}>
              <button
                type="button"
                onClick={() => handleShow('cancel your reservation', handleCancelReservation)}
                className="btn btn-primary w-20 mt-2 mx-auto">
                Cancel Reservation
              </button>
            </Col>
            <Col md={3}>
              <button
                type="button"
                onClick={() => handleShow('confirm your transaction', handleBuyerConfirmTransaction)}
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

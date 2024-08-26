import { Row, Col, Container, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
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
  // Using useState is a patchwork fix in the future there might be additional DB Gets
  // especially if the buyer does something which should change the buttons on the seller side (but currently would not be updated)
  const [textbookstatus, settextbookstatus] = useState(listingData.status);
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    message: '',
    functionOnConfirm: null
  });
  const [didConfirmation, setDidConfirmation] = useState(false);

  const handleClose = () => {
    setDidConfirmation(false);
    setShow(false);
  };
  const handleShow = (action, actionFunction) => {
    setModalInfo({
      message: `Are you sure you want to ${action}?`,
      functionOnConfirm: actionFunction
    });
    setShow(true);
  };

  async function handleAcceptBuyer() {
    try {
      await acceptBuyer(listingData);
      settextbookstatus(EventStatus.PENDING_CONFIRMATION);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The buyer was successfully accepted!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in accepting your buyer, the buyer could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleDenyBuyer() {
    try {
      await denyBuyer(listingData);
      settextbookstatus(EventStatus.ACTIVE);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The buyer was successfully denied!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in denying your buyer, the buyer could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleRemoveListing() {
    try {
      await listingRemove(listingData);
      settextbookstatus(EventStatus.REMOVED);
      setDidConfirmation(true);
      setModalInfo({
        message: 'Your listing was successfully removed!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in removing your listing, the buyer could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleCancelReservation() {
    try {
      await sellerReservationCancel(listingData);
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
            'Error in canceling your reservation, the buyer could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  async function handleSellerConfirmTransaction() {
    try {
      await sellerConfirmTransaction(listingData);
      settextbookstatus(EventStatus.SOLD);
      setDidConfirmation(true);
      setModalInfo({
        message: 'The transaction was successfully canceled!',
        functionOnConfirm: null
      });
    } catch (e) {
      setDidConfirmation(false);
      setModalInfo((prevModalInfo) => {
        return {
          ...prevModalInfo,
          message:
            'Error in confirming your transaction, the buyer could have already interacted with this textbook, try again now or refresh the page and try again.'
        };
      });
    }
  }

  return (
    <Container className="page-container">
      <>
        <Listing listingData={listingData} />

        <Modal show={show} onHide={() => handleClose()}>
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
        <Row>
          {/* Show remove listing button only if textbook transaction has not been completed */}
          <Col md={3}>
            {textbookstatus !== EventStatus.SOLD && textbookstatus !== EventStatus.REMOVED && (
              <button
                type="button"
                onClick={() => handleShow('remove your listing', handleRemoveListing)}
                className="btn btn-secondary w-20 mt-2 mx-auto">
                Remove Listing
              </button>
            )}
          </Col>
          <Col md={3} />

          {/* Show accept and deny button only if textbook is reserved */}
          {textbookstatus === EventStatus.RESERVED && (
            <>
              <Col md={3}>
                <button
                  type="button"
                  onClick={() => handleShow('accept the buyer', handleAcceptBuyer)}
                  className="btn btn-primary w-20 mt-2 mx-auto">
                  Accept Buyer
                </button>
              </Col>
              <Col md={3}>
                <button
                  type="button"
                  onClick={() => handleShow('deny the buyer', handleDenyBuyer)}
                  className="btn btn-primary w-20 mt-2 mx-auto">
                  Deny Buyer
                </button>
              </Col>
            </>
          )}

          {/* Show accept and deny button only if textbook is reserved */}
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
                  onClick={() => handleShow('confirm the transaction', handleSellerConfirmTransaction)}
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

import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './BuySuccessPage.css';

function BuySuccessPage() {
  const location = useLocation();
  const { state } = location;
  const { bookReserve } = state || {}; // Extract bookReserve from state

  // Separate textbooks into reserved and failed
  const successfullyReserved = bookReserve?.filter((textbook) => textbook.reserved) || [];
  const failedToReserve = bookReserve?.filter((textbook) => !textbook.reserved) || [];

  return (
    <Container fluid className="p-4">
      <Col md={8} className="mb-4">
        <Container className="next-steps-container">
          <Row className="justify-content-center">
            <Col md={12} className="mb-4">
              <Card className="next-steps-card">
                <Card.Header as="h5">You will be contacted to set up an exchange!</Card.Header>
                <Card.Body>
                  <Card.Text>
                    The Seller has been notified that you are interested in their textbook! They will accept or decline
                    the request to purchase this textbook and you will be notified. If they accept, we will provide them
                    your contact information and they will reach out to you to organize an exchange. This should occur
                    within the next week.
                  </Card.Text>
                  <Card.Text>
                    Exchanges must occur at [location of exchange] between the hours of [time of exchange]. Please
                    confirm on the payment method used in advance, and make the payment in person during the exchange.
                    If doing an electronic payment, you must exchange handles with the seller.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="mb-4">
              <Card className="next-steps-card">
                <Card.Header as="h5">Cancel your reservation</Card.Header>
                <Card.Body>
                  <Card.Text>
                    If you wish to cancel, navigate to “My account” and cancel the reservation. This will cancel your
                    reservation and automatically put the book back up for sale.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="mb-4">
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

      <Row className="mb-4">
        <Col>
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
                  <td>{textbook.courseAndDpmt}</td>
                  <td>{textbook.title}</td>
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

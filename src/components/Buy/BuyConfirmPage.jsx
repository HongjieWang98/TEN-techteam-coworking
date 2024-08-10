import { useNavigate } from 'react-router-dom';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { useBuyContext } from '../../contexts/BuyContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { reserveTextbooks } from '../../api/textbook';

function BuyConfirmPage() {
  const { cartData, emptyCart, cartPrice } = useBuyContext();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  async function reserveBooks() {
    // Reserve the textbooks returns a list of the textbook object with an
    // additional parameter to state whether it has been bought or not
    const bookReserve = await reserveTextbooks(cartData, currentUser.id);
    emptyCart();
    navigate('/buysuccess', { state: { bookReserve } });
  }

  function backToInventory() {
    navigate('/inventory');
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2>Textbooks:</h2>
        </Col>
      </Row>

      {currentUser && cartData ? (
        <>
          <Row className="mb-4">
            <Col>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((textbook) => (
                    <tr key={textbook.id}>
                      <td>{`${textbook.department} ${textbook.course_number}`}</td>
                      <td>{textbook.title}</td>
                      <td>{textbook.author}</td>
                      <td>{textbook.isbn}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <h4>Total Cost: ${cartPrice.toFixed(2)}</h4>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <button type="button" className="btn btn-primary" onClick={backToInventory}>
                Add Another Item
              </button>
              <button type="button" className="btn-secondary btn" onClick={reserveBooks}>
                Reserve Books
              </button>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <Alert variant="info">
                <p>
                  By continuing, you accept our <a href="/privacy">privacy policy</a> and{' '}
                  <a href="/terms">terms and conditions</a>.
                </p>
                <p>
                  By continuing, you agree to allow TEN to share your contact information with the seller to coordinate
                  an exchange.
                </p>
              </Alert>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center">
          <Col xs="auto">
            <h1>Loading...</h1>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuyConfirmPage;

import { Accordion, Table, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './BuySuccessPage.css';

function BuySuccessPage() {
  const location = useLocation();
  const { state } = location;
  const { bookReserve } = state || {}; // Extract bookReserve from state

  // Separate textbooks into bought and failed
  const successfullyReserved = bookReserve?.filter((textbook) => textbook.bought) || [];
  const failedToReserve = bookReserve?.filter((textbook) => !textbook.bought) || [];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h1>Textbook Reserve Report</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>Content for the first accordion item.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>Content for the second accordion item.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Accordion Item #3</Accordion.Header>
              <Accordion.Body>Content for the third accordion item.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>Textbooks Successfully Bought: {successfullyReserved.length}</h2>
          {successfullyReserved.length > 0 && (
            <Table striped bordered hover responsive="lg" className="w-100">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {successfullyReserved.map((textbook) => (
                  <tr key={textbook.id}>
                    <td>{textbook.course}</td>
                    <td>{textbook.title}</td>
                    <td>{textbook.author}</td>
                    <td>{textbook.isbn}</td>
                    <td>Successfully Reserved</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Textbooks Failed to Reserve: {failedToReserve.length}</h2>
          <div>An error occured when </div>
          {failedToReserve.length > 0 && (
            <Table striped bordered hover responsive="lg" className="w-100">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {failedToReserve.map((textbook) => (
                  <tr key={textbook.id}>
                    <td>{textbook.course}</td>
                    <td>{textbook.title}</td>
                    <td>{textbook.author}</td>
                    <td>{textbook.isbn}</td>
                    <td>Failed to Reserve</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BuySuccessPage;

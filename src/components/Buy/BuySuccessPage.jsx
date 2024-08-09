import { Accordion, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function BuySuccessPage() {
  const location = useLocation();
  const { state } = location;
  const { bookReserve } = state || {}; // Extract bookReserve from state

  // Separate textbooks into bought and failed
  const successfullyBought = bookReserve?.filter((textbook) => textbook.bought) || [];
  const failedToBuy = bookReserve?.filter((textbook) => !textbook.bought) || [];

  return (
    <>
      <h1>Textbook Reserve Report</h1>

      <Accordion defaultActiveKey="0">
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

      <h2>Textbooks Successfully Bought: {successfullyBought.length}</h2>
      {successfullyBought.length > 0 && (
        <Table striped bordered hover>
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
            {successfullyBought.map((textbook) => (
              <tr key={textbook.id}>
                <td>{textbook.course}</td>
                <td>{textbook.title}</td>
                <td>{textbook.author}</td>
                <td>{textbook.isbn}</td>
                <td>Successfully Bought</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h2>Textbooks Failed to Buy: {failedToBuy.length}</h2>
      {failedToBuy.length > 0 && (
        <Table striped bordered hover>
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
            {failedToBuy.map((textbook) => (
              <tr key={textbook.id}>
                <td>{textbook.course}</td>
                <td>{textbook.title}</td>
                <td>{textbook.author}</td>
                <td>{textbook.isbn}</td>
                <td>Failed to Buy</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default BuySuccessPage;

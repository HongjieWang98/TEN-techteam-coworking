import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#DBEEFF',
  overflow: 'hidden'
};

const linkStyle = {
  display: 'block',
  color: 'white',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none',
  float: 'left'
};

const containerStyle = {
  padding: '50px'
};

function Profile() {
  return (
    <>
      <Container style={containerStyle}>
        <Row>
          <Col>
            <Container>
              <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Body>
                  <Card.Title>Student Name</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Student Email</ListGroup.Item>
                  <ListGroup.Item>Student Phone Number</ListGroup.Item>
                  <ListGroup.Item>Student Venmo</ListGroup.Item>
                  <Button variant="primary">View Account Information</Button>{' '}
                </ListGroup>
              </Card>
            </Container>
          </Col>
          <Col>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Your Listings</Accordion.Header>
                <Accordion.Body>Lorem ipsum</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>In Progress Purchases</Accordion.Header>
                <Accordion.Body>Lorem ipsum</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Your Past Purchases</Accordion.Header>
                <Accordion.Body>Lorem ipsum</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;

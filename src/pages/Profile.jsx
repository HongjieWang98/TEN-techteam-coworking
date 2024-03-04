//Profile.js
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const Profile = (props) => {
	return (
	  <>
		<h1>Profile</h1>
		<Container>
		  <Row>
			<Col>
			<Container>
			  <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
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
				      <Accordion.Body>
				        Lorem ipsum 
				      </Accordion.Body>
			      </Accordion.Item>
			    <Accordion.Item eventKey="1">
				    <Accordion.Header>In Progress Purchases</Accordion.Header>
				      <Accordion.Body>
				        Lorem ipsum
				      </Accordion.Body>
			      </Accordion.Item>
          <Accordion.Item eventKey="2">
				    <Accordion.Header>Your Past Purchases</Accordion.Header>
				      <Accordion.Body>
				        Lorem ipsum 
				      </Accordion.Body>
			    </Accordion.Item>
			  </Accordion>
			</Col>
		  </Row>
		</Container>
		  
		  <Link to='/applicationform'>Click Here to go to CreateListing Component</Link>
  
	  </>
	);
};
  
  export default Profile;
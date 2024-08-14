import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { auth } from '../../firebase/firebase_config';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import "./Profile.css"

function Profile() {
  const { currentUser, signOut } = useAuthContext();
  const navigate = useNavigate();
  const testdata = {
    columns: [
      { label: 'Textbook', field: 'title', sort: 'asc' },
      { label: 'Cost', field: 'cost', sort: 'asc' },
      { label: 'Author', field: 'author', sort: 'asc' },
      { label: 'View textbook', field: 'view', sort: 'asc' }
    ],
    rows: [
      { title: 'General Chemistry', cost: 30, author: 'John Smith', view: 'button'},
      { title: 'Calculus', cost: 25, author: 'John Smith', view: 'button' },
    ]
  };

  const handleLogout = async () => {
    if (currentUser) {
      await signOut();
    }
    navigate('/');
  };


  return (
    <>
      <Container fluid className="profile-container">
        <Row>
          <Col md={4}>
            <Container>
              <Card>
                <Card.Body>
                  <div className="user-image-placeholder">
                    <p>Ability to upload your photo coming soon!</p>
                  </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Student Email</ListGroup.Item>
                  <ListGroup.Item>Student Phone Number</ListGroup.Item>
                  <ListGroup.Item>Student Venmo</ListGroup.Item>
                  {/* <Button variant="primary">View Account Information</Button>{' '} */}
                </ListGroup>
              </Card>
            </Container>
            <Button variant="secondary" onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          </Col>
          <Col md={8}>
            <div className="accordion-container">
              <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                <Accordion.Item eventKey="0" className="accordion-item">
                  <Accordion.Header>Your Listings</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      entries={false}  // Hide "Show Entries"
                      paging={false}   // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      data={testdata}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="accordion-item">
                  <Accordion.Header>Your In Progress Purchases</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      entries={false}  // Hide "Show Entries"
                      paging={false}   // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      data={testdata}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="accordion-item">
                  <Accordion.Header>Completed Purchases</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      entries={false}  // Hide "Show Entries"
                      paging={false}   // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      data={testdata}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="accordion-item">
                  <Accordion.Header>Completed Sales</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      entries={false}  // Hide "Show Entries"
                      paging={false}   // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      data={testdata}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;

import { Container, Button, Card, Row, Col, ListGroup, Accordion } from 'react-bootstrap';
import { auth } from '../../firebase/firebase_config';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useState, useEffect } from 'react';
import { getExchangeLocationAndSchedule } from '../../api/organization';
import "./Profile.css"

function getDayName(index) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[index];
}

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

  const [organizationData, setOrganizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //console.log("Current User object:", currentUser);  // Log the entire currentUser object
    //console.log("Organization ID:", currentUser?.organization_id);  // Log the organization_id if available

    async function fetchData() {
      if (!currentUser || !currentUser.organization_id) {
        setError('User or organization ID is not available');
        setLoading(false);
        return;
      }
      try {
        const data = await getExchangeLocationAndSchedule(currentUser.organization_id);
        setOrganizationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  // Create a complete schedule with all days, including those without times
  const completeSchedule = [
    { day: 'Sun', start: '', end: '' },
    { day: 'Mon', start: '', end: '' },
    { day: 'Tue', start: '', end: '' },
    { day: 'Wed', start: '', end: '' },
    { day: 'Thu', start: '', end: '' },
    { day: 'Fri', start: '', end: '' },
    { day: 'Sat', start: '', end: '' }
  ];

  // Fill in the schedule with data from organizationData
  if (organizationData && organizationData.schedule) {
    organizationData.schedule.forEach((day, index) => {
      if (day !== null && day.start && day.end) {
        completeSchedule[index] = {
          day: getDayName(index),
          start: day.start,
          end: day.end
        };
      }
    });
  }

  // Filter out days with missing times and format the schedule string
  const scheduleString = completeSchedule
    .filter(day => day.start && day.end) // Exclude days with missing times
    .map(day => `${day.day}: ${day.start} - ${day.end}`)
    .join('; ');

  return (
    <>
      <Container fluid className="profile-container">
        <div className="centered-text">
          Remember, for your universitiy, exchanges must occur at {organizationData?.exchange_location || '[location not available]'} between the hours of {scheduleString || '[time not available]'}
        </div>

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

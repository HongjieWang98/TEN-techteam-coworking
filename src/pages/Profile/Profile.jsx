import { Container, Button, Card, Row, Col, ListGroup, Accordion } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getExchangeLocationAndSchedule } from '../../api/organization';
import './Profile.css';
import { getTextbooksByUserId } from '../../api/textbook';
import { EventStatus } from '../../api/process_textbook';

function getDayName(index) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[index];
}

function Profile() {
  const profileColumn = [
    { label: 'Textbook', field: 'title', sort: 'asc' },
    { label: 'Price', field: 'price', sort: 'asc' },
    { label: 'Author', field: 'author', sort: 'asc' },
    { label: 'Status', field: 'status', sort: 'asc' },
    { label: 'View textbook', field: 'view', sort: 'asc' }
  ];
  const { currentUser, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (currentUser) {
      await signOut();
    }
    navigate('/');
  };

  const [organizationData, setOrganizationData] = useState(null);

  // These states reflect the rows of the 4 different tables
  const [userSelling, setUserSelling] = useState({
    columns: profileColumn,
    rows: []
  });
  const [userBuying, setUserBuying] = useState({
    columns: profileColumn,
    rows: []
  });
  const [userBought, setUserBought] = useState({
    columns: profileColumn,
    rows: []
  });
  const [userSold, setUserSold] = useState({
    columns: profileColumn,
    rows: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatTableRows(textbook) {
    const rowInfo = {
      id: textbook.id,
      title: textbook.title,
      price: `$${textbook.price}`,
      author: textbook.author,
      status: textbook.status,
      view: (
        <Button variant="primary" as={Link} to={`/listing/${textbook.id}`} className="viewdetails-button">
          View Details
        </Button>
      )
    };
    return rowInfo;
  }

  useEffect(() => {
    //console.log("Current User object:", currentUser);  // Log the entire currentUser object
    //console.log("Organization ID:", currentUser?.organization_id);  // Log the organization_id if available

    async function fetchSchedulingData() {
      if (!currentUser || !currentUser.organization_id) {
        setError('User or organization ID is not available');
        setLoading(false);
        return;
      }
      try {
        const data = await getExchangeLocationAndSchedule(currentUser.organization_id);

        setOrganizationData(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchUserRelevantTextbooks() {
      if (!currentUser) {
        return;
      }
      const textbookData = await getTextbooksByUserId(currentUser.id);
      if (textbookData) {
        const userSell = textbookData.filter(
          (book) =>
            (book.status === EventStatus.ACTIVE ||
              book.status === EventStatus.PENDING_CONFIRMATION ||
              book.status === EventStatus.RESERVED) &&
            book.seller_id === currentUser.id
        );
        const userBuy = textbookData.filter(
          (book) =>
            (book.status === EventStatus.PENDING_CONFIRMATION || book.status === EventStatus.RESERVED) &&
            book.buyer_id === currentUser.id
        );
        const userDoneSell = textbookData.filter(
          (book) => book.status === EventStatus.SOLD && book.seller_id === currentUser.id
        );
        const userDoneBuy = textbookData.filter(
          (book) => book.status === EventStatus.SOLD && book.buyer_id === currentUser.id
        );

        setUserSelling({
          columns: profileColumn,
          rows: userSell.map((book) => formatTableRows(book))
        });
        setUserBuying({
          columns: profileColumn,
          rows: userBuy.map((book) => formatTableRows(book))
        });
        setUserSold({
          columns: profileColumn,
          rows: userDoneSell.map((book) => formatTableRows(book))
        });
        setUserBought({
          columns: profileColumn,
          rows: userDoneBuy.map((book) => formatTableRows(book))
        });
      }
    }
    fetchSchedulingData();
    fetchUserRelevantTextbooks();
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
    .filter((day) => day.start && day.end) // Exclude days with missing times
    .map((day) => `${day.day}: ${day.start} - ${day.end}`)
    .join('; ');

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Container fluid className="profile-container">
        <div className="centered-text">
          Remember, for your university, exchanges must occur at{' '}
          {organizationData?.exchange_location || '[location not available]'} between the hours of{' '}
          {scheduleString || '[time not available]'}
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
                  <ListGroup.Item>
                    {currentUser?.contact_info.school_email
                      ? `Student School Email: ${currentUser.contact_info.school_email}`
                      : 'No school email available'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {currentUser?.contact_info.secondary_email
                      ? `Student Secondary Email: ${currentUser.contact_info.secondary_email}`
                      : 'No secondary email available'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {currentUser?.contact_info.phone_number
                      ? `Student Phone Number: ${currentUser.contact_info.phone_number}`
                      : 'No phone number available'}
                  </ListGroup.Item>
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
                  <Accordion.Header>Your In Progress Sales</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      paging={false} // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      noBottomColumns
                      data={userSelling}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="accordion-item">
                  <Accordion.Header>Your In Progress Purchases</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      paging={false} // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      noBottomColumns
                      data={userBuying}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="accordion-item">
                  <Accordion.Header>Completed Purchases</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      paging={false} // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      noBottomColumns
                      data={userBought}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="accordion-item">
                  <Accordion.Header>Completed Sales</Accordion.Header>
                  <Accordion.Body>
                    <MDBDataTable
                      bordered
                      small
                      paging={false} // Remove pagination (Next/Previous buttons)
                      searching={false} // Remove the search bar
                      displayEntries={false} // Remove footer (column titles at the bottom)
                      noBottomColumns
                      data={userSold}
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

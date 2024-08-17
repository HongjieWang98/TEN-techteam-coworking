import './HowTo.css';
import logoimage from '../../../images/logo2.png';
import Accordion from 'react-bootstrap/Accordion';

import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getOrganizations } from '../../../api/organization';

function OverviewExplanation() {
  return (
    <div>
      <div className="SectionTitle">How It Works</div>
      <div className="SectionContent">
        The Textbook Exchange Network offers two products to universities, an in-person exchange and a virtual exchange.
        Each university may only use one and each exchange has different proccesses and rules. Please select your
        university to see what kind of textbook exchange your school is using!
      </div>
    </div>
  );
}

function EndingLogo() {
  return (
    <div className="EndingWrapper">
      <img src={logoimage} width="125px" />
    </div>
  );
}

function HowItWorksInPerson(props) {
  const { school } = props; // destructuring prop or else would get linter error

  return (
    <div className="SectionWrapper">
      <div className="SectionSubtitle">{school} is using an in-person textbook exchange!</div>
      <div className="NavFullContainer">
        <div className="NavPillContainer">
          <Tabs defaultActiveKey="sell" id="uncontrolled-tab-example" className="mb-3 nav-justified">
            <Tab eventKey="sell" title="Selling">
              <Row>
                <Col md={4}>
                  <div className="BigNumberGreen">1</div>
                  <div className="HowToText">
                    Bring your books to the Exchange on your campus (your student government will advertise the location
                    and open times!)
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">2</div>
                  <div className="HowToText">
                    List your books at a TEN Kiosk located at the Exchange. Shoot us an email if you want to change the
                    price later!
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">3</div>
                  <div className="HowToText">
                    If someone buys your book, you will receive an email and a payment in a couple of days!
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="buy" title="Buying">
              <Row>
                <Col md={4}>
                  <div className="BigNumberYellow">1</div>
                  <div className="HowToText">
                    Check the current book inventory on the 'Browse' tab to ensure the Exchange has the textbooks you
                    need.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">2</div>
                  <div className="HowToText">
                    Go to the Textbook Exchange at the posted time, date, and location. (Your student government will
                    advertise this info!)
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">3</div>
                  <div className="HowToText">
                    Find the textbook at the Exchange, checkout at a TEN Kiosk, and pay the seller. The book is now
                    yours!
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function HowItWorksVirtual(props) {
  const { school } = props; // destructuring prop or else would get linter error

  return (
    <div className="SectionWrapper">
      <div className="SectionSubtitle">{school} is using a virtual textbook exchange!</div>
      <div className="NavFullContainer">
        <div className="NavPillContainer">
          <Tabs defaultActiveKey="sell" id="uncontrolled-tab-example" className="mb-3 nav-justified">
            <Tab eventKey="sell" title="Selling">
              <Row>
                <Col md={4}>
                  <div className="BigNumberGreen">1</div>
                  <div className="HowToText">
                    Go to the 'Get started' tab and create an account with your school email. You can then list as many
                    textbooks as you would like from your home
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">2</div>
                  <div className="HowToText">
                    'Accept' or 'Deny' a buyer via email when someone is interested in your book. If accepted, reach out
                    to the buyer to coordinate an exchange. If denied, your book will be re-listed.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">3</div>
                  <div className="HowToText">
                    Exchanges occur during a school specified time window and location. Payments should be made in
                    person, and transactions should be confirmed online after they are completed.
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="buy" title="Buying">
              <Row>
                <Col md={4}>
                  <div className="BigNumberYellow">1</div>
                  <div className="HowToText">
                    Go to the 'Get started' tab and create an account with your school email. You can then add any
                    textbooks you're interested in to your card and checkout.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">2</div>
                  <div className="HowToText">
                    Sellers will be notified of your interest in the books. If the seller accepts you, they will reach
                    out to coordinate a transaction. If denied, the exchange will be canceled
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">3</div>
                  <div className="HowToText">
                    Exchanges occur during a school specified time window and location. Payments should be made in
                    person, and transactions should be confirmed online after they are completed.
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function FAQVirtual() {
  return (
    <div className="SectionWrapper">
      <div className="SectionTitleHeaderNav">FAQ</div>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What happens if my textbook is not sold?</Accordion.Header>
          <Accordion.Body className="left-align">
            Your textbook will remain listed until you remove it. If the textbook is not sold and you do not remove the
            listing, it will remain indefinitely.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            What happens if the seller does not approve me? What if the seller approves me, but they never reach out?
          </Accordion.Header>
          <Accordion.Body className="left-align">
            <p>
              To purchase a textbook, buyers must request approval from the seller. Once a buyer reserves a textbook,
              the seller will receive an email to either approve or deny the request. If the seller does not respond
              within one week, the reservation will be canceled and the textbook will be re-listed. The buyer will need
              to reserve a different textbook if this occurs.{' '}
            </p>
            <p>
              If the seller approves your request, they will contact you to arrange a time and location for the
              exchange. For safety reasons, exchanges must occur at a designated location and time set by your
              university. If the seller does not reach out within one week, the reservation will be canceled and the
              textbook will be re-listed. In this case, you should attempt to reserve another textbook. Alternatively,
              if the seller has approved your request, you can view their contact information on your profile page and
              reach out to them directly.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What do I do if I no longer want to sell my textbook?</Accordion.Header>
          <Accordion.Body className="left-align">
            You can easily cancel listings at any time from our website! Please note that this must occur before any
            purchase is made - all purchases are final.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

function FAQInPerson() {
  return (
    <div className="SectionWrapper">
      <div className="SectionTitleHeaderNav">FAQ</div>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What happens if my textbook is not sold?</Accordion.Header>
          <Accordion.Body className="left-align">
            If your textbook is not sold, you may pick it up at any time during open hours. After 2 years, if your
            textbook remains unsold, you will be required to pick it up. If you do not retrieve your textbook, TEN may
            donate it or dispose of it in another manner.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Can I return a textbook once I've bought it?</Accordion.Header>
          <Accordion.Body className="left-align">
            Once a textbook has been purchased and payment has been made to the seller, returns are not permitted. For
            privacy reasons, we cannot provide the contact information of the seller. However, you may re-list the
            textbook for sale on TEN. Similarly, if you have sold a textbook and received payment, the textbook cannot
            be retrieved.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What do I do if I no longer want to sell my textbook?</Accordion.Header>
          <Accordion.Body className="left-align">
            Come into the textbook exchange during open hours and ask a volunteer for it back! It's that easy! Please
            note that this must occur before any purchase is made - all purchases are final.
          </Accordion.Body>
          <Accordion.Body className="left-align">
            Come into the textbook exchange during open hours and ask a volunteer for it back! It's that easy! Please
            note that this must occur before any purchase is made - all purchases are final.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

function DropDown() {
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  async function fetchData() {
    const organizations = await getOrganizations();
    setAvailableSchools(organizations);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function renderExchangeInfo() {
    return (
      <>
        {selectedSchool ? (
          selectedSchool.isVirtual ? (
            <HowItWorksVirtual school={selectedSchool.name} />
          ) : (
            <HowItWorksInPerson school={selectedSchool.name} />
          )
        ) : (
          <p>Please select a school from the dropdown.</p>
        )}
        <FAQVirtual />
      </>
    );
  }

  function handleSelectChange(e) {
    const schoolName = e.target.value;
    const school = availableSchools.find((school) => school.name === schoolName);
    setSelectedSchool(school);
  }

  return (
    <div className="DropDown">
      <select className="DropDown" value={selectedSchool?.name || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select your school
        </option>
        {availableSchools.map((school) => (
          <option value={school.name} key={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      {selectedSchool && renderExchangeInfo()}
    </div>
  );
}

function HowToPage() {
  return (
    <div>
      <OverviewExplanation />
      {DropDown()}
      <EndingLogo />
    </div>
  );
}

export default HowToPage;

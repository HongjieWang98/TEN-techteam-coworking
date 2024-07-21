import React from 'react';
import './HowTo.css';
import logoimage from '../../../images/logo2.png';

import { Tab, Tabs, Row, Col } from 'react-bootstrap';

function OverviewExplanation() {
  return (
    <div>
      <div className="SectionTitle">How It Works</div>
      <div className="SectionContent">
        The Textbook Exchange Network offers two products to universities, an in-person exchange and
        a virtual exchange. Each university may only use one and each exchange has different
        proccesses and rules. Please select your university to see what kind of textbook exchange
        your school is using!
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
          <Tabs
            defaultActiveKey="sell"
            id="uncontrolled-tab-example"
            className="mb-3 nav-justified">
            <Tab eventKey="sell" title="Selling">
              <Row>
                <Col md={4}>
                  <div className="BigNumberGreen">1</div>
                  <div className="HowToText">
                    Bring your books to the Exchange on your campus (your student government will
                    advertise the location and open times!)
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">2</div>
                  <div className="HowToText">
                    List your books at a TEN Kiosk located at the Exchange. Shoot us an email if you
                    want to change the price later!
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">3</div>
                  <div className="HowToText">
                    If someone buys your book, you will receive an email and a payment in a couple
                    of days!
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="buy" title="Buying">
              <Row>
                <Col md={4}>
                  <div className="BigNumberYellow">1</div>
                  <div className="HowToText">
                    Check the current book inventory on the 'Browse' tab to ensure the Exchange has
                    the textbooks you need.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">2</div>
                  <div className="HowToText">
                    Go to the Textbook Exchange at the posted time, date, and location. (Your
                    student government will advertise this info!)
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">3</div>
                  <div className="HowToText">
                    Find the textbook at the Exchange, checkout at a TEN Kiosk, and pay the seller.
                    The book is now yours!
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
          <Tabs
            defaultActiveKey="sell"
            id="uncontrolled-tab-example"
            className="mb-3 nav-justified">
            <Tab eventKey="sell" title="Selling">
              <Row>
                <Col md={4}>
                  <div className="BigNumberGreen">1</div>
                  <div className="HowToText">
                    Go to the 'Get started' tab and create an account with your school email. You
                    can then list as many textbooks as you would like from your home
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">2</div>
                  <div className="HowToText">
                    'Accept' or 'Deny' a buyer via email when someone is interested in your book. If
                    accepted, reach out to the buyer to coordinate an exchange. If denied, your book
                    will be re-listed.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberGreen">3</div>
                  <div className="HowToText">
                    Exchanges occur during a school specified time window and location. Payments
                    should be made in person, and transactions should be confirmed online after they
                    are completed.
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="buy" title="Buying">
              <Row>
                <Col md={4}>
                  <div className="BigNumberYellow">1</div>
                  <div className="HowToText">
                    Go to the 'Get started' tab and create an account with your school email. You
                    can then add any textbooks you're interested in to your card and checkout.
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">2</div>
                  <div className="HowToText">
                    Sellers will be notified of your interest in the books. If the seller accepts
                    you, they will reach out to coordinate a transaction. If denied, the exchange
                    will be canceled
                  </div>
                </Col>
                <Col md={4}>
                  <div className="BigNumberYellow">3</div>
                  <div className="HowToText">
                    Exchanges occur during a school specified time window and location. Payments
                    should be made in person, and transactions should be confirmed online after they
                    are completed.
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
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              What happens if my textbook is not sold?
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>Placeholder</strong> Placeholder text
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo">
              What happens if the seller does not accept or reject me? What if they do but never
              reach out?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">Placeholder text</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree">
              Question 3
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">Placeholder text</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQInPerson() {
  return (
    <div className="SectionWrapper">
      <div className="SectionTitleHeaderNav">FAQ</div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              What happens if my textbook is not sold?
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>Placeholder</strong> Placeholder text
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo">
              Can I return a textbook once I've boughten it?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">Placeholder text</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree">
              What do I do if I no longer want to sell my textbook?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">Placeholder text</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDown() {
  const [selectedSchool, setSelectedSchool] = React.useState('none');
  const schools = [
    'Tufts University',
    'Wesleyan University',
    'Northeastern University',
    'Tower Hill School'
  ];

  // I will update this function at some point to lookup in the schoolList database to determine
  // what each school should route to. Right now it is hard coded
  function navigate() {
    return selectedSchool === 'none' ? (
      <div className="SectionContent"> Please select your school</div>
    ) : selectedSchool === 'Tufts University' ? (
      <>
        <HowItWorksVirtual school={selectedSchool} />
        <FAQVirtual />
      </>
    ) : (
      <>
        <HowItWorksInPerson school={selectedSchool} />
        <FAQInPerson />
      </>
    );
  }

  return (
    <div className="DropDown">
      <select
        className="DropDown"
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}>
        <option value="none" key="none">
          {'Select your school'}
        </option>
        {schools.map((school) => (
          <option value={school} key={school}>
            {school}
          </option>
        ))}
      </select>
      {navigate()}
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

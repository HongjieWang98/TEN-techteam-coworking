import React, { useEffect, useState } from 'react';
import './SchoolNav.css';
import { Container } from 'react-bootstrap';
import { useAuthContext } from '../../../contexts/AuthContext';
import logoimage from '../../../images/logo2.png';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../../components/Login/SignIn';
import { getVirtualOrganizations } from '../../../api/organization';

function LoginView(props) {
  const { school } = props; // destructuring prop or else would get linter error
  return (
    <>
      <div className="SectionSubtitle">{school} is using a virtual textbook exchange!</div>
      <div className="SectionContent">To buy or sell textbooks, please login or create an account below.</div>
      <div className="SectionWrapper">
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <SignIn />
          </div>
        </Container>
      </div>
    </>
  );
}

function ProdOneDesc(props) {
  const { school } = props; // destructuring prop or else would get linter error
  return (
    <>
      <div className="SectionSubtitle">{school} is using an in-person textbook exchange!</div>
      <div className="SectionContent">
        {`To buy or sell textbooks, you must go in-person to the ${school} Textbook Exchange. Please reach out to your
          student government to learn more about the open times for ${school}'s in-person textbook exchange. You may browse 
          the textbooks available in the 'browse' tab above.`}
      </div>
    </>
  );
}

function EndingLogo() {
  return (
    <div className="EndingWrapper">
      <img src={logoimage} width="125px" />
    </div>
  );
}

//will pull this from the database in the future
function SchoolNavPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  async function fetchData() {
    const virtualOrganizations = await getVirtualOrganizations();
    setAvailableSchools(virtualOrganizations);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser]);

  function renderExchangeInfoOrLogin() {
    return (
      <>
        {selectedSchool ? (
          selectedSchool.isVirtual ? (
            <LoginView school={selectedSchool.name} />
          ) : (
            <ProdOneDesc school={selectedSchool.name} />
          )
        ) : (
          <p>Please select a school from the dropdown.</p>
        )}
      </>
    );
  }

  function handleSelectChange(e) {
    const schoolName = e.target.value;
    const school = availableSchools.find((school) => school.name === schoolName);
    setSelectedSchool(school);
  }

  return (
    <>
      <div className="SectionTitleHeaderNav">What school do you attend?</div>

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
      </div>

      {selectedSchool && renderExchangeInfoOrLogin()}
      <EndingLogo />
    </>
  );
}

export default SchoolNavPage;

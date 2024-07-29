import React, { useEffect } from 'react';
import './SchoolNav.css';
import { Container } from 'react-bootstrap';
import { useAuthContext } from '../../../contexts/AuthContext';
import logoimage from '../../../images/logo2.png';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../../components/Login/SignIn';

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

  useEffect(() => {
    if (currentUser) {
      navigate('/listing/buy');
    }
  }, [currentUser]);

  const schools = ['Tufts University', 'Wesleyan University', 'Northeastern University', 'Tower Hill School'];

  const [selectedSchool, setSelectedSchool] = React.useState('none');

  // I will update this function at some point to lookup in the schoolList database to determine
  // what each school should route to. Right now it is hard coded
  function navigateToSchool() {
    return selectedSchool === 'none' ? (
      <div className="SectionContent"> Please select your school</div>
    ) : selectedSchool === 'Tufts University' ? (
      <LoginView school={selectedSchool} />
    ) : (
      <ProdOneDesc school={selectedSchool} />
    );
  }

  return (
    <>
      <div className="SectionTitleHeaderNav">What school do you attend?</div>

      <div className="DropDown">
        <select className="DropDown" value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
          <option value="none" key="none">
            {'Select your school'}
          </option>
          {schools.map((school) => (
            <option value={school} key={school}>
              {school}
            </option>
          ))}
        </select>
      </div>

      <p> </p>

      {navigateToSchool()}
      <EndingLogo />
    </>
  );
}

export default SchoolNavPage;

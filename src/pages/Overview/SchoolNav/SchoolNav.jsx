import React from 'react';
import './SchoolNav.css';
import { Container } from 'react-bootstrap';
import Signin from '../../../components/Signin';
import { AuthProvider } from '../../../contexts/AuthContext';

function LoginView(props) {
  const { school } = props; // destructuring prop or else would get linter error
  return (
    <>
      <h3>{school} is using a virtual textbook exchange!</h3>
      <h5>To buy or sell textbooks, please login or create an account below.</h5>

      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '40vh' }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Signin />
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

function ProdOneDesc(props) {
  const { school } = props; // destructuring prop or else would get linter error
  return (
    <>
      <h3>{school} is using an inperson textbook exchange!</h3>
      <h5>
        To buy or sell textbooks, you must go inperson to the {school} Textbook Exchange. Please
        reach out to your student government to learn more about the open times for
        {school}&apos;s in-person textbook exchange. You may browse the textbooks available in the
        &apos;browse&apos; tab above.
      </h5>
    </>
  );
}

function SchoolNavPage() {
  const schools = [
    'Tufts University',
    'Wesleyan University',
    'Northeastern University',
    'Tower Hill School'
  ];

  const [selectedSchool, setSelectedSchool] = React.useState('none');

  // Will use this list in future versions
  /* const schoolList = [
    ['Tufts University', 'virtual'],
    ['Wesleyan University', 'in-person'],
    ['Northeastern University', 'virtual'],
    ['Tower Hill School', 'in-person']
  ]; */

  // I will update this function at some point to lookup in the schoolList array to determine
  // what each school should route to. Right now it is hard coded
  function navigate() {
    return selectedSchool === 'none' ? (
      <h3>please select your school</h3>
    ) : selectedSchool === 'Tufts University' ? (
      <LoginView school={selectedSchool} />
    ) : (
      <ProdOneDesc school={selectedSchool} />
    );
  }

  return (
    <>
      <div className="SectionTitleHeader left">What school do you attend?</div>

      <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
        <option value="none" key="none"> </option>
        {schools.map((school) => (
          <option value={school} key={school}> {school} </option>
        ))}
      </select>

      <p> </p>

      {navigate()}
    </>
  );
}

export default SchoolNavPage;

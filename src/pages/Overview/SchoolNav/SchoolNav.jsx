import React from 'react';
import { Link } from 'react-router-dom';
import './SchoolNav.css';

import { Container } from 'react-bootstrap';
import Signin from '../../../components/Signin';
import Signup from '../../../components/Signup';
import { AuthProvider } from '../../../contexts/AuthContext';


function SchoolNavPage() {

  const schools = ['Tufts University', 'Wesleyan University', "Northeastern University", "Tower Hill School"];
  const schoolList = [
    ['Tufts University', 'virtual'], 
    ['Wesleyan University', 'in-person'],
    ['Northeastern University', 'virtual'],
    ['Tower Hill School', 'in-person']];
  const [selectedSchool, setSelectedSchool] = React.useState("none");

  function ProductOneDesc() {
    return(
      <>
        <h3>
        {selectedSchool} is using an inperson textbook exchange!
        </h3>
        <h5>
          To buy or sell textbooks, you must go inperson to the {selectedSchool} Textbook Exchange. 
          Please reach out to your student government to learn more about the open times for {selectedSchool}'s in-person textbook exchange.
          You may browse the textbooks available in the "browse" tab above. 
        </h5>
      </>
    )
  }

  function LoginView() {
    return (
      <>
        <h3>
          {selectedSchool} is using a virtual textbook exchange!
        </h3>
        <h5>
          To buy or sell textbooks, please login or create an account below. 
        </h5>       

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

  //I will update this function at some point to lookup in the schoolList array to determine
  //what each school should route to. Right now it is hard coded
  function navigate() {
    return selectedSchool === "none" ?  <h3>please select your school</h3> :
      selectedSchool === "Tufts University" ? <LoginView /> : <ProductOneDesc />
    
  }

  return (
    <>
      <div className="SectionTitleHeader left">What school do you attend?</div>

      <select value={selectedSchool} defaultValue="none" onChange={e => setSelectedSchool(e.target.value)}>
        <option value="none" > </option>
        {schools.map(school => (
          <option value={school} key={school}> {school} </option>
        ))}
      </select>

      <p> </p>

      {navigate()}
      
    </>
  );
}

export default SchoolNavPage;

import React, { useEffect, useState } from 'react';
import './PublicInventory.css';
import { useAuthContext } from '../../../contexts/AuthContext';
import logoimage from '../../../images/logo2.png';
import { Link, useNavigate } from 'react-router-dom';
import { getOrganizations } from '../../../api/organization';

function VirtualInventory(props) {
  const { school } = props; // destructuring prop or else would get linter error
  return <>{/* Code for Prod 2 Inventory */}</>;
}

function InPersonInventory(props) {
  const { school } = props;
  return (
    <>
      <div className="SectionSubtitle">{school} is using an in-person textbook exchange!</div>
      <div className="SectionContent">
        <Link to="https://www.textbookexchangenetwork.com/browse">Go to Inventory</Link>
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
function PublicInventory() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  async function fetchData() {
    const organizations = await getOrganizations();
    setAvailableSchools(organizations);
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
            <VirtualInventory school={selectedSchool.name} />
          ) : (
            <InPersonInventory school={selectedSchool.name} />
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

export default PublicInventory;

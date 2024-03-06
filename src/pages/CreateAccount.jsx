import { useState } from 'react';
import FilterDropdown from '../components/common/FilterDropdown';

function CreateAccount() {
  // @TODO Fetch the schools from the database
  // For now mock the data
  const schools = [
    'Tufts University',
    'Ohio State University',
    'Tower Hill School',
    'Wesleyan University'
  ];
  const [school, setSchool] = useState(schools[0]);

  return (
    <>
      <div>{school}</div>
      <FilterDropdown currElement={school} data={schools} callbackFunc={setSchool} />
    </>
  );
}

export default CreateAccount;

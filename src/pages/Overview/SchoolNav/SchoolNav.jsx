import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function SchoolNavPage() {
  return (
    <>
      
      SchoolNav

        <p></p>
            <Link to='../../'>
            <button
              type='button'
              className='btn btn-outline-primary btn-rounded left center padded'
            >
              Product 2
            </button>
            </Link>
          
            <Link to='./Home'>
              <button
                type='button'
                className='btn btn-outline-primary btn-rounded left center padded'
              >
                Product 1 - not implemented
              </button>
            </Link>


      </>
  );
}

export default SchoolNavPage;
import React from 'react';
import { Link } from 'react-router-dom';

function SchoolNavPage() {
  return (
    <>
      SchoolNav
      <p />
      <Link to="../../">
        <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
          Product 2
        </button>
      </Link>
      <Link to="../Home">
        <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
          Product 1 - not implemented
        </button>
      </Link>
      <Link to="../Home/signin">
        <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
          Sign in
        </button>
      </Link>
    </>
  );
}

export default SchoolNavPage;

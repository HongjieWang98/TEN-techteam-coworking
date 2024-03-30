import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserRolesInListingTypes = Object.freeze({
  SELLER: 'seller',
  BUYER: 'buyer',
  NOT_INVOLVED: 'not_involved'
});

function ViewListingPage() {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [currUserRoleInListing, setCurrUserRoleInListing] = useState(
    UserRolesInListingTypes.NOT_INVOLVED
  );
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // TODO for now dont do this check for dev purposes
  // if the current user is not logged in
  if (!currentUser && false) {
    navigate('../..', { relative: 'path' });
  }

  // TODO for now set a default userId while we figure out auth
  const userId = currentUser?.uid ?? '1234';
  useEffect(() => {
    // TODO get the listing details from the db
    const dummyListingDetails = {
      isbn: '1234',
      title: 'Dummy Testbook',
      edition: 1,
      department: 'BIO',
      courseNumber: '101',
      price: 1000,
      buyer: {
        id: '123',
        email: 'test@tufts.edu',
        preferredContactMethod: 'buyer@tufts.edu',
        acceptedPaymentMethods: ['cash', 'venmo']
      },
      seller: {
        id: '1',
        email: 'seller@tufts.edu',
        preferredContactMethod: 'seller@tufts.edu',
        acceptedPaymentMethods: ['cash']
      }
    };

    if (dummyListingDetails.buyer.id === userId) {
      setCurrUserRoleInListing(UserRolesInListingTypes.BUYER);
    } else if (dummyListingDetails.seller.id === userId) {
      setCurrUserRoleInListing(UserRolesInListingTypes.SELLER);
    } else {
      // TODO we might have to redirect the user or show a non authorized page
      setCurrUserRoleInListing(UserRolesInListingTypes.NOT_INVOLVED);
    }

    if (UserRolesInListingTypes.NOT_INVOLVED !== currUserRoleInListing) {
      // TODO utilize real data later
      setListingDetails(dummyListingDetails);
    }
  }, [listingId]);

  return (
    <>
      <div>
        {listingId}
        <br />
        {currUserRoleInListing}
        {UserRolesInListingTypes.NOT_INVOLVED !== currUserRoleInListing && (
          <div>You are involved in this listing!</div>
        )}
      </div>
    </>
  );
}

export default ViewListingPage;

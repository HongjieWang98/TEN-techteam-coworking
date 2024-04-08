import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BuyerListing from '../../components/Listing/BuyerListing';
import SellerListing from '../../components/Listing/SellerListing';

function ViewListingPage() {
  const { listingId } = useParams();
  const [listingComponent, setListingComponent] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // TODO for now dont do this check for dev purposes
  // if the current user is not logged in
  // eslint-disable-next-line no-constant-condition
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
      setListingComponent(<BuyerListing listingData={dummyListingDetails} />);
    } else if (dummyListingDetails.seller.id === userId) {
      setListingComponent(<SellerListing listingData={dummyListingDetails} />);
    }
  }, [listingId]);

  return <div>{listingComponent}</div>;
}

export default ViewListingPage;

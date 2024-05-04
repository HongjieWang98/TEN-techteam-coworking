import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BuyerListing from '../../components/Listing/BuyerListing';
import SellerListing from '../../components/Listing/SellerListing';
import { getTextbookById } from '../../api/textbook';

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
    async function fetchData() {
      return await getTextbookById(listingId);
    }

    const listingDetails = fetchData();

    if (!listingDetails) {
      // do something with bad listing id
    }

    if (listingDetails.buyer_id === userId) {
      setListingComponent(<BuyerListing listingData={listingDetails} />);
    } else if (listingDetails.seller_id === userId) {
      setListingComponent(<SellerListing listingData={listingDetails} />);
    }
  }, [listingId]);

  return <div>{listingComponent}</div>;
}

export default ViewListingPage;

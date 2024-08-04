import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import BuyerListing from '../../components/Listing/BuyerListing';
import SellerListing from '../../components/Listing/SellerListing';
import { getTextbookById } from '../../api/textbook';

function ViewListingPage() {
  const { listingId } = useParams();
  const [listingComponent, setListingComponent] = useState(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const userId = currentUser?.id;

    async function fetchDataAndSetComponent() {
      const listingDetails = await getTextbookById(listingId, true);
      if (!listingDetails) {
        // do something with bad listing id
      }

      if (listingDetails.buyer_id === userId) {
        setListingComponent(<BuyerListing listingData={listingDetails} />);
      } else if (listingDetails.seller_id === userId) {
        setListingComponent(<SellerListing listingData={listingDetails} />);
      }
    }

    if (userId) {
      fetchDataAndSetComponent();
    }
  }, [listingId, currentUser]);

  return <div>{listingComponent}</div>;
}

export default ViewListingPage;

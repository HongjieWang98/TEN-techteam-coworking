import { useEffect } from 'react';
import Listing from './Listing';

function SellerListing({ listingData }) {
  let buyerExists = true;
  let canRemove = true;

  useEffect(() => {
    buyerExists = !!listingData.buyer;
    // canRemove = if status is 0,1,2
  });

  const handleAcceptBuyer = () => {
    // TODO logic to accept the buyer
  };

  const handleDenyBuyer = () => {
    // TODO logic to deny the buyer
  };

  const handleRemoveListing = () => {
    // TODO logic to remove the listing
  };

  return (
    <>
      <Listing listingData={listingData} />

      {buyerExists && (
        <>
          <button type="button" onClick={handleAcceptBuyer}>
            Accept Buyer
          </button>
          <button type="button" onClick={handleDenyBuyer}>
            Deny Buyer
          </button>
        </>
      )}

      {canRemove && (
        <button type="button" onClick={handleRemoveListing}>
          Remove Listing
        </button>
      )}
    </>
  );
}

export default SellerListing;

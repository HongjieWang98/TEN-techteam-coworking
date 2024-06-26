import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DisplayInput from '../../components/common/DisplayInput';
import DisplayCheckboxGroup from '../../components/common/DisplayCheckboxGroup';

function AcceptDenyBuyerPage() {
  const { listingId } = useParams();
  const { currentUser } = useAuth();
  const [listingDetails, setListingDetails] = useState(null);

  // TODO find a better way to get this data
  const userPaymentMethods = {
    cash: 'Cash',
    venmo: 'Venmo'
  };

  // TODO for now dont do this check for dev purposes
  // if the current user is not logged in
  // eslint-disable-next-line no-constant-condition
  if (!currentUser && false) {
    useNavigate()('../..', { relative: 'path' });
  }

  const handleAcceptBuyer = () => {
    // TODO logic to accept the buyer
  };

  const handleDenyBuyer = () => {
    // TODO logic to deny the buyer
  };

  useEffect(() => {
    // TODO for now set a default userId while we figure out auth
    const userId = currentUser?.uid ?? '1';

    // TODO get the listing details from the db
    // If not found, throw a 404 not found error
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

    if (dummyListingDetails.seller.id !== userId) {
      // show a 404 not found error message
    }

    setListingDetails(dummyListingDetails);
  }, [listingId]);

  return (
    listingDetails && (
      <>
        <DisplayInput
          name="buyerName"
          type="text"
          value={listingDetails.buyer.email}
          label="Buyer:"
        />
        {/* TODO: show buyer's preferred contact info */}
        <DisplayCheckboxGroup
          label="Buyer Accepted Payment Methods:"
          options={userPaymentMethods}
          checkedOptions={listingDetails.buyer.acceptedPaymentMethods}
        />
        <button type="button" onClick={handleAcceptBuyer}>
          Accept Buyer
        </button>
        <button type="button" onClick={handleDenyBuyer}>
          Deny Buyer
        </button>
      </>
    )
  );
}

export default AcceptDenyBuyerPage;

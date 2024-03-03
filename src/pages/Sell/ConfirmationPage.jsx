import { useSellContext } from '../../contexts/SellContext';

export default function ConfirmationPage(_props) {
  const { listing } = useSellContext();
  return (
    <>
      {listing && (
        <>
          <div>
            <span></span>
            <span>{listing.title}</span>
          </div>
          <div>
            <span>Department</span>
            <span>
              {listing.department && listing.courseNumber
                ? listing.department + ' ' + listing.courseNumber
                : ''}
            </span>
          </div>
          <div>
            <span>Price</span>
            <span>{listing.price}</span>
          </div>
          <div>
            <span>Edition</span>
            <span>{listing.edition}</span>
          </div>
          <div>
            <span>ISBN</span>
            <span>{listing.isbn}</span>
          </div>
        </>
      )}
      Confirmed!
    </>
  );
}

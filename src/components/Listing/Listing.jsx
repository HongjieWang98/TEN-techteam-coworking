import DisplayCheckboxGroup from '../common/DisplayCheckboxGroup';
import DisplayInput from '../common/DisplayInput';

/**
 * Represents details of a listing.
 * @typedef {Object} ListingDetails
 * @property {string} isbn - The ISBN of the book.
 * @property {string} title - The title of the book.
 * @property {number} edition - The edition of the book.
 * @property {string} department - The department the book belongs to.
 * @property {string} courseNumber - The course number associated with the book.
 * @property {number} price - The price of the book.
 * @property {User} buyer - The buyer of the book.
 * @property {User} seller - The seller of the book.
 */

/**
 * Represents a user.
 * @typedef {Object} User
 * @property {string} id - The ID of the user.
 * @property {string} email - The email address of the user.
 * @property {string} preferredContactMethod - The preferred contact method of the user.
 * @property {string[]} acceptedPaymentMethods - The accepted payment methods by the user.
 */

/**
 * Functional component for displaying a listing.
 * @param {Object} props - The component props.
 * @param {ListingDetails} props.listingData - The data representing the listing.
 * @returns {JSX.Element} JSX element representing the listing.
 */
function Listing({ listingData }) {
  const { isbn, title, edition, department, courseNumber, price, buyer, seller } = listingData;

  // TODO find a better way to get this data
  const userPaymentMethods = {
    cash: 'Cash',
    venmo: 'Venmo'
  };

  return (
    <div>
      <DisplayInput name="isbn" type="text" value={isbn} label="ISBN:" />
      <DisplayInput name="title" type="text" value={title} label="Title:" />
      <DisplayInput name="edition" type="text" value={edition} label="Edition:" />
      <DisplayInput name="department" type="text" value={department} label="Department:" />
      <DisplayInput name="courseNumber" type="text" value={courseNumber} label="Course Number:" />
      <DisplayInput name="price" type="text" value={price} label="Price:" />
      {/* TODO need to show user preferred contact info */}
      <DisplayInput name="buyerEmail" type="text" value={buyer?.contact_info.school_email ?? 'N/A'} label="Buyer:" />
      <DisplayInput name="sellerEmail" type="text" value={seller.contact_info.school_email} label="Seller:" />
      <DisplayCheckboxGroup
        label="Buyer Accepted Payment Methods:"
        options={userPaymentMethods}
        checkedOptions={buyer?.payment_method ?? []}
      />
      <DisplayCheckboxGroup
        label="Seller Accepted Payment Methods:"
        options={userPaymentMethods}
        checkedOptions={seller.payment_method ?? []}
      />
    </div>
  );
}

export default Listing;

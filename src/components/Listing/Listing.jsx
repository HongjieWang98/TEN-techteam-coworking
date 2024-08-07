import DisplayCheckboxGroup from '../common/DisplayCheckboxGroup';
import DisplayInput from '../common/DisplayInput';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import './Listing.css'

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
  const { isbn, title, author, edition, department, courseNumber, price, buyer, seller } = listingData;

  // TODO find a better way to get this data
  const userPaymentMethods = {
    cash: 'Cash',
    venmo: 'Venmo'
  };

  return (
    <Container className="listing-page-container">
      <h2 className="text-left mb-0">View Listing</h2>
      <br />
      <Row>
        <Col md={4}>
          <Row className="listing-row">
            {/* Status will go here, possibly using the process textbooks function (will need to ask Kevin for help)*/}
          </Row>
          <Row className="listing-row">
            <div className="image-placeholder">
              <p>Ability to upload textbook photo coming soon!</p>
            </div>
          </Row>
        </Col>
        <Col md={8}>
          <Row className="listing-row">
            <Col md={12}>
              <DisplayInput name="isbn" type="text" value={isbn} label="ISBN:" />
            </Col>
          </Row>
          <Row className="listing-row">
            <Col md={6}>
              <DisplayInput name="title" type="text" value={title} label="Title:" />
            </Col>
            <Col md={2}>
              <DisplayInput name="edition" type="text" value={edition} label="Edition:" />
            </Col>
            <Col md={4}>
              <DisplayInput name="author" type="text" value={author} label="Author:" />
            </Col>
          </Row>
          <Row className="listing-row">
            <Col md={4}>
              <DisplayInput name="department" type="text" value={department} label="Department:" />
            </Col>
            <Col md={4}>
              <DisplayInput name="courseNumber" type="text" value={courseNumber} label="Course Number:" />
            </Col>
            <Col md={4}>
              <DisplayInput name="price" type="text" value={price} label="Price:" />
            </Col>
          </Row>
          <Row className="listing-row">
            <Col md={6}>
              <DisplayInput name="buyerEmail" type="text" value={buyer?.email ?? 'N/A'} label="Buyer:" />
            </Col>
            <Col md={6}>
              <DisplayInput name="sellerEmail" type="text" value={seller.email} label="Seller:" />
            </Col>
          </Row>
          <Row className="listing-row">
            <Col md={6}>
              <DisplayInput name="buyerContact" type="text" value={buyer?.preferredContactMethod ?? 'N/A'} label="Buyer’s Preferred Contact Method:" />
            </Col>
            <Col md={6}>
              <DisplayInput name="sellerContact" type="text" value={seller.preferredContactMethod} label="Seller’s Preferred Contact Method:" />
            </Col>
          </Row>
          <Row className="listing-row">
            <Col md={6}>
              <DisplayCheckboxGroup
                label="Buyer Accepted Payment Methods:"
                options={userPaymentMethods}
                checkedOptions={buyer?.acceptedPaymentMethods ?? []}
              />
            </Col>
            <Col md={6}>
              <DisplayCheckboxGroup
                label="Seller Accepted Payment Methods:"
                options={userPaymentMethods}
                checkedOptions={seller.acceptedPaymentMethods ?? []}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Listing;

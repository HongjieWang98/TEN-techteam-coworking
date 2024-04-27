import { useEffect } from 'react';
import { collection, getDocs, getDoc } from 'firebase/firestore/lite';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase/firebase_config';

import { buyColumn, noBuyColumns } from './column';
import './InventoryTable.css';

function InventoryTable({ buyFunctionality, tableData, setTableData, handleAddToCart }) {
  // This function builds the data we want to display in the inventory
  // it builds this through book the current textbook information and getting
  // information about the seller (for the payment methods accepted)

  async function tableFormatBook(book) {
    const bookData = book.data();
    const { seller } = bookData;
    let maybeSellerPaymentMethods = '';
    // Get the payment methods info
    try {
      const maybeSeller = await getDoc(seller);
      const maybeSellerData = maybeSeller.data();
      if (maybeSellerData.paymentMethod.venmo) {
        maybeSellerPaymentMethods += 'Venmo';
      } else if (maybeSellerData.paymentMethod.cash) {
        maybeSellerPaymentMethods += 'Cash';
      }
    } catch (e) {
      console.error('Retriving seller information failed');
    }
    const rowInfo = {
      id: book.id,
      title: bookData.title,
      courseAndDpmt: `${bookData.department} ${bookData.course_number}`,
      edition: bookData.edition,
      price: `$${bookData.price}`,
      condition: bookData.condition,
      paymentMethods: maybeSellerPaymentMethods
    };
    // Let a column have a button if we want our table to have add to cart functionality
    if (buyFunctionality) {
      return {
        ...rowInfo,
        addToCart: (
          <button type="button" onClick={(e) => handleAddToCart(rowInfo, e)}>
            Add to cart
          </button>
        )
      };
    }
    // Otherwise if we just want to display no need for an add to cart functionality
    return rowInfo;
  }
  useEffect(() => {
    async function fetchTextbooks() {
      try {
        // Get all the textbooks @todo make this so only the textbooks of the
        // current user are gotten
        const books = await getDocs(collection(db, 'items'));
        const booksTablePromises = books.docs.map((book) => tableFormatBook(book));
        // Need to wait for all Promises to resolve before populating array
        const booksTable = await Promise.all(booksTablePromises);

        // Initalize the datatable
        setTableData({
          columns: buyFunctionality ? [...noBuyColumns, buyColumn] : noBuyColumns,
          rows: booksTable
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchTextbooks();
  }, []);

  // Just trying to test if cartData actually contains the books added to it
  return (
    <div className="BrowseContainer">
      <MDBDataTable
        striped
        hover
        entries={20}
        pagesAmount={5}
        responsiveSm
        paginationLabel={['Prev', 'Next']}
        data={tableData}
      />
    </div>
  );
}

export default InventoryTable;

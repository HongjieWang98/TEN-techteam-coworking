import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore/lite';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase/firebase_config';
import { useAuthContext } from '../../contexts/AuthContext';
import { buyColumn, noBuyColumns } from './column';
import './InventoryTable.css';
import { useBuyContext } from '../../contexts/BuyContext';
import { getTextbooksByOrganizationId } from '../../api/textbook';

// **** CHECK OUT WHY THE TABLE SHOWS ALL THE TEXTBOOKS ON QUICK LOAD AND THEN CORRECTS ITSELF
// **** MAKE SURE THAT THE TABLE DOES NOT DISPLAY RESERVED TEXTBOOKS

function InventoryTable({ buyFunctionality, tableData, setTableData, handleAddToCart }) {
  const { cartData } = useBuyContext();
  const { getCurrentUser } = useAuthContext();
  const currentUser = getCurrentUser();

  // This function builds the data we want to display in the inventory
  // it builds this through book the current textbook information and getting
  // information about the seller (for the payment methods accepted)

  async function tableFormatBook(bookData) {
    // eslint-disable-next-line camelcase
    const { seller_id } = bookData;

    let maybeSellerPaymentMethods = '';
    // Get the payment methods info
    try {
      const maybeSeller = await getDoc(doc(db, 'users', seller_id));
      const maybeSellerData = maybeSeller.data();
      if (maybeSellerData.payment_method.venmo) {
        maybeSellerPaymentMethods += 'Venmo';
      } else if (maybeSellerData.payment_method.cash) {
        maybeSellerPaymentMethods += 'Cash';
      }
    } catch (e) {
      console.error('Retriving seller information failed');
    }
    const rowInfo = {
      id: bookData.id,
      title: bookData.title,
      courseAndDpmt: `${bookData.department} ${bookData.course_number}`,
      edition: bookData.edition,
      price: `$${bookData.price}`,
      condition: bookData.condition,
      paymentMethods: maybeSellerPaymentMethods
    };
    // Let a column have a button if we want our table to have add to cart functionality
    if (buyFunctionality) {
      // Checks if the textbook is already in the cart (happens when we come back to the inventory page from the cart page)
      const inCart = cartData.find((textbook) => textbook.id === bookData.id);
      if (inCart) {
        return {
          ...rowInfo,
          addToCart: 'In Cart'
        };
      }
      // If not in the cart we need the add to cart button
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
        // If we have buyFunctionality and the currentUser (of the session) has been loaded
        if (buyFunctionality && currentUser) {
          const books = await getTextbooksByOrganizationId(currentUser.organization_id);
          // Filter out all the books that have been reserved
          const unreservedBooks = books.filter((book) => book.buyer_id == null);
          const booksTablePromises = unreservedBooks.map((book) => tableFormatBook(book));
          // Need to Promise.all here because we have calls to get the seller info in tableFormatBook
          const booksTable = await Promise.all(booksTablePromises);
          // Initalize the datatable
          setTableData({
            columns: [...noBuyColumns, buyColumn],
            rows: booksTable
          });
        } 
        // Sort of a janky fix (before there was a bug involving where the current user had not been 
        // loaded yet and thus all the textbooks from all the universities were quickly displayed (before the current user had been loaded)) 
        // Therefore this else if is necessary to prevent this from happening
        else if (!buyFunctionality) {
          const booksDatabase = await getDocs(collection(db, 'textbooks'));
          const books = booksDatabase.docs;
          // Filter out all the books that have been reserved
          const unreservedBooks = books.filter((book) => book.data().buyer_id == null);
          // Format the books as necessary
          const booksTablePromises = unreservedBooks.map((book) => tableFormatBook({ ...book.data(), id: book.id }));
          // Need to Promise.all here because we have calls to get the seller info in tableFormatBook
          const booksTable = await Promise.all(booksTablePromises);
          // Initalize the datatable
          setTableData({
            columns: noBuyColumns,
            rows: booksTable
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchTextbooks();
  });

  // Just trying to test if cartData actually contains the books added to it
  return (
    <>
      <h1>Inventory Table</h1>
      {currentUser ? (
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default InventoryTable;

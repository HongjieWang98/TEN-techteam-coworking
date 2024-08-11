import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { collection, getDocs } from 'firebase/firestore/lite';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase/firebase_config';
import { buyColumn, listingDetailColumns } from './column';
import './InventoryTable.css';
import './AddToCartButton.css';
import { useBuyContext } from '../../contexts/BuyContext';
import { getTextbooksByOrganizationId } from '../../api/textbook';

function InventoryTable({ buyFunctionality = false, tableData, setTableData, handleAddToCart = null, user = null }) {
  const { cartData } = useBuyContext();

  // This function builds the data we want to display in the inventory
  // it builds this through book the current textbook information and getting
  // information about the seller (for the payment methods accepted)

  function tableFormatBook(bookData) {
    // eslint-disable-next-line camelcase
    const { seller } = bookData;

    let maybeSellerPaymentMethods = '';
    // Get the payment methods info

    if (seller.payment_method.venmo) {
      maybeSellerPaymentMethods += 'Venmo';
    } else if (seller.payment_method.cash) {
      maybeSellerPaymentMethods += 'Cash';
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
          <button type="button" className="AddToCart" onClick={(e) => handleAddToCart(rowInfo, e)}>
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
        if (buyFunctionality && user) {
          const booksDB = await getTextbooksByOrganizationId(user.organization_id, true);
          // Filter out all the books that have been reserved or do not have a seller for some reason (NOTE THAT WE ARE NOT CHECKING IF THE BUYER_ID IS NULL)
          const unreservedBooks = booksDB.filter((book) => book.status === 'active' && book.seller != null);
          const booksTable = unreservedBooks.map((book) => tableFormatBook(book));
          // Initalize the datatable
          setTableData({
            columns: [...listingDetailColumns, buyColumn],
            rows: booksTable
          });
        }
        // Sort of a janky fix (before there was a bug involving where the current user had not been
        // loaded yet and thus all the textbooks from all the universities were quickly displayed (before the current user had been loaded))
        // Therefore this else if is necessary to prevent this from happening

        // *** @todo move this code into the textbook api and update so that it uses the textbook events****
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
            columns: listingDetailColumns,
            rows: booksTable
          });
        }
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
        noBottomColumns
        paginationLabel={['Prev', 'Next']}
        data={tableData}
      />
    </div>
  );
}

export default InventoryTable;

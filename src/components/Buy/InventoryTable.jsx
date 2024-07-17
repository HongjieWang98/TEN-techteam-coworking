import { useEffect } from 'react';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore/lite';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase/firebase_config';
// import { useAuth } from '../../contexts/AuthContext';
import { buyColumn, noBuyColumns } from './column';
import './InventoryTable.css';

function InventoryTable({ buyFunctionality, tableData, setTableData, handleAddToCart }) {
  // This function builds the data we want to display in the inventory
  // it builds this through book the current textbook information and getting
  // information about the seller (for the payment methods accepted)

  async function tableFormatBook(book) {
    const bookData = book.data();
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
        // Get all the textbooks

        // Note that this code is written once I can actually sign in as a user and filters by specified univeristy

        // if (buyFunctionality) {
        //   const { currentUser } = useAuth();
        //   const textbooksQuery = query(
        //     collection(db, 'textbooks'),
        //     where('orgazation_id', '==', currentUser.orgazation_id)
        //   );
        //   const books = await getDocs(textbooksQuery);
        // } else {
        //   const books = await getDocs(collection(db, 'textbooks'));
        // }

        const books = await getDocs(collection(db, 'textbooks'));
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

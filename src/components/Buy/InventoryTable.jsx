import { useEffect, useState } from 'react';
import { collection, getDocs, getDoc } from 'firebase/firestore/lite';
import { MDBDataTable } from 'mdbreact';
import { db } from '../../firebase/firebase_config';

function InventoryTable() {
  // const [textbooks, setTexbooks] = useState([]);
  const [data, setData] = useState({
    columns: [
      {
        label: 'Course Number',
        field: 'courseNumber',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Edition',
        field: 'edition',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Condition',
        field: 'condition',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Payment Methods',
        field: 'paymentMethods',
        sort: 'asc',
        width: 100
      }
    ],
    rows: []
  });

  // This function builds the data we want to display in the inventory
  // it builds this through book the current textbook information and getting
  // information about the seller (for the payment methods accepted)

  async function tableFormatBook(book) {
    const bookData = book.data();
    const {
      title,
      department,
      course_number: courseNumber,
      edition,
      price,
      condition,
      seller
    } = bookData;
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
    return {
      courseNumber: `${department} ${courseNumber}`,
      title,
      edition,
      price,
      condition,
      paymentMethods: maybeSellerPaymentMethods
    };
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
        setData((prevState) => ({
          ...prevState,
          rows: booksTable
        }));
      } catch (e) {
        console.error(e);
      }
    }
    fetchTextbooks();
  }, []);

  console.log('data', data);

  return (
    <MDBDataTable
      striped
      hover
      entries={20}
      pagesAmount={5}
      responsiveSm
      paginationLabel={['Prev', 'Next']}
      data={data}
    />
  );
}

export default InventoryTable;

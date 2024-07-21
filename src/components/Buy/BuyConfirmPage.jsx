import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBuyContext } from '../../contexts/BuyContext';
import { collection, getDoc, doc, query, where } from 'firebase/firestore/lite';

import { db } from '../../firebase/firebase_config';

function BuyConfirmPage() {
  const { cartData } = useBuyContext();

  //   const { currentUser } = useAuth();

  async function reserveBooks() {
    // Checks if the textbooks can be reserved and that they actually exist and that someone else didn't buy them first

    const checkTextbookPromises = cartData.map(async (textbook) => {
      const docRef = doc(db, 'textbooks', textbook.id);
      const docTextbook = await getDoc(docRef);

      if (!docTextbook.exists() || docTextbook.data().buyer_id != null) {
        return { textbook, canBuy: false };
      }
      return { textbook, canBuy: true };
    });

    const results = await Promise.all(checkTextbookPromises);

    // Two arrays one of textbooks that can be reserved and the other of the textbooks that cannot be reserved
    const canBuy = results.filter((result) => result.canBuy).map((result) => result.textbook);
    const cannotBuy = results.filter((result) => !result.canBuy).map((result) => result.textbook);
  }

  return (
    <>
      {cartData.map((textbook) => {
        return <h1 key={textbook.id}>{textbook.title}</h1>;
      })}

      <Link to="/inventory" className="btn btn-primary" type="button">
        Add Another Item
      </Link>

      <button type="button" onClick={reserveBooks}>
        Reserve Books
      </button>
      {/* <Link to="/inventory" className="btn btn-primary" type="button">
        Confirm Your Reservation
      </Link> */}
    </>
  );
}

export default BuyConfirmPage;

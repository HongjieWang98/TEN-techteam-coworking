import React, { useContext, useState, createContext, useMemo } from 'react';

// The cart will store references to all the textbooks in the cart based on the
// information stored in the rows of the table
const BuyContext = createContext({
  cartData: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

export function BuyProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  const addToCart = (textbook) => {
    if (cartData == null) {
      setCartData([textbook]);
    }
    const itemExists = cartData.includes(textbook.id);
    if (!itemExists) {
      setCartData((currentCartData) => [...currentCartData, textbook]);
    }
  };

  const removeFromCart = (textbook) => {
    setCartData((currentCartData) => currentCartData.filter((item) => item.id !== textbook.i));
  };

  const value = useMemo(
    () => ({
      cartData,
      addToCart,
      removeFromCart
    }),
    [cartData, addToCart, removeFromCart]
  );

  return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
}

export const useBuyContext = () => useContext(BuyContext);

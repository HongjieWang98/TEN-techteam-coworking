import React, { useContext, useState, createContext, useMemo } from 'react';

export function BuyProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  const addToCart = (newTextbook) => {
    setCartData((currentCartData) => {
      // Check if the item already exists in the cart
      const itemExists = currentCartData.some((item) => item.id === newTextbook.id);

      // If the item does not exist, add it to the cart
      if (!itemExists) {
        return [newTextbook, ...currentCartData];
      }

      // If the item already exists, return the current cart data without changes
      return currentCartData;
    });
  };

  const removeFromCart = (newTextbook) => {
    setCartData((currentCartData) => currentCartData.filter((item) => item.id !== newTextbook.id));
  };

  const value = useMemo(
    () => ({
      cartData,
      addToCart,
      removeFromCart
    }),
    [cartData]
  );

  return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
}

// The cart will store references to all the textbooks in the cart based on the
// information stored in the rows of the table
export const BuyContext = createContext({
  cartData: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

export const useBuyContext = () => useContext(BuyContext);

import React, { useContext, useState, createContext, useMemo } from 'react';

const BuyContext = createContext({
  cart: null,
  setCart: () => {}
});

export function BuyProvider({ children }) {
  const [cartData, setCartData] = useState({
    cart: null
  });

  const addToCart = (item) => {
    setCartData([...cartData, item]);
  };

  const removeFromCart = (itemId) => {
    setCartData(cartData.filter((item) => item.id !== itemId));
  };

  const value = useMemo(
    () => ({
      cart: cartData,
      addToCart,
      removeFromCart
    }),
    [cartData, addToCart, removeFromCart]
  );

  return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
}

export const useBuyContext = () => useContext(BuyContext);

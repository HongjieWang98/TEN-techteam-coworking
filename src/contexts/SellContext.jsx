import React, { useContext, useState, useEffect, createContext } from 'react';

const SellContext = createContext({
  listing: null,
  setListing: () => {}
});

export function SellProvider({ children }) {
  const [listingData, setListingData] = useState({
    listing: null
  });

  const setListing = (listing) => {
    setListingData(listing);
  };

  const value = {
    listing: listingData,
    setListing
  };

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
}

export const useSellContext = () => useContext(SellContext);

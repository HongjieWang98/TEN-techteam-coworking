import React, { useContext, useState, useEffect } from 'react';
// tutorial of useContext: https://www.youtube.com/watch?v=5LrDIWkK_Bc
// Context in React is a way to share data between components
// In authentication/signin page, we want to use React.context to share the loginin status of the user in different pages
import PropTypes from 'prop-types';

import { auth } from '../firebase/firebase_config';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    signup
  };

  return (
    // return a value, contain all information of authentication
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuthContext = () => useContext(AuthContext);

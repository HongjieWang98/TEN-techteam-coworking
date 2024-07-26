import React, { useContext, useState, useEffect } from 'react';
// tutorial of useContext: https://www.youtube.com/watch?v=5LrDIWkK_Bc
// Context in React is a way to share data between components
// In authentication/signin page, we want to use React.context to share the loginin status of the user in different pages
import PropTypes from 'prop-types';

import { auth } from '../firebase/firebase_config';
import { getUserById, postUser } from '../api/user';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentAuthUser, setCurrentAuthUser] = useState();

  function getCurrentUser() {
    return currentUser;
  }

  function getCurrentAuthUser() {
    return currentAuthUser;
  }

  async function signUp(email, password, createdUserAccount) {
    const newUser = (await auth.createUserWithEmailAndPassword(email, password)).user;

    // TODO handle if postUser fails, we should remove the user from firebase auth
    // save user details to our user collection
    await postUser(newUser.uid, createdUserAccount);

    setCurrentUser(await getUserById(auth.currentUser.uid));
  }

  async function signIn(email, password) {
    await auth.signInWithEmailAndPassword(email, password);
    setCurrentUser(await getUserById(auth.currentUser.uid));
  }

  async function signOut() {
    await auth.signOut();
    setCurrentUser(null);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setCurrentAuthUser(authUser);
      }
    });
    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    getCurrentUser,
    getCurrentAuthUser,
    signIn,
    signUp,
    signOut
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

import React, { useContext, useState, useEffect } from 'react';
// tutorial of useContext: https://www.youtube.com/watch?v=5LrDIWkK_Bc
// Context in React is a way to share data between components
// In authentication/signin page, we want to use React.context to share the loginin status of the user in different pages
import PropTypes from 'prop-types';

import { auth } from '../firebase/firebase_config';
import { getUserById, postUser } from '../api/user';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAuthUser, setCurrentAuthUser] = useState(null);

  async function signUp(email, password, createdUserAccount) {
    const authUser = (await auth.createUserWithEmailAndPassword(email, password)).user;
    // TODO handle if postUser fails, we should remove the user from firebase auth
    // save user details to our user collection
    await postUser(authUser.uid, createdUserAccount);
    const user = await getUserById(authUser.uid);
    setCurrentAuthUser(authUser);
    setCurrentUser(user);
  }

  async function signIn(email, password) {
    const authUser = (await auth.signInWithEmailAndPassword(email, password)).user;
    const user = await getUserById(authUser.uid);
    setCurrentUser(user);
    setCurrentAuthUser(authUser);
  }

  async function signOut() {
    await auth.signOut();
    setCurrentAuthUser(null);
    setCurrentUser(null);
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    currentAuthUser,
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

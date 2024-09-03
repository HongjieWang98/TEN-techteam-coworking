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
    await authUser.sendEmailVerification();
  }

  async function signIn(email, password) {
    const authUser = (await auth.signInWithEmailAndPassword(email, password)).user;
    if (authUser.emailVerified) {
      const user = await getUserById(authUser.uid);
      setCurrentUser(user);
      setCurrentAuthUser(authUser);
    } else {
      authUser.sendEmailVerification();
      alert('Please verify your email before signing in. A new email was sent.');
    }
  }

  async function signOut() {
    await auth.signOut();
    setCurrentAuthUser(null);
    setCurrentUser(null);
  }

  async function handleActionCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const actionCode = urlParams.get('oobCode');
    // TODO: resetPassword has not been tested
    if (mode === 'resetPassword') {
      const email = window.localStorage.getItem('emailForReset');
      await auth.verifyPasswordResetCode(actionCode);
      window.localStorage.setItem('resetCode', actionCode);
      window.localStorage.setItem('emailForReset', email);
      return true;
    } else if (mode === 'verifyEmail') {
      await auth.applyActionCode(actionCode);
      return true;
    }

    return false;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!user.emailVerified) {
          await signOut();
        } else {
          try {
            setCurrentUser(await getUserById(user.uid));
          } catch (e) {
            // on account signup, the user might not be in the database yet
            // silently ignore this error until we figure out a better way to handle this
          }
          setCurrentAuthUser(user);
        }
      }
    });

    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    currentAuthUser,
    signIn,
    signUp,
    signOut,
    handleActionCode
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

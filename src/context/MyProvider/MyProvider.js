import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../../firebase/firebase.config";
import moment from "moment";
const auth = getAuth(app);
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timeAndDate, setTimeAndDate] = useState(
    moment().format("Do MMM YY, h:mm:ss a")
  );
  setTimeout(() => {
    const nowTimeAndDate = moment().format("Do MMM YY, h:mm:ss a");
    setTimeAndDate(nowTimeAndDate);
  }, 1000);
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  const emailPasswordSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSUbscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unSUbscribe();
  }, []);

  // useEffect(() => {
  //   if (currentUser && currentUser?.email) {
  //     fetch(`https://medi-sell.vercel.app/checkrole?email=${currentUser?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }
  // }, [currentUser]);

  const info = {
    timeAndDate,
    googleSignIn,
    emailPasswordSignIn,
    createUserWithEmail,
    logOut,
    currentUser,
    isLoading,
  };
  return <MyContext.Provider value={info}>{children}</MyContext.Provider>;
};

export default MyProvider;

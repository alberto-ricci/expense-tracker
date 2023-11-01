import { useState, useEffect } from "react";
import { auth } from "../config/firebase-config";

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    profilePhoto: "",
    userID: "",
    isAuth: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || "",
          profilePhoto: user.photoURL || "",
          userID: user.uid || "",
          isAuth: true,
        });
      } else {
        setUserInfo({
          name: "",
          profilePhoto: "",
          userID: "",
          isAuth: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return userInfo;
};

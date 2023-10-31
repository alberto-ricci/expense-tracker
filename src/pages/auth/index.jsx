import React, { useEffect, useState } from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./index.css";

export const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isAuth } = useGetUserInfo;

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Error signing in with Google", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <p>Sign In with Google to Continue</p>
      {error && <p className="error-message">{error}</p>}
      <div className="button-container">
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

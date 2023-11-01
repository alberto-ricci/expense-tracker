import React, { useState } from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import "./index.css";

export const Auth = ({ setIsAuthenticated }) => {
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing in with Google", error);
      setError("Failed to sign in with Google. Please try again.");
      setIsAuthenticated(false);
    }
  };

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

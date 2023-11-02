import React, { useState } from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import firebaseLogo from "./logos/firebase.svg";
import reactLogo from "./logos/react.svg";
import bootstrapLogo from "./logos/bootstrap.svg";
import fontawesomeLogo from "./logos/fontawesome.svg";

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
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div
        className="bg-white rounded p-4 shadow-lg w-100"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="text-center mb-4">Expense Tracker Project</h1>
        <p className="text-center mt-4">Sign in with Google to continue</p>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>

        <div className="mt-4">
          <div className="mt-5 ">
            <h4>Main Features:</h4>
            <ul className="pl-3">
              <li>User authentication via Google</li>
              <li>Transaction and expense management</li>
              <li>View transaction history</li>
              <li>Summary of total expenses and incomes</li>
              <li>Dark theme option - WIP</li>
              <li>Currency selection - WIP</li>
              <li>Language localization - WIP</li>
            </ul>
          </div>
        </div>

        <h2 className="mt-5 h5 text-center">
          Made using
          <img
            className="mx-2"
            src={reactLogo}
            alt="React logo"
            style={{ width: "30px", height: "30px" }}
          />
          React,
          <img
            className="mx-2"
            src={firebaseLogo}
            alt="Firebase logo"
            style={{ width: "30px", height: "30px" }}
          />
          Firebase,
          <img
            className="mx-2"
            src={bootstrapLogo}
            alt="Bootstrap logo"
            style={{ width: "30px", height: "30px" }}
          />
          Bootstrap,
          <img
            className="mx-2"
            src={fontawesomeLogo}
            alt="FontAwesome logo"
            style={{ width: "30px", height: "30px" }}
          />
          FontAwesome
        </h2>

        <h3 className="mt-4 text-center">Made by Alberto Ricci</h3>
      </div>
    </div>
  );
};

import React from "react";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import Profile from "./navbar-components/Profile";
import Logout from "./navbar-components/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faMoneyBill,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Navbar({ profilePhoto, userName }) {
  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  const handleThemeChange = () => {};
  const handleCurrencyChange = () => {};
  const handleLanguageChange = () => {};

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {profilePhoto && <Profile profilePhoto={profilePhoto} />}
        <span className="navbar-brand mb-0 h1">
          {userName.split(" ")[0]}'s Expense Tracker
        </span>
        <div className="navbar-nav ml-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={handleThemeChange}
            title="Change Theme"
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
          <button
            className="btn btn-outline-secondary ml-2"
            onClick={handleCurrencyChange}
            title="Change Currency"
          >
            <FontAwesomeIcon icon={faMoneyBill} />
          </button>
          <button
            className="btn btn-outline-secondary ml-2"
            onClick={handleLanguageChange}
            title="Change Language"
          >
            <FontAwesomeIcon icon={faLanguage} />
          </button>
          <Logout signUserOut={signUserOut} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

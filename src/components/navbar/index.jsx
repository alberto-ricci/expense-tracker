import React from "react";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import "./index.css";
import Profile from "./navbar-components/Profile";
import Logout from "./navbar-components/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faMoneyBill,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "./navbar-components/Tooltip";

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
    <div className="navbar">
      {profilePhoto && <Profile profilePhoto={profilePhoto} />}
      <h1>{userName.split(" ")[0]}'s Expense Tracker</h1>
      <div className="navbar-buttons">
        <Tooltip text="Change Theme">
          <button onClick={handleThemeChange}>
            <FontAwesomeIcon icon={faPalette} />
          </button>
        </Tooltip>
        <Tooltip text="Change Currency">
          <button onClick={handleCurrencyChange}>
            <FontAwesomeIcon icon={faMoneyBill} />
          </button>
        </Tooltip>
        <Tooltip text="Change Language">
          <button onClick={handleLanguageChange}>
            <FontAwesomeIcon icon={faLanguage} />
          </button>
        </Tooltip>
      </div>
      <Logout signUserOut={signUserOut} />
    </div>
  );
}

export default Navbar;

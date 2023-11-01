import React from "react";
import "./logout.css";

export default function Logout({ signUserOut }) {
  return (
    <button className="sign-out-button" onClick={signUserOut}>
      Sign Out
    </button>
  );
}

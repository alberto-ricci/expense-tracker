import React from "react";
import "./balance.css";

const Balance = ({ balance }) => (
  <div className="balance">
    <h3>Your Balance:</h3>
    <h2 className={balance > 0 ? "positive" : balance < 0 ? "negative" : ""}>
      {balance.toFixed(2)}€
    </h2>
  </div>
);

export default Balance;

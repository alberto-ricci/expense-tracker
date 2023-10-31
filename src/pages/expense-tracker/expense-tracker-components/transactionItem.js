import React from "react";
import "./transactionItem.css";

const TransactionItem = ({ transaction }) => {
  const { description, transactionAmount, transactionType } = transaction;
  return (
    <li>
      <h4>{description}</h4>
      <p>
        €{transactionAmount.toFixed(2)} <span>-</span>
        <label className={transactionType}>
          {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
        </label>
      </p>
    </li>
  );
};

export default TransactionItem;

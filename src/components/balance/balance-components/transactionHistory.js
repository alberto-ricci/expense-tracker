import React from "react";
import "./transactionHistory.css";
import TransactionItem from "./transactionItem";

const TransactionHistory = ({ transactions }) => (
  <div className="transactions">
    <h3>Transaction History</h3>
    <ul>
      {transactions &&
        transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
    </ul>
  </div>
);

export default TransactionHistory;

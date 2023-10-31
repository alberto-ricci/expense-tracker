import React from "react";
import "./transactionForm.css";

const TransactionForm = ({
  onSubmit,
  description,
  setDescription,
  transactionAmount,
  setTransactionAmount,
  transactionType,
  setTransactionType,
}) => (
  <form className="add-transaction" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Add transaction"
      required
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <input
      type="number"
      placeholder="Amount"
      required
      value={transactionAmount}
      onChange={(e) => setTransactionAmount(e.target.value)}
    />
    <div className="radio-container">
      <label>
        <input
          type="radio"
          name="transactionType"
          value="expense"
          checked={transactionType === "expense"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        Expense
      </label>
      <label>
        <input
          type="radio"
          name="transactionType"
          value="income"
          checked={transactionType === "income"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        Income
      </label>
    </div>
    <button type="submit">Add Transaction</button>
  </form>
);

export default TransactionForm;

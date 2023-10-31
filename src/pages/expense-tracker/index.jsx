import React, { useState } from "react";
import "./index.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import {
  useGetTransactions,
  transactionTotals,
} from "../../hooks/useGetTransactions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { userID, isAuth, name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth || !userID) {
      setError("You need to be logged in to add a transaction.");
      return;
    }
    const amount = Number(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid transaction amount.");
      return;
    }
    try {
      await addTransaction({
        description,
        transactionAmount: amount,
        transactionType,
      });
      setDescription("");
      setTransactionAmount("");
      setTransactionType("expense");
      setSuccess("Transaction added successfully!");
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error adding transaction: ", error);
      setError("Failed to add transaction. Please try again.");
      setSuccess(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          {profilePhoto && (
            <div className="profile">
              <img className="profile-photo" src={profilePhoto} alt="Profile" />
              <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
              </button>
            </div>
          )}
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance:</h3>
            <h2
              className={
                balance.toFixed(2) > 0
                  ? "positive"
                  : balance.toFixed(2) < 0
                  ? "negative"
                  : ""
              }
            >
              {balance.toFixed(2)}€
            </h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>{income}€</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>{expenses}€</p>
            </div>
          </div>
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
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>

      <div className="transactions">
        <h3>Transaction History</h3>
        <ul>
          {transactions &&
            transactions.map((transaction, index) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <li key={index}>
                  <h4>{description}</h4>
                  <p>
                    €{transactionAmount.toFixed(2)} <span>-</span>
                    <label className={transactionType}>
                      {transactionType.charAt(0).toUpperCase() +
                        transactionType.slice(1)}
                    </label>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

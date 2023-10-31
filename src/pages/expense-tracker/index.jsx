import React, { useState, useEffect } from "react";
import "./index.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import Profile from "./expense-tracker-components/profile";
import Balance from "./expense-tracker-components/balance";
import Summary from "./expense-tracker-components/summary";
import TransactionForm from "./expense-tracker-components/transactionForm";
import TransactionHistory from "./expense-tracker-components/transactionHistory";
import Message from "./expense-tracker-components/message";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) setError(null);
      if (success) setSuccess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, success]);

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
    } catch (error) {
      console.error("Error adding transaction: ", error);
      setError("Failed to add transaction. Please try again.");
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
    <div className="expense-tracker">
      <div className="balance-container">
        {profilePhoto && (
          <Profile profilePhoto={profilePhoto} signUserOut={signUserOut} />
        )}
        <h1>{name}'s Expense Tracker</h1>
        <Balance balance={balance} />
        <Summary income={income} expenses={expenses} />
      </div>
      <div className="transaction-container">
        <div className="transaction-form">
          <TransactionForm
            onSubmit={onSubmit}
            description={description}
            setDescription={setDescription}
            transactionAmount={transactionAmount}
            setTransactionAmount={setTransactionAmount}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
          {error && <Message type="error" text={error} />}
          {success && <Message type="success" text={success} />}
        </div>
      </div>

      <div className="history-container">
        <div className="transactions-history">
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

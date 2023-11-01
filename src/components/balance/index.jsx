import React, { useState, useEffect } from "react";
import "./index.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useGetTransactions } from "../../hooks/useGetTransactions";

import Balance from "./balance-components/balance";
import Summary from "./balance-components/summary";
import TransactionForm from "./balance-components/transactionForm";
import TransactionHistory from "./balance-components/transactionHistory";
import Message from "./balance-components/message";

export const ExpenseTracker = ({ setIsAuthenticated }) => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { userID, isAuth, name, profilePhoto } = useGetUserInfo();

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

  return (
    <div className="expense-tracker">
      <div className="balance-container">
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

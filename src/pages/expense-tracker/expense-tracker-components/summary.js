import React from "react";
import "./summary.css";

const Summary = ({ income, expenses }) => (
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
);

export default Summary;

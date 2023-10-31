import React from "react";
import "./message.css";

const Message = ({ type, text }) => {
  return (
    <p className={type === "error" ? "error-message" : "success-message"}>
      {text}
    </p>
  );
};

export default Message;

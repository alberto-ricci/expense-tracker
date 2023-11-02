import React from "react";
import "./Profile.css";

export default function Profile({ profilePhoto }) {
  return (
    <div className="d-flex align-items-center mb-2">
      <img
        className="profile-photo rounded-circle"
        src={profilePhoto}
        alt="Profile"
      />
    </div>
  );
}

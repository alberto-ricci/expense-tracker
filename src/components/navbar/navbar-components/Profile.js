import React from "react";
import "./Profile.css";

export default function Profile({ profilePhoto }) {
  return (
    <div className="profile-info">
      <img className="profile-photo" src={profilePhoto} alt="Profile" />
    </div>
  );
}

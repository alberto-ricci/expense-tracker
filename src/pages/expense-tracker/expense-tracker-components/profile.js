import React from "react";
import "./profile.css";

const Profile = ({ profilePhoto, signUserOut }) => (
  <div className="profile">
    <img className="profile-photo" src={profilePhoto} alt="Profile" />
    <button className="sign-out-button" onClick={signUserOut}>
      Sign Out
    </button>
  </div>
);

export default Profile;

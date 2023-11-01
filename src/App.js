import React, { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import { ExpenseTracker } from "./components/balance";
import Navbar from "./components/navbar";
import { useGetUserInfo } from "./hooks/useGetUserInfo";

function App() {
  const { profilePhoto, name, userID } = useGetUserInfo();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!userID);
  }, [userID]);

  return (
    <div className="App">
      {isAuthenticated && (
        <Navbar
          profilePhoto={profilePhoto}
          userName={name}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {isAuthenticated ? (
        <ExpenseTracker setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;

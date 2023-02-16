import React, { useState } from "react";
import "./App.css";
import { userContext } from "./Context/UserContext";
import Protected from "./ProtectedRoutes";
import Login from "./Components/Login/Login";
import Albums from "./Components/Albums/Albums";
import Photos from "./Components/Photos/Photos";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const loc = useLocation();

  const checkIfInLogin = () => {
    if (loc.pathname === "/") {
      localStorage.user = [];
      localStorage.loggedStatues = false;
      return true;
    } else {
      return false;
    }
  };

  const [userState, setUserState] = useState({
    userInfo: checkIfInLogin() ? [] : JSON.parse(localStorage.user),
    isLoggedIn: checkIfInLogin() ? false : JSON.parse(localStorage.user),
  });

  const handleLogin = async (user) => {
    localStorage.user = JSON.stringify(user);
    localStorage.loggedStatues = true;

    setUserState({
      userInfo: user,
      isLoggedIn: true,
    });
  };

  return (
    <userContext.Provider value={{ userState }}>
      <Routes>
        <Route exact path="/" element={<Login onLogin={handleLogin} />} />
        <Route element={<Protected />}>
          <Route path="/albums/" element={<Albums />} />
          <Route path="/photos/:id" element={<Photos />} />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;

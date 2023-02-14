import React, { useEffect, useState } from "react";
import "./App.css";
import { userContext } from "./Context/UserContext";
import Protected from "./ProtectedRoutes";
import Login from "./Components/Login/Login";
import Albums from "./Components/Albums/Albums";
import { Route, Routes } from "react-router-dom";

function App() {
  const [userState, setUserState] = useState({
    userInfo: [],
    isLoggedIn: false,
  });

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.user);
      const loggedStatues = JSON.parse(localStorage.loggedStatues);
      setUserState({
        userInfo: user,
        isLoggedIn: loggedStatues,
      });
    } catch (error) {}
  }, []);

  return (
    <userContext.Provider value={{ userState, setUserState }}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/albums/" element={<Albums />} />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;

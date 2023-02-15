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
    isLoggedIn: true,
  });

  useEffect(() => {
    if (!userState.isLoggedIn) {
      setUserFromLocalStorage();
    }
    console.log(`isLoggedIn: ${userState.isLoggedIn}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.user);
      const isLoggedIn = localStorage.isLoggedIn === "true";
      setUserState({
        userInfo: user,
        isLoggedIn: isLoggedIn,
      });
    } catch (error) {}
  };

  const handleLogin = async (user) => {
    localStorage.user = JSON.stringify(user);
    localStorage.isLoggedIn = true;
    console.log(user);
    
    await setUserState({
      userInfo: user,
      isLoggedIn: true,
    }); // await setUserFromLocalStorage();
    // await console.log(`isLoggedIn: ${userState.isLoggedIn}`);
  };

  return (
    <userContext.Provider value={{ userState }}>
      <Routes>
        <Route exact path="/" element={<Login onLogin={handleLogin} />} />
        <Route element={<Protected />}>
          <Route path="/albums/" element={<Albums />} />
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;

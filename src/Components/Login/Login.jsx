import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classes from "./Login.module.css";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const emailRef = useRef(null);
  const navigateTo = useNavigate();

  const [state, setState] = useState({
    users: [],
    loggedUser: null,
    error: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setState({
        ...state,
        users: usersData.data,
      });
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkEmail = async (event) => {
    event.preventDefault();
    try {
      const verifiedUser = state.users.find(
        (user) =>
          user.email.toLowerCase() === emailRef.current.value.toLowerCase()
      );
      if (verifiedUser === undefined) {
        throw new Error("Incorrect Email Address");
      }
      onLogin(verifiedUser);
      navigateTo("/albums/");
    } catch (err) {
      setState({
        ...state,
        error: err.message,
      });
      return;
    }
  };

  return (
    <div className={classes.loginCont}>
      <h2>Log in</h2>
      <form onSubmit={checkEmail}>
        <input ref={emailRef} type="email" placeholder="jane@example.com" />
        <input type="password" placeholder="**********" />
        <button type="submit">LOG IN</button>
      </form>
      {state.error && <ErrorMsg message={state.error} />}
    </div>
  );
};

export default Login;

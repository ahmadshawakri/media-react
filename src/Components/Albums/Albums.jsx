import React, { useContext } from "react";
import { userContext } from "../../Context/UserContext";

const Albums = () => {
  const { loggedUser } = useContext(userContext);
  console.log(loggedUser);
  return <h1>Hello</h1>;
};

export default Albums;

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./Context/UserContext";

const Protected = () => {
  const { userState } = useContext(userContext);

  return userState.isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default Protected;

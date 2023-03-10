import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./Context/UserContext";

const Protected = () => {
  const { userState } = useContext(userContext);
  const { isLoggedIn } = userState;

  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default Protected;

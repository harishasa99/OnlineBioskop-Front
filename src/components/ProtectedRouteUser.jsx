import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRouteUser = ({ element }) => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated ? element : <Navigate to="/prijava" />;
};

export default ProtectedRouteUser;

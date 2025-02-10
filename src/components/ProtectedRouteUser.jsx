import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRouteUser = ({ element }) => {
  const { isAuthenticated } = useContext(UserContext);
  const location = useLocation();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    if (isAuthenticated) {
      setIsUserAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // ✅ Čuvamo status
    }
  }, [isAuthenticated]);

  if (!isUserAuthenticated) {
    return <Navigate to="/prijava" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteUser;

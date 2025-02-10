import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ element }) => {
  const { user, isAdmin } = useContext(UserContext);
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        setIsAllowed(true);
        localStorage.setItem("isAdmin", "true");
      } else {
        setIsAllowed(false);
        localStorage.removeItem("isAdmin");
      }
    }
  }, [user, isAdmin]);

  if (isAllowed === null) return null;

  return isAllowed ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ element }) => {
  const { user, isAdmin } = useContext(UserContext);
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    if (!user) {
      setIsAllowed(false);
    } else if (!isAdmin && location.pathname.startsWith("/admin")) {
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [user, isAdmin, location.pathname]);

  if (isAllowed === null) return null; // ⏳ Čekaj dok ne dobije podatke

  return isAllowed ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

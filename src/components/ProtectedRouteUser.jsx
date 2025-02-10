import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRouteUser = ({ element }) => {
  const { isAuthenticated, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) return null; // ⏳ Sačekaj dok se ne učita korisnik

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/prijava" state={{ from: location }} />
  );
};

export default ProtectedRouteUser;
